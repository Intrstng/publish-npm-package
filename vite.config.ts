import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import {resolve} from 'path'
import { dependencies, devDependencies } from './package.json' // add to tsconfig.node.json in include 'package.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'My-library-name',
      // the proper extensions will be added
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: { // not rolldownOptions ???
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react/jsx-runtime', ...Object.keys(dependencies), ...Object.keys(devDependencies)],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   vue: 'Vue',
        // },
      },
    },
    sourcemap: true,
    target: 'esnext',
  },
})
