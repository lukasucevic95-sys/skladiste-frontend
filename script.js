// ==========================
// FRONTEND SCRIPT.JS
// ==========================

const API_URL = "https://skladiste-app-production.up.railway.app";
const TOKEN = "TVOJ_STVARNI_TOKEN_OVDJE"; // <-- zamijeni sa stvarnim tokenom

// ELEMENTI
const barkodInput = document.getElementById("barkodInput");
const scanBtn = document.getElementById("scanBtn");
const productInfo = document.getElementById("productInfo");
const nazivEl = document.getElementById("nazivSpan");
const kolicinaEl = document.getElementById("kolicinaSpan");
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const messageEl = document.getElementById("message");

const newBarkod = document.getElementById("newBarkod");
const newNaziv = document.getElementById("newNaziv");
const newKolicina = document.getElementById("newKolicina");
const addProductBtn = document.getElementById("addProductBtn");

let currentBarkod = "";

// ==========================
// KAMERA I BARKOD
// ==========================
const html5QrCode = new Html5Qrcode("video");
Html5Qrcode.getCameras().then(cameras => {
  if (cameras && cameras.length) {
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      decodedText => {
        barkodInput.value = decodedText;
        scanBtn.click();
      },
      errorMessage => {}
    );
  }
}).catch(err => console.error("Kamera greška:", err));

// ==========================
// PRETRAŽI BARKOD
// ==========================
scanBtn.addEventListener("click", async () => {
  const barkod = barkodInput.value.trim();
  if (!barkod) return;

  try {
    const res = await fetch(`${API_URL}/product/${barkod}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    if (!data.postoji) {
      productInfo.classList.add("hidden");
      messageEl.innerText = "Proizvod ne postoji!";
      return;
    }

    currentBarkod = barkod;
    nazivEl.innerText = data.naziv;
    kolicinaEl.innerText = data.kolicina;
    productInfo.classList.remove("hidden");
    messageEl.innerText = "";
  } catch (err) {
    console.error("Greška pri dohvaćanju proizvoda:", err);
    messageEl.innerText = "Greška pri dohvaćanju proizvoda!";
  }
});

// ==========================
// DODAJ KOLIČINU
// ==========================
addBtn.addEventListener("click", async () => {
  if (!currentBarkod) return;

  try {
    const res = await fetch(`${API_URL}/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ barkod: currentBarkod, delta: 1 })
    });
    const data = await res.json();
    kolicinaEl.innerText = data.kolicina;
  } catch (err) {
    console.error(err);
    messageEl.innerText = "Greška pri dodavanju količine!";
  }
});

// ==========================
// ODUZMI KOLIČINU
// ==========================
removeBtn.addEventListener("click", async () => {
  if (!currentBarkod) return;

  try {
    const res = await fetch(`${API_URL}/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ barkod: currentBarkod, delta: -1 })
    });
    const data = await res.json();
    kolicinaEl.innerText = data.kolicina;
  } catch (err) {
    console.error(err);
    messageEl.innerText = "Greška pri oduzimanju količine!";
  }
});

// ==========================
// DODAJ NOVI PROIZVOD
// ==========================
addProductBtn.addEventListener("click", async () => {
  const barkod = newBarkod.value.trim();
  const naziv = newNaziv.value.trim();
  const kolicina = parseInt(newKolicina.value);

  if (!barkod || !naziv || isNaN(kolicina)) {
    messageEl.innerText = "Popuni sve podatke!";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "applica
