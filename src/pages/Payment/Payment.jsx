import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { paymentMethods, formatRupiah } from '../../data/mockData';
import styles from './Payment.module.css';

function Payment() {
  const navigate = useNavigate();
  const { currentOrder, placeOrder, simulasiStatus } = useOrder();

  const [metodeBayar, setMetodeBayar] = useState('');
  const [subMetode, setSubMetode] = useState('');
  const [tahap, setTahap] = useState('pilih');
  const [countdown, setCountdown] = useState(900);

  useEffect(() => {
    if (!currentOrder) navigate('/');
  }, [currentOrder, navigate]);

  useEffect(() => {
    if (tahap !== 'bayar') return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [tahap]);

  if (!currentOrder) return null;

  const metodeTerpilih = paymentMethods.find((m) => m.id === metodeBayar);
  const biayaAdmin = metodeTerpilih?.fee || 0;
  const totalBayar = (currentOrder.paket?.price || 0) + biayaAdmin;
  const siapBayar = metodeBayar && (metodeTerpilih?.sub.length === 0 || subMetode);

  function handleKonfirmasi() {
    if (!siapBayar) return;
    setTahap('bayar');
  }

  function handleSudahBayar() {
    const pesanan = placeOrder({
      ...currentOrder,
      metodeBayar,
      subMetode,
      biayaAdmin,
      totalHarga: totalBayar,
    });
    simulasiStatus(pesanan.invoiceNo);
    navigate('/invoice/' + pesanan.invoiceNo);
  }

  const menit = String(Math.floor(countdown / 60)).padStart(2, '0');
  const detik = String(countdown % 60).padStart(2, '0');

  return (
    <div className={styles.halaman}>
      <h1 className={styles.judul}>Pembayaran</h1>

      <div className={styles.card}>
        <h2 className={styles.judulCard}>Ringkasan Pesanan</h2>
        <table className={styles.tabel}>
          <tbody>
            <tr><td>Metode Top-up</td><td>{currentOrder.metode === 'username' ? 'Via Username' : 'Via Gamepass'}</td></tr>
            <tr><td>Username Roblox</td><td>{currentOrder.username}</td></tr>
            <tr><td>Nominal Robux</td><td>{currentOrder.paket?.robux?.toLocaleString('id-ID')} Robux</td></tr>
            <tr><td>Nomor HP</td><td>{currentOrder.noHp}</td></tr>
            <tr><td>Email</td><td>{currentOrder.email}</td></tr>
            {currentOrder.linkGamepass && <tr><td>Link Gamepass</td><td className={styles.linkGP}>{currentOrder.linkGamepass}</td></tr>}
            <tr><td>Harga Paket</td><td>{formatRupiah(currentOrder.paket?.price || 0)}</td></tr>
            {biayaAdmin > 0 && <tr><td>Biaya Admin</td><td>{formatRupiah(biayaAdmin)}</td></tr>}
          </tbody>
        </table>
        <div className={styles.total}>
          <span>Total Pembayaran</span>
          <strong>{formatRupiah(totalBayar)}</strong>
        </div>
      </div>

      {tahap === 'pilih' && (
        <div className={styles.card}>
          <h2 className={styles.judulCard}>Pilih Metode Pembayaran</h2>
          <div className={styles.metodeList}>
            {paymentMethods.map((m) => (
              <div key={m.id}>
                <div
                  className={`${styles.metodeItem} ${metodeBayar === m.id ? styles.aktif : ''}`}
                  onClick={() => { setMetodeBayar(m.id); setSubMetode(''); }}
                >
                  <div>
                    <div className={styles.metodeLabel}>{m.label}</div>
                    <div className={styles.metodeDesc}>{m.desc}</div>
                  </div>
                  <span className={styles.metodeFee}>
                    {m.fee > 0 ? '+' + formatRupiah(m.fee) : 'Gratis'}
                  </span>
                </div>

                {metodeBayar === m.id && m.sub.length > 0 && (
                  <div className={styles.subList}>
                    {m.sub.map((sub) => (
                      <div
                        key={sub}
                        className={`${styles.subItem} ${subMetode === sub ? styles.aktif : ''}`}
                        onClick={() => setSubMetode(sub)}
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.aksi}>
            <button className={styles.btnKembali} onClick={() => navigate(-1)}>← Kembali</button>
            <button
              className={styles.btnLanjut}
              onClick={handleKonfirmasi}
              disabled={!siapBayar}
              style={{ opacity: !siapBayar ? 0.5 : 1 }}
            >
              Konfirmasi & Bayar →
            </button>
          </div>
        </div>
      )}

      {tahap === 'bayar' && (
        <div className={styles.card}>
          <h2 className={styles.judulCard}>
            {metodeBayar === 'QRIS' && '📱 Scan QR Code'}
            {metodeBayar === 'EWALLET' && `💳 Bayar via ${subMetode}`}
            {metodeBayar === 'VA' && '🏦 Transfer Virtual Account'}
          </h2>

          {metodeBayar === 'QRIS' && (
            <div className={styles.qrBox}>
              <div className={styles.qrPlaceholder}>[ QR CODE ]</div>
              <p>Scan menggunakan aplikasi e-wallet atau m-banking</p>
            </div>
          )}

          {metodeBayar !== 'QRIS' && (
            <div className={styles.nomorBox}>
              <p className={styles.nomorLabel}>
                {metodeBayar === 'VA' ? `Nomor ${subMetode} Virtual Account:` : `Nomor ${subMetode}:`}
              </p>
              <div className={styles.nomor}>0808 1234 5678 9012</div>
            </div>
          )}

          <div className={styles.instruksiBayar}>
            <p>Bayar sebesar <strong>{formatRupiah(totalBayar)}</strong> sebelum waktu habis.</p>
          </div>

          <div className={styles.countdown}>
            ⏱ Sisa waktu: <strong>{menit}:{detik}</strong>
          </div>

          <button className={styles.btnBayar} onClick={handleSudahBayar}>
            ✅ Saya Sudah Bayar
          </button>
        </div>
      )}
    </div>
  );
}

export default Payment;
