const translations = {
  ms: {
    section_applicant: "Maklumat Pemohon",
    full_name: "Nama Penuh",
    gender: "Jantina",
    passport_no: "No Pasport",
    nationality: "Warganegara",
    pr_number: "No PR / Pas Kerja",
    pr_expiry: "Tarikh Mansuh PR",
    email: "E-mel",
    vehicle_info: "Maklumat Kenderaan",
    registration_number: "No Pendaftaran",
    brand_model: "Jenama / Model",
    engine_no: "No Enjin",
    chassis_no: "No Rangka",
    year_made: "Tahun Dibentuk",
    body_type: "Jenis Badan",
    insurance_no: "No Insuran",
    insurance_expiry: "Tarikh Luput",
    travel_info: "Maklumat Perjalanan",
    destination: "Destinasi",
    arrival_date: "Tarikh Tiba",
    declaration: "Saya dengan ini mengesahkan bahawa butir-butir yang diberikan adalah betul dan akan mematuhi syarat-syarat yang ditetapkan.",
    disclaimer: "Kerajaan Malaysia dan Jabatan Kastam Diraja Malaysia (\"JKDM\", \"kami\") adalah tidak bertanggungjawab bagi apa-apa kehilangan atau kerugian yang disebabkan oleh penggunaan maklumat dari laman web ini.",
    submit: "Hantar Permohonan",
    language_prompt: "Pilihan Bahasa",
    attention_note: `MAKLUMAN \n1. Borang ini hanya perlu digunakan sekiranya Sistem VMS menghadapi masalah teknikal.\n2. Maklumat yang diberikan adalah untuk kegunaan dalaman pihak berkuasa sahaja.\n3. Sila pastikan borang ini dicetak dan disertakan bersama dokumen kenderaan, pasport, serta insurans kenderaan bagi melancarkan proses kelulusan.`,
    expiry_date: "Tamat Tempoh :"
  },
  en: {
    section_applicant: "Applicant Information",
    full_name: "Full Name",
    gender: "Gender",
    passport_no: "Passport No",
    nationality: "Nationality",
    pr_number: "PR / Work Pass No",
    pr_expiry: "PR Expiry Date",
    email: "Email",
    vehicle_info: "Vehicle Information",
    registration_number: "Registration Number",
    brand_model: "Brand / Model",
    engine_no: "Engine No",
    chassis_no: "Chassis No",
    year_made: "Year Made",
    body_type: "Body Type",
    insurance_no: "Insurance No",
    insurance_expiry: "Insurance Expiry",
    travel_info: "Travel Information",
    destination: "Destination",
    arrival_date: "Arrival Date",
    declaration: "I hereby confirm that the information provided is accurate and I will comply with the specified conditions.",
    disclaimer: "The Government of Malaysia and the Royal Malaysian Customs Department (\"RMCD\", \"we\") shall not be held liable for any loss or damage caused by the use of any information obtained from this website.",
    submit: "Submit Application",
    language_prompt: "Language Choice",
attention_note: `NOTICE\n1. This form should only be used if the VMS System is experiencing technical issues.\n2. The information provided is for internal use by the authorities only.\n3. Please ensure this form is printed and submitted together with the vehicle documents, passport, and vehicle insurance to facilitate the approval process.`,
    expiry_date: "Expired Date :"
  }
};


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('vehicleForm');
  const warganegaraSelect = document.getElementById('warganegara');
  const malaysianFields = document.getElementById('malaysian-fields');
  const otherNationalityField = document.getElementById('other-nationality-field');
  const confirmCheckbox = document.getElementById('confirm-checkbox');
  const submitBtn = document.getElementById('submitBtn');
  const langToggle = document.getElementById('language-select');

  let currentLang = 'ms';

  function applyTranslation(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const translation = translations[lang]?.[key];
      if (!translation) return;
      if (el.tagName === 'SELECT' || el.tagName === 'OPTION') return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    });

    document.title = translations[lang].submit;
    populateJantinaDropdown(lang); // ✅ tukar dropdown jantina ikut bahasa
  }

  function populateCountryList() {
    const countries = ["AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA",
"AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM",
"BELIZE", "BENIN", "BHUTAN", "BOLIVIA", "BOSNIA AND HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA",
"BURKINA FASO", "BURUNDI", "CABO VERDE", "CAMBODIA", "CAMEROON", "CANADA", "CENTRAL AFRICAN REPUBLIC", "CHAD",
"CHILE", "CHINA", "COLOMBIA", "COMOROS", "CONGO (CONGO-BRAZZAVILLE)", "COSTA RICA", "CROATIA", "CUBA", "CYPRUS",
"CZECHIA", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "ECUADOR", "EGYPT", "EL SALVADOR",
"EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ESWATINI", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA",
"GEORGIA", "GERMANY", "GHANA", "GREECE", "GRENADA", "GUATEMALA", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI",
"HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "JAMAICA",
"JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON",
"LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MADAGASCAR", "MALAWI", "MALAYSIA",
"MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MAURITANIA", "MAURITIUS", "MEXICO", "MICRONESIA", "MOLDOVA",
"MONACO", "MONGOLIA", "MONTENEGRO", "MOROCCO", "MOZAMBIQUE", "MYANMAR (BURMA)", "NAMIBIA", "NAURU", "NEPAL",
"NETHERLANDS", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NORTH KOREA", "NORTH MACEDONIA", "NORWAY", "OMAN",
"PAKISTAN", "PALAU", "PALESTINE STATE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND",
"PORTUGAL", "QATAR", "ROMANIA", "RUSSIA", "RWANDA", "SAINT KITTS AND NEVIS", "SAINT LUCIA",
"SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL",
"SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA",
"SOUTH AFRICA", "SOUTH KOREA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWEDEN", "SWITZERLAND",
"SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TIMOR-LESTE", "TOGO", "TONGA", "TRINIDAD AND TOBAGO",
"TUNISIA", "TURKEY", "TURKMENISTAN", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM",
"UNITED STATES", "URUGUAY", "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "YEMEN", "ZAMBIA",
"ZIMBABWE", "OTHER"];
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      warganegaraSelect.appendChild(option);
    });
  }

  function populateJantinaDropdown(lang) {
    const jantinaSelect = document.getElementById('jantina');
    jantinaSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = lang === 'ms' ? '-- Sila Pilih --' : '-- Please Select --';
    jantinaSelect.appendChild(defaultOption);

    const options = lang === 'ms'
      ? [{ value: 'Lelaki', text: 'Lelaki' }, { value: 'Perempuan', text: 'Perempuan' }]
      : [{ value: 'Male', text: 'Male' }, { value: 'Female', text: 'Female' }];

    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.text;
      jantinaSelect.appendChild(option);
    });
  }

  function hideAllOptionalFields() {
    malaysianFields.style.display = 'none';
    otherNationalityField.style.display = 'none';
  }

  async function validateForm(e) {
    e.preventDefault();

    const namaInput = document.getElementById("nama_penuh");
    const passportInput = document.getElementById("no_pasport");
    const alamatMalaysia = document.getElementById("alamat_malaysia");

    if (namaInput) namaInput.value = namaInput.value.toUpperCase();
    if (passportInput) passportInput.value = passportInput.value.toUpperCase();
    if (alamatMalaysia) alamatMalaysia.value = alamatMalaysia.value.toUpperCase();

    if (!confirmCheckbox.checked) {
      alert("Sila tandakan pengesahan sebelum menghantar.");
      confirmCheckbox.focus();
      return;
    }

    const requiredFields = form.querySelectorAll('[required]');
    for (const field of requiredFields) {
      if (field.closest('.hidden-fields')?.style.display === 'none') continue;
      if (!field.value.trim()) {
        const label = form.querySelector(`label[for="${field.id}"]`);
        alert("Sila isi maklumat di ruangan: " + (label?.textContent || field.name));
        field.focus();
        return;
      }
    }

    const emailInput = document.getElementById('email');
    if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      alert("Sila masukkan alamat e-mel yang sah.");
      emailInput.focus();
      return;
    }

    const tahunInput = document.getElementById('tahun_dibentuk');
    const tahunValue = parseInt(tahunInput?.value || '', 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(tahunValue) || tahunValue < 1900 || tahunValue > currentYear) {
      alert(`Sila masukkan tahun yang sah antara 1900 dan ${currentYear}.`);
      tahunInput.focus();
      return;
    }

    alert("Permohonan anda sedang diproses...");
