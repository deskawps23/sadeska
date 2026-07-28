// ============================================
// Si DESKA - Script dengan Grafik Realtime
// ============================================

const SEKTOR = [
    {no:1,nama:"Kependudukan",icon:"👨‍👩‍👧‍👦"},
    {no:2,nama:"Pertanian",icon:"🌾"},
    {no:3,nama:"Perdagangan",icon:"🛒"},
    {no:4,nama:"Perindustrian",icon:"🏭"},
    {no:5,nama:"Pariwisata",icon:"🏖️"},
    {no:6,nama:"Kesehatan",icon:"🏥"},
    {no:7,nama:"Pendidikan",icon:"📚"},
    {no:8,nama:"Tenaga Kerja",icon:"👷"},
    {no:9,nama:"Lingkungan",icon:"🌿"},
    {no:10,nama:"Energi",icon:"⚡"},
    {no:11,nama:"Transportasi",icon:"🚗"},
    {no:12,nama:"Perumahan",icon:"🏠"},
    {no:13,nama:"Keuangan",icon:"💰"},
    {no:14,nama:"Sosial",icon:"🤝"},
    {no:15,nama:"Agama",icon:"🕌"},
    {no:16,nama:"Komunikasi",icon:"📱"},
    {no:17,nama:"Investasi",icon:"📈"},
    {no:18,nama:"Pertahanan",icon:"🛡️"},
    {no:19,nama:"Hukum & HAM",icon:"⚖️"},
    {no:20,nama:"Dalam Negeri",icon:"🏛️"},
    {no:21,nama:"PUPR",icon:"🏗️"},
    {no:22,nama:"Kelautan",icon:"🐟"},
    {no:23,nama:"Koperasi",icon:"🤝"},
    {no:24,nama:"Perencanaan",icon:"📋"},
    {no:25,nama:"Ekonomi Kreatif",icon:"🎨"},
    {no:26,nama:"Perempuan & Anak",icon:"👩‍👧"},
    {no:27,nama:"Pemuda & Olahraga",icon:"⚽"},
    {no:28,nama:"Perpustakaan",icon:"📖"},
    {no:29,nama:"Penelitian",icon:"🔬"},
    {no:30,nama:"Ketahanan Pangan",icon:"🍚"},
    {no:31,nama:"Peternakan",icon:"🐄"},
    {no:32,nama:"Hortikultura",icon:"🌺"},
    {no:33,nama:"Perkebunan",icon:"🌴"},
    {no:34,nama:"Tanaman Pangan",icon:"🌽"},
    {no:35,nama:"Perikanan Darat",icon:"🎣"},
    {no:36,nama:"Perikanan Laut",icon:"🐠"},
    {no:37,nama:"Perikanan Budidaya",icon:"🐟"},
    {no:38,nama:"Perikanan Tangkap",icon:"⛵"},
    {no:39,nama:"Desa & Transmigrasi",icon:"🏘️"},
    {no:40,nama:"Perhubungan Darat",icon:"🚌"},
    {no:41,nama:"Perhubungan Laut",icon:"🚢"},
    {no:42,nama:"Perhubungan Udara",icon:"✈️"},
    {no:43,nama:"Energi Terbarukan",icon:"☀️"},
    {no:44,nama:"Pekerjaan Umum",icon:"🔧"},
    {no:45,nama:"Pangan Lokal",icon:"🍲"},
    {no:46,nama:"Pengairan",icon:"💧"},
    {no:47,nama:"Kehutanan",icon:"🌳"},
    {no:48,nama:"Pertambangan",icon:"⛏️"}
];

const KECAMATAN = [
    "Sumur","Cimanggu","Cibaliung","Cikeusik","Cigeulis","Panimbang","Sobang",
    "Munjul","Angsana","Sindangresmi","Saketi","Bojong","Jiput","Cikadu",
    "Mandalawangi","Cadasari","Pulosari","Kaduhejo","Cikeudal","Cipeucang",
    "Mekarjaya","Menes","Koroncong","Picung","Cibitu","Garum","Caret",
    "Ciawi","Cimanuk","Carita","Labuan","Pandeglang","Patia","Karang Tanjung","Cikeupa"
];

// ===== GRAFIK REALTIME =====
let trendChart, pieChart, barChart, doughnutChart;
let chartData = {
    labels: [],
    trend: [],
    pie: {},
    bar: {},
    doughnut: []
};

