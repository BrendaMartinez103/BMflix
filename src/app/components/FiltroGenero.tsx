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
    <label className={`d-inline-flex flex-column ${className || ''}`}>
      <span className="mb-1 fw-semibold" style={{ color: 'var(--primary)' }}>
        {label}
      </span>

      <select
        onChange={handleChange}
        value={value || current}
        className="form-select"
        style={{
          backgroundColor: 'var(--background)',            // fondo negro
          color: 'var(--foreground)',                      // texto claro
          borderColor: 'var(--primary)',                   // borde celeste
        }}
      >
        <option value="">Todos</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
