// ============================================
// Si DESKA - Script dengan Autocomplete
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

// ===== DATA DESA =====
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
    "Kaduhejo",
    "Cikeudal",
    "Cipeucang","Pasir",
    "Menes","Muruy",
    "Koroncong",
    "Picung",
    "Cibitu",
    "Garum",
    "Caret",
    "Ciawi",
    "Cimanuk",
    "Carita",
    "Labuan",
    "Pandeglang",
    "Patia",
    "Karang Tanjung",
    "Cikeupa",
    "Kadupandak","Sukamanah","Nusawungu","Sinarjaya",
    "Sodong","Mekarwangi","Kadumekar","Sindanghayu"
];

// ===== AUTOCOMPLETE ENGINE =====
function initAutocomplete(inputId, dropdownId, dataList, placeholder, clearId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const clearBtn = document.getElementById(clearId);
    let selectedIndex = -1;
    let currentItems = [];

    if (!input || !dropdown) return;

    // Hide dropdown on outside click
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Input event
    input.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        dropdown.classList.remove('active');
        clearBtn.style.display = query ? 'block' : 'none';
        selectedIndex = -1;

        if (!query) {
            dropdown.innerHTML = '';
            return;
        }

        // Filter data
        const filtered = dataList.filter(item => 
            item.toLowerCase().includes(query)
        );

        currentItems = filtered;

        if (filtered.length === 0) {
            dropdown.innerHTML = `<div class="autocomplete-empty">Tidak ditemukan</div>`;
            dropdown.classList.add('active');
            return;
        }

        // Build dropdown
        let html = '';
        filtered.slice(0, 15).forEach((item, index) => {
            const highlighted = item.replace(
                new RegExp(query, 'gi'),
                match => `<strong style="color: var(--primary-light);">${match}</strong>`
            );
            html += `
                <div class="autocomplete-item" data-index="${index}" data-value="${item}">
                    <span class="item-icon">📍</span>
                    <span class="item-name">${highlighted}</span>
                    <span class="item-badge">${dataList.length} total</span>
                </div>
            `;
        });

        dropdown.innerHTML = html;
        dropdown.classList.add('active');

        // Click handler for items
        dropdown.querySelectorAll('.autocomplete-item').forEach(el => {
            el.addEventListener('click', function() {
                const value = this.dataset.value;
                input.value = value;
                dropdown.classList.remove('active');
                clearBtn.style.display = 'block';
                input.dispatchEvent(new Event('change'));
            });

            // Hover
            el.addEventListener('mouseenter', function() {
                dropdown.querySelectorAll('.autocomplete-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                selectedIndex = parseInt(this.dataset.index);
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
            updateActiveItem(items, selectedIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateActiveItem(items, selectedIndex);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && selectedIndex < items.length) {
                const value = items[selectedIndex].dataset.value;
                input.value = value;
                dropdown.classList.remove('active');
                clearBtn.style.display = 'block';
                input.dispatchEvent(new Event('change'));
            }
        } else if (e.key === 'Escape') {
            dropdown.classList.remove('active');
            input.blur();
        }
    });

    // Focus event - show dropdown if has value
    input.addEventListener('focus', function() {
        if (this.value.trim()) {
            this.dispatchEvent(new Event('input'));
        }
    });

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            input.value = '';
            clearBtn.style.display = 'none';
            dropdown.classList.remove('active');
            input.focus();
            input.dispatchEvent(new Event('input'));
        });
    }
}

function updateActiveItem(items, index) {
    items.forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
    if (index >= 0 && index < items.length) {
        items[index].scrollIntoView({ block: 'nearest' });
    }
}

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
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#8888AA' } },
                x: { grid: { display: false }, ticks: { color: '#8888AA', font: { size: 9 } } }
            },
            animation: { duration: 500 }
        }
    });

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
                legend: { position: 'bottom', labels: { color: '#8888AA', font: { size: 9 }, boxWidth: 10, padding: 6 } }
            },
            cutout: '60%',
            animation: { animateRotate: true }
        }
    });

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
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#8888AA' } },
                x: { grid: { display: false }, ticks: { color: '#8888AA', font: { size: 8 } } }
            },
            animation: { duration: 500 }
        }
    });

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
                legend: { position: 'right', labels: { color: '#8888AA', font: { size: 11 }, boxWidth: 12, padding: 8 } }
            },
            cutout: '55%',
            animation: { animateRotate: true }
        }
    });

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
    
    const sektorNames = ['Kependudukan', 'Pertanian', 'Kesehatan', 'Pendidikan', 'Ekonomi', 'Infrastruktur', 'Sosial', 'Lingkungan'];
    sektorNames.forEach(s => chartData.pie[s] = Math.floor(Math.random() * 30) + 5);
    
    KECAMATAN.slice(0, 10).forEach(k => chartData.bar[k] = Math.floor(Math.random() * 25) + 3);
    
    ['Pak RT', 'Bu RW', 'Kepala Desa', 'Camat', 'Warga A', 'Warga B'].forEach(n => {
        chartData.doughnut.push({ name: n, poin: Math.floor(Math.random() * 100) + 20 });
    });
    
    updateCharts();
}

function updateCharts() {
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
    
    const sektorNames = Object.keys(chartData.pie);
    sektorNames.forEach(s => chartData.pie[s] = Math.max(2, chartData.pie[s] + (Math.random() - 0.5) * 4));
    pieChart.data.labels = sektorNames;
    pieChart.data.datasets[0].data = Object.values(chartData.pie);
    pieChart.update('none');
    
    const barKeys = Object.keys(chartData.bar);
    barKeys.forEach(k => chartData.bar[k] = Math.max(1, chartData.bar[k] + (Math.random() - 0.5) * 3));
    barChart.data.labels = barKeys;
    barChart.data.datasets[0].data = Object.values(chartData.bar);
    barChart.update('none');
    
    chartData.doughnut.forEach(d => d.poin = Math.max(10, d.poin + (Math.random() - 0.5) * 8));
    doughnutChart.data.labels = chartData.doughnut.map(d => d.name);
    doughnutChart.data.datasets[0].data = chartData.doughnut.map(d => d.poin);
    doughnutChart.update('none');
    
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

    // Cek apakah kecamatan valid
    if (!KECAMATAN.includes(kecamatan)) {
        alert('⚠️ Kecamatan tidak valid! Silakan pilih dari saran yang muncul.');
        return;
    }

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
        
        // Update charts
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
    document.getElementById('inputKecamatan').value = '';
    document.getElementById('inputDesa').value = '';
    document.getElementById('levelLabel').textContent = 'RT/RW';
    document.getElementById('consentCheck').checked = true;
    document.getElementById('clearKecamatan').style.display = 'none';
    document.getElementById('clearDesa').style.display = 'none';
    
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
        rwField.placeholder = '-'; rtField.p
