---
sidebar_position: 3
title: "Quick Start"
description: "Get Bethrou running in minutes with this quick start guide. Learn basic client and node setup, PSK configuration, and first proxy connection."
keywords: ["quick start", "tutorial", "getting started", "PSK", "p2p proxy setup", "beginner guide"]
image: "../../img/bethrou-icon.svg"
---

# Quick Start

This guide will help you get Bethrou up and running in minutes.

## Overview

In this quick start, you'll:

1. Clone the repository
2. Start an exit node
3. Start a client
4. Configure your browser to use the proxy
5. Test the connection

## Step 0: Clone the Repository

```bash
git clone https://github.com/bethrou/bethrou.git
cd bethrou
```

## Step 1: Build and Run the Exit Node

First, ensure you have a `network.key` file in your directory. If not, [generate one](./installation.md#generate-network-key).

### Get the Node Image

Choose one of the following:

**Option A: Build from source**

```bash
# From repository root
docker build -f ./node/Containerfile -t bethrou-node .
```

**Option B: Pull pre-built image**

```bash
docker pull henrybarreto/bethrou-node:latest
docker tag henrybarreto/bethrou-node:latest bethrou-node
```

### Run the Node Container

```bash
docker run -d \
  --name bethrou-node \
  -p 4000:4000 \
  -v $(pwd)/network.key:/etc/bethrou/network.key:ro \
  bethrou-node
```

View the logs to get your Peer ID:

```bash
docker logs bethrou-node
```

You should see output similar to:

```
"Starting Bethrou node"
"Peer ID" id=id12D3KooWRmF8HJnQyW4pqV...
"Listening on" addrs="[/ip4/127.0.0.1/tcp/4000 /ip4/192.168.0.100/tcp/4000]"
```

:::tip Note Your Peer ID
Copy the **Peer ID** (starts with `12D3KooW...`) - you'll need it for the client configuration.
:::

## Step 2: Build and Configure the Client

### Get the Client Image

Choose one of the following:

**Option A: Build from source**

```bash
# Build client image
docker build -f ./client/Containerfile -t bethrou-client .
```

**Option B: Pull pre-built image**

```bash
docker pull henrybarreto/bethrou-client:latest
docker tag henrybarreto/bethrou-client:latest bethrou-client
```

### Create Client Configuration

Create a client configuration file `client.yaml`:

```yaml
key: "network.key"

server:
  listen: "127.0.0.1:1080"  # Local SOCKS5 server
  auth: false

routing:
  strategy: random
  health: 30s
  timeout: 10s

nodes:
  - id: 12D3KooWRmF8HJnQyW4pqV...  # Your node's Peer ID from Step 1
    addrs:
      - /ip4/127.0.0.1/tcp/4000/p2p/12D3KooWRmF8HJnQyW4pqV...

discovery:
  enabled: false

log:
  level: info
  format: text
```

Replace `12D3KooWRmF8HJnQyW4pqV...` with your actual Peer ID from Step 1.

:::tip Multiaddr Format
The address format is: `/ip4/<IP>/tcp/<PORT>/p2p/<PEER_ID>`
- Use `127.0.0.1` if running locally
- Use the machine's IP if running on different machines
:::

## Step 3: Run the Client Container

```bash
docker run -d \
  --name bethrou-client \
  -p 1080:1080 \
  -v "$(pwd)/client.yaml:/etc/bethrou/client.yaml:ro" \
  -v "$(pwd)/network.key:/etc/bethrou/network.key:ro" \
  bethrou-client
```

View the logs to verify the client started:

```bash
docker logs -f bethrou-client
```

You should see:

```
INFO  Starting Bethrou client
INFO  SOCKS5 server listening on 0.0.0.0:1080
INFO  Connected to node: 12D3KooWRmF8HJnQyW4pqV...
```

## Step 4: Configure Your Browser

Now configure your browser to use the SOCKS5 proxy:

### Firefox

1. Open **Settings** → **Network Settings**
2. Select **Manual proxy configuration**
3. Set SOCKS Host: `127.0.0.1`
4. Set Port: `1080`
5. Select **SOCKS v5**
6. Check **Proxy DNS when using SOCKS v5**
7. Click **OK**

### Chrome/Chromium

Use a command-line flag to start Chrome with proxy:

```bash
# Linux/macOS
google-chrome --proxy-server="socks5://127.0.0.1:1080"

# Windows
chrome.exe --proxy-server="socks5://127.0.0.1:1080"
```

### System-wide (macOS)

1. Open **System Preferences** → **Network**
2. Select your network → **Advanced** → **Proxies**
3. Check **SOCKS Proxy**
4. Set server: `127.0.0.1:1080`
5. Click **OK** → **Apply**

### System-wide (Linux)

```bash
export ALL_PROXY=socks5://127.0.0.1:1080
```

## Step 5: Test the Connection

Visit a website that shows your IP address:
- https://ifconfig.me
- https://icanhazip.com
- https://checkip.amazonaws.com

The IP address should be the one of your exit node, not your local machine!

You can also test with curl:

```bash
curl --socks5 127.0.0.1:1080 https://ifconfig.me
```

## Verify Everything Works

Check the logs of both containers:

**Node logs:**
```bash
docker logs bethrou-node
```

Should show:
```
INFO  Accepted connection from peer: 12D3KooW...
INFO  Handling proxy request to: example.com:443
```

**Client logs:**
```bash
docker logs bethrou-client
```

Should show:
```
INFO  Routing connection to node: 12D3KooW...
INFO  Successfully connected to: example.com:443
```

## Next Steps

Congratulations! 🎉 You now have a working Bethrou P2P proxy network.

### Learn More

- [Configuration Guide](../guides/configuration.md) - Detailed configuration options
- [Docker Deployment](../guides/deployment-docker.md) - Run Bethrou in containers
- [NAT Traversal](../guides/nat-traversal.md) - Set up relay nodes for NAT traversal
- [Architecture](../concepts/architecture.md) - Understand how Bethrou works

### Advanced Topics

- **Multiple exit nodes**: Add more nodes to your `client.yaml` for redundancy
- **Discovery**: Use Redis for automatic node discovery
- **Relay mode**: Enable relay nodes for better NAT traversal
- **Production deployment**: Secure your setup for production use

## Troubleshooting

### Client can't connect to node

- Verify the Peer ID is correct
- Check the multiaddr format
- Ensure the node is running and accessible
- Check firewall rules

### Browser shows "Proxy connection failed"

- Verify the client is running
- Check the client is listening on `127.0.0.1:1080`
- Ensure proxy settings in browser are correct

### Node shows "permission denied"

- Port 4000 might be in use, try a different port:
  ```bash
  docker run -d \
    --name bethrou-node-alt \
    -p 4001:4000 \
    -v $(pwd)/network.key:/etc/bethrou/network.key:ro \
    bethrou
  ```

For more help, see the [Configuration Guide](../guides/configuration.md) or check the [GitHub Issues](https://github.com/bethrou/bethrou/issues).
