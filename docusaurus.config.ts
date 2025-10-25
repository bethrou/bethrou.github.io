import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Bethrou - Decentralized P2P Proxy Network',
    tagline: 'Peer-to-Peer Proxy Network Built on libp2p. Route traffic through trusted nodes with full privacy control.',
    favicon: '/img/bethrou-icon.svg',

    future: {
        v4: true,
    },

    url: 'https://bethrou.github.io',
    baseUrl: '/',

    organizationName: 'bethrou',
    projectName: 'bethrou.github.io',
    deploymentBranch: 'deployment',

    onBrokenLinks: 'throw',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    staticDirectories: ['static'],

    headTags: [
        {
            tagName: 'link',
            attributes: {
                rel: 'icon',
                href: '/img/bethrou-icon.svg',
                type: 'image/svg+xml',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'apple-touch-icon',
                href: '/img/bethrou-icon.svg',
                sizes: '180x180',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'manifest',
                href: '/manifest.json',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'theme-color',
                content: '#1a1a1a',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'color-scheme',
                content: 'dark light',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'description',
                content: 'Bethrou is a decentralized peer-to-peer proxy network built on libp2p. Route internet traffic through trusted nodes with SOCKS5, full privacy, and no central servers.',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'keywords',
                content: 'proxy network, p2p, decentralized, libp2p, privacy, SOCKS5, VPN alternative, NAT traversal, open source',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'author',
                content: 'Bethrou Project',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'robots',
                content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'googlebot',
                content: 'index, follow',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'og:title',
                property: 'og:title',
                content: 'Bethrou - Decentralized P2P Proxy Network',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'og:description',
                property: 'og:description',
                content: 'A decentralized peer-to-peer proxy network built on libp2p. Control your network traffic with full privacy and no central servers.',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'og:type',
                property: 'og:type',
                content: 'website',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'og:url',
                property: 'og:url',
                content: 'https://bethrou.github.io',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'og:image',
                property: 'og:image',
                content: 'https://bethrou.github.io/img/bethrou-social.png',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'og:site_name',
                property: 'og:site_name',
                content: 'Bethrou Documentation',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:title',
                content: 'Bethrou - Decentralized P2P Proxy Network',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:description',
                content: 'A decentralized peer-to-peer proxy network built on libp2p. Full privacy, no central servers.',
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'twitter:image',
                content: 'https://bethrou.github.io/img/bethrou-social.png',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'canonical',
                href: 'https://bethrou.github.io',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'alternate',
                hrefLang: 'en',
                href: 'https://bethrou.github.io',
            },
        },
        {
            tagName: 'script',
            attributes: {
                type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Bethrou',
                alternateName: 'Bethrou P2P Proxy Network',
                description: 'A decentralized peer-to-peer proxy network built on libp2p. Route internet traffic through trusted nodes with SOCKS5, full privacy, and no central servers.',
                url: 'https://bethrou.github.io',
                image: 'https://bethrou.github.io/img/bethrou-social.png',
                applicationCategory: 'NetworkApplication',
                operatingSystem: 'Any',
                releaseNotes: 'https://github.com/bethrou/bethrou/releases',
                license: 'https://github.com/bethrou/bethrou/blob/main/LICENSE',
                downloadUrl: 'https://github.com/bethrou/bethrou',
                codeRepository: 'https://github.com/bethrou/bethrou',
                creator: {
                    '@type': 'Organization',
                    name: 'Bethrou Project',
                    url: 'https://github.com/bethrou',
                },
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
            }),
        },
        {
            tagName: 'script',
            attributes: {
                type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Bethrou',
                alternateName: 'Bethrou Project',
                url: 'https://bethrou.github.io',
                logo: 'https://bethrou.github.io/img/bethrou-logo.svg',
                description: 'Decentralized peer-to-peer proxy network built on libp2p',
                sameAs: [
                    'https://github.com/bethrou/bethrou',
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    url: 'https://github.com/bethrou/bethrou/issues',
                    contactType: 'Support',
                },
            }),
        },
        {
            tagName: 'script',
            attributes: {
                type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Bethrou Documentation',
                url: 'https://bethrou.github.io',
                description: 'Documentation and guides for Bethrou - a decentralized P2P proxy network',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://bethrou.github.io/search?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                },
            }),
        },
    ],

    markdown: {
        mermaid: true,
    },

    plugins: [
        [
            '@docusaurus/plugin-google-gtag',
            {
                trackingID: 'G-23W8CPP7BF',
                anonymizeIP: true,
            },
        ],
    ],

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl:
                        'https://github.com/bethrou/bethrou/tree/main/docs/',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],
    themes: [
        '@docusaurus/theme-mermaid',
    ],
    themeConfig: {
        image: 'img/bethrou-social.png',
        metadata: [
            {
                name: 'theme-color',
                content: '#1a1a1a',
            },
            {
                name: 'color-scheme',
                content: 'dark light',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
            },
        ],
        colorMode: {
            defaultMode: 'dark',
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'Bethrou',
            logo: {
                alt: 'Bethrou Logo',
                src: 'img/bethrou-logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docsSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                {
                    href: 'https://github.com/bethrou/bethrou',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Getting Started',
                            to: '/docs/getting-started/installation',
                        },
                        {
                            label: 'Architecture',
                            to: '/docs/concepts/architecture',
                        },
                        {
                            label: 'Configuration',
                            to: '/docs/reference/client-config',
                        },
                    ],
                },
                {
                    title: 'Resources',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/bethrou/bethrou',
                        },
                        {
                            label: 'libp2p',
                            href: 'https://libp2p.io/',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Bethrou Project. Licensed under MIT.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['bash', 'go', 'yaml', 'docker'],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
