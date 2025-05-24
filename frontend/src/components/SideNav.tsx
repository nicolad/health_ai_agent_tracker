import { routes } from '@/router/routes';
import { RouteCtx } from '@/router/SimpleRouter';
import clsx from 'clsx';
import styles from './SideNav.module.css';
import { Link } from '@/components/ui/Link';
export default function SideNav(){
  const {path}=React.useContext(RouteCtx);
  const clusters = routes.reduce<Record<string,typeof routes>>((acc,r)=>{
    if(!r.element) return acc; (acc[r.group]??=[]).push(r); return acc;
  },{});
  return (
    <nav className={styles.sideNav}>
      {Object.entries(clusters).map(([g,ps])=>(
        <section key={g}>
          <h2 className={styles.cluster}>{g}</h2>
          <ul>{ps.map(p=>(
            <li key={p.path}>
              <Link to={`#/${p.path}`} className={clsx(path===p.path&&styles.active)}>
                {p.label}
              </Link>
            </li>
          ))}</ul>
        </section>
      ))}
    </nav>
  );
}
