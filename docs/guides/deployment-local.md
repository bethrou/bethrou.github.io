---
sidebar_position: 2
title: "Local Deployment"
description: "Set up Bethrou locally for development and testing: prerequisites, installation, running client and nodes, debugging, and local network configuration."
keywords: ["local deployment", "development", "testing", "setup", "prerequisites", "debugging"]
image: "../../img/bethrou-icon.svg"
---

# Local Deployment

Guide for deploying Bethrou locally for development and testing.

## Prerequisites

- Go 1.24.7+
- OpenSSL (for key generation)
- Git
- Optional: Redis (for discovery)

## Setup Steps

### 0. Clone the Repository

```bash
git clone https://github.com/bethrou/bethrou.git
cd bethrou
```

### 1. Generate Network Key

```bash
echo "/key/swarm/psk/1.0.0/" > network.key
echo "/base16/" >> network.key
openssl rand -hex 32 >> network.key
chmod 600 network.key
```

### 2. Start Exit Node

```bash
cd node
go run main.go start --listen /ip4/127.0.0.1/tcp/4000
```

Note the Peer ID from the output:
```
"Peer ID" id=id12D3KooWRmF8HJnQyW4pqV...
```

### 3. Configure Client

Create `client/client.yaml`:

```yaml
key: "network.key"

server:
  listen: "127.0.0.1:1080"
  auth: false

routing:
  strategy: random
  health: 30s
  timeout: 10s

nodes:
  - id: 12D3KooWRmF8HJnQyW4pqVx...  # Use your Peer ID
    addrs:
      - /ip4/127.0.0.1/tcp/4000/p2p/12D3KooWRmF8HJnQyW4pqVx...

discovery:
  enabled: false

log:
  level: debug
  format: text
```

### 4. Start Client

```bash
cd client
go run main.go connect --config client.yaml
```

### 5. Test Connection

```bash
curl --socks5 127.0.0.1:1080 https://ifconfig.me
```

## With Redis Discovery

### Start Redis

```bash
# Using Docker
docker run -d -p 6379:6379 --name redis redis:alpine

# Or install locally
brew install redis  # macOS
sudo apt install redis-server  # Ubuntu
```

### Start Node with Discovery

```bash
cd node
go run main.go start \
  --listen /ip4/127.0.0.1/tcp/4000 \
  --discover \
  --discover-address redis://localhost:6379 \
  --discover-topic bethrou-local
```

### Start Client with Discovery

```bash
cd client
go run main.go connect \
  --discover \
  --discover-address redis://localhost:6379 \
  --discover-topic bethrou-local
```

## Multiple Nodes

Run multiple nodes on different ports:

**Node 1:**
```bash
cd node
go run main.go start --listen /ip4/127.0.0.1/tcp/4000
```

**Node 2:**
```bash
cd node
go run main.go start --listen /ip4/127.0.0.1/tcp/4001
```

**Client config:**
```yaml
nodes:
  - id: <node1-peer-id>
    addrs:
      - /ip4/127.0.0.1/tcp/4000/p2p/<node1-peer-id>
  - id: <node2-peer-id>
    addrs:
      - /ip4/127.0.0.1/tcp/4001/p2p/<node2-peer-id>
```

## Development Tips

1. **Use debug logging** for troubleshooting
2. **Keep terminals organized** (one for node, one for client)
3. **Watch logs** for connection status
4. **Test with curl** before browser
5. **Use Redis CLI** to monitor discovery

## Common Issues

### "Address already in use"

Port is occupied:
```bash
lsof -i :4000
# Use different port or kill process
```

### "Cannot find network.key"

Ensure network.key exists in both directories:
```bash
cp network.key node/
cp network.key client/
```

### "Connection refused"

Node might not be running:
```bash
# Check if node is listening
netstat -an | grep 4000
```

## Next Steps

- [Docker Deployment](./deployment-docker.md)
- [Configuration Guide](./configuration.md)
- [NAT Traversal](./nat-traversal.md)
