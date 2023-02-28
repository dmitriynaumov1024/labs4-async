from aiohttp import web, WSMsgType
from datetime import datetime
import json

CHAT_STOP_PASSWORD = "123456"

chat = dict()

async def chat_broadcast(msg):
    for user in chat:
        await chat[user].send_str(json.dumps(msg))

async def chat_stop(request):
    data = await request.json()
    print(data["password"])
    if data["password"] == CHAT_STOP_PASSWORD:
        try:
            for user in chat:
                await chat[user].close()
            chat.clear()
            return web.Response(text="")
        finally:
            await request.app.shutdown()
            await request.app.cleanup()
            print("Shutting down...")
            exit()
    return web.Response(text="")

async def chat_connect(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    username = None
    async for msg in ws:
        if msg.type == WSMsgType.TEXT:
            if msg.data == 'close':
                if username != None:
                    del chat[username]
                await ws.close()
                print("WebSocket connection closed")
            else: 
                event = json.loads(msg.data)
                if event["type"] == "message" and username != None:
                    await chat_broadcast({
                        "sender": username,
                        "time": datetime.now().strftime("%H:%M:%S"),
                        "text": event["message"]
                    })
                if event["type"] == "join" and username == None:
                    username = event["username"]
                    chat[username] = ws
                    await chat_broadcast({
                        "sender": "[server]",
                        "time": datetime.now().strftime("%H:%M:%S"),
                        "text": f"""{event["username"]} joined the chat!"""
                    })
        else:
            print("Something went wrong")

async def index_handler(request):
    raise web.HTTPFound("/index.html")

def main():
    app = web.Application()
    app.add_routes([
        web.get("/chat", chat_connect),
        web.post("/stop", chat_stop),
        web.get("/", index_handler),
        web.static("/", "./public")
    ])
    web.run_app(app)


if __name__ == '__main__':
    main()
