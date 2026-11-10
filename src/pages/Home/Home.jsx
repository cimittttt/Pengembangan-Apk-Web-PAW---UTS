import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Ticket } from 'lucide-react';
import { mockPackages, formatRupiah } from '../../data/mockData';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();
  const [metode, setMetode] = useState('username');
  const [cari, setCari] = useState('');

  const paketTampil = mockPackages.filter((p) =>
    p.robux.toString().includes(cari) || p.price.toString().includes(cari)
  );

  function pilihPaket(paket) {
    if (metode === 'username') {
      navigate('/topup-username', { state: { paket } });
    } else {
      navigate('/topup-gamepass', { state: { paket } });
    }
  }

  return (
    <div className={styles.halaman}>

      <section className={styles.hero}>
        <h1>Top-up <span>Robux</span> Terpercaya</h1>
        <p>Harga transparan, proses instan, berbagai metode pembayaran.</p>
      </section>

      <section className={styles.bagian}>
        <h2 className={styles.judulBagian}>Pilih Metode Top-up</h2>
        <div className={styles.metodeGrid}>
          <div
            className={`${styles.metodeCard} ${metode === 'username' ? styles.aktif : ''}`}
            onClick={() => setMetode('username')}
          >
            <User size={28} />
            <strong>Via Username</strong>
            <span>Langsung ke akun Roblox-mu</span>
          </div>
          <div
            className={`${styles.metodeCard} ${metode === 'gamepass' ? styles.aktif : ''}`}
            onClick={() => setMetode('gamepass')}
          >
            <Ticket size={28} />
            <strong>Via Gamepass</strong>
            <span>Melalui Creator Hub Roblox</span>
          </div>
        </div>
      </section>

      <section className={styles.bagian}>
        <h2 className={styles.judulBagian}>
          Pilih Paket — {metode === 'username' ? 'Via Username' : 'Via Gamepass'}
        </h2>

        <input
          type="text"
          className={styles.inputCari}
          placeholder="Cari paket Robux..."
          value={cari}
          onChange={(e) => setCari(e.target.value)}
        />

        <div className={styles.paketGrid}>
          {paketTampil.map((paket) => (
            <div key={paket.id} className={styles.paketCard} onClick={() => pilihPaket(paket)}>
              <div className={styles.paketRobux}>{paket.robux.toLocaleString('id-ID')} Robux</div>
              {paket.bonus > 0 && (
                <div className={styles.paketBonus}>+{paket.bonus} Bonus</div>
              )}
              <div className={styles.paketHarga}>{formatRupiah(paket.price)}</div>
              {metode === 'gamepass' && (
                <div className={styles.paketGP}>Harga GP: {paket.gamepassPrice.toLocaleString('id-ID')} R$</div>
              )}
              <button className={styles.paketBtn}>Pilih Paket</button>
            </div>
          ))}
        </div>

        {paketTampil.length === 0 && (
          <p className={styles.kosong}>Paket tidak ditemukan.</p>
        )}
      </section>
    </div>
  );
}

export default Home;
