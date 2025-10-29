document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#issuedBadgesTable tbody");
  const alertContainer = document.getElementById("issuedBadgesAlert");
  const searchInput = document.getElementById("searchInput");
  const badgeFilter = document.getElementById("badgeFilter");
  const subjectFilter = document.getElementById("subjectFilter");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  const issueBadgeForm = document.getElementById("issueBadgeForm");
  const issueStudent = document.getElementById("issueStudent");
  const issueSubject = document.getElementById("issueSubject");
  const issueBadge = document.getElementById("issueBadge");
  const issueDate = document.getElementById("issueDate");

  let students = [];
  let subjects = [];
  let badges = [];
  let issuedBadges = [];

  const filters = {
    search: "",
    badgeId: "all",
    subjectId: "all"
  };

  const endpoints = {
    students: "students.php",
    subjects: "subjects.php",
    badges: "badges.php",
    issuedBadges: "issued_badges.php"
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

  function populateFilterSelect(element, placeholder, collection, valueKey, labelBuilder) {
    const options = [`<option value="all">${placeholder}</option>`];
    options.push(
      ...collection.map(item =>
        `<option value="${escapeHtml(String(item[valueKey]))}">${labelBuilder(item)}</option>`
      )
    );
    element.innerHTML = options.join("");
  }

  function applyFilters(records) {
    return records.filter(record => {
      const matchesBadge = filters.badgeId === "all" || String(record.badge_id) === filters.badgeId;
      const matchesSubject = filters.subjectId === "all" || String(record.subject_id) === filters.subjectId;

      const searchText = filters.search.trim().toLowerCase();
      if (!searchText) return matchesBadge && matchesSubject;

      const student = students.find(item => item.id === record.student_id);
      const subject = subjects.find(item => item.id === record.subject_id);
      const badge = badges.find(item => item.id === record.badge_id);

      const combinedText = [
        student?.name,
        student?.student_id,
        subject?.title,
        subject?.code,
        badge?.title
      ]
        .map(value => (value || "").toLowerCase())
        .join(" ");

      const matchesSearch = combinedText.includes(searchText);
      return matchesBadge && matchesSubject && matchesSearch;
    });
  }

  function renderIssuedBadges() {
    const filtered = applyFilters(issuedBadges);

    if (!filtered.length) {
      tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No issued badges found.</td></tr>';
      return;
    }

    tableBody.innerHTML = filtered
      .map(record => {
        const student = students.find(item => item.id === record.student_id);
        const subject = subjects.find(item => item.id === record.subject_id);
        const badge = badges.find(item => item.id === record.badge_id);

        const studentLabel = student
          ? `${escapeHtml(student.name)} (${escapeHtml(student.student_id || "")})`
          : "Unknown student";
        const subjectLabel = subject
          ? `${escapeHtml(subject.title)} (${escapeHtml(subject.code || "")})`
          : "Unknown subject";
        const badgeLabel = badge ? escapeHtml(badge.title) : "Unknown badge";

        return `
          <tr data-id="${record.id}">
            <td>${studentLabel}</td>
            <td>${subjectLabel}</td>
            <td>${badgeLabel}</td>
            <td>${formatDate(record.date_issued)}</td>
            <td class="text-end table-actions">
              <button class="btn btn-sm btn-outline-danger delete-issued" data-id="${record.id}">Delete</button>
            </td>
          </tr>
        `;
      })
      .join("");
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

  async function loadIssuedBadges() {
    try {
      const data = await window.apiRequest(endpoints.issuedBadges);
      issuedBadges = Array.isArray(data) ? data : [];
      renderIssuedBadges();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", "Failed to load issued badges.");
    }
  }

  function initializeFilters() {
    populateFilterSelect(badgeFilter, "All badges", badges, "id", item => escapeHtml(item.title));
    populateFilterSelect(subjectFilter, "All subjects", subjects, "id", item => escapeHtml(item.title));
    badgeFilter.value = "all";
    subjectFilter.value = "all";
  }

  async function bootstrapData() {
    const [studentsData, subjectsData, badgesData] = await Promise.all([
      loadStudents(),
      loadSubjects(),
      loadBadges()
    ]);

    students = studentsData;
    subjects = subjectsData;
    badges = badgesData;

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

    await loadIssuedBadges();
  }

  issueBadgeForm.addEventListener("submit", async event => {
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
      showAlert(alertContainer, "danger", "Please complete all fields before issuing a badge.");
      submitButton.disabled = false;
      submitButton.textContent = "Save";
      return;
    }

    try {
      await window.apiRequest(endpoints.issuedBadges, {
        method: "POST",
        body: payload
      });

      await loadIssuedBadges();
      showAlert(alertContainer, "success", "Badge issued successfully.");

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
      showAlert(alertContainer, "danger", error.message || "Failed to issue badge.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Save";
    }
  });

  tableBody.addEventListener("click", async event => {
    const deleteButton = event.target.closest(".delete-issued");
    if (!deleteButton) return;
    const id = deleteButton.getAttribute("data-id");
    const confirmDelete = await window.showConfirm({
      title: "Delete Issued Badge",
      body: "Are you sure you want to delete this issued badge record?",
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
      await loadIssuedBadges();
      showAlert(alertContainer, "success", "Issued badge deleted successfully.");
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to delete issued badge.");
    }
  });

  searchInput.addEventListener("input", event => {
    filters.search = event.target.value;
    renderIssuedBadges();
  });

  badgeFilter.addEventListener("change", event => {
    filters.badgeId = event.target.value || "all";
    renderIssuedBadges();
  });

  subjectFilter.addEventListener("change", event => {
    filters.subjectId = event.target.value || "all";
    renderIssuedBadges();
  });

  clearFiltersBtn.addEventListener("click", () => {
    filters.search = "";
    filters.badgeId = "all";
    filters.subjectId = "all";
    searchInput.value = "";
    badgeFilter.value = "all";
    subjectFilter.value = "all";
    renderIssuedBadges();
  });

  bootstrapData();
});
