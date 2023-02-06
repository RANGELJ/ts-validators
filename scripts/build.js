// @ts-check
import tsBuildAndCopyPackageFiles  from 'rangel-base-deploy-scripts/es6/tsBuildAndCopyPackageFiles.js'
import { rootDir, distDir } from './paths.js'

const main = async () => {
    await tsBuildAndCopyPackageFiles({
        targetDir: distDir,
        sourceDir: rootDir,
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
