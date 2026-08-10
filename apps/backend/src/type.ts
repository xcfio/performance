import { fastify } from "./"

declare global {
    type Fastify = typeof fastify

    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

export type Env = {
    // Config
    NODE_ENV: "development" | "production" | "test"
    DATABASE_URL: string
    PORT: string

    // Secret
    COOKIE_SECRET: string
    JWT_SECRET: string
}
