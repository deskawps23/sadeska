// ============================================
// SA DESKA - 48 Sektor Data RT/RW
// WPS - Warga Pandeglang Sejahtera
// ============================================

// ===== 48 SEKTOR =====
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

// ===== DATA KECAMATAN =====
const KECAMATAN = [
  "Sumur","Cimanggu","Cibaliung","Cikeusik","Cigeulis","Panimbang","Sobang",
  "Munjul","Angsana","Sindangresmi","Saketi","Bojong","Jiput","Cikadu",
  "Mandalawangi","Cadasari","Pulosari","Kaduhejo","Cikeudal","Cipeucang",
  "Mekarjaya","Menes","Koroncong","Picung","Cibitu","Garum","Caret",
  "Ciawi","Cimanuk","Carita","Labuan","Pandeglang","Patia","Karang Tanjung","Cikeupa"
];

// ===== RENDER SEKTOR =====
function renderSektor() {
  const container = document.getElementById('sektorList');
  container.innerHTML = SEKTOR.map(s => `
    <div class="sektor-card" onclick="pilihSektor(${s.no})">
      <div class="number">${s.no}</div>
      <div class="name">${s.icon} ${s.nama}</div>
      <span class="badge">${getDataCount(s.no)} data</span>
    </div>
  `).join('');
}

function getDataCount(no) {
  const data = JSON.parse(localStorage.getItem('sadeska_48_data') || '[]');
  return data.filter(d => d.sektor == no).length;
}

function pilihSektor(no) {
  const s = SEKTOR.find(x => x.no == no);
  document.getElementById('inputSektor').value = no;
  document.getElementById('inputSektor').selectedIndex = no - 1;
  window.location.href = '#input';
  alert(`📊 Sektor ${no}: ${s.nama}\nSilakan input data di bawah ini.`);
}

// ===== RENDER DASHBOARD =====
function renderDashboard() {
  const container = document.getElementById('dashboardGrid');
  const data = JSON.parse(localStorage.getItem('sadeska_48_data') || '[]');
  
  container.innerHTML = SEKTOR.map(s => {
    const count = data.filter(d => d.sektor == s.no).length;
    const total = data.filter(d => d.sektor == s.no).reduce((a,d) => a + (parseFloat(d.nilai)||0), 0);
    return `
      <div class="card">
        <span class="icon">${s.icon}</span>
        <h3>${s.nama}</h3>
        <div class="number">${count}</div>
        <small style="color:var(--gray-600)">${total.toLocaleString()} total</small>
      </div>
    `;
  }).join('');
}

// ===== SUBMIT DATA =====
function submitData() {
  const data = {
    level: document.getElementById('inputLevel').value,
    sektor: parseInt(document.getElementById('inputSektor').value),
    kecamatan: document.getElementById('inputKecamatan').value,
    desa: document.getElementById('inputDesa').value || '-',
    rw: document.getElementById('inputRW').value || '-',
    rt: document.getElementById('inputRT').value || '-',
    nilai: document.getElementById('inputNilai').value,
    keterangan: document.getElementById('inputKeterangan').value || '-',
    penginput: document.getElementById('inputPenginput').value || 'Warga',
    timestamp: new Date().toISOString(),
    id: 'DATA-' + Date.now()
  };

  if (!data.sektor) { alert('⚠️ Pilih sektor!'); return; }
  if (!data.kecamatan) { alert('⚠️ Pilih kecamatan!'); return; }
  if (!data.nilai) { alert('⚠️ Isi nilai data!'); return; }

  const saved = JSON.parse(localStorage.getItem('sadeska_48_data') || '[]');
  saved.push(data);
  localStorage.setItem('sadeska_48_data', JSON.stringify(saved));

  alert('✅ Data tersimpan!\n\n📊 ' + SEKTOR.find(s=>s.no==data.sektor)?.nama + '\n📍 ' + data.kecamatan + '\n📝 ' + data.nilai);

  resetForm();
  renderSektor();
  renderDashboard();
  loadSavedData();
}

function resetForm() {
  document.querySelectorAll('.input-form input').forEach(i => i.value = '');
  document.querySelectorAll('.input-form select').forEach(s => s.selectedIndex = 0);
}

function loadSavedData() {
  const data = JSON.parse(localStorage.getItem('sadeska_48_data') || '[]');
  const container = document.getElementById('savedDataList');
  if (!data.length) {
    container.innerHTML = '<p style="text-align:center;color:var(--gray-600);padding:20px;">Belum ada data</p>';
    return;
  }
  container.innerHTML = `<h4>📋 Data Tersimpan (${data.length})</h4>` + 
    data.slice().reverse().slice(0,20).map(d => `
      <div class="saved-item">
        <span><strong>${SEKTOR.find(s=>s.no==d.sektor)?.icon} ${SEKTOR.find(s=>s.no==d.sektor)?.nama}</strong> - ${d.kecamatan}</span>
        <span>${d.desa} | RT:${d.rt} | RW:${d.rw}</span>
        <span><strong>${d.nilai}</strong></span>
        <span class="sektor-tag">${d.level}</span>
      </div>
    `).join('');
}

// ===== MAP =====
let map = null;
function initMap() {
  try {
    map = L.map('mapContainer', {center:[-6.367,105.95],zoom:10});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    KECAMATAN.forEach((k,i) => {
      const lat = -6.367 + (i*0.02), lng = 105.95 + (i*0.01);
      L.circleMarker([lat,lng], {radius:7,fillColor:'#4F46E5',color:'#fff',weight:2,fillOpacity:0.7})
        .addTo(map)
        .bindPopup(`<h4>${k}</h4><p>Klik untuk lihat data</p>`);
    });
    document.getElementById('mapLoading').style.display = 'none';
  } catch(e) {
    document.getElementById('mapLoading').innerHTML = '<i class="fas fa-exclamation-triangle"></i><p>Gagal</p>';
  }
}

// ===== NAVBAR =====
document.addEventListener('DOMContentLoaded', function() {
  const h = document.getElementById('hamburger'), m = document.getElementById('navMenu');
  if(h) h.addEventListener('click', ()=>m.classList.toggle('active'));
  document.querySelectorAll('.nav-menu a').forEach(a => a.addEventListener('click', ()=>m.classList.remove('active')));

  // Isi dropdown sektor
  const ss = document.getElementById('inputSektor');
  SEKTOR.forEach(s => { const o = document.createElement('option'); o.value = s.no; o.textContent = s.no + '. ' + s.nama; ss.appendChild(o); });

  // Isi dropdown kecamatan
  const ks = document.getElementById('inputKecamatan');
  KECAMATAN.forEach(k => { const o = document.createElement('option'); o.value = k; o.textContent = k; ks.appendChild(o); });

  initMap();
  renderSektor();
  renderDashboard();
  loadSavedData();
  console.log('🌏 SA DESKA - 48 Sektor Data RT/RW | WPS');
  console.log('📧 deskawps@yahoo.co.id | 📱 0856-9527-2863');
});
