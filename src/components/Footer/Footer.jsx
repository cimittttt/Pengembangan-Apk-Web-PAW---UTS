import React from 'react';
import { Link } from 'react-router-dom';
import { CloudLogo } from '../UI/CloudLogo';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div>
          <div className={styles.brand}>
            <CloudLogo size={26} color="#8E9546" />
            <span className={styles.brandName}>STARBUX</span>
          </div>
          <p className={styles.tagline}>
            Platform top-up Robux tercepat & terpercaya di Indonesia.
          </p>
        </div>

        <div>
          <h4 className={styles.judul}>Top-up</h4>
          <ul className={styles.list}>
            <li><Link to="/topup-username">Via Username</Link></li>
            <li><Link to="/topup-gamepass">Via Gamepass</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.judul}>Transaksi</h4>
          <ul className={styles.list}>
            <li><Link to="/lacak-pesanan">Lacak Pesanan</Link></li>
            <li><Link to="/riwayat">Riwayat Pembelian</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.judul}>Info</h4>
          <ul className={styles.list}>
            <li>Layanan 24/7</li>
            <li>Proses Instan</li>
            <li>Aman & Terjamin</li>
          </ul>
        </div>

      </div>

      <div className={styles.bawah}>
        <span>© 2026 STARBUX. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
