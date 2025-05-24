import { useState } from 'react';
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Button, Container, Stack, Textarea, Title } from '@mantine/core';
import UsersTable from './components/users-table';
import FilesTable from './components/files-table';

function App() {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Fire-and-forget: just call fetch with no awaits or .then handlers
    fetch("/api/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: text }),
    });

    // (Optional) You can clear the text or otherwise give user feedback immediately:
    setText("");
  }

  return (
    <main>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <Container size="sm" py="md">
          <Title order={1} mb="md">
            Text-to-Speech Demo (Fire & Forget)
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack>
              <Textarea
                label="Text to Speak (no response):"
                rows={5}
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />
              <Button type="submit">Send Request</Button>
            </Stack>
          </form>
        </Container>
        <UsersTable />
        <FilesTable />
      </SignedIn>
    </main>
  );
}

export default App;
