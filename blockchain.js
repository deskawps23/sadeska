// ============================================
// SA DESKA BLOCKCHAIN ENGINE
// Real-Time Blockchain Simulation
// ============================================

class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingData = [];
        this.difficulty = 2;
        this.miningSpeed = 1000; // ms
        this.isMining = false;
        this.dataCount = 0;
        this.rtCount = 0;
        this.rwCount = 0;
        this.desaCount = 0;
        this.kecamatanCount = 0;
        
        // Create genesis block
        this.createGenesisBlock();
        
        // Start mining loop
        this.startMining();
        
        // Start auto-generate data
        this.startAutoGenerate();
    }

    // ===== CREATE GENESIS BLOCK =====
    createGenesisBlock() {
        const genesis = {
            index: 0,
            timestamp: Date.now(),
            data: "Genesis Block - SA DESKA",
            previousHash: "0".repeat(64),
            hash: this.calculateHash(0, Date.now(), "Genesis Block - SA DESKA", "0".repeat(64)),
            nonce: 0
        };
        this.chain.push(genesis);
        this.updateUI();
        this.drawBlockchain();
    }

    // ===== CALCULATE HASH =====
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

    // ===== MINE BLOCK =====
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

    // ===== ADD BLOCK =====
    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = {
            index: this.chain.length,
            timestamp: Date.now(),
            data: data,
            previousHash: lastBlock.hash,
            hash: '',
            nonce: 0
        };
        
        // Mine the block
        const minedBlock = this.mineBlock(newBlock);
        this.chain.push(minedBlock);
        this.dataCount++;
        
        // Update counters based on level
        if (data.level === 'rt') this.rtCount++;
        else if (data.level === 'rw') this.rwCount++;
        else if (data.level === 'desa') this.desaCount++;
        else if (data.level === 'kecamatan') this.kecamatanCount++;
        
        this.updateUI();
        this.drawBlockchain();
        this.showTransaction(data);
        
        return minedBlock;
    }

    // ===== SUBMIT DATA (From UI) =====
    submitData(sektor, level, kecamatan, desa, rw, rt, nilai, keterangan, penginput) {
        const data = {
            sektor: parseInt(sektor),
            level: level,
            kecamatan: kecamatan,
            desa: desa || '-',
            rw: rw || '-',
            rt: rt || '-',
            nilai: parseFloat(nilai),
            keterangan: keterangan || '-',
            penginput: penginput || 'Warga',
            timestamp: Date.now()
        };
        
        return this.addBlock(data);
    }

    // ===== START MINING LOOP =====
    startMining() {
        setInterval(() => {
            this.isMining = !this.isMining;
            document.getElementById('miningStatus').innerHTML = 
                this.isMining ? 
                '<i class="fas fa-spinner fa-spin"></i> Mining block baru...' :
                '<i class="fas fa-check-circle"></i> Blockchain siap';
            
            // Update mining status color
            if (this.isMining) {
                document.getElementById('miningStatus').style.color = '#00FF88';
            } else {
                document.getElementById('miningStatus').style.color = '#00D4FF';
            }
        }, 3000);
    }

    // ===== AUTO GENERATE DATA =====
    startAutoGenerate() {
        const sektorList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        const levelList = ['rt', 'rw', 'desa', 'kecamatan'];
        const kecamatanList = [
            'Sumur', 'Cimanggu', 'Cibaliung', 'Cikeusik', 'Panimbang',
            'Sobang', 'Munjul', 'Saketi', 'Bojong', 'Menes'
        ];
        const desaList = ['Desa A', 'Desa B', 'Desa C', 'Desa D', 'Desa E'];
        
        setInterval(() => {
            const sektor = sektorList[Math.floor(Math.random() * sektorList.length)];
            const level = levelList[Math.floor(Math.random() * levelList.length)];
            const kecamatan = kecamatanList[Math.floor(Math.random() * kecamatanList.length)];
            const desa = desaList[Math.floor(Math.random() * desaList.length)];
            const nilai = Math.floor(Math.random() * 1000) + 1;
            
            this.submitData(
                sektor,
                level,
                kecamatan,
                level === 'kecamatan' ? '-' : desa,
                level === 'rt' || level === 'rw' ? 'RW-' + String(Math.floor(Math.random() * 10) + 1).padStart(3, '0') : '-',
                level === 'rt' ? 'RT-' + String(Math.floor(Math.random() * 10) + 1).padStart(3, '0') : '-',
                nilai,
                `Data otomatis ${new Date().toLocaleTimeString()}`,
                'Sistem'
            );
        }, 5000); // Auto generate every 5 seconds
    }

    // ===== SHOW TRANSACTION =====
    showTransaction(data) {
        const status = document.getElementById('txStatus');
        const hash = document.getElementById('txHash');
        if (status) {
            status.innerHTML = `
                <span style="color: var(--neon-green);">
                    ⛓️ Transaksi berhasil! Block #${this.chain.length - 1}
                </span>
                <span style="font-size: 12px; color: var(--text-dim); display: block; margin-top: 4px;">
                    ${data.kecamatan} | ${data.level} | ${data.nilai}
                </span>
            `;
        }
        setTimeout(() => {
            if (status) {
                status.innerHTML = `<span class="tx-hash">⛓️ Menunggu transaksi...</span>`;
            }
        }, 3000);
    }

    // ===== UPDATE UI =====
    updateUI() {
        document.getElementById('totalBlocks').textContent = this.chain.length;
        document.getElementById('totalData').textContent = this.dataCount;
        document.getElementById('totalRT').textContent = this.rtCount.toLocaleString() + '+';
        document.getElementById('rtCount').textContent = this.rtCount;
        document.getElementById('rwCount').textContent = this.rwCount;
        document.getElementById('desaCount').textContent = this.desaCount;
        document.getElementById('kecamatanCount').textContent = this.kecamatanCount;
        document.getElementById('blockchainCount').textContent = this.chain.length;
        document.getElementById('footerBlock').textContent = `Block #${this.chain.length - 1}`;
        
        if (this.chain.length > 0) {
            const last = this.chain[this.chain.length - 1];
            document.getElementById('currentBlock').textContent = last.index;
            document.getElementById('currentHash').textContent = last.hash.substring(0, 16) + '...';
            document.getElementById('currentData').textContent = 
                typeof last.data === 'object' ? 
                `${last.data.kecamatan} | ${last.data.nilai}` : 
                last.data.substring(0, 20);
        }
        
        this.updateDashboard();
    }

    // ===== UPDATE DASHBOARD =====
    updateDashboard() {
        const container = document.getElementById('dashboardGrid');
        if (!container) return;
        
        const stats = this.getStats();
        container.innerHTML = stats.map(s => `
            <div class="dashboard-card">
                <span class="icon">${s.icon}</span>
                <h3>${s.name}</h3>
                <div class="number">${s.count}</div>
                <small style="color: var(--text-dim);">${s.total.toLocaleString()}</small>
            </div>
        `).join('');
    }

    getStats() {
        const sektorData = {};
        this.chain.forEach(block => {
            if (block.data && typeof block.data === 'object' && block.data.sektor) {
                const s = block.data.sektor;
                if (!sektorData[s]) sektorData[s] = { count: 0, total: 0 };
                sektorData[s].count++;
                sektorData[s].total += block.data.nilai || 0;
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
        
        return sektorList.map(s => ({
            ...s,
            count: sektorData[s.no]?.count || 0,
            total: sektorData[s.no]?.total || 0
        }));
    }

    // ===== DRAW BLOCKCHAIN (Canvas Animation) =====
    drawBlockchain() {
        const canvas = document.getElementById('blockchainCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width || 800;
        canvas.height = 400;
        
        const w = canvas.width;
        const h = canvas.height;
        
        // Clear
        ctx.clearRect(0, 0, w, h);
        
        // Draw background grid
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y < h; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
        
        const blocks = this.chain;
        if (blocks.length === 0) return;
        
        const blockWidth = 80;
        const blockHeight = 60;
        const gap = 20;
        const totalWidth = blocks.length * (blockWidth + gap) - gap;
        const startX = (w - totalWidth) / 2;
        const y = h / 2 - blockHeight / 2;
        
        // Draw chain line (kurva bergerak)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -Date.now() / 50;
        
        for (let i = 0; i < blocks.length; i++) {
            const x = startX + i * (blockWidth + gap);
            if (i === 0) {
                ctx.moveTo(x + blockWidth / 2, y + blockHeight / 2);
            } else {
                const prevX = startX + (i - 1) * (blockWidth + gap);
                const midX = (prevX + x + blockWidth) / 2;
                ctx.quadraticCurveTo(
                    midX, y - 30 + Math.sin(Date.now() / 1000 + i * 0.5) * 15,
                    x + blockWidth / 2, y + blockHeight / 2
                );
            }
        }
        ctx.stroke();
        
        // Draw blocks
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const x = startX + i * (blockWidth + gap);
            
            // Block glow
            const gradient = ctx.createRadialGradient(
                x + blockWidth / 2, y + blockHeight / 2, 5,
                x + blockWidth / 2, y + blockHeight / 2, blockWidth
            );
            gradient.addColorStop(0, i === blocks.length - 1 ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 212, 255, 0.1)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(x - 20, y - 20, blockWidth + 40, blockHeight + 40);
            
            // Block box
            ctx.shadowColor = i === blocks.length - 1 ? 'rgba(0, 255, 136, 0.4)' : 'rgba(0, 212, 255, 0.1)';
            ctx.shadowBlur = 20;
            
            const isGenesis = i === 0;
            const isLast = i === blocks.length - 1;
            
            ctx.fillStyle = isGenesis ? 'rgba(0, 255, 136, 0.15)' : 
                           isLast ? 'rgba(0, 255, 136, 0.25)' : 
                           'rgba(0, 212, 255, 0.05)';
            ctx.strokeStyle = isLast ? '#00FF88' : 'rgba(0, 212, 255, 0.3)';
            ctx.lineWidth = isLast ? 2 : 1;
            
            // Rounded rect
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
            
            // Block number
            ctx.fillStyle = isLast ? '#00FF88' : 'rgba(255, 255, 255, 0.5)';
            ctx.font = isLast ? 'bold 16px monospace' : '12px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`#${block.index}`, x + blockWidth / 2, y + 18);
            
            // Hash preview
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.font = '8px monospace';
            const hashStr = block.hash ? block.hash.substring(0, 8) : '0x...';
            ctx.fillText(hashStr + '...', x + blockWidth / 2, y + 38);
            
            // Data indicator
            if (block.data && typeof block.data === 'object' && block.data.nilai) {
                ctx.fillStyle = isLast ? '#00FF88' : 'rgba(255, 255, 255, 0.5)';
                ctx.font = '10px monospace';
                ctx.fillText(`${block.data.nilai}`, x + blockWidth / 2, y + 52);
            }
            
            // Connecting line animation
            if (i < blocks.length - 1) {
                const nextX = startX + (i + 1) * (blockWidth + gap);
                const time = Date.now() / 1000;
                const progress = (Math.sin(time * 0.5 + i * 0.7) + 1) / 2;
                
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 + progress * 0.3})`;
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 8]);
                ctx.lineDashOffset = -Date.now() / 30;
                
                const startX2 = x + blockWidth;
                const endX = nextX;
                const midX = (startX2 + endX) / 2;
                const waveY = y + blockHeight / 2 + Math.sin(Date.now() / 1000 + i) * 8;
                
                ctx.moveTo(startX2, y + blockHeight / 2);
                ctx.quadraticCurveTo(midX, waveY, endX, y + blockHeight / 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
            
            // Genesis badge
            if (isGenesis) {
                ctx.fillStyle = '#00FF88';
                ctx.font = '8px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('🔗 GENESIS', x + blockWidth / 2, y - 12);
            }
            
            // Last block glow animation
            if (isLast) {
                const pulse = Math.sin(Date.now() / 500) * 0.3 + 0.7;
                ctx.shadowColor = `rgba(0, 255, 136, ${pulse * 0.3})`;
                ctx.shadowBlur = 40;
                ctx.strokeStyle = `rgba(0, 255, 136, ${pulse * 0.5})`;
                ctx.lineWidth = 1;
                ctx.strokeRect(x - 4, y - 4, blockWidth + 8, blockHeight + 8);
                ctx.shadowBlur = 0;
            }
        }
        
        // Mining animation text
        if (this.isMining) {
            ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
            ctx.font = '12px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText('⛏️ MINING...', w / 2, h - 10);
        }
    }
}

// ===== INIT BLOCKCHAIN =====
const blockchain = new Blockchain();

// ===== ANIMATION LOOP =====
function animateBlockchain() {
    blockchain.drawBlockchain();
    requestAnimationFrame(animateBlockchain);
}

// Start animation
setTimeout(() => {
    animateBlockchain();
}, 100);

// ===== HANDLE RESIZE =====
window.addEventListener('resize', () => {
    blockchain.drawBlockchain();
});

console.log('⛓️ SA DESKA Blockchain Engine Started');
console.log(`📊 Genesis Block: ${blockchain.chain[0].hash}`);
