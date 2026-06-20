/* ═══════════════════════════════════════════════════════════
   💖 3D LOVE GROUP INTRO — Premium Script (Firebase Edition)
   ───────────────────────────────────────────────────────────
   ⚙️ এখন সব data Firebase Realtime DB থেকে load হবে
      এডমিন বদলালে real-time এ সবার পেজে আপডেট হবে
   ═══════════════════════════════════════════════════════════ */

// ───────── ⚙️ DEFAULT CONFIGURATION ─────────
// (Firebase এ data না থাকলে এই default values ব্যবহৃত হবে)
const DEFAULT_CONFIG = {
  GROUP_NAME:    "Pokkie gulA♡",
  GROUP_TAGLINE: "Made By Hasnat",
  GROUP_LOGO:    "",
  MEMBERS: [
    { name: "❤️‍🩹𝐏𝐫𝐢𝐧𝐜𝐞𝐬𝐬''👰‍♀️👀", img: "" },
    { name: "𝐑𝐱 𝐇𝐚𝐬𝐧𝐚𝐭 🚩",          img: "" },
    { name: "✩°𝐄𝘀ʜᴀ𓏲⋆.𖦹!🪼",          img: "" },
    { name: "—͞𝐌𝐚𝐡𝐢♡︎🕊️",              img: "" },
    { name: "👑Queen of jannat 👑",     img: "" },
    { name: "𝐊𝐨𝐛𝐢𝐢𝐢 🌙🖤",             img: "" },
    { name: "—✧𝐓𝐫𝐢𝐬𝐡𝐚!𐙚💗🕊️",        img: "" },
    { name: "⎯⃝💋🐼—͞𝐍ꫝꤪꤨʏᴇ፝֟፝֟ᴍ 🐼", img: "" },
    { name: "𝑴𝒊𝒓𝒖𝒖∼🌚🧃",              img: "" },
    { name: "🌴Mahi 🗽⃢⃢🔥",              img: "" },
    { name: "𝙈𝙄𝙈...💋🙌",                img: "" },
    { name: "𐙚 𝑻𝑎ᴇ'𝑠 𝐒ᴡᴇᴇᴛɪᴇ 𐙚",       img: "" },
    { name: "Fahim🫀",                     img: "" },
    { name: "AL NOMAN",                    img: "" },
    { name: "نهال",                        img: "" }
  ],
  INTRO_DURATION: 3000,
  BURST_DURATION: 800,
  CAROUSEL_RADIUS: 280
};

let CONFIG = { ...DEFAULT_CONFIG };
CONFIG.MEMBER_COUNT = CONFIG.MEMBERS.length;

let animationStarted = false;

/* ═══════════════════════════════════════════════════════════
   🔥 FIREBASE — Load configuration (real-time)
   ─────────────────────────────────────────────────────────── */
