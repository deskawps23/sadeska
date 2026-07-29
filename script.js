// ============================================
// Si DESKA - Script Big Data Platform
// Instagram/TikTok Style
// ============================================

// ===== DATA =====
const KECAMATAN = [
    "Sumur","Cimanggu","Cibaliung","Cikeusik","Cigeulis","Panimbang","Sobang",
    "Munjul","Angsana","Sindangresmi","Saketi","Bojong","Jiput","Cikadu",
    "Mandalawangi","Cadasari","Pulosari","Kaduhejo","Cikeudal","Cipeucang",
    "Mekarjaya","Menes","Koroncong","Picung","Cibitu","Garum","Caret",
    "Ciawi","Cimanuk","Carita","Labuan","Pandeglang","Patia","Karang Tanjung","Cikeupa"
];

const dataStatistik = {
    "Sumur": {populasi:45231, putus_sekolah:3.2, kematian_ibu:2, stunting:18.5, kemiskinan:8.2},
    "Cimanggu": {populasi:62341, putus_sekolah:4.1, kematian_ibu:3, stunting:21.3, kemiskinan:9.7},
    "Cibaliung": {populasi:38290, putus_sekolah:2.8, kematian_ibu:1, stunting:16.2, kemiskinan:7.1},
    "Cikeusik": {populasi:57213, putus_sekolah:3.5, kematian_ibu:2, stunting:19.8, kemiskinan:8.9},
    "Cigeulis": {populasi:34215, putus_sekolah:2.2, kematian_ibu:1, stunting:14.5, kemiskinan:6.3},
    "Panimbang": {populasi:48234, putus_sekolah:3.0, kematian_ibu:2, stunting:17.2, kemiskinan:7.8},
    "Sobang": {populasi:39387, putus_sekolah:2.5, kematian_ibu:1, stunting:15.1, kemiskinan:6.7},
    "Munjul": {populasi:32145, putus_sekolah:2.0, kematian_ibu:0, stunting:13.2, kemiskinan:5.5},
    "Angsana": {populasi:28234, putus_sekolah:1.8, kematian_ibu:0, stunting:12.1, kemiskinan:4.9},
    "Sindangresmi": {populasi:31234, putus_sekolah:2.3, kematian_ibu:1, stunting:14.8, kemiskinan:6.1},
    "Saketi": {populasi:45234, putus_sekolah:3.8, kematian_ibu:2, stunting:20.1, kemiskinan:9.2},
    "Bojong": {populasi:56234, putus_sekolah:4.5, kematian_ibu:3, stunting:22.5, kemiskinan:10.3},
    "Jiput": {populasi:33234, putus_sekolah:2.6, kematian_ibu:1, stunting:15.8, kemiskinan:6.9},
    "Cikadu": {populasi:28234, putus_sekolah:1.9, kematian_ibu:0, stunting:12.5, kemiskinan:5.0},
    "Mandalawangi": {populasi:48234, putus_sekolah:3.1, kematian_ibu:2, stunting:17.5, kemiskinan:7.6},
    "Cadasari": {populasi:52234, putus_sekolah:3.7, kematian_ibu:2, stunting:19.5, kemiskinan:8.8},
    "Pulosari": {populasi:27234, putus_sekolah:1.7, kematian_ibu:0, stunting:11.8, kemiskinan:4.5},
    "Kaduhejo": {populasi:36234, putus_sekolah:2.9, kematian_ibu:1, stunting:16.8, kemiskinan:7.2},
    "Cikeudal": {populasi:42234, putus_sekolah:3.3, kematian_ibu:2, stunting:18.2, kemiskinan:8.1},
    "Cipeucang": {populasi:31234, putus_sekolah:2.4, kematian_ibu:1, stunting:14.9, kemiskinan:6.2},
    "Mekarjaya": {populasi:28234, putus_sekolah:2.1, kematian_ibu:1, stunting:13.5, kemiskinan:5.8},
    "Menes": {populasi:54234, putus_sekolah:4.2, kematian_ibu:3, stunting:21.8, kemiskinan:9.9},
    "Koroncong": {populasi:25234, putus_sekolah:1.6, kematian_ibu:0, stunting:11.2, kemiskinan:4.2},
    "Picung": {populasi:38234, putus_sekolah:2.7, kematian_ibu:1, stunting:16.0, kemiskinan:7.0},
    "Cibitu": {populasi:22234, putus_sekolah:1.5, kematian_ibu:0, stunting:10.5, kemiskinan:4.0},
    "Garum": {populasi:49234, putus_sekolah:3.4, kematian_ibu:2, stunting:18.8, kemiskinan:8.4},
    "Caret": {populasi:32234, putus_sekolah:2.5, kematian_ibu:1, stunting:15.2, kemiskinan:6.5},
    "Ciawi": {populasi:45234, putus_sekolah:3.2, kematian_ibu:2, stunting:17.8, kemiskinan:7.9},
    "Cimanuk": {populasi:35234, putus_sekolah:2.8, kematian_ibu:1, stunting:16.5, kemiskinan:7.3},
    "Carita": {populasi:39234, putus_sekolah:3.0, kematian_ibu:2, stunting:17.0, kemiskinan:7.5},
    "Labuan": {populasi:62234, putus_sekolah:4.0, kematian_ibu:3, stunting:20.5, kemiskinan:9.5},
    "Pandeglang": {populasi:78234, putus_sekolah:4.8, kematian_ibu:4, stunting:23.5, kemiskinan:11.2},
    "Patia": {populasi:31234, putus_sekolah:2.3, kematian_ibu:1, stunting:14.5, kemiskinan:6.0},
    "Karang Tanjung": {populasi:28234, putus_sekolah:2.0, kematian_ibu:0, stunting:13.0, kemiskinan:5.2},
    "Cikeupa": {populasi:35234, putus_sekolah:2.6, kematian_ibu:1, stunting:15.5, kemiskinan:6.8}
};

