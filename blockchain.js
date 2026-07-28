// ============================================
// Si DESKA - Blockchain Verifikasi Data
// Hanya untuk verifikasi keaslian data
// BUKAN aset keuangan atau kripto
// ============================================

class BlockchainVerifikasi {
    constructor() {
        this.chain = [];
        this.difficulty = 2;
        this.totalData = 0;
        
        this.createGenesisBlock();
    }

    createGenesisBlock() {
        const genesis = {
            index: 0,
            timestamp: Date.now(),
            data: "Genesis Block - Si DESKA Verifikasi Data",
            previousHash: "0".repeat(64),
            hash: this.calculateHash(0, Date.now(), "Genesis Block - Si DESKA Verifikasi Data", "0".repeat(64)),
            nonce: 0,
            verifikasi: {
                status: 'verified',
                oleh: 'Sistem Si DESKA',
                tanggal: new Date().toISOString()
            }
        };
        this.chain.push(genesis);
        this.updateUI();
        this.drawBlockchain();
    }

    calculateHash(index, timestamp, data, previousHash, nonce = 0) {
        const str = index + timestamp + JSON.stringify(data) + previousHash + nonce;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
    }

    mineBlock(block) {
        let nonce = 0;
        let hash = '';
        const target = '0'.repeat(this.difficulty);
        
        while (hash.substring(0, this.difficulty) !== target) {
            nonce++;
            hash = this.calculateHash(block.index, block.timestamp, block.data, block.previousHash, nonce);
        }
        
        block.hash = hash;
        block.nonce = nonce;
        return block;
    }

    // ===== TAMBAH DATA UNTUK VERIFIKASI =====
    tambahData(dataStatistik, penginput, level, jabatan) {
        const lastBlock = this.chain[this.chain.length - 1];
        
        const dataEntry = {
            id: 'DATA-' + Date.now(),
            statistik: dataStatistik,
            penginput: penginput,
            level: level,
            jabatan: jabatan || 'Warga',
            timestamp: new Date().toISOString(),
            verifikasi: {
                status: 'pending',
                oleh: null,
                tanggal: null
            }
        };
        
        const newBlock = {
            index: this.chain.length,
            timestamp: Date.now(),
            data: dataEntry,
            previousHash: lastBlock.hash,
            hash: '',
            nonce: 0,
            verifikasi: {
                status: 'pending',
                oleh: null,
                tanggal: null
            }
        };
        
        const minedBlock = this.mineBlock(newBlock);
        this.chain.push(minedBlock);
        this.totalData++;
        
        this.updateUI();
        this.drawBlockchain();
        this.showStatus(minedBlock);
        
        return {
            success: true,
            block: minedBlock,
            message: `✅ Data berhasil direkam untuk verifikasi. ID: ${dataEntry.id}`
        };
    }

    // ===== VERIFIKASI DATA OLEH OPD =====
    verifikasiData(index, oleh) {
        const block = this.chain.find(b => b.index === index);
        if (!block) {
            return { success: false, message: 'Data tidak ditemukan' };
        }
        
        if (block.verifikasi.status === 'verified') {
            return { success: false, message: 'Data sudah diverifikasi' };
        }
        
        block.verifikasi.status = 'verified';
        block.verifikasi.oleh = oleh;
        block.verifikasi.tanggal = new Date().toISOString();
        block.data.verifikasi = block.verifikasi;
        
        // Beri poin ke penginput
        const reward = sistemPoin.tambahPoin(
            block.data.penginput,
            sistemPoin.rewardPoin[block.data.level] || 10,
            `Verifikasi data ${block.data.level}`
        );
        
        this.updateUI();
        this.drawBlockchain();
        
        return {
            success: true,
            message: `✅ Data diverifikasi oleh ${oleh}`,
            reward: reward
        };
    }

    // ===== GET DATA =====
    getData(index) {
        return this.chain.find(b => b.index === index) || null;
    }

    getAllData() {
        return this.chain.slice(1); // Skip genesis
    }

    // ===== VERIFIKASI DATA =====
    verifyData(index) {
        const block = this.chain.find(b => b.index === index);
        if (!block) return { success: false, message: 'Data tidak ditemukan' };
        
        const hashCheck = block.hash === this.calculateHash(
            block.index, block.timestamp, block.data, block.previousHash, block.nonce
        );
        
        return {
            success: true,
            verified: hashCheck && block.verifikasi.status === 'verified',
            hashValid: hashCheck,
            status: block.verifikasi.status,
            data: block.data
        };
    }

