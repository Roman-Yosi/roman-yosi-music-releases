async function loadReleases() {
  try {
    const response = await fetch("data/releases.json");
    const releases = await response.json();

    const container = document.getElementById("app");

    if (!container) return;

    container.innerHTML = releases.map(release => `
      <div class="card">
        <h3>${release.title}</h3>
        <p><strong>Artis:</strong> ${release.artist || "Roman Yosi"}</p>
        <p><strong>Tanggal Rilis:</strong> ${release.release_date || "-"}</p>
        <p><strong>Genre:</strong> ${release.genre || "-"}</p>
        <p><strong>ISRC:</strong> ${release.isrc || "-"}</p>
        <p><strong>UPC:</strong> ${release.upc || "-"}</p>
        <p><strong>Label:</strong> ${release.label || "Roman Yosi Music"}</p>
      </div>
    `).join("");

    // Simpan data untuk pencarian
    window.allReleases = releases;

  } catch (error) {
    console.error(error);
    document.getElementById("app").innerHTML =
      "<p>Gagal memuat data rilisan.</p>";
  }
}

function searchReleases() {
  const keyword = document
    .getElementById("search")
    .value
    .toLowerCase();

  const filtered = window.allReleases.filter(release =>
    release.title.toLowerCase().includes(keyword)
  );

  const container = document.getElementById("app");

  container.innerHTML = filtered.map(release => `
    <div class="card">
      <h3>${release.title}</h3>
      <p><strong>Artis:</strong> ${release.artist || "Roman Yosi"}</p>
      <p><strong>Tanggal Rilis:</strong> ${release.release_date || "-"}</p>
      <p><strong>Genre:</strong> ${release.genre || "-"}</p>
      <p><strong>ISRC:</strong> ${release.isrc || "-"}</p>
      <p><strong>UPC:</strong> ${release.upc || "-"}</p>
      <p><strong>Label:</strong> ${release.label || "Roman Yosi Music"}</p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadReleases();

  const searchBox = document.getElementById("search");

  if (searchBox) {
    searchBox.addEventListener("input", searchReleases);
  }
});
