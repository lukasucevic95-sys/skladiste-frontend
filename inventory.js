// ==========================
// INVENTORY.JS – TESTIRANI
// ==========================

// Ako želiš odmah testirati frontend bez backend problema
const tbody = document.getElementById("productsBody");

// Dummy proizvodi (za test)
const dummyProducts = [
  { barkod: "123456789012", naziv: "Jogurt 1L", kolicina: 20 },
  { barkod: "234567890123", naziv: "Mlijeko 2L", kolicina: 15 },
  { barkod: "345678901234", naziv: "Kruh bijeli", kolicina: 50 },
];

// Funkcija za prikaz proizvoda
function displayProducts(products) {
  tbody.innerHTML = "";
  products.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.barkod}</td>
      <td>${p.naziv}</td>
      <td>${p.kolicina}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Prvo pokaži dummy proizvode
displayProducts(dummyProducts);

// ==========================
// FETCH STVARNIH PROIZVODA – opcionalno
// ==========================

// Ako želiš koristiti backend, odkomentiraj i stavi svoj token i endpoint

/*
const API_URL = "https://skladiste-app-production.up.railway.app";
const TOKEN = "TVOJ_TOKEN_OVDJE";

async function loadProductsFromBackend() {
  tbody.innerHTML = "<tr><td colspan='3'>Učitavanje proizvoda...</td></tr>";
  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const products = await res.json();
    if (!products || products.length === 0) {
      tbody.innerHTML = "<tr><td colspan='3'>Nema proizvoda</td></tr>";
      return;
    }
    displayProducts(products);
  } catch (err) {
    console.error("Greška pri dohvaćanju proizvoda:", err);
    tbody.innerHTML = "<tr><td colspan='3'>Greška pri dohvaćanju proizvoda</td></tr>";
  }
}

// loadProductsFromBackend();
*/

