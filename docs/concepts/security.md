---
sidebar_position: 4
title: "Security & Privacy"
description: "Comprehensive security guide for Bethrou: understand security model, trust assumptions, encryption, authentication, PSK security, and privacy considerations for P2P networks."
keywords: ["security", "privacy", "encryption", "P2P", "trust model", "libp2p security", "pre-shared keys"]
image: "../../img/bethrou-icon.svg"
---

# Security & Privacy

Understanding Bethrou's security model, trust assumptions, and privacy considerations.

## Security Model

Bethrou is designed for **privacy through trusted exit nodes**, not anonymity or protection against malicious nodes.

### Core Security Properties

**✅ What Bethrou Provides:**
- Network isolation via pre-shared keys
- Encrypted P2P connections (libp2p transport security)
- Authentication between peers
- Protection from unauthorized network access

**❌ What Bethrou Doesn't Provide:**
- Protection from malicious exit nodes
- Traffic anonymization
- Multi-hop routing
- Protection against traffic analysis

## Trust Model

### Who Do You Trust?

**Trusted Entities:**
- Exit nodes you control
- Exit nodes operated by trusted parties
- Other clients in your private network
- Redis discovery server (if used)

**Threats Mitigated:**
- Local ISP/network observing your traffic
- Destination websites seeing your real IP
- Unauthorized peers joining network
- Eavesdropping on P2P connections

**Threats NOT Mitigated:**
- Malicious exit nodes logging traffic
- Exit nodes modifying unencrypted traffic
- Traffic analysis by exit nodes
- Compromised network.key exposure

## Pre-Shared Key (PSK) Security

### How PSK Works

```
/key/swarm/psk/1.0.0/
/base16/
<64 hex characters>
```

- 256-bit symmetric key
- All peers must have identical key
- Used for network authentication
- Not encrypted in file (protect the file!)

### PSK Best Practices

**Generation:**
```bash
# Use cryptographically secure random
openssl rand -hex 32
```

**Storage:**
```bash
# Secure file permissions
chmod 600 network.key

# Never commit to version control
echo "network.key" >> .gitignore
```

**Rotation:**
Generate new key periodically and distribute to all peers securely.

## DNS Privacy

Enable remote DNS resolution to prevent DNS leaks:

**Firefox:** Check "Proxy DNS when using SOCKS v5"

**Test for leaks:**
```bash
# Visit while connected
https://dnsleaktest.com
```

## Operational Security

### Node Security

**Exit nodes should:**
- Run in secure environments
- Have proper firewall rules
- Log access for audit
- Apply security updates regularly

**Example firewall:**
```bash
# Allow libp2p
sudo ufw allow 4000/tcp
```

### Client Security

**Clients should:**
- Only connect to trusted exit nodes
- Verify node peer IDs
- Use HTTPS for sensitive traffic
- Enable remote DNS resolution

## Security Checklist

### Deployment

- [ ] Generate strong PSK with `openssl rand`
- [ ] Set `network.key` permissions to 600
- [ ] Add `network.key` to `.gitignore`
- [ ] Use HTTPS for all sensitive traffic
- [ ] Enable remote DNS resolution
- [ ] Configure firewall rules on exit nodes

### Ongoing

- [ ] Monitor access logs
- [ ] Review security updates
- [ ] Rotate PSK periodically
- [ ] Verify HTTPS usage

## Learn More

- [Architecture Overview](./architecture.md)
- [Configuration Best Practices](../guides/configuration.md)
