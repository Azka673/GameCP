// ===== MAIN.JS =====
// Entry point: whirlpool intro → main menu

(function () {
  // ============================================================
  //  WHIRLPOOL INTRO
  // ============================================================
  const cvs = document.getElementById('wpCvs');
  const ctx = cvs.getContext('2d');
  let t = 0;

  // Style the whirlpool canvas
  cvs.style.borderRadius = '50%';
  cvs.style.boxShadow    = '0 0 50px #00ffcc, 0 0 100px #0088ff';

  function drawWhirlpool() {
    ctx.clearRect(0, 0, 260, 260);
    ctx.save();
    ctx.translate(130, 130);

    for (let i = 0; i < 7; i++) {
      const r    = 15 + i * 18;
      const spd  = (7 - i) * 0.035;
      const ang  = t * spd;
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.04) {
        const ri = r + Math.sin(a * 5 + t * 1.8) * 7;
        const px = Math.cos(a + ang) * ri;
        const py = Math.sin(a + ang) * ri * 0.45;
        a === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle   = `hsla(${170 + i * 18},75%,55%,${0.1 + i * 0.08})`;
      ctx.fill();
      ctx.strokeStyle = `hsla(${170 + i * 18},85%,75%,${0.15 + i * 0.1})`;
      ctx.lineWidth   = 1;
      ctx.stroke();
    }

    // Center glow
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
    g.addColorStop(0, 'rgba(0,255,200,.95)');
    g.addColorStop(1, 'rgba(0,100,255,0)');
    ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();

    ctx.restore();
    t += 0.055;

    if (t < 7) {
      requestAnimationFrame(drawWhirlpool);
    } else {
      // Fade out
      const wp = document.getElementById('whirlpool');
      wp.style.transition = 'opacity .9s';
      wp.style.opacity    = '0';
      setTimeout(() => {
        wp.style.display = 'none';
        _showMenu();
      }, 900);
    }
  }

  drawWhirlpool();

  // ============================================================
  //  MENU PARTICLES
  // ============================================================
  function _showMenu() {
    const menu = document.getElementById('mainMenu');
    menu.style.display = 'flex';
    _spawnParticles();
  }

  function _spawnParticles() {
    const bg = document.getElementById('menuBg');
    for (let i = 0; i < 35; i++) {
      const p    = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const hue  = Math.random() > .5 ? `0,${Math.floor(Math.random()*155+100)},${Math.floor(Math.random()*155+100)}`
                                       : `${Math.floor(Math.random()*55+170)},${Math.floor(Math.random()*55+150)},255`;
      p.className = 'menuParticle';
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%; top:${Math.random()*100}%;
        background:rgba(${hue},${Math.random()*.6+.2});
        animation-duration:${Math.random()*8+6}s;
        animation-delay:${Math.random()*4}s;`;
      bg.appendChild(p);
    }
  }

  // ============================================================
  //  CANVAS RESIZE
  // ============================================================
  window.addEventListener('resize', () => {
    const gc = document.getElementById('gc');
    gc.width  = window.innerWidth;
    gc.height = window.innerHeight;
    // Also resize ending canvas if visible
    const ec = document.getElementById('endCvs');
    if (ec) { ec.width = window.innerWidth; ec.height = window.innerHeight; }
    const dc = document.getElementById('dimCvs');
    if (dc) { dc.width = window.innerWidth; dc.height = window.innerHeight; }
  });
  // Set initial size
  const gc = document.getElementById('gc');
  gc.width  = window.innerWidth;
  gc.height = window.innerHeight;

})();
