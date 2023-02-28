from aiohttp import web

async def default_handler(request):
    return web.Response(text="Hello from Dmitriy Naumov! [aiohttp]")

if __name__ == '__main__':
    app = web.Application()
    app.add_routes([
        web.get('/', default_handler)
    ])
    web.run_app(app)
