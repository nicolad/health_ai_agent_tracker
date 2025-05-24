export default function Text({as='p',children}:{as?:'p'|'span';children:React.ReactNode}){
  const Tag=as as keyof JSX.IntrinsicElements;
  return <Tag>{children}</Tag>;
}
