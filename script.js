// ===== IMPROVED JAVASCRIPT =====
// Fix untuk bug dan penambahbaikan yang dicadangkan

const translations = {
  ms: {
    section_applicant: "Maklumat Pemohon",
    full_name: "Nama Penuh",
    gender: "Jantina", 
    passport_no: "No Pasport",
    nationality: "Warganegara",
    specify_nationality: "Nyatakan Warganegara",
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
    expiry_date: "Tamat Tempoh :",
    error_required: "Ruangan ini wajib diisi",
    error_email: "Sila masukkan alamat e-mel yang sah",
    error_year: "Sila masukkan tahun yang sah",
    error_confirm: "Sila tandakan pengesahan sebelum menghantar",
    error_pr_required: "No PR/Pas Kerja diperlukan untuk warganegara Malaysia",
    error_pr_expiry_required: "Tarikh Mansuh PR diperlukan untuk warganegara Malaysia",
    processing: "Sedang memproses...",
    success: "Borang berjaya dijana!",
    help_confirm: "Pengesahan diperlukan sebelum menghantar",
    help_submit: "Klik untuk menjana dan memuat turun borang PDF",
    help_nama: "Masukkan nama penuh",
    help_jantina: "Pilih jantina yang berkenaan",
    help_pasport: "Contoh: A12345678",
    help_pr: "Wajib untuk warganegara Malaysia",
    help_pr_expiry: "Pilih tarikh tamat tempoh PR",
    help_email: "Contoh: nama@email.com",
    help_pendaftaran: "Contoh: ABC 1234",
    help_jenama: "Contoh: TOYOTA CAMRY",
    help_tahun: "Tahun pembuatan kenderaan",
    help_destinasi: "Alamat destinasi di Malaysia",
    help_insuran: "Pilih tarikh luput insuran"
  },
  en: {
    section_applicant: "Applicant Information",
    full_name: "Full Name",
    gender: "Gender",
    passport_no: "Passport No",
    nationality: "Nationality",
    specify_nationality: "Specify Nationality",
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
    expiry_date: "Expired Date :",
    error_required: "This field is required",
    error_email: "Please enter a valid email address",
    error_year: "Please enter a valid year",
    error_confirm: "Please check the confirmation before submitting",
    error_pr_required: "PR/Work Pass No is required for Malaysian citizens",
    error_pr_expiry_required: "PR Expiry Date is required for Malaysian citizens",
    processing: "Processing...",
    success: "Form generated successfully!",
    help_confirm: "Confirmation required before submitting",
    help_submit: "Click to generate and download PDF form",
    help_nama: "Enter full name",
    help_jantina: "Select the appropriate gender",
    help_pasport: "Example: A12345678",
    help_pr: "Required for Malaysian citizens",
    help_pr_expiry: "Select PR expiry date",
    help_email: "Example: name@email.com",
    help_pendaftaran: "Example: ABC 1234",
    help_jenama: "Example: TOYOTA CAMRY",
    help_tahun: "Year of vehicle manufacture",
    help_destinasi: "Destination address in Malaysia",
    help_insuran: "Select insurance expiry date"
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
  let isSubmitting = false;

  function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.replace(/[<>\"'&]/g, function(match) {
      const map = {'<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;'};
      return map[match];
    });
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 9999;
      padding: 15px 20px; border-radius: 5px; color: white;
      background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
      box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-weight: 500;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function setLoadingState(loading) {
    if (loading) {
      submitBtn.innerHTML = '⏳ ' + translations[currentLang].processing;
      submitBtn.disabled = true;
      isSubmitting = true;
    } else {
      submitBtn.innerHTML = translations[currentLang].submit;
      submitBtn.disabled = !confirmCheckbox.checked;
      isSubmitting = false;
    }
  }

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
    populateJantinaDropdown(lang);
  }

  function populateCountryList() {
    const countries = [
      "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANTIGUA AND BARBUDA", 
      "ARGENTINA", "ARMENIA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", 
      "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BHUTAN", "BOLIVIA", 
      "BOSNIA AND HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", 
      "BURUNDI", "CABO VERDE", "CAMBODIA", "CAMEROON", "CANADA", "CENTRAL AFRICAN REPUBLIC", 
      "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "CONGO (CONGO-BRAZZAVILLE)", 
      "COSTA RICA", "CROATIA", "CUBA", "CYPRUS", "CZECHIA", "DENMARK", "DJIBOUTI", "DOMINICA", 
      "DOMINICAN REPUBLIC", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", 
      "ESTONIA", "ESWATINI", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA", 
      "GEORGIA", "GERMANY", "GHANA", "GREECE", "GRENADA", "GUATEMALA", "GUINEA", "GUINEA-BISSAU", 
      "GUYANA", "HAITI", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", 
      "IRELAND", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", 
      "KIRIBATI", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", 
      "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MADAGASCAR", "MALAWI", "MALAYSIA", 
      "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MAURITANIA", "MAURITIUS", "MEXICO", 
      "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MOROCCO", "MOZAMBIQUE", 
      "MYANMAR (BURMA)", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW ZEALAND", "NICARAGUA", 
      "NIGER", "NIGERIA", "NORTH KOREA", "NORTH MACEDONIA", "NORWAY", "OMAN", "PAKISTAN", 
      "PALAU", "PALESTINE STATE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", 
      "POLAND", "PORTUGAL", "QATAR", "ROMANIA", "RUSSIA", "RWANDA", "SAINT KITTS AND NEVIS", 
      "SAINT LUCIA", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", 
      "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", 
      "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", 
      "SOUTH KOREA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWEDEN", 
      "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TIMOR-LESTE", 
      "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TUVALU", 
      "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "URUGUAY", 
      "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "YEMEN", "ZAMBIA", 
      "ZIMBABWE", "OTHER"
    ];
    
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
    defaultOption.disabled = true;
    defaultOption.selected = true;
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
    
    document.getElementById('no_pr').required = false;
    document.getElementById('tarikh_mansuh_pr').required = false;
    document.getElementById('other_nationality_input').required = false;
  }

  async function validateForm(e) {
    e.preventDefault();
    
    if (isSubmitting) return;

    const t = translations[currentLang];

    ['nama_penuh', 'no_pasport', 'destinasi'].forEach(id => {
      const field = document.getElementById(id);
      if (field && field.value) {
        field.value = sanitizeInput(field.value.toUpperCase());
      }
    });

    if (!confirmCheckbox.checked) {
      showToast(t.error_confirm, 'error');
      confirmCheckbox.focus();
      return;
    }

    const requiredFields = form.querySelectorAll('[required]');
    for (const field of requiredFields) {
      if (field.closest('.hidden-fields')?.style.display === 'none') continue;
      if (!field.value.trim()) {
        const label = form.querySelector(`label[for="${field.id}"]`);
        showToast(`${t.error_required}: ${label?.textContent || field.name}`, 'error');
        field.focus();
        return;
      }
    }

    const emailInput = document.getElementById('email');
    if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      showToast(t.error_email, 'error');
      emailInput.focus();
      return;
    }

    const tahunInput = document.getElementById('tahun_dibentuk');
    const tahunValue = parseInt(tahunInput?.value || '', 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(tahunValue) || tahunValue < 1900 || tahunValue > currentYear) {
      showToast(`${t.error_year} (1900-${currentYear})`, 'error');
      tahunInput.focus();
      return;
    }

    setLoadingState(true);

    try {
      await generatePDF();
      showToast(t.success, 'success');
      setTimeout(() => {
        form.reset();
        confirmCheckbox.checked = false;
        hideAllOptionalFields();
      }, 2000);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      showToast('Ralat semasa menjana PDF. Sila cuba lagi.', 'error');
    } finally {
      setLoadingState(false);
    }
  }

  langToggle.addEventListener('change', function () {
    currentLang = this.value;
    applyTranslation(currentLang);
  });

  warganegaraSelect.addEventListener('change', function () {
    hideAllOptionalFields();
    const noPrField = document.getElementById('no_pr');
    const tarikhMansuhPrField = document.getElementById('tarikh_mansuh_pr');
    
    if (this.value === 'MALAYSIA') {
      malaysianFields.style.display = 'block';
      noPrField.required = true;
      tarikhMansuhPrField.required = true;
    } else if (this.value === 'OTHER') {
      otherNationalityField.style.display = 'block';
      noPrField.required = false;
      tarikhMansuhPrField.required = false;
    } else {
      noPrField.required = false;
      tarikhMansuhPrField.required = false;
    }
  });

  confirmCheckbox.addEventListener('change', function () {
    if (!isSubmitting) {
      submitBtn.disabled = !this.checked;
    }
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
  try {
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
  } catch (error) {
    console.error('QR Code cropping error:', error);
    return qrCanvas;
  }
}

async function generatePDF() {
  try {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) throw new Error('jsPDF library not loaded');
    
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

    let tarikhTamat = "-";
    if (formData.TarikhTiba !== "-") {
      const [day, month, year] = formData.TarikhTiba.split("/");
      const arrivalDate = new Date(year, month - 1, day);
      const defaultExpiry = new Date(arrivalDate);
      defaultExpiry.setMonth(defaultExpiry.getMonth() + 3);

      function parseDate(dateStr) {
        if (!dateStr || dateStr === "-") return null;
        const parts = dateStr.split("/");
        if (parts.length !== 3) return null;
        const [d, m, y] = parts;
        const dt = new Date(y, m - 1, d);
        return isNaN(dt.getTime()) ? null : dt;
      }

      const prExpiryDate = parseDate(formData.TarikhMansuhPR);
      let finalExpiry = defaultExpiry;
      if (prExpiryDate && prExpiryDate < defaultExpiry) {
        finalExpiry = prExpiryDate;
      }

      const dd = String(finalExpiry.getDate()).padStart(2, "0");
      const mm = String(finalExpiry.getMonth() + 1).padStart(2, "0");
      const yyyy = finalExpiry.getFullYear();
      tarikhTamat = `${dd}/${mm}/${yyyy}`;
    }

    const now = new Date();
    const bulan = String(now.getMonth() + 1).padStart(2, '0');
    const tahun = String(now.getFullYear()).slice(-2);
    const randomID = Math.floor(100 + Math.random() * 900);
    const noPendaftaranClean = formData.NoPendaftaran.replace(/\s+/g, '').toUpperCase();
    const uniqueID = `JKDM/${bulan}/${randomID}${noPendaftaranClean}/${tahun}`;

    const qrDataOrdered = {
      NoBorang: uniqueID,
      TamatTempoh: tarikhTamat,
      ...formData
    };

    const qrText = Object.entries(qrDataOrdered)
      .map(([key, value]) => `${key}=${value}`)
      .join(";");

    const qrCanvasRaw = document.createElement('canvas');
    if (!window.QRious) throw new Error('QRious library not loaded');
    
    new QRious({ element: qrCanvasRaw, value: qrText, size: 120 });
    const qrCanvas = cropQRCodeCanvas(qrCanvasRaw);

    let yStart = 25;
    
    try {
      const headerImg = new Image();
      headerImg.src = "header.png";
      await new Promise((resolve, reject) => {
        headerImg.onload = () => {
          const headerWidth = pageWidth * 0.8;
          const headerX = (pageWidth - headerWidth) / 2;
          const headerHeight = (headerImg.height / headerImg.width) * headerWidth;
          doc.addImage(headerImg, 'PNG', headerX, 7, headerWidth, headerHeight);
          yStart = headerHeight + 15;
          resolve();
        };
        headerImg.onerror = () => {
          console.warn('Header image not found, continuing without it');
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(16);
          doc.text("BORANG PENDAFTARAN KENDERAAN", pageWidth/2, 20, { align: "center" });
          yStart = 30;
          resolve();
        };
        setTimeout(() => {
          console.warn('Header image load timeout');
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(16);
          doc.text("BORANG PENDAFTARAN KENDERAAN", pageWidth/2, 20, { align: "center" });
          yStart = 30;
          resolve();
        }, 5000);
      });
    } catch (error) {
      console.warn('Error loading header:', error);
    }

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
      doc.text(value || '-', x + 40, y);
      return y + lineHeight - 1;
    }

    let yLeft = sectionTitle(t.section_applicant, marginLeft, yStart);
    yLeft = row(t.full_name, formData.NamaPenuh, marginLeft, yLeft);
    yLeft = row(t.gender, formData.Jantina, marginLeft, yLeft);
    yLeft = row(t.passport_no, formData.NoPasport, marginLeft, yLeft);
    yLeft = row(t.nationality, formData.Warganegara, marginLeft, yLeft);
    yLeft = row(t.pr_number, formData.NoPRPasKerja, marginLeft, yLeft);
    yLeft = row(t.pr_expiry, formData.TarikhMansuhPR, marginLeft, yLeft);
    yLeft = row(t.email, formData.Email, marginLeft, yLeft);

    const qrSize = 50;
    const qrX = pageWidth - marginLeft - qrSize - 18;
    const qrY = yStart + (yLeft - yStart) / 2 - qrSize / 2 - 5;
    
    const labelX = qrX - 7;
    const valueX = qrX + qrSize + 7;
    const expiryY = qrY + qrSize + 12;
    const noBorangY = expiryY - 6;

    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.text("No Borang :", labelX, noBorangY);
    doc.setFont("Helvetica", "normal");
    doc.text(uniqueID, valueX, noBorangY, { align: "right" });

    doc.setFont("Helvetica", "bold");
    doc.text(t.expiry_date || "Tamat Tempoh:", labelX, expiryY);
    doc.setFont("Helvetica", "normal");
    doc.text(tarikhTamat, valueX, expiryY, { align: "right" });

    doc.addImage(qrCanvas.toDataURL("image/png"), 'PNG', qrX, qrY, qrSize, qrSize);

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

    const finalY = Math.max(yLeft2, yRight2) + 10;
    doc.setFont("Helvetica", "bold");
    doc.text(t.declaration, marginLeft, finalY, { maxWidth: pageWidth - marginLeft * 2 });
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text(t.disclaimer, marginLeft, finalY + 12, { maxWidth: pageWidth - marginLeft * 2 });

    doc.setFont("Helvetica", "bold");
    doc.setTextColor(200, 0, 0);
    doc.text(t.attention_note, marginLeft, finalY + 35, { maxWidth: pageWidth - marginLeft * 2 });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text(`Tarikh Cetakan: ${new Date().toLocaleDateString("ms-MY")}`, pageWidth - marginLeft, 287, { align: "right" });

    const nama = formData.NamaPenuh.replace(/\s+/g, "_") || "borang";
    doc.save(`Borang_${nama}.pdf`);
    
  } catch (error) {
    console.error('PDF Generation failed:', error);
    throw error;
  }
}