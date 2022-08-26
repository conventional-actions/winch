import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import os from 'os'

async function run(): Promise<void> {
  try {
    const osPlatform = os.platform()
    const osArch = os.arch() === 'x64' ? 'amd64' : os.arch()

    const versionSpec = core.getInput('version') || 'latest'
    core.debug(`Downloading ${versionSpec} ${osPlatform} ${osArch} version`)

    const url =
      versionSpec === 'latest'
        ? `https://github.com/winchci/winch/releases/latest/download/${osPlatform}-${osArch}.tgz`
        : `https://github.com/winchci/winch/releases/download/${versionSpec}/${osPlatform}-${osArch}.tgz`

    core.info(`Downloading ${versionSpec} ${osPlatform} ${osArch} from ${url}`)
    const downloadPath = await tc.downloadTool(url)
    core.debug(
      `Downloaded ${versionSpec} ${osPlatform} ${osArch} to ${downloadPath}`
    )

    const extPath = await tc.extractTar(downloadPath)
    core.debug(`Extracted ${versionSpec} ${osPlatform} ${osArch} to ${extPath}`)

    const toolPath = await tc.cacheDir(extPath, 'winch', versionSpec, os.arch())
    core.info(
      `Successfully extracted winch ${versionSpec} ${osPlatform} ${osArch} to ${toolPath}`
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
