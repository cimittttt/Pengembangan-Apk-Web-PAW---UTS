import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CloudLogo } from '../UI/CloudLogo';
import { History, Search } from 'lucide-react';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <CloudLogo size={28} color="var(--c-olive)" />
          <span className={styles.logoStar}>STAR</span>
          <span className={styles.logoBux}>BUX</span>
        </Link>

        <div className={styles.menu}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Beranda
          </NavLink>

          <NavLink
            to="/riwayat"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            <History size={15} />
            Riwayat
          </NavLink>

          <Link to="/lacak-pesanan" className={styles.btnLacak}>
            <Search size={14} />
            Lacak Pesanan
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
