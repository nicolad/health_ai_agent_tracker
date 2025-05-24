import * as Lucide from 'lucide-react';
export const Icon=({name,size=18}:{name:string,size?:number})=>{
  const C=(Lucide as any)[name];
  return C? <C size={size} /> : null;
};
