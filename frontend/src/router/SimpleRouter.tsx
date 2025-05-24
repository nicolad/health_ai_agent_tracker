import { routes } from './routes';
import { useState,useEffect,createContext } from 'react';
export const RouteCtx = createContext({path:''});
export default function SimpleRouter(){
  const [hash,setHash]=useState(location.hash.slice(2)||'starter-guide');
  useEffect(()=>{const h=()=>{setHash(location.hash.slice(2));scrollTo(0,0)};addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[]);
  const current = routes.find(r=>r.path===hash);
  return (
    <RouteCtx.Provider value={{path:hash}}>
      {current?.element ?? <p>Not found</p>}
    </RouteCtx.Provider>
  );
}
