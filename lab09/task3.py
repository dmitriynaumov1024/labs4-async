import asyncio
from aiohttp import web
import aiofiles

async def default_handler (request):
    async with aiofiles.open("./index.html", "r") as f:
        footer = await f.read()
        return web.Response (
            headers = { "Content-Type": "text/html" },
            text = "Hello from Dmitriy Naumov! [aiohttp] \n" + footer
        )

if __name__ == '__main__':
    app = web.Application()
    app.add_routes([
        web.get('/', default_handler)
    ])
    web.run_app(app)
