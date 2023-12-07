// Breadcrumb.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Breadcrumb.module.scss'

const Breadcrumb: React.FC = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <div className={styles.breadcrumb}>
      <Link to="/">Accueil</Link> {/* Lien vers la page d'accueil */}
      {pathnames.map((name, index) => (
        <span key={name}>
          {' '}
          / <Link to={`/${pathnames.slice(0, index + 1).join('/')}`}>{name}</Link>
        </span>
      ))}
    </div>
  )
}

export default Breadcrumb
