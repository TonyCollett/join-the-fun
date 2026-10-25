// Grown-up options shared by the hub page and every game, kept in localStorage:
// how long each round lasts, and how much play time is allowed per day.
//
//   ParentSettings.get()              // { roundMinutes, dailyMinutes } (0 = no daily limit)
//   ParentSettings.set({ roundMinutes: 3 });
//   ParentSettings.roundSeconds();
//   ParentSettings.secondsLeftToday(); // Infinity when there's no daily limit
//   ParentSettings.canPlay();
//   ParentSettings.addPlayTime(dt);    // RoundTimer calls this while a round runs
//   ParentSettings.lock(delay);        // games: block input, then show "all done for today"
const ParentSettings = (() => {
  const SETTINGS_KEY = "joinTheFunSettings";
  const PLAYED_KEY = "joinTheFunPlayed";
  const DEFAULTS = { roundMinutes: 2, dailyMinutes: 0 };
  const HOME = new URL("../index.html", document.currentScript.src).href;

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
  }

  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function get() {
    const saved = read(SETTINGS_KEY);
    const round = Number(saved.roundMinutes);
    const daily = Number(saved.dailyMinutes);
    return {
      roundMinutes: round > 0 ? round : DEFAULTS.roundMinutes,
      dailyMinutes: daily >= 0 ? daily : DEFAULTS.dailyMinutes,
    };
  }

  function set(changes) {
    write(SETTINGS_KEY, { ...get(), ...changes });
  }

  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  // Play time is saved about once a second; `pending` holds what hasn't been saved yet.
  let pending = 0;

  function playedToday() {
    const saved = read(PLAYED_KEY);
    return (saved.date === today() ? Number(saved.seconds) || 0 : 0) + pending;
  }

  function flush() {
    if (!pending) return;
    const seconds = playedToday();
    pending = 0;
    write(PLAYED_KEY, { date: today(), seconds });
  }

  function addPlayTime(dt) {
    pending += dt;
    if (pending >= 1) flush();
  }

  function resetToday() {
    pending = 0;
    write(PLAYED_KEY, { date: today(), seconds: 0 });
  }

  function secondsLeftToday() {
    const { dailyMinutes } = get();
    if (!dailyMinutes) return Infinity;
    return Math.max(0, dailyMinutes * 60 - playedToday());
  }

  function canPlay() {
    return secondsLeftToday() >= 1;
  }

  function roundSeconds() {
    return get().roundMinutes * 60;
  }

  // ---------- "All done for today" screen for the games ----------

  let locked = false, screen = null;

  function blockInput(e) {
    if (screen && screen.contains(e.target)) return;
    if (/^F\d+$/.test(e.key)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function showScreen() {
    if (screen) return;
    const style = document.createElement("style");
    style.textContent = `
      .all-done-today {
        position: fixed; inset: 0; z-index: 100;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 24px; padding: 16px; text-align: center; color: #fff;
        font-family: Fredoka, "Comic Sans MS", "Chalkboard SE", system-ui, sans-serif;
        background: linear-gradient(#0b0726, #3a1d6e);
      }
      .all-done-today .moon { font-size: clamp(5rem, 18vw, 10rem); line-height: 1; }
      .all-done-today h1 { margin: 0; font-size: clamp(2.5rem, 9vw, 6rem); }
      .all-done-today p { margin: 0; font-size: clamp(1.3rem, 4vw, 2.2rem); }
      .all-done-today a {
        margin-top: 16px; padding: 14px 28px; border-radius: 999px;
        background: #fff; color: #3a2e5c; text-decoration: none;
        font-size: clamp(1.2rem, 3.5vw, 1.8rem); font-weight: bold;
      }`;
    document.head.appendChild(style);
    screen = document.createElement("div");
    screen.className = "all-done-today";
    screen.innerHTML = `
      <div class="moon">🌙</div>
      <h1>All done for today!</h1>
      <p>Come back tomorrow to play again.</p>
      <a href="${HOME}">🏠 Back to games</a>`;
    document.body.appendChild(screen);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    // If the page is left open overnight, start fresh in the morning.
    setInterval(() => { if (canPlay()) location.reload(); }, 60000);
  }

  function lock(delay = 0) {
    if (!locked) {
      locked = true;
      for (const type of ["keydown", "keyup", "pointerdown", "pointerup", "mousedown", "touchstart", "click"]) {
        addEventListener(type, blockInput, { capture: true, passive: false });
      }
    }
    setTimeout(showScreen, delay * 1000);
  }

  addEventListener("pagehide", flush);

  return { get, set, playedToday, resetToday, secondsLeftToday, canPlay, roundSeconds, addPlayTime, flush, lock };
})();
