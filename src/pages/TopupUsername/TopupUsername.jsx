import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { mockPackages, formatRupiah } from '../../data/mockData';
import styles from './TopupUsername.module.css';

function TopupUsername() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentOrder } = useOrder();

  // Ambil paket dari state navigasi (kalau ada)
  const paketAwal = location.state?.paket || null;

  const [paketDipilih, setPaketDipilih] = useState(paketAwal);
  const [form, setForm] = useState({
    username: '',
    noHp: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validasi() {
    const err = {};
    if (!paketDipilih) err.paket = 'Pilih paket Robux terlebih dahulu';
    if (!form.username.trim()) err.username = 'Username wajib diisi';
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username))
      err.username = 'Username 3-20 karakter (huruf, angka, underscore)';
    if (!form.noHp.trim()) err.noHp = 'Nomor HP wajib diisi';
    else if (!/^08\d{8,11}$/.test(form.noHp.replace(/\s/g, '')))
      err.noHp = 'Nomor HP harus diawali 08 (10-13 digit)';
    if (!form.email.trim()) err.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = 'Format email tidak valid';
    return err;
  }

  function handleLanjut() {
    const err = validasi();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setCurrentOrder({
      metode: 'username',
      username: form.username,
      noHp: form.noHp,
      email: form.email,
      paket: paketDipilih,
      totalHarga: paketDipilih.price,
    });
    navigate('/pembayaran');
  }

  return (
    <div className={styles.halaman}>
      <h1 className={styles.judul}>Top-up via Username</h1>
      <p className={styles.subjudul}>Isi data berikut, lalu lanjut ke pembayaran</p>

      <div className={styles.card}>

        {/* Pilih Paket */}
        <div className={styles.grup}>
          <label className={styles.label}>Pilih Nominal Robux *</label>
          <div className={styles.paketGrid}>
            {mockPackages.map((p) => (
              <div
                key={p.id}
                className={`${styles.paketItem} ${paketDipilih?.id === p.id ? styles.dipilih : ''}`}
                onClick={() => setPaketDipilih(p)}
              >
                <div className={styles.paketRobux}>{p.robux.toLocaleString('id-ID')} R$</div>
                <div className={styles.paketHarga}>{formatRupiah(p.price)}</div>
              </div>
            ))}
          </div>
          {errors.paket && <span className={styles.error}>{errors.paket}</span>}
        </div>

        {/* Username */}
        <div className={styles.grup}>
          <label className={styles.label} htmlFor="username">Username Roblox *</label>
          <input
            id="username"
            name="username"
            type="text"
            className={styles.input}
            placeholder="Contoh: MyRobloxUser123"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <span className={styles.error}>{errors.username}</span>}
          <span className={styles.hint}>3-20 karakter, huruf/angka/underscore</span>
        </div>

        {/* Nomor HP */}
        <div className={styles.grup}>
          <label className={styles.label} htmlFor="noHp">Nomor HP *</label>
          <input
            id="noHp"
            name="noHp"
            type="tel"
            className={styles.input}
            placeholder="Contoh: 08123456789"
            value={form.noHp}
            onChange={handleChange}
          />
          {errors.noHp && <span className={styles.error}>{errors.noHp}</span>}
        </div>

        {/* Email */}
        <div className={styles.grup}>
          <label className={styles.label} htmlFor="email">Email Notifikasi *</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            placeholder="Contoh: nama@email.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        {/* Tombol */}
        <div className={styles.aksi}>
          <button className={styles.btnKembali} onClick={() => navigate('/')}>Kembali</button>
          <button className={styles.btnLanjut} onClick={handleLanjut}>Lanjut ke Pembayaran →</button>
        </div>
      </div>
    </div>
  );
}

export default TopupUsername;
