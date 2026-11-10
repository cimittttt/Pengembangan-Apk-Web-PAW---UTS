import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { formatRupiah } from '../../data/mockData';
import styles from './OrderHistory.module.css';

function OrderHistory() {
  const navigate = useNavigate();
  const { orders } = useOrder();

  return (
    <div className={styles.halaman}>
      <h1 className={styles.judul}>Riwayat Transaksi</h1>
      <p className={styles.subjudul}>Total {orders.length} transaksi dari perangkat ini</p>

      {orders.length === 0 ? (
        <div className={styles.kosong}>
          <div className={styles.kosongIcon}>📭</div>
          <p>Belum ada transaksi. Yuk top-up Robux sekarang!</p>
          <button className={styles.btnTopup} onClick={() => navigate('/')}>
            Top-up Sekarang
          </button>
        </div>
      ) : (
        <div className={styles.daftarPesanan}>
          {orders.map((o) => {
            const tanggal = new Date(o.tanggal).toLocaleDateString('id-ID', {
              day: 'numeric', month: 'short', year: 'numeric'
            });

            let statusClass = styles.statusMenunggu;
            if (o.status === 'Selesai')  statusClass = styles.statusSelesai;
            if (o.status === 'Diproses') statusClass = styles.statusDiproses;

            return (
              <div
                key={o.invoiceNo}
                className={styles.pesananCard}
                onClick={() => navigate('/invoice/' + o.invoiceNo)}
              >
                <div className={styles.kiri}>
                  <div className={styles.nomorInvoice}>#{o.invoiceNo}</div>
                  <div className={styles.info}>
                    {o.paket?.robux?.toLocaleString('id-ID')} Robux → {o.username}
                  </div>
                  <div className={styles.meta}>
                    {o.metode === 'username' ? 'Via Username' : 'Via Gamepass'} · {tanggal}
                  </div>
                </div>
                <div className={styles.kanan}>
                  <div className={styles.total}>{formatRupiah(o.totalHarga)}</div>
                  <span className={`${styles.status} ${statusClass}`}>{o.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
