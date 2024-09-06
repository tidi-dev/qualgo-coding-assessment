# Installation on MacOS

# Contents

- [Pre-setup](#pre-setup)
  - [Homebrew](#homebrew)
  - [NVM - Node Version Manager](#node-version-manager)
  - [Node](#node)
  - [Yarn](#yarn)
  - [Docker Desktop](#docker-desktop)
- [Setup](#setup)

# Pre-setup

It is advisable to begin by installing Homebrew, a package manager for macOS. This will simplify the process of installing additional packages, such as nvm (Node Version Manager) and Node.js, npm, as they can be easily managed through Homebrew.

## Homebrew

Homepage: https://brew.sh/

```bash
# install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## NVM - Node Version Manager

Ref: https://formulae.brew.sh/formula/nvm#default

```bash
# install nvm
brew install nvm
```

```bash
Please note that upstream has asked us to make explicit managing
nvm via Homebrew is unsupported by them and you should check any
problems against the standard nvm install method prior to reporting.

You should create NVM's working directory if it doesn't exist:
    mkdir ~/.nvm

Add the following to your shell profile e.g. ~/.profile or ~/.zshrc:
    export NVM_DIR="$HOME/.nvm"
    [ -s "$HOMEBREW_PREFIX/opt/nvm/nvm.sh" ] && \. "$HOMEBREW_PREFIX/opt/nvm/nvm.sh" # This loads nvm
    [ -s "$HOMEBREW_PREFIX/opt/nvm/etc/bash_completion.d/nvm" ] && \. "$HOMEBREW_PREFIX/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion

You can set $NVM_DIR to any location, but leaving it unchanged from
$HOMEBREW_CELLAR/nvm/0.39.7 will destroy any nvm-installed Node installations
upon upgrade/reinstall.

Type `nvm help` for further information.
```

## Node

Node will be installed via nvm, which was installed in the previous step.

```bash
# install the latest version (for now, `v20.11.1` is the latest)
nvm install

# install with specific version
nvm install v20.11.1
```

## Yarn

This monorepo is using `yarn` as it's package manager, for start installing it with command

```bash
# install yarn
npm install -g yarn
```

```bash
# install packages
Yarn install
```

## Docker Desktop

Please download the version that is compatible with your chip (Intel vs Apple silicon).

- [**Docker Desktop for Mac with Intel chip**](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-amd64)
- [**Docker Desktop for Mac with Apple silicon**](https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-arm64)
