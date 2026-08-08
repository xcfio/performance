import config from "../config"
import swagger from "./swagger"
import cookie from "./cookie"
import rl from "./rate-limit"
import scalar from "./scalar"
import cors from "./cors"
import jwt from "./jwt"

export default async function Plugin(fastify: Fastify) {
    if (config.environment === "development") {
        await swagger(fastify)
        await scalar(fastify)
    }

    await cookie(fastify)
    await rl(fastify)
    await jwt(fastify)
    await cors(fastify)
}
