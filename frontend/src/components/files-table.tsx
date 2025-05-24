/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader, Table } from '@mantine/core';
import { UserButton } from '@clerk/clerk-react';
import useSWR from "swr";

// Data shape returned by GET /api/speech/files
export interface FinalFileSchema {
  timestamp: string;
  file_path: string;
  dir_name: string;
}

export default function FilesTable() {
  const { isLoading, data } = useSWR("/api/files", (url) =>
    fetch(url).then((res) => res.json())
  );

  // 2) Handle loading / error states
  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Loader />
        <span>Loading files...</span>
      </div>
    );
  }

  // 3) If there are no files, show a friendly message
  if (!data || data.length === 0) {
    return (
      <>
        <div style={{ position: 'fixed', top: 24, right: 24 }}>
          <UserButton afterSignOutUrl="/" />
        </div>
        <p>No files found.</p>
      </>
    );
  }

  // 4) Otherwise, render them in a table
  return (
    <>
      <div style={{ position: 'fixed', top: 24, right: 24 }}>
        <UserButton afterSignOutUrl="/" />
      </div>
      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Audio</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {data.map((file: any, index: any) => (
            <tr key={index}>
              <td>{file.timestamp}</td>
              <td>
                <audio controls>
                  <source src={file.file_path} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </td>
              <td>
                <a href={file.file_path} target="_blank" rel="noopener noreferrer">
                  final.mp3
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
