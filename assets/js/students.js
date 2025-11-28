document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#studentsTable tbody");
  const alertContainer = document.getElementById("studentsAlert");
  const studentForm = document.getElementById("studentForm");
  const modalElement = document.getElementById("studentModal");
  const modalInstance = new bootstrap.Modal(modalElement);
  const modalLabel = document.getElementById("studentModalLabel");
  const addButton = document.getElementById("addStudentBtn");

  const coursesModal = document.getElementById("coursesModal");
  const coursesModalInstance = new bootstrap.Modal(coursesModal);
  const coursesModalLabel = document.getElementById("coursesModalLabel");
  const completedCoursesList = document.getElementById("completedCoursesList");

  let editingId = null;
  let students = [];

  const endpoint = "users.php";

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
      const data = await window.apiRequest(endpoint, { params: { role: "student" } });
      students = Array.isArray(data) ? data : [];
      renderTable();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to load students. Please try again.");
    }
  }

  function renderTable() {
    if (!students.length) {
      tableBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No student records yet.</td></tr>';
      return;
    }

    tableBody.innerHTML = students
      .map(student => {
        return `
          <tr data-id="${student.id}">
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.email)}</td>
            <td class="text-end table-actions">
              <button class="btn btn-sm btn-outline-primary view-courses" data-id="${student.id}">View Completed Courses</button>
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
      name: studentForm.querySelector("#studentName").value.trim(),
      email: studentForm.querySelector("#studentEmail").value.trim(),
      role: "student"
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
    const viewButton = event.target.closest(".view-courses");

    if (viewButton) {
      const id = viewButton.getAttribute("data-id");
      const student = students.find(item => String(item.id) === String(id));
      if (!student) return;

      coursesModalLabel.textContent = `Completed Courses for ${student.name}`;
      completedCoursesList.innerHTML = '<li class="list-group-item">Loading...</li>';
      coursesModalInstance.show();

      try {
        const enrollments = await window.apiRequest("enrollments.php", { params: { student_id: id, status: "completed" } });
        if (!enrollments || !enrollments.length) {
          completedCoursesList.innerHTML = '<li class="list-group-item">No completed courses.</li>';
        } else {
          const courseIds = enrollments.map(e => e.course_id);
          const courses = [];
          for (const cid of courseIds) {
            try {
              const courseResult = await window.apiRequest("courses.php", { params: { id: cid } });
              const courseArray = Array.isArray(courseResult)
                ? courseResult
                : courseResult && typeof courseResult === "object"
                  ? [courseResult]
                  : [];
              const course = courseArray.find(item => String(item.id) === String(cid));
              if (course && course.title) courses.push(course);
            } catch (err) {
              console.error(`Failed to load course ${cid}:`, err);
            }
          }
          if (!courses.length) {
            completedCoursesList.innerHTML = '<li class="list-group-item">No course details found.</li>';
          } else {
            completedCoursesList.innerHTML = courses.map(c => `<li class="list-group-item">${escapeHtml(c.title)}</li>`).join("");
          }
        }
      } catch (error) {
        console.error(error);
        completedCoursesList.innerHTML = '<li class="list-group-item text-danger">Failed to load completed courses.</li>';
      }
      return;
    }
  });

  loadStudents();
});
