document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#studentsTable tbody");
  const alertContainer = document.getElementById("studentsAlert");
  const studentForm = document.getElementById("studentForm");
  const modalElement = document.getElementById("studentModal");
  const modalInstance = new bootstrap.Modal(modalElement);
  const modalLabel = document.getElementById("studentModalLabel");
  const addButton = document.getElementById("addStudentBtn");

  let editingId = null;
  let students = [];

  const endpoint = "students.php";

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
    studentForm.reset();
    studentForm.querySelector("button[type='submit']").disabled = false;
    studentForm.querySelector("button[type='submit']").textContent = "Save";
    editingId = null;
    modalLabel.textContent = "Add Student";
  }

  addButton.addEventListener("click", () => {
    resetForm();
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    resetForm();
  });

  async function loadStudents() {
    try {
      const data = await window.apiRequest(endpoint);
      students = Array.isArray(data) ? data : [];
      renderTable();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to load students. Please try again.");
    }
  }

  function renderTable() {
    if (!students.length) {
      tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No student records yet.</td></tr>';
      return;
    }

    tableBody.innerHTML = students
      .map(student => {
        return `
          <tr data-id="${student.id}">
            <td>${escapeHtml(student.student_id)}</td>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.email)}</td>
            <td>${escapeHtml(student.course)}</td>
            <td>${escapeHtml(student.year_level)}</td>
            <td class="text-end table-actions">
              <button class="btn btn-sm btn-outline-secondary edit-student" data-id="${student.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger delete-student" data-id="${student.id}">Delete</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  studentForm.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = studentForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";

    const payload = {
      student_id: studentForm.querySelector("#studentStudentId").value.trim(),
      name: studentForm.querySelector("#studentName").value.trim(),
      email: studentForm.querySelector("#studentEmail").value.trim(),
      course: studentForm.querySelector("#studentCourse").value.trim(),
      year_level: studentForm.querySelector("#studentYearLevel").value.trim()
    };

    const method = editingId ? "PUT" : "POST";
    const options = {
      method,
      body: payload
    };

    if (editingId) {
      options.params = { id: editingId };
    }

    try {
      await window.apiRequest(endpoint, options);
      await loadStudents();
      showAlert(
        alertContainer,
        "success",
        editingId ? "Student updated successfully." : "Student added successfully."
      );
      modalInstance.hide();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Unable to save student.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Save";
    }
  });

  tableBody.addEventListener("click", async event => {
    const editButton = event.target.closest(".edit-student");
    const deleteButton = event.target.closest(".delete-student");

    if (editButton) {
      const id = editButton.getAttribute("data-id");
      const student = students.find(item => String(item.id) === String(id));
      if (!student) return;

      editingId = student.id;
      modalLabel.textContent = "Edit Student";
      studentForm.querySelector("#studentStudentId").value = student.student_id || "";
      studentForm.querySelector("#studentName").value = student.name || "";
      studentForm.querySelector("#studentEmail").value = student.email || "";
      studentForm.querySelector("#studentCourse").value = student.course || "";
      studentForm.querySelector("#studentYearLevel").value = student.year_level || "";
      modalInstance.show();
      return;
    }

    if (deleteButton) {
      const id = deleteButton.getAttribute("data-id");
      const confirmDelete = await window.showConfirm({
        title: "Delete Student",
        body: "Are you sure you want to delete this student?",
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
        await loadStudents();
        showAlert(alertContainer, "success", "Student deleted successfully.");
      } catch (error) {
        console.error(error);
        showAlert(alertContainer, "danger", error.message || "Failed to delete student.");
      }
    }
  });

  loadStudents();
});
