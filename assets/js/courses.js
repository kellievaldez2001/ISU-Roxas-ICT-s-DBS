document.addEventListener("DOMContentLoaded", () => {
  const alertContainer = document.getElementById("coursesAlert");
  const coursesCatalog = document.getElementById("coursesCatalog");
  const myCoursesList = document.getElementById("myCoursesList");
  const instructorSection = document.getElementById("instructorCoursesSection");
  const instructorTableBody = document.querySelector("#instructorCoursesTable tbody");
  const coursesActions = document.getElementById("coursesActions");
  const addCourseBtn = document.getElementById("addCourseBtn");
  const catalogFilters = {
    category: document.getElementById("categoryFilter"),
    instructor: document.getElementById("instructorFilter"),
    search: document.getElementById("courseSearch")
  };

  const courseModalElement = document.getElementById("courseModal");
  const courseModal = courseModalElement ? new bootstrap.Modal(courseModalElement) : null;
  const courseForm = document.getElementById("courseForm");
  const courseModalLabel = document.getElementById("courseModalLabel");

  const badgeSelect = document.getElementById("courseBadge");

  let courses = [];
  let lessons = [];
  let enrollments = [];
  let badges = [];
  let instructors = [];
  let editingCourseId = null;

  const endpoints = {
    courses: "courses.php",
    lessons: "lessons.php",
    enrollments: "enrollments.php",
    badges: "badges.php",
    users: "users.php"
  };

  function getUserRole(user) {
    if (!user) return "guest";
    if (user.role === "admin") return "admin";
    if (user.role === "instructor") return "instructor";
    return "student";
  }

  function getActiveUser() {
    return typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
  }

  function renderCatalog() {
    const user = getActiveUser();
    const role = getUserRole(user);
    const selectedCategory = catalogFilters.category?.value || "all";
    const selectedInstructor = catalogFilters.instructor?.value || "all";
    const searchTerm = (catalogFilters.search?.value || "").trim().toLowerCase();

    const visibleCourses = courses.filter(course => {
      if (course.status !== "published" && role === "student") {
        return false;
      }

      if (selectedCategory !== "all" && selectedCategory !== "") {
        if ((course.category || "").toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      if (selectedInstructor !== "all" && selectedInstructor !== "") {
        if (String(course.instructor_id || "") !== selectedInstructor) {
          return false;
        }
      }

      if (searchTerm) {
        const haystack = `${course.title || ""} ${course.description || ""}`.toLowerCase();
        if (!haystack.includes(searchTerm)) {
          return false;
        }
      }

      if (course.status === "draft" && role !== "admin" && role !== "instructor") {
        return false;
      }

      return true;
    });

    if (!visibleCourses.length) {
      coursesCatalog.innerHTML = `
        <div class="col-12">
          <div class="alert alert-secondary mb-0" role="alert">
            No courses found. Try adjusting the filters.
          </div>
        </div>
      `;
      return;
    }

    coursesCatalog.innerHTML = visibleCourses
      .map(course => {
        const instructor = instructors.find(item => Number(item.id) === Number(course.instructor_id));
        const badge = badges.find(item => Number(item.id) === Number(course.badge_id));
        const enrollment = enrollments.find(item => Number(item.course_id) === Number(course.id));
        const isEnrolled = Boolean(enrollment);
        const progress = enrollment ? Math.min(enrollment.progress || 0, 100) : 0;

        const statusPill = role !== "student"
          ? `<span class="badge bg-${course.status === "published" ? "success" : "secondary"}">${course.status}</span>`
          : "";

        const enrollButton = role === "student"
          ? `<button class="btn btn-sm ${isEnrolled ? "btn-outline-primary" : "btn-primary"}" data-action="$${
              isEnrolled ? "continue" : "enroll"
            }" data-course="${course.id}">${isEnrolled ? "Continue" : "Enroll"}</button>`
          : `<button class="btn btn-sm btn-outline-secondary" data-action="view" data-course="${course.id}">View</button>`;

        const badgeInfo = badge
          ? `<div class="small text-muted">Badge: ${badge.title}</div>`
          : "";

        const progressMarkup = isEnrolled
          ? `<div class="mt-2">
              <div class="progress" style="height: 6px;">
                <div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="small text-muted mt-1">Progress: ${progress}%</div>
            </div>`
          : "";

        return `
          <div class="col-12 col-md-6">
            <div class="card h-100 shadow-sm">
              ${course.thumbnail_url ? `<img src="${course.thumbnail_url}" class="card-img-top" alt="${course.title}">` : ""}
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h3 class="card-title h5 mb-0">${course.title}</h3>
                  ${statusPill}
                </div>
                <p class="card-text">${course.description || ""}</p>
                <div class="small text-muted mb-2">${course.category || "General"}</div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="small text-muted">${instructor ? instructor.name : "Unknown Instructor"}</div>
                  ${enrollButton}
                </div>
                ${badgeInfo}
                ${progressMarkup}
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderMyCourses() {
    const user = getActiveUser();
    const role = getUserRole(user);

    if (role === "guest") {
      myCoursesList.innerHTML = `<div class="alert alert-warning mb-0" role="alert">Select a user to see course progress.</div>`;
      return;
    }

    if (role !== "student") {
      myCoursesList.innerHTML = `<div class="text-muted">Switch to a student to preview the learner experience.</div>`;
      return;
    }

    const userEnrollments = enrollments.filter(enrollment => Number(enrollment.student_id) === Number(user.id));

    if (!userEnrollments.length) {
      myCoursesList.innerHTML = `<div class="alert alert-info mb-0" role="alert">You are not enrolled in any courses yet.</div>`;
      return;
    }

    myCoursesList.innerHTML = userEnrollments
      .map(enrollment => {
        const course = courses.find(item => Number(item.id) === Number(enrollment.course_id));
        if (!course) return "";
        const progress = Math.min(enrollment.progress || 0, 100);
        return `
          <div class="border rounded p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h3 class="h6 mb-1">${course.title}</h3>
                <div class="small text-muted">${course.category || "General"}</div>
              </div>
              <button class="btn btn-sm btn-outline-primary" data-action="continue" data-course="${course.id}">Continue</button>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="small text-muted mt-2">${enrollment.status === "completed" ? "Completed" : `In progress (${progress}%)`}</div>
          </div>
        `;
      })
      .join("");
  }

  function renderInstructorTable() {
    const user = getActiveUser();
    const role = getUserRole(user);

    if (role === "admin" || role === "instructor") {
      instructorSection.hidden = false;
      coursesActions.hidden = false;

      const managedCourses = role === "admin" ? courses : courses.filter(course => Number(course.instructor_id) === Number(user.id));

      if (!managedCourses.length) {
        instructorTableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No courses created yet.</td></tr>`;
        return;
      }

      instructorTableBody.innerHTML = managedCourses
        .map(course => {
          const lessonCount = lessons.filter(lesson => Number(lesson.course_id) === Number(course.id)).length;
          const enrollmentCount = enrollments.filter(enrollment => Number(enrollment.course_id) === Number(course.id)).length;
          const statusBadge = course.status === "published" ? "success" : course.status === "draft" ? "secondary" : "info";
          return `
            <tr data-course="${course.id}">
              <td>
                <div class="fw-semibold">${course.title}</div>
                <div class="small text-muted">${course.category || "General"}</div>
              </td>
              <td><span class="badge bg-${statusBadge}">${course.status}</span></td>
              <td>${lessonCount}</td>
              <td>${enrollmentCount}</td>
              <td class="text-end">
                <div class="btn-group btn-group-sm" role="group">
                  <button class="btn btn-outline-secondary" data-action="edit" data-course="${course.id}">Edit</button>
                  <button class="btn btn-outline-secondary" data-action="lessons" data-course="${course.id}">Lessons</button>
                  <button class="btn btn-outline-primary" data-action="view" data-course="${course.id}">View</button>
                  <button class="btn btn-outline-danger" data-action="delete" data-course="${course.id}">Delete</button>
                </div>
              </td>
            </tr>
          `;
        })
        .join("");
    } else {
      instructorSection.hidden = true;
      coursesActions.hidden = true;
    }
  }

  function populateFilters() {
    const categories = Array.from(new Set(courses.map(course => (course.category || "General").trim())));
    const instructorOptions = instructors.filter(user => user.role === "instructor");

    if (catalogFilters.category) {
      catalogFilters.category.innerHTML = ["All categories", ...categories]
        .map((label, index) => `<option value="${index === 0 ? "all" : label}">${label}</option>`)
        .join("");
    }

    if (catalogFilters.instructor) {
      catalogFilters.instructor.innerHTML = [
        `<option value="all">All instructors</option>`,
        ...instructorOptions.map(user => `<option value="${user.id}">${user.name}</option>`)
      ].join("");
    }
  }

  function populateBadgeSelect() {
    if (!badgeSelect) return;
    badgeSelect.innerHTML = ['<option value="">No badge</option>', ...badges.map(badge => `<option value="${badge.id}">${badge.title}</option>`)].join("");
  }

  function resetCourseForm() {
    courseForm.reset();
    editingCourseId = null;
    if (courseModalLabel) {
      courseModalLabel.textContent = "Create Course";
    }
    const submitButton = courseForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Save";
    }
  }

  function openCourseModal(course) {
    if (!courseModal) return;

    if (course) {
      editingCourseId = course.id;
      if (courseModalLabel) {
        courseModalLabel.textContent = "Edit Course";
      }
      courseForm.querySelector("#courseTitle").value = course.title || "";
      courseForm.querySelector("#courseDescription").value = course.description || "";
      courseForm.querySelector("#courseCategory").value = course.category || "";
      courseForm.querySelector("#courseStatus").value = course.status || "draft";
      courseForm.querySelector("#courseThumbnail").value = course.thumbnail_url || "";
      courseForm.querySelector("#courseBadge").value = course.badge_id ? String(course.badge_id) : "";
    } else {
      resetCourseForm();
    }

    courseModal.show();
  }

  function closeCourseModal() {
    if (!courseModal) return;
    courseModal.hide();
  }

  async function loadData() {
    try {
      const user = getActiveUser();
      const role = getUserRole(user);
      const isInstructorOrAdmin = role === "instructor" || role === "admin";

      const [coursesData, lessonsData, enrollmentsData, badgesData, usersData] = await Promise.all([
        window.apiRequest(endpoints.courses),
        window.apiRequest(endpoints.lessons),
        user ? window.apiRequest(endpoints.enrollments, { params: role === "student" ? { student_id: user.id } : {} }) : window.apiRequest(endpoints.enrollments),
        window.apiRequest(endpoints.badges),
        window.apiRequest(endpoints.users)
      ]);

      courses = Array.isArray(coursesData) ? coursesData : [];
      lessons = Array.isArray(lessonsData) ? lessonsData : [];

      if (role === "student") {
        const studentEnrollments = Array.isArray(enrollmentsData) ? enrollmentsData : [];
        enrollments = studentEnrollments.filter(enrollment => Number(enrollment.student_id) === Number(user.id));
      } else {
        enrollments = Array.isArray(enrollmentsData) ? enrollmentsData : [];
      }

      badges = Array.isArray(badgesData) ? badgesData : [];
      instructors = Array.isArray(usersData) ? usersData.filter(item => item.role === "instructor" || item.role === "admin") : [];

      populateFilters();
      populateBadgeSelect();
      renderCatalog();
      renderMyCourses();
      renderInstructorTable();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to load courses data.");
    }
  }

  async function handleEnroll(courseId) {
    const user = getActiveUser();
    if (!user) {
      showAlert(alertContainer, "warning", "Select a user before enrolling in a course.");
      return;
    }

    try {
      await window.apiRequest(endpoints.enrollments, {
        method: "POST",
        body: {
          student_id: user.id,
          course_id: courseId,
          status: "in-progress",
          progress: 0,
          completed_lessons: []
        }
      });

      showAlert(alertContainer, "success", "Successfully enrolled in the course.");
      await loadData();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to enroll in the course.");
    }
  }

  async function handleDeleteCourse(courseId) {
    const confirmDelete = await window.showConfirm({
      title: "Delete Course",
      body: "Deleting this course will remove all lessons and enrollments. Continue?",
      confirmText: "Delete",
      confirmClass: "btn btn-danger",
      cancelText: "Cancel",
      cancelClass: "btn btn-outline-secondary"
    });

    if (!confirmDelete) return;

    try {
      await window.apiRequest(endpoints.courses, {
        method: "DELETE",
        params: { id: courseId }
      });
      showAlert(alertContainer, "success", "Course deleted successfully.");
      await loadData();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to delete course.");
    }
  }

  function handleContinueCourse(courseId) {
    // Placeholder for future course detail navigation
    window.location.href = `course_details.html?id=${courseId}`;
  }

  async function handleCourseFormSubmit(event) {
    event.preventDefault();
    const submitButton = courseForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Saving...";
    }

    const user = getActiveUser();
    if (!user) {
      showAlert(alertContainer, "warning", "Select an instructor user before creating a course.");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Save";
      }
      return;
    }

    try {
      const payload = {
        title: courseForm.querySelector("#courseTitle").value.trim(),
        description: courseForm.querySelector("#courseDescription").value.trim(),
        category: courseForm.querySelector("#courseCategory").value.trim() || "General",
        status: courseForm.querySelector("#courseStatus").value,
        thumbnail_url: courseForm.querySelector("#courseThumbnail").value.trim(),
        badge_id: courseForm.querySelector("#courseBadge").value ? Number(courseForm.querySelector("#courseBadge").value) : null,
        instructor_id: user.id
      };

      const method = editingCourseId ? "PUT" : "POST";
      const options = { method, body: payload };
      if (editingCourseId) {
        options.params = { id: editingCourseId };
      }

      await window.apiRequest(endpoints.courses, options);
      showAlert(alertContainer, "success", editingCourseId ? "Course updated successfully." : "Course created successfully.");
      closeCourseModal();
      await loadData();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to save course.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Save";
      }
    }
  }

  function attachEvents() {
    if (courseForm) {
      courseForm.addEventListener("submit", handleCourseFormSubmit);
    }

    if (courseModalElement) {
      courseModalElement.addEventListener("hidden.bs.modal", resetCourseForm);
    }

    if (addCourseBtn) {
      addCourseBtn.addEventListener("click", () => {
        resetCourseForm();
      });
    }

    coursesCatalog.addEventListener("click", event => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;

      const action = button.getAttribute("data-action");
      const courseId = Number(button.getAttribute("data-course"));
      if (!courseId) return;

      if (action === "enroll") {
        handleEnroll(courseId);
      }

      if (action === "continue" || action === "view") {
        handleContinueCourse(courseId);
      }
    });

    myCoursesList.addEventListener("click", event => {
      const button = event.target.closest("button[data-action='continue']");
      if (!button) return;
      const courseId = Number(button.getAttribute("data-course"));
      if (!courseId) return;
      handleContinueCourse(courseId);
    });

    instructorTableBody.addEventListener("click", event => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const action = button.getAttribute("data-action");
      const courseId = Number(button.getAttribute("data-course"));
      if (!courseId) return;

      const course = courses.find(item => Number(item.id) === Number(courseId));
      if (!course) return;

      if (action === "edit") {
        openCourseModal(course);
      }

      if (action === "lessons") {
        window.location.href = `lesson.html?course_id=${courseId}`;
      }

      if (action === "view") {
        handleContinueCourse(courseId);
      }

      if (action === "delete") {
        handleDeleteCourse(courseId);
      }
    });

    Object.values(catalogFilters).forEach(element => {
      if (!element) return;
      const eventName = element.tagName === "INPUT" ? "input" : "change";
      element.addEventListener(eventName, renderCatalog);
    });

    window.addEventListener("currentUserChanged", () => {
      loadData();
    });
  }

  attachEvents();
  loadData();
});
