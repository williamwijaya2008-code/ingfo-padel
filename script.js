/* ===== PENGATURAN: ubah di sini saja, halaman ikut berubah ===== */
var CONFIG = {
  name: "Ingfo Padel Vol. 2",
  dateText: "",                       // contoh: "Sabtu–Minggu, 16–17 Januari 2027". Kosong = "Tanggal segera diumumkan"
  venue: "Padel Ground, Semarang",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Padel+Ground+Semarang",
  deadlineText: "",                   // contoh: "6 Januari 2027". Kosong = tanpa tanggal
  feeText: "",                        // contoh: "Rp750.000 / pasangan". Kosong = "Diumumkan panitia"
  waNumber: "6285742600114",          // format internasional tanpa +
  waDisplay: "0857-4260-0114",
  bank: { name: "BCA", number: "", holder: "" }   // isi number dan holder bila sudah ada
};
/* ================================================================ */
(function () {
  function $(id) { return document.getElementById(id); }
  var tbd = function (t) { return '<span class="tbd">' + t + '</span>'; };

  $("fDate").innerHTML = CONFIG.dateText ? CONFIG.dateText : tbd("Tanggal segera diumumkan");
  var v = $("fVenue"); v.textContent = CONFIG.venue; v.href = CONFIG.mapsUrl;
  $("deadlineLine").textContent = CONFIG.deadlineText
    ? "Pendaftaran ditutup " + CONFIG.deadlineText + " atau saat kuota penuh."
    : "Isi data pasangan, lalu kirim pesan pendaftaran ke WhatsApp panitia.";
  $("feeVal").innerHTML = CONFIG.feeText ? CONFIG.feeText : tbd("Diumumkan panitia");
  $("waShow").textContent = CONFIG.waDisplay;
  $("waFaq").textContent = CONFIG.waDisplay;
  $("waFoot").textContent = CONFIG.waDisplay;
  $("fFoot").textContent = CONFIG.venue + (CONFIG.dateText ? " · " + CONFIG.dateText : "");

  var b = CONFIG.bank;
  $("pay").innerHTML = '<h4>Pembayaran</h4>' + (b.number
    ? '<div>Transfer ' + b.name + '</div><div class="acc">' + b.number + '</div><div>a.n. ' + (b.holder || "") + '</div>'
    : '<div>Transfer ' + b.name + '. Nomor rekening dikirim panitia lewat WhatsApp setelah kamu mendaftar.</div>');

  var out = $("out"), err = $("err");
  var original = out.innerHTML;
  $("regForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var p1 = $("p1").value.trim(), p2 = $("p2").value.trim(), wa = $("wa").value.trim();
    if (!p1 || !p2) { err.textContent = "Isi nama kedua pemain."; return; }
    if (!/^(\+62|62|0)8\d{7,12}$/.test(wa.replace(/[\s-]/g, ""))) { err.textContent = "Nomor WhatsApp belum benar. Contoh: 081200001234."; return; }
    err.textContent = "";
    var msg = "Halo panitia " + CONFIG.name + ". Saya ingin mendaftar.\n" +
      "Kategori: Ganda Putra\nPemain 1: " + p1 + "\nPemain 2: " + p2 + "\nWhatsApp: " + wa;
    var link = "https://wa.me/" + CONFIG.waNumber + "?text=" + encodeURIComponent(msg);
    out.innerHTML = '<h3>Pesan siap dikirim</h3><p>Tekan tombol hijau untuk membuka WhatsApp dengan pesan yang sudah terisi. Kamu baru terdaftar setelah panitia mengonfirmasi.</p>' +
      '<pre id="msg"></pre><div class="acts"><a class="btn wa small" id="waBtn" target="_blank" rel="noopener">Kirim lewat WhatsApp</a><button type="button" class="btn small ghost" id="copyBtn">Salin pesan</button><button type="button" class="btn small ghost" id="backBtn">Kembali</button></div>' +
      '<div style="margin-top:8px;font-size:14px;color:var(--ink-2)" id="copyNote"></div><div class="pay">' + $("pay").innerHTML + '</div>';
    $("msg").textContent = msg;
    $("waBtn").href = link;
    $("backBtn").addEventListener("click", function () { out.innerHTML = original; });
    $("copyBtn").addEventListener("click", function () {
      var note = $("copyNote");
      function manual() {
        var r = document.createRange(); r.selectNodeContents($("msg"));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        note.textContent = "Teks terpilih. Tekan Ctrl+C atau tahan lalu salin.";
      }
      try { navigator.clipboard.writeText(msg).then(function () { note.textContent = "Tersalin."; }, manual); }
      catch (x) { manual(); }
    });
  });
})();
