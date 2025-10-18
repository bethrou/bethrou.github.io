import type { ReactNode } from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps): ReactNode {
  return (
    <div className={styles.header}>
      <Heading as="h2" className={styles.title}>{title}</Heading>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
