---
sidebar_position: 2
title: "Node"
description: "Complete reference for Bethrou exit node configuration: TOML/YAML options, relay setup, Redis discovery, authentication, and command-line parameters."
keywords: ["node configuration", "exit node", "reference", "relay node", "TOML", "Redis discovery"]
image: "../../img/bethrou-icon.svg"
---

# Node Configuration

Complete reference for Bethrou exit node configuration.

## Command-Line Configuration

Unlike the client, the node is primarily configured via command-line flags.

## Flags

### `--listen`

**Description:** Multiaddr to listen on for incoming connections.

**Default:** `/ip4/0.0.0.0/tcp/4000`

**Examples:**
```bash
# Listen on all interfaces, TCP port 4000
--listen /ip4/0.0.0.0/tcp/4000

# Listen on specific interface
--listen /ip4/192.168.1.100/tcp/4000

# Listen on IPv6
--listen /ip6/::/tcp/4000
```


### `--key`

**Description:** Path to network pre-shared key file.

**Default:** `./network.key`

### `--relay-mode`

**Description:** Enable relay mode to help NAT'd peers connect.

**Default:** `false`

**Example:**
```bash
bethrou-node start --listen /ip4/0.0.0.0/tcp/4000 --relay-mode
```

### `--connect-relay`

**Description:** Multiaddr of relay node to connect to.

**Example:**
```bash
bethrou-node start \
  --listen /ip4/0.0.0.0/tcp/4000 \
  --connect-relay /ip4/192.168.0.100/tcp/4000/p2p/12D3KooWRelay...
```

### `--discover`

**Description:** Enable Redis-based discovery.

**Default:** `false`

**Example:**
```bash
bethrou-node start \
  --listen /ip4/0.0.0.0/tcp/4000 \
  --discover \
  --discover-address redis://localhost:6379
```

### `--discover-address`

**Description:** Redis server address.

**Default:** `redis://localhost:6379`

**Format:**
```
redis://[username:password@]host:port[/database]
```

### `--discover-topic`

**Description:** Redis pub/sub topic.

**Default:** `bethrou-nodes`

## Next Steps

- [Docker Deployment](../guides/deployment-docker.md)
- [NAT Traversal](../guides/nat-traversal.md)
