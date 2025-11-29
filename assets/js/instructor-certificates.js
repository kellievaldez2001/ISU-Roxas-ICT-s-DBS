document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#certificatesTable tbody");
  const alertContainer = document.getElementById("certificatesAlert");
  const searchInput = document.getElementById("searchInput");

  const supabaseClient = window.supabaseClient;
  const filters = { search: "" };
  let templates = [];

  function getActiveUser() {
    return typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
  }

  function showAlert(type, message) {
    if (!alertContainer) return;
    alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
  }

  function escapeHtml(value) {
    return value
      ? String(value)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      : "";
  }

  function buildCertificateImageUrl(title) {
    const safeTitle = escapeHtml(title || "Certificate");
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="320" height="200" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="certHeader" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1d4ed8" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="certGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#facc15" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <radialGradient id="certMedal" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fef9c3" />
      <stop offset="50%" stop-color="#fde68a" />
      <stop offset="100%" stop-color="#f59e0b" />
    </radialGradient>
  </defs>

  <!-- Outer card -->
  <rect width="320" height="200" fill="#e5e7eb" rx="20" />
  <rect x="12" y="12" width="296" height="176" rx="16" fill="#f9fafb" stroke="#d4d4d8" stroke-width="1.5" />

  <!-- Top header band -->
  <path d="M12 12 H308 L260 80 H44 Z" fill="url(#certHeader)" />

  <!-- Center medal at top -->
  <circle cx="160" cy="64" r="30" fill="url(#certGold)" />
  <circle cx="160" cy="64" r="22" fill="url(#certMedal)" stroke="#fefce8" stroke-width="2" />

  <!-- Main CERTIFICATE text -->
  <text x="160" y="112" text-anchor="middle" font-family="'Poppins','Segoe UI',sans-serif" font-size="18" font-weight="700" fill="#1f2937">
    CERTIFICATE
  </text>
  <text x="160" y="126" text-anchor="middle" font-family="'Poppins','Segoe UI',sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="#6b7280">
    OF APPRECIATION
  </text>

  <!-- Recipient placeholder line -->
  <line x1="70" y1="148" x2="250" y2="148" stroke="#e5e7eb" stroke-width="2" />
  <text x="160" y="144" text-anchor="middle" font-family="'Poppins','Segoe UI',sans-serif" font-size="8" fill="#9ca3af">
    PRESENTED TO
  </text>

  <!-- Decorative lower lines -->
  <line x1="40" y1="166" x2="130" y2="166" stroke="#e5e7eb" stroke-width="1.5" />
  <line x1="190" y1="166" x2="280" y2="166" stroke="#e5e7eb" stroke-width="1.5" />
</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function getResolvedCertificateImageUrl(row) {
    const raw = row?.image_url ? String(row.image_url).trim() : "";
    if (raw) return raw;
    return buildCertificateImageUrl(row?.title || "Certificate");
  }

  function renderTable(rows) {
    const searchText = (filters.search || "").trim().toLowerCase();
    const filtered = rows.filter(row => {
      if (!searchText) return true;
      const haystack = `${row.title || ""} ${row.description || ""}`.toLowerCase();
      return haystack.includes(searchText);
    });

    if (!filtered.length) {
      tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No certificate templates found for your courses.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered
      .map(row => {
        const resolvedImageUrl = getResolvedCertificateImageUrl(row);
        const imageCell = `
          <button type="button" class="btn p-0 border-0 bg-transparent view-certificate" data-id="${row.id}" aria-label="View certificate image">
            <img src="${escapeHtml(resolvedImageUrl)}" alt="Certificate" class="badge-preview">
          </button>
        `;

        return `
          <tr data-id="${row.id}">
            <td>${escapeHtml(row.title)}</td>
            <td>${escapeHtml(row.description || "")}</td>
            <td>${imageCell}</td>
          </tr>
        `;
      })
      .join("");
  }

  async function loadTemplates() {
    const user = getActiveUser();
    if (!user) {
      showAlert("warning", "You must be signed in as an instructor to view certificate templates.");
      renderTable([]);
      return;
    }

    if (!supabaseClient) {
      showAlert("danger", "Supabase client is not available. Please refresh the page.");
      renderTable([]);
      return;
    }

    try {
      // 1) Get courses for this instructor
      const { data: courses, error: coursesError } = await supabaseClient
        .from("courses")
        .select("id, title, instructor_id")
        .eq("instructor_id", user.id);

      if (coursesError) throw coursesError;
      if (!courses || !courses.length) {
        renderTable([]);
        return;
      }

      const courseIds = courses.map(c => c.id);

      // 2) Get certificates for those courses
      const { data: certificates, error: certificatesError } = await supabaseClient
        .from("certificates")
        .select("id, course_id, title, description, image_url")
        .in("course_id", courseIds);

      if (certificatesError) throw certificatesError;

      templates = Array.isArray(certificates) ? certificates : [];
      renderTable(templates);
    } catch (error) {
      console.error("Failed to load certificate templates", error);
      showAlert("danger", error.message || "Unable to load certificate templates.");
      renderTable([]);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", event => {
      filters.search = event.target.value;
      // Filter locally over the loaded templates
      renderTable(templates);
    });
  }

  // Click to preview certificate image
  if (tableBody) {
    tableBody.addEventListener("click", event => {
      const button = event.target.closest(".view-certificate");
      if (!button) return;
      const id = button.getAttribute("data-id");
      const row = templates.find(item => String(item.id) === String(id));
      if (!row) return;

      const modalElement = document.getElementById("badgeImageModal");
      if (!modalElement) return;
      const modalInstance = new bootstrap.Modal(modalElement);
      const imageModalTitle = document.getElementById("badgeImageModalLabel");
      const imageModalImage = document.getElementById("badgeImageModalImage");
      const imageModalFallback = document.getElementById("badgeImageModalFallback");
      const imageModalDesign = document.getElementById("badgeImageModalDesign");
      const imageModalDescription = document.getElementById("badgeImageModalDescription");

      const resolvedImageUrl = getResolvedCertificateImageUrl(row);

      if (imageModalTitle) imageModalTitle.textContent = row.title || "Certificate";
      if (imageModalDescription) {
        imageModalDescription.textContent = row.description || "Certificate template for your course.";
      }

      if (imageModalImage) {
        imageModalImage.src = resolvedImageUrl;
        imageModalImage.classList.remove("d-none");
        imageModalImage.onerror = () => {
          imageModalImage.classList.add("d-none");
          if (imageModalFallback) imageModalFallback.classList.remove("d-none");
        };
      }

      if (imageModalFallback) imageModalFallback.classList.add("d-none");
      if (imageModalDesign) imageModalDesign.classList.add("d-none");

      modalInstance.show();
    });
  }

  loadTemplates();
});
