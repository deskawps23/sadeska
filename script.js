// ============================================
// Si DESKA - Script Final v3.0
// Peta Tematik + Autocomplete + Metadata
// ============================================

// ===== DATA =====
const KECAMATAN = [
    "Sumur","Cimanggu","Cibaliung","Cikeusik","Cigeulis","Panimbang","Sobang",
    "Munjul","Angsana","Sindangresmi","Saketi","Bojong","Jiput","Cikadu",
    "Mandalawangi","Cadasari","Pulosari","Kaduhejo","Cikeudal","Cipeucang",
    "Mekarjaya","Menes","Koroncong","Picung","Cibitu","Garum","Caret",
    "Ciawi","Cimanuk","Carita","Labuan","Pandeglang","Patia","Karang Tanjung","Cikeupa"
];

const DESA = [
    "Sumur","Cigebang","Kertajaya","Tunggilis","Cimadang",
    "Cimanggu","Bojong","Tugu","Cipalabuh",
    "Cibaliung","Sorongan","Mendung","Curug","Cibodas",
    "Cikeusik","Cikadu","Sukamaju","Kurung",
    "Panimbang","Mekarjaya","Tanagara","Sukajaya","Karyajaya",
    "Sobang","Cipadang","Kertaraharja","Cakung","Mekarsari",
    "Munjul","Lebak","Palasari","Cibitung",
    "Angsana","Kadupandak","Sumurwuluh","Pasir","Cikayas",
    "Sindangresmi","Bojongkoneng","Pasirngampar","Sindangjaya",
    "Saketi","Sodong","Mekarwangi","Kadumekar","Sindanghayu",
    "Jiput","Sukamanah","Kiarapayung",
    "Mandalawangi","Nusawungu","Sinarjaya",
    "Cadasari","Kaung",
    "Pulosari","Cilentung",
    "Kaduhejo","Cikeudal","Cipeucang","Pasir",
    "Menes","Muruy","Koroncong","Picung",
    "Cibitu","Garum","Caret","Ciawi",
    "Cimanuk","Carita","Labuan","Pandeglang",
    "Patia","Karang Tanjung","Cikeupa",
    "Kadupandak","Sukamanah","Sodong","Mekarwangi"
];

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

