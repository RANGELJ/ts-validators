// @ts-check
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const scriptDir = dirname(fileURLToPath(import.meta.url))

export const rootDir = path.resolve(scriptDir, '..')

export const distDir = path.resolve(rootDir, 'dist')

