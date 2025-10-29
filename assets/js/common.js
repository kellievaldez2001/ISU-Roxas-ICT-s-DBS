document.addEventListener("DOMContentLoaded", () => {
  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  const path = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".navbar-nav .nav-link");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === path) link.classList.add("active");
  });
});

const CURRENT_USER_STORAGE_KEY = "dbs_current_user_id";
let currentUser = null;
let cachedUsers = [];

function getStoredUserId() {
  try {
    return window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to access localStorage for current user.", error);
    return null;
  }
}

function storeUserId(value) {
  try {
    window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, value);
  } catch (error) {
    console.warn("Unable to persist current user selection.", error);
  }
}

function setCurrentUser(user) {
  if (!user) {
    currentUser = null;
    return;
  }

  const previousId = currentUser ? String(currentUser.id) : null;
  const nextId = String(user.id);
  currentUser = user;
  storeUserId(nextId);

  if (previousId !== nextId) {
    window.dispatchEvent(
      new CustomEvent("currentUserChanged", {
        detail: user
      })
    );
  }
}

async function loadUsersForSelector(selectElement) {
  if (!window.apiRequest) {
    return;
  }

  try {
    const users = await window.apiRequest("users.php");
    cachedUsers = Array.isArray(users) ? users : [];
  } catch (error) {
    console.error("Failed to load users: ", error);
    cachedUsers = [];
  }

  if (!cachedUsers.length) {
    selectElement.innerHTML = '<option value="">No users</option>';
    setCurrentUser(null);
    return;
  }

  selectElement.innerHTML = cachedUsers
    .map(user => {
      const roleLabel = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User";
      return `<option value="${String(user.id)}">${roleLabel}: ${user.name}</option>`;
    })
    .join("");

  const storedId = getStoredUserId();
  const defaultUser =
    cachedUsers.find(item => String(item.id) === storedId) || cachedUsers.find(item => item.role === "instructor") || cachedUsers[0];

  selectElement.value = defaultUser ? String(defaultUser.id) : String(cachedUsers[0].id);
  setCurrentUser(defaultUser || cachedUsers[0]);

  selectElement.addEventListener("change", () => {
    const nextUser = cachedUsers.find(item => String(item.id) === selectElement.value) || null;
    setCurrentUser(nextUser);
  });
}

function initializeCurrentUserSelector() {
  const selectElement = document.getElementById("currentUserSelect");
  if (!selectElement) {
    return;
  }

  loadUsersForSelector(selectElement);
}

if (document.readyState === "complete") {
  initializeCurrentUserSelector();
} else {
  window.addEventListener("load", initializeCurrentUserSelector, { once: true });
}

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
