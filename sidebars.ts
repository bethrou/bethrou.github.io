import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    docsSidebar: [
        {
            type: 'category',
            label: 'Getting Started',
            collapsed: false,
            items: [
                'getting-started/introduction',
                'getting-started/installation',
                'getting-started/quick-start',
            ],
        },
        {
            type: 'category',
            label: 'Guides',
            items: [
                'guides/configuration',
                'guides/deployment-local',
                'guides/deployment-docker',
                'guides/nat-traversal',
            ],
        },
        {
            type: 'category',
            label: 'Concepts',
            items: [
                'concepts/architecture',
                'concepts/security',
            ],
        },
        {
            type: 'category',
            label: 'Reference',
            items: [
                'reference/client-config',
                'reference/node-config',
            ],
        },
    ],
};

export default sidebars;
