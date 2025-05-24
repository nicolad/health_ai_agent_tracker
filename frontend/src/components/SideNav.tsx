import { NavLink, Stack, Text } from '@mantine/core';
import { Link, useRouterState } from '@tanstack/react-router';
import { routes } from '@/router/routes';

interface Props { onNavigate?: () => void }

export default function SideNav({ onNavigate }: Props) {
  const { location } = useRouterState();

  /* recursive flatten -------------------------------------------------- */
  const build: JSX.Element[] = [];
  const flatten = (rs: typeof routes, depth = 0) =>
    rs.forEach((r) => {
      if ('children' in r) {
        build.push(
          <Text key={r.label} fw={700} size="sm" mt={depth ? 'md' : 0}>
            {r.label}
          </Text>,
        );
        flatten(r.children!, depth + 1);
      } else {
        build.push(
          <NavLink
            key={r.path}
            label={r.label}
            component={Link as any}
            to={r.path}
            active={location.pathname === r.path}
            pl={depth * 8 + 4}
            onClick={onNavigate}
          />,
        );
      }
    });
  flatten(routes);

  return (
    <Stack gap="xs" role="navigation" aria-label="Main">
      {build}
    </Stack>
  );
}

