import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    await exec.exec('winch', ['--file', config.file, config.command])
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
