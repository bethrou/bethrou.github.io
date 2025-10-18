import type {ReactNode} from 'react';
import SectionHeader from '@site/src/components/SectionHeader';
import SectionBody from '@site/src/components/SectionBody';
import styles from './styles.module.css';

export default function HowItWorks(): ReactNode {
  return (
    <section className={styles.howItWorks}>
      <div className="container">
        <SectionHeader 
          title="How It Works"
          subtitle="Understanding the data flow through Bethrou's P2P proxy network"
        />
        <SectionBody>
        <div className={styles.architectureDiagram}>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>Your Application</div>
              <div className={styles.stepDescription}>
                Browser, CLI tool, or any SOCKS5-compatible app
              </div>
            </div>
          </div>
          
          <div className={styles.flowArrow}>
            <div className={styles.arrowLine}></div>
            <div className={styles.arrowLabel}>SOCKS5 Protocol</div>
          </div>
          
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>Bethrou Client</div>
              <div className={styles.stepDescription}>
                Local SOCKS5 proxy server on localhost:1080
              </div>
            </div>
          </div>
          
          <div className={styles.flowArrow}>
            <div className={styles.arrowLine}></div>
            <div className={styles.arrowLabel}>libp2p Stream</div>
          </div>
          
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>Exit Node</div>
              <div className={styles.stepDescription}>
                Trusted peer in your private network
              </div>
            </div>
          </div>
          
          <div className={styles.flowArrow}>
            <div className={styles.arrowLine}></div>
            <div className={styles.arrowLabel}>TCP Connection</div>
          </div>
          
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>Destination</div>
              <div className={styles.stepDescription}>
                Final target on the internet
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.keyFeatures}>
          <div className={styles.featureBox}>
            <div className={styles.featureTitle}>Private Network</div>
            <div className={styles.featureDetail}>Pre-shared key isolates your network</div>
          </div>
          
          <div className={styles.featureBox}>
            <div className={styles.featureTitle}>P2P Architecture</div>
            <div className={styles.featureDetail}>No central servers, built on libp2p</div>
          </div>
          
          <div className={styles.featureBox}>
            <div className={styles.featureTitle}>NAT Traversal</div>
            <div className={styles.featureDetail}>Relay nodes handle firewalls</div>
          </div>
          
          <div className={styles.featureBox}>
            <div className={styles.featureTitle}>Load Balancing</div>
            <div className={styles.featureDetail}>Multiple routing strategies</div>
          </div>
        </div>
        </SectionBody>
      </div>
    </section>
  );
}
