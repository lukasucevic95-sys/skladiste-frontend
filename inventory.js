const API_URL = "https://skladiste-app-production.up.railway.app";
const TOKEN = "TVOJ_TOKEN_OVDJE";

async function loadProducts() {
  const tbody = document.getElementById("productsBody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    const products = await res.json();

    if (products.length === 0) {
      tbody.innerHTML = "<tr><td colspan='3'>Nema proizvoda</td></tr>";
      return;
    }

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
    tbody.innerHTML = "<tr><td colspan='3'>Greška pri dohvaćanju proizvoda</td></tr>";
    console.error(err);
  }
}

loadProducts();
