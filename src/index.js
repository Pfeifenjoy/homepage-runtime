//@flow

import homepage from "@arwed/homepage"
import express from "express"

const start = Date.now()

const PORT = process.env.PORT | 3000
const app = express()

app.use(homepage)

app.listen(PORT)

/*eslint-disable */
console.log(`
Server launched.
Listening on Port: ${ PORT }
`)

console.log(`
took ${ Date.now() - start } milliseconds.
`)
/*eslint-enable */
