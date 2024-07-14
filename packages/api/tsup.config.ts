import {defineConfig} from 'tsup'

const entries = ['index', 'setting', 'bangumi', 'episode']

export default defineConfig({
  entry: entries.map(e => `src/${e}.ts`),
  dts: false,
  treeshake: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
})