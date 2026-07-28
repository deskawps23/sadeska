// ============================================
// Si DESKA - Sistem Poin & Reputasi
// BUKAN aset keuangan • Hanya untuk apresiasi
// ============================================

class SistemPoin {
    constructor() {
        this.poin = {};
        this.reputasi = {};
        this.kontributor = {};
        this.totalKontributor = 0;
        this.totalPoin = 0;
        this.transaksiPoin = [];
        
        // Reward poin per level
        this.rewardPoin = {
            rt: 10,
            rw: 10,
            desa: 20,
            kecamatan: 30
        };
        
        // Level reputasi
        this.levelReputasi = [
            { nama: '🟢 Pemula', min: 0, max: 50 },
            { nama: '🔵 Kontributor', min: 51, max: 200 },
            { nama: '🟣 Senior', min: 201, max: 500 },
            { nama: '🌟 Master Data', min: 501, max: Infinity }
        ];
        
        this.seedPoin();
    }

    seedPoin() {
        // Seed data untuk demo
        const kontributor = [
            { nama: 'Pak RT', poin: 320 },
            { nama: 'Bu RW', poin: 280 },
            { nama: 'Kepala Desa', poin: 240 },
            { nama: 'Camat', poin: 180 },
            { nama: 'Warga A', poin: 95 },
            { nama: 'Warga B', poin: 65 }
        ];
        
        kontributor.forEach(k => {
            this.tambahPoin(k.nama, k.poin, 'Seed awal');
        });
        
        console.log('⭐ Sistem Poin & Reputasi Si DESKA siap');
    }

    // ===== TAMBAH POIN =====
    tambahPoin(nama, jumlah, keterangan = '') {
        if (!this.poin[nama]) {
            this.poin[nama] = 0;
            this.kontributor[nama] = {
                nama: nama,
                bergabung: Date.now(),
                totalData: 0
            };
            this.totalKontributor++;
        }
        
        this.poin[nama] += jumlah;
        this.totalPoin += jumlah;
        this.kontributor[nama].totalData++;
        
        this.transaksiPoin.push({
            nama: nama,
            jumlah: jumlah,
            keterangan: keterangan || 'Reward data',
            timestamp: Date.now()
        });
        
        // Update reputasi
        this.updateReputasi(nama);
        
        return this.poin[nama];
    }

    // ===== KURANGI POIN =====
    kurangiPoin(nama, jumlah, keterangan = '') {
        if (!this.poin[nama]) return { success: false, message: 'Kontributor tidak ditemukan' };
        if (this.poin[nama] < jumlah) {
            return { success: false, message: 'Poin tidak cukup' };
        }
        
        this.poin[nama] -= jumlah;
        this.totalPoin -= jumlah;
        
        this.transaksiPoin.push({
            nama: nama,
            jumlah: -jumlah,
            keterangan: keterangan || 'Penalti',
            timestamp: Date.now()
        });
        
        this.updateReputasi(nama);
        return { success: true, sisa: this.poin[nama] };
    }

    // ===== UPDATE REPUTASI =====
    updateReputasi(nama) {
        const poin = this.poin[nama] || 0;
        for (const level of this.levelReputasi) {
            if (poin >= level.min && poin <= level.max) {
                this.reputasi[nama] = level.nama;
                break;
            }
        }
    }

    // ===== GET POIN =====
    getPoin(nama) {
        return this.poin[nama] || 0;
    }

    // ===== GET REPUTASI =====
    getReputasi(nama) {
        return this.reputasi[nama] || '🟢 Pemula';
    }

    // ===== GET LEADERBOARD =====
    getLeaderboard(limit = 10) {
        const sorted = Object.entries(this.poin)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit);
        
        const medals = ['🏆', '🥈', '🥉'];
        return sorted.map(([nama, poin], i) => ({
            peringkat: i + 1,
            medali: medals[i] || `${i+1}.`,
            nama: nama,
            poin: poin,
            reputasi: this.getReputasi(nama)
        }));
    }

    // ===== GET STATS =====
    getStats() {
        return {
            totalPoin: this.totalPoin,
            totalKontributor: this.totalKontributor,
            totalTransaksi: this.transaksiPoin.length
        };
    }

    // ===== VERIFIKASI DATA (dari OPD) =====
    verifikasiData(namaPenginput, level, cid) {
        const reward = this.rewardPoin[level] || 10;
        const poinBaru = this.tambahPoin(namaPenginput, reward, `Verifikasi data ${level.toUpperCase()} (${cid})`);
        
        return {
            success: true,
            poin: poinBaru,
            reward: reward,
            reputasi: this.getReputasi(namaPenginput),
            message: `✅ Data berhasil diverifikasi! +${reward} poin untuk ${namaPenginput}`
        };
    }
}

// ===== INIT =====
const sistemPoin = new SistemPoin();

console.log('⭐ Si DESKA Poin & Reputasi System Ready');
console.log('📊 Total Poin:', sistemPoin.totalPoin);
console.log('👥 Total Kontributor:', sistemPoin.totalKontributor);

// Export untuk global
window.sistemPoin = sistemPoin;
