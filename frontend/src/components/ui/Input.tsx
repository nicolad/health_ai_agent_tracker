import styles from './Input.module.css';
export default function Input(props:React.InputHTMLAttributes<HTMLInputElement>){
  return <input className={styles.input} {...props}/>;
}
