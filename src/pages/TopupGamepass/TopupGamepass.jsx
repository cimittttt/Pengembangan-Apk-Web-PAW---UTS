import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { mockPackages, formatRupiah } from '../../data/mockData';
import styles from './TopupGamepass.module.css';

function TopupGamepass() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentOrder } = useOrder();

  const paketAwal = location.state?.paket || null;

  const [step, setStep] = useState(1);
  const [paketDipilih, setPaketDipilih] = useState(paketAwal);
  const [form, setForm] = useState({ username: '', noHp: '', email: '' });
  const [linkGamepass, setLinkGamepass] = useState('');
  const [statusLink, setStatusLink] = useState('');
  const [pesanLink, setPesanLink] = useState('');
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validasiStep1() {
    const err = {};
    if (!paketDipilih) err.paket = 'Pilih paket Robux terlebih dahulu';
    if (!form.username.trim()) err.username = 'Username wajib diisi';
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username))
      err.username = 'Username 3-20 karakter';
    if (!form.noHp.trim()) err.noHp = 'Nomor HP wajib diisi';
    else if (!/^08\d{8,11}$/.test(form.noHp.replace(/\s/g, '')))
      err.noHp = 'Nomor HP harus diawali 08';
    if (!form.email.trim()) err.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = 'Format email tidak valid';
    return err;
  }

  function handleStep1Lanjut() {
    const err = validasiStep1();
    setErrors(err);
    if (Object.keys(err).length === 0) setStep(2);
  }

  function handleValidasiLink() {
    if (!linkGamepass.includes('roblox.com/game-pass/')) {
      setStatusLink('invalid');
      setPesanLink('Link tidak valid. Harus mengandung roblox.com/game-pass/');
    } else {
      setStatusLink('valid');
      setPesanLink('Link gamepass valid!');
    }
  }

  function handleSubmit() {
    setCurrentOrder({
      metode: 'gamepass',
      username: form.username,
      noHp: form.noHp,
      email: form.email,
      paket: paketDipilih,
      linkGamepass,
      totalHarga: paketDipilih.price,
    });
    navigate('/pembayaran');
  }

  return (
    <div className={styles.halaman}>
      <h1 className={styles.judul}>Top-up via Gamepass</h1>

      <div className={styles.stepper}>
        {['Data Diri', 'Instruksi', 'Link Gamepass'].map((label, i) => (
          <div key={i} className={`${styles.stepItem} ${step === i + 1 ? styles.aktif : ''} ${step > i + 1 ? styles.selesai : ''}`}>
            <div className={styles.stepAngka}>{i + 1}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className={styles.card}>
          <h2 className={styles.judulStep}>Langkah 1 — Isi Data Diri</h2>

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
                  <div className={styles.paketGP}>GP: {p.gamepassPrice.toLocaleString('id-ID')}</div>
                </div>
              ))}
            </div>
            {errors.paket && <span className={styles.error}>{errors.paket}</span>}
          </div>

          <div className={styles.grup}>
            <label className={styles.label}>Username Roblox *</label>
            <input name="username" type="text" className={styles.input}
              placeholder="Contoh: MyRobloxUser123" value={form.username} onChange={handleChange} />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>

          <div className={styles.grup}>
            <label className={styles.label}>Nomor HP *</label>
            <input name="noHp" type="tel" className={styles.input}
              placeholder="Contoh: 08123456789" value={form.noHp} onChange={handleChange} />
            {errors.noHp && <span className={styles.error}>{errors.noHp}</span>}
          </div>

          <div className={styles.grup}>
            <label className={styles.label}>Email Notifikasi *</label>
            <input name="email" type="email" className={styles.input}
              placeholder="Contoh: nama@email.com" value={form.email} onChange={handleChange} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.aksi}>
            <button className={styles.btnKembali} onClick={() => navigate('/')}>Kembali</button>
            <button className={styles.btnLanjut} onClick={handleStep1Lanjut}>Lanjut ke Instruksi →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.card}>
          <h2 className={styles.judulStep}>Langkah 2 — Buat Gamepass di Creator Hub</h2>

          <ol className={styles.instruksiList}>
            <li>Buka <a href="https://create.roblox.com" target="_blank" rel="noreferrer">create.roblox.com</a> dan login.</li>
            <li>Pilih salah satu game/experience milikmu.</li>
            <li>Klik menu "Monetization" → pilih "Game Passes".</li>
            <li>Klik "Create a Game Pass", beri nama sembarang, upload gambar apa pun.</li>
            <li>
              Atur harga gamepass:
              {paketDipilih && (
                <strong className={styles.highlight}> {paketDipilih.gamepassPrice.toLocaleString('id-ID')} Robux</strong>
              )}
              <span className={styles.catatan}> (kamu akan menerima {paketDipilih?.robux?.toLocaleString('id-ID')} Robux setelah potongan 30%)</span>
            </li>
            <li>Simpan, lalu salin link URL gamepass dari address bar browser.</li>
          </ol>

          <div className={styles.aksi}>
            <button className={styles.btnKembali} onClick={() => setStep(1)}>← Kembali</button>
            <button className={styles.btnLanjut} onClick={() => setStep(3)}>Sudah Buat Gamepass →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.card}>
          <h2 className={styles.judulStep}>Langkah 3 — Tempel Link Gamepass</h2>

          <div className={styles.grup}>
            <label className={styles.label}>Link Gamepass *</label>
            <input
              type="text"
              className={styles.input}
              placeholder="https://www.roblox.com/game-pass/12345678/nama"
              value={linkGamepass}
              onChange={(e) => { setLinkGamepass(e.target.value); setStatusLink(''); }}
            />
          </div>

          <button className={styles.btnValidasi} onClick={handleValidasiLink}>
            Validasi Link
          </button>

          {statusLink === 'valid' && (
            <div className={styles.pesanValid}>✅ {pesanLink}</div>
          )}
          {statusLink === 'invalid' && (
            <div className={styles.pesanInvalid}>❌ {pesanLink}</div>
          )}

          <div className={styles.aksi}>
            <button className={styles.btnKembali} onClick={() => setStep(2)}>← Kembali</button>
            <button
              className={styles.btnLanjut}
              onClick={handleSubmit}
              disabled={statusLink !== 'valid'}
              style={{ opacity: statusLink !== 'valid' ? 0.5 : 1 }}
            >
              Lanjut ke Pembayaran →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopupGamepass;
