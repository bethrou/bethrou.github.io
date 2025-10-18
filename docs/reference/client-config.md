---
sidebar_position: 1
title: "Client"
description: "Complete reference documentation for Bethrou client configuration: TOML/YAML options, SOCKS5 setup, node selection strategies, health checks, and environment variables."
keywords: ["client configuration", "reference", "TOML", "SOCKS5", "proxy settings", "routing strategies"]
image: "../../img/bethrou-icon.svg"
---

# Client Configuration

Complete reference for Bethrou client configuration.

## Configuration File

The client reads configuration from a YAML file (typically `client.yaml`).

### Full Example

```yaml
key: "network.key"

server:
  listen: "127.0.0.1:1080"
  auth: false
  user: ""
  pass: ""

routing:
  strategy: random
  health: 30s
  timeout: 10s

nodes:
  - id: 12D3KooWRmF8HJnQyW4pqVx9Tz7J8mN5kL3pQrS...
    addrs:
      - /ip4/192.168.1.100/tcp/4000/p2p/12D3KooWRmF8HJnQyW4pqVx...
    relay: ""
  - id: 12D3KooWAbc123def456...
    addrs:
      - /ip4/192.168.1.200/tcp/4000/p2p/12D3KooWAbc123def456...

discovery:
  enabled: false
  address: "redis://localhost:6379"
  topic: "bethrou-nodes"
  timeout: "10s"
  user: ""
  pass: ""

log:
  level: info
  format: text
```

## Configuration Sections

### `key`

Path to the network key file for private network authentication.

- **Type**: string
- **Required**: yes
- **Default**: `"network.key"`
- **Description**: Path to the network.key file used for private network authentication with libp2p

**Example:**
```yaml
key: "network.key"
```

**With absolute path:**
```yaml
key: "/etc/bethrou/network.key"
```

