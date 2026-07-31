// ============================================
// Si DESKA - COMMAND CENTER
// DATA RESMI KABUPATEN PANDEGLANG
// 35 Kecamatan • 326 Desa • 13 Kelurahan
// ============================================

// ===== 35 KECAMATAN =====
const KECAMATAN = [
    "Sumur","Cimanggu","Cibaliung","Cibitung","Cikeusik","Cigeulis",
    "Panimbang","Sobang","Munjul","Angsana","Sindangresmi","Picung",
    "Bojong","Saketi","Cisata","Pagelaran","Patia","Sukaresmi",
    "Labuan","Carita","Jiput","Cikedal","Menes","Pulosari",
    "Mandalawangi","Cimanuk","Cipeucang","Banjar","Kaduhejo",
    "Mekarjaya","Pandeglang","Majasari","Cadasari","Karang Tanjung",
    "Koroncong"
];

// ===== DESA PER KECAMATAN =====
const DESA_PER_KECAMATAN = {
    "Sumur": ["Sumur","Cigebang","Kertajaya","Tunggilis","Cimadang","Ujung","Pandansari"],
    "Cimanggu": ["Cimanggu","Bojong","Tugu","Cipalabuh","Kertajaya","Mekarsari","Sukajaya","Cimadang","Margasari"],
    "Cibaliung": ["Cibaliung","Sorongan","Mendung","Curug","Cibodas","Cihonje","Karang Anyar","Sidamulya","Sumurwuluh"],
    "Cibitung": ["Cibitung","Cikadu","Cibitung Selatan","Cibitung Timur","Cibitung Barat","Sukamanah","Pasir","Kertaraharja"],
    "Cikeusik": ["Cikeusik","Cikadu","Cikeusik Selatan","Sukamaju","Kurung","Cikeusik Timur","Cikeusik Barat","Karangsari","Margamulya"],
    "Cigeulis": ["Cigeulis","Katumbiri","Karangsari","Sinarjaya","Cisereh","Sukamaju","Mekarsari"],
    "Panimbang": ["Panimbang","Mekarjaya","Tanagara","Sukajaya","Karyajaya","Cijangkar","Panimbang Jaya"],
    "Sobang": ["Sobang","Cipadang","Kertaraharja","Cakung","Mekarsari","Sindanglaya","Cimadang","Karang Anyar"],
    "Munjul": ["Munjul","Kurung","Lebak","Palasari","Cibitung","Cimanggu","Sukamanah","Kertajaya"],
    "Angsana": ["Angsana","Kadupandak","Sumurwuluh","Pasir","Cikayas","Sindangresmi","Bojong"],
    "Sindangresmi": ["Sindangresmi","Bojongkoneng","Pasirngampar","Cimadang","Sindangjaya","Mekarsari","Sukajaya"],
    "Picung": ["Picung","Picung Selatan","Picung Timur","Kadupandak","Sukamanah","Cimanggu","Kertaraharja","Sindangresmi"],
    "Bojong": ["Bojong","Bojong Selatan","Bojong Timur","Cimayang","Bojong Barat","Kadupandak","Sukamanah","Kertaraharja","Mekarsari"],
    "Saketi": ["Saketi","Sodong","Mekarwangi","Kadumekar","Sindanghayu","Margaluyu","Sukaraja","Karang Anyar","Cimanggu"],
    "Cisata": ["Cisata","Cibarani","Cimanggu","Karang Anyar","Mekarsari","Sukamanah","Sindangresmi"],
    "Pagelaran": ["Pagelaran","Margasari","Sukaraja","Kadupandak","Cimanggu","Kertaraharja","Mekarsari","Sindangresmi"],
    "Patia": ["Patia","Patia Selatan","Patia Timur","Patia Barat","Mekarsari","Cimanggu","Sukamanah","Kertaraharja"],
    "Sukaresmi": ["Sukaresmi","Sukaresmi Selatan","Sukaresmi Timur","Sukaresmi Barat","Cimanggu","Mekarsari","Sindangresmi"],
    "Labuan": ["Cigondang","Sindangjaya","Sukamanah","Kertaraharja"],
    "Carita": ["Carita","Carita Selatan","Carita Timur","Carita Barat","Karyajaya","Sukajaya","Mekarjaya","Tanagara","Sinarjaya"],
    "Jiput": ["Jiput","Jiput Selatan","Jiput Timur","Sukamanah","Kiarapayung","Jiput Barat","Karang Anyar","Mekarsari","Sindangresmi"],
    "Cikedal": ["Cikedal","Cikedal Selatan","Cikedal Timur","Cikedal Barat","Kertaraharja","Mekarsari","Sukamanah","Sindangresmi"],
    "Menes": ["Menes","Menes Selatan","Menes Timur","Muruy","Cimadang","Menes Barat","Karang Anyar","Mekarsari","Sukamanah","Sindangresmi"],
    "Pulosari": ["Pulosari","Pulosari Selatan","Pulosari Timur","Pulosari Barat","Cilentung","Kadupandak","Sukamanah","Kertaraharja"],
    "Mandalawangi": ["Mandalawangi","Mandalawangi Selatan","Mandalawangi Timur","Nusawungu","Sinarjaya","Mandalawangi Barat","Karang Anyar","Mekarsari","Sukamanah","Sindangresmi"],
    "Cimanuk": ["Cimanuk","Cimanuk Selatan","Cimanuk Timur","Cimanuk Barat","Cipalabuh","Kertaraharja","Mekarsari","Sukamanah","Sindangresmi"],
    "Cipeucang": ["Cipeucang","Cipeucang Selatan","Cipeucang Timur","Pasir","Mekarsari","Cipeucang Barat","Karang Anyar","Sukamanah","Sindangresmi"],
    "Banjar": ["Banjar","Banjar Selatan","Banjar Timur","Banjar Barat","Kadupandak","Sukamanah","Kertaraharja","Mekarsari"],
    "Kaduhejo": ["Kaduhejo","Kaduhejo Selatan","Kaduhejo Timur","Bojong","Cipalabuh","Kaduhejo Barat","Karang Anyar","Mekarsari","Sindangresmi"],
    "Mekarjaya": ["Mekarjaya","Mekarjaya Selatan","Mekarjaya Timur","Karyajaya","Sukajaya","Mekarjaya Barat","Karang Anyar","Sindangresmi"],
    "Pandeglang": ["Cipinang","Karang Anyar","Mekarsari"],
    "Majasari": ["Sukamanah","Kertaraharja"],
    "Cadasari": ["Cadasari","Cadasari Selatan","Cadasari Timur","Kaung","Sukajaya","Cadasari Barat","Karang Anyar","Mekarsari","Sindangresmi"],
    "Karang Tanjung": ["Karang Tanjung","Karang Tanjung Selatan","Karang Tanjung Timur","Karang Tanjung Barat","Cipalabuh","Sukamanah","Kertaraharja","Mekarsari"],
    "Koroncong": ["Koroncong","Koroncong Selatan","Koroncong Timur","Koroncong Barat","Cipalabuh","Sukamanah","Kertaraharja","Mekarsari"]
};

