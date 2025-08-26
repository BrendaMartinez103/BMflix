'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, startTransition } from 'react';

type Props = {
  label?: string;
  options: string[];
  value?: string;         
  basePath: string;       // /peliculas o /series
  paramName?: string;     // genero
  className?: string;
  allLabel?: string;      // Todos
};

export function FilterSelect({
  label = 'Filtrar:',
  options,
  value,
  basePath,
  paramName = 'genero',
  className,
  allLabel = 'Todos',
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected =
    value ?? (searchParams?.get(paramName) ?? '');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const next = e.target.value; 
      const p = new URLSearchParams(searchParams?.toString() || '');

      if (!next) p.delete(paramName);
      else p.set(paramName, next);

      const qs = p.toString();
      startTransition(() => {
        router.push(qs ? `${basePath}?${qs}` : basePath);
      });
    },
    [searchParams, router, basePath, paramName]
  );

  const id = `filter-${paramName}`;

  return (
    <div className={className}>
      <label className="form-label mb-1 fw-semibold text-primary" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="form-select filtro-genero-select"
        value={selected}            
        onChange={handleChange}
        aria-label={label}
      >
        <option value="">{allLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
