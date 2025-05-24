import SideNav from '@/components/SideNav';
export default function AppLayout({children}:{children:React.ReactNode}){
  return (
    <div>
      <header><h1>Blueprint</h1></header>
      <div style={{display:'flex'}}>
        <SideNav />
        <main style={{flex:1}}>{children}</main>
      </div>
      <footer>©</footer>
    </div>
  );
}
