import { Link } from 'gatsby'
import React from 'react'
import * as styles from '../style.css'

export const Layout: React.FC = (props) => {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.navbarButton}>
          Home
        </Link>
        <Link to="/blog" className={styles.navbarButton}>
          Blog
        </Link>
      </nav>
      <main>{props.children}</main>
    </div>
  )
}
