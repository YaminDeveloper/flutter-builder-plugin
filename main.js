// Flutter Multi-Platform Builder Plugin for Acode
// Supports: Android, iOS, macOS, Windows, Linux, Web

const STORAGE_KEY = "flutter_builder_credentials";
let credentials = null;
let isBuilding = false;

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const ICONS = {
  flutter: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 28.5L24 17.5H46L24 39.5L13 28.5Z" fill="#54C5F8"/><path d="M13 28.5L20.5 21L24 24.5L17.5 31L13 28.5Z" fill="#01579B"/><path d="M24 39.5L17.5 33L24 26.5L30.5 33L24 39.5Z" fill="#29B6F6"/><path d="M24 17.5L2 17.5L13.5 6L35.5 6L24 17.5Z" fill="#54C5F8"/></svg>`,
  android: `<svg viewBox="0 0 24 24" fill="none"><path d="M17.5 15.3V8.8a.43.43 0 0 0-.43-.43.43.43 0 0 0-.43.43v6.5c0 .24.19.43.43.43s.43-.19.43-.43ZM6.9 15.3V8.8a.43.43 0 0 0-.86 0v6.5c0 .24.19.43.43.43s.43-.19.43-.43ZM15.8 17.8H7.8a.8.8 0 0 1-.8-.8V8.8C7 7.1 8.1 5.8 9.8 5.8h4a3 3 0 0 1 3 3v8.2a.8.8 0 0 1-.8.8Z" fill="#3DDC84"/><path d="M14.5 5.5 15.5 3.5M9.5 5.5 8.5 3.5" stroke="#3DDC84" stroke-width="1.2" stroke-linecap="round"/><circle cx="10.3" cy="8.3" r=".7" fill="white"/><circle cx="13.3" cy="8.3" r=".7" fill="white"/><path d="M9.8 19.8v2M13.8 19.8v2" stroke="#3DDC84" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" fill="none"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2c.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.14-1.15.42-2.35 1.05-3.11Z" fill="white"/></svg>`,
  windows: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 5.56 10.26 4.57V11.57H3V5.56ZM11.14 4.44 21 3V11.57H11.14V4.44ZM3 12.43H10.26V19.43L3 18.44V12.43ZM11.14 12.43H21V21L11.14 19.57V12.43Z" fill="#00ADEF"/></svg>`,
  linux: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C10.5 2 9 3.5 9 5.5c0 1.5.5 3 1 4-1 .5-3 2-3 4.5S8.5 18 10 18.5V19.5c0 1-1 1.5-2 2h8c-1-.5-2-1-2-2V18.5c1.5-.5 3-2 3-4.5S15 10 14 9.5c.5-1 1-2.5 1-4C15 3.5 13.5 2 12 2Z" fill="#FFD700" stroke="#E6B800" stroke-width=".5"/><circle cx="10.5" cy="6" r=".8" fill="#1A1A1A"/><circle cx="13.5" cy="6" r=".8" fill="#1A1A1A"/><path d="M10.5 8.5c.5.5 2.5.5 3 0" stroke="#1A1A1A" stroke-width=".5" stroke-linecap="round"/></svg>`,
  web: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#4285F4" stroke-width="1.5"/><path d="M12 3s-3 4-3 9 3 9 3 9M12 3s3 4 3 9-3 9-3 9M3 12h18M4.5 7.5h15M4.5 16.5h15" stroke="#4285F4" stroke-width="1.5"/></svg>`,
  macos: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="13" rx="2" stroke="#A0A0A0" stroke-width="1.5"/><path d="M8 21h8M12 17v4" stroke="#A0A0A0" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.685-.211.685-.472 0-.235-.008-.878-.012-1.728-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10Z" fill="white"/></svg>`,
  key: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M12 12h8M18 10v2M16 12v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="#4CAF50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v12M12 15 8 11M12 15l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  spinner: `<svg viewBox="0 0 24 24" fill="none" class="spin"><circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.2)" stroke-width="2.5"/><path d="M21 12A9 9 0 0 0 12 3" stroke="#54C5F8" stroke-width="2.5" stroke-linecap="round"/></svg>`
};

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap');
:root{--bg:#0D1117;--bg2:#161B22;--bg3:#1C2128;--bgh:#21262D;--bdr:#30363D;--bda:#388BFD;--t1:#E6EDF3;--t2:#8B949E;--tm:#484F58;--blue:#388BFD;--cyan:#54C5F8;--green:#3FB950;--orange:#F0883E;--red:#F85149;--purple:#BC8CFF;--ff:'Outfit',sans-serif;--fm:'JetBrains Mono',monospace}
*{box-sizing:border-box;margin:0;padding:0}
#fpov{position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:var(--ff);animation:fi .2s ease}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes sh{0%{background-position:-200% center}100%{background-position:200% center}}
.fpm{background:var(--bg);border:1px solid var(--bdr);border-radius:16px;width:min(520px,95vw);max-height:90vh;overflow:hidden;display:flex;flex-direction:column;animation:su .25s cubic-bezier(.34,1.56,.64,1);box-shadow:0 25px 80px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.05)}
.fph{padding:20px 24px 16px;border-bottom:1px solid var(--bdr);display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,rgba(56,139,253,.08) 0%,transparent 60%)}
.fplo{width:36px;height:36px;flex-shrink:0}.fplo svg{width:100%;height:100%}
.fptg{flex:1}.fptit{font-size:16px;font-weight:700;color:var(--t1);letter-spacing:-.3px}.fpsub{font-size:11px;color:var(--tm);font-family:var(--fm);margin-top:2px}
.fpcb{width:28px;height:28px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:6px;color:var(--t2);transition:all .15s}
.fpcb:hover{background:var(--bgh);color:var(--t1)}.fpcb svg{width:16px;height:16px}
.fpts{display:flex;border-bottom:1px solid var(--bdr);padding:0 24px;gap:2px;background:var(--bg2)}
.fpt{padding:10px 14px;font-size:12px;font-weight:500;color:var(--t2);cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s;font-family:var(--ff);display:flex;align-items:center;gap:6px}
.fpt svg{width:14px;height:14px}.fpt:hover{color:var(--t1)}.fpt.active{color:var(--blue);border-bottom-color:var(--blue)}
.fpb{overflow-y:auto;flex:1;padding:20px 24px;scrollbar-width:thin;scrollbar-color:var(--bdr) transparent}
.fps{margin-bottom:20px}
.fplb{font-size:11px;font-weight:600;color:var(--tm);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;font-family:var(--fm)}
.fpin{width:100%;background:var(--bg2);border:1px solid var(--bdr);border-radius:8px;padding:10px 12px;color:var(--t1);font-size:13px;font-family:var(--fm);outline:none;transition:border-color .15s}
.fpin:focus{border-color:var(--bda)}.fpin::placeholder{color:var(--tm)}
.fpir{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fpplats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.fpplat{background:var(--bg2);border:1px solid var(--bdr);border-radius:10px;padding:12px 8px;cursor:pointer;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:6px;color:var(--t2);font-family:var(--ff);font-size:11px;font-weight:500;position:relative;overflow:hidden}
.fpplat svg{width:24px;height:24px}.fpplat:hover{border-color:var(--blue);background:var(--bgh);color:var(--t1);transform:translateY(-1px)}
.fpplat.sel{border-color:var(--cyan);background:rgba(84,197,248,.08);color:var(--cyan)}
.fpplat.sel::after{content:'';position:absolute;top:6px;right:6px;width:6px;height:6px;background:var(--cyan);border-radius:50%}
.fpms{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.fpm2{background:var(--bg2);border:1px solid var(--bdr);border-radius:8px;padding:8px;cursor:pointer;transition:all .15s;text-align:center;color:var(--t2);font-family:var(--ff);font-size:12px;font-weight:500}
.fpm2:hover{border-color:var(--bda);color:var(--t1)}.fpm2.sel{border-color:var(--purple);background:rgba(188,140,255,.08);color:var(--purple)}
.fpbb{width:100%;padding:13px;background:linear-gradient(135deg,#1A6FD4,#388BFD);border:none;border-radius:10px;color:white;font-size:14px;font-weight:600;cursor:pointer;font-family:var(--ff);display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;letter-spacing:.2px;box-shadow:0 4px 20px rgba(56,139,253,.3)}
.fpbb:hover{background:linear-gradient(135deg,#2176D8,#4395FF);transform:translateY(-1px);box-shadow:0 6px 25px rgba(56,139,253,.4)}.fpbb:disabled{opacity:.5;cursor:not-allowed;transform:none}
.fplg{background:var(--bg2);border:1px solid var(--bdr);border-radius:10px;padding:14px;max-height:220px;overflow-y:auto;font-family:var(--fm);font-size:11.5px;line-height:1.8;scrollbar-width:thin;scrollbar-color:var(--bdr) transparent}
.ll{display:flex;gap:8px;align-items:flex-start}.lt{color:var(--tm);flex-shrink:0}.li{color:var(--t2)}.ls{color:var(--green)}.le{color:var(--red)}.lw{color:var(--orange)}.lp{color:var(--cyan)}
.fppt{background:var(--bg2);border-radius:99px;height:4px;overflow:hidden;margin-bottom:16px;border:1px solid var(--bdr)}
.fppb{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--blue),var(--cyan));transition:width .5s ease;background-size:200% 100%;animation:sh 2s infinite}
.fpss{display:flex;flex-direction:column;gap:6px}
.fpst{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;font-size:12px;background:var(--bg2);border:1px solid transparent;color:var(--tm);transition:all .3s}
.fpst.done{color:var(--green);border-color:rgba(63,185,80,.2)}.fpst.active{color:var(--t1);border-color:var(--cyan);background:rgba(84,197,248,.05);animation:pulse 1.5s infinite}.fpst.error{color:var(--red);border-color:rgba(248,81,73,.2)}
.fpsi{width:16px;height:16px;flex-shrink:0}.fpsi svg{width:100%;height:100%}
.spin{animation:spin 1s linear infinite}
.fpart{background:linear-gradient(135deg,rgba(63,185,80,.1),rgba(84,197,248,.05));border:1px solid rgba(63,185,80,.3);border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px;margin-bottom:8px}
.fain{flex:1}.fan{font-size:13px;font-weight:600;color:var(--t1)}.fam{font-size:11px;color:var(--t2);font-family:var(--fm);margin-top:2px}
.fdl{padding:8px 14px;background:var(--green);border:none;border-radius:8px;color:white;font-size:12px;font-weight:600;cursor:pointer;font-family:var(--ff);display:flex;align-items:center;gap:6px;transition:all .15s;white-space:nowrap;text-decoration:none}
.fdl svg{width:14px;height:14px}.fdl:hover{background:#4dca5e;transform:translateY(-1px)}
.fpbdg{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:99px;font-size:10px;font-family:var(--fm);font-weight:500;background:rgba(63,185,80,.15);color:var(--green);border:1px solid rgba(63,185,80,.3);margin-left:8px}
.fpdiv{height:1px;background:var(--bdr);margin:16px 0}
.fpr{display:flex;align-items:center;gap:10px}
.fpib{background:rgba(56,139,253,.08);border:1px solid rgba(56,139,253,.25);border-radius:8px;padding:10px 12px;font-size:12px;color:var(--t2);line-height:1.5;margin-bottom:16px}
.fpib a{color:var(--blue);text-decoration:none}
.tc{display:none}.tc.active{display:block}
`;

// ─── HTML ─────────────────────────────────────────────────────────────────────
function buildHTML() {
  const hasCreds = !!credentials;
  return `
<style>${CSS}</style>
<div id="fpov">
 <div class="fpm">
  <div class="fph">
   <div class="fplo">${ICONS.flutter}</div>
   <div class="fptg"><div class="fptit">Flutter Multi-Platform Builder</div><div class="fpsub">v2.0.0 &nbsp;·&nbsp; GitHub Actions CI/CD</div></div>
   <button class="fpcb" id="fp-close">${ICONS.close}</button>
  </div>
  <div class="fpts">
   <button class="fpt active" data-tab="build">${ICONS.flutter} Build</button>
   <button class="fpt" data-tab="log"><svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 10h12M4 14h16M4 18h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Log</button>
   <button class="fpt" data-tab="creds">${ICONS.key} Credentials</button>
  </div>
  <div class="fpb">

   <!-- BUILD -->
   <div class="tc active" id="tab-build">
    <div class="fps"><div class="fplb">GitHub Repository</div><input class="fpin" id="fp-repo" placeholder="owner/repo-name" value="${credentials?.repo||''}"/></div>
    <div class="fps"><div class="fplb">Branch</div><input class="fpin" id="fp-branch" placeholder="main" value="main"/></div>
    <div class="fps">
     <div class="fplb">Target Platforms</div>
     <div class="fpplats">
      <button class="fpplat sel" data-p="android">${ICONS.android}<span>Android</span></button>
      <button class="fpplat" data-p="ios">${ICONS.apple}<span>iOS</span></button>
      <button class="fpplat" data-p="web">${ICONS.web}<span>Web</span></button>
      <button class="fpplat" data-p="windows">${ICONS.windows}<span>Windows</span></button>
      <button class="fpplat" data-p="linux">${ICONS.linux}<span>Linux</span></button>
      <button class="fpplat" data-p="macos">${ICONS.macos}<span>macOS</span></button>
     </div>
    </div>
    <div class="fps">
     <div class="fplb">Build Mode</div>
     <div class="fpms">
      <button class="fpm2" data-m="debug">Debug</button>
      <button class="fpm2 sel" data-m="profile">Profile</button>
      <button class="fpm2" data-m="release">Release</button>
     </div>
    </div>
    <div class="fps">
     <div class="fplb">Flutter Version &amp; App ID</div>
     <div class="fpir">
      <input class="fpin" id="fp-fv" placeholder="3.24.0 (stable)"/>
      <input class="fpin" id="fp-appid" placeholder="com.example.app"/>
     </div>
    </div>
    <button class="fpbb" id="fp-build-btn">${ICONS.flutter} <span>Trigger Build</span></button>
   </div>

   <!-- LOG -->
   <div class="tc" id="tab-log">
    <div class="fps">
     <div class="fplb" style="margin-bottom:12px">Build Progress</div>
     <div class="fppt"><div class="fppb" id="fp-prog" style="width:0%"></div></div>
     <div class="fpss">
      <div class="fpst" id="st-connect"><div class="fpsi"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/></svg></div>Connect to GitHub</div>
      <div class="fpst" id="st-upload"><div class="fpsi"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/></svg></div>Upload Workflow</div>
      <div class="fpst" id="st-trigger"><div class="fpsi"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/></svg></div>Dispatch Build</div>
      <div class="fpst" id="st-build"><div class="fpsi"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/></svg></div>Compiling</div>
      <div class="fpst" id="st-done"><div class="fpsi"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/></svg></div>Artifact Ready</div>
     </div>
    </div>
    <div class="fpdiv"></div>
    <div class="fps"><div class="fplb">Live Log</div><div class="fplg" id="fp-log"><div class="ll"><span class="lt">--:--</span><span class="li">Waiting for build trigger...</span></div></div></div>
    <div id="fp-arts" style="display:none;margin-top:16px"></div>
   </div>

   <!-- CREDS -->
   <div class="tc" id="tab-creds">
    <div class="fpib">Store your GitHub PAT locally. Generate at <a href="#">github.com/settings/tokens</a> with <code>repo</code> + <code>workflow</code> scopes.</div>
    <div class="fps"><div class="fplb">GitHub Username${hasCreds?'<span class="fpbdg">Saved</span>':''}</div><input class="fpin" id="fp-user" placeholder="your-github-username" value="${credentials?.username||''}"/></div>
    <div class="fps"><div class="fplb">Personal Access Token</div><input class="fpin" id="fp-tok" type="password" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" value="${credentials?.token||''}"/></div>
    <div class="fps"><div class="fplb">Default Repository</div><input class="fpin" id="fp-drepo" placeholder="username/flutter-app" value="${credentials?.repo||''}"/></div>
    <div class="fpdiv"></div>
    <button class="fpbb" id="fp-save" style="background:linear-gradient(135deg,#1a5c35,#3fb950);box-shadow:0 4px 20px rgba(63,185,80,.3)">${ICONS.check} Save Credentials</button>
    <div id="fp-cf" style="margin-top:12px"></div>
   </div>

  </div>
 </div>
</div>`;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const delay = ms => new Promise(r => setTimeout(r, ms));
function log(msg, t="i") {
  const el = document.getElementById("fp-log"); if(!el) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
  const map = {i:"li",s:"ls",e:"le",w:"lw",p:"lp"};
  const d = document.createElement("div"); d.className = "ll";
  d.innerHTML = `<span class="lt">${ts}</span><span class="${map[t]||"li"}">${msg}</span>`;
  el.appendChild(d); el.scrollTop = el.scrollHeight;
}
function setStep(id, status) {
  const el = document.getElementById(id); if(!el) return;
  el.className = `fpst ${status}`;
  const iconMap = {
    active: ICONS.spinner,
    done: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(63,185,80,.15)" stroke="#3fb950" stroke-width="1.5"/><path d="M8 12l3 3 5-6" stroke="#3fb950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(248,81,73,.15)" stroke="#f85149" stroke-width="1.5"/><path d="M15 9l-6 6M9 9l6 6" stroke="#f85149" stroke-width="2" stroke-linecap="round"/></svg>`
  };
  if(iconMap[status]) el.querySelector(".fpsi").innerHTML = iconMap[status];
}
function setProg(p) { const el = document.getElementById("fp-prog"); if(el) el.style.width=`${p}%`; }
function switchTab(t) {
  document.querySelectorAll(".fpt").forEach(b=>b.classList.toggle("active",b.dataset.tab===t));
  document.querySelectorAll(".tc").forEach(c=>c.classList.toggle("active",c.id===`tab-${t}`));
}

// ─── WORKFLOW GENERATOR ───────────────────────────────────────────────────────
function genWorkflow(platforms, mode, fv) {
  const steps = {
    android: `      - name: Build Android APK\n        run: flutter build apk --${mode}\n      - uses: actions/upload-artifact@v4\n        with:\n          name: android-apk\n          path: build/app/outputs/flutter-apk/app-${mode}.apk`,
    ios: `      - name: Build iOS\n        run: flutter build ios --${mode} --no-codesign\n      - uses: actions/upload-artifact@v4\n        with:\n          name: ios-build\n          path: build/ios/iphoneos/Runner.app`,
    web: `      - name: Build Web\n        run: flutter build web --${mode}\n      - uses: actions/upload-artifact@v4\n        with:\n          name: web-build\n          path: build/web`,
    windows: `      - name: Build Windows\n        run: flutter build windows --${mode}\n      - uses: actions/upload-artifact@v4\n        with:\n          name: windows-build\n          path: build/windows/x64/runner/Release`,
    linux: `      - name: Build Linux\n        run: flutter build linux --${mode}\n      - uses: actions/upload-artifact@v4\n        with:\n          name: linux-build\n          path: build/linux/x64/release/bundle`,
    macos: `      - name: Build macOS\n        run: flutter build macos --${mode}\n      - uses: actions/upload-artifact@v4\n        with:\n          name: macos-build\n          path: build/macos/Build/Products/Release`
  };
  const os = (platforms.includes("windows")?"windows-latest":platforms.includes("macos")||platforms.includes("ios")?"macos-latest":"ubuntu-latest");
  return `name: Flutter Multi-Platform Build\n\non:\n  workflow_dispatch:\n    inputs:\n      build_mode:\n        description: 'Build Mode'\n        default: '${mode}'\n\njobs:\n  build:\n    runs-on: ${os}\n    steps:\n      - uses: actions/checkout@v4\n      - uses: subosito/flutter-action@v2\n        with:\n          flutter-version: '${fv||"3.24.0"}'\n          channel: 'stable'\n          cache: true\n      - run: flutter pub get\n${platforms.map(p=>steps[p]||"").join("\n")}\n`;
}

// ─── BUILD TRIGGER ────────────────────────────────────────────────────────────
async function triggerBuild() {
  if(isBuilding) return;
  if(!credentials?.token) { switchTab("creds"); return; }
  const repo = document.getElementById("fp-repo")?.value?.trim();
  const branch = document.getElementById("fp-branch")?.value?.trim()||"main";
  const fv = document.getElementById("fp-fv")?.value?.trim();
  if(!repo) { document.getElementById("fp-repo")?.focus(); return; }
  const platforms = [...document.querySelectorAll(".fpplat.sel")].map(b=>b.dataset.p);
  const mode = document.querySelector(".fpm2.sel")?.dataset?.m||"release";
  if(!platforms.length) return;
  isBuilding = true;
  switchTab("log");
  document.getElementById("fp-log").innerHTML = "";

  log(`Repo: ${repo}  |  Platforms: ${platforms.join(", ")}  |  Mode: ${mode}`, "p");

  try {
    // Connect
    setStep("st-connect","active"); setProg(10);
    log("Connecting to GitHub...", "i");
    await delay(500);
    const r1 = await fetch(`https://api.github.com/repos/${repo}`, { headers: {"Authorization":`Bearer ${credentials.token}`,"Accept":"application/vnd.github+json"} });
    if(!r1.ok) throw new Error(`Repo access failed (${r1.status})`);
    const rd = await r1.json();
    setStep("st-connect","done"); setProg(25);
    log(`Connected: ${rd.full_name}`, "s");

    // Upload
    setStep("st-upload","active");
    log("Generating & uploading workflow YAML...", "i");
    await delay(400);
    const wf = genWorkflow(platforms, mode, fv);
    const enc = btoa(unescape(encodeURIComponent(wf)));
    const wfPath = ".github/workflows/flutter-build.yml";
    let sha;
    try {
      const ex = await fetch(`https://api.github.com/repos/${repo}/contents/${wfPath}`, { headers: {"Authorization":`Bearer ${credentials.token}`,"Accept":"application/vnd.github+json"} });
      if(ex.ok) { sha = (await ex.json()).sha; }
    } catch(_){}
    const body = { message:"ci: update flutter multi-platform workflow", content: enc, branch };
    if(sha) body.sha = sha;
    const r2 = await fetch(`https://api.github.com/repos/${repo}/contents/${wfPath}`, { method:"PUT", headers:{"Authorization":`Bearer ${credentials.token}`,"Accept":"application/vnd.github+json","Content-Type":"application/json"}, body:JSON.stringify(body) });
    if(!r2.ok) { const e=await r2.json(); throw new Error(`Upload failed: ${e.message}`); }
    setStep("st-upload","done"); setProg(45);
    log("Workflow uploaded successfully", "s");
    await delay(1000);

    // Trigger
    setStep("st-trigger","active");
    log("Dispatching workflow_dispatch event...", "i");
    const r3 = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/flutter-build.yml/dispatches`, { method:"POST", headers:{"Authorization":`Bearer ${credentials.token}`,"Accept":"application/vnd.github+json","Content-Type":"application/json"}, body:JSON.stringify({ref:branch,inputs:{build_mode:mode}}) });
    if(r3.status!==204) { const e=await r3.json().catch(()=>({})); throw new Error(`Dispatch failed (${r3.status}): ${e.message||""}`); }
    setStep("st-trigger","done"); setProg(60);
    log("Workflow dispatched! Waiting for run...", "s");

    // Wait for run ID
    setStep("st-build","active");
    await delay(5000);
    let runId = null;
    for(let i=0;i<12;i++) {
      const r4 = await fetch(`https://api.github.com/repos/${repo}/actions/runs?branch=${branch}&event=workflow_dispatch&per_page=3`, { headers:{"Authorization":`Bearer ${credentials.token}`,"Accept":"application/vnd.github+json"} });
      if(r4.ok) { const d=await r4.json(); if(d.workflow_runs?.[0]) { runId=d.workflow_runs[0].id; log(`Run #${runId} detected`, "p"); break; } }
      await delay(3000);
    }
    if(!runId) throw new Error("Could not detect workflow run. Check GitHub Actions manually.");

    // Poll
    let status="in_progress", elapsed=0;
    while(status==="in_progress"||status==="queued"||status==="waiting") {
      await delay(8000); elapsed+=8;
      const r5 = await fetch(`https://api.github.com/repos/${repo}/actions/runs/${runId}`, { headers:{"Authorization":`Bearer ${credentials.token}`,"Accept":"application/vnd.github+json"} });
      if(r5.ok) { const d=await r5.json(); status=d.status; const c=d.conclusion; log(`[${elapsed}s] ${status}${c?" → "+c:""}`, "i"); if(status==="completed") { if(c!=="success") throw new Error(`Build ${c}. See: ${d.html_url}`); break; } }
      if(elapsed>600) throw new Error("Build timed out.");
    }
    setStep("st-build","done"); setProg(88);

    // Artifacts
    setStep("st-done","active");
    log("Fetching artifacts...", "i");
    await delay(1000);
    const r6 = await fetch(`https://api.github.com/repos/${repo}/actions/runs/${runId}/artifacts`, { headers:{"Authorization":`Bearer ${credentials.token}`,"Accept":"application/vnd.github+json"} });
    setProg(100); setStep("st-done","done");
    log("Build complete!", "s");

    const arts = document.getElementById("fp-arts");
    if(arts) {
      arts.style.display="block";
      if(r6.ok) {
        const ad = await r6.json();
        ad.artifacts.forEach(a => {
          arts.insertAdjacentHTML("beforeend",`<div class="fpart"><div style="width:32px;height:32px;color:var(--green)">${ICONS.download}</div><div class="fain"><div class="fan">${a.name}</div><div class="fam">${(a.size_in_bytes/1024/1024).toFixed(1)} MB · Run #${runId}</div></div><a class="fdl" href="https://github.com/${repo}/actions/runs/${runId}" target="_blank">${ICONS.download} Open</a></div>`);
        });
      } else {
        arts.innerHTML=`<a href="https://github.com/${repo}/actions/runs/${runId}" style="color:var(--blue);font-size:13px">Open GitHub Actions run</a>`;
      }
    }
  } catch(err) {
    log(`Error: ${err.message}`, "e");
    ["st-connect","st-upload","st-trigger","st-build","st-done"].forEach(s => { const el=document.getElementById(s); if(el&&el.classList.contains("active")) setStep(s,"error"); });
  }
  isBuilding = false;
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  try { const s=localStorage.getItem(STORAGE_KEY); if(s) credentials=JSON.parse(s); } catch(_){}
  window.showFlutterBuilder = showPlugin;
  if(window.acode) {
    window.acode.define("flutter-builder", { name:"Flutter Builder", icon:"flutter_dash", run: showPlugin });
  }
}

function showPlugin() {
  if(document.getElementById("fpov")) return;
  document.body.insertAdjacentHTML("beforeend", buildHTML());

  document.getElementById("fp-close")?.addEventListener("click", () => document.getElementById("fpov")?.remove());
  document.getElementById("fpov")?.addEventListener("click", e => { if(e.target.id==="fpov") document.getElementById("fpov")?.remove(); });
  document.querySelectorAll(".fpt").forEach(t => t.addEventListener("click", () => switchTab(t.dataset.tab)));
  document.querySelectorAll(".fpplat").forEach(b => b.addEventListener("click", () => b.classList.toggle("sel")));
  document.querySelectorAll(".fpm2").forEach(b => b.addEventListener("click", () => { document.querySelectorAll(".fpm2").forEach(x=>x.classList.remove("sel")); b.classList.add("sel"); }));
  document.getElementById("fp-build-btn")?.addEventListener("click", triggerBuild);
  document.getElementById("fp-save")?.addEventListener("click", () => {
    const u=document.getElementById("fp-user")?.value?.trim();
    const t=document.getElementById("fp-tok")?.value?.trim();
    const r=document.getElementById("fp-drepo")?.value?.trim();
    credentials={username:u,token:t,repo:r};
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(credentials)); } catch(_){}
    if(r) { const ri=document.getElementById("fp-repo"); if(ri) ri.value=r; }
    const cf=document.getElementById("fp-cf");
    if(cf) { cf.innerHTML=`<div style="color:var(--green);font-size:12px;display:flex;align-items:center;gap:6px"><svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="#4CAF50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Credentials saved</div>`; setTimeout(()=>{cf.innerHTML=""},3000); }
  });
}

module.exports = { init };