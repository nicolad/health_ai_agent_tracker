import clsx from 'clsx';
import styles from './Button.module.css';
export default function Button({variant='primary',children,...p}:{variant?:'primary'|'ghost'|'danger'}&React.ButtonHTMLAttributes<HTMLButtonElement>){
  return <button className={clsx(styles.button,styles[variant])} {...p}>{children}</button>;
}