const SEKTOR = [
    {no:1,nama:"Kependudukan",icon:"👨‍👩‍👧‍👦"},
    {no:2,nama:"Pertanian",icon:"🌾"},
    {no:3,nama:"Perdagangan",icon:"🛒"},
    {no:4,nama:"Perindustrian",icon:"🏭"},
    {no:5,nama:"Pariwisata",icon:"🏖️"},
    {no:6,nama:"Kesehatan",icon:"🏥"},
    {no:7,nama:"Pendidikan",icon:"📚"},
    {no:8,nama:"Tenaga Kerja",icon:"👷"}
];

// ===== SPLASH SCREEN =====
setTimeout(() => {
    document.getElementById('splashScreen').classList.add('hidden');
}, 2500);

// ===== BOTTOM NAV =====
document.querySelectorAll('.bottom-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.bottom-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const tab = this.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.getElementById('tab-' + tab).classList.add('active');
    });
});

// ===== NAVBAR =====
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    // Sidebar atau menu bisa ditambahkan di sini
});

// ===== THEME TOGGLE =====
let isDark = true;
document.getElementById('themeToggle').addEventListener('click', function() {
    isDark = !isDark;
    document.documentElement.style.setProperty('--dark', isDark ? '#0A0A1A' : '#F5F5FA');
    document.documentElement.style.setProperty('--dark-card', isDark ? 'rgba(10,10,30,0.8)' : 'rgba(255,255,255,0.8)');
    document.documentElement.style.setProperty('--text', isDark ? '#E8E8F0' : '#1A1A2E');
    document.documentElement.style.setProperty('--text-dim', isDark ? '#8888AA' : '#666680');
    document.documentElement.style.setProperty('--glass-border', isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)');
    document.documentElement.style.setProperty('--glass-bg', isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)');
    this.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// ===== FEED GENERATOR =====
function generateFeed() {
    const container = document.getElementById('feedContainer');
    const feedItems = [];

    KECAMATAN.forEach((kec, idx) => {
        const data = dataStatistik[kec] || {};
        const sektor = SEKTOR[idx % SEKTOR.length];
        const value = data.putus_sekolah || data.kematian_ibu || data.stunting || 0;
        const label = data.putus_sekolah ? 'Putus Sekolah' :
                     data.kematian_ibu ? 'Kematian Ibu' :
                     data.stunting ? 'Stunting' : 'Populasi';
        const unit = data.putus_sekolah ? '%' :
                    data.kematian_ibu ? 'per 100.000' :
                    data.stunting ? '%' : 'jiwa';
        const time = new Date(Date.now() - Math.random() * 3600000);
        const timeStr = time.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
        
        feedItems.push(`
            <div class="feed-item" style="animation-delay: ${idx * 0.05}s">
                <div class="feed-header">
                    <div class="feed-user">
                        <div class="feed-avatar">${sektor.icon}</div>
                        <div>
                            <div class="feed-name">${kec}</div>
                            <div class="feed-time">${timeStr} • ${sektor.nama}</div>
                        </div>
                    </div>
                    <span style="font-size:12px;color:var(--text-dim);">📍 ${Math.floor(Math.random() * 20) + 1} RT</span>
                </div>
                <div class="feed-content">
                    <div>
                        <span class="value">${value}</span>
                        <span style="font-size:14px;color:var(--text-dim);"> ${unit}</span>
                    </div>
                    <div class="label">${label} • Populasi: ${(data.populasi || 0).toLocaleString()} jiwa</div>
                </div>
                <div class="feed-actions">
                    <button onclick="likeFeed(this)"><i class="fas fa-heart"></i> <span class="like-count">${Math.floor(Math.random() * 100) + 10}</span></button>
                    <button><i class="fas fa-comment"></i> ${Math.floor(Math.random() * 20)}</button>
                    <button onclick="shareFeed('${kec}')"><i class="fas fa-share"></i> Bagikan</button>
                    <button><i class="fas fa-bookmark"></i></button>
                </div>
            </div>
        `);
    });

    container.innerHTML = feedItems.join('');
    document.getElementById('feedLoading').style.display = 'none';
}

function likeFeed(btn) {
    const count = btn.querySelector('.like-count');
    const current = parseInt(count.textContent);
    count.textContent = current + 1;
    btn.querySelector('i').style.color = '#FF4444';
    btn.querySelector('i').style.transform = 'scale(1.3)';
    setTimeout(() => {
        btn.querySelector('i').style.transform = 'scale(1)';
    }, 300);
    showNotification('❤️ Anda menyukai data ini!');
}

function shareFeed(kec) {
    showNotification(`📤 Data ${kec} dibagikan!`);
}

// ===== NOTIFICATION =====
function showNotification(text) {
    const notif = document.getElementById('notification');
    document.getElementById('notifText').textContent = text;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 2500);
}

// ===== AUTO REFRESH =====
setInterval(() => {
    // Refresh feed dengan data baru
    const container = document.getElementById('feedContainer');
    const firstItem = container.querySelector('.feed-item');
    if (firstItem) {
        const clone = firstItem.cloneNode(true);
        container.prepend(clone);
        clone.style.animation = 'feedAppear 0.5s ease';
        if (container.children.length > 20) {
            container.removeChild(container.lastChild);
        }
    }
    showNotification('📊 Data baru masuk!');
}, 10000);

// ===== MAP =====
let map = null;
let geoLayer = null;

function initMap() {
    map = L.map('petaMap').setView([-6.367, 105.95], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    renderChoropleth();
}

function renderChoropleth() {
    if (geoLayer) map.removeLayer(geoLayer);
    
    const indicator = document.getElementById('indicatorSelect').value;
    const values = KECAMATAN.map(k => dataStatistik[k]?.[indicator] || 0);
    const maxVal = Math.max(...values) || 1;

    function getColor(v) {
        if (v === 0) return '#e5e7eb';
        const i = v / maxVal;
        if (i < 0.2) return '#fef0d9';
        if (i < 0.4) return '#fdd49e';
        if (i < 0.6) return '#fdbb84';
        if (i < 0.8) return '#fc8d59';
        return '#d7301f';
    }

    const features = KECAMATAN.map((nama, idx) => {
        const lat = -6.367 + (idx * 0.014);
        const lng = 105.95 + (idx * 0.008);
        return {
            type: "Feature",
            properties: { nama: nama },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [lng - 0.018, lat - 0.018],
                    [lng + 0.018, lat - 0.018],
                    [lng + 0.018, lat + 0.018],
                    [lng - 0.018, lat + 0.018],
                    [lng - 0.018, lat - 0.018]
                ]]
            }
        };
    });

    const geojson = { type: "FeatureCollection", features: features };
    
    geoLayer = L.geoJSON(geojson, {
        style: function(f) {
            const v = dataStatistik[f.properties.nama]?.[indicator] || 0;
            return {
                fillColor: getColor(v),
                weight: 1.5,
                color: '#fff',
                fillOpacity: 0.8
            };
        },
        onEachFeature: function(f, layer) {
            const nama = f.properties.nama;
            const d = dataStatistik[nama] || {};
            const v = d[indicator] || 0;
            const labels = {
                putus_sekolah: 'Angka Putus Sekolah',
                kematian_ibu: 'Kematian Ibu',
                stunting: 'Stunting',
                kemiskinan: 'Kemiskinan',
                populasi: 'Populasi'
            };
            const units = {
                putus_sekolah: '%',
                kematian_ibu: 'per 100.000',
                stunting: '%',
                kemiskinan: '%',
                populasi: 'jiwa'
            };
            layer.bindPopup(`
                <div style="padding:8px;min-width:180px;">
                    <h4 style="margin:0 0 6px 0;font-size:15px;font-weight:700;">${nama}</h4>
                    <div style="display:flex;justify-content:space-between;font-size:13px;">
                        <span style="color:#6B7280;">${labels[indicator]||indicator}</span>
                        <span style="font-weight:700;color:#4F46E5;">${v} ${units[indicator]||''}</span>
                    </div>
                    <div style="font-size:12px;color:#6B7280;margin-top:4px;">
                        Populasi: ${(d.populasi||0).toLocaleString()} jiwa
                    </div>
                </div>
            `);
            layer.on('click', function() { map.fitBounds(layer.getBounds()); });
        }
    }).addTo(map);

    document.getElementById('mapInfoText').textContent = 
        `📊 ${labels[indicator] || indicator} • Tahun 2026 • Klik kecamatan untuk detail`;
}

