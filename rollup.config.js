import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import cssBundle from 'rollup-plugin-css-bundle';
import sass from 'rollup-plugin-sass';
import {terser} from 'rollup-plugin-terser';
import {sass as svetleSass} from 'svelte-preprocess-sass';
import sizes from 'rollup-plugin-sizes';


const production = !process.env.ROLLUP_WATCH;


export default [
    {
        input: 'src/app.js',
        output: {
            sourcemap: !production,
            format: 'iife',
            name: 'app',
            file: 'public/app.js'
        },
        plugins: [
            svelte({
                // enable run-time checks when not in production
                dev: !production,
                // we'll extract any component CSS out into
                // a separate file — better for performance
                css: css => {
                    css.write('public/app.components.css');
                },

                preprocess: {
                    style: svetleSass()
                }
            }),

            cssBundle({
                output: 'public/app.sss.css'
            }),

            sass({
                // Filename to write all styles
                output: 'public/app.css',
            }),

            // If you have external dependencies installed from
            // npm, you'll most likely need these plugins. In
            // some cases you'll need additional configuration —
            // consult the documentation for details:
            // https://github.com/rollup/rollup-plugin-commonjs
            resolve({browser: true}),
            commonjs(),

            // If we're building for production (npm run build
            // instead of npm run dev), minify
            production && terser(),

            production && sizes()
        ],
        watch: {
            clearScreen: false,
            include: 'src/**/*'
        }
    }
];