// ===== DATA STATISTIK =====
const dataStatistik = {
    "Sumur": {populasi: 45231, putus_sekolah: 3.2, kematian_ibu: 2, kematian_bayi: 11, stunting: 18.5, kemiskinan: 8.2},
    "Cimanggu": {populasi: 62341, putus_sekolah: 4.1, kematian_ibu: 3, kematian_bayi: 15, stunting: 21.3, kemiskinan: 9.7},
    "Cibaliung": {populasi: 38290, putus_sekolah: 2.8, kematian_ibu: 1, kematian_bayi: 8, stunting: 16.2, kemiskinan: 7.1},
    "Cikeusik": {populasi: 57213, putus_sekolah: 3.5, kematian_ibu: 2, kematian_bayi: 12, stunting: 19.8, kemiskinan: 8.9},
    "Cigeulis": {populasi: 34215, putus_sekolah: 2.2, kematian_ibu: 1, kematian_bayi: 6, stunting: 14.5, kemiskinan: 6.3},
    "Panimbang": {populasi: 48234, putus_sekolah: 3.0, kematian_ibu: 2, kematian_bayi: 10, stunting: 17.2, kemiskinan: 7.8},
    "Sobang": {populasi: 39387, putus_sekolah: 2.5, kematian_ibu: 1, kematian_bayi: 7, stunting: 15.1, kemiskinan: 6.7},
    "Munjul": {populasi: 32145, putus_sekolah: 2.0, kematian_ibu: 0, kematian_bayi: 5, stunting: 13.2, kemiskinan: 5.5},
    "Angsana": {populasi: 28234, putus_sekolah: 1.8, kematian_ibu: 0, kematian_bayi: 4, stunting: 12.1, kemiskinan: 4.9},
    "Sindangresmi": {populasi: 31234, putus_sekolah: 2.3, kematian_ibu: 1, kematian_bayi: 6, stunting: 14.8, kemiskinan: 6.1},
    "Saketi": {populasi: 45234, putus_sekolah: 3.8, kematian_ibu: 2, kematian_bayi: 13, stunting: 20.1, kemiskinan: 9.2},
    "Bojong": {populasi: 56234, putus_sekolah: 4.5, kematian_ibu: 3, kematian_bayi: 16, stunting: 22.5, kemiskinan: 10.3},
    "Jiput": {populasi: 33234, putus_sekolah: 2.6, kematian_ibu: 1, kematian_bayi: 8, stunting: 15.8, kemiskinan: 6.9},
    "Cikadu": {populasi: 28234, putus_sekolah: 1.9, kematian_ibu: 0, kematian_bayi: 4, stunting: 12.5, kemiskinan: 5.0},
    "Mandalawangi": {populasi: 48234, putus_sekolah: 3.1, kematian_ibu: 2, kematian_bayi: 10, stunting: 17.5, kemiskinan: 7.6},
    "Cadasari": {populasi: 52234, putus_sekolah: 3.7, kematian_ibu: 2, kematian_bayi: 12, stunting: 19.5, kemiskinan: 8.8},
    "Pulosari": {populasi: 27234, putus_sekolah: 1.7, kematian_ibu: 0, kematian_bayi: 3, stunting: 11.8, kemiskinan: 4.5},
    "Kaduhejo": {populasi: 36234, putus_sekolah: 2.9, kematian_ibu: 1, kematian_bayi: 9, stunting: 16.8, kemiskinan: 7.2},
    "Cikeudal": {populasi: 42234, putus_sekolah: 3.3, kematian_ibu: 2, kematian_bayi: 11, stunting: 18.2, kemiskinan: 8.1},
    "Cipeucang": {populasi: 31234, putus_sekolah: 2.4, kematian_ibu: 1, kematian_bayi: 7, stunting: 14.9, kemiskinan: 6.2},
    "Mekarjaya": {populasi: 28234, putus_sekolah: 2.1, kematian_ibu: 1, kematian_bayi: 5, stunting: 13.5, kemiskinan: 5.8},
    "Menes": {populasi: 54234, putus_sekolah: 4.2, kematian_ibu: 3, kematian_bayi: 14, stunting: 21.8, kemiskinan: 9.9},
    "Koroncong": {populasi: 25234, putus_sekolah: 1.6, kematian_ibu: 0, kematian_bayi: 3, stunting: 11.2, kemiskinan: 4.2},
    "Picung": {populasi: 38234, putus_sekolah: 2.7, kematian_ibu: 1, kematian_bayi: 8, stunting: 16.0, kemiskinan: 7.0},
    "Cibitu": {populasi: 22234, putus_sekolah: 1.5, kematian_ibu: 0, kematian_bayi: 2, stunting: 10.5, kemiskinan: 4.0},
    "Garum": {populasi: 49234, putus_sekolah: 3.4, kematian_ibu: 2, kematian_bayi: 11, stunting: 18.8, kemiskinan: 8.4},
    "Caret": {populasi: 32234, putus_sekolah: 2.5, kematian_ibu: 1, kematian_bayi: 7, stunting: 15.2, kemiskinan: 6.5},
    "Ciawi": {populasi: 45234, putus_sekolah: 3.2, kematian_ibu: 2, kematian_bayi: 10, stunting: 17.8, kemiskinan: 7.9},
    "Cimanuk": {populasi: 35234, putus_sekolah: 2.8, kematian_ibu: 1, kematian_bayi: 9, stunting: 16.5, kemiskinan: 7.3},
    "Carita": {populasi: 39234, putus_sekolah: 3.0, kematian_ibu: 2, kematian_bayi: 10, stunting: 17.0, kemiskinan: 7.5},
    "Labuan": {populasi: 62234, putus_sekolah: 4.0, kematian_ibu: 3, kematian_bayi: 13, stunting: 20.5, kemiskinan: 9.5},
    "Pandeglang": {populasi: 78234, putus_sekolah: 4.8, kematian_ibu: 4, kematian_bayi: 18, stunting: 23.5, kemiskinan: 11.2},
    "Patia": {populasi: 31234, putus_sekolah: 2.3, kematian_ibu: 1, kematian_bayi: 6, stunting: 14.5, kemiskinan: 6.0},
    "Karang Tanjung": {populasi: 28234, putus_sekolah: 2.0, kematian_ibu: 0, kematian_bayi: 5, stunting: 13.0, kemiskinan: 5.2},
    "Cikeupa": {populasi: 35234, putus_sekolah: 2.6, kematian_ibu: 1, kematian_bayi: 8, stunting: 15.5, kemiskinan: 6.8}
};

// ===== INISIALISASI PETA =====
let map = null;
let geoJsonLayer = null;
let currentIndicator = 'putus_sekolah';

