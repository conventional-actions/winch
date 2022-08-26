import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as tc from '@actions/tool-cache'
import os from 'os'
import {ExecOptions} from '@actions/exec/lib/interfaces'

async function run(): Promise<void> {
  try {
    const versionSpec = core.getInput('version') || 'latest'
    core.debug(`version ${versionSpec}`)

    const winch = tc.find('winch', versionSpec, os.arch())
    core.debug(`found winch at ${winch}`)

    const command = core.getInput('command') || 'ci'
    core.debug(`command = ${command}`)

    const file = core.getInput('file') || 'winch.yml'
    core.debug(`file = ${file}`)

    const options: ExecOptions = {
      listeners: {
        stdout: (data: Buffer) => {
          core.info(data.toString())
        },
        stderr: (data: Buffer) => {
          core.error(data.toString())
        }
      }
    }

    await exec.exec(winch, ['--file', file, command], options)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