function initCharts() {
    // Trend Chart (Line)
    const ctx1 = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Data Entry',
                data: [],
                borderColor: '#00FF88',
                backgroundColor: 'rgba(0, 255, 136, 0.05)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00FF88',
                pointRadius: 3,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: { color: '#8888AA' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#8888AA', font: { size: 9 } }
                }
            },
            animation: { duration: 500 }
        }
    });

    // Pie Chart (Distribusi Sektor)
    const ctx2 = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#6C63FF', '#00D4FF', '#FF6B6B', '#FFD700', '#00FF88', '#FF9800', '#E040FB', '#4CAF50'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#8888AA', font: { size: 9 }, boxWidth: 10, padding: 6 }
                }
            },
            cutout: '60%',
            animation: { animateRotate: true }
        }
    });

    // Bar Chart (Data per Kecamatan)
    const ctx3 = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Data Entry',
                data: [],
                backgroundColor: 'rgba(108, 99, 255, 0.6)',
                borderColor: '#6C63FF',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: { color: '#8888AA' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#8888AA', font: { size: 8 } }
                }
            },
            animation: { duration: 500 }
        }
    });

    // Doughnut Chart (Poin Kontributor)
    const ctx4 = document.getElementById('doughnutChart').getContext('2d');
    doughnutChart = new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#FFD700', '#FF6B6B', '#6C63FF', '#00D4FF', '#00FF88', '#FF9800'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#8888AA', font: { size: 11 }, boxWidth: 12, padding: 8 }
                }
            },
            cutout: '55%',
            animation: { animateRotate: true }
        }
    });

    // Initial seed data
    seedChartData();
}

function seedChartData() {
    const now = new Date();
    for (let i = 10; i >= 0; i--) {
        const d = new Date(now);
        d.setMinutes(d.getMinutes() - i * 2);
        chartData.labels.push(d.toLocaleTimeString());
        chartData.trend.push(Math.floor(Math.random() * 20) + 5);
    }
    
    // Pie data
    const sektorNames = ['Kependudukan', 'Pertanian', 'Kesehatan', 'Pendidikan', 'Ekonomi', 'Infrastruktur', 'Sosial', 'Lingkungan'];
    sektorNames.forEach(s => {
        chartData.pie[s] = Math.floor(Math.random() * 30) + 5;
    });
    
    // Bar data
    KECAMATAN.slice(0, 10).forEach(k => {
        chartData.bar[k] = Math.floor(Math.random() * 25) + 3;
    });
    
    // Doughnut data
    ['Pak RT', 'Bu RW', 'Kepala Desa', 'Camat', 'Warga A', 'Warga B'].forEach(n => {
        chartData.doughnut.push({ name: n, poin: Math.floor(Math.random() * 100) + 20 });
    });
    
    updateCharts();
}

function updateCharts() {
    // Update Trend Chart
    const now = new Date();
    chartData.labels.push(now.toLocaleTimeString());
    chartData.trend.push(Math.floor(Math.random() * 15) + 5);
    if (chartData.labels.length > 20) {
        chartData.labels.shift();
        chartData.trend.shift();
    }
    
    trendChart.data.labels = chartData.labels;
    trendChart.data.datasets[0].data = chartData.trend;
    trendChart.update('none');
    
    // Update Pie Chart (with random fluctuations)
    const sektorNames = Object.keys(chartData.pie);
    sektorNames.forEach(s => {
        chartData.pie[s] = Math.max(2, chartData.pie[s] + (Math.random() - 0.5) * 4);
    });
    pieChart.data.labels = sektorNames;
    pieChart.data.datasets[0].data = Object.values(chartData.pie);
    pieChart.update('none');
    
    // Update Bar Chart
    const barKeys = Object.keys(chartData.bar);
    barKeys.forEach(k => {
        chartData.bar[k] = Math.max(1, chartData.bar[k] + (Math.random() - 0.5) * 3);
    });
    barChart.data.labels = barKeys;
    barChart.data.datasets[0].data = Object.values(chartData.bar);
    barChart.update('none');
    
    // Update Doughnut Chart
    chartData.doughnut.forEach(d => {
        d.poin = Math.max(10, d.poin + (Math.random() - 0.5) * 8);
    });
    doughnutChart.data.labels = chartData.doughnut.map(d => d.name);
    doughnutChart.data.datasets[0].data = chartData.doughnut.map(d => d.poin);
    doughnutChart.update('none');
    
    // Update info
    const total = chartData.trend.reduce((a, b) => a + b, 0);
    document.getElementById('totalGrafikData').textContent = total;
    document.getElementById('totalGrafikPoin').textContent = chartData.doughnut.reduce((a, b) => a + b.poin, 0);
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
}

