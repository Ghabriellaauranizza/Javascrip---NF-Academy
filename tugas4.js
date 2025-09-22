// SISTEM MANAJEMEN TRANSPORTASI

// CLASS KENDARAAN
class Kendaraan {
    constructor(id, merk, model, tahun, hargaSewa) {
        this.id = id;
        this.merk = merk;
        this.model = model;
        this.tahun = tahun;
        this.hargaSewa = hargaSewa; 
        this.tersedia = true;
    }

    getInfo() {
        return `${this.merk} ${this.model} ${this.tahun} - Rp${this.hargaSewa.toLocaleString()}/hari`;
    }

    sewa() {
        if (this.tersedia) {
            this.tersedia = false;
            return true;
        }
        return false;
    }

    kembalikan() {
        this.tersedia = true;
    }
}

// SUBCLASS SPESIFIK KKENDARAAN
class Mobil extends Kendaraan {
    constructor(id, merk, model, tahun, hargaSewa, jumlahPintu, tipeBahanBakar) {
        super(id, merk, model, tahun, hargaSewa);
        this.jumlahPintu = jumlahPintu;
        this.tipeBahanBakar = tipeBahanBakar;
        this.tipe = "Mobil";
    }
    getInfo() {
        return `${super.getInfo()} | ${this.jumlahPintu} pintu, ${this.tipeBahanBakar}`;
    }
}

class Motor extends Kendaraan {
    constructor(id, merk, model, tahun, hargaSewa, kapasitasMesin, jenisMotor) {
        super(id, merk, model, tahun, hargaSewa);
        this.kapasitasMesin = kapasitasMesin;
        this.jenisMotor = jenisMotor;
        this.tipe = "Motor";
    }
    getInfo() {
        return `${super.getInfo()} | ${this.kapasitasMesin} cc, ${this.jenisMotor}`;
    }
}

class Truk extends Kendaraan {
    constructor(id, merk, model, tahun, hargaSewa, kapasitasMuat, jenisKargo) {
        super(id, merk, model, tahun, hargaSewa);
        this.kapasitasMuat = kapasitasMuat;
        this.jenisKargo = jenisKargo;
        this.tipe = "Truk";
    }
    getInfo() {
        return `${super.getInfo()} | Kapasitas ${this.kapasitasMuat} kg, untuk ${this.jenisKargo}`;
    }
}

// CLASS PELANGGAN
class Pelanggan {
    constructor(nama, nomorTelepon) {
        this.nama = nama;
        this.nomorTelepon = nomorTelepon;
        this.kendaraanDisewa = [];
        this.riwayatTransaksi = [];
    }

    // Metode menyewa kendaraan
    sewaKendaraan(kendaraan, lamaSewa) {
        if (kendaraan.sewa()) {
            const transaksi = {
                id: Date.now(),
                kendaraan: kendaraan,
                lamaSewa: lamaSewa,
                tanggalSewa: new Date(),
                totalHarga: kendaraan.hargaSewa * lamaSewa,
                status: "Aktif"
            };

            this.kendaraanDisewa.push(transaksi);
            this.riwayatTransaksi.push(transaksi);

            return {
                berhasil: true,
                pesan: `Berhasil menyewa ${kendaraan.getInfo()} untuk ${lamaSewa} hari`,
                totalBiaya: transaksi.totalHarga
            };
        } else {
            return {
                berhasil: false,
                pesan: `Kendaraan ${kendaraan.getInfo()} sedang tidak tersedia`
            }
        }
    }

    // Metode mengembalikam kendaraan
    kembalikanKendaraan(idTransaksi) {
        const index = this.kendaraanDisewa.findIndex(t => t.id === idTransaksi);

        if (index !== -1) {
            const transaksi = this.kendaraanDisewa[index];
            transaksi.kendaraan.kembalikan();
            transaksi.status = "Selesai";
            transaksi.tanggalKembali = new Date();

            this.kendaraanDisewa.splice(index, 1);

            return {
                berhasil: true,
                pesan: `Berhasil mengembalikan ${transaksi.kendaraan.getInfo()}`
            };
        }

        return {
            berhasil: false,
            pesan: "Transaksi tidak ditemukan"
        };
    }

