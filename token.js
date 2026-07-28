// ============================================
// Si DESKA - Token Engine (SDT)
// Tokenisasi Data + Reward + Staking
// ============================================

class TokenSDT {
    constructor() {
        this.totalSupply = 10000; // Initial supply
        this.balances = {};
        this.rewards = {};
        this.stakes = {};
        this.transactions = [];
        this.contributors = {};
        this.totalContributors = 0;
        
        // Reward rates per level
        this.rewardRates = {
            rt: 10,
            rw: 10,
            desa: 20,
            kecamatan: 30
        };
        
        // Akses biaya per level
        this.accessCost = {
            rt: 5,
            desa: 15,
            kecamatan: 25,
            premium: 50
        };
        
        this.seedToken();
    }

    // ===== SEED TOKEN =====
    seedToken() {
        // Beri token awal ke beberapa wallet
        const wallets = [
            '0xRT001', '0xRW002', '0xDESA003', 
            '0xKEC004', '0xADMIN005', '0xPUBLIC006'
        ];
        wallets.forEach((wallet, i) => {
            this.balances[wallet] = 100 + (i * 50);
            this.contributors[wallet] = {
                address: wallet,
                totalContributions: i + 1,
                totalRewards: this.balances[wallet],
                joined: Date.now()
            };
        });
        this.totalContributors = wallets.length;
        
        console.log('💰 Token SDT seeded with', this.totalSupply, 'SDT');
    }

    // ===== MINT TOKEN (Reward) =====
    mintToken(address, level) {
        const rate = this.rewardRates[level] || 10;
        const amount = rate;
        
        if (!this.balances[address]) {
            this.balances[address] = 0;
        }
        
        this.balances[address] += amount;
        this.totalSupply += amount;
        
        // Record transaction
        this.transactions.push({
            type: 'mint',
            from: 'system',
            to: address,
            amount: amount,
            level: level,
            timestamp: Date.now()
        });
        
        // Update contributor
        if (!this.contributors[address]) {
            this.contributors[address] = {
                address: address,
                totalContributions: 0,
                totalRewards: 0,
                joined: Date.now()
            };
            this.totalContributors++;
        }
        this.contributors[address].totalContributions++;
        this.contributors[address].totalRewards += amount;
        
        return amount;
    }

    // ===== STAKE TOKEN =====
    stakeToken(address, amount) {
        if (!this.balances[address] || this.balances[address] < amount) {
            return { success: false, message: 'Saldo tidak cukup' };
        }
        if (amount < 100) {
            return { success: false, message: 'Minimal staking 100 SDT' };
        }
        
        this.balances[address] -= amount;
        if (!this.stakes[address]) {
            this.stakes[address] = { amount: 0, since: Date.now() };
        }
        this.stakes[address].amount += amount;
        
        this.transactions.push({
            type: 'stake',
            from: address,
            amount: amount,
            timestamp: Date.now()
        });
        
        return { success: true, message: `Staking ${amount} SDT berhasil` };
    }

    // ===== UNSTAKE TOKEN =====
    unstakeToken(address) {
        const stake = this.stakes[address];
        if (!stake || stake.amount === 0) {
            return { success: false, message: 'Tidak ada staking' };
        }
        
        const amount = stake.amount;
        const reward = Math.floor(amount * 0.05); // 5% APY (simulasi)
        
        this.balances[address] = (this.balances[address] || 0) + amount + reward;
        delete this.stakes[address];
        
        this.transactions.push({
            type: 'unstake',
            to: address,
            amount: amount,
            reward: reward,
            timestamp: Date.now()
        });
        
        return { success: true, message: `Unstaking ${amount} SDT + reward ${reward} SDT` };
    }

    // ===== ACCESS DATA (Bayar token) =====
    accessData(address, level) {
        const cost = this.accessCost[level] || 10;
        
        if (!this.balances[address] || this.balances[address] < cost) {
            return { success: false, message: 'Saldo tidak cukup untuk akses data' };
        }
        
        this.balances[address] -= cost;
        
        this.transactions.push({
            type: 'access',
            from: address,
            amount: cost,
            level: level,
            timestamp: Date.now()
        });
        
        return { 
            success: true, 
            message: `Akses data ${level} berhasil, biaya ${cost} SDT`,
            data: this.getDataByLevel(level)
        };
    }

    // ===== GET DATA BY LEVEL (Simulasi) =====
    getDataByLevel(level) {
        // Data dari IPFS
        const allData = ipfs.getAllData();
        return allData.filter(d => d.level === level);
    }

    // ===== GET BALANCE =====
    getBalance(address) {
        return this.balances[address] || 0;
    }

    // ===== GET STAKE =====
    getStake(address) {
        return this.stakes[address] || { amount: 0, since: 0 };
    }

    // ===== GET TRANSACTIONS =====
    getTransactions(address) {
        return this.transactions.filter(t => t.from === address || t.to === address);
    }

    // ===== GET ALL TRANSACTIONS =====
    getAllTransactions() {
        return this.transactions;
    }

    // ===== GET STATS =====
    getStats() {
        const totalStaked = Object.values(this.stakes).reduce((sum, s) => sum + s.amount, 0);
        const totalTransactions = this.transactions.length;
        
        return {
            totalSupply: this.totalSupply,
            totalStaked: totalStaked,
            totalContributors: this.totalContributors,
            totalTransactions: totalTransactions,
            circulatingSupply: this.totalSupply - totalStaked
        };
    }

    // ===== GET LEADERBOARD =====
    getLeaderboard(limit = 10) {
        const sorted = Object.entries(this.contributors)
            .sort((a, b) => b[1].totalRewards - a[1].totalRewards)
            .slice(0, limit);
        
        return sorted.map(([address, data]) => ({
            address: address,
            rewards: data.totalRewards,
            contributions: data.totalContributions
        }));
    }
}

// ===== INIT =====
const tokenSDT = new TokenSDT();

console.log('💰 Si DESKA Token Engine Ready');
console.log('📊 Total Supply:', tokenSDT.totalSupply, 'SDT');
console.log('👥 Total Contributors:', tokenSDT.totalContributors);
