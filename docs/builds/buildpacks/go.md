---
---

import BuildArgumentsPartial from './partials/\_build-args-read-more.md'

# Go

## Features

### Installing a Specific Go Version

By default the Go buildpack will read the version specified in your `go.mod` file. It is possible to override this version by setting the [`BP_GO_VERSION`](#bp_go_version) build argument.

### Configuring the `go build` Command

FL0 compiles your Go source code with the `go build` command and includes certain flags by default. These flags can be overridden with the [`BP_GO_BUILD_FLAGS`](#bp_go_build_flags) and [`BP_GO_BUILD_LDFLAGS`](#bp_go_build_ldflags) build arguments.

### Building Non-Default Packages

FL0 will compile the package in the app’s root directory by default. It is possible to build a non-default package (or packages) by setting the [`BP_GO_TARGETS`](#bp_go_targets) build argument.

## Build Arguments

<BuildArgumentsPartial />

### `BP_GO_VERSION`

Can be set to any valid semver version or version constraint (e.g. 1.14.1, 1.14.\*).

Example: `BP_GO_VERSION=1.14.1`

### `BP_GO_BUILD_FLAGS`

Use this build argument to override the default flags set for the `go build` command.

Example: `BP_GO_BUILD_FLAGS=-buildmode=default -tags=fl0`

### `BP_GO_BUILD_LDFLAGS`

Pass `-ldflags` to the `go build command`.

Example: `BP_GO_BUILD_LDFLAGS="-X main.variable=some-value`

### `BP_GO_TARGETS`

Use this build argument to specify a target other than the root directory.

Example: `BP_GO_TARGETS=./my-other-pacakge`

### `BP_GO_BUILD_IMPORT_PATH`

If you are building a `$GOPATH` application that imports its own sub-packages, you will need to specify the import paths for those sub-packages.

Example: `BP_GO_BUILD_IMPORT_PATH=github.com/app-developer/app-directory`

### `BP_KEEP_FILES`

By default, FL0 deletes the contents of your app source directory (except for built artifacts). Use this build argument to disable this behavior.

Example: `BP_KEEP_FILES=true`
