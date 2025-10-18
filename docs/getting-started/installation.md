---
sidebar_position: 2
title: "Installing"
description: "Step-by-step installation guide for Bethrou: prerequisites, system requirements, installation methods, and verification steps for P2P proxy network setup."
keywords: ["installation", "setup", "requirements", "docker", "binary", "P2P proxy installation"]
image: "../../img/bethrou-icon.svg"
---

# Installation

This guide will help you install Bethrou on your system.

## Prerequisites

Before installing Bethrou, ensure you have the following:

- **Go 1.24.7 or higher** - [Download Go](https://go.dev/dl/)
- **Git** - For cloning the repository
- **Redis** (optional) - For node discovery features
- **Docker/Podman** (optional) - For containerized deployments
- **OpenSSL** - For generating network keys

### Check Prerequisites

```bash
# Check Go version
go version

# Check Git
git --version

# Check OpenSSL
openssl version
```

## Installation Methods

### Method 1: Build from Source

Clone the repository and build the binaries:

```bash
# Clone the repository
git clone https://github.com/bethrou/bethrou.git
cd bethrou

# Build the node
cd node
go build -o bethrou-node main.go

# Build the client
cd ../client
go build -o bethrou-client main.go
```

The binaries will be created in their respective directories:
- `node/bethrou-node`
- `client/bethrou-client`

### Method 2: Using Docker

Pull the pre-built image from Docker Hub:

For node:

```bash
docker pull henrybarreto/bethrou-node:latest
```

For client:

```bash
docker pull henrybarreto/bethrou-client:latest
```

Or build the image locally:

For node:

```bash
# Build from repository root
docker build -f ./node/Containerfile -t bethrou-node .
```

For client:

```bash
# Build from repository root
docker build -f ./client/Containerfile -t bethrou-client .
```

### Method 3: Using Go Install

You can install directly using Go:

```bash
# Install node
go install github.com/bethrou/bethrou/node@latest

# Install client
go install github.com/bethrou/bethrou/client@latest
```

## Generate Network Key

All nodes in a Bethrou network must share the same pre-shared key (PSK). Generate one:

```bash
echo "/key/swarm/psk/1.0.0/" > network.key
echo "/base16/" >> network.key
openssl rand -hex 32 >> network.key
```

This creates a `network.key` file that looks like:

```
/key/swarm/psk/1.0.0/
/base16/
abc123def456...
```

:::warning Important
Keep your `network.key` file secure! Anyone with this key can join your private network. Never commit it to version control.
:::

Copy this file to:
- The directory where you run the node
- The directory where you run the client
- All machines that will participate in your network

## Verify Installation

### Verify Node Binary

```bash
cd node
./bethrou-node --help
```

You should see the help output with available commands.

### Verify Client Binary

```bash
cd client
./bethrou-client --help
```

You should see the help output with available commands.

### Verify Docker Image

```bash
docker run --rm bethrou --help
```

## Optional: Redis Setup

If you want to use the discovery feature, install and start Redis:

### Using Package Manager

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install redis-server
sudo systemctl start redis-server
```

**macOS:**
```bash
brew install redis
brew services start redis
```

### Using Docker

```bash
docker run -d -p 6379:6379 --name redis redis:alpine
```

### Verify Redis

```bash
redis-cli ping
# Should return: PONG
```

## Next Steps

Now that Bethrou is installed, proceed to the [Quick Start](./quick-start.md) guide to run your first client and node.
