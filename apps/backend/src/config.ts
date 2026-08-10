import { env } from "@repo/utils"
import { Env } from "./type"

const config = {
    environment: env<Env, "NODE_ENV">("NODE_ENV"),
    path: env<Env>("PATH", false) ?? ":memory:",
    port: Number(env<Env>("PORT", false) ?? 7200),
    secret: {
        cookie: env<Env>("COOKIE_SECRET"),
        jwt: env<Env>("JWT_SECRET")
    }
} as const

export default config
