'use client';

import Link from 'next/link';
import { useCallback } from 'react';

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
  const sanitizedPage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const prev = Math.max(1, sanitizedPage - 1);
  const next = Math.min(totalPages, sanitizedPage + 1);
  const mkHref = useCallback(
    (page: number) => {
      const qs = new URLSearchParams();
      // page siempre la seteamos nosotros
      qs.set('page', String(page));
      Object.entries(extraParams).forEach(([k, v]) => {
        if (k === 'page') return; // Ignorar si vino desde extraParams
        if (v !== undefined && v !== '') qs.set(k, String(v));
      });
      const q = qs.toString();
      return q ? `${basePath}?${q}` : basePath;
    },
    [basePath, extraParams]
  );
  const canPrev = sanitizedPage > 1;
  const canNext = sanitizedPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }


  return (
    <nav aria-label="Paginación" className="d-flex gap-2 mt-3 align-items-center">
      {/* Anterior */}
      {canPrev ? (
        <Link
          href={mkHref(prev)}
          className="pg-btn"
          rel="prev"
          aria-label={`Ir a página ${prev}`}
          title={`Ir a página ${prev}`}
        >
          ‹ Anterior
        </Link>
      ) : (
        <span className="pg-btn pg-disabled" aria-disabled="true" tabIndex={-1}>
          ‹ Anterior
        </span>
      )}

      {/* Página actual */}
      <span className="pg-chip" aria-current="page" aria-label={`Página ${sanitizedPage}`}>
        {sanitizedPage}
      </span>

      {/* Siguiente número inmediato, si existe */}
      {sanitizedPage + 1 <= totalPages && (
        <Link
          href={mkHref(sanitizedPage + 1)}
          className="pg-btn"
          aria-label={`Ir a página ${sanitizedPage + 1}`}
          title={`Ir a página ${sanitizedPage + 1}`}
        >
          {sanitizedPage + 1}
        </Link>
      )}

      {/* Siguiente */}
      {canNext ? (
        <Link
          href={mkHref(next)}
          className="pg-btn"
          rel="next"
          aria-label={`Ir a página ${next}`}
          title={`Ir a página ${next}`}
        >
          Siguiente ›
        </Link>
      ) : (
        <span className="pg-btn pg-disabled" aria-disabled="true" tabIndex={-1}>
          Siguiente ›
        </span>
      )}
    </nav>
  );
}