    // Metode mendapatkkan info pelanggan
    getInfo() {
        return {
            nama: this.nama,
            nomorTelepon: this.nomorTelepon,
            kendaraanDisewa: this.kendaraanDisewa.length,
            totalTransaksi: this.riwayatTransaksi.length
        }
    }

    // Metode mendapatkan daftar kendaraan yang sedang disewa
    getDaftarKendaraanDisewa() {
         return this.kendaraanDisewa.map(transaksi => ({
            id: transaksi.id,
            kendaraan: transaksi.kendaraan.getInfo(),
            lamaSewa: transaksi.lamaSewa,
            tanggalSewa: transaksi.tanggalSewa.toLocaleDateString(),
            totalHarga: transaksi.totalHarga
        }));
    }
}

// CLASS SISTEM MANAJEMEN TRANSPORTASI
class SistemManajemenTransportasi {
    constructor() {
        this.kendaraan = [];
        this.pelanggan = [];
    }

    // Menambahkan kendaraan ke sistem
    tambahKendaraan(kendaraan) {
        this.kendaraan.push(kendaraan);
    }

    // Menambahkan pelanggan ke sistem
    tambahPelanggan(pelanggan) {
        this.pelanggan.push(pelanggan);
    }

    // Mencari pelanggan berdasarkan nama
    cariPelanggan(nama) {
        return this.pelanggan.find(p => p.nama.toLowerCase() === nama.toLowerCase());
    }

    // Mencari kendaraan berdasarkan ID
    cariKendaraan(id) {
        return this.kendaraan.find(k => k.id === id);
    }

    // Mendapattkan daftar kendaraan tersedia
    getDaftarKendaraanTersedia() {
        return this.kendaraan.filter(k => k.tersedia);
    }

    // Mendpapatkan daftar pelanggan yang sedang menyewa
    getDaftarPelangganAktif() {
        return this.pelanggan.filter(p => p.kendaraanDisewa.length > 0);
    }

    // Menampilkan laporan lengkap
    getLaporan() {
        const totalKendaraan = this.kendaraan.length;
        const kendaraanTersedia = this.kendaraan.filter(k => k.tersedia).length;
        const kendaraanDisewa = totalKendaraan - kendaraanTersedia;
        const pelangganAktif = this.getDaftarPelangganAktif().length;

        return {
            totalKendaraan,
            kendaraanTersedia,
            kendaraanDisewa,
            totalPelanggan: this.pelanggan.length,
            pelangganAktif
        }
    }
}




// ===== DEMO PENGGUNAAN SISTEM =====

console.log("~~~~ INSIALISASI SISTEM MANAJEMEN TRANSPORTASI ~~~");

// Membuatt instance sistem
const sistem = new SistemManajemenTransportasi();

// Menambahkkan kendaraan ke sistem
sistem.tambahKendaraan(new Mobil("M1", "Toyota", "Avanza", 2020, 500000, 5, "Bensin"));    
sistem.tambahKendaraan(new Mobil("M2", "Honda", "Civic", 2021, 600000, 5, "Bensin"));
sistem.tambahKendaraan(new Motor("MT1", "Yamaha", "NMAX", 2019, 300000, 155, "Matic"));
sistem.tambahKendaraan(new Motor("MT2", "Honda", "Vario", 2020, 350000, 110, "Matic"));
sistem.tambahKendaraan(new Truk("T1", "Volvo", "FH16", 2018, 800000, 5000, "Barang"));

// Menambahkan pelanggan ke sistem
const pelanggan1 = new Pelanggan("Nurmala Khumaida", "1234567890");
const pelanggan2 = new Pelanggan("Ariq Widodo", "0987654321");
const pelanggan3 = new Pelanggan("Rizky Fauzi", "1122334455");

sistem.tambahPelanggan(pelanggan1);
sistem.tambahPelanggan(pelanggan2);
sistem.tambahPelanggan(pelanggan3);

console.log("Sistem Berhasil Diinisialisasikan");
console.log(`Total kendaraan: ${sistem.kendaraan.length}`);
console.log(`Total pelanggan: ${sistem.pelanggan.length}`);

