const API_URL = "https://skladiste-app-production.up.railway.app";
const TOKEN = "TVOJ_TOKEN_OVDJE"; // zamijeni s tvojim tokenom

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

// Kamera i barkod
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
}).catch(err => console.error(err));

// Pretraži barkod
scanBtn.addEventListener("click", async () => {
  const barkod = barkodInput.value.trim();
  if (!barkod) return;

  try {
    const res = await fetch(`${API_URL}/product/${barkod}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
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
    console.error(err);
    message