function initFirebaseAndStart() {
  if (!window.firebaseDB) {
    // Firebase যদি এখনো ready না হয়, একটু পর retry
    window.addEventListener("firebase-ready", initFirebaseAndStart, { once: true });
    return;
  }

  const { onValue, get, CONFIG_REF } = window.firebaseDB;

  // 📥 প্রথমবার data fetch করে animation চালু করব
  get(CONFIG_REF).then(snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      CONFIG = { ...DEFAULT_CONFIG, ...data };

      // Ensure MEMBERS is array (Firebase কখনো array কে object বানিয়ে দেয়)
      if (CONFIG.MEMBERS && !Array.isArray(CONFIG.MEMBERS)) {
        CONFIG.MEMBERS = Object.values(CONFIG.MEMBERS);
      }
      if (!CONFIG.MEMBERS || CONFIG.MEMBERS.length === 0) {
        CONFIG.MEMBERS = DEFAULT_CONFIG.MEMBERS;
      }
    }
    CONFIG.MEMBER_COUNT = CONFIG.MEMBERS.length;
    startApp();
  }).catch(err => {
    console.warn("⚠️ Firebase load failed, using defaults:", err);
    startApp();
  });

  // 🔄 Real-time listener — অন্য কেউ admin panel এ change করলে আপডেট দেখাবে
  onValue(CONFIG_REF, (snapshot) => {
    if (!animationStarted) return; // প্রথম load এর time এ skip
    if (snapshot.exists()) {
      const data = snapshot.val();
      const newConfig = { ...DEFAULT_CONFIG, ...data };
      if (newConfig.MEMBERS && !Array.isArray(newConfig.MEMBERS)) {
        newConfig.MEMBERS = Object.values(newConfig.MEMBERS);
      }

      // Update text labels live
      document.getElementById('intro-name').textContent    = newConfig.GROUP_NAME;
      document.getElementById('intro-tagline').textContent = newConfig.GROUP_TAGLINE;
      document.getElementById('final-name').textContent    = newConfig.GROUP_NAME;
      document.getElementById('final-tagline').textContent = newConfig.GROUP_TAGLINE;
      document.title = "💖 " + newConfig.GROUP_NAME;

      // Update logo
      if (newConfig.GROUP_LOGO && newConfig.GROUP_LOGO !== CONFIG.GROUP_LOGO) {
        applyGroupLogo(newConfig.GROUP_LOGO);
      }
      CONFIG = newConfig;
      CONFIG.MEMBER_COUNT = CONFIG.MEMBERS.length;
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   🎬 START THE APP after config loaded
   ─────────────────────────────────────────────────────────── */
function startApp() {
  if (animationStarted) return;
  animationStarted = true;

  // ───── 📝 Apply group name & logo to DOM ─────
  document.getElementById('intro-name').textContent    = CONFIG.GROUP_NAME;
  document.getElementById('intro-tagline').textContent = CONFIG.GROUP_TAGLINE;
  document.getElementById('final-name').textContent    = CONFIG.GROUP_NAME;
  document.getElementById('final-tagline').textContent = CONFIG.GROUP_TAGLINE;
  document.title = "💖 " + CONFIG.GROUP_NAME;

  applyGroupLogo(CONFIG.GROUP_LOGO);

  // Hide loading screen
  const loader = document.getElementById('loading-screen');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 700);
  }

  buildMembers();

  setTimeout(() => {
    const intro = document.getElementById('intro-stage');
    intro.classList.add('burst');
    triggerBurst();
  }, CONFIG.INTRO_DURATION);

  setTimeout(() => {
    document.getElementById('intro-stage').style.display = 'none';
    document.getElementById('member-stage').classList.add('show');
    document.getElementById('final-title').classList.add('show');
  }, CONFIG.INTRO_DURATION + CONFIG.BURST_DURATION);
}

function applyGroupLogo(logoUrl) {
  const logoEl = document.getElementById('group-logo');
  if (!logoEl) return;
  if (logoUrl && logoUrl.trim()) {
    logoEl.src = logoUrl;
    logoEl.onerror = () => {
      logoEl.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
           <defs><radialGradient id="g"><stop offset="0%" stop-color="#ff6eb4"/><stop offset="100%" stop-color="#2a0040"/></radialGradient></defs>
           <circle cx="100" cy="100" r="95" fill="url(#g)"/>
           <text x="50%" y="58%" text-anchor="middle" fill="#fff" font-size="80">💖</text>
         </svg>`);
    };
  } else {
    logoEl.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
         <circle cx="100" cy="100" r="95" fill="#2a0040"/>
         <text x="50%" y="58%" text-anchor="middle" fill="#ff6eb4" font-size="80">💖</text>
       </svg>`);
  }
}

// Wait for firebase-config.js to load (it's a module so loads async)
if (window.firebaseDB) {
  initFirebaseAndStart();
} else {
  window.addEventListener("firebase-ready", initFirebaseAndStart, { once: true });
  // Safety fallback — যদি ১৫ সেকেন্ডে firebase load না হয়, default দিয়ে চালু করো
  setTimeout(() => {
    if (!animationStarted) {
      console.warn("⚠️ Firebase timeout — starting with defaults");
      startApp();
    }
  }, 15000);
}


/* ═══════════════════════════════════════════════════════════
   🌟 STAR FIELD (background)
   ─────────────────────────────────────────────────────────── */
const starCanvas = document.getElementById('starCanvas');
const sctx = starCanvas.getContext('2d');
let stars = [];

function resizeStar() {
  starCanvas.width  = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
resizeStar();

function createStars() {
  stars = [];
  for (let i = 0; i < 280; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
      hue: Math.random() > 0.85 ? Math.floor(Math.random() * 60 + 280) : 0
    });
  }
}
createStars();

