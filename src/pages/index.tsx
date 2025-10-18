import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Features from '@site/src/components/Features';
import HowItWorks from '@site/src/components/HowItWorks';
import QuickStart from '@site/src/components/QuickStart';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function Header() {
    const { siteConfig } = useDocusaurusContext();
    const glowRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!glowRef.current || !headerRef.current) return;

            const header = headerRef.current;
            const rect = header.getBoundingClientRect();

            // Check if mouse is within header bounds
            const isInHeader = 
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            if (isInHeader) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                glowRef.current.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <header className={styles.heroBanner} ref={headerRef}>
            <div className={styles.heroBackground}>
                <div 
                    className={styles.heroGlow}
                    ref={glowRef}
                    style={{ opacity: isHovering ? 1 : 0 }}
                ></div>
                <svg className={styles.heroPatternSvg} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
                    <defs>
                        <pattern id="hero-grid" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="translate(0,0) scale(1)">
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(204, 141, 74, 0.08)" strokeWidth="1"/>
                        </pattern>
                        <filter id="hero-blur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                        </filter>
                    </defs>
                    <rect width="1200" height="600" fill="url(#hero-grid)" opacity="0.3"/>
                </svg>
                <div className={styles.heroShape1}></div>
                <div className={styles.heroShape2}></div>
                <div className={styles.heroShape3}></div>
            </div>
            <div className={styles.heroContent}>
                <div className={styles.mvpBadge}>
                    <span className={styles.mvpDot}></span>
                    MVP Status - Improvements being made
                </div>
                <Heading as="h1" className={styles.heroTitle}>
                    Decentralized Proxy Network
                </Heading>
                
                <p className={styles.heroSubtitle}>
                    Control your network traffic with a P2P proxy built on libp2p. No central servers. Full control. Your rules.
                </p>
                
                <div className={styles.buttons}>
                    <Link
                        className={styles.buttonPrimary}
                        to="/docs/getting-started/quick-start/">
                        Get Started
                    </Link>
                    <Link
                        className={styles.buttonSecondary}
                        to="/docs/concepts/architecture/">
                        Learn Architecture
                    </Link>
                    <Link
                        className={styles.buttonGhost}
                        to="https://github.com/bethrou/bethrou">
                        View on GitHub
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Bethrou",
        "url": "https://bethrou.github.io",
        "logo": "https://bethrou.github.io/img/bethrou-logo.svg",
        "description": "A decentralized peer-to-peer proxy network built on libp2p for secure, private internet routing.",
        "sameAs": ["https://github.com/bethrou/bethrou"],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Technical Support",
            "url": "https://github.com/bethrou/bethrou"
        }
    };

    const projectSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Bethrou",
        "description": "A decentralized peer-to-peer proxy network built on libp2p. Route traffic through trusted exit nodes using SOCKS5.",
        "url": "https://bethrou.github.io",
        "applicationCategory": "NetworkApplication",
        "operatingSystem": "Linux, macOS, Windows",
        "author": {
            "@type": "Organization",
            "name": "Bethrou Project"
        },
        "downloadUrl": "https://github.com/bethrou/bethrou",
        "license": "MIT",
        "releaseDate": new Date().toISOString().split('T')[0]
    };

    return (
        <>
            <Head>
                <title>Bethrou - Decentralized P2P Proxy Network | libp2p-based Privacy Solution</title>
                <meta name="description" content="Bethrou: A decentralized peer-to-peer proxy network built on libp2p. Route internet traffic through trusted nodes with SOCKS5, full privacy control, and zero central servers." />
                <meta name="keywords" content="proxy network, p2p, decentralized, libp2p, privacy, SOCKS5, VPN alternative, NAT traversal, open source, network routing" />
                <meta property="og:title" content="Bethrou - Decentralized P2P Proxy Network" />
                <meta property="og:description" content="Control your network traffic with a peer-to-peer proxy built on libp2p. No central servers. Full control. Your rules." />
                <meta property="og:image" content="https://bethrou.github.io/img/bethrou-banner.svg" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Bethrou - Decentralized P2P Proxy Network" />
                <meta name="twitter:description" content="A decentralized P2P proxy network built on libp2p with full privacy and no central servers." />
                <meta name="twitter:image" content="https://bethrou.github.io/img/bethrou-banner.svg" />
                <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>
            </Head>
            <Layout
                title={`${siteConfig.title} - Decentralized P2P Proxy Network`}
                description="Peer-to-peer proxy network built on libp2p. Route traffic through trusted exit nodes using SOCKS5. Private networks with pre-shared keys. NAT traversal support. Open source and self-hosted.">
                <Header />
                <main>
                    <HowItWorks />
                    <Features />
                    <QuickStart />
                </main>
            </Layout>
        </>
    );
}