    showStatus(block) {
        const status = document.getElementById('txStatus');
        if (status) {
            status.innerHTML = `
                <span style="color: var(--neon-green);">
                    📋 Data #${block.index} • Menunggu verifikasi OPD
                </span>
                <span style="font-size: 12px; color: var(--text-dim); display: block; margin-top: 4px;">
                    ⭐ ${block.data.level.toUpperCase()} • ${block.data.penginput}
                </span>
            `;
        }
    }

    updateUI() {
        document.getElementById('totalData').textContent = this.totalData;
        
        // Update poin
        const stats = sistemPoin.getStats();
        document.getElementById('totalPoin').textContent = stats.totalPoin;
        document.getElementById('totalPoinSupply').textContent = stats.totalPoin + ' Poin';
        document.getElementById('totalKontributor').textContent = stats.totalKontributor + ' Kontributor';
        
        // Update leaderboard
        this.updateLeaderboard();
        
        // Last data info
        if (this.chain.length > 1) {
            const last = this.chain[this.chain.length - 1];
            document.getElementById('currentBlock').textContent = last.index;
            document.getElementById('currentHash').textContent = last.hash.substring(0, 16) + '...';
            
            const statusEl = document.getElementById('verificationStatus');
            if (last.verifikasi.status === 'verified') {
                statusEl.textContent = '✅ Terverifikasi';
                statusEl.style.color = 'var(--neon-green)';
            } else {
                statusEl.textContent = '⏳ Menunggu Verifikasi';
                statusEl.style.color = 'var(--neon-gold)';
            }
        }
        
        this.updateDashboard();
    }

    updateLeaderboard() {
        const container = document.getElementById('leaderboardList');
        if (!container) return;
        
        const leaderboard = sistemPoin.getLeaderboard(5);
        container.innerHTML = leaderboard.map(item => `
            <div class="leaderboard-item">
                <span>${item.medali} ${item.nama}</span>
                <span>${item.poin} Poin • ${item.reputasi}</span>
            </div>
        `).join('');
    }

    updateDashboard() {
        const container = document.getElementById('dashboardGrid');
        if (!container) return;
        
        const data = this.getAllData();
        const sektorCount = {};
        const levelCount = { rt: 0, desa: 0, kecamatan: 0 };
        
        data.forEach(d => {
            if (d.data.statistik && d.data.statistik.sektor) {
                const s = d.data.statistik.sektor;
                sektorCount[s] = (sektorCount[s] || 0) + 1;
            }
            if (d.data.level) {
                levelCount[d.data.level] = (levelCount[d.data.level] || 0) + 1;
            }
        });
        
        const sektorList = [
            {no:1,name:'Kependudukan',icon:'👨‍👩‍👧‍👦'},
            {no:2,name:'Pertanian',icon:'🌾'},
            {no:3,name:'Perdagangan',icon:'🛒'},
            {no:4,name:'Kesehatan',icon:'🏥'},
            {no:5,name:'Pendidikan',icon:'📚'},
            {no:6,name:'Ekonomi',icon:'💰'},
            {no:7,name:'Infrastruktur',icon:'🏗️'},
            {no:8,name:'Sosial',icon:'🤝'}
        ];
        
        container.innerHTML = sektorList.map(s => `
            <div class="dashboard-card">
                <span class="icon">${s.icon}</span>
                <h3>${s.name}</h3>
                <div class="number">${sektorCount[s.no] || 0}</div>
                <small style="color: var(--text-dim);">${levelCount.rt || 0} RT • ${levelCount.desa || 0} Desa</small>
            </div>
        `).join('');
    }

