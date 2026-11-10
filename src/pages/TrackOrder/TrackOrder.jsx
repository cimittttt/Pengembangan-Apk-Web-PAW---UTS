import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { formatRupiah } from '../../data/mockData';
import styles from './TrackOrder.module.css';

function TrackOrder() {
  const navigate = useNavigate();
  const { cariPesanan } = useOrder();

  const [query, setQuery] = useState('');
  const [sudahCari, setSudahCari] = useState(false);
  const [hasil, setHasil] = useState(null);

  function handleCari() {
    if (!query.trim()) return;
    const pesanan = cariPesanan(query.trim().toUpperCase());
    setHasil(pesanan);
    setSudahCari(true);
  }

  function getStatusClass(status) {
    if (status === 'Selesai') return styles.statusSelesai;
    if (status === 'Diproses') return styles.statusDiproses;
    return styles.statusMenunggu;
  }

  return (
    <div className={styles.halaman}>
      <h1 className={styles.judul}>Lacak Pesanan</h1>
      <p className={styles.subjudul}>Masukkan nomor invoice untuk melihat status transaksi</p>

      <div className={styles.card}>
        <div className={styles.barisCari}>
          <input
            type="text"
            className={styles.input}
            placeholder="Contoh: SBX-123456789-ABCDE"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSudahCari(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleCari()}
          />
          <button className={styles.btnCari} onClick={handleCari}>Cari</button>
        </div>

        {/* Tidak ditemukan */}
        {sudahCari && !hasil && (
          <div className={styles.tidakDitemukan}>
            ⚠️ Invoice <strong>{query}</strong> tidak ditemukan. Pastikan nomor sudah benar.
          </div>
        )}

        {/* Hasil ditemukan */}
        {hasil && (
          <div className={styles.hasilCard}>
            <div className={styles.hasilHeader}>
              <span className={styles.nomorInvoice}>#{hasil.invoiceNo}</span>
              <span className={`${styles.status} ${getStatusClass(hasil.status)}`}>{hasil.status}</span>
            </div>

            <hr className={styles.garis} />

            <table className={styles.tabel}>
              <tbody>
                <tr><td>Username</td><td>{hasil.username}</td></tr>
                <tr><td>Nominal</td><td>{hasil.paket?.robux?.toLocaleString('id-ID')} Robux</td></tr>
                <tr><td>Total</td><td>{formatRupiah(hasil.totalHarga)}</td></tr>
                <tr>
                  <td>Tanggal</td>
                  <td>{new Date(hasil.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                </tr>
              </tbody>
            </table>

            <button className={styles.btnDetail} onClick={() => navigate('/invoice/' + hasil.invoiceNo)}>
              Lihat Invoice Lengkap →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
