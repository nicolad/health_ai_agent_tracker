import styles from './Heading.module.css';
export default function Heading({level=1,children}:{level?:1|2|3|4|5|6;children:React.ReactNode}){
  const Tag = (`h${level}`) as keyof JSX.IntrinsicElements;
  return <Tag className={(styles as any)[`h${level}`]}>{children}</Tag>;
}
