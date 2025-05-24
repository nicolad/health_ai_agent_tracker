export const Link=({to,children,...p}:{to:string}&React.ComponentProps<'a'>)=><a href={to} {...p}>{children}</a>;
