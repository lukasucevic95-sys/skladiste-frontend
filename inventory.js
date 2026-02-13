// Dummy test da vidimo radi li js i tabela
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("productsBody");
  tbody.innerHTML = "";

  const dummyProducts = [
    { barkod: "123456789012", naziv: "Jogurt 1L", kolicina: 20 },
    { barkod: "234567890123", naziv: "Mlijeko 2L", kolicina: 15 },
    { barkod: "345678901234", naziv: "Kruh bijeli", kolicina: 50 },
  ];

  dummyProducts.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.barkod}</td>
      <td>${p.naziv}</td>
      <td>${p.kolicina}</td>
    `;
    tbody.appendChild(tr);
  });
});