await generatePDF();
form.reset();
submitBtn.disabled = true;

  }

  langToggle.addEventListener('change', function () {
    currentLang = this.value;
    applyTranslation(currentLang);
  });

  warganegaraSelect.addEventListener('change', function () {
    hideAllOptionalFields();
    if (this.value === 'MALAYSIA') malaysianFields.style.display = 'block';
    else if (this.value === 'OTHER') otherNationalityField.style.display = 'block';
  });

  confirmCheckbox.addEventListener('change', function () {
    submitBtn.disabled = !this.checked;
  });

  form.addEventListener('submit', validateForm);

  function initializePage() {
    populateCountryList();
    populateJantinaDropdown(currentLang);
    hideAllOptionalFields();
    submitBtn.disabled = true;
    applyTranslation(currentLang);
    langToggle.value = currentLang;
  }

  initializePage();
});

function cropQRCodeCanvas(qrCanvas) {
  const ctx = qrCanvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
  const pixels = imgData.data;

  let minX = qrCanvas.width, minY = qrCanvas.height;
  let maxX = 0, maxY = 0;

  for (let y = 0; y < qrCanvas.height; y++) {
    for (let x = 0; x < qrCanvas.width; x++) {
      const idx = (y * qrCanvas.width + x) * 4;
      const alpha = pixels[idx + 3];
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];
      if (alpha > 0 && (r < 250 || g < 250 || b < 250)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = width;
  croppedCanvas.height = height;
  const croppedCtx = croppedCanvas.getContext('2d');

  const croppedImageData = ctx.getImageData(minX, minY, width, height);
  croppedCtx.putImageData(croppedImageData, 0, 0);

  return croppedCanvas;
}

// ✅ Fungsi utama jana PDF
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 15;
  const lineHeight = 8;

  const lang = document.getElementById('language-select')?.value || 'ms';
  const t = translations[lang];

  const getValue = (id) => document.getElementById(id)?.value?.trim() || "-";
  const getFormattedDate = (id) => {
    const raw = document.getElementById(id)?.value;
    if (!raw) return "-";
    const [year, month, day] = raw.split("-");
    return `${day}/${month}/${year}`;
  };

  // 1. Kumpul data
  const formData = {
    NamaPenuh: getValue("nama_penuh").toUpperCase(),
    Jantina: getValue("jantina"),
    NoPasport: getValue("no_pasport").toUpperCase(),
    Warganegara: getValue("warganegara") === "OTHER" ? getValue("other_nationality_input") : getValue("warganegara"),
    NoPRPasKerja: getValue("no_pr").toUpperCase(),
    TarikhMansuhPR: getFormattedDate("tarikh_mansuh_pr"),
    Email: getValue("email"),
    NoPendaftaran: getValue("no_pendaftaran").toUpperCase(),
    JenamaModel: getValue("jenama_model").toUpperCase(),
    NoEnjin: getValue("no_enjin"),
    NoRangka: getValue("no_rangka"),
    TahunDibentuk: getValue("tahun_dibentuk"),
    JenisBadan: getValue("jenis_badan").toUpperCase(),
    NoInsuran: getValue("no_insuran"),
    TarikhLuputInsuran: getFormattedDate("tarikh_luput_insuran"),
    AlamatMalaysia: getValue("destinasi").toUpperCase(),
    TarikhTiba: getFormattedDate("tarikh_tiba")
  };

  // 2. Kira tarikh tamat tempoh (3 bulan selepas tarikh tiba)
let tarikhTamat = "-";

if (formData.TarikhTiba !== "-") {
  // Parse tarikh tiba dd/mm/yyyy
  const [day, month, year] = formData.TarikhTiba.split("/");
  const arrivalDate = new Date(year, month - 1, day);

  // Tarikh tamat tempoh default = tarikh tiba + 3 bulan
  const defaultExpiry = new Date(arrivalDate);
  defaultExpiry.setMonth(defaultExpiry.getMonth() + 3);

  // Fungsi bantu parse tarikh dd/mm/yyyy ke Date object atau null jika tak valid
  function parseDate(dateStr) {
    if (!dateStr || dateStr === "-") return null;
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    const [d, m, y] = parts;
    const dt = new Date(y, m - 1, d);
    return isNaN(dt.getTime()) ? null : dt;
  }

  // Parse tarikh mansuh PR
  const prExpiryDate = parseDate(formData.TarikhMansuhPR);
  
  // (Jika ada tarikh tamat Work Pass, parse juga sama)
  // const workPassExpiryDate = parseDate(formData.TarikhMansuhWorkPass);

  // Cari tarikh tamat paling awal antara defaultExpiry dan prExpiryDate
  let finalExpiry = defaultExpiry;
  if (prExpiryDate && prExpiryDate < defaultExpiry) {
    finalExpiry = prExpiryDate;
  }
  // Kalau ada workPassExpiryDate, bandingkan juga
  // if (workPassExpiryDate && workPassExpiryDate < finalExpiry) {
  //   finalExpiry = workPassExpiryDate;
  // }

  // Format semula tarikh tamat
  const dd = String(finalExpiry.getDate()).padStart(2, "0");
  const mm = String(finalExpiry.getMonth() + 1).padStart(2, "0");
  const yyyy = finalExpiry.getFullYear();
  tarikhTamat = `${dd}/${mm}/${yyyy}`;
}


// 3. Jana ID unik format JKDM/mm/id/yy
const now = new Date();
const bulan = String(now.getMonth() + 1).padStart(2, '0');
const tahun = String(now.getFullYear()).slice(-2);
const randomID = Math.floor(100 + Math.random() * 900);

// dapatkan no pendaftaran dari formData, bersihkan dari spasi dan huruf kecil
const noPendaftaranClean = formData.NoPendaftaran.replace(/\s+/g, '').toUpperCase();

// format nombor borang ikut permintaan
const uniqueID = `JKDM/${bulan}/${randomID}${noPendaftaranClean}/${tahun}`;

  // 4. Jana QR code
  // 4. Jana QR code dengan tambah NoBorang & Tarikh Tamat Tempoh sebagai 2 column pertama
const qrDataOrdered = {
  NoBorang: uniqueID,
  TamatTempoh: tarikhTamat,
  ...formData
};

const qrText = Object.entries(qrDataOrdered)
  .map(([key, value]) => `${key}=${value}`)
  .join(";");

  const qrCanvasRaw = document.createElement('canvas');
new QRious({ element: qrCanvasRaw, value: qrText, size: 120 });
const qrCanvas = cropQRCodeCanvas(qrCanvasRaw);

  // 5. Header
  const headerImg = new Image();
  headerImg.src = "header.png";
  let yStart;
  await new Promise(resolve => {
    headerImg.onload = () => {
      const headerWidth = pageWidth * 0.8;
      const headerX = (pageWidth - headerWidth) / 2;
      const headerHeight = (headerImg.height / headerImg.width) * headerWidth;
      doc.addImage(headerImg, 'PNG', headerX, 7, headerWidth, headerHeight);
      yStart = headerHeight + 10;
      resolve();
    };
  });

  // 6. Fungsi bantu
  function sectionTitle(title, x, y) {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, x, y);
    y += 2;
    doc.setLineWidth(0.5);
    doc.line(x, y, x + 80, y);
    return y + 6;
  }
  function row(label, value, x, y) {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${label}:`, x, y);
    doc.text(value || '-', x + 40, y);//gerakkan jawapan kepada label (value besar ke kanan)
    return y + lineHeight - 1;
  }

  // 7. Maklumat Pemohon (kiri)
  let yLeft = sectionTitle(t.section_applicant, marginLeft, yStart);
  yLeft = row(t.full_name, formData.NamaPenuh, marginLeft, yLeft);
  yLeft = row(t.gender, formData.Jantina, marginLeft, yLeft);
  yLeft = row(t.passport_no, formData.NoPasport, marginLeft, yLeft);
  yLeft = row(t.nationality, formData.Warganegara, marginLeft, yLeft);
  yLeft = row(t.pr_number, formData.NoPRPasKerja, marginLeft, yLeft);
  yLeft = row(t.pr_expiry, formData.TarikhMansuhPR, marginLeft, yLeft);
  yLeft = row(t.email, formData.Email, marginLeft, yLeft);

// 8. QR Code + No Borang + Tamat Tempoh
const qrSize = 50;
const qrX = pageWidth - marginLeft - qrSize - 18;

// QR code kekal pada tempat asal (cth awal anda)
const qrY = yStart + (yLeft - yStart) / 2 - qrSize / 2 - 5; // jangan ubah

// Label X (kiri label) dan Value X (kanan value)
const labelX = qrX - 7;
const valueX = qrX + qrSize + 7;

// Letak Tamat Tempoh dulu (posisi bawah)
const expiryY = qrY + qrSize + 12;

// Letak No Borang sedikit atas tamat tempoh
const noBorangY = expiryY - 6; // 8 mm atas tamat tempoh

doc.setFontSize(10);
doc.setFont("Helvetica", "bold");
// No Borang di atas
doc.text("No Borang :", labelX, noBorangY);
doc.setFont("Helvetica", "normal");
doc.text(uniqueID, valueX, noBorangY, { align: "right" });

// Tamat Tempoh di bawah No Borang
doc.setFont("Helvetica", "bold");
doc.text(t.expiry_date || "Tamat Tempoh:", labelX, expiryY);
doc.setFont("Helvetica", "normal");
doc.text(tarikhTamat, valueX, expiryY, { align: "right" });

// QR code tetap sama di kanan
doc.addImage(qrCanvas.toDataURL("image/png"), 'PNG', qrX, qrY, qrSize, qrSize);



  // 9. Maklumat Kenderaan (kiri) + Maklumat Perjalanan (kanan)
  let yLeft2 = sectionTitle(t.vehicle_info, marginLeft, yLeft + 20);
  yLeft2 = row(t.registration_number, formData.NoPendaftaran, marginLeft, yLeft2);
  yLeft2 = row(t.brand_model, formData.JenamaModel, marginLeft, yLeft2);
  yLeft2 = row(t.engine_no, formData.NoEnjin, marginLeft, yLeft2);
  yLeft2 = row(t.chassis_no, formData.NoRangka, marginLeft, yLeft2);
  yLeft2 = row(t.year_made, formData.TahunDibentuk, marginLeft, yLeft2);
  yLeft2 = row(t.body_type, formData.JenisBadan, marginLeft, yLeft2);
  yLeft2 = row(t.insurance_no, formData.NoInsuran, marginLeft, yLeft2);
  yLeft2 = row(t.insurance_expiry, formData.TarikhLuputInsuran, marginLeft, yLeft2);

  let yRight2 = sectionTitle(t.travel_info, pageWidth / 2 + 10, yLeft + 20);
  yRight2 = row(t.destination || "Destinasi", formData.AlamatMalaysia, pageWidth / 2 + 10, yRight2);
  yRight2 = row(t.arrival_date, formData.TarikhTiba, pageWidth / 2 + 10, yRight2);

  // 10. Nota & tarikh cetakan
  const finalY = Math.max(yLeft2, yRight2) + 10;
  doc.setFont("Helvetica", "bold");
  doc.text(t.declaration, marginLeft, finalY, { maxWidth: pageWidth - marginLeft * 2 });
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.text(t.disclaimer, marginLeft, finalY + 12, { maxWidth: pageWidth - marginLeft * 2 });

  // Nota PERHATIAN
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(200, 0, 0);
  doc.text(t.attention_note, marginLeft, finalY + 35, { maxWidth: pageWidth - marginLeft * 2 });

  // Tarikh cetakan di kaki
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text(`Tarikh Cetakan: ${new Date().toLocaleDateString("ms-MY")}`, pageWidth - marginLeft, 287, { align: "right" });

  // 11. Simpan PDF
  const nama = formData.NamaPenuh.replace(/\s+/g, "_") || "borang";
  doc.save(`Borang_${nama}.pdf`);
}
