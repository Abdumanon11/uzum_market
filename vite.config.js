import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: './',
    esbuild: {
        target: 'esnext'
    },
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                menu: resolve(__dirname, 'src/pages/menu.html'),
                home: resolve(__dirname, 'src/pages/home.html'),
                404: resolve(__dirname, 'src/pages/404.html'),
                katalog: resolve(__dirname, 'src/pages/katalog.html'),
                korzina: resolve(__dirname, 'src/pages/korzina.html'),
                like: resolve(__dirname, 'src/pages/like.html'),
                produkt: resolve(__dirname, 'src/pages/produkt.html'),

            },
        },
    },
})