const AUTH_STORAGE_KEY = "dbs_auth_user";
const WINDOW_NAME_PREFIX = "DBS_AUTH:";
let currentUser = null;
let authBadgeElement = null;
let appShellInitialized = false;

function escapeBadgeSvgText(value) {
  if (!value) return "Badge";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function computeBadgeTextLayout(rawTitle) {
  const fallbackTitle = "Course Badge";
  const normalized = (rawTitle || fallbackTitle).replace(/\s+/g, " ").trim();
  const uppercase = normalized ? normalized.toUpperCase() : fallbackTitle.toUpperCase();

  const maxLines = 3;
  const baseCharsPerLine = 12;
  const minFontSize = 12;

  function wrapLines(charsPerLine) {
    const words = uppercase.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach(word => {
      if (!word) return;
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (candidate.length <= charsPerLine) {
        currentLine = candidate;
      } else if (!currentLine) {
        lines.push(candidate);
        currentLine = "";
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.length ? lines : [fallbackTitle.toUpperCase()];
  }

  let charsPerLine = baseCharsPerLine;
  let lines = wrapLines(charsPerLine);

  while (lines.length > maxLines && charsPerLine < 20) {
    charsPerLine += 2;
    lines = wrapLines(charsPerLine);
  }

  if (lines.length > maxLines) {
    const preserved = lines.slice(0, maxLines - 1);
    const remainder = lines.slice(maxLines - 1).join(" ");
    preserved.push(remainder);
    lines = preserved;
  }

  if (lines.length > maxLines) {
    lines.length = maxLines;
  }

  const longest = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const baseFontSize = 30;
  const lengthAdjustment = Math.max(0, longest - charsPerLine + 2) * 1.3;
  const lineAdjustment = (lines.length - 1) * 3;
  let fontSize = Math.round(baseFontSize - lengthAdjustment - lineAdjustment);
  fontSize = Math.max(minFontSize, Math.min(fontSize, 30));
  const lineHeight = fontSize + 6;

  return { lines, fontSize, lineHeight };
}

function buildBadgeImageDataUrl(title) {
  const layout = computeBadgeTextLayout(title);
  const totalLines = layout.lines.length;
  const startY = 100 - ((totalLines - 1) * layout.lineHeight) / 2;
  const textSpans = layout.lines
    .map((line, index) => {
      const y = startY + index * layout.lineHeight;
      return `<tspan x="100" y="${y}">${escapeBadgeSvgText(line)}</tspan>`;
    })
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badgeRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f84e36" />
      <stop offset="100%" stop-color="#d1342a" />
    </linearGradient>
  </defs>
  <rect width="256" height="256" fill="#faf5eb" rx="24" />
  <g transform="translate(28 12)">
    <circle cx="100" cy="100" r="100" fill="#e8402c" />
    <circle cx="100" cy="100" r="82" fill="#f7bb3a" />
    <path d="M48 166 L74 236 L102 208 L130 236 L156 166" fill="url(#badgeRibbon)" />
    <path d="M52 162 L74 224 L102 198 L130 224 L152 162" fill="#f05033" />
    <text text-anchor="middle" font-family="'Poppins', 'Arial', sans-serif" font-weight="700" font-size="${layout.fontSize}" fill="#2f2a1d">
      ${textSpans}
    </text>
  </g>
</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function bootstrapAppShell() {
  if (appShellInitialized) return;
  appShellInitialized = true;

  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  const path = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".navbar-nav .nav-link");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === path) link.classList.add("active");
  });

  authBadgeElement = document.querySelector(".nav-role-label");

  // Add profile modal to body
  ensureProfileModal();

  initializeUserMenu();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapAppShell, { once: true });
} else {
  bootstrapAppShell();
}

function initializeUserMenu() {
  const alreadyInitialized = Boolean(window.__dbsUserMenuInitialized);
  window.__dbsUserMenuInitialized = true;

  currentUser = normalizeSessionUser(getStoredAuth());
  updateUserMenu(currentUser);

  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink && !logoutLink.dataset.boundLogout) {
    logoutLink.addEventListener("click", handleLogout);
    logoutLink.dataset.boundLogout = "true";
  }

  const accountSettingsLink = document.getElementById("accountSettingsLink");
  if (accountSettingsLink && !accountSettingsLink.dataset.boundAccount) {
    accountSettingsLink.addEventListener("click", handleAccountSettings);
    accountSettingsLink.dataset.boundAccount = "true";
  }

  if (!alreadyInitialized) {
    window.addEventListener("storage", event => {
      if (event.key !== AUTH_STORAGE_KEY) return;
      currentUser = normalizeSessionUser(getStoredAuth());
      updateUserMenu(currentUser);
    });
  }
}

async function handleLogout(event) {
  event.preventDefault();
  try {
    if (window.supabaseClient && typeof window.supabaseClient.auth.signOut === 'function') {
      await window.supabaseClient.auth.signOut();
    }
  } catch (error) {
    console.warn("Error signing out from Supabase:", error);
  }
  storeAuthSession(null);
  currentUser = null;
  updateUserMenu(null);
  window.location.href = resolveLoginPath();
}

function handleAccountSettings(event) {
  event.preventDefault();
  if (profileModalInstance) {
    const infoEl = profileModalElement.querySelector("#profileInfo");
    if (infoEl && currentUser) {
      infoEl.textContent = `Name: ${currentUser.name}\nEmail: ${currentUser.email}\nRole: ${formatRole(currentUser.role)}`;
    }
    profileModalInstance.show();
  } else {
    window.alert("Profile modal not available.");
  }
}

function resolveLoginPath() {
  const segments = window.location.pathname.toLowerCase().split("/");
  if (segments.includes("students") || segments.includes("admin") || segments.includes("instructors")) {
    return "../index.html";
  }
  return "index.html";
}

function normalizeSessionUser(session) {
  if (!session) return null;

  const idSource = session.id ?? session.email ?? session.name ?? "session";

  return {
    id: String(idSource),
    name: session.name || session.email || "User",
    role: session.role || "student",
    email: session.email || ""
  };
}

function getStoredAuth() {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (error) {
    console.warn("Unable to read auth session.", error);
  }

  try {
    if (typeof window.name === "string" && window.name.startsWith(WINDOW_NAME_PREFIX)) {
      const serialized = window.name.slice(WINDOW_NAME_PREFIX.length);
      return serialized ? JSON.parse(serialized) : null;
    }
  } catch (error) {
    console.warn("Unable to read auth session from window.name.", error);
  }

  return null;
}

function storeAuthSession(payload) {
  try {
    if (!payload) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      if (typeof window.name === "string" && window.name.startsWith(WINDOW_NAME_PREFIX)) {
        window.name = "";
      }
    } else {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
      window.name = `${WINDOW_NAME_PREFIX}${JSON.stringify(payload)}`;
    }
  } catch (error) {
    console.warn("Unable to persist auth session.", error);
  }
}

function setCurrentUser(session) {
  currentUser = normalizeSessionUser(session);
  storeAuthSession(currentUser);
  updateUserMenu(currentUser);
}

function updateUserMenu(explicitUser) {
  const labelEl = document.getElementById("userMenuLabel");
  if (!labelEl) return;

  const sourceUser = normalizeSessionUser(explicitUser || currentUser || getStoredAuth());
  currentUser = sourceUser;

  if (sourceUser && sourceUser.name) {
    labelEl.textContent = `${formatRole(sourceUser.role)}: ${sourceUser.name}`;
  } else {
    labelEl.textContent = "Account";
  }

  updateAuthBadge(sourceUser);
}

function updateAuthBadge(user) {
  if (!authBadgeElement) {
    authBadgeElement = document.querySelector(".nav-role-label");
  }

  if (!authBadgeElement) return;

  const normalized = normalizeSessionUser(user);
  if (!normalized) {
    authBadgeElement.textContent = "Guest";
    authBadgeElement.dataset.role = "guest";
    return;
  }

  authBadgeElement.textContent = formatRole(normalized.role);
  authBadgeElement.dataset.role = normalized.role || "guest";
}

function setCurrentUserFromSession(session) {
  const normalized = normalizeSessionUser(session);
  currentUser = normalized;
  updateUserMenu(normalized);
}

function formatRole(role) {
  if (!role) return "Guest";
  const normalized = String(role).toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

window.initializeUserMenu = initializeUserMenu;
window.setCurrentUserFromSession = setCurrentUserFromSession;
window.getStoredAuthSession = getStoredAuth;

function showAlert(container, type, message) {
  container.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
}

let confirmModalElement = null;
let confirmModalInstance = null;
let confirmModalTitle = null;
let confirmModalBody = null;
let confirmModalConfirmButton = null;
let confirmModalCancelButton = null;
let confirmResolve = null;

let profileModalElement = null;
let profileModalInstance = null;

function ensureProfileModal() {
  if (profileModalElement) return;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="profileModalLabel">Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p id="profileInfo">Loading profile...</p>
            <hr>
            <div class="d-grid">
              <button type="button" class="btn btn-outline-danger" id="profileLogoutBtn">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `.trim();

  profileModalElement = wrapper.firstElementChild;
  document.body.appendChild(profileModalElement);

  profileModalInstance = new bootstrap.Modal(profileModalElement);

  // Bind logout button in modal
  const logoutBtn = profileModalElement.querySelector("#profileLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
}

function ensureConfirmModal() {
  if (confirmModalElement) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"></button>
            <button type="button" class="btn btn-danger" data-confirm="true"></button>
          </div>
        </div>
      </div>
    </div>
  `.trim();

  confirmModalElement = wrapper.firstElementChild;
  document.body.appendChild(confirmModalElement);

  confirmModalTitle = confirmModalElement.querySelector(".modal-title");
  confirmModalBody = confirmModalElement.querySelector(".modal-body");
  confirmModalConfirmButton = confirmModalElement.querySelector("[data-confirm='true']");
  confirmModalCancelButton = confirmModalElement.querySelector(".modal-footer [data-bs-dismiss='modal']");

  confirmModalInstance = new bootstrap.Modal(confirmModalElement);

  confirmModalElement.addEventListener("hidden.bs.modal", () => {
    if (confirmResolve) {
      confirmResolve(false);
      confirmResolve = null;
    }
  });

  confirmModalConfirmButton.addEventListener("click", () => {
    if (!confirmResolve) {
      return;
    }

    const resolver = confirmResolve;
    confirmResolve = null;
    resolver(true);
    confirmModalInstance.hide();
  });
}

function showConfirm(options = {}) {
  ensureConfirmModal();

  if (confirmResolve) {
    confirmResolve(false);
    confirmResolve = null;
  }

  const settings = Object.assign(
    {
      title: "Confirm",
      body: "Are you sure?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      confirmClass: "btn btn-danger",
      cancelClass: "btn btn-outline-secondary"
    },
    options
  );

  confirmModalTitle.textContent = settings.title;
  confirmModalBody.textContent = settings.body;
  confirmModalConfirmButton.textContent = settings.confirmText;
  confirmModalConfirmButton.className = settings.confirmClass;
  confirmModalCancelButton.textContent = settings.cancelText;
  confirmModalCancelButton.className = settings.cancelClass;

  return new Promise(resolve => {
    confirmResolve = resolve;
    confirmModalInstance.show();
  });
}

window.showAlert = showAlert;
window.showConfirm = showConfirm;
window.getCurrentUser = () => currentUser;
window.getCachedUsers = () => cachedUsers.slice();
window.storeAuthSession = storeAuthSession;
window.getStoredAuthSession = getStoredAuth;
window.updateAuthBadge = updateAuthBadge;
window.setCurrentUserFromSession = setCurrentUserFromSession;
