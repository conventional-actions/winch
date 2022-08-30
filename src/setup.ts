import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import os from 'os'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    const osPlatform = os.platform()
    const osArch = os.arch() === 'x64' ? 'amd64' : os.arch()

    core.debug(
      `Downloading ${config.versionSpec} ${osPlatform} ${osArch} version`
    )

    const url =
      config.versionSpec === 'latest'
        ? `https://github.com/winchci/winch/releases/latest/download/${osPlatform}-${osArch}.tgz`
        : `https://github.com/winchci/winch/releases/download/${config.versionSpec}/${osPlatform}-${osArch}.tgz`

    core.info(
      `Downloading ${config.versionSpec} ${osPlatform} ${osArch} from ${url}`
    )
    const downloadPath = await tc.downloadTool(url)
    core.debug(
      `Downloaded ${config.versionSpec} ${osPlatform} ${osArch} to ${downloadPath}`
    )

    const extPath = await tc.extractTar(downloadPath)
    core.debug(
      `Extracted ${config.versionSpec} ${osPlatform} ${osArch} to ${extPath}`
    )

    const toolPath = await tc.cacheDir(
      extPath,
      'winch',
      config.versionSpec,
      os.arch()
    )
    core.info(
      `Successfully extracted winch ${config.versionSpec} ${osPlatform} ${osArch} to ${toolPath}`
    )

    core.addPath(toolPath)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
