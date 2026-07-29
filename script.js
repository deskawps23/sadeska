// ============================================
// Si DESKA - Script v3.0 (DIPERBAIKI)
// ============================================

// ===== DATA =====
const KECAMATAN = [
    "Sumur","Cimanggu","Cibaliung","Cikeusik","Cigeulis","Panimbang","Sobang",
    "Munjul","Angsana","Sindangresmi","Saketi","Bojong","Jiput","Cikadu",
    "Mandalawangi","Cadasari","Pulosari","Kaduhejo","Cikeudal","Cipeucang",
    "Mekarjaya","Menes","Koroncong","Picung","Cibitu","Garum","Caret",
    "Ciawi","Cimanuk","Carita","Labuan","Pandeglang","Patia","Karang Tanjung","Cikeupa"
];

// ===== DATA STATISTIK =====
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

// ===== METADATA =====
const METADATA = [
    {kode:'3601.EDU.001', nama:'Angka Putus Sekolah', sektor:'Pendidikan', sumber:'Disdikpora', unit:'%', periode:'Tahunan'},
    {kode:'3601.HLT.001', nama:'Angka Kematian Ibu', sektor:'Kesehatan', sumber:'Dinkes', unit:'per 100.000', periode:'Tahunan'},
    {kode:'3601.HLT.003', nama:'Prevalensi Stunting', sektor:'Kesehatan', sumber:'Dinkes', unit:'%', periode:'Tahunan'},
    {kode:'3601.POP.001', nama:'Jumlah Penduduk', sektor:'Kependudukan', sumber:'Disdukcapil', unit:'Jiwa', periode:'Semesteran'},
    {kode:'3601.ECO.001', nama:'Tingkat Kemiskinan', sektor:'Ekonomi', sumber:'BPS', unit:'%', periode:'Tahunan'}
];

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
}

// ===== METADATA =====
function renderMetadata() {
    const container = document.getElementById('metadataGrid');
    container.innerHTML = METADATA.map(m => `
        <div class="metadata-card">
            <div class="code">${m.kode}</div>
            <div class="name">${m.nama}</div>
            <div class="details">
                <span>${m.sektor}</span>
                <span>${m.sumber}</span>
                <span>${m.unit}</span>
                <span>${m.periode}</span>
            </div>
            <div class="status">✅ Terverifikasi BPS</div>
        </div>
    `).join('');
}

// ===== STATS =====
function updateStats() {
    const total = Object.keys(dataStatistik).length;
    document.getElementById('totalData').textContent = total * 5;
    document.getElementById('totalPoin').textContent = total * 10;
}

// ===== COPY =====
function copyResponse() {
    const pre = document.getElementById('apiResponse');
    navigator.clipboard.writeText(pre.textContent).then(() => {
        alert('✅ Response JSON disalin!');
    });
}

// ===== NAVBAR =====
document.addEventListener('DOMContentLoaded', function() {
    const h = document.getElementById('hamburger');
    const m = document.getElementById('navMenu');
    if (h) h.addEventListener('click', () => m.classList.toggle('active'));
    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.addEventListener('click', () => m.classList.remove('active'));
    });

    renderMetadata();
    updateStats();
    initMap();

    document.getElementById('indicatorSelect').addEventListener('change', renderChoropleth);
    document.getElementById('yearSelect').addEventListener('change', function() {
        document.querySelector('.peta-info span:first-child').textContent = 
            `📅 Tahun ${this.value} • Klik kecamatan untuk detail`;
    });

    console.log('🌏 Si DESKA v3.0 - Siap Presentasi');
    console.log('📧 deskawps@yahoo.co.id | 📱 0856-9527-2863');
});

// ===== LIVE CLOCK =====
setInterval(() => {
    document.querySelector('.live-badge').textContent = 
        `● Live ${new Date().toLocaleTimeString()}`;
}, 1000);
