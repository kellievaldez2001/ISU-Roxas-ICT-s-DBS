document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#instructorsTable tbody");
  const alertContainer = document.getElementById("instructorsAlert");
  const refreshButton = document.getElementById("refreshInstructorsBtn");
  const supabaseClient = window.supabaseClient;

  const coursesModalElement = document.getElementById("instructorCoursesModal");
  const coursesModal = coursesModalElement ? new bootstrap.Modal(coursesModalElement) : null;
  const coursesModalTitle = coursesModalElement ? coursesModalElement.querySelector(".modal-title") : null;
  const coursesModalBody = document.getElementById("instructorCoursesList");

  let instructors = [];
  let isLoading = false;

  function assertSupabase() {
    if (supabaseClient) {
      return true;
    }

    if (typeof showAlert === "function" && alertContainer) {
      showAlert(alertContainer, "danger", "Supabase connection is not configured. Please refresh the page once the client is available.");
    } else {
      console.error("Supabase client is not initialised.");
    }

    return false;
  }

  function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function setTableMessage(message, muted = true) {
    if (!tableBody) return;
    tableBody.innerHTML = `<tr><td colspan="3" class="text-center ${muted ? "text-muted" : ""}">${escapeHtml(message)}</td></tr>`;
  }

  function renderTable() {
    if (!tableBody) return;

    if (!Array.isArray(instructors) || !instructors.length) {
      setTableMessage("No instructor records yet.");
      return;
    }

    tableBody.innerHTML = instructors
      .map(instructor => {
        const identifier = instructor.instructor_id || instructor.employee_id || instructor.user_id || instructor.id || instructor.email || "—";
        const name = instructor.name || instructor.full_name || "Unnamed";
        const email = instructor.email || "—";

        return `
          <tr data-id="${escapeHtml(identifier)}">
            <td>${escapeHtml(name)}</td>
            <td>${escapeHtml(email)}</td>
            <td class="text-end">
              <button type="button" class="btn btn-sm btn-outline-primary" data-action="view-courses" data-email="${escapeHtml(email)}" data-name="${escapeHtml(name)}">View courses</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  async function openCoursesModalForInstructor(instructor) {
    if (!coursesModal || !coursesModalBody) return;
    if (!assertSupabase()) return;

    const displayName = instructor.name || instructor.email || "Instructor";
    if (coursesModalTitle) {
      coursesModalTitle.textContent = `Courses by ${displayName}`;
    }

    coursesModalBody.innerHTML = '<p class="text-muted mb-0">Loading courses…</p>';
    coursesModal.show();

    try {
      const { data: userRow, error: usersError } = await supabaseClient
        .from("users")
        .select("id, email")
        .eq("email", instructor.email)
        .maybeSingle();

      if (usersError) {
        throw usersError;
      }

      const userId = userRow?.id;
      if (!userId) {
        coursesModalBody.innerHTML = '<p class="text-muted mb-0">No matching instructor account found.</p>';
        return;
      }

      const { data: courseRows, error: coursesError } = await supabaseClient
        .from("courses")
        .select("id, title, category, status, created_at")
        .eq("instructor_id", userId)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (coursesError) {
        throw coursesError;
      }

      const rows = Array.isArray(courseRows) ? courseRows : [];
      if (!rows.length) {
        coursesModalBody.innerHTML = '<p class="text-muted mb-0">No published courses for this instructor yet.</p>';
        return;
      }

      coursesModalBody.innerHTML = `
        <div class="list-group">
          ${rows
            .map(course => `
              <div class="list-group-item">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div class="fw-semibold">${escapeHtml(course.title || "Untitled course")}</div>
                    <div class="small text-muted">${escapeHtml(course.category || "General")}</div>
                  </div>
                  <a href="course_details.html?id=${encodeURIComponent(String(course.id))}" class="btn btn-sm btn-outline-primary">
                    View course
                  </a>
                </div>
              </div>
            `)
            .join("")}
        </div>
      `;
    } catch (error) {
      console.error("Failed to load instructor courses", error);
      coursesModalBody.innerHTML = '<p class="text-danger mb-0">Unable to load courses for this instructor.</p>';
    }
  }

  function handleTableClick(event) {
    const target = event.target;
    if (!target) return;
    const button = target.closest('[data-action="view-courses"]');
    if (!button || !tableBody || !tableBody.contains(button)) return;

    const email = button.dataset.email || "";
    const name = button.dataset.name || "";

    if (!email) {
      if (typeof showAlert === "function" && alertContainer) {
        showAlert(alertContainer, "danger", "Unable to determine instructor for this row.");
      }
      return;
    }

    openCoursesModalForInstructor({ email, name });
  }

  async function syncInstructorsFromUsers() {
    if (!assertSupabase()) return 0;

    try {
      const { data: userRows, error: usersError } = await supabaseClient
        .from("users")
        .select("id, name, email, role");

      if (usersError) {
        throw usersError;
      }

      const candidateRows = Array.isArray(userRows)
        ? userRows.filter(user => {
            if (!user || !user.email) return false;
            const role = String(user.role || "").toLowerCase();
            return role === "instructor";
          })
        : [];

      if (!candidateRows.length) {
        return 0;
      }

      const normalized = candidateRows.map(item => ({
        // We don't persist user_id because the instructors table in Supabase
        // does not have this column in the current schema. We reconcile
        // instructors with users using email instead.
        name: item.name || item.email || "Instructor",
        email: item.email,
        department: "",
        specialty: ""
      }));

      const { data: existingRows, error: existingError } = await supabaseClient
        .from("instructors")
        .select("email");

      if (existingError) {
        throw existingError;
      }

      const existingEmails = new Set(
        (existingRows || [])
          .map(row => (row.email || "").toLowerCase())
          .filter(Boolean)
      );

      const newRecords = normalized.filter(item => !existingEmails.has(item.email.toLowerCase()));

      if (!newRecords.length) {
        return 0;
      }

      const { error: insertError } = await supabaseClient
        .from("instructors")
        .insert(newRecords);

      if (insertError) {
        throw insertError;
      }

      if (typeof showAlert === "function" && alertContainer) {
        showAlert(alertContainer, "success", `${newRecords.length} instructor record${newRecords.length === 1 ? "" : "s"} added from user directory.`);
      }

      return newRecords.length;
    } catch (error) {
      console.error("Failed to sync instructors from users", error);
      if (typeof showAlert === "function" && alertContainer) {
        showAlert(alertContainer, "danger", error.message || "Unable to sync instructors from user accounts.");
      }
      return 0;
    }
  }

  async function loadInstructors({ attemptSync = true } = {}) {
    if (!assertSupabase()) return;
    if (isLoading) return;
    isLoading = true;

    setTableMessage("Loading instructors…");

    try {
      const { data, error } = await supabaseClient
        .from("instructors")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }

      if ((!data || !data.length) && attemptSync) {
        const added = await syncInstructorsFromUsers();
        if (added > 0) {
          await loadInstructors({ attemptSync: false });
          return;
        }
      }

      let rows = Array.isArray(data) ? data : [];

      // Hide instructor rows whose user account no longer exists in the
      // users table. We match purely on email to keep the schema simple.
      try {
        const { data: userRows, error: usersError } = await supabaseClient
          .from("users")
          .select("email");

        if (!usersError && Array.isArray(userRows) && userRows.length) {
          const userEmails = new Set(
            userRows
              .map(user => (user.email || "").toLowerCase())
              .filter(Boolean)
          );

          rows = rows.filter(row => {
            const email = (row.email || "").toLowerCase();
            return email && userEmails.has(email);
          });
        }
      } catch (innerError) {
        console.error("Failed to reconcile instructors with users", innerError);
      }

      instructors = rows;
      renderTable();
    } catch (error) {
      console.error("Failed to load instructors", error);
      setTableMessage("Unable to load instructors.", false);
      if (typeof showAlert === "function" && alertContainer) {
        showAlert(alertContainer, "danger", error.message || "Unable to load instructors.");
      }
    } finally {
      isLoading = false;
    }
  }

  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      loadInstructors({ attemptSync: false });
    });
  }

  if (tableBody) {
    tableBody.addEventListener("click", handleTableClick);
  }

  loadInstructors();
});
