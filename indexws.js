const express = require('express');
const server = require('http').createServer()
const app = express()

app.get('/', (_, res) => {
	res.sendFile('index.html', { root: __dirname })
})

server.on('request', app)
server.listen(3000, () => {
	console.log('Server started on port 3000')
})

/** Begin WebSockets **/
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server })

wss.on('connection', function connection(ws) {
	const numClients = wss.clients.size
	console.log('Clients connected: ' + numClients)

	wss.broadcast('Current visitors: ' + numClients)

	if(ws.readyState === ws.OPEN) {
		ws.send('Welcom to the server!')
	}

	ws.on('close', function close() {
		console.log('Client disconnected')
	})
})

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
		client.send(data)
	})
}
