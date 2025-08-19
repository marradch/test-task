import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
    server: {
        host: '0.0.0.0',   // слушаем все интерфейсы внутри контейнера
        port: 5173,
        strictPort: true,
        hmr: {
          host: 'localhost',  // или IP твоего ПК, если не работает localhost
        },
        watch: {
          usePolling: true,  // фикс для Docker/Linux
        },
      },
});
