// Analog countdown clock drawn at the top-centre of a game's canvas.
// A coloured wedge shows the time left; the hand sweeps clockwise and eats
// it, turning green -> yellow -> red, and the clock pulses each second
// for the last ten seconds.
//
//   const timer = new RoundTimer(120);
//   timer.onSecond = (s) => ...;  // called at 10, 9, ... 1 seconds left
//   timer.onEnd = () => ...;
//   timer.start();
//   timer.update(dt); timer.draw(ctx, W, H);
class RoundTimer {
  constructor(seconds = 120) {
    this.total = seconds;
    this.left = seconds;
    this.running = false;
    this.onSecond = null;
    this.onEnd = null;
  }

  start() {
    this.left = this.total;
    this.running = true;
  }

  update(dt) {
    if (!this.running) return;
    const before = Math.ceil(this.left);
    this.left = Math.max(0, this.left - dt);
    const after = Math.ceil(this.left);
    if (after !== before && after > 0 && after <= 10 && this.onSecond) this.onSecond(after);
    if (this.left === 0) {
      this.running = false;
      if (this.onEnd) this.onEnd();
    }
  }

  draw(ctx, W, H) {
    const R = Math.max(30, Math.min(55, Math.min(W, H) * 0.065));
    const frac = this.left / this.total;
    const color = frac > 0.5 ? "#7ae582" : frac > 0.2 ? "#ffb627" : "#ff5d73";
    const ink = "#3a2e5c";
    const pulse = this.left > 0 && this.left <= 10 ? 1 + 0.12 * (this.left % 1) ** 2 : 1;
    const hand = -Math.PI / 2 + (1 - frac) * Math.PI * 2;

    ctx.save();
    ctx.translate(W / 2, 14 + R);
    ctx.scale(pulse, pulse);

    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = "transparent";

    if (frac > 0) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R * 0.86, hand, Math.PI * 1.5);
      ctx.closePath();
      ctx.fill();
    }

    ctx.strokeStyle = ink;
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(2, R * 0.05);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const inner = i % 3 === 0 ? 0.74 : 0.84;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * R * inner, Math.sin(a) * R * inner);
      ctx.lineTo(Math.cos(a) * R * 0.92, Math.sin(a) * R * 0.92);
      ctx.stroke();
    }

    ctx.lineWidth = R * 0.08;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(hand) * R * 0.78, Math.sin(hand) * R * 0.78);
    ctx.stroke();

    ctx.fillStyle = ink;
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
