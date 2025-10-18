---
sidebar_position: 3
title: "Docker Deployment"
description: "Deploy Bethrou using Docker and Podman: containerization, image building, docker-compose setup, and container networking configuration."
keywords: ["docker", "deployment", "containers", "docker-compose", "podman", "containerization"]
image: "../../img/bethrou-icon.svg"
---

# Docker Deployment

Guide for deploying Bethrou using Docker or Podman.

## Quick Start

### Build Image

```bash
# From repository root
docker build -f ./node/Containerfile -t bethrou .
```

```bash
# Build client image
docker build -f ./client/Containerfile -t bethrou-client .
```

### Run Node

```bash
docker run -d \
  --name bethrou-node \
  -p 4000:4000 \
  -v $(pwd)/network.key:/etc/bethrou/network.key:ro \
  bethrou
```

### Run Client

```bash
docker run -d
  --name bethrou-client \
  -p 1080:1080 \
  -v "$(pwd)/client/client.yaml:/etc/bethrou/client.yaml:ro" \
  -v "$(pwd)/network.key:/etc/bethrou/network.key:ro" \
  bethrou-client
```

## Using Docker Hub

Pull pre-built image for node:

```bash
docker pull henrybarreto/bethrou-node:latest
```

Pull pre-built image for client:

```bash
docker pull henrybarreto/bethrou-client:latest
```

## Volume Mounts

### Required Volumes

**Node:**
```bash
-v $(pwd)/network.key:/etc/bethrou/network.key:ro
```

**Client:**
```bash
-v $(pwd)/client.yaml:/etc/bethrou/client.yaml:ro
-v $(pwd)/network.key:/etc/bethrou/network.key:ro
```

### Optional Volumes

**Persistent node identity:**
```bash
-v $(pwd)/node.key:/node.key
```

## Logging

View logs:
```bash
docker logs -f bethrou-node
```

## Next Steps

- [Local Deployment](./deployment-local.md)
- [Configuration Guide](./configuration.md)
- [Security Best Practices](../concepts/security.md)