function initMap() {
    map = L.map('petaMap', {
        center: [-6.367, 105.95],
        zoom: 10,
        zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    loadGeoJSON();
}

function loadGeoJSON() {
    // Gunakan data GeoJSON dari file
    fetch('data/kecamatan.geojson')
        .then(response => response.json())
        .then(data => {
            renderChoropleth(data);
        })
        .catch(() => {
            // Fallback: buat polygon sederhana
            generateFallbackGeoJSON();
        });
}

function generateFallbackGeoJSON() {
    // Buat polygon sederhana untuk demo
    const features = KECAMATAN.map((nama, i) => {
        const lat = -6.367 + (i * 0.014);
        const lng = 105.95 + (i * 0.008);
        return {
            type: "Feature",
            properties: {
                id: i + 1,
                kode: "3601" + String(i + 1).padStart(3, '0'),
                nama: nama,
                pusat: [lat, lng]
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [lng - 0.02, lat - 0.02],
                    [lng + 0.02, lat - 0.02],
                    [lng + 0.02, lat + 0.02],
                    [lng - 0.02, lat + 0.02],
                    [lng - 0.02, lat - 0.02]
                ]]
            }
        };
    });

    const geojson = {
        type: "FeatureCollection",
        features: features
    };

    renderChoropleth(geojson);
}

function renderChoropleth(geojson) {
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
    }

    const indicator = document.getElementById('indicatorSelect').value;
    currentIndicator = indicator;

    // Dapatkan nilai max untuk skala warna
    const values = KECAMATAN.map(k => dataStatistik[k]?.[indicator] || 0);
    const maxVal = Math.max(...values);

    // Fungsi warna berdasarkan nilai
    function getColor(value) {
        if (value === 0) return '#e5e7eb';
        const intensity = value / maxVal;
        if (intensity < 0.2) return '#fef0d9';
        if (intensity < 0.4) return '#fdd49e';
        if (intensity < 0.6) return '#fdbb84';
        if (intensity < 0.8) return '#fc8d59';
        return '#d7301f';
    }

    // Style untuk setiap feature
    function styleFeature(feature) {
        const nama = feature.properties.nama;
        const value = dataStatistik[nama]?.[indicator] || 0;
        return {
            fillColor: getColor(value),
            weight: 1.5,
            opacity: 1,
            color: 'white',
            dashArray: null,
            fillOpacity: 0.8
        };
    }

    // Popup content
    function onEachFeature(feature, layer) {
        const nama = feature.properties.nama;
        const data = dataStatistik[nama] || {};
        const value = data[indicator] || 0;
        
        const indicatorLabels = {
            putus_sekolah: 'Angka Putus Sekolah',
            kematian_ibu: 'Angka Kematian Ibu',
            kematian_bayi: 'Angka Kematian Bayi',
            stunting: 'Stunting',
            kemiskinan: 'Kemiskinan',
            populasi: 'Populasi'
        };

        const units = {
            putus_sekolah: '%',
            kematian_ibu: 'per 100.000',
            kematian_bayi: 'per 1.000',
            stunting: '%',
            kemiskinan: '%',
            populasi: 'jiwa'
        };

        layer.bindPopup(`
            <div style="padding: 12px; min-width: 200px;">
                <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">${nama}</h4>
                <div style="border-bottom: 1px solid #e5e7eb; margin-bottom: 8px;"></div>
                <div style="display: flex; justify-content: space-between; font-size: 13px;">
                    <span style="color: #6B7280;">${indicatorLabels[indicator] || indicator}</span>
                    <span style="font-weight: 700; color: #4F46E5;">${value} ${units[indicator] || ''}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6B7280; margin-top: 4px;">
                    <span>Populasi</span>
                    <span>${data.populasi?.toLocaleString() || '-'} jiwa</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6B7280;">
                    <span>Stunting</span>
                    <span>${data.stunting || '-'}%</span>
                </div>
                <button onclick="showKecamatanDetail('${nama}')" style="
                    margin-top: 8px;
                    background: #4F46E5;
                    color: white;
                    border: none;
                    padding: 4px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                    width: 100%;
                ">Lihat Detail Data</button>
            </div>
        `);

        layer.on('click', function() {
            map.fitBounds(layer.getBounds());
        });
    }

    geoJsonLayer = L.geoJSON(geojson, {
        style: styleFeature,
        onEachFeature: onEachFeature
    }).addTo(map);

    // Update legend
    updateLegend(indicator, maxVal);
}

function updateLegend(indicator, maxVal) {
    const gradient = document.getElementById('legendGradient');
    const minLabel = document.getElementById('legendMin');
    const maxLabel = document.getElementById('legendMax');

    if (gradient) {
        gradient.style.background = `linear-gradient(to right, #fef0d9, #fdd49e, #fdbb84, #fc8d59, #d7301f)`;
    }
    if (minLabel) minLabel.textContent = '0';
    if (maxLabel) maxLabel.textContent = maxVal.toFixed(1);
}