console.log("\n=== DAFTAR KENDARAAN TERSEDIA ===");
sistem.getDaftarKendaraanTersedia().forEach((k, index) => {
    console.log(`${index + 1}. [${k.id}] ${k.getInfo()}`);
});

console.log("\n=== SIMULASI TRANSAKSI PENYEWAAN ===");

// Transaksi 1: Nurmala menyewa mobil Toyota Avanza
const mobil1 = sistem.cariKendaraan("M1");
const hasil1 = pelanggan1.sewaKendaraan(mobil1, 3);
console.log(`${pelanggan1.nama}: ${hasil1.pesan}`);
if (hasil1.berhasil) {
    console.log(`Total biaya: Rp${hasil1.totalBiaya.toLocaleString()}`);
}

// Transaksi 2: Ariq menyewa motor Yamaha NMAX
const motor1 = sistem.cariKendaraan("MT1");
const hasil2 = pelanggan2.sewaKendaraan(motor1, 2);
console.log(`${pelanggan2.nama}: ${hasil2.pesan}`);
if (hasil2.berhasil) {
    console.log(`Total biaya: Rp${hasil2.totalBiaya.toLocaleString()}`);
}

// Transaksi 3: Rizky menyewa truk Volvo FH16
const truk1 = sistem.cariKendaraan("T1");
const hasil3 = pelanggan3.sewaKendaraan(truk1, 1);
console.log(`${pelanggan3.nama}: ${hasil3.pesan}`);
if (hasil3.berhasil) {
    console.log(`Total biaya: Rp${hasil3.totalBiaya.toLocaleString()}`);
}

// Transaksi 4: Rizky juga meneyewa motor
const motor2 = sistem.cariKendaraan("MT2");
const hasil4 = pelanggan3.sewaKendaraan(motor2, 4);
console.log(`${pelanggan3.nama}: ${hasil4.pesan}`);
if (hasil4.berhasil) {
    console.log(`Total biaya: Rp${hasil4.totalBiaya.toLocaleString()}`);
}

console.log("\n=== DAFTAR PELANGGAN YANG SEDANG MENYEWA ===");
const pelangganAktif = sistem.getDaftarPelangganAktif();

pelangganAktif.forEach((pelanggan, index) => {
    console.log(`${index + 1}. ${pelanggan.nama} (${pelanggan.nomorTelepon})`);
    console.log(`   📱 Kendaraan yang disewa:`);
    
    pelanggan.getDaftarKendaraanDisewa().forEach((sewa, idx) => {
        console.log(`   ${idx + 1}. ${sewa.kendaraan}`);
        console.log(`   Tanggal sewa: ${sewa.tanggalSewa}`);
        console.log(`   Lama sewa: ${sewa.lamaSewa} hari`);
        console.log(`   Total: Rp${sewa.totalHarga.toLocaleString()}`);
    });
    console.log("");
});

console.log("\n=== LAPORAN SISTEM ===");
const laporan = sistem.getLaporan();
console.log(`Total kendaraan: ${laporan.totalKendaraan}`);
console.log(`Kendaraan tersedia: ${laporan.kendaraanTersedia}`);
console.log(`Kendaraan disewa: ${laporan.kendaraanDisewa}`);
console.log(`Total pelanggan: ${laporan.totalPelanggan}`);
console.log(`Pelanggan aktif: ${laporan.pelangganAktif}`);

console.log("\n=== SIMULASI PENGEMBALIAN KENDARAAN ===");
// Rizky mengembalikan truk
const transaksiRizkyTrukk = pelanggan3.kendaraanDisewa[0]; // trukkk yg pertama disewa'
const hasilKembali = pelanggan3.kembalikanKendaraan(transaksiRizkyTrukk.id);
console.log(`${pelanggan3.nama}: ${hasilKembali.pesan}`);

console.log("\n=== LAPORAN AKHIR ===");
const laporanAkhir = sistem.getLaporan();
console.log(`Kendaraan tersedia: ${laporanAkhir.kendaraanTersedia}`);
console.log(`Kendaraan disewa: ${laporanAkhir.kendaraanDisewa}`);
console.log(`Pelanggan aktif: ${laporanAkhir.pelangganAktif}`);

console.log("\n=== Demo Sistem Selesai ===");