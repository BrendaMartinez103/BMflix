'use client';

import Link from 'next/link';

type ExtraParams = Record<string, string | number | undefined>;

type PaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  extraParams?: ExtraParams; 
};

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
  extraParams = {}, 
}: PaginationProps) {
  const mkHref = (page: number) => {
    const qs = new URLSearchParams();
    qs.set('page', String(page));
    Object.entries(extraParams).forEach(([k, v]) => {
      if (v !== undefined && v !== '') qs.set(k, String(v));
    });
    const q = qs.toString();
    return q ? `${basePath}?${q}` : basePath;
  };

  const prev = Math.max(1, currentPage - 1);
  const next = Math.min(totalPages, currentPage + 1);

 return (
  <nav aria-label="Paginación" className="d-flex gap-2 mt-3">
    <Link
      href={mkHref(prev)}
      className={`pg-btn ${currentPage === 1 ? 'pg-disabled' : ''}`}
    >
      ‹ Anterior
    </Link>

    <span className="pg-chip">{currentPage}</span>

    {currentPage + 1 <= totalPages && (
      <Link href={mkHref(currentPage + 1)} className="pg-btn">
        {currentPage + 1}
      </Link>
    )}

    <Link
      href={mkHref(next)}
      className={`pg-btn ${currentPage === totalPages ? 'pg-disabled' : ''}`}
    >
      Siguiente ›
    </Link>
  </nav>
);
}