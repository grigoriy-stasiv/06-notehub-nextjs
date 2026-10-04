'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes', { page, perPage, search }],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  if (error) return <p style={{ padding: '20px' }}>Сталася помилка при завантаженні нотаток.</p>;

  const notesList = data?.notes || [];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Ваші нотатки</h1>
      
      {}
      <div style={{ marginBottom: '20px' }}>
        <SearchBox onChange={(value) => {
          setSearch(value);
          setPage(1); 
        }} />
      </div>

      {isLoading ? (
        <p>Завантаження нотаток...</p>
      ) : (
        <NoteList notes={notesList} />
      )}
    </div>
  );
}
