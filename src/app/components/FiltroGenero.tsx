'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  label?: string;
  options: string[];
  value?: string;
  basePath: string;           // ej: '/peliculas' o '/series'
  paramName?: string;         // ej: 'genero'
  className?: string;
};

export function FilterSelect({
  label = 'Filtrar:',
  options,
  value = '',
  basePath,
  paramName = 'genero',
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = useMemo(() => {
    const p = new URLSearchParams(searchParams?.toString() || '');
    return p.get(paramName) ?? '';
  }, [searchParams, paramName]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    const p = new URLSearchParams(searchParams?.toString() || '');
    if (!v) {
      p.delete(paramName);
    } else {
      p.set(paramName, v);
    }
    const qs = p.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
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
        <option value="">Todos</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