function drawStars() {
  sctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach(s => {
    s.a += s.speed;
    const alpha = (Math.sin(s.a) + 1) / 2;
    sctx.fillStyle = s.hue
      ? `hsla(${s.hue},100%,80%,${alpha})`
      : `rgba(255,255,255,${alpha * 0.9})`;
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

window.addEventListener('resize', () => { resizeStar(); createStars(); });


/* ═══════════════════════════════════════════════════════════
   ☄️ SHOOTING STARS
   ─────────────────────────────────────────────────────────── */
function spawnShoot() {
  const el = document.createElement('div');
  el.className = 'shoot';
  el.style.left = Math.random() * 60 + 'vw';
  el.style.top  = Math.random() * 30 + 'vh';
  const dur = Math.random() * 1.2 + 0.6;
  el.style.animationDuration = dur + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000 + 100);
}
setInterval(spawnShoot, 2800);


/* ═══════════════════════════════════════════════════════════
   💖 FLOATING HEARTS
   ─────────────────────────────────────────────────────────── */
const heartEmoji = ['💖','💗','💓','💕','✨','❤️‍🔥','💋'];
function spawnHeart() {
  const el = document.createElement('div');
  el.className = 'float-heart';
  el.textContent = heartEmoji[Math.floor(Math.random() * heartEmoji.length)];
  el.style.left   = Math.random() * 90 + 'vw';
  el.style.bottom = '-2rem';
  const dur = Math.random() * 5 + 6;
  el.style.animationDuration = dur + 's';
  el.style.fontSize = (Math.random() * 1.2 + 0.7) + 'rem';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000 + 100);
}
setInterval(spawnHeart, 1100);


/* ═══════════════════════════════════════════════════════════
   🔥 WEBGL NEON HEART (background bezier glow)
   ─────────────────────────────────────────────────────────── */
(function() {
  const canvas = document.getElementById('heartCanvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const gl = canvas.getContext('webgl');
  if (!gl) return;

  const vs = `attribute vec2 pos; void main(){ gl_Position=vec4(pos,0,1); }`;
  const fs = `
    precision highp float;
    uniform float W, H, T;
    #define N 8
    vec2 pts[N];
    const float SPD = -0.5;
    const float LEN = 0.25;
    const float INTENS = 1.4;
    const float RAD = 0.008;

    float sdBez(vec2 p, vec2 A, vec2 B, vec2 C){
      vec2 a=B-A, b=A-2.*B+C, c=a*2., d=A-p;
      float kk=1./dot(b,b), kx=kk*dot(a,b),
            ky=kk*(2.*dot(a,a)+dot(d,b))/3.,
            kz=kk*dot(d,a), res=0.;
      float p2=ky-kx*kx, p3=p2*p2*p2,
            q=kx*(2.*kx*kx-3.*ky)+kz, h=q*q+4.*p3;
      if(h>=0.){
        h=sqrt(h);
        vec2 x=(vec2(h,-h)-q)/2.;
        vec2 uv=sign(x)*pow(abs(x),vec2(1./3.));
        float t=clamp(uv.x+uv.y-kx,0.,1.);
        res=length(d+(c+b*t)*t);
      } else {
        float z=sqrt(-p2), v=acos(q/(p2*z*2.))/3.,
              m=cos(v), n=sin(v)*1.732050808;
        vec3 t=clamp((vec3(m+m,-n-m,n-m)*z-kx),0.,1.);
        vec2 q0=d+(c+b*t.x)*t.x; res=dot(q0,q0);
        vec2 q1=d+(c+b*t.y)*t.y; res=min(res,dot(q1,q1));
        vec2 q2=d+(c+b*t.z)*t.z; res=min(res,dot(q2,q2));
        res=sqrt(res);
      }
      return res;
    }

    vec2 heart(float t){
      return vec2(16.*sin(t)*sin(t)*sin(t),
                 -(13.*cos(t)-5.*cos(2.*t)-2.*cos(3.*t)-cos(4.*t)));
    }
    float glow(float d, float r, float i){ return pow(r/d,i); }

    float seg(float t, vec2 pos, float off, float sc){
      for(int i=0;i<N;i++)
        pts[i]=heart(off+float(i)*LEN+fract(SPD*t)*6.2832);
      vec2 c=(pts[0]+pts[1])/2., cp;
      float d=1e5;
      for(int i=0;i<N-1;i++){
        cp=c; c=(pts[i]+pts[i+1])/2.;
        d=min(d,sdBez(pos,sc*cp,sc*pts[i],sc*c));
      }
      return max(0.,d);
    }

    void main(){
      vec2 uv=gl_FragCoord.xy/vec2(W,H);
      vec2 pos=vec2(0.5,0.5)-uv;
      pos.y/=W/H; pos.y+=0.02;
      float sc=0.000015*H;

      float d1=seg(T,pos,0.,sc);
      vec3 col=vec3(0);
      col+=10.*vec3(smoothstep(0.003,0.001,d1));
      col+=glow(d1,RAD,INTENS)*vec3(1.,0.08,0.45);

      float d2=seg(T,pos,3.4,sc);
      col+=10.*vec3(smoothstep(0.003,0.001,d2));
      col+=glow(d2,RAD,INTENS)*vec3(0.5,0.1,1.0);

      col=1.-exp(-col);
      col=pow(col,vec3(0.4545));
      gl_FragColor=vec4(col,1.);
    }
  `;

  function sh(src, type) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s); return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(vs, gl.VERTEX_SHADER));
  gl.attachShader(prog, sh(fs, gl.FRAGMENT_SHADER));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array([-1,1,-1,-1,1,1,1,-1]),
                gl.STATIC_DRAW);

  const pos = gl.getAttribLocation(prog, 'pos');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 8, 0);

  const tH = gl.getUniformLocation(prog, 'T');
  const wH = gl.getUniformLocation(prog, 'W');
  const hH = gl.getUniformLocation(prog, 'H');
  gl.uniform1f(wH, canvas.width);
  gl.uniform1f(hH, canvas.height);

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(wH, canvas.width);
    gl.uniform1f(hH, canvas.height);
  });

  let t = 0, last = Date.now();
  (function loop() {
    const now = Date.now();
    t += (now - last) / 1000; last = now;
    gl.uniform1f(tH, t);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(loop);
  })();
})();


