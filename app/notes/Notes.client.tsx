'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import { Pagination } from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
 import css from './page.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 8; 

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes', { page, perPage, search }],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  if (error) return <p className={css.error || ''}>Сталася помилка при завантаженні нотаток.</p>;

  const notesList = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    
    <div className={css.container || css.notesPage || ''}>
      
      {}
      <div className={css.toolbar || css.header || ''} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '20px' }}>
        <SearchBox onChange={(value) => {
          setSearch(value);
          setPage(1);
        }} />

        <Pagination 
  pageCount={totalPages} 
  onPageChange={(pageNumber: number) => {
    setPage(pageNumber);
  }} 
  forcePage={page} 
/>

<button 
  type="button"
  onClick={() => setIsModalOpen(true)}
  className={css.button}
>
  Create note +
</button>
      </div>

      {}
      {isLoading ? (
        <p className={css.loading || ''}>Завантаження нотаток...</p>
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
