import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { formatRupiah, paymentMethods } from '../../data/mockData';
import styles from './Invoice.module.css';

function Invoice() {
  const { invoiceNo } = useParams();
  const navigate = useNavigate();
  const { cariPesanan, setCurrentOrder } = useOrder();

  const pesanan = cariPesanan(invoiceNo);

  if (!pesanan) {
    return (
      <div className={styles.notFound}>
        <h2>Invoice Tidak Ditemukan</h2>
        <p>Nomor invoice <strong>{invoiceNo}</strong> tidak ada dalam riwayat perangkat ini.</p>
        <button className={styles.btnHome} onClick={() => navigate('/')}>Kembali ke Beranda</button>
      </div>
    );
  }

  const tanggal = new Date(pesanan.tanggal).toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const labelBayar = paymentMethods.find((m) => m.id === pesanan.metodeBayar)?.label || pesanan.metodeBayar;

  function getStatusClass(status) {
    if (status === 'Selesai') return styles.statusSelesai;
    if (status === 'Diproses') return styles.statusDiproses;
    return styles.statusMenunggu;
  }

  return (
    <div className={styles.halaman}>

      <div className={styles.banner}>
        <div className={styles.bannerIcon}>✅</div>
        <h1>Pembayaran Berhasil!</h1>
        <p>Terima kasih! Robux-mu sedang diproses.</p>
      </div>

      <div className={styles.card}>
        <div className={styles.headerInvoice}>
          <div>
            <div className={styles.nomorInvoice}>#{pesanan.invoiceNo}</div>
            <div className={styles.tanggal}>{tanggal}</div>
          </div>
          <span className={`${styles.status} ${getStatusClass(pesanan.status)}`}>
            {pesanan.status}
          </span>
        </div>

        <hr className={styles.garis} />

        <table className={styles.tabel}>
          <tbody>
            <tr><td>Metode Top-up</td><td>{pesanan.metode === 'username' ? 'Via Username' : 'Via Gamepass'}</td></tr>
            <tr><td>Username Roblox</td><td>{pesanan.username}</td></tr>
            <tr><td>Nominal Robux</td><td>{pesanan.paket?.robux?.toLocaleString('id-ID')} Robux</td></tr>
            <tr><td>Nomor HP</td><td>{pesanan.noHp}</td></tr>
            <tr><td>Email</td><td>{pesanan.email}</td></tr>
            {pesanan.linkGamepass && <tr><td>Link Gamepass</td><td className={styles.linkGP}>{pesanan.linkGamepass}</td></tr>}
            <tr><td>Metode Bayar</td><td>{labelBayar}{pesanan.subMetode ? ` — ${pesanan.subMetode}` : ''}</td></tr>
            <tr><td>Harga Paket</td><td>{formatRupiah(pesanan.paket?.price || 0)}</td></tr>
            {pesanan.biayaAdmin > 0 && <tr><td>Biaya Admin</td><td>{formatRupiah(pesanan.biayaAdmin)}</td></tr>}
          </tbody>
        </table>

        <div className={styles.total}>
          <span>Total Pembayaran</span>
          <strong>{formatRupiah(pesanan.totalHarga)}</strong>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.judulTimeline}>Status Transaksi</h2>
        <div className={styles.timeline}>
          {['Menunggu Pembayaran', 'Diproses', 'Selesai'].map((s, i) => {
            const idx = ['Menunggu Pembayaran', 'Diproses', 'Selesai'].indexOf(pesanan.status);
            const sudah = i <= idx;
            return (
              <div key={s} className={`${styles.timelineItem} ${sudah ? styles.timelineAktif : ''}`}>
                <div className={styles.timelineDot}>{sudah ? '●' : '○'}</div>
                <div className={styles.timelineLabel}>{s}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.aksi}>
        <button className={styles.btnHome} onClick={() => { setCurrentOrder(null); navigate('/'); }}>
          🏠 Beranda
        </button>
        <button className={styles.btnRiwayat} onClick={() => navigate('/riwayat')}>
          📋 Lihat Riwayat
        </button>
      </div>

      <p className={styles.catatan}>
        Simpan nomor invoice: <strong>{pesanan.invoiceNo}</strong> untuk melacak pesanan.
      </p>
    </div>
  );
}

export default Invoice;
