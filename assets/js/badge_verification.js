document.addEventListener("DOMContentLoaded", () => {
  const alertContainer = document.getElementById("verificationAlert");
  const cardContainer = document.getElementById("verificationCard");

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

  async function loadVerification() {
    const params = new URLSearchParams(window.location.search || "");
    const idParam = params.get("id");
    const issuedId = Number(idParam);

    if (!issuedId) {
      showAlert("danger", "Invalid or missing badge verification ID.");
      return;
    }

    const client = window.supabaseClient;
    if (!client) {
      showAlert("danger", "Verification service is unavailable. Please try again later.");
      return;
    }

    try {
      const { data: issued, error: issuedError } = await client
        .from("issued_badges")
        .select("id, student_id, course_id, badge_id, date_issued")
        .eq("id", issuedId)
        .maybeSingle();

      if (issuedError) throw issuedError;
      if (!issued) {
        showAlert("warning", "This badge could not be found. The verification link may be invalid or expired.");
        return;
      }

      const [studentRes, courseRes, badgeRes] = await Promise.all([
        client.from("users").select("id, name, email").eq("id", issued.student_id).maybeSingle(),
        client.from("courses").select("id, title").eq("id", issued.course_id).maybeSingle(),
        client.from("badges").select("id, title, description").eq("id", issued.badge_id).maybeSingle()
      ]);

      if (studentRes.error) throw studentRes.error;
      if (courseRes.error) throw courseRes.error;
      if (badgeRes.error) throw badgeRes.error;

      const student = studentRes.data;
      const course = courseRes.data;
      const badge = badgeRes.data;

      if (!student || !course || !badge) {
        showAlert("warning", "We could not fully verify this badge record.");
        return;
      }

      const issuedDate = issued.date_issued || new Date().toISOString().slice(0, 10);

      cardContainer.innerHTML = `
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="h5 mb-3">Verified Badge</h2>
            <p class="mb-2">This badge is <span class="badge bg-success">valid</span>.</p>
            <p class="mb-2">This certifies that <strong>${escapeHtml(student.name || "Student")}</strong> (${escapeHtml(student.email || "")})</p>
            <p class="mb-2">earned the badge <strong>${escapeHtml(badge.title)}</strong></p>
            <p class="mb-3">for completing the course <strong>${escapeHtml(course.title)}</strong>.</p>
            <p class="small text-muted mb-1">Issued on: <strong>${escapeHtml(issuedDate)}</strong></p>
            <p class="small text-muted mb-0">Verification ID: <code>${issued.id}</code></p>
          </div>
        </div>
      `;
    } catch (error) {
      console.error("Badge verification failed", error);
      showAlert("danger", error.message || "Unable to verify this badge right now.");
    }
  }

  const yearDisplay = document.getElementById("currentYear");
  if (yearDisplay) {
    yearDisplay.textContent = new Date().getFullYear();
  }

  loadVerification();
});
