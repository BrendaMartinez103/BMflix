'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  label?: string;
  options: string[];          // ej: ["Drama", "Suspenso", ...] (sin "Todos")
  value?: string;             // valor actual del query (?genero=...)
  basePath: string;           // ej: "/peliculas" o "/series"
  paramName?: string;         // por defecto "genero"
  className?: string;
};

export function FilterSelect({
  label = 'Filtrar por género:',
  options,
  value = '',
  basePath,
  paramName = 'genero',
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allOptions = useMemo(() => ['Todos', ...options], [options]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (!selected || selected === 'Todos') {
      params.delete(paramName);
    } else {
      params.set(paramName, selected);
    }

    router.push(`${basePath}${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <div className={className}>
      <label className="form-label mb-1 fw-semibold text-primary">
        {label}
      </label>
      <select
        className="form-select filtro-genero-select"
        value={value || 'Todos'}
        onChange={handleChange}
        aria-label={label}
      >
        {allOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
