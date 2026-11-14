/* TOLO BIRR purple-neon look (load LAST). Presentation only: game art for tiles + win cards.
   Art files live in /tp (cut from the approved BetPro reference design). */
(function () {
  "use strict";
  var K = { boom: "boom", aviator: "aviator", mines: "mines", plinko: "plinko", jet: "jet", dice2: "dice2", dice: "dice", keno: "keno", fastkeno: "superkeno",
    bingo: "bingo", roulette: "roulette", wheel: "wheel", rabbit: "rabbit", chicken: "chicken", chicken2: "chicken2", fish: "fish", slot: "slot",
    triplegold: "triplegold", blackjack: "blackjack", baccarat: "baccarat", card: "cardtable", dragontiger: "dragontiger", andarbahar: "andarbahar",
    coinstreak: "coinflip", number: "loto7", buffalo: "safari", aztec: "royalcoins", flame: "topfire", tower: "megawin", roast: "chicken",
    crash: "crash", highflyer: "highflyer", skymasters: "skymasters", rocket: "rocket", keno_power: "powerkeno", keno_super: "superkeno" };
  function fileFor(key) {
    key = String(key || "").toLowerCase();
    if (K[key]) return K[key];
    if (/^slot_\d+$/.test(key)) return "slot";
    return null;
  }
  function url(f) { return "tp/t_" + f + ".jpg"; }

  // win cards / slides ask for a cover by game key: give them the reference art
  var prev = window.kdmCover;
  window.kdmCover = function (key, icon) {
    var f = fileFor(key);
    return f ? url(f) : (prev ? prev(key, icon) : null);
  };

  function tiles() {
    var G = typeof GAMES !== "undefined" ? GAMES : [];
    document.querySelectorAll("#game-grid .game-card").forEach(function (card) {
      var n = card.querySelector(".game-name"); if (!n) return;
      var name = n.textContent.trim();
      var g = G.find(function (x) { return x.name === name; });
      var f = g && fileFor(g.key);
      if (!f) return;
      var u = "url(" + url(f) + ")";
      if (card.style.getPropertyValue("--tp-art") !== u) card.style.setProperty("--tp-art", u);
      card.classList.add("tp-art");
    });
  }
  function watch() {
    var g = document.getElementById("game-grid");
    if (!g) return setTimeout(watch, 400);
    if (g.dataset.tpw) return; g.dataset.tpw = "1";
    var q = false;
    new MutationObserver(function () { if (q) return; q = true; requestAnimationFrame(function () { q = false; tiles(); }); }).observe(g, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    tiles();
  }
  watch();
})();
