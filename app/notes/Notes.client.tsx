'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import { Pagination } from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 8; 

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes', { page, perPage, search }],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  if (error) return <p style={{ padding: '20px' }}>Сталася помилка при завантаженні нотаток.</p>;

  const notesList = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <SearchBox onChange={(value) => {
            setSearch(value);
            setPage(1);
          }} />
        </div>

        {}
        <Pagination 
  pageCount={totalPages} 
  onPageChange={(selectedPage: number) => setPage(selectedPage)} 
  forcePage={page} 
/>

        {}
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Create note +
        </button>
      </div>

      {}
      {isLoading ? (
        <p>Завантаження нотаток...</p>
      ) : (
        <NoteList notes={notesList} />
      )}

      {}
      {isModalOpen && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <NoteForm onCancel={() => setIsModalOpen(false)} />
  </Modal>
      )}
    </div>
  );
}
