import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from '@docusaurus/Link';
import SectionHeader from '@site/src/components/SectionHeader';
import SectionBody from '@site/src/components/SectionBody';
import styles from './styles.module.css';

const steps = [
    {
        number: 1,
        title: 'Generate Network Key',
        description: 'Create a pre-shared key to isolate your private network',
        why: 'The network key ensures only authorized nodes can communicate with each other, creating a secure private network.',
        code: `echo "/key/swarm/psk/1.0.0/" > network.key
echo "/base16/" >> network.key
openssl rand -hex 32 >> network.key`,
        expectedOutput: 'A network.key file is created in your current directory'
    },
    {
        number: 2,
        title: 'Start Exit Node',
        description: 'Launch a node that will proxy traffic to the internet',
        why: 'The exit node routes traffic from your clients to the internet and handles NAT traversal.',
        code: `docker run -d --name bethrou-node
-p 4000:4000
-v $(pwd)/network.key:/etc/bethrou/network.key:ro
henrybarreto/bethrou-node:latest`,
        expectedOutput: 'Node container starts and listens on port 4000. Check logs with: docker logs bethrou-node'
    },
    {
        number: 3,
        title: 'Connect Client',
        description: 'Start the local SOCKS5 proxy and connect to your node',
        why: 'The client creates a local SOCKS5 proxy that applications can use to route traffic through your network.',
        code: `docker run -d --name bethrou-client
-p 1080:1080
-v "$(pwd)/client.yaml:/etc/bethrou/client.yaml:ro"
-v "$(pwd)/network.key:/etc/bethrou/network.key:ro"
henrybarreto/bethrou-client:latest`,
        expectedOutput: 'Client container starts and opens SOCKS5 on port 1080. Check logs with: docker logs bethrou-client'
    },
    {
        number: 4,
        title: 'Configure Your App',
        description: 'Point your application to use the SOCKS5 proxy',
        why: 'Your application needs to know where to send traffic. The SOCKS5 proxy running locally routes all connections through your private network.',
        code: `# Example for curl
curl -x socks5://127.0.0.1:1080 https://example.com

# Example for environment variable
export http_proxy=socks5://127.0.0.1:1080
export https_proxy=socks5://127.0.0.1:1080`,
        expectedOutput: 'Your traffic is now routing through the Bethrou network. Success!'
    }
];

export default function QuickStart(): ReactNode {
    const [currentStep, setCurrentStep] = useState(0);
    const [expandedStep, setExpandedStep] = useState<number | null>(null);
    const [copiedStep, setCopiedStep] = useState<number | null>(null);

    const goToNextStep = () => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
    };

    const goToPreviousStep = () => {
        setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    };

    const copyToClipboard = (text: string, stepNumber: number) => {
        navigator.clipboard.writeText(text);
        setCopiedStep(stepNumber);
        setTimeout(() => setCopiedStep(null), 2000);
    };

    const toggleStepExpansion = (stepNumber: number) => {
        setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
    };

    const step = steps[currentStep];
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;

    return (
        <section className={styles.quickStart}>
            <div className="container">
                <SectionHeader
                    title="Get Started in 4 Steps"
                    subtitle="Set up your first private proxy network in minutes"
                />
                <SectionBody>

                    {/* Progress Bar */}
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <div className={styles.progressText}>
                            Step {currentStep + 1} of {steps.length} Complete
                        </div>
                    </div>

                    {/* Main Step Card */}
                    <div className={styles.stackedStepsContainer}>
                        <div className={styles.stackedCard}>
                            <div className={styles.stepHeader}>
                                <div className={styles.stepNumber}>{step.number}</div>
                                <div className={styles.stepTitle}>{step.title}</div>
                            </div>
                            <div className={styles.stepDescription}>
                                {step.description}
                            </div>

                            {/* Why This Step? */}
                            <button
                                className={styles.expandButton}
                                onClick={() => toggleStepExpansion(step.number)}
                                aria-expanded={expandedStep === step.number}
                            >
                                <span>{expandedStep === step.number ? '▼' : '▶'}</span>
                                Why this step?
                            </button>

                            {expandedStep === step.number && (
                                <div className={styles.expandedContent}>
                                    <div className={styles.whyBox}>
                                        {step.why}
                                    </div>
                                    <div className={styles.expectedBox}>
                                        <strong>Expected Result:</strong> {step.expectedOutput}
                                    </div>
                                </div>
                            )}

                            {/* Code Block with Copy Button */}
                            <div className={styles.codeBlockContainer}>
                                <div className={styles.codeBlockHeader}>
                                    <span className={styles.codeLabel}>Terminal Command</span>
                                    <button
                                        className={styles.copyButton}
                                        onClick={() => copyToClipboard(step.code, step.number)}
                                        aria-label="Copy command"
                                    >
                                        {copiedStep === step.number ? (
                                            <>
                                                <span className={styles.checkmark}>✓</span>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <span className={styles.copyIcon}>📋</span>
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className={styles.codeBlock}>
                                    <code>
                                        {step.code}
                                    </code>
                                </div>
                            </div>
                        </div>

                        {/* Step Indicators */}
                        <div className={styles.stepIndicators}>
                            {steps.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.indicator} ${index === currentStep ? styles.active : ''} ${index < currentStep ? styles.completed : ''}`}
                                    onClick={() => setCurrentStep(index)}
                                    aria-label={`Go to step ${index + 1}`}
                                >
                                    {index < currentStep ? '✓' : index + 1}
                                </button>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className={styles.navigationButtons}>
                            <button
                                className={`${styles.navButton} ${styles.prevButton}`}
                                onClick={goToPreviousStep}
                                aria-label="Previous step"
                                disabled={currentStep === 0}
                            >
                                ← Previous
                            </button>
                            <div className={styles.stepCounter}>
                                Step {currentStep + 1} of {steps.length}
                            </div>
                            <button
                                className={`${styles.navButton} ${styles.nextButton}`}
                                onClick={goToNextStep}
                                aria-label="Next step"
                                disabled={currentStep === steps.length - 1}
                            >
                                Next →
                            </button>
                        </div>
                    </div>

                    {/* What's Next Section */}
                    <div className={styles.whatsNextSection}>
                        <h3>What's Next?</h3>
                        <div className={styles.nextStepsGrid}>
                            <div className={styles.nextStepCard}>
                                <div className={styles.nextStepNumber}>1</div>
                                <h4>Explore Advanced Config</h4>
                                <p>Learn about custom routing rules, multiple exit nodes, and performance tuning</p>
                            </div>
                            <div className={styles.nextStepCard}>
                                <div className={styles.nextStepNumber}>2</div>
                                <h4>Deploy to Production</h4>
                                <p>Use Docker for easy deployment or run on your own servers</p>
                            </div>
                            <div className={styles.nextStepCard}>
                                <div className={styles.nextStepNumber}>3</div>
                                <h4>Contribute to Project</h4>
                                <p>Help improve Bethrou by contributing features, fixes, and documentation on GitHub</p>
                            </div>
                        </div>

                        <div className={styles.ctaButtons}>
                            <Link
                                className="button button--primary button--lg"
                                to="/docs/getting-started/quick-start/">
                                Full Installation Guide
                            </Link>
                            <Link
                                className="button button--outline button--primary button--lg"
                                to="/docs/concepts/architecture/">
                                Learn Architecture
                            </Link>
                            <Link
                                className="button button--outline button--primary button--lg"
                                to="/docs/guides/configuration/">
                                Configuration Guide
                            </Link>
                        </div>
                    </div>
                </SectionBody>
            </div>
        </section>
    );
}