/* ═══════════════════════════════════════════════════════════
   🎬 STAGE 2 — Build member 3D carousel
   ─────────────────────────────────────────────────────────── */
function buildMembers() {
  const spinC  = document.getElementById('spin-container');
  spinC.innerHTML = ''; // clear previous (in case re-render)
  const count  = CONFIG.MEMBER_COUNT;
  const radius = CONFIG.CAROUSEL_RADIUS;

  for (let i = 0; i < count; i++) {
    const angle = i * (360 / count);
    const card  = document.createElement('div');
    card.className = 'photo-card';
    card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    card.style.animationDelay = (i * 0.08) + 's';

    const frame = document.createElement('div');
    frame.className = 'frame';

    const img = document.createElement('img');
    const memberImg = CONFIG.MEMBERS[i]?.img;
    img.src = (memberImg && memberImg.trim()) ? memberImg : `./img/member${i + 1}.jpg`;
    img.alt = CONFIG.MEMBERS[i]?.name || `Member ${i + 1}`;
    img.crossOrigin = 'anonymous';
    img.onerror = () => {
      img.src = 'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 180">
             <defs><linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1">
               <stop offset="0%" stop-color="#2a0040"/>
               <stop offset="100%" stop-color="#ff6eb4"/>
             </linearGradient></defs>
             <rect width="140" height="180" fill="url(#g${i})"/>
             <text x="50%" y="50%" text-anchor="middle" fill="#fff"
                   font-size="48" font-family="Arial" font-weight="bold">${i + 1}</text>
           </svg>`);
    };

    frame.appendChild(img);
    card.appendChild(frame);

    if (CONFIG.MEMBERS[i]?.name) {
      const label = document.createElement('div');
      label.className = 'member-label';
      label.textContent = CONFIG.MEMBERS[i].name;
      card.appendChild(label);
    }

    spinC.appendChild(card);
  }
}


/* ═══════════════════════════════════════════════════════════
   💥 BURST PARTICLE EXPLOSION
   ─────────────────────────────────────────────────────────── */
function triggerBurst() {
  const container = document.getElementById('burst-container');
  const COUNT = 60;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'burst-particle';
    const angle = (Math.PI * 2 * i) / COUNT;
    const dist  = 350 + Math.random() * 250;
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.animationDelay = (Math.random() * 0.15) + 's';
    container.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}


/* ═══════════════════════════════════════════════════════════
   🖱️ DRAG TO ROTATE  +  SCROLL TO ZOOM
   ─────────────────────────────────────────────────────────── */
const dragC = document.getElementById('drag-container');
const spinC = document.getElementById('spin-container');

let sX, sY, tX = 0, tY = 8, desX = 0, desY = 0;

function applyTransform() {
  if (tY > 180) tY = 180;
  if (tY < 0)   tY = 0;
  dragC.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
}

document.addEventListener('pointerdown', e => {
  if (document.getElementById('intro-stage').style.display === 'none') {
    sX = e.clientX; sY = e.clientY;
    spinC.style.animationPlayState = 'paused';
    clearInterval(dragC._timer);

    document.onpointermove = e => {
      desX = e.clientX - sX; desY = e.clientY - sY;
      tX += desX * 0.1; tY += desY * 0.1;
      applyTransform();
      sX = e.clientX; sY = e.clientY;
    };

    document.onpointerup = () => {
      dragC._timer = setInterval(() => {
        desX *= 0.94; desY *= 0.94;
        tX += desX * 0.1; tY += desY * 0.1;
        applyTransform();
        if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
          clearInterval(dragC._timer);
          spinC.style.animationPlayState = 'running';
        }
      }, 17);
      document.onpointermove = document.onpointerup = null;
    };
  }
});
