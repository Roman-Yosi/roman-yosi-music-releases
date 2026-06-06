const releases = [
  {
    title: "Merenung Hari",
    date: "2026-06-07",
    isrc: "IDB772122770",
    upc: "8990009194188"
  },
  {
    title: "Keindahan Kota Rangkasbitung",
    date: "2026-06-06",
    upc: "5063964472592"
  },
  {
    title: "Rindu Tetap Sama",
    date: "2026-06-05",
    upc: "5063964472554"
  },
  {
    title: "Jejak Di Dada",
    date: "2026-06-04",
    upc: "5063964489545"
  },
  {
    title: "Suara Dalam Otak",
    date: "2026-06-04",
    upc: "5063964472424"
  },
  {
    title: "Setengah Cerita",
    date: "2026-06-02",
    upc: "5063964489293"
  }
];

function render(){
  let q = document.getElementById("search").value.toLowerCase();

  let html = releases
    .filter(r => r.title.toLowerCase().includes(q))
    .map(r => `
      <div class="card">
        <h3>${r.title}</h3>
        <div class="tag">Release Date: ${r.date}</div>
        <div class="tag">ISRC: ${r.isrc || "-"}</div>
        <div class="tag">UPC: ${r.upc || "-"}</div>
      </div>
    `).join("");

  document.getElementById("app").innerHTML = html;
}

render();
