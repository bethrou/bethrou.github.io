---
sidebar_position: 1
title: "Configuration"
description: "Complete configuration guide for Bethrou: client config, node setup, environment variables, TOML/YAML configuration, PSK management, and advanced network options."
keywords: ["configuration", "setup", "TOML", "YAML", "environment variables", "advanced setup", "network configuration"]
image: "../../img/bethrou-icon.svg"
---

# Configuration Guide

Comprehensive guide to configuring Bethrou for different use cases.

## Configuration Overview

Bethrou has two components with different configuration approaches:

- **Client**: Configured via YAML file (`client.yaml`)
- **Node**: Configured via command-line flags

## Network Key Setup

Generate and distribute the network key:

```bash
# Generate once
echo "/key/swarm/psk/1.0.0/" > network.key
echo "/base16/" >> network.key
openssl rand -hex 32 >> network.key

# Secure permissions
chmod 600 network.key

# Copy to all machines
scp network.key user@client-host:~/
scp network.key user@node-host:~/
```

## Basic Configuration

### Minimal Client

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
  - id: 12D3KooW...
    addrs:
      - /ip4/192.168.1.100/tcp/4000/p2p/12D3KooW...

discovery:
  enabled: false

log:
  level: info
  format: text
```

### Minimal Node

```bash
bethrou-node start --listen /ip4/0.0.0.0/tcp/4000
```

## Common Scenarios

### Single Exit Node

**Use case:** Simple setup with one trusted exit node.

**Client configuration:**
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
  - id: 12D3KooWExample...
    addrs:
      - /ip4/203.0.113.50/tcp/4000/p2p/12D3KooWExample...

discovery:
  enabled: false

log:
  level: info
  format: text
```

### Multiple Exit Nodes

**Use case:** Redundancy and load balancing.

**Client configuration:**
```yaml
key: "network.key"

server:
  listen: "127.0.0.1:1080"
  auth: false

routing:
  strategy: round-robin
  health: 30s
  timeout: 15s

nodes:
  - id: 12D3KooWNode1...
    addrs:
      - /ip4/203.0.113.10/tcp/4000/p2p/12D3KooWNode1...
  - id: 12D3KooWNode2...
    addrs:
      - /ip4/203.0.113.20/tcp/4000/p2p/12D3KooWNode2...
  - id: 12D3KooWNode3...
    addrs:
      - /ip4/203.0.113.30/tcp/4000/p2p/12D3KooWNode3...

discovery:
  enabled: false

log:
  level: info
  format: text
```

### Dynamic Discovery

**Use case:** Automatically discover available exit nodes.

**Node:**
```bash
bethrou-node start \
  --listen /ip4/0.0.0.0/tcp/4000 \
  --discover \
  --discover-address redis://redis.example.com:6379 \
  --discover-topic bethrou-prod
```

**Client:**
```yaml
key: "network.key"

server:
  listen: "127.0.0.1:1080"
  auth: false

routing:
  strategy: fastest
  health: 30s
  timeout: 10s

nodes: []

discovery:
  enabled: true
  address: "redis://redis.example.com:6379"
  topic: "bethrou-prod"
  timeout: "10s"

log:
  level: info
  format: text
```

### NAT Traversal

**Use case:** Clients or nodes behind NAT/firewall.

**Public relay node:**
```bash
bethrou-node start \
  --listen /ip4/0.0.0.0/tcp/4000 \
  --relay-mode \
```

**Client behind NAT:**
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
  - id: 12D3KooWNode...
    relay: /ip4/203.0.113.100/tcp/4000/p2p/12D3KooWRelay...

discovery:
  enabled: false

log:
  level: info
  format: text
```

## Routing Strategies

### Random

Best for: Load distribution

```yaml
routing:
  strategy: random
```

### Round-Robin

Best for: Fair distribution

```yaml
routing:
  strategy: round-robin
```

### Fastest

Best for: Performance

```yaml
routing:
  strategy: fastest
  health: 30s  # Check latency every 30s
```

## Troubleshooting Configuration

### Client can't connect to nodes

1. Verify node is running
2. Check peer ID matches
3. Verify network.key is identical
4. Test connectivity: `nc -zv node-ip 4000`

### Discovery not working

1. Test Redis: `redis-cli -h redis-host ping`
2. Check topic names match
3. Verify authentication credentials
4. Enable debug logging

### Performance issues

1. Use `fastest` routing strategy
2. Increase health check interval
3. Add more exit nodes
4. Check network latency

## Best Practices

1. **Use HTTPS**: Always use HTTPS for sensitive traffic
2. **Secure keys**: Set `network.key` permissions to 600
3. **Monitor logs**: Regularly review logs for issues
4. **Multiple nodes**: Use at least 2-3 exit nodes for redundancy
5. **Remote DNS**: Enable "Proxy DNS" in browser
6. **Regular rotation**: Rotate network keys periodically

## Next Steps

- [Deployment Guides](./deployment-local.md)
- [NAT Traversal](./nat-traversal.md)
- [Client Configuration Reference](../reference/client-config.md)
- [Node Configuration Reference](../reference/node-config.md)
