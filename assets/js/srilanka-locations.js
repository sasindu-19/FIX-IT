/**
 * Sri Lanka Location Data
 * Provinces → Districts → Cities/Towns
 */
const SL_LOCATIONS = {
  "Western": {
    "Colombo": ["Colombo 1", "Colombo 2", "Colombo 3", "Colombo 4", "Colombo 5", "Colombo 6", "Colombo 7", "Dehiwala", "Mount Lavinia", "Maharagama", "Nugegoda", "Boralesgamuwa", "Homagama", "Kaduwela", "Kolonnawa", "Kesbewa", "Sri Jayawardenepura Kotte", "Moratuwa", "Ratmalana", "Piliyandala", "Hendala", "Wattala", "Kelaniya", "Peliyagoda"],
    "Gampaha": ["Gampaha", "Negombo", "Ja-Ela", "Wattala", "Ragama", "Kandana", "Kelaniya", "Minuwangoda", "Divulapitiya", "Veyangoda", "Mirigama", "Nittambuwa", "Ganemulla", "Kiribathgoda", "Kadawatha", "Ekala"],
    "Kalutara": ["Kalutara", "Panadura", "Beruwala", "Aluthgama", "Bandaragama", "Horana", "Ingiriya", "Bulathsinhala", "Agalawatta", "Matugama", "Wadduwa", "Payagala", "Katukurunda", "Dodangoda"]
  },
  "Central": {
    "Kandy": ["Kandy", "Peradeniya", "Katugastota", "Gampola", "Nawalapitiya", "Pilimathalawa", "Kundasale", "Wattegama", "Teldeniya", "Hasalaka", "Kadugannawa", "Gelioya", "Akurana", "Digana", "Weligalla"],
    "Matale": ["Matale", "Dambulla", "Sigiriya", "Rattota", "Ukuwela", "Laggala", "Pallepola", "Yatawatta", "Ambanganga Korale", "Naula", "Galewela"],
    "Nuwara Eliya": ["Nuwara Eliya", "Hatton", "Talawakele", "Ginigathhena", "Kotagala", "Maskeliya", "Norwood", "Ragala", "Walapane", "Ambagamuwa", "Kotmale"]
  },
  "Southern": {
    "Galle": ["Galle", "Hikkaduwa", "Ambalangoda", "Elpitiya", "Baddegama", "Karandeniya", "Yakkalamulla", "Neluwa", "Imaduwa", "Nagoda", "Habaraduwa", "Unawatuna", "Bentota"],
    "Matara": ["Matara", "Weligama", "Akuressa", "Dickwella", "Hakmana", "Mulatiyana", "Devinuwara", "Kamburupitiya", "Kotapola", "Pasgoda", "Thihagoda", "Mirissa", "Gandara", "Makandura"],
    "Hambantota": ["Hambantota", "Tangalle", "Tissamaharama", "Beliatta", "Weeraketiya", "Angunakolapelessa", "Ambalantota", "Middeniya", "Suriyawewa", "Sooriyawewa", "Lunugamvehera", "Kataragama"]
  },
  "Northern": {
    "Jaffna": ["Jaffna", "Nallur", "Chavakachcheri", "Point Pedro", "Kopay", "Tellippalai", "Karaveddy", "Manipay", "Kayts", "Chunnakam", "Kilinochchi (near)", "Alaveddy"],
    "Kilinochchi": ["Kilinochchi", "Paranthan", "Pallai", "Pooneryn", "Kandavalai", "Karachchi"],
    "Mannar": ["Mannar", "Madhu", "Nanattan", "Musali", "Murunkan", "Adampan"],
    "Mullaitivu": ["Mullaitivu", "Puthukkudiyiruppu", "Oddusuddan", "Manthai East", "Thunukkai", "Maritimepattu"],
    "Vavuniya": ["Vavuniya", "Cheddikulam", "Vavuniya South", "Vengalacheddikulam", "Padaviya"]
  },
  "Eastern": {
    "Trincomalee": ["Trincomalee", "Kantale", "Mutur", "Kinniya", "Seruvila", "Thambalagamuwa", "Kuchchaveli", "Morawewa", "Gomarankadawala"],
    "Batticaloa": ["Batticaloa", "Kalmunai", "Valaichchenai", "Eravur", "Kattankudy", "Paddippalai", "Manmunai North", "Manmunai South"],
    "Ampara": ["Ampara", "Kalmunai", "Sainthamaruthu", "Akkaraipattu", "Pottuvil", "Uhana", "Samanthurai", "Damana", "Lahugala", "Dehiattakandiya"]
  },
  "North Western": {
    "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Nikaweratiya", "Mawathagama", "Galgamuwa", "Polpithigama", "Narammala", "Ibbagamuwa", "Dambadeniya", "Pannala", "Wariyapola", "Hettipola", "Alawwa"],
    "Puttalam": ["Puttalam", "Chilaw", "Wennappuwa", "Marawila", "Nattandiya", "Dankotuwa", "Navakkuli", "Mundel", "Anamaduwa", "Mahawewa", "Kalpitiya"]
  },
  "North Central": {
    "Anuradhapura": ["Anuradhapura", "Kekirawa", "Medawachchiya", "Tambuttegama", "Eppawala", "Mihintale", "Nochchiyagama", "Galnewa", "Kahatagasdigiliya", "Padaviya", "Horowpothana"],
    "Polonnaruwa": ["Polonnaruwa", "Kaduruwela", "Medirigiriya", "Hingurakgoda", "Manampitiya", "Dimbulagala", "Thamankaduwa", "Welikanda", "Lankapura"]
  },
  "Uva": {
    "Badulla": ["Badulla", "Bandarawela", "Haputale", "Ella", "Welimada", "Passara", "Mahiyanganaya", "Lunugala", "Kandaketiya", "Hali-Ela", "Uva-Paranagama"],
    "Monaragala": ["Monaragala", "Wellawaya", "Bibile", "Medagama", "Buttala", "Siyambalanduwa", "Katharagama", "Madulla", "Sevanagala"]
  },
  "Sabaragamuwa": {
    "Ratnapura": ["Ratnapura", "Embilipitiya", "Balangoda", "Kahawatta", "Pelmadulla", "Kuruvita", "Eheliyagoda", "Ayagama", "Godakawela", "Imbulpe", "Kiriella", "Nivithigala"],
    "Kegalle": ["Kegalle", "Mawanella", "Ruwanwella", "Warakapola", "Rambukkana", "Aranayake", "Galigamuwa", "Bulathkohupitiya", "Deraniyagala", "Dehiowita", "Yatiyanthota"]
  }
};

