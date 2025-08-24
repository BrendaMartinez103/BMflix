'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface OffcanvasNavbarProps {
  brandName?: string
  brandHref?: string
}

export default function OffcanvasNavbar({
  brandName = 'BMflix',
  brandHref = '/',
}: OffcanvasNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOffcanvas = () => setIsOpen((v) => !v)
  const closeOffcanvas = () => setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && closeOffcanvas()
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navigationItems = [
    { label: 'Películas & Series', href: '/peliculas-series' },
    { label: 'Películas', href: '/peliculas' },
    { label: 'Series', href: '/series' },
    { label: 'Recomendaciones', href: '/recomendaciones' },
    { label: 'Ranking', href: '/ranking' },
  ]

  return (
    <>
      {/* Topbar */}
      <div className="py-2" style={{ background: 'rgba(0,0,0,.8)' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 small fw-medium text-primary">BMflix</p>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg sticky-top py-3"
        style={{ background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)' }}
      >
        <div className="container">
          <Link href={brandHref} className="navbar-brand fw-bold text-primary">
            {brandName}
          </Link>

          {/* Toggler (mobile) */}
          <button
            className="btn d-lg-none text-primary"
            onClick={toggleOffcanvas}
            aria-label="Abrir menú"
            aria-expanded={isOpen}
            aria-controls="offcanvas-menu"
          >
            <Menu size={22} />
          </button>

          {/* Menú en desktop */}
          <div className="collapse navbar-collapse d-none d-lg-flex align-items-center justify-content-center w-100 h-100">
            <ul className="nav flex-row flex-nowrap mb-0 justify-content-center w-100 text-center align-items-center h-100">
              {navigationItems.map((item) => (
                <li key={item.label} className="nav-item py-2">
                  <Link href={item.href} className="nav-link text-uppercase">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overlay (mobile) */}
        {isOpen && (
          <button
            aria-label="Cerrar menú"
            className="position-fixed top-0 start-0 w-100 h-100 border-0 p-0"
            style={{ background: 'rgba(0,0,0,.6)', zIndex: 1040 }}
            onClick={closeOffcanvas}
          />
        )}

        {/* Offcanvas (mobile) */}
        <aside
          id="offcanvas-menu"
          role="dialog"
          aria-modal={isOpen}
          className={`offcanvas offcanvas-end show ${isOpen ? 'd-block' : 'd-none'}`}
          tabIndex={-1}
          style={{
            visibility: isOpen ? 'visible' : 'hidden',
            zIndex: 1045,
            width: 'min(85vw, 360px)',
            backgroundColor: 'var(--background)',
            borderLeft: '1px solid var(--primary)',
          }}
        >
          <div
            className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom"
            style={{ borderColor: 'rgba(13,202,240,.25)' }}
          >
            <h5 className="mb-0 text-primary">Menú</h5>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
              onClick={closeOffcanvas}
            >
              <X size={16} />
              Cerrar
            </button>
          </div>

          <div className="offcanvas-body d-flex flex-column px-0">
            <ul className="nav flex-column mb-0">
              {navigationItems.map((item) => (
                <li
                  key={item.label}
                  className="nav-item py-2 px-3 border-bottom"
                  style={{ borderColor: 'rgba(13,202,240,.15)' }}
                >
                  <Link
                    href={item.href}
                    className="nav-link text-uppercase"
                    onClick={closeOffcanvas}
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </nav>
    </>
  )
}