document.getElementById('indicatorSelect').addEventListener('change', renderChoropleth);

// ===== LEADERBOARD =====
function generateLeaderboard() {
    const container = document.getElementById('leaderboardList');
    const ranks = ['🥇', '🥈', '🥉', '4', '5', '6', '7', '8', '9', '10'];
    const names = ['Pak RT', 'Bu RW', 'Kepala Desa', 'Camat', 'Warga A', 'Warga B', 'Relawan 1', 'Relawan 2', 'Mahasiswa', 'Peneliti'];
    const points = [320, 280, 240, 200, 180, 150, 120, 100, 80, 60];

    container.innerHTML = names.map((name, i) => `
        <div class="leaderboard-item">
            <span class="rank ${i < 3 ? ['gold','silver','bronze'][i] : ''}">${ranks[i]}</span>
            <div class="avatar">${['🏆','🌟','⭐','👤','👤','👤','👤','👤','👤','👤'][i]}</div>
            <div class="info">
                <div class="name">${name}</div>
                <div class="sub">${i < 3 ? 'Kontributor Terbaik' : 'Kontributor'} • ${Math.floor(Math.random() * 50) + 10} data</div>
            </div>
            <div class="points">${points[i]} Poin</div>
        </div>
    `).join('');
}

// ===== CHARTS =====
let trendChart, pieChart, barChart;