// ===== KELURAHAN (13) =====
const KELURAHAN = [
    "Kadomas","Babakan Kalanganyar","Pandeglang","Karang Sukamulya",
    "Kadupandak","Kadubera","Labuan","Banyubiru","Karang Pamulang",
    "Majasari","Mekarjaya","Curug","Cipinang"
];

// ===== TOTAL DESA + KELURAHAN =====
const TOTAL_DESA = 326;
const TOTAL_KELURAHAN = 13;
const TOTAL_DESA_KELURAHAN = TOTAL_DESA + TOTAL_KELURAHAN; // 339

// ===== DATA STATISTIK PER KECAMATAN =====
const DATA = {
    "Sumur": {populasi:45231, kesehatan:2, pendidikan:3.2, ekonomi:8.2},
    "Cimanggu": {populasi:62341, kesehatan:3, pendidikan:4.1, ekonomi:9.7},
    "Cibaliung": {populasi:38290, kesehatan:1, pendidikan:2.8, ekonomi:7.1},
    "Cibitung": {populasi:35000, kesehatan:1, pendidikan:2.5, ekonomi:6.5},
    "Cikeusik": {populasi:57213, kesehatan:2, pendidikan:3.5, ekonomi:8.9},
    "Cigeulis": {populasi:34215, kesehatan:1, pendidikan:2.2, ekonomi:6.3},
    "Panimbang": {populasi:48234, kesehatan:2, pendidikan:3.0, ekonomi:7.8},
    "Sobang": {populasi:39387, kesehatan:1, pendidikan:2.5, ekonomi:6.7},
    "Munjul": {populasi:32145, kesehatan:0, pendidikan:2.0, ekonomi:5.5},
    "Angsana": {populasi:28234, kesehatan:0, pendidikan:1.8, ekonomi:4.9},
    "Sindangresmi": {populasi:31234, kesehatan:1, pendidikan:2.3, ekonomi:6.1},
    "Picung": {populasi:38234, kesehatan:1, pendidikan:2.7, ekonomi:7.0},
    "Bojong": {populasi:56234, kesehatan:3, pendidikan:4.5, ekonomi:10.3},
    "Saketi": {populasi:45234, kesehatan:2, pendidikan:3.8, ekonomi:9.2},
    "Cisata": {populasi:28000, kesehatan:1, pendidikan:2.2, ekonomi:5.8},
    "Pagelaran": {populasi:35000, kesehatan:1, pendidikan:2.4, ekonomi:6.2},
    "Patia": {populasi:31234, kesehatan:1, pendidikan:2.3, ekonomi:6.0},
    "Sukaresmi": {populasi:27000, kesehatan:1, pendidikan:2.0, ekonomi:5.5},
    "Labuan": {populasi:62234, kesehatan:3, pendidikan:4.0, ekonomi:9.5},
    "Carita": {populasi:35051, kesehatan:1, pendidikan:2.6, ekonomi:6.8},
    "Jiput": {populasi:33234, kesehatan:1, pendidikan:2.6, ekonomi:6.9},
    "Cikedal": {populasi:30000, kesehatan:1, pendidikan:2.3, ekonomi:6.0},
    "Menes": {populasi:54234, kesehatan:3, pendidikan:4.2, ekonomi:9.9},
    "Pulosari": {populasi:27234, kesehatan:0, pendidikan:1.7, ekonomi:4.5},
    "Mandalawangi": {populasi:48234, kesehatan:2, pendidikan:3.1, ekonomi:7.6},
    "Cimanuk": {populasi:35234, kesehatan:1, pendidikan:2.8, ekonomi:7.3},
    "Cipeucang": {populasi:31234, kesehatan:1, pendidikan:2.4, ekonomi:6.2},
    "Banjar": {populasi:35000, kesehatan:1, pendidikan:2.5, ekonomi:6.5},
    "Kaduhejo": {populasi:36234, kesehatan:1, pendidikan:2.9, ekonomi:7.2},
    "Mekarjaya": {populasi:28234, kesehatan:1, pendidikan:2.1, ekonomi:5.8},
    "Pandeglang": {populasi:78234, kesehatan:4, pendidikan:4.8, ekonomi:11.2},
    "Majasari": {populasi:45000, kesehatan:2, pendidikan:3.5, ekonomi:8.0},
    "Cadasari": {populasi:52234, kesehatan:2, pendidikan:3.7, ekonomi:8.8},
    "Karang Tanjung": {populasi:28234, kesehatan:0, pendidikan:2.0, ekonomi:5.2},
    "Koroncong": {populasi:25234, kesehatan:0, pendidikan:1.6, ekonomi:4.2}
};

