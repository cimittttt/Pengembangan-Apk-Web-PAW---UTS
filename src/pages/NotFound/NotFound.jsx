import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.halaman}>
      <div className={styles.kode}>404</div>
      <h1 className={styles.judul}>Halaman Tidak Ditemukan</h1>
      <p className={styles.subjudul}>
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <button className={styles.btn} onClick={() => navigate('/')}>
        🏠 Kembali ke Beranda
      </button>
    </div>
  );
}

export default NotFound;
