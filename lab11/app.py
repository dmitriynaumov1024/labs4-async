from flask import Flask, redirect
from flask_socketio import SocketIO, emit
from datetime import datetime
from hashlib import md5
import random

app = Flask(__name__, static_url_path="", static_folder="public")
socketio = SocketIO(app)

@app.route("/")
def index():
    return redirect("/index.html")

chat = dict()
SERVERNAME = "[server]"

def random_salt():
    return str(random.randint(0, 1 << 30)) + str(random.randint(0, 1 << 30))

def create_token_for(key):
    return md5(bytes(str(key) + random_salt(), "utf-8")).hexdigest()

def chat_broadcast(username, message):
    result = { 
        "sender": username, 
        "time": datetime.now().strftime("%H:%M:%S"), 
        "text": message 
    }
    emit("chat:broadcast", result, broadcast=True)

@socketio.on("chat:join")
def on_chat_join(username, token=None):
    if username == SERVERNAME:
        emit("chat:error", "This username is not allowed")
    elif username not in chat:
        token = create_token_for(username)
        chat[username] = token
        emit("chat:confirm-join", (username, token), broadcast=False)
        chat_broadcast(SERVERNAME, f"{username} joined the chat!")
    else:
        if token == chat[username]:
            emit("chat:confirm-join", (username, token), broadcast=False)
            chat_broadcast(SERVERNAME, f"{username} re-joined the chat!")
        elif token == None:
            emit("chat:challenge", "Please provide token", broadcast=False)
        else:
            emit("chat:error", "Token mismatch", broadcast=False)


@socketio.on("chat:message")
def on_chat_message(username, token, message):
    if username in chat and chat[username] == token:
        chat_broadcast(username, message)


if __name__ == '__main__':
    socketio.run(app)
