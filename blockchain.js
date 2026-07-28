// ============================================
// Si DESKA - Blockchain Engine
// On-Chain: Hash + Timestamp + Multi-Signature
// ============================================

class BlockchainSiDESKA {
    constructor() {
        this.chain = [];
        this.pendingHashes = [];
        this.difficulty = 2;
        this.multiSigRequired = 2; // Minimal tanda tangan
        this.isMining = false;
        
        this.createGenesisBlock();
        this.startMining();
    }

    createGenesisBlock() {
        const genesis = {
            index: 0,
            timestamp: Date.now(),
            data: "Genesis Block - Si DESKA Hybrid",
            previousHash: "0".repeat(64),
            hash: this.calculateHash(0, Date.now(), "Genesis Block - Si DESKA Hybrid", "0".repeat(64)),
            nonce: 0,
            ipfsCID: "QmGenesis",
            signatures: []
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

    // ===== ADD BLOCK (On-Chain) =====
    addBlock(data, ipfsCID, signatures = []) {
        const lastBlock = this.chain[this.chain.length - 1];
        
        // Multi-signature check
        if (signatures.length < this.multiSigRequired) {
            return { 
                success: false, 
                message: `Butuh ${this.multiSigRequired} tanda tangan, saat ini: ${signatures.length}` 
            };
        }
        
        const newBlock = {
            index: this.chain.length,
            timestamp: Date.now(),
            data: data,
            previousHash: lastBlock.hash,
            hash: '',
            nonce: 0,
            ipfsCID: ipfsCID,
            signatures: signatures
        };
        
        const minedBlock = this.mineBlock(newBlock);
        this.chain.push(minedBlock);
        
        // Reward token ke penginput
        const level = data.level || 'rt';
        const address = data.penginput || 'Warga';
        const reward = tokenSDT.mintToken(address, level);
        
        this.updateUI();
        this.drawBlockchain();
        this.showTransaction(minedBlock, reward);
        
        return { 
            success: true, 
            block: minedBlock,
            reward: reward,
            message: `Block #${minedBlock.index} berhasil ditambahkan, reward ${reward} SDT`
        };
    }

    // ===== VERIFY DATA =====
    verifyData(cid, signatures) {
        // Cari di IPFS
        const data = ipfs.getData(cid);
        if (!data) {
            return { success: false, message: 'Data tidak ditemukan di IPFS' };
        }
        
        // Cari di blockchain
        const block = this.chain.find(b => b.ipfsCID === cid);
        if (!block) {
            return { success: false, message: 'Data tidak ditemukan di blockchain' };
        }
        
        // Verifikasi hash
        const hashCheck = block.hash === this.calculateHash(
            block.index, block.timestamp, block.data, block.previousHash, block.nonce
        );
        
        return {
            success: true,
            verified: true,
            hashCheck: hashCheck,
            block: block,
            data: data
        };
    }

    // ===== MULTI-SIGNATURE =====
    addSignature(cid, signer) {
        const block = this.chain.find(b => b.ipfsCID === cid);
        if (!block) {
            return { success: false, message: 'Block tidak ditemukan' };
        }
        
        if (block.signatures.includes(signer)) {
            return { success: false, message: 'Sudah ditandatangani' };
        }
        
        block.signatures.push(signer);
        return { 
            success: true, 
            signatures: block.signatures,
            required: this.multiSigRequired
        };
    }

    startMining() {
        setInterval(() => {
            this.isMining = !this.isMining;
            const status = document.getElementById('miningStatus');
            if (status) {
                status.innerHTML = this.isMining ? 
                    '<i class="fas fa-spinner fa-spin"></i> Menyimpan ke IPFS & Blockchain...' :
                    '<i class="fas fa-check-circle"></i> Si DESKA Hybrid siap';
            }
        }, 3000);
    }

    showTransaction(block, reward) {
        const status = document.getElementById('txStatus');
        const hash = document.getElementById('txHash');
        if (status) {
            status.innerHTML = `
                <span style="color: var(--neon-green);">
                    ⛓️ Block #${block.index} • IPFS: ${block.ipfsCID.substring(0, 12)}...
                </span>
                <span style="font-size: 12px; color: var(--neon-gold); display: block; margin-top: 4px;">
                    🪙 Reward: ${reward} SDT
                </span>
            `;
        }
    }

    updateUI() {
        document.getElementById('totalBlocks').textContent = this.chain.length;
        document.getElementById('totalData').textContent = ipfs.totalData;
        
        // Update token stats
        const stats = tokenSDT.getStats();
        document.getElementById('totalToken').textContent = stats.totalSupply.toLocaleString();
        document.getElementById('totalTokenSupply').textContent = stats.totalSupply.toLocaleString() + ' SDT';
        document.getElementById('totalContributors').textContent = stats.totalContributors + ' Kontributor';
        document.getElementById('footerSupply').textContent = `Supply: ${stats.totalSupply}`;
        document.getElementById('footerContributors').textContent = `Kontributor: ${stats.totalContributors}`;
        
        // Update balance
        const balance = tokenSDT.getBalance('0xPUBLIC006');
        document.getElementById('balanceDisplay').textContent = balance;
        
        // Last block info
        if (this.chain.length > 0) {
            const last = this.chain[this.chain.length - 1];
            document.getElementById('currentBlock').textContent = last.index;
            document.getElementById('currentHash').textContent = last.hash.substring(0, 16) + '...';
            document.getElementById('currentIPFS').textContent = last.ipfsCID.substring(0, 12) + '...';
        }
        
        this.updateDashboard();
    }

    updateDashboard() {
        const container = document.getElementById('dashboardGrid');
        if (!container) return;
        
        const sektorData = {};
        ipfs.getAllData().forEach(d => {
            if (d.sektor) {
                if (!sektorData[d.sektor]) sektorData[d.sektor] = { count: 0, total: 0 };
                sektorData[d.sektor].count++;
                sektorData[d.sektor].total += d.nilai || 0;
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
                <div class="number">${sektorData[s.no]?.count || 0}</div>
                <small style="color: var(--text-dim);">${(sektorData[s.no]?.total || 0).toLocaleString()}</small>
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
            const isLast = i === displayBlocks.length - 1;
            
            // Glow
            const gradient = ctx.createRadialGradient(
                x + blockWidth / 2, y + blockHeight / 2, 5,
                x + blockWidth / 2, y + blockHeight / 2, blockWidth
            );
            gradient.addColorStop(0, isLast ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 212, 255, 0.06)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(x - 20, y - 20, blockWidth + 40, blockHeight + 40);
            
            // Box
            ctx.shadowColor = isLast ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 212, 255, 0.05)';
            ctx.shadowBlur = isLast ? 30 : 10;
            
            ctx.fillStyle = isGenesis ? 'rgba(0, 255, 136, 0.12)' : 
                           isLast ? 'rgba(0, 255, 136, 0.18)' : 
                           'rgba(0, 212, 255, 0.04)';
            ctx.strokeStyle = isLast ? '#00FF88' : 'rgba(0, 212, 255, 0.2)';
            ctx.lineWidth = isLast ? 2 : 1;
            
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
            ctx.fillStyle = isLast ? '#00FF88' : 'rgba(255,255,255,0.5)';
            ctx.font = isLast ? 'bold 14px monospace' : '11px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`#${block.index}`, x + blockWidth / 2, y + 16);
            
            // Hash
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.font = '7px monospace';
            ctx.fillText((block.hash || '0x...').substring(0, 6) + '...', x + blockWidth / 2, y + 34);
            
            // IPFS CID
            ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
            ctx.font = '6px monospace';
            ctx.fillText('IPFS: ' + (block.ipfsCID || 'Qm...').substring(0, 8) + '..', x + blockWidth / 2, y + 48);
            
            // Genesis
            if (isGenesis) {
                ctx.fillStyle = '#00FF88';
                ctx.font = '7px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('🔗 GENESIS', x + blockWidth / 2, y - 10);
            }
            
            // Last block glow
            if (isLast) {
                const pulse = Math.sin(Date.now() / 400) * 0.3 + 0.7;
                ctx.shadowColor = `rgba(0, 255, 136, ${pulse * 0.3})`;
                ctx.shadowBlur = 40;
                ctx.strokeStyle = `rgba(0, 255, 136, ${pulse * 0.4})`;
                ctx.lineWidth = 1;
                ctx.strokeRect(x - 4, y - 4, blockWidth + 8, blockHeight + 8);
                ctx.shadowBlur = 0;
            }
            
            // Multi-sig indicator
            if (block.signatures && block.signatures.length > 0) {
                ctx.fillStyle = 'rgba(245, 158, 11, 0.5)';
                ctx.font = '7px monospace';
                ctx.textAlign = 'right';
                ctx.fillText('✍️' + block.signatures.length, x + blockWidth - 4, y + blockHeight - 4);
            }
        }
        
        // Mining text
        if (this.isMining) {
            ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
            ctx.font = '12px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText('⛓️ HYBRID: On-Chain + IPFS', w / 2, h - 10);
        }
    }
}

// ===== INIT =====
const blockchain = new BlockchainSiDESKA();

function animateBlockchain() {
    blockchain.drawBlockchain();
    requestAnimationFrame(animateBlockchain);
}

setTimeout(() => animateBlockchain(), 100);

window.addEventListener('resize', () => blockchain.drawBlockchain());

console.log('⛓️ Si DESKA Blockchain Engine Started (Hybrid)');
console.log('📊 Genesis Block:', blockchain.chain[0].hash);
console.log('🪙 Token SDT Active');
console.log('🌐 IPFS Storage Active');