function initCharts() {
    const ctx1 = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
            datasets: [{
                label: 'Data Entry',
                data: [12,19,3,5,2,3,15,8,12,9,14,20],
                borderColor: '#6C63FF',
                backgroundColor: 'rgba(108,99,255,0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#8888AA' } },
                x: { grid: { display: false }, ticks: { color: '#8888AA', font: { size: 8 } } }
            }
        }
    });

    const ctx2 = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Kependudukan','Pertanian','Kesehatan','Pendidikan','Ekonomi'],
            datasets: [{
                data: [30,20,25,15,10],
                backgroundColor: ['#6C63FF','#00D4FF','#FF6B6B','#FFD700','#00FF88'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { color: '#8888AA', font: { size: 8 }, boxWidth: 8, padding: 4 } } },
            cutout: '60%'
        }
    });

    const ctx3 = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Menes','Pandeglang','Cimanggu','Labuan','Bojong'],
            datasets: [{
                label: 'Data Entry',
                data: [42,38,35,30,28],
                backgroundColor: 'rgba(108,99,255,0.6)',
                borderColor: '#6C63FF',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#8888AA' } },
                x: { grid: { display: false }, ticks: { color: '#8888AA', font: { size: 9 } } }
            }
        }
    });

    // Auto update charts
    setInterval(() => {
        const data = trendChart.data.datasets[0].data;
        data.push(Math.floor(Math.random() * 15) + 5);
        data.shift();
        trendChart.update('none');

        const pieData = pieChart.data.datasets[0].data;
        pieData.forEach((d, i) => {
            pieData[i] = Math.max(5, d + (Math.random() - 0.5) * 8);
        });
        pieChart.update('none');

        const barData = barChart.data.datasets[0].data;
        barData.forEach((d, i) => {
            barData[i] = Math.max(10, d + (Math.random() - 0.5) * 6);
        });
        barChart.update('none');
    }, 5000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    generateFeed();
    generateLeaderboard();
    initMap();
    initCharts();

    console.log('🌏 Si DESKA - Big Data Platform');
    console.log('📊 Dari RT/RW untuk Dunia');
    console.log('📧 deskawps@yahoo.co.id | 📱 0856-9527-2863');
});
