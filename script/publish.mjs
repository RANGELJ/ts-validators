import { execa } from 'execa'
import fs from 'fs-extra'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const publish = async () => {
    const scriptDir = dirname(fileURLToPath(import.meta.url))

    const sourceDir = path.resolve(scriptDir, '../')

    const distDir = path.resolve(sourceDir, 'dist')

    await fs.remove(distDir)

    await execa('npm', ['run', 'build'], {
        cwd: sourceDir,
        stdout: 'inherit',
    })

    await fs.remove(path.resolve(distDir, 'tests'))

    const packageDir = path.resolve(sourceDir, 'package.json')
    const lockFileDir = path.resolve(sourceDir, 'package-lock.json')

    const destinationPackageDir = path.resolve(distDir, 'package.json')
    const destionationLockFile = path.resolve(distDir, 'package-lock.json')

    await fs.copy(packageDir, destinationPackageDir)
    await fs.copy(lockFileDir, destionationLockFile)

    await execa('npm', ['install'], {
        cwd: distDir,
    })

    await execa('npm', ['publish'], {
        cwd: distDir,
        stdout: 'inherit',
    })
}

publish()
