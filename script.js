let allReleases = [];

async function loadReleases() {
  try {
    const response = await fetch(
      `data/releases.json?v=${Date.now()}`
    );

    if (!response.ok) {
      throw new Error("Gagal memuat database rilisan");
    }

    const releases = await response.json();

    // Urutkan berdasarkan tanggal terbaru
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

      <p><strong>Tanggal Rilis:</strong>
      ${release.release_date || "-"}</p>

      <p><strong>Genre:</strong>
      ${release.genre || "-"}</p>

      <p><strong>ISRC:</strong>
      ${release.isrc || "-"}</p>

      <p><strong>UPC:</strong>
      ${release.upc || "-"}</p>

      <p><strong>Label:</strong>
      ${release.label || "Roman Yosi Music"}</p>

    </div>
  `).join("");

  container.innerHTML = html;
}

function searchReleases() {

  const keyword = document
    .getElementById("search")
    .value
    .trim()
    .toLowerCase();

  const filtered = allReleases.filter(release => {

    const title = (release.title || "")
      .toLowerCase();

    const artist = (release.artist || "")
      .toLowerCase();

    return (
      title.includes(keyword) ||
      artist.includes(keyword)
    );
  });

  renderReleases(filtered);
}

document.addEventListener("DOMContentLoaded", () => {

  loadReleases();

  const searchBox =
    document.getElementById("search");

  if (searchBox) {
    searchBox.addEventListener(
      "input",
      searchReleases
    );
  }
});