:::info Network Key Required
All nodes and clients in your Bethrou network must use the same network key file. See [Installation Guide](../getting-started/installation.md#generate-network-key) for how to generate one.
:::

### `server`

Controls the local SOCKS5 proxy server.

#### `listen`
- **Type**: string
- **Default**: `"127.0.0.1:1080"`
- **Description**: Address and port for the SOCKS5 server to listen on

**Examples:**
```yaml
listen: "127.0.0.1:1080"      # Localhost only
listen: "0.0.0.0:1080"        # All interfaces (use with caution!)
listen: "127.0.0.1:9050"      # Custom port
```

#### `auth`
- **Type**: boolean
- **Default**: `false`
- **Description**: Enable SOCKS5 user/password authentication

**Example:**
```yaml
server:
  listen: "127.0.0.1:1080"
  auth: true
  user: "myuser"
  pass: "mypassword"
```

#### `user` / `pass`
- **Type**: string
- **Default**: `""`
- **Description**: Credentials for SOCKS5 authentication (when `auth: true`)
- **Required**: Yes, when `auth: true`

**Example with authentication:**
```yaml
server:
  listen: "127.0.0.1:1080"
  auth: true
  user: "bethrou-user"
  pass: "secure-password-123"
```

:::info Authentication Support
SOCKS5 authentication is fully implemented and functional. Configure your SOCKS5 client (browser, application) to use the same user and pass credentials.
:::

### `routing`

Controls how the client selects exit nodes.

#### `strategy`
- **Type**: string
- **Options**: `random`, `round-robin`, `fastest`
- **Default**: `random`
- **Description**: Strategy for selecting which exit node to use

**Strategies:**

**`random`**
- Selects a random healthy node for each connection
- Good for load distribution
- Simple and effective

**`round-robin`**
- Rotates through nodes in order
- Fair distribution across all nodes
- Predictable behavior

**`fastest`**
- Selects the node with lowest latency
- Best performance
- May overload the fastest node

**Example:**
```yaml
routing:
  strategy: fastest  # Use fastest node
```

#### `health`
- **Type**: duration
- **Default**: `30s`
- **Description**: Interval for health checks on exit nodes

**Examples:**
```yaml
health: 30s   # Check every 30 seconds
health: 1m    # Check every minute
health: 10s   # Check every 10 seconds
```

#### `timeout`
- **Type**: duration
- **Default**: `10s`
- **Description**: Timeout for establishing connections to destinations

**Examples:**
```yaml
timeout: 10s  # 10 second timeout
timeout: 30s  # 30 second timeout
timeout: 5s   # 5 second timeout
```

### `nodes`

List of static exit nodes to connect to.

Each node requires:

#### `id`
- **Type**: string (Peer ID)
- **Required**: yes
- **Description**: The libp2p Peer ID of the exit node

**Example:**
```yaml
id: 12D3KooWRmF8HJnQyW4pqVx9Tz7J8mN5kL3pQrS...
```

#### `addrs`
- **Type**: array of strings (multiaddrs)
- **Required**: yes (unless using relay)
- **Description**: List of multiaddresses to reach the node

**Examples:**
```yaml
addrs:
  - /ip4/192.168.1.100/tcp/4000/p2p/12D3KooW...
  - /ip4/203.0.113.50/tcp/4000/p2p/12D3KooW...
```

#### `relay`
- **Type**: string (multiaddr)
- **Optional**: yes
- **Description**: Relay node to use if the node is behind NAT

**Example:**
```yaml
relay: /ip4/198.51.100.10/tcp/4000/p2p/12D3KooWRelay...
```

### `discovery`

Configuration for Redis-based node discovery.

#### `enabled`
- **Type**: boolean
- **Default**: `false`
- **Description**: Enable dynamic node discovery via Redis

#### `address`
- **Type**: string
- **Default**: `"redis://localhost:6379"`
- **Description**: Redis server connection string

**Examples:**
```yaml
address: "redis://localhost:6379"
address: "redis://:password@redis.example.com:6379"
address: "redis://user:pass@10.0.0.5:6379/0"
```

#### `topic`
- **Type**: string
- **Default**: `"bethrou-nodes"`
- **Description**: Redis pub/sub topic for node announcements

#### `timeout`
- **Type**: duration
- **Default**: `"10s"`
- **Description**: Timeout for Redis operations

#### `user` / `pass`
- **Type**: string
- **Default**: `""`
- **Description**: Redis authentication credentials

**Example with authentication:**
```yaml
discovery:
  enabled: true
  address: "redis://redis.example.com:6379"
  topic: "my-private-network"
  user: "bethrou-client"
  pass: "secret-password"
```

### `log`

Logging configuration.

#### `level`
- **Type**: string
- **Options**: `debug`, `info`, `warn`, `error`
- **Default**: `info`
- **Description**: Log level verbosity

**Levels:**
- `debug`: Very verbose, includes all operations
- `info`: Normal operations and important events
- `warn`: Warnings and recoverable errors
- `error`: Only errors

#### `format`
- **Type**: string
- **Options**: `text`, `json`
- **Default**: `text`
- **Description**: Log output format

**Example:**
```yaml
log:
  level: debug    # Verbose logging
  format: json    # JSON structured logs
```

## Minimal Configuration

The simplest working configuration:

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
  - id: 12D3KooWRmF8HJnQyW4pqVx...
    addrs:
      - /ip4/192.168.1.100/tcp/4000/p2p/12D3KooWRmF8HJnQyW4pqVx...

discovery:
  enabled: false

log:
  level: info
  format: text
```

## Configuration Examples

### Local Testing

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
      - /ip4/127.0.0.1/tcp/4000/p2p/12D3KooW...

discovery:
  enabled: false

log:
  level: debug
  format: text
```

### Multiple Static Nodes

```yaml
key: "network.key"

server:
  listen: "127.0.0.1:1080"
  auth: false

routing:
  strategy: round-robin
  health: 60s
  timeout: 10s

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

## Next Steps

- [Node Configuration](./node-config.md)
- [Configuration Guide](../guides/configuration.md)
