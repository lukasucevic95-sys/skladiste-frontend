const API_URL = "https://skladiste-app-production.up.railway.app";

async function loadProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();

    const tbody = document.getElementById("productsBody");
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
    alert("Greška pri dohvaćanju proizvoda");
    console.error(err);
  }
}

loadProducts();
