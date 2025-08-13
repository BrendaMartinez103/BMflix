'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

interface OffcanvasNavbarProps {
  brandName?: string
  brandHref?: string
}

export default function OffcanvasNavbar({
  brandName = 'BMflix',
  brandHref = '/',
}: OffcanvasNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOffcanvas = () => setIsOpen(!isOpen)
  const closeOffcanvas = () => setIsOpen(false)

  const navigationItems = [
    { label: 'peliculas y series ', href: '/peliculas-series' },
    { label: 'peliculas', href: '/peliculas' },
    { label: 'series', href: '/series' },
    { label: 'recomendaciones', href: '/recomendaciones' },
    { label: 'ranking', href: '/ranking' },
   
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="topbar-bm py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 small fw-medium text-primary">Compra de Servicios</p>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-bm sticky-top py-3">
        <div className="container">
          <Link href={brandHref} className="navbar-brand fw-bold text-primary">
            {brandName}
          </Link>

          <button
            className="btn d-lg-none text-primary"
            onClick={toggleOffcanvas}
            aria-label="Menú"
          >
            <Menu size={22} />
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex align-items-center justify-content-center w-100 h-100">
            <ul className="nav flex-row flex-nowrap mb-0 justify-content-center w-100 text-center align-items-center h-100">
              {navigationItems.map((item) => (
                <li key={item.label} className="nav-item py-2">
                  <Link
                    href={item.href}
                    className="nav-link text-uppercase"
                    onClick={closeOffcanvas}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ background: 'rgba(0,0,0,.6)', zIndex: 1040 }}
            onClick={closeOffcanvas}
          />
        )}

        {/* Offcanvas */}
        <div
          className={`offcanvas offcanvas-end show offcanvas-bm ${isOpen ? 'd-block' : 'd-none'}`}
          tabIndex={-1}
          style={{ visibility: isOpen ? 'visible' : 'hidden', zIndex: 1045 }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-primary">Menú</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeOffcanvas}
              aria-label="Cerrar"
            />
          </div>

          <div className="offcanvas-body d-flex flex-column">
            <ul className="nav flex-column mb-0">
              {navigationItems.map((item) => (
                <li key={item.label} className="nav-item border-bottom border-primary-soft py-2">
                  <Link
                    href={item.href}
                    className="nav-link text-uppercase"
                    onClick={closeOffcanvas}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
