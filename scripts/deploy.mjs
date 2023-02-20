// @ts-check
import fs from 'fs-extra'
import path, { dirname } from 'path'
import { execa } from 'execa'
import { fileURLToPath } from 'url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const sourceDir = path.resolve(scriptDir, '..')
const targetDir = path.resolve(sourceDir, 'dist')

const main = async () => {
    await fs.remove(targetDir)

    const packageDir = path.resolve(sourceDir, 'package.json')
    await fs.copy(packageDir, path.resolve(targetDir, 'package.json'))

    await execa('npx', [
        'tsc',
        '--outDir',
        path.resolve(targetDir, 'cjs'),
        '--module',
        'commonjs',
    ], {
        cwd: sourceDir,
        stdio: 'inherit',
    })

    const es6Dir = path.resolve(targetDir, 'es6')

    await execa('npx', [
        'tsc',
        '--outDir',
        es6Dir,
        '--module',
        'ES6',
    ], {
        cwd: sourceDir,
        stdio: 'inherit',
    })

    const es6Files = await fs.readdir(es6Dir)

    await Promise.all(es6Files.map(async (fileName) => {
        if (fileName.endsWith('.d.ts')) {
            return
        }
        const filePath = path.resolve(es6Dir, fileName)
        await fs.rename(filePath, filePath.replace(/\.js$/, '.mjs'))
    }))

    await execa('npm', [
        'publish',
        '--userconfig',
        '~/.npmrc_personal'
    ], {
        cwd: targetDir,
        stdio: 'inherit',
    })
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