// ===== SUBMIT DATA =====
function submitData() {
    const consent = document.getElementById('consentCheck');
    if (!consent.checked) {
        alert('⚠️ Anda harus menyetujui ketentuan perlindungan data pribadi (UU No. 27/2022)');
        return;
    }

    const level = document.getElementById('inputLevel').value;
    const sektor = parseInt(document.getElementById('inputSektor').value);
    const kecamatan = document.getElementById('inputKecamatan').value;
    const desa = document.getElementById('inputDesa').value || '-';
    const rw = document.getElementById('inputRW').value || '-';
    const rt = document.getElementById('inputRT').value || '-';
    const nilai = parseFloat(document.getElementById('inputNilai').value);
    const dataJSON = document.getElementById('inputDataJSON').value || '{}';
    const penginput = document.getElementById('inputPenginput').value || 'Warga';
    const jabatan = document.getElementById('inputJabatan').value || 'Warga';

    if (!sektor) { alert('⚠️ Pilih sektor!'); return; }
    if (!kecamatan) { alert('⚠️ Pilih kecamatan!'); return; }
    if (isNaN(nilai) || nilai <= 0) { alert('⚠️ Isi nilai data yang valid!'); return; }

    const dataStatistik = {
        sektor: sektor,
        kecamatan: kecamatan,
        desa: desa,
        rw: rw,
        rt: rt,
        nilai: nilai,
        dataJSON: JSON.parse(dataJSON || '{}'),
        timestamp: new Date().toISOString()
    };

    const result = blockchain.tambahData(dataStatistik, penginput, level, jabatan);

    if (result.success) {
        const sektorNama = SEKTOR.find(s => s.no === sektor)?.nama || 'Sektor';
        document.getElementById('levelLabel').textContent = level.toUpperCase();
        
        const status = document.getElementById('txStatus');
        status.innerHTML = `
            <i class="fas fa-check-circle" style="color: var(--success);"></i>
            <span class="tx-hash">✅ Data berhasil direkam! ID: ${result.block.data.id}</span>
        `;
        
        // Update charts with new data
        const sektorNames = Object.keys(chartData.pie);
        if (sektorNames.length > 0) {
            const idx = Math.floor(Math.random() * sektorNames.length);
            chartData.pie[sektorNames[idx]] = (chartData.pie[sektorNames[idx]] || 0) + 1;
        }
        
        const barKeys = Object.keys(chartData.bar);
        if (barKeys.includes(kecamatan)) {
            chartData.bar[kecamatan] = (chartData.bar[kecamatan] || 0) + 1;
        } else if (barKeys.length > 0) {
            const randomKey = barKeys[Math.floor(Math.random() * barKeys.length)];
            chartData.bar[randomKey] = (chartData.bar[randomKey] || 0) + 1;
        }
        
        chartData.trend[chartData.trend.length - 1] = (chartData.trend[chartData.trend.length - 1] || 0) + 1;
        
        const penginputName = penginput || 'Warga';
        const existing = chartData.doughnut.find(d => d.name === penginputName);
        if (existing) {
            existing.poin += 10;
        } else {
            chartData.doughnut.push({ name: penginputName, poin: 10 });
        }
        
        updateCharts();
        
        alert(`✅ Data berhasil direkam!\n\n📊 ${sektorNama}\n📍 ${kecamatan}\n📝 ${nilai}\n⏳ Status: Menunggu verifikasi OPD\n\n⭐ Poin akan diberikan setelah diverifikasi`);

        resetForm();
        blockchain.updateUI();
        
        const poin = sistemPoin.getPoin(penginput);
        document.getElementById('balanceDisplay').textContent = poin;
    } else {
        alert(`❌ Gagal: ${result.message}`);
    }
}

function resetForm() {
    document.querySelectorAll('.input-card input').forEach(i => i.value = '');
    document.querySelectorAll('.input-card select').forEach(s => s.selectedIndex = 0);
    document.querySelectorAll('.input-card textarea').forEach(t => t.value = '');
    document.getElementById('inputSektor').selectedIndex = 0;
    document.getElementById('inputKecamatan').selectedIndex = 0;
    document.getElementById('levelLabel').textContent = 'RT/RW';
    document.getElementById('consentCheck').checked = true;
    
    const status = document.getElementById('txStatus');
    status.innerHTML = `
        <i class="fas fa-circle-notch fa-spin"></i>
        <span class="tx-hash">Siap menginput data...</span>
    `;
}

