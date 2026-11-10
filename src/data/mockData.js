export const mockPackages = [
  { id: 1, robux: 80,    price: 7900,   bonus: 0,    gamepassPrice: 115   },
  { id: 2, robux: 160,   price: 15900,  bonus: 0,    gamepassPrice: 230   },
  { id: 3, robux: 240,   price: 23900,  bonus: 0,    gamepassPrice: 345   },
  { id: 4, robux: 400,   price: 39900,  bonus: 0,    gamepassPrice: 572   },
  { id: 5, robux: 800,   price: 79900,  bonus: 0,    gamepassPrice: 1143  },
  { id: 6, robux: 1700,  price: 169900, bonus: 100,  gamepassPrice: 2429  },
  { id: 7, robux: 2000,  price: 199900, bonus: 0,    gamepassPrice: 2858  },
  { id: 8, robux: 4500,  price: 449900, bonus: 450,  gamepassPrice: 6429  },
  { id: 9, robux: 10000, price: 999900, bonus: 1000, gamepassPrice: 14286 },
];

export const paymentMethods = [
  {
    id: 'QRIS',
    label: 'QRIS',
    desc: 'Scan QR dari aplikasi apapun',
    fee: 0,
    sub: [],
  },
  {
    id: 'EWALLET',
    label: 'E-Wallet',
    desc: 'GoPay, OVO, Dana, ShopeePay',
    fee: 0,
    sub: ['GoPay', 'OVO', 'DANA', 'ShopeePay'],
  },
  {
    id: 'VA',
    label: 'Virtual Account',
    desc: 'BCA, BNI, BRI, Mandiri',
    fee: 4000,
    sub: ['BCA', 'BNI', 'BRI', 'Mandiri'],
  },
];

export function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

export function generateInvoiceNo() {
  const acak = Math.random().toString(36).substring(2, 7).toUpperCase();
  return 'SBX-' + Date.now() + '-' + acak;
}

export function validateGamepassLink(link) {
  if (!link.includes('roblox.com/game-pass/')) {
    return { valid: false, pesan: 'Link tidak valid. Harus mengandung roblox.com/game-pass/' };
  }
  return { valid: true, pesan: 'Link gamepass valid!' };
}
