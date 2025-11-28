document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#certificatesTable tbody");
  const alertContainer = document.getElementById("certificatesAlert");
  const searchInput = document.getElementById("searchInput");

  const issueBadgeForm = document.getElementById("issueBadgeForm");
  const issueStudent = document.getElementById("issueStudent");
  const issueSubject = document.getElementById("issueSubject");
  const issueBadge = document.getElementById("issueBadge");
  const issueDate = document.getElementById("issueDate");

  const isAdminView = !!issueBadgeForm; // Admin has the issue form, instructors do not

  let students = [];
  let subjects = [];
  let badges = [];
  let issuedBadges = [];
  let courses = [];

  function getActiveUser() {
    return typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
  }

  const filters = {
    search: ""
  };

  const endpoints = {
    students: "students.php",
    subjects: "subjects.php",
    badges: "badges.php",
    issuedBadges: "certificates.php"
  };

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

  function formatDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function populateSelect(element, collection, valueKey, labelBuilder, includePlaceholder = true) {
    const options = [];
    if (includePlaceholder) {
      options.push('<option value="">Select...</option>');
    }
    options.push(
      ...collection.map(item =>
        `<option value="${escapeHtml(String(item[valueKey]))}">${labelBuilder(item)}</option>`
      )
    );
    element.innerHTML = options.join("");
  }

  function renderTable() {
    const filtered = issuedBadges.filter(record => {
      if (filters.search) {
        const searchText = filters.search.trim().toLowerCase();
        const student = students.find(s => s.id === record.student_id);
        const subject = subjects.find(s => s.id === record.subject_id);
        const badge = badges.find(b => b.id === record.badge_id);
        const combinedText = [
          student?.name,
          student?.student_id,
          subject?.title,
          subject?.code,
          badge?.title
        ]
          .map(value => (value || "").toLowerCase())
          .join(" ");
        if (!combinedText.includes(searchText)) return false;
      }
      return true;
    });

    if (!filtered.length) {
      const noDataText = "No issued certificates found.";
      tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">${noDataText}</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(record => {
      const student = students.find(s => s.id === record.student_id);
      const subject = subjects.find(s => s.id === record.subject_id);
      const badge = badges.find(b => b.id === record.badge_id);

      const studentLabel = student ? `${escapeHtml(student.name)} (${escapeHtml(student.student_id || "")})` : "Unknown student";
      const subjectLabel = subject ? `${escapeHtml(subject.title)} (${escapeHtml(subject.code || "")})` : "Unknown subject";
      const badgeLabel = badge ? escapeHtml(badge.title) : "Unknown certificate";

      const actions = isAdminView
        ? `<button class="btn btn-sm btn-outline-danger delete-issued" data-id="${record.id}">Delete</button>`
        : ""; // Instructors can't delete issued certificates

      return `
        <tr data-id="${record.id}">
          <td>${studentLabel}</td>
          <td>${subjectLabel}</td>
          <td>${badgeLabel}</td>
          <td>${formatDate(record.date_issued)}</td>
          <td class="text-end table-actions">${actions}</td>
        </tr>
      `;
    }).join("");
  }

  async function loadStudents() {
    try {
      const data = await window.apiRequest(endpoints.students);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", "Failed to load students.");
      return [];
    }
  }

  async function loadSubjects() {
    try {
      const data = await window.apiRequest(endpoints.subjects);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", "Failed to load subjects.");
      return [];
    }
  }

  async function loadBadges() {
    try {
      const data = await window.apiRequest(endpoints.badges);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", "Failed to load badges.");
      return [];
    }
  }

  async function loadIssuedCertificates() {
    try {
      const [issuedData, coursesData] = await Promise.all([
        window.apiRequest(endpoints.issuedBadges),
        window.apiRequest("courses.php")
      ]);
      issuedBadges = Array.isArray(issuedData) ? issuedData : [];
      courses = Array.isArray(coursesData) ? coursesData : [];
      const user = getActiveUser();
      if (user && user.role === "instructor") {
        issuedBadges = issuedBadges.filter(record => {
          const course = courses.find(c => c.id == record.course_id);
          return course && course.instructor_id == user.id;
        });
      }
      renderTable();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", "Failed to load issued certificates.");
    }
  }

  function initializeFilters() {
    if (isAdminView) {
      // No additional filters for admin
    } else {
      // For instructors, hide filters (though not present)
    }
  }

  async function bootstrapData() {
    if (isAdminView) {
      // Admin: load issued certificates and data for issuing
      const [badgesData, studentsData, subjectsData, issuedData, coursesData] = await Promise.all([
        loadBadges(),
        loadStudents(),
        loadSubjects(),
        window.apiRequest(endpoints.issuedBadges),
        window.apiRequest("courses.php")
      ]);

      badges = badgesData;
      students = studentsData;
      subjects = subjectsData;
      issuedBadges = Array.isArray(issuedData) ? issuedData : [];
      courses = Array.isArray(coursesData) ? coursesData : [];

      populateSelect(issueStudent, students, "id", item =>
        `${escapeHtml(item.name)} (${escapeHtml(item.student_id || "")})`
      );
      populateSelect(issueSubject, subjects, "id", item =>
        `${escapeHtml(item.title)} (${escapeHtml(item.code || "")})`
      );
      populateSelect(issueBadge, badges, "id", item => escapeHtml(item.title));

      initializeFilters();

      if (!issueDate.value) {
        const today = new Date();
        issueDate.value = today.toISOString().slice(0, 10);
      }

      renderTable();
    } else {
      // Instructors: load issued certificates from their courses
      const [issuedData, coursesData] = await Promise.all([
        window.apiRequest(endpoints.issuedBadges),
        window.apiRequest("courses.php")
      ]);
      issuedBadges = Array.isArray(issuedData) ? issuedData : [];
      courses = Array.isArray(coursesData) ? coursesData : [];
      const user = getActiveUser();
      if (user && user.role === "instructor") {
        issuedBadges = issuedBadges.filter(record => {
          const course = courses.find(c => c.id == record.course_id);
          return course && course.instructor_id == user.id;
        });
      }
      initializeFilters();
      renderTable();
    }
  }

  if (isAdminView && issueBadgeForm) {
    issueBadgeForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = issueBadgeForm.querySelector("button[type='submit']");
      submitButton.disabled = true;
      submitButton.textContent = "Saving...";

      const payload = {
        student_id: Number(issueStudent.value),
        subject_id: Number(issueSubject.value),
        badge_id: Number(issueBadge.value),
        date_issued: issueDate.value
      };

      if (!payload.student_id || !payload.subject_id || !payload.badge_id || !payload.date_issued) {
        showAlert(alertContainer, "danger", "Please complete all fields before issuing a certificate.");
        submitButton.disabled = false;
        submitButton.textContent = "Save";
        return;
      }

      try {
        await window.apiRequest(endpoints.issuedBadges, {
          method: "POST",
          body: payload
        });

        await loadIssuedCertificates();
        showAlert(alertContainer, "success", "Certificate issued successfully.");

        issueBadgeForm.reset();
        if (!issueDate.value) {
          const today = new Date();
          issueDate.value = today.toISOString().slice(0, 10);
        }

        const modalElement = document.getElementById("issueBadgeModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      } catch (error) {
        console.error(error);
        showAlert(alertContainer, "danger", error.message || "Failed to issue certificate.");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Save";
      }
    });
  }

  tableBody.addEventListener("click", async (event) => {
    const deleteButton = event.target.closest(".delete-issued");
    if (!deleteButton) return;
    const id = deleteButton.getAttribute("data-id");
    const confirmDelete = await window.showConfirm({
      title: "Delete Issued Certificate",
      body: "Are you sure you want to delete this issued certificate record?",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmClass: "btn btn-danger",
      cancelClass: "btn btn-outline-secondary"
    });
    if (!confirmDelete) return;

    try {
      await window.apiRequest(endpoints.issuedBadges, {
        method: "DELETE",
        params: { id }
      });
      await loadIssuedCertificates();
      showAlert(alertContainer, "success", "Issued certificate deleted successfully.");
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to delete issued certificate.");
    }
  });

  searchInput.addEventListener("input", event => {
    filters.search = event.target.value;
    renderTable();
  });

  // For instructors: view badge
  tableBody.addEventListener("click", event => {
    const viewButton = event.target.closest(".view-badge");
    if (viewButton && !isAdminView) {
      const id = viewButton.getAttribute("data-id");
      const badge = badges.find(item => String(item.id) === String(id));
      if (!badge) return;

      // Show badge modal (assuming it's added to instructors/certificates.html)
      const imageModalElement = document.getElementById("badgeImageModal");
      if (!imageModalElement) return;
      const imageModalInstance = new bootstrap.Modal(imageModalElement);
      const imageModalTitle = document.getElementById("badgeImageModalLabel");
      const imageModalImage = document.getElementById("badgeImageModalImage");
      const imageModalFallback = document.getElementById("badgeImageModalFallback");
      const imageModalDesign = document.getElementById("badgeImageModalDesign");
      const imageModalDesignTitle = document.getElementById("badgeImageModalDesignTitle");
      const imageModalDescription = document.getElementById("badgeImageModalDescription");

      const displayTitle = badge.title || "Certificate";
      const rawImageUrl = badge.image_url?.trim() || "";
      const hasCustomImage = Boolean(rawImageUrl) && !rawImageUrl.startsWith("data:image/svg+xml");

      if (imageModalTitle) imageModalTitle.textContent = displayTitle;
      if (imageModalDescription) {
        imageModalDescription.textContent = badge.description || `Awarded for completing a course.`;
      }

      if (hasCustomImage) {
        imageModalImage.src = rawImageUrl;
        imageModalImage.classList.remove("d-none");
        if (imageModalFallback) imageModalFallback.classList.add("d-none");
        if (imageModalDesign) imageModalDesign.classList.add("d-none");
      } else {
        imageModalImage.src = "";
        imageModalImage.classList.add("d-none");
        if (imageModalFallback) imageModalFallback.classList.remove("d-none");
        if (imageModalDesign) {
          imageModalDesign.classList.remove("d-none");
          if (imageModalDesignTitle) {
            imageModalDesignTitle.textContent = displayTitle;
          }
        }
      }

      imageModalInstance.show();
    }
  });

  // For admin: issue badge
  tableBody.addEventListener("click", event => {
    const issueButton = event.target.closest(".issue-badge");
    if (issueButton && isAdminView) {
      const id = issueButton.getAttribute("data-id");
      const badge = badges.find(item => String(item.id) === String(id));
      if (!badge) return;

      // Pre-select the badge in the modal
      issueBadge.value = id;

      const modalElement = document.getElementById("issueBadgeModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  });

  bootstrapData();
});
