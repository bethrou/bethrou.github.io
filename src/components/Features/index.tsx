import type {ReactNode} from 'react';
import {
  RiShieldCheckFill,
  RiGlobalLine,
  RiVipDiamondLine,
  RiRocketLine,
  RiLockLine,
  RiGitForkLine
} from '@remixicon/react';
import SectionHeader from '@site/src/components/SectionHeader';
import SectionBody from '@site/src/components/SectionBody';
import styles from './styles.module.css';

type UseCase = {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  highlights: string[];
  fullDescription: string;
  codeSnippet: string;
  codeLabel: string;
};

const useCases: UseCase[] = [
  {
    id: 'privacy',
    title: 'Privacy & Control',
    subtitle: 'Route through your own infrastructure',
    icon: <RiShieldCheckFill size={48} />,
    highlights: ['Full traffic control', 'Custom exit points', 'No ISP logging'],
    fullDescription: 'Direct your internet traffic through servers you control. Eliminate third-party visibility into your network activity.',
    codeSnippet: 'curl --socks5 localhost:1080 https://api.ipify.org',
    codeLabel: 'Verify exit IP'
  },
  {
    id: 'geo',
    title: 'Global Testing',
    subtitle: 'Multi-region application testing',
    icon: <RiGlobalLine size={48} />,
    highlights: ['Multiple regions', 'Dynamic selection', 'Load distribution'],
    fullDescription: 'Deploy exit nodes across geographic regions to test application behavior from different locations without VPN infrastructure.',
    codeSnippet: 'bethrou-client connect --region us-east,eu-west,asia-sg',
    codeLabel: 'Connect multi-region'
  },
  {
    id: 'isolation',
    title: 'Network Isolation',
    subtitle: 'Private networks for teams',
    icon: <RiVipDiamondLine size={48} />,
    highlights: ['Pre-shared keys', 'Zero exposure', 'Team-only access'],
    fullDescription: 'Create completely isolated networks accessible only to authorized peers. Perfect for development teams needing private infrastructure.',
    codeSnippet: 'bethrou-network create --psk $(openssl rand -hex 32)',
    codeLabel: 'Create isolated network'
  },
  {
    id: 'nat',
    title: 'NAT Traversal',
    subtitle: 'Bypass restrictive firewalls',
    icon: <RiRocketLine size={48} />,
    highlights: ['No port forwarding', 'Relay fallback', 'Always connected'],
    fullDescription: 'Automatically relay traffic through intermediary nodes when direct connections fail. Connect from anywhere behind any firewall.',
    codeSnippet: 'bethrou-node start --enable-relay --relay-concurrency 5',
    codeLabel: 'Enable relay mode'
  },
  {
    id: 'secure',
    title: 'Secure Tunneling',
    subtitle: 'End-to-end encrypted connections',
    icon: <RiLockLine size={48} />,
    highlights: ['Encrypted streams', 'Perfect forward secrecy', 'Zero-knowledge design'],
    fullDescription: 'All traffic is encrypted with libp2p noise protocol. No exit node can see your traffic, only your application data.',
    codeSnippet: 'bethrou-client connect --tls --verify-peer-cert=/path/to/ca.crt',
    codeLabel: 'Connect securely'
  },
  {
    id: 'distributed',
    title: 'Distributed Networks',
    subtitle: 'P2P without central servers',
    icon: <RiGitForkLine size={48} />,
    highlights: ['No central point', 'Peer discovery', 'Self-healing'],
    fullDescription: 'Build decentralized networks where every node is equal. No single point of failure, no central authority needed.',
    codeSnippet: 'bethrou-node start --bootstrap /ip4/192.168.1.100/tcp/4001/p2p/12D3KooxXXX',
    codeLabel: 'Bootstrap node'
  },
];

interface UseCaseCardProps extends UseCase {
  onClick: () => void;
}

function UseCaseCard({id, title, subtitle, icon, highlights, fullDescription, onClick}: UseCaseCardProps) {
  return (
    <div className={`${styles.card}`}>
      <div className={styles.cardInner}>
        <div className={styles.icon}>{icon}</div>
        
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardSubtitle}>{subtitle}</p>
        
        <div className={styles.cardContent}>
          <p className={styles.description}>{fullDescription}</p>
          
          <div className={styles.highlightsList}>
            {highlights.map((highlight, idx) => (
              <span key={idx} className={styles.highlight}>{highlight}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader 
          title="Real-World Use Cases"
          subtitle="See how Bethrou solves networking challenges across different scenarios"
        />
        <SectionBody>
          <div className={styles.grid}>
          {useCases.map((useCase) => (
            <UseCaseCard
              key={useCase.id}
              {...useCase}
              onClick={() => {}}
            />
          ))}
          </div>
        </SectionBody>
      </div>
    </section>
  );
}

