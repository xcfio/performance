import { ValidationErrorHandler as schemaErrorFormatter } from "fastify-utils"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { logger, xcf } from "./utils"
import Plugin from "./plugin"
import Routes from "./routes"
import Fastify from "fastify"
import Hooks from "./hooks"
import * as _ from "./type"
import config from "./config"

export const fastify = Fastify({
    logger,
    trustProxy: true,
    ajv: { customOptions: { multipleOfPrecision: 2 } },
    schemaErrorFormatter
}).withTypeProvider<TypeBoxTypeProvider>()

export async function build() {
    await Plugin(fastify)
    Routes(fastify)
    Hooks(fastify)
    return fastify
}

export async function main() {
    const fastify = await build()
    await fastify.listen({ host: "0.0.0.0", port: config.port })
    console.log(`Server listening at http://localhost:${config.port}`)
}

process.on("uncaughtException", (err: Error, org: string) => void xcf(err, "Uncaught Exception", org, false))
process.on("unhandledRejection", (res: Error, org: string) => void xcf(res, "Unhandled Rejection", org, false))
process.on("uncaughtExceptionMonitor", (err: Error, org: string) => void xcf(err, "Uncaught Exception", org, false))
void main()