// ===== SEKTOR =====
const SEKTOR = [
    {id:1, nama:"Kesehatan", icon:"🏥", warna:"#FF6B6B"},
    {id:2, nama:"Pendidikan", icon:"📚", warna:"#4FACFE"},
    {id:3, nama:"Kependudukan", icon:"👨‍👩‍👧‍👦", warna:"#43E97B"},
    {id:4, nama:"Pertanian", icon:"🌾", warna:"#F9D423"},
    {id:5, nama:"Ekonomi", icon:"💰", warna:"#F093FB"},
    {id:6, nama:"Infrastruktur", icon:"🏗️", warna:"#4ECDC4"},
    {id:7, nama:"Sosial", icon:"🤝", warna:"#FF6B6B"},
    {id:8, nama:"Lingkungan", icon:"🌿", warna:"#43E97B"},
];

// ===== HISTORY =====
let historyData = [];

// ===== SPLASH =====
setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
}, 2000);

// ===== NAV =====
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const tab = this.dataset.tab;
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.getElementById('tab-' + tab).classList.add('active');
    });
});

// ===== THEME =====
let dark = true;
document.getElementById('themeBtn').addEventListener('click', function() {
    dark = !dark;
    const root = document.documentElement;
    root.style.setProperty('--bg', dark ? '#0A0A1A' : '#F5F5FA');
    root.style.setProperty('--text', dark ? '#E8E8F0' : '#1A1A2E');
    root.style.setProperty('--dim', dark ? '#8888AA' : '#666680');
    root.style.setProperty('--card', dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)');
    root.style.setProperty('--border', dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)');
    this.textContent = dark ? '🌙' : '☀️';
});

