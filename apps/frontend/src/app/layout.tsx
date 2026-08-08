// oxlint-disable

import { TemporalPolyfill } from "@/components/temporal-polyfill"
import { Temporal, toTemporalInstant } from "temporal-polyfill"
import { Fira_Code, Comfortaa } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import "./globals.css"

const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-sans" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" })

if (typeof globalThis.Temporal === "undefined") {
    // @ts-ignore - Polyfill Temporal
    globalThis.Temporal = Temporal
    // @ts-ignore - Polyfill Temporal
    globalThis.Temporal.polyfilled = true

    console.info("Server -> Temporal not defined - polyfilled")
} else {
    console.info("Server -> Temporal is already defined - not polyfilling")
}

if (typeof Date.prototype.toTemporalInstant !== "function") {
    // @ts-ignore - Polyfill Temporal
    Date.prototype.toTemporalInstant = toTemporalInstant
    console.info("Server -> Date.prototype.toTemporalInstant not defined - polyfilling")
} else {
    console.info("Server -> Date.prototype.toTemporalInstant is already defined - not polyfilling")
}

export const metadata: Metadata = {
    title: "Performance",
    description: ""
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className={cn("font-sans scroll-smooth", firaCode.variable, comfortaa.variable)}
        >
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                {process.env.NODE_ENV !== "development" && (
                    <script
                        defer
                        src="https://cool-xcfio.vercel.app/script.js"
                        data-website-id="9a4ce4bd-8f6d-4e11-b623-86503a3c7f84"
                    ></script>
                )}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#141414')
                                }
                                if (localStorage.layout) {
                                    document.documentElement.classList.add('layout-' + localStorage.layout)
                                }
                            } catch (_) {}
                        `
                    }}
                />
                <meta name="theme-color" content={"#ffffff"} />
            </head>

            <body className={`antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Toaster richColors position="top-right" />
                    <Suspense>{children}</Suspense>
                    <TemporalPolyfill />
                </ThemeProvider>
            </body>
        </html>
    )
}
