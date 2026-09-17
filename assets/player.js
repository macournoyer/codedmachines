// Replaces the browser's audio controls with the site's own: a pad to play, a line to seek.
document.querySelectorAll("[data-player]").forEach(player => {
  const audio = player.querySelector("audio"), play = player.querySelector(".play");
  const seek = player.querySelector(".seek"), time = player.querySelector(".time");
  const fmt = s => isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";
  let seeking = false;

  audio.removeAttribute("controls");
  player.classList.add("ready");

  const draw = () => {
    const at = seeking ? seek.value / 1000 * audio.duration : audio.currentTime;
    time.textContent = audio.duration ? `${fmt(at)} / ${fmt(audio.duration)}` : fmt(at);
    if (!seeking && audio.duration) seek.value = audio.currentTime / audio.duration * 1000;
    seek.style.setProperty("--at", `${seek.value / 10}%`);
  };

  play.addEventListener("click", () => {
    if (!audio.paused) return audio.pause();
    // One song at a time.
    document.querySelectorAll("[data-player] audio").forEach(other => other !== audio && other.pause());
    audio.play().catch(e => e.name !== "AbortError" && fail());
  });
  audio.addEventListener("play", () => { player.classList.add("playing"); play.setAttribute("aria-label", play.getAttribute("aria-label").replace("Play", "Pause")); });
  audio.addEventListener("pause", () => { player.classList.remove("playing"); play.setAttribute("aria-label", play.getAttribute("aria-label").replace("Pause", "Play")); });
  ["timeupdate", "loadedmetadata", "durationchange", "ended"].forEach(e => audio.addEventListener(e, draw));
  // Say so when the file can't be loaded or played, rather than sitting silent.
  const fail = () => { player.classList.remove("playing"); player.classList.add("failed"); time.textContent = "Can't play this file"; };
  audio.addEventListener("error", fail);
  seek.addEventListener("input", () => { seeking = true; draw(); });
  seek.addEventListener("change", () => { if (audio.duration) audio.currentTime = seek.value / 1000 * audio.duration; seeking = false; draw(); });
  draw();
});
