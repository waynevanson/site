import { Link } from 'gatsby'
import React from 'react'
import * as styles from '../style.css'

export const Layout: React.FC = (props) => {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <Link
          to="/"
          className={styles.navbarButton}
          activeClassName={styles.navbarButtonActive}
        >
          Home
        </Link>
        <Link
          to="/blog"
          className={styles.navbarButton}
          activeClassName={styles.navbarButtonActive}
        >
          Blog
        </Link>
      </nav>
      <main>{props.children}</main>
    </div>
  )
}