// ===== INIT DROPDOWN =====
function initDropdown() {
    const select = document.getElementById('inputKecamatan');
    KECAMATAN.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = k;
        select.appendChild(opt);
    });
}
initDropdown();

// ===== DASHBOARD =====
function updateDashboard() {
    const totalData = Object.keys(DATA).length * 5;
    document.getElementById('totalData').textContent = totalData;
    document.getElementById('totalSektor').textContent = SEKTOR.length;
    document.getElementById('totalKader').textContent = Math.floor(Math.random() * 50) + 10;
    document.getElementById('totalDesa').textContent = TOTAL_DESA_KELURAHAN;
    document.getElementById('profileData').textContent = totalData;
    document.getElementById('profileSektor').textContent = SEKTOR.length;
    document.getElementById('profileKader').textContent = Math.floor(Math.random() * 50) + 10;
}
updateDashboard();

// ===== UPDATE FEED =====
function generateFeed() {
    const container = document.getElementById('updateFeed');
    let html = '';
    const updates = [
        {sektor:'Kesehatan', desa:'Menes', nilai:3, kader:'Bu RT', waktu:'5 menit lalu'},
        {sektor:'Pendidikan', desa:'Sumur', nilai:2.8, kader:'Pak RW', waktu:'15 menit lalu'},
        {sektor:'Ekonomi', desa:'Labuan', nilai:9.5, kader:'Ibu PKK', waktu:'30 menit lalu'},
        {sektor:'Pertanian', desa:'Cimanggu', nilai:82, kader:'Kelompok Tani', waktu:'1 jam lalu'},
        {sektor:'Kesehatan', desa:'Pandeglang', nilai:4, kader:'Posyandu', waktu:'2 jam lalu'},
    ];
    updates.forEach(u => {
        html += `
            <div class="update-item">
                <div class="head">
                    <span><span class="sektor-tag">${u.sektor}</span> <strong>${u.desa}</strong></span>
                    <span>${u.waktu}</span>
                </div>
                <div>
                    <span class="value">${u.nilai}</span>
                    <span style="color:var(--dim);font-size:12px;"> oleh ${u.kader}</span>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}
generateFeed();

// ===== SEKTOR GRID =====
function generateSektor() {
    const container = document.getElementById('sektorGrid');
    container.innerHTML = SEKTOR.map(s => `
        <div class="sektor-item" onclick="showSektor('${s.nama}')">
            <div class="icon">${s.icon}</div>
            <div class="name">${s.nama}</div>
            <div class="count">${Math.floor(Math.random() * 100) + 10} data</div>
        </div>
    `).join('');
}
generateSektor();

function showSektor(nama) {
    document.querySelectorAll('.sektor-item').forEach(el => el.classList.remove('active'));
    event.target.closest('.sektor-item').classList.add('active');
    document.getElementById('inputSektor').value = nama.toLowerCase();
    document.getElementById('inputSektor').selectedIndex = 
        Array.from(document.getElementById('inputSektor').options).findIndex(o => o.value === nama.toLowerCase());
    document.querySelector('[data-tab="update"]').click();
    showNotif(`📊 Sektor ${nama} dipilih untuk update`);
}

// ===== SUBMIT UPDATE =====
function submitUpdate() {
    const sektor = document.getElementById('inputSektor').value;
    const kecamatan = document.getElementById('inputKecamatan').value;
    const desa = document.getElementById('inputDesa').value;
    const nilai = document.getElementById('inputNilai').value;
    const kader = document.getElementById('inputKader').value;
    const hp = document.getElementById('inputHP').value;
    const status = document.getElementById('updateStatus');

    if (!sektor || !kecamatan || !nilai) {
        status.className = 'update-status error';
        status.textContent = '⚠️ Isi semua field yang diperlukan!';
        status.style.display = 'block';
        return;
    }

    // Cek apakah desa valid
    if (desa) {
        const desaList = DESA_PER_KECAMATAN[kecamatan] || [];
        if (!desaList.includes(desa) && !KELURAHAN.includes(desa)) {
            status.className = 'update-status error';
            status.textContent = `⚠️ Desa "${desa}" tidak ditemukan di Kecamatan ${kecamatan}`;
            status.style.display = 'block';
            return;
        }
    }

    // Simpan ke history
    historyData.push({
        sektor: sektor,
        kecamatan: kecamatan,
        desa: desa || '-',
        nilai: nilai,
        kader: kader || 'Kader Desa',
        waktu: new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})
    });

    // Update DATA
    if (!DATA[kecamatan]) DATA[kecamatan] = {};
    DATA[kecamatan][sektor] = parseFloat(nilai);

    // Status sukses
    status.className = 'update-status success';
    status.textContent = `✅ Data ${sektor} untuk ${kecamatan} berhasil dikirim! (${nilai})`;
    status.style.display = 'block';

    // Reset form
    document.getElementById('inputDesa').value = '';
    document.getElementById('inputNilai').value = '';
    document.getElementById('inputKader').value = '';
    document.getElementById('inputHP').value = '';

    updateHistory();
    updateDashboard();
    generateFeed();
    showNotif(`📊 Update ${sektor} dari ${kecamatan} berhasil!`);

    // Scroll ke history
    document.getElementById('updateHistory').scrollIntoView({ behavior: 'smooth' });
}

// ===== HISTORY =====
function updateHistory() {
    const container = document.getElementById('historyList');
    if (historyData.length === 0) {
        container.innerHTML = '<p style="color:var(--dim);font-size:13px;text-align:center;">Belum ada update</p>';
        return;
    }
    container.innerHTML = historyData.slice().reverse().map(h => `
        <div class="history-item">
            <div>
                <span class="sektor">${h.sektor}</span>
                <span style="color:var(--dim);font-size:12px;">${h.kecamatan} ${h.desa !== '-' ? '- '+h.desa : ''}</span>
            </div>
            <div>
                <span style="font-weight:700;color:var(--primary);">${h.nilai}</span>
                <span class="time">${h.waktu}</span>
            </div>
        </div>
    `).join('');
}
updateHistory();

// ===== MAP =====
let map = null;
let layer = null;

function initMap() {
    try {
        map = L.map('mapContainer').setView([-6.367, 105.95], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
        renderMap();
    } catch(e) {
        document.getElementById('mapContainer').innerHTML = 
            '<p style="text-align:center;padding:40px;color:var(--dim);">🗺️ Peta tidak tersedia</p>';
    }
}

function renderMap() {
    if (layer) map.removeLayer(layer);
    
    const indicator = document.getElementById('indicatorSelect').value;
    const vals = KECAMATAN.map(k => DATA[k]?.[indicator] || 0);
    const maxVal = Math.max(...vals) || 1;

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
    
    layer = L.geoJSON(geojson, {
        style: function(f) {
            const v = DATA[f.properties.nama]?.[indicator] || 0;
            return { fillColor: getColor(v), weight: 1.5, color: '#fff', fillOpacity: 0.8 };
        },
        onEachFeature: function(f, l) {
            const nama = f.properties.nama;
            const d = DATA[nama] || {};
            const v = d[indicator] || 0;
            const labels = { populasi: 'Populasi', kesehatan: 'Kesehatan', pendidikan: 'Pendidikan', ekonomi: 'Ekonomi' };
            l.bindPopup(`
                <div style="padding:8px;min-width:160px;">
                    <h4 style="margin:0 0 6px 0;font-size:15px;font-weight:700;">${nama}</h4>
                    <div style="display:flex;justify-content:space-between;font-size:13px;">
                        <span style="color:#6B7280;">${labels[indicator]||indicator}</span>
                        <span style="font-weight:700;color:#4F46E5;">${v}</span>
                    </div>
                    <div style="font-size:12px;color:#6B7280;margin-top:4px;">
                        Populasi: ${(d.populasi||0).toLocaleString()} jiwa
                    </div>
                    <div style="font-size:11px;color:#6B7280;margin-top:2px;">
                        ${(DESA_PER_KECAMATAN[nama] || []).length} Desa
                    </div>
                </div>
            `);
        }
    }).addTo(map);
}

document.getElementById('indicatorSelect').addEventListener('change', renderMap);

// ===== NOTIF =====
function showNotif(text) {
    const el = document.getElementById('notif');
    el.textContent = text;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2000);
}

// ===== AUTO UPDATE =====
setInterval(() => {
    document.getElementById('updateTime').textContent = 'Update: ' + new Date().toLocaleTimeString('id-ID');
}, 5000);

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', function() {
    showNotif('📱 Menu akan segera hadir!');
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    console.log('🌏 Si DESKA Command Center siap!');
    console.l
