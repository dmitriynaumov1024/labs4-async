import asyncio
from aiohttp import web
import aiofiles

async def default_handler(request):
    async with aiofiles.open("./index.html", "rb") as f:
        response = web.StreamResponse()
        await response.prepare(request)
        await response.write(b"Hello from Dmitriy Naumov! [aiohttp]")
        await response.write(await f.read())
        return response

if __name__ == '__main__':
    app = web.Application()
    app.add_routes([
        web.get('/', default_handler)
    ])
    web.run_app(app)
