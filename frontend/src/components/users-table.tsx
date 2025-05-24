import { Avatar, Loader, Table } from '@mantine/core';
import { UserButton } from '@clerk/clerk-react';

import useSWR from "swr";

export interface UserSchema {
  first_name: string;
  last_name: string;
  username: string;
  email_addresses: { email_address: string; id: string }[];
  profile_image_url: string;
}

export default function UsersTable() {
  const { isLoading, data } = useSWR("/api/users", (url) => fetch(url).then(res => res.json()));

  return (
    <>
      <div style={{ position: 'fixed', top: 24, right: 24 }}>
        <UserButton afterSignOutUrl="/" />
      </div>
      {isLoading && <Loader />}
      {!isLoading && (
        <Table striped highlightOnHover withColumnBorders>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: UserSchema, i: number) => (
              <tr key={i}>
                <td>
                  <Avatar src={user?.profile_image_url} radius="xl" />
                </td>
                <td>{user?.first_name}</td>
                <td>{user?.last_name}</td>
                <td>{user?.username}</td>
                <td>{user?.email_addresses?.[0].email_address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
