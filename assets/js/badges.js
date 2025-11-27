document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#badgesTable tbody");
  const alertContainer = document.getElementById("badgesAlert");
  const searchInput = document.getElementById("searchInput");
  const badgeForm = document.getElementById("badgeForm");
  const modalElement = document.getElementById("badgeModal");
  const modalInstance = new bootstrap.Modal(modalElement);
  const modalLabel = document.getElementById("badgeModalLabel");
  const imageInput = document.getElementById("badgeImageUrl");
  const imagePreview = document.getElementById("badgePreview");
  const imageModalElement = document.getElementById("badgeImageModal");
  const imageModalInstance = imageModalElement ? new bootstrap.Modal(imageModalElement) : null;
  const imageModalTitle = document.getElementById("badgeImageModalLabel");
  const imageModalImage = document.getElementById("badgeImageModalImage");
  const imageModalFallback = document.getElementById("badgeImageModalFallback");
  const imageModalDesign = document.getElementById("badgeImageModalDesign");
  const imageModalDesignTitle = document.getElementById("badgeImageModalDesignTitle");
  const imageModalDescription = document.getElementById("badgeImageModalDescription");

  let editingId = null;
  let badges = [];
  let courses = [];
  function getActiveUser() {
    return typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
  }

  function getResolvedBadgeImageUrl(badge) {
    const raw = badge?.image_url ? String(badge.image_url).trim() : "";
    if (raw) return raw;
    const displayTitle = getDisplayTitle(badge);
    return buildBadgeImageUrl(displayTitle);
  }

  const endpoint = "badges.php";

  function escapeHtml(value) {
    return value
      ? value
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      : "";
  }

  function escapeSvgText(value) {
    if (!value) return "Badge";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildBadgeImageUrl(title) {
    const text = escapeSvgText(title?.trim() || "Badge");
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="strapFill" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#b91c1c" />
      <stop offset="100%" stop-color="#ef4444" />
    </linearGradient>
    <radialGradient id="medalInner" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fecaca" />
      <stop offset="45%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#b91c1c" />
    </radialGradient>
  </defs>
  <rect width="256" height="256" fill="#ffffff" rx="24" />
  <!-- Strap -->
  <g transform="translate(0,8)">
    <path d="M96 0 L128 96 L160 0 Z" fill="url(#strapFill)" />
    <path d="M108 0 L128 64 L148 0 Z" fill="#dc2626" opacity="0.9" />
  </g>

  <!-- Medal frame -->
  <g>
    <!-- Ring / border -->
    <circle cx="128" cy="152" r="70" fill="#facc15" />
    <circle cx="128" cy="152" r="60" fill="#f97316" />
    <!-- Inner red medal surface (no text to keep thumbnails clean) -->
    <circle cx="128" cy="152" r="52" fill="url(#medalInner)" />
  </g>
</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function findOwningCourse(badge) {
    if (!courses?.length || !badge) return null;
    const badgeCourseId = badge.course_id ? Number(badge.course_id) : null;
    if (badgeCourseId) {
      const byCourseId = courses.find(course => Number(course.id) === badgeCourseId);
      if (byCourseId) return byCourseId;
    }
    return courses.find(course => Number(course.badge_id) === Number(badge.id)) || null;
  }

  function getDisplayTitle(badge) {
    const owningCourse = findOwningCourse(badge);
    const raw = owningCourse?.title || badge?.title || "Course Badge";
    return raw.trim() || "Course Badge";
  }

  function getBadgeDescription(badge) {
    const courseTitle = findOwningCourse(badge)?.title || getDisplayTitle(badge);
    return `Awarded for completing the ${courseTitle} course.`;
  }

  function updatePreview(url) {
    if (url) {
      imagePreview.src = url;
      imagePreview.classList.remove("d-none");
    } else {
      imagePreview.src = "";
      imagePreview.classList.add("d-none");
    }
  }

  function resetForm() {
    badgeForm.reset();
    badgeForm.querySelector("button[type='submit']").disabled = false;
    badgeForm.querySelector("button[type='submit']").textContent = "Save";
    editingId = null;
    modalLabel.textContent = "Add Badge";
    updatePreview("");
  }

  modalElement.addEventListener("hidden.bs.modal", () => {
    resetForm();
  });

  imageInput.addEventListener("input", event => {
    updatePreview(event.target.value.trim());
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderTable();
    });
  }

  async function loadBadges() {
    try {
      const [badgeData, courseData] = await Promise.all([
        window.apiRequest(endpoint),
        window.apiRequest("courses.php")
      ]);
      badges = Array.isArray(badgeData) ? badgeData : [];
      courses = Array.isArray(courseData) ? courseData : [];
      const user = getActiveUser();
      if (user && user.role === "instructor") {
        badges = badges.filter(badge => {
          const course = findOwningCourse(badge);
          return course && course.instructor_id == user.id;
        });
      }
      renderTable();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to load badges. Please try again.");
    }
  }

  function renderTable() {
    // First, collapse potential duplicates so we don't show multiple rows
    // for the same logical badge (e.g., same course/title).
    const uniqueBadges = [];
    const seenTitles = new Set();

    badges.forEach(badge => {
      const key = getDisplayTitle(badge).toLowerCase();
      if (seenTitles.has(key)) return;
      seenTitles.add(key);
      uniqueBadges.push(badge);
    });

    const filtered = uniqueBadges.filter(badge => {
      if (searchInput && searchInput.value) {
        const searchText = searchInput.value.trim().toLowerCase();
        const combinedText = [getDisplayTitle(badge), badge.description]
          .map(v => (v || "").toLowerCase())
          .join(" ");
        if (!combinedText.includes(searchText)) return false;
      }
      return true;
    });

    if (!filtered.length) {
      const noDataText = searchInput && searchInput.value ? "No badges match your search." : "No badges created yet.";
      tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">${noDataText}</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered
      .map(badge => {
        const displayTitleRaw = getDisplayTitle(badge);
        const displayTitle = escapeHtml(displayTitleRaw);
        const resolvedImageUrl = getResolvedBadgeImageUrl(badge);
        const badgeId = escapeHtml(String(badge.id));
        const imageCell = `
          <button type="button" class="btn p-0 border-0 bg-transparent view-badge" data-id="${badgeId}" aria-label="View badge image">
            <img src="${escapeHtml(resolvedImageUrl)}" alt="${displayTitle}" class="badge-preview">
          </button>
        `;
        return `
          <tr data-id="${badgeId}">
            <td>${displayTitle}</td>
            <td>${escapeHtml(badge.description)}</td>
            <td>${imageCell}</td>
          </tr>
        `;
      })
      .join("");
  }

  badgeForm.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = badgeForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";

    const payload = {
      title: badgeForm.querySelector("#badgeTitle").value.trim(),
      description: badgeForm.querySelector("#badgeDescription").value.trim(),
      image_url: imageInput.value.trim() || ""
    };

    const method = editingId ? "PUT" : "POST";
    const options = { method, body: payload };

    if (editingId) {
      options.params = { id: editingId };
    }

    try {
      await window.apiRequest(endpoint, options);
      await loadBadges();
      showAlert(
        alertContainer,
        "success",
        editingId ? "Badge updated successfully." : "Badge added successfully."
      );
      modalInstance.hide();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Unable to save badge.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Save";
    }
  });

  tableBody.addEventListener("click", async event => {
    const viewButton = event.target.closest(".view-badge");

    if (viewButton) {
      const id = viewButton.getAttribute("data-id");
      const badge = badges.find(item => String(item.id) === String(id));
      if (!badge || !imageModalInstance) return;

      const displayTitle = getDisplayTitle(badge);
      const resolvedImageUrl = getResolvedBadgeImageUrl(badge);

      if (imageModalTitle) imageModalTitle.textContent = displayTitle;
      if (imageModalDescription) {
        const explicitDescription = badge.description?.trim();
        imageModalDescription.textContent = explicitDescription || getBadgeDescription(badge);
      }

      if (imageModalImage) {
        imageModalImage.src = resolvedImageUrl;
        imageModalImage.classList.remove("d-none");
        // Basic error fallback
        imageModalImage.onerror = () => {
          imageModalImage.classList.add("d-none");
          if (imageModalFallback) imageModalFallback.classList.remove("d-none");
        };
      }

      if (imageModalFallback) imageModalFallback.classList.add("d-none");
      if (imageModalDesign) imageModalDesign.classList.add("d-none");

      imageModalInstance.show();
    }
  });

  if (imageModalElement) {
    imageModalElement.addEventListener("hidden.bs.modal", () => {
      if (imageModalImage) {
        imageModalImage.src = "";
        imageModalImage.classList.add("d-none");
        imageModalImage.onerror = null; // Reset error handler
      }
      if (imageModalFallback) {
        imageModalFallback.classList.remove("d-none");
      }
      if (imageModalDesign) {
        imageModalDesign.classList.add("d-none");
      }
      if (imageModalDescription) {
        imageModalDescription.textContent = "";
      }
    });
  }

  loadBadges();
});