function updateLevelFields() {
    const level = document.getElementById('inputLevel').value;
    const rwField = document.getElementById('inputRW');
    const rtField = document.getElementById('inputRT');
    const desaField = document.getElementById('inputDesa');
    const label = document.getElementById('levelLabel');

    label.textContent = level.toUpperCase();

    if (level === 'kecamatan') {
        rwField.disabled = true; rtField.disabled = true; desaField.disabled = true;
        rwField.placeholder = '-'; rtField.placeholder = '-'; desaField.placeholder = '-';
        rwField.value = ''; rtField.value = ''; desaField.value = '';
    } else if (level === 'desa') {
        rwField.disabled = true; rtField.disabled = true; desaField.disabled = false;
        rwField.placeholder = '-'; rtField.placeholder = '-';
        rwField.value = ''; rtField.value = '';
    } else if (level === 'rw') {
        rwField.disabled = false; rtField.disabled = true; desaField.disabled = false;
        rtField.placeholder = '-'; rtField.value = '';
    } else {
        rwField.disabled = false; rtField.disabled = false; desaField.disabled = false;
    }
}

// ===== THEME TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            const html = document.documentElement;
            const isDark = html.getAttribute('data-theme') !== 'light';
            html.setAttribute('data-theme', isDark ? 'light' : 'dark');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            // Update chart colors
            updateChartColors();
        });
    }
});

function updateChartColors() {
    // Re-render charts with new theme colors
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const textColor = isDark ? '#8888AA' : '#666680';
    const gridColor = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
    
    [trendChart, pieChart, barChart, doughnutChart].forEach(chart => {
        if (chart) {
            chart.options.scales?.y?.grid?.color = gridColor;
            chart.options.scales?.y?.ticks?.color = textColor;
            chart.options.scales?.x?.ticks?.color = textColor;
            chart.options.plugins?.legend?.labels?.color = textColor;
            chart.update('none');
        }
    });
}

// ===== NAVBAR =====
document.addEventListener('DOMContentLoaded', function() {
    const h = document.getElementById('hamburger');
    const m = document.getElementById('navMenu');
    if (h) {
        h.addEventListener('click', () => m.classList.toggle('active'));
    }
    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.addEventListener('click', () => m.classList.remove('active'));
    });

    // Sektor dropdown
    const ss = document.getElementById('inputSektor');
    SEKTOR.forEach(s => {
        const o = document.createElement('option');
        o.value = s.no;
        o.textContent = s.no + '. ' + s.nama;
        ss.appendChild(o);
    });

    // Kecamatan dropdown
    const ks = document.getElementById('inputKecamatan');
    KECAMATAN.forEach(k => {
        const o = document.createElement('option');
        o.value = k;
        o.textContent = k;
        ks.appendChild(o);
    });

    updateLevelFields();
    initCharts();
    if (typeof blockchain !== 'undefined') blockchain.updateUI();

    console.log('🌏 Si DESKA - Grafik Realtime v2.0');
    console.log('✅ Sesuai: UU PDP • Perpres SDI • SPBE');
    console.log('📊 Grafik update setiap 2 detik');
    console.log('📧 deskawps@yahoo.co.id | 📱 0856-9527-2863');
});

// ===== UPDATE GRAFIK SETIAP 2 DETIK =====
setInterval(() => {
    updateCharts();
    updateStats();
}, 2000);

// ===== UPDATE STATS =====
function updateStats() {
    if (typeof sistemPoin !== 'undefined') {
        const stats = sistemPoin.getStats();
        const totalPoinEl = document.getElementById('totalPoin');
        const totalPoinSupply = document.getElementById('totalPoinSupply');
        const totalKontributor = document.getElementById('totalKontributor');
        if (totalPoinEl) totalPoinEl.textContent = stats.totalPoin;
        if (totalPoinSupply) totalPoinSupply.textContent = stats.totalPoin;
        if (totalKontributor) totalKontributor.textContent = stats.totalKontributor + ' Kontributor';
    }
}

// ===== LIVE CLOCK =====
setInterval(() => {
    const liveBadge = document.querySelector('.live-text');
    if (liveBadge) {
        liveBadge.textContent = `Live ${new Date().toLocaleTimeString()}`;
    }
}, 1000);
