// ==========================
// FRONTEND INVENTORY.JS
// ==========================

const API_URL = "https://skladiste-app-production.up.railway.app";
const TOKEN = "TVOJ_STVARNI_TOKEN_OVDJE"; // <-- zamijeni sa stvarnim tokenom

const tbody = document.getElementById("productsBody");

async function loadProducts() {
  tbody.innerHTML = "<tr><td colspan='3'>Učitavanje proizvoda...</td></tr>";

  try {
    // Fetch proizvoda s backend-a
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`
      }
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const products = await res.json();

    // Ako nema proizvoda
    if (!products || products.length === 0) {
      tbody.innerHTML = "<tr><td colspan='3'>Nema proizvoda</td></tr>";
      return;
    }

    // Ispuni tablicu
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

  } catch (err) {
    console.error("Greška pri dohvaćanju proizvoda:", err);
    tbody.innerHTML = "<tr><td colspan='3'>Greška pri dohvaćanju proizvoda</td></tr>";
  }
}

// Pokreni odmah
loadProducts();
