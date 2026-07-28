// ============================================
// Si DESKA - IPFS Storage Engine
// Off-Chain Storage untuk data mentah
// ============================================

class IPFSStorage {
    constructor() {
        this.storage = {};
        this.cidMap = {};
        this.totalData = 0;
        this.dataByLevel = { rt: 0, desa: 0, kecamatan: 0 };
        this.dataBySektor = {};
        
        // Seed data awal
        this.seedData();
    }

    // ===== SEED DATA =====
    seedData() {
        // Sample data untuk demo
        const samples = [
            { level: 'rt', sektor: 1, kecamatan: 'Sumur', desa: 'Sumur', rw: 'RW-001', rt: 'RT-001', nilai: 45, penginput: 'Pak RT' },
            { level: 'rt', sektor: 7, kecamatan: 'Cimanggu', desa: 'Cimanggu', rw: 'RW-002', rt: 'RT-003', nilai: 12, penginput: 'Bu RW' },
            { level: 'desa', sektor: 2, kecamatan: 'Cibaliung', desa: 'Cibaliung', nilai: 150, penginput: 'Kepala Desa' },
            { level: 'kecamatan', sektor: 6, kecamatan: 'Panimbang', nilai: 85, penginput: 'Camat' }
        ];
        
        samples.forEach((data, i) => {
            this.saveData(data);
        });
        
        console.log('🌐 IPFS Storage initialized with', samples.length, 'sample data');
    }

    // ===== SAVE DATA TO IPFS (Simulasi) =====
    saveData(data) {
        const id = 'Qm' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
        const timestamp = Date.now();
        
        const entry = {
            id: id,
            ...data,
            timestamp: timestamp,
            verified: false,
            verifiedBy: null,
            verifiedAt: null
        };
        
        this.storage[id] = entry;
        this.cidMap[id] = {
            cid: id,
            size: JSON.stringify(entry).length,
            created: timestamp
        };
        
        this.totalData++;
        this.dataByLevel[data.level] = (this.dataByLevel[data.level] || 0) + 1;
        this.dataBySektor[data.sektor] = (this.dataBySektor[data.sektor] || 0) + 1;
        
        return entry;
    }

    // ===== GET DATA BY CID =====
    getData(cid) {
        return this.storage[cid] || null;
    }

    // ===== GET ALL DATA =====
    getAllData() {
        return Object.values(this.storage);
    }

    // ===== GET DATA BY LEVEL =====
    getDataByLevel(level) {
        return Object.values(this.storage).filter(d => d.level === level);
    }

    // ===== GET DATA BY SEKTOR =====
    getDataBySektor(sektor) {
        return Object.values(this.storage).filter(d => d.sektor == sektor);
    }

    // ===== GET DATA BY KECAMATAN =====
    getDataByKecamatan(kecamatan) {
        return Object.values(this.storage).filter(d => d.kecamatan === kecamatan);
    }

    // ===== VERIFY DATA =====
    verifyData(cid, verifiedBy) {
        const data = this.storage[cid];
        if (!data) return null;
        
        data.verified = true;
        data.verifiedBy = verifiedBy;
        data.verifiedAt = Date.now();
        
        return data;
    }

    // ===== GET STATS =====
    getStats() {
        return {
            totalData: this.totalData,
            byLevel: this.dataByLevel,
            bySektor: this.dataBySektor,
            verified: Object.values(this.storage).filter(d => d.verified).length
        };
    }

    // ===== GET CID LIST =====
    getCIDList() {
        return Object.keys(this.storage);
    }

    // ===== SEARCH DATA =====
    searchData(query) {
        const results = [];
        Object.values(this.storage).forEach(d => {
            const searchStr = JSON.stringify(d).toLowerCase();
            if (searchStr.includes(query.toLowerCase())) {
                results.push(d);
            }
        });
        return results;
    }
}

// ===== INIT =====
const ipfs = new IPFSStorage();

console.log('🌐 Si DESKA IPFS Engine Ready');
console.log('📊 Total Data:', ipfs.totalData);
console.log('📋 CID List:', ipfs.getCIDList().slice(0, 3), '...');
