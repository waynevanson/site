import React from 'react'
import * as styles from '../style.css'

export const Layout: React.FC = (props) => {
  return <main className={styles.layout}>{props.children}</main>
}
