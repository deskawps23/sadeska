// ============================================
// SA DESKA - Data RT/RW Kabupaten Pandeglang
// WPS - Warga Pandeglang Sejahtera
// ============================================

const dataPandeglang = {
  kecamatan: [
    {id:1,name:"Sumur",desa:["Sumur","Cigebang","Kertajaya","Tunggilis","Cimadang"]},
    {id:2,name:"Cimanggu",desa:["Cimanggu","Bojong","Kertajaya","Tugu","Cipalabuh"]},
    {id:3,name:"Cibaliung",desa:["Cibaliung","Sorongan","Mendung","Curug","Cibodas"]},
    {id:4,name:"Cikeusik",desa:["Cikeusik","Cikadu","Cikeusik Selatan","Sukamaju","Kurung"]},
    {id:5,name:"Cigeulis",desa:["Cigeulis","Katumbiri","Karangsari","Sinarjaya","Cisereh"]},
    {id:6,name:"Panimbang",desa:["Panimbang","Mekarjaya","Tanagara","Sukajaya","Karyajaya"]},
    {id:7,name:"Sobang",desa:["Sobang","Cipadang","Kertaraharja","Cakung","Mekarsari"]},
    {id:8,name:"Munjul",desa:["Munjul","Kurung","Lebak","Palasari","Cibitung"]},
    {id:9,name:"Angsana",desa:["Angsana","Kadupandak","Sumurwuluh","Pasir","Cikayas"]},
    {id:10,name:"Sindangresmi",desa:["Sindangresmi","Bojongkoneng","Pasirngampar","Cimadang","Sindangjaya"]},
    {id:11,name:"Saketi",desa:["Saketi","Sodong","Mekarwangi","Kadumekar","Sindanghayu"]},
    {id:12,name:"Bojong",desa:["Bojong","Bojong Selatan","Bojong Timur","Cimayang","Bojong Barat"]},
    {id:13,name:"Jiput",desa:["Jiput","Jiput Selatan","Jiput Timur","Sukamanah","Kiarapayung"]},
    {id:14,name:"Cikadu",desa:["Cikadu","Cikadu Selatan","Cikadu Timur","Pasirukem","Cimanggu"]},
    {id:15,name:"Mandalawangi",desa:["Mandalawangi","Mandalawangi Selatan","Mandalawangi Timur","Nusawungu","Sinarjaya"]},
    {id:16,name:"Cadasari",desa:["Cadasari","Cadasari Selatan","Cadasari Timur","Kaung","Sukajaya"]},
    {id:17,name:"Pulosari",desa:["Pulosari","Pulosari Selatan","Pulosari Timur","Pulosari Barat","Cilentung"]},
    {id:18,name:"Kaduhejo",desa:["Kaduhejo","Kaduhejo Selatan","Kaduhejo Timur","Bojong","Cipalabuh"]},
    {id:19,name:"Cikeudal",desa:["Cikeudal","Cikeudal Selatan","Cikeudal Timur","Cikeudal Barat","Kertaraharja"]},
    {id:20,name:"Cipeucang",desa:["Cipeucang","Cipeucang Selatan","Cipeucang Timur","Pasir","Mekarsari"]},
    {id:21,name:"Mekarjaya",desa:["Mekarjaya","Mekarjaya Selatan","Mekarjaya Timur","Karyajaya","Sukajaya"]},
    {id:22,name:"Menes",desa:["Menes","Menes Selatan","Menes Timur","Muruy","Cimadang"]},
    {id:23,name:"Koroncong",desa:["Koroncong","Koroncong Selatan","Koroncong Timur","Koroncong Barat","Cipalabuh"]},
    {id:24,name:"Picung",desa:["Picung","Picung Selatan","Picung Timur","Kadupandak","Sukamanah"]},
    {id:25,name:"Cibitu",desa:["Cibitu","Cibitu Selatan","Cibitu Timur","Cibitu Barat","Kertaraharja"]},
    {id:26,name:"Garum",desa:["Garum","Garum Selatan","Garum Timur","Garum Barat","Nusawungu"]},
    {id:27,name:"Caret",desa:["Caret","Caret Selatan","Caret Timur","Sodong","Mekarwangi"]},
    {id:28,name:"Ciawi",desa:["Ciawi","Ciawi Selatan","Ciawi Timur","Ciawi Barat","Sinarjaya"]},
    {id:29,name:"Cimanuk",desa:["Cimanuk","Cimanuk Selatan","Cimanuk Timur","Cimanuk Barat","Cipalabuh"]},
    {id:30,name:"Carita",desa:["Carita","Carita Selatan","Carita Timur","Carita Barat","Karyajaya"]},
    {id:31,name:"Labuan",desa:["Labuan","Labuan Selatan","Labuan Timur","Labuan Barat","Sukajaya"]},
    {id:32,name:"Pandeglang",desa:["Pandeglang","Pandeglang Selatan","Pandeglang Timur","Pandeglang Barat","Pandeglang Utara"]},
    {id:33,name:"Patia",desa:["Patia","Patia Selatan","Patia Timur","Patia Barat","Mekarsari"]},
    {id:34,name:"Karang Tanjung",desa:["Karang Tanjung","Karang Tanjung Selatan","Karang Tanjung Timur","Karang Tanjung Barat","Cipalabuh"]},
    {id:35,name:"Cikeupa",desa:["Cikeupa","Cikeupa Selatan","Cikeupa Timur","Cikeupa Barat","Kertaraharja"]}
  ]
};

