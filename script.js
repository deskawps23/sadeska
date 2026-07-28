// ============================================
// Si DESKA - Script (Diperbarui untuk UI Modern)
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
        
        // Update status
        const status = document.getElementById('txStatus');
        status.innerHTML = `
            <i class="fas fa-check-circle" style="color: var(--success);"></i>
            <span class="tx-hash">✅ Data berhasil direkam! ID: ${result.block.data.id}</span>
        `;
        
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
        });
    }
});

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
    if (typeof blockchain !== 'undefined') blockchain.updateUI();

    console.log('🌏 Si DESKA - Modern UI v2.0');
    console.log('✅ Sesuai: UU PDP • Perpres SDI • SPBE');
    console.log('📧 deskawps@yahoo.co.id | 📱 0856-9527-2863');
});

// ===== LIVE CLOCK =====
setInterval(() => {
    const liveBadge = document.querySelector('.live-text');
    if (liveBadge) {
        liveBadge.textContent = `Live ${new Date().toLocaleTimeString()}`;
    }
}, 1000);

// ===== UPDATE BALANCE =====
setInterval(() => {
    if (typeof sistemPoin !== 'undefined') {
        const stats = sistemPoin.getStats();
        const totalPoinEl = document.getElementById('totalPoin');
        const totalPoinSupply = document.getElementById('totalPoinSupply');
        const totalKontributor = document.getElementById('totalKontributor');
        if (totalPoinEl) totalPoinEl.textContent = stats.totalPoin;
        if (totalPoinSupply) totalPoinSupply.textContent = stats.totalPoin;
        if (totalKontributor) totalKontributor.textContent = stats.totalKontributor + ' Kontributor';
    }
}, 2000);
