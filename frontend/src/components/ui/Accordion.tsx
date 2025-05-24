import styles from './Accordion.module.css';
export default function Accordion({title,children}:{title:string,children:React.ReactNode}){
  return (
    <details className={styles.accordion}>
      <summary>{title}</summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
