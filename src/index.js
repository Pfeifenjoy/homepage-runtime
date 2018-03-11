//@flow

import cluster from "cluster"
import os from "os"

import homepage from "@arwed/homepage"
import express from "express"
import http2 from "http2"

if(cluster.isMaster && process.env === "PRODUCTION") {
	console.log(`Master ${process.pid} is running`)

	for(let i = 0; i < os.cpus().length; ++i) {
		cluster.fork()
	}

	cluster.on('exit', (worker: Worker, code: number, signal: string) => {
		console.log(`worker ${worker.process.pid} died`)
	});
} else {
	launch()

	console.log(`Worker ${process.pid} started`)
}

function launch() {
	const start = Date.now()

	const PORT = process.env.PORT || 4000
	const app = express()

	app.use(homepage)

	//http2.createServer({ }, app).listen(PORT)
	app.listen(4000)

	/*eslint-disable */
	console.log(`
	Server launched.
	Listening on Port: ${ PORT }
	`)

	console.log(`
	took ${ Date.now() - start } milliseconds.
	`)
	/*eslint-enable */
}
