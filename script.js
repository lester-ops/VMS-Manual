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
    brand_model: "Jenama / Model",
    engine_no: "No Enjin",
    chassis_no: "No Rangka",
    year_made: "Tahun Dibentuk",
    body_type: "Jenis Badan",
    insurance_no: "No Insuran",
    insurance_expiry: "Tarikh Luput",
    travel_info: "Maklumat Perjalanan",
    malaysia_address: "Alamat di Malaysia",
    arrival_date: "Tarikh Tiba",
    declaration: "Saya dengan ini mengesahkan bahawa butir-butir yang diberikan adalah betul dan akan mematuhi syarat-syarat yang ditetapkan.",
    disclaimer: "Kerajaan Malaysia dan Jabatan Kastam Diraja Malaysia (\"JKDM\", \"kami\") adalah tidak bertanggungjawab bagi apa-apa kehilangan atau kerugian yang disebabkan oleh penggunaan maklumat dari laman web ini.",
    submit: "Hantar Permohonan",
    language_prompt: "Pilihan Bahasa"
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
    brand_model: "Brand / Model",
    engine_no: "Engine No",
    chassis_no: "Chassis No",
    year_made: "Year Made",
    body_type: "Body Type",
    insurance_no: "Insurance No",
    insurance_expiry: "Insurance Expiry",
    travel_info: "Travel Information",
    malaysia_address: "Address in Malaysia",
    arrival_date: "Arrival Date",
    declaration: "I hereby confirm that the information provided is accurate and I will comply with the specified conditions.",
    disclaimer: "The Government of Malaysia and the Royal Malaysian Customs Department (\"RMCD\", \"we\") shall not be held liable for any loss or damage caused by the use of any information obtained from this website.",
    submit: "Submit Application",
    language_prompt: "Language Choice"
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

// ✅ Fungsi utama jana PDF
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 20;
  const lineHeight = 8;
  let y = 50;

  const lang = document.getElementById('language-select')?.value || 'ms';
  const t = translations[lang];

  const getValue = (id) => document.getElementById(id)?.value?.trim() || "-";
  const getFormattedDate = (id) => {
    const raw = document.getElementById(id)?.value;
    if (!raw) return "-";
    const [year, month, day] = raw.split("-");
    return `${day}/${month}/${year}`;
  };

  // 1. Kumpul data borang
  const formData = {
    NamaPenuh: getValue("nama_penuh"),
    Jantina: getValue("jantina"),
    NoPasport: getValue("no_pasport"),
    Warganegara: getValue("warganegara") === "OTHER" ? getValue("other_nationality_input") : getValue("warganegara"),
    NoPRPasKerja: getValue("no_pr"),
    TarikhMansuhPR: getFormattedDate("tarikh_mansuh_pr"),
    Email: getValue("email"),
    JenamaModel: getValue("jenama_model").toUpperCase(),
    NoEnjin: getValue("no_enjin"),
    NoRangka: getValue("no_rangka"),
    TahunDibentuk: getValue("tahun_dibentuk"),
    JenisBadan: getValue("jenis_badan").toUpperCase(),
    NoInsuran: getValue("no_insuran"),
    TarikhLuputInsuran: getFormattedDate("tarikh_luput_insuran"),
    AlamatMalaysia: getValue("alamat_malaysia"),
    TarikhTiba: getFormattedDate("tarikh_tiba")
  };

  // 2. Jana QR code (format: key=value;)
  const qrText = Object.entries(formData)
    .map(([key, value]) => `${key}=${value}`)
    .join(";");

  const qrCanvas = document.createElement('canvas');
  new QRious({
    element: qrCanvas,
    value: qrText,
    size: 100
  });

  // 3. Masukkan imej header & QR
  const headerImg = new Image();
  headerImg.src = "header.png";

  await new Promise(resolve => {
    headerImg.onload = () => {
      const contentWidth = pageWidth - 2 * marginLeft;

      const headerWidth = contentWidth * 0.75; // 65% ruang
      const headerHeight = (headerImg.height / headerImg.width) * headerWidth;

      const qrWidth = contentWidth * 0.30; // 25% ruang
      const qrX = pageWidth - marginLeft - qrWidth + 10; // <-- tambah +5 untuk gerakkan kanan

      doc.addImage(headerImg, 'PNG', marginLeft, 10, headerWidth, headerHeight);
      doc.addImage(qrCanvas.toDataURL("image/png"), 'PNG', qrX, 3, qrWidth, qrWidth);

      resolve();
    };
  });

  // 4. Fungsi bantu untuk seksyen & baris
  function sectionTitle(title) {
    y += 10;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, pageWidth / 2, y, { align: "center" });
    y += 2;
    doc.setLineWidth(0.5);
    doc.line(marginLeft, y, pageWidth - marginLeft, y);
    y += 6;
  }

  function row(labelKey, value) {
    const label = t[labelKey] || labelKey;
    const labelX = marginLeft + 10;
    const valueX = labelX + 65;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${label}:`, labelX, y);
    doc.text(value || '-', valueX, y);
    y += lineHeight - 1;
  }

  // 5. Isi borang PDF
  sectionTitle(t.section_applicant);
  row("full_name", formData.NamaPenuh);
  row("gender", formData.Jantina);
  row("passport_no", formData.NoPasport);
  row("nationality", formData.Warganegara);
  row("pr_number", formData.NoPRPasKerja);
  row("pr_expiry", formData.TarikhMansuhPR);
  row("email", formData.Email);

  sectionTitle(t.vehicle_info);
  row("brand_model", formData.JenamaModel);
  row("engine_no", formData.NoEnjin);
  row("chassis_no", formData.NoRangka);
  row("year_made", formData.TahunDibentuk);
  row("body_type", formData.JenisBadan);
  row("insurance_no", formData.NoInsuran);
  row("insurance_expiry", formData.TarikhLuputInsuran);

  sectionTitle(t.travel_info);
  const alamatLabel = t["malaysia_address"] + ":";
  const labelX = marginLeft + 10;
  const valueX = labelX + 65;
  // Label 'Alamat di Malaysia' – masih bold
doc.setFont("Helvetica", "bold");
doc.text(alamatLabel, labelX, y);

// Jawapan – guna font biasa
doc.setFont("Helvetica", "normal");
const alamatWrapped = doc.splitTextToSize(formData.AlamatMalaysia, pageWidth - valueX - marginLeft);
doc.text(alamatWrapped, valueX, y);
y += alamatWrapped.length * (lineHeight - 2);
  row("arrival_date", formData.TarikhTiba);

  // 6. Pengesahan & nota kaki
 // 📌 Tetapkan Y statik untuk pengesahan (cth: 250mm dari atas)
const staticYDeclaration = 250;
doc.setFont("Helvetica", "bold");
doc.setFontSize(11);
doc.text(t.declaration, marginLeft, staticYDeclaration, {
  maxWidth: pageWidth - 2 * marginLeft
});

// 📌 Tetapkan Y statik untuk disclaimer (cth: 265mm dari atas)
const staticYDisclaimer = 265;
doc.setFont("Helvetica", "normal");
doc.setFontSize(10);
doc.text(t.disclaimer, marginLeft, staticYDisclaimer, {
  maxWidth: pageWidth - 2 * marginLeft
});

  doc.text(`Tarikh Cetakan: ${new Date().toLocaleDateString("ms-MY")}`, pageWidth - marginLeft, 287, { align: "right" });

  // 7. Simpan fail
  const nama = formData.NamaPenuh.replace(/\s+/g, "_") || "borang";
  doc.save(`Borang_${nama}.pdf`);
}