    drawBlockchain() {
        const canvas = document.getElementById('blockchainCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width || 800;
        canvas.height = 400;
        
        const w = canvas.width;
        const h = canvas.height;
        
        ctx.clearRect(0, 0, w, h);
        
        // Grid
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.02)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
        
        const blocks = this.chain;
        if (blocks.length === 0) return;
        
        const blockWidth = 80;
        const blockHeight = 60;
        const gap = 20;
        const displayBlocks = blocks.slice(-15);
        const totalWidth = displayBlocks.length * (blockWidth + gap) - gap;
        const startX = (w - totalWidth) / 2;
        const y = h / 2 - blockHeight / 2;
        
        // Draw chain curve
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 8]);
        ctx.lineDashOffset = -Date.now() / 40;
        
        for (let i = 0; i < displayBlocks.length; i++) {
            const x = startX + i * (blockWidth + gap);
            if (i === 0) {
                ctx.moveTo(x + blockWidth / 2, y + blockHeight / 2);
            } else {
                const prevX = startX + (i - 1) * (blockWidth + gap);
                const midX = (prevX + x + blockWidth) / 2;
                ctx.quadraticCurveTo(
                    midX, y - 35 + Math.sin(Date.now() / 800 + i * 0.6) * 18,
                    x + blockWidth / 2, y + blockHeight / 2
                );
            }
        }
        ctx.stroke();
        
        // Draw blocks
        for (let i = 0; i < displayBlocks.length; i++) {
            const block = displayBlocks[i];
            const x = startX + i * (blockWidth + gap);
            const isGenesis = block.index === 0;
            const isVerified = block.verifikasi && block.verifikasi.status === 'verified';
            const isLast = i === displayBlocks.length - 1;
            
            // Glow
            const gradient = ctx.createRadialGradient(
                x + blockWidth / 2, y + blockHeight / 2, 5,
                x + blockWidth / 2, y + blockHeight / 2, blockWidth
            );
            const glowColor = isVerified ? 'rgba(0, 255, 136, 0.2)' : 'rgba(245, 158, 11, 0.15)';
            gradient.addColorStop(0, isLast ? glowColor : 'rgba(0, 212, 255, 0.06)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(x - 20, y - 20, blockWidth + 40, blockHeight + 40);
            
            // Box
            ctx.shadowColor = isLast ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 212, 255, 0.05)';
            ctx.shadowBlur = isLast ? 20 : 10;
            
            const borderColor = isVerified ? '#00FF88' : (isGenesis ? '#00D4FF' : 'rgba(0, 212, 255, 0.2)');
            ctx.fillStyle = isGenesis ? 'rgba(0, 255, 136, 0.10)' : 
                           isVerified ? 'rgba(0, 255, 136, 0.15)' : 
                           'rgba(245, 158, 11, 0.05)';
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = isVerified ? 2 : 1;
            
            const r = 8;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + blockWidth - r, y);
            ctx.quadraticCurveTo(x + blockWidth, y, x + blockWidth, y + r);
            ctx.lineTo(x + blockWidth, y + blockHeight - r);
            ctx.quadraticCurveTo(x + blockWidth, y + blockHeight, x + blockWidth - r, y + blockHeight);
            ctx.lineTo(x + r, y + blockHeight);
            ctx.quadraticCurveTo(x, y + blockHeight, x, y + blockHeight - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            ctx.shadowBlur = 0;
            
            // Number
            ctx.fillStyle = isVerified ? '#00FF88' : 'rgba(255,255,255,0.5)';
            ctx.font = isVerified ? 'bold 13px monospace' : '11px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`#${block.index}`, x + blockWidth / 2, y + 16);
            
            // Status
            ctx.fillStyle = isVerified ? 'rgba(0, 255, 136, 0.5)' : 'rgba(245, 158, 11, 0.5)';
            ctx.font = '7px monospace';
            const statusText = isVerified ? '✅ Verified' : '⏳ Pending';
            ctx.fillText(statusText, x + blockWidth / 2, y + 34);
            
            // Level
            if (block.data && block.data.level) {
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.font = '7px monospace';
                ctx.fillText(block.data.level.toUpperCase(), x + blockWidth / 2, y + 48);
            }
            
            // Genesis
            if (isGenesis) {
                ctx.fillStyle = '#00D4FF';
                ctx.font = '7px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('🔗 GENESIS', x + blockWidth / 2, y - 10);
            }
            
            // Last block glow
            if (isLast && !isGenesis) {
                const pulse = Math.sin(Date.now() / 400) * 0.3 + 0.7;
                ctx.shadowColor = `rgba(0, 255, 136, ${pulse * 0.2})`;
                ctx.shadowBlur = 30;
                ctx.strokeStyle = `rgba(0, 255, 136, ${pulse * 0.3})`;
                ctx.lineWidth = 1;
                ctx.strokeRect(x - 4, y - 4, blockWidth + 8, blockHeight + 8);
                ctx.shadowBlur = 0;
            }
        }
        
        // Info text
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('🔗 Verifikasi Data dengan Blockchain • Bukan Aset Keuangan', w / 2, h - 10);
    }
}

// ===== INIT =====
const blockchain = new BlockchainVerifikasi();

function animateBlockchain() {
    blockchain.drawBlockchain();
    requestAnimationFrame(animateBlockchain);
}

setTimeout(() => animateBlockchain(), 100);

window.addEventListener('resize', () => blockchain.drawBlockchain());

console.log('🔗 Si DESKA Blockchain Verifikasi Data Ready');
console.log('✅ Digunakan hanya untuk verifikasi keaslian data');
console.log('📋 Bukan aset keuangan atau kripto');