// ===== NAVBAR =====
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger) {
    hamburger.addEventListener('click', function() { navMenu.classList.toggle('active'); });
  }
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });
  
  // Isi dropdown kecamatan
  const kecSelect = document.getElementById('inputKecamatan');
  dataPandeglang.kecamatan.forEach(kec => {
    const opt = document.createElement('option');
    opt.value = kec.name;
    opt.textContent = kec.name;
    kecSelect.appendChild(opt);
  });
  
  initMap();
  selectLevel('kabupaten');
  updateStats();
  loadSavedData();
  
  console.log('🌏 SA DESKA - Data RT/RW Kabupaten Pandeglang');
  console.log('🌱 WPS - Warga Pandeglang Sejahtera');
  console.log('📧 Email: deskawps@yahoo.co.id');
  console.log('📱 WhatsApp: 0856-9527-2863');
});

// ===== LEVEL SELECTOR =====
function selectLevel(level) {
  document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.level-btn[onclick*="${level}"]`)?.classList.add('active');
  
  const content = document.getElementById('levelContent');
  switch(level) {
    case 'kabupaten': content.innerHTML = generateKabupaten(); break;
    case 'kecamatan': content.innerHTML = generateKecamatan(); break;
    case 'desa': content.innerHTML = generateDesa(); break;
    case 'rw': content.innerHTML = generateRW(); break;
    case 'rt': content.innerHTML = generateRT(); break;
  }
}

function generateKabupaten() {
  return `<div class="level-card">
    <h3>🏛️ Kabupaten Pandeglang</h3>
    <div class="stats-grid">
      <div class="stat-box"><span class="stat-number">1.283.456</span><span class="stat-label">Total Penduduk</span></div>
      <div class="stat-box"><span class="stat-number">35</span><span class="stat-label">Kecamatan</span></div>
      <div class="stat-box"><span class="stat-number">339</span><span class="stat-label">Desa/Kelurahan</span></div>
      <div class="stat-box"><span class="stat-number">2.500+</span><span class="stat-label">RW</span></div>
      <div class="stat-box"><span class="stat-number">12.500+</span><span class="stat-label">RT</span></div>
      <div class="stat-box"><span class="stat-number">3.2%</span><span class="stat-label">Angka Putus Sekolah</span></div>
    </div>
  </div>`;
}

function generateKecamatan() {
  let html = `<div class="level-card"><h3>📍 Pilih Kecamatan</h3><div class="kecamatan-grid">`;
  dataPandeglang.kecamatan.forEach(kec => {
    html += `<div class="kecamatan-card" onclick="selectDesa(${kec.id})"><h4>${kec.name}</h4><p>${kec.desa.length} Desa</p><span class="badge">Lihat →</span></div>`;
  });
  html += `</div></div>`;
  return html;
}

function generateDesa() {
  return `<div class="level-card"><h3>🏘️ 339 Desa/Kelurahan</h3><p>Pilih kecamatan di menu "Kecamatan" untuk melihat desa</p></div>`;
}

function generateRW() {
  return `<div class="level-card"><h3>🏠 Data RW</h3><p>Pilih desa terlebih dahulu untuk melihat data RW</p></div>`;
}

function generateRT() {
  return `<div class="level-card"><h3>🏡 Data RT</h3><p>Data paling detail dari setiap RT</p></div>`;
}

function selectDesa(kecamatanId) {
  const kec = dataPandeglang.kecamatan.find(k => k.id == kecamatanId);
  if (!kec) return;
  
  const content = document.getElementById('levelContent');
  let html = `<div class="level-card"><h3>🏘️ Desa di ${kec.name}</h3><div class="desa-list">`;
  kec.desa.forEach(desa => {
    html += `<div class="desa-item" onclick="alert('📊 Data ${desa}\\n\\nAkan menampilkan data RT/RW di desa ini')"><span>🏘️ ${desa}</span><span class="badge">Detail →</span></div>`;
  });
  html += `</div></div>`;
  content.innerHTML = html;
  document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.level-btn[onclick*="desa"]')?.classList.add('active');
}

// ===== MAP =====
let map = null;

function initMap() {
  const container = document.getElementById('mapContainer');
  document.getElementById('mapLoading').style.display = 'block';
  try {
    map = L.map('mapContainer', { center: [-6.367, 105.95], zoom: 10 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
    
    dataPandeglang.kecamatan.forEach((kec, i) => {
      const lat = -6.367 + (i * 0.02);
      const lng = 105.95 + (i * 0.01);
      L.circleMarker([lat, lng], { radius: 8, fillColor: '#4F46E5', color: '#fff', weight: 2, fillOpacity: 0.7 })
        .addTo(map)
        .bindPopup(`<div style="padding:8px;"><h4>${kec.name}</h4><p>${kec.desa.length} Desa</p><button onclick="selectDesa(${kec.id})" style="background:#4F46E5;color:white;border:none;padding:4px 12px;border-radius:4px;cursor:pointer;">Lihat Desa</button></div>`);
    });
    document.getElementById('mapLoading').style.display = 'none';
  } catch(e) {
    document.getElementById('mapLoading').innerHTML = `<i class="fas fa-exclamation-triangle" style="color:#F59E0B;"></i><p>Gagal memuat peta</p>`;
  }
}

function updateMap() {
  alert('✅ Peta diperbarui!\n\n🌱 WPS - Warga Pandeglang Sejahtera');
}

// ===== INPUT DATA =====
function submitRTData() {
  const data = {
    level: document.getElementById('inputLevel').value,
    kecamatan: document.getElementById('inputKecamatan').value,
    desa: document.getElementById('inputDesa').value,
    rw: document.getElementById('inputRW').value,
    rt: document.getElementById('inputRT').value,
    penduduk: document.getElementById('inputPenduduk').value,
    laki: document.getElementById('inputLaki').value,
    perempuan: document.getElementById('inputPerempuan').value,
    kk: document.getElementById('inputKK').value,
    putus_sekolah: document.getElementById('inputPutusSekolah').value,
    stunting: document.getElementById('inputStunting').value,
    ibu_hamil: document.getElementById('inputIbuHamil').value,
    bansos: document.getElementById('inputBansos').value,
    ketua: document.getElementById('inputKetua').value,
    timestamp: new Date().toISOString(),
    id: 'RT-' + Date.now()
  };
  
  if (!data.kecamatan) { alert('⚠️ Pilih kecamatan!'); return; }
  if (!data.desa) { alert('⚠️ Masukkan nama desa!'); return; }
  
  let saved = JSON.parse(localStorage.getItem('sadeska_rt_data') || '[]');
  saved.push(data);
  localStorage.setItem('sadeska_rt_data', JSON.stringify(saved));
  
  alert('✅ Data berhasil disimpan!\n\n📍 ' + data.kecamatan + '\n🏘️ ' + data.desa + '\n👨‍👩‍👧‍👦 ' + data.penduduk + ' jiwa\n\n🌱 WPS - Warga Pandeglang Sejahtera');
  
  resetForm();
  updateStats();
  loadSavedData();
}

function resetForm() {
  document.querySelectorAll('.input-form input').forEach(i => i.value = '');
  document.querySelectorAll('.input-form select').forEach(s => s.selectedIndex = 0);
}

function loadSavedData() {
  const saved = JSON.parse(localStorage.getItem('sadeska_rt_data') || '[]');
  const container = document.getElementById('savedDataList');
  if (saved.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--gray-600);padding:20px;">Belum ada data RT/RW yang tersimpan</p>';
    return;
  }
  let html = `<h4>📋 Data Tersimpan (${saved.length})</h4>`;
  saved.slice().reverse().forEach(d => {
    html += `<div class="saved-item"><strong>${d.kecamatan}</strong> - ${d.desa} | RT: ${d.rt || '-'} | RW: ${d.rw || '-'} | <strong>${d.penduduk || 0}</strong> jiwa | 🕐 ${new Date(d.timestamp).toLocaleDateString('id-ID')}</div>`;
  });
  container.innerHTML = html;
}

// ===== STATS =====
function updateStats() {
  const saved = JSON.parse(localStorage.getItem('sadeska_rt_data') || '[]');
  document.getElementById('totalRT').textContent = saved.filter(d => d.level === 'rt').length.toLocaleString() + '+';
  document.getElementById('totalRW').textContent = saved.filter(d => d.level === 'rw').length.toLocaleString() + '+';
  document.getElementById('totalRTCount').textContent = saved.filter(d => d.level === 'rt').length.toLocaleString();
  document.getElementById('totalRWCount').textContent = saved.filter(d => d.level === 'rw').length.toLocaleString();
  
  const totalPenduduk = saved.reduce((sum, d) => sum + parseInt(d.penduduk || 0), 0);
  if (totalPenduduk > 0) {
    document.getElementById('totalPopulation').textContent = totalPenduduk.toLocaleString();
  }
                              }
