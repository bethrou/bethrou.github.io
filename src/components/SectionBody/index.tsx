import type { ReactNode } from 'react';
import styles from './styles.module.css';

interface SectionBodyProps {
  children: ReactNode;
}

export default function SectionBody({ children }: SectionBodyProps): ReactNode {
  return (
    <div className={styles.body}>
      {children}
    </div>
  );
}