function showKecamatanDetail(nama) {
    const data = dataStatistik[nama];
    if (!data) {
        alert('Data tidak ditemukan');
        return;
    }

    alert(`📊 DATA KECAMATAN ${nama.toUpperCase()}\n\n` +
        `👨‍👩‍👧‍👦 Populasi: ${data.populasi.toLocaleString()} jiwa\n` +
        `📚 Angka Putus Sekolah: ${data.putus_sekolah}%\n` +
        `🏥 Angka Kematian Ibu: ${data.kematian_ibu} per 100.000\n` +
        `👶 Angka Kematian Bayi: ${data.kematian_bayi} per 1.000\n` +
        `📊 Stunting: ${data.stunting}%\n` +
        `💰 Kemiskinan: ${data.kemiskinan}%\n\n` +
        `📌 Sumber: BPS & OPD Kabupaten Pandeglang\n` +
        `📅 Tahun: 2026`);
}

// ===== AUTOCOMPLETE ENGINE =====
function initAutocomplete(inputId, dropdownId, dataList, clearId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const clearBtn = document.getElementById(clearId);
    let selectedIndex = -1;

    if (!input || !dropdown) return;

    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    input.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        dropdown.classList.remove('active');
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';
        selectedIndex = -1;

        if (!query) {
            dropdown.innerHTML = '';
            return;
        }

        const filtered = dataList.filter(item => 
            item.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            dropdown.innerHTML = `<div class="autocomplete-empty">Tidak ditemukan</div>`;
            dropdown.classList.add('active');
            return;
        }

        let html = '';
        filtered.slice(0, 15).forEach((item, index) => {
            const highlighted = item.replace(
                new RegExp(query, 'gi'),
                match => `<strong style="color: var(--primary-light);">${match}</strong>`
            );
            html += `
                <div class="autocomplete-item" data-value="${item}">
                    <span class="item-icon">📍</span>
                    <span class="item-name">${highlighted}</span>
                    <span class="item-badge">${dataList.length} total</span>
                </div>
            `;
        });

        dropdown.innerHTML = html;
        dropdown.classList.add('active');

        dropdown.querySelectorAll('.autocomplete-item').forEach(el => {
            el.addEventListener('click', function() {
                const value = this.dataset.value;
                input.value = value;
                dropdown.classList.remove('active');
                if (clearBtn) clearBtn.style.display = 'block';
                input.dispatchEvent(new Event('change'));
            });
        });
    });

    // Keyboard navigation
    input.addEventListener('keydown', function(e) {
        const items = dropdown.querySelectorAll('.autocomplete-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            items.forEach((el, i) => el.classList.toggle('active', i === selectedIndex));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            items.forEach((el, i) => el.classList.toggle('active', i === selectedIndex));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && selectedIndex < items.length) {
                const value = items[selectedIndex].dataset.value;
                input.value = value;
                dropdown.classList.remove('active');
                if (clearBtn) clearBtn.style.display = 'block';
                input.dispatchEvent(new Event('change'));
            }
        } else if (e.key === 'Escape') {
            dropdown.classList.remove('active');
            input.blur();
        }
    });

    input.addEventListener('focus', function() {
        if (this.value.trim()) {
            this.dispatchEvent(new Event('input'));
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            input.value = '';
            clearBtn.style.display = 'none';
            dropdown.classList.remove('active');
            input.focus();
        });
    }
}

// ===== METADATA RENDER =====
function renderMetadata() {
    const container = document.getElementById('metadataGrid');
    const metadataList = [
        {kode: '3601.EDU.001', nama: 'Angka Putus Sekolah', sektor: 'Pendidikan', sumber: 'Disdikpora', unit: '%', periode: 'Tahunan'},
        {kode: '3601.HLT.001', nama: 'Angka Kematian Ibu', sektor: 'Kesehatan', sumber: 'Dinkes', unit: 'per 100.000', periode: 'Tahunan'},
        {kode: '3601.HLT.002', nama: 'Angka Kematian Bayi', sektor: 'Kesehatan', sumber: 'Dinkes', unit: 'per 1.000', periode: 'Tahunan'},
        {kode: '3601.HLT.003', nama: 'Prevalensi Stunting', sektor: 'Kesehatan', sumber: 'Dinkes', unit: '%', periode: 'Tahunan'},
        {kode: '3601.POP.001', nama: 'Jumlah Penduduk', sektor: 'Kependudukan', sumber: 'Disdukcapil', unit: 'Jiwa', periode: 'Semesteran'},
        {kode: '3601.ECO.001', nama: 'Tingkat Kemiskinan', sektor: 'Ekonomi', sumber: 'BPS', unit: '%', periode: 'Tahunan'}
    ];

    container.innerHTML = metadataList.map(m => `
        <div class="metadata-card">
            <div class="metadata-code">${m.kode}</div>
            <div class="metadata-name">${m.nama}</div>
            <div class="metadata-details">
                <span><i class="fas fa-tag"></i> ${m.sektor}</span>
                <span><i class="fas fa-database"></i> ${m.sumber}</span>
                <span><i class="fas fa-ruler"></i> ${m.unit}</span>
                <span><i class="fas fa-calendar"></i
