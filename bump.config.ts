// bump.config.ts
import { defineConfig } from 'bumpp'

export default defineConfig({
  files: [
    'apps/*/package.json'
  ],
  all: true,
  execute: 'git add CHANGELOG.md'
})