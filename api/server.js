const jsonServer = require('json-server')

const server = jsonServer.create()

const fs = require('fs')
const path = require('path')
const filePath = path.join('db.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)

const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/proyectos': '/proyectos',
    '/proyectos/:proyectoId/bolsillos': '/bolsillos?id_proyecto=:proyectoId',
    '/proyectos/:proyectoId/bolsillos/:bolsilloId/referencias': '/referencias?id_bolsillo=:bolsilloId'
}));


server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
