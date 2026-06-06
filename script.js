let allReleases = [];

/* =========================
   LOAD RELEASES
========================= */
async function loadReleases() {
  try {
    const response = await fetch(
      `data/releases.json?v=${Date.now()}`
    );

    if (!response.ok) {
      throw new Error("Gagal memuat database rilisan");
    }

    const releases = await response.json();

    allReleases = releases.sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    });

    renderReleases(allReleases);

  } catch (error) {
    console.error(error);

    document.getElementById("app").innerHTML = `
      <div class="card">
        <h3>Terjadi Kesalahan</h3>
        <p>Data rilisan tidak dapat dimuat.</p>
      </div>
    `;
  }
}

/* =========================
   RENDER RELEASES
========================= */
function renderReleases(releases) {
  const container = document.getElementById("app");

  if (!releases.length) {
    container.innerHTML = `
      <div class="card">
        <h3>Tidak Ada Hasil</h3>
        <p>Tidak ditemukan rilisan yang cocok.</p>
      </div>
    `;
    return;
  }

  let html = `
    <div class="card">
      <strong>Total Rilisan: ${releases.length}</strong>
    </div>
  `;

  html += releases.map(release => `
    <div class="card">
      <h2>${release.title}</h2>

      <p><strong>Artis:</strong> ${release.artist || "Roman Yosi"}</p>
      <p><strong>Tanggal Rilis:</strong> ${release.release_date || "-"}</p>
      <p><strong>Genre:</strong> ${release.genre || "-"}</p>
      <p><strong>ISRC:</strong> ${release.isrc || "-"}</p>
      <p><strong>UPC:</strong> ${release.upc || "-"}</p>
      <p><strong>Label:</strong> ${release.label || "Roman Yosi Music"}</p>
    </div>
  `).join("");

  container.innerHTML = html;
}

/* =========================
   SEARCH FUNCTION
========================= */
function searchReleases() {
  const keyword = document
    .getElementById("search")
    .value
    .trim()
    .toLowerCase();

  const filtered = allReleases.filter(release => {
    return (
      (release.title || "").toLowerCase().includes(keyword) ||
      (release.artist || "").toLowerCase().includes(keyword)
    );
  });

  renderReleases(filtered);
}

/* =========================
   README AUTO GENERATOR
========================= */
function loadReadme() {
  const container = document.querySelector(".container");

  const readme = document.createElement("section");
  readme.className = "readme";

  readme.innerHTML = `
    <h2>README</h2>

    <p>
      Roman Yosi Music Releases adalah database musik independen
      yang mendokumentasikan seluruh rilisan Roman Yosi secara
      terstruktur seperti MusicBrainz.
    </p>

    <h3>Informasi Artis</h3>
    <ul>
      <li><strong>Nama Panggung:</strong> Roman Yosi</li>
      <li><strong>Nama Asli:</strong> Rohman</li>
      <li><strong>Genre:</strong> Pop, Indie Pop, Indonesian Pop</li>
      <li><strong>Label:</strong> Roman Yosi Music</li>
    </ul>

    <h3>Tujuan Website</h3>
    <p>
      Website ini dibuat untuk katalog digital, metadata musik,
      dan arsip resmi rilisan Roman Yosi di platform streaming.
    </p>
  `;

  container.insertBefore(readme, container.firstChild);
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadReadme();
  loadReleases();

  const searchBox = document.getElementById("search");

  if (searchBox) {
    searchBox.addEventListener("input", searchReleases);
  }
});
