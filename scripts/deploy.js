// @ts-check
import deployLib from 'rangel-base-deploy-scripts/es6/deployLib.js'
import { distDir, rootDir } from './paths.js'

const main = async () => {
    await deployLib({
        sourceDir: rootDir,
        targetDir: distDir,
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
