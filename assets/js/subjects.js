document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#subjectsTable tbody");
  const alertContainer = document.getElementById("subjectsAlert");
  const subjectForm = document.getElementById("subjectForm");
  const modalElement = document.getElementById("subjectModal");
  const modalInstance = new bootstrap.Modal(modalElement);
  const modalLabel = document.getElementById("subjectModalLabel");

  let editingId = null;
  let subjects = [];

  const endpoint = "subjects.php";

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

  function resetForm() {
    subjectForm.reset();
    subjectForm.querySelector("button[type='submit']").disabled = false;
    subjectForm.querySelector("button[type='submit']").textContent = "Save";
    editingId = null;
    modalLabel.textContent = "Add Subject";
  }

  modalElement.addEventListener("hidden.bs.modal", () => {
    resetForm();
  });

  async function loadSubjects() {
    try {
      const data = await window.apiRequest(endpoint);
      subjects = Array.isArray(data) ? data : [];
      renderTable();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to load subjects. Please try again.");
    }
  }

  function renderTable() {
    if (!subjects.length) {
      tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No subject records yet.</td></tr>';
      return;
    }

    tableBody.innerHTML = subjects
      .map(subject => {
        return `
          <tr data-id="${subject.id}">
            <td>${escapeHtml(subject.code)}</td>
            <td>${escapeHtml(subject.title)}</td>
            <td>${escapeHtml(subject.instructor)}</td>
            <td class="text-end table-actions">
              <button class="btn btn-sm btn-outline-secondary edit-subject" data-id="${subject.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger delete-subject" data-id="${subject.id}">Delete</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  subjectForm.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = subjectForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";

    const payload = {
      code: subjectForm.querySelector("#subjectCode").value.trim(),
      title: subjectForm.querySelector("#subjectTitle").value.trim(),
      instructor: subjectForm.querySelector("#subjectInstructor").value.trim()
    };

    const method = editingId ? "PUT" : "POST";
    const options = { method, body: payload };

    if (editingId) {
      options.params = { id: editingId };
    }

    try {
      await window.apiRequest(endpoint, options);
      await loadSubjects();
      showAlert(
        alertContainer,
        "success",
        editingId ? "Subject updated successfully." : "Subject added successfully."
      );
      modalInstance.hide();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Unable to save subject.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Save";
    }
  });

  tableBody.addEventListener("click", async event => {
    const editButton = event.target.closest(".edit-subject");
    const deleteButton = event.target.closest(".delete-subject");

    if (editButton) {
      const id = editButton.getAttribute("data-id");
      const subject = subjects.find(item => String(item.id) === String(id));
      if (!subject) return;

      editingId = subject.id;
      modalLabel.textContent = "Edit Subject";
      subjectForm.querySelector("#subjectCode").value = subject.code || "";
      subjectForm.querySelector("#subjectTitle").value = subject.title || "";
      subjectForm.querySelector("#subjectInstructor").value = subject.instructor || "";
      modalInstance.show();
      return;
    }

    if (deleteButton) {
      const id = deleteButton.getAttribute("data-id");
      const confirmDelete = await window.showConfirm({
        title: "Delete Subject",
        body: "Are you sure you want to delete this subject?",
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmClass: "btn btn-danger",
        cancelClass: "btn btn-outline-secondary"
      });
      if (!confirmDelete) return;

      try {
        await window.apiRequest(endpoint, {
          method: "DELETE",
          params: { id }
        });
        await loadSubjects();
        showAlert(alertContainer, "success", "Subject deleted successfully.");
      } catch (error) {
        console.error(error);
        showAlert(alertContainer, "danger", error.message || "Failed to delete subject.");
      }
    }
  });

  loadSubjects();
});
