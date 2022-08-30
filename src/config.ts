import * as core from '@actions/core'

type Config = {
  versionSpec: string
  command: string
  file: string
}

export async function getConfig(): Promise<Config> {
  return {
    versionSpec: core.getInput('version') || 'latest',
    command: core.getInput('command') || 'ci',
    file: core.getInput('file') || 'winch.yml'
  }
}
