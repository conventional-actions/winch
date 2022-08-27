# winch

A GitHub Action for running winch.

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/winch@v1
```

### Inputs

| Name      | Default     | Description                           |
|-----------|-------------|---------------------------------------|
| `version` | `latest`    | the version of winch to install       |
| `file`    | `winch.yml` | specify the location of the Winchfile |
| `command` | `ci`        | specify the command to run            |

### Outputs

No outputs

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: conventional-actions/winch@v1
        with:
          file: winch-go.yml
          command: build
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
