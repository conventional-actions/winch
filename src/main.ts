import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    const versionSpec = core.getInput('version') || 'latest'
    core.debug(`version ${versionSpec}`)

    const command = core.getInput('command') || 'ci'
    core.debug(`command = ${command}`)

    const file = core.getInput('file') || 'winch.yml'
    core.debug(`file = ${file}`)

    await exec.exec('winch', ['--file', file, command])
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