/**
 * Populate a <select> element with options.
 * @param {HTMLSelectElement} selectEl
 * @param {string[]} options
 * @param {string} [placeholder]
 */
function populateSelect(selectEl, options, placeholder = 'Select...') {
  selectEl.innerHTML = `<option value="" disabled selected>${placeholder}</option>` +
    options.map(o => `<option value="${o}">${o}</option>`).join('');
}

/**
 * Initialize the cascading province → district → city dropdowns.
 * @param {string} provinceId
 * @param {string} districtId
 * @param {string} cityId
 * @param {Function} [onLocationChange] - callback(province, district, city)
 */
function initLocationDropdowns(provinceId, districtId, cityId, onLocationChange) {
  const provinceEl = document.getElementById(provinceId);
  const districtEl = document.getElementById(districtId);
  const cityEl     = document.getElementById(cityId);

  if (!provinceEl || !districtEl || !cityEl) return;

  // Populate provinces
  populateSelect(provinceEl, Object.keys(SL_LOCATIONS), 'Select Province');
  populateSelect(districtEl, [], 'Select District');
  populateSelect(cityEl,     [], 'Select City / Area');
  districtEl.disabled = true;
  cityEl.disabled     = true;

  provinceEl.addEventListener('change', () => {
    const districts = Object.keys(SL_LOCATIONS[provinceEl.value] || {});
    populateSelect(districtEl, districts, 'Select District');
    districtEl.disabled = districts.length === 0;
    populateSelect(cityEl, [], 'Select City / Area');
    cityEl.disabled = true;
    if (onLocationChange) onLocationChange(provinceEl.value, '', '');
  });

  districtEl.addEventListener('change', () => {
    const cities = SL_LOCATIONS[provinceEl.value]?.[districtEl.value] || [];
    populateSelect(cityEl, cities, 'Select City / Area');
    cityEl.disabled = cities.length === 0;
    if (onLocationChange) onLocationChange(provinceEl.value, districtEl.value, '');
  });

  cityEl.addEventListener('change', () => {
    if (onLocationChange) onLocationChange(provinceEl.value, districtEl.value, cityEl.value);
  });
}
