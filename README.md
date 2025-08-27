# 🎬 BMflix
https://bmflix.vercel.app/

BMflix es una aplicación web desarrollada con **Next.js 15**, **TypeScript** y **Prisma ORM**, que funciona como una guía personalizada de **películas y series**.  
Permite puntuar contenido, ver recomendaciones mias, acceder a un ranking dinámico y explorar por géneros.

---

## ✨ Funcionalidades principales

- 📂 **Gestión de Películas y Series**  
  - Listado de películas (`/peliculas`) y series (`/series`).
  - Vista combinada (`/peliculas-series`).
  - Páginas individuales con información detallada y puntuaciones.

- ⭐ **Sistema de Puntaje**  
  - Puntaje **BM (personal)** definido al cargar contenido.  
  - Puntaje **Comunidad**, calculado automáticamente con las votaciones de los usuarios.  
  - Actualización en tiempo real gracias a server actions + `revalidatePath`.

- 🏆 **Ranking Global** (`/ranking`)  
  - Top 10 global (todas las categorías).  
  - Top 10 películas y Top 10 series.  
  - Ordenado dinámicamente según promedio de la comunidad.

- 🎯 **Recomendaciones BM** (`/recomendaciones`)  
  - Selección personalizada en base a mis propias puntuaciones.  
  - Top de películas y series recomendadas por mi.

- 🔎 **Filtros y Búsquedas**  
  - Filtrado por género desde un selector dinámico (`FilterSelect`).  
  - Paginación (`Pagination`) con conservación de filtros activos.  

- 📱 **Interfaz Responsive + PWA**  
  - Diseño adaptado para móviles y escritorio con Bootstrap.  
  - Instalación como aplicación gracias a **Next-PWA**.  
  - Soporte de **offline caching** básico.

---

## 🛠️ Tecnologías utilizadas

- **Frontend**
  - [Next.js 15](https://nextjs.org/) (App Router)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Bootstrap 5](https://getbootstrap.com/) + estilos custom
  - [next-pwa](https://github.com/shadowwalker/next-pwa) para PWA
  - Imágenes optimizadas con `next/image`

- **Backend / Base de Datos**
  - [Prisma ORM](https://www.prisma.io/)
  - PostgreSQL como motor de base de datos
  - Migraciones y generación de cliente con `prisma generate`

- **Otras librerías**
  - `lucide-react` → íconos
  - `next/cache` → revalidación de paths
  - `next/navigation` → navegación dinámica (ej: botón atrás)

---

## 👩‍💻 Autor

**Brenda Martínez**

Proyecto personal — BMflix

