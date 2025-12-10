document.addEventListener("DOMContentLoaded", () => {
  const supabaseClient = window.supabaseClient;
  const badgeGrid = document.getElementById("badgeList");
  const certificateGrid = document.getElementById("certificateList");
  const isBadgePage = Boolean(badgeGrid);
  const isCertificatePage = Boolean(certificateGrid);

  if (!isBadgePage && !isCertificatePage) {
    return;
  }

  const alertContainer = document.getElementById(
    isBadgePage ? "badgePageAlert" : "certificatePageAlert"
  );
  const statusBanner = document.getElementById(
    isBadgePage ? "badgeStatus" : "certificateStatus"
  );

  const qrModalElement = document.getElementById("qrModal");
  let qrModal = null; // Always use manual for now
  const qrImage = document.getElementById("qrImage");
  const qrMeta = document.getElementById("qrMeta");
  const achievementDetails = new Map();

  const certificateModalElement = document.getElementById("certificateModal");
  let certificateModal = null; // Always use manual
  const certificateStudentName = document.getElementById("certificateStudentName");
  const certificateDescription = document.getElementById("certificateDescription");
  const certificateDate = document.getElementById("certificateDate");
  const certificatePublisher = document.getElementById("certificatePublisher");

  function showQrModal() {
    if (!qrModalElement) return;
    qrModalElement.classList.add("show");
    qrModalElement.style.display = "block";
    qrModalElement.removeAttribute("aria-hidden");
    qrModalElement.setAttribute("aria-modal", "true");
    document.body.classList.add("modal-open");
  }

  function hideQrModal() {
    if (!qrModalElement) return;
    qrModalElement.classList.remove("show");
    qrModalElement.style.display = "none";
    qrModalElement.setAttribute("aria-hidden", "true");
    qrModalElement.removeAttribute("aria-modal");
    document.body.classList.remove("modal-open");
  }

  function showCertificateModal() {
    if (!certificateModalElement) return;
    certificateModalElement.classList.add("show");
    certificateModalElement.style.display = "block";
    certificateModalElement.removeAttribute("aria-hidden");
    certificateModalElement.setAttribute("aria-modal", "true");
    document.body.classList.add("modal-open");
  }

  function hideCertificateModal() {
    if (!certificateModalElement) return;
    certificateModalElement.classList.remove("show");
    certificateModalElement.style.display = "none";
    certificateModalElement.setAttribute("aria-hidden", "true");
    certificateModalElement.removeAttribute("aria-modal");
    document.body.classList.remove("modal-open");
  }

  // Add close listeners for manual modals
  if (qrModalElement) {
    const closeButton = qrModalElement.querySelector("[data-bs-dismiss='modal']");
    if (closeButton) {
      closeButton.addEventListener("click", hideQrModal);
    }
  }

  if (certificateModalElement) {
    const closeButton = certificateModalElement.querySelector("[data-bs-dismiss='modal']");
    if (closeButton) {
      closeButton.addEventListener("click", hideCertificateModal);
    }
  }

  // Download certificate button
  document.addEventListener("click", event => {
    if (event.target.id === "downloadCertificateBtn") {
      const certificateTemplate = document.querySelector(".certificate-template");
      if (certificateTemplate && window.html2canvas && window.jspdf) {
        html2canvas(certificateTemplate, {
          scale: 2, // Higher quality
          useCORS: true
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [1056, 816] // Bond paper dimensions
          });
          pdf.addImage(imgData, 'PNG', 0, 0, 1056, 816);
          pdf.save('certificate.pdf');
        }).catch(error => {
          console.error('Error generating certificate PDF:', error);
          alert('Failed to download certificate. Please try again.');
        });
      } else {
        alert('PDF generation libraries not loaded.');
      }
    }
  });

  function report(type, message) {
    if (!alertContainer || typeof window.showAlert !== "function") return;
    window.showAlert(alertContainer, type, message);
  }

  function setStatus(message, options = {}) {
    if (!statusBanner) return;
    const { variant = "info", hidden = false } = options;
    statusBanner.textContent = message;
    statusBanner.classList.toggle("d-none", hidden);
    statusBanner.classList.remove("alert-info", "alert-success", "alert-warning", "alert-danger");
    statusBanner.classList.add(`alert-${variant}`);
  }

  function formatDate(value) {
    if (!value) return "Unknown";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
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
    <linearGradient id="badgeMedal" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#facc15" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <radialGradient id="badgeInner" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fecaca" />
      <stop offset="45%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#b91c1c" />
    </radialGradient>
  </defs>
  <rect width="256" height="256" fill="#ffffff" rx="24" />
  <g transform="translate(0,0)">
    <path d="M104 16 L128 96 L152 16 Z" fill="#b91c1c" />
    <path d="M112 16 L128 82 L144 16 Z" fill="#ef4444" opacity="0.9" />
  </g>
  <g>
    <circle cx="128" cy="148" r="70" fill="url(#badgeMedal)" />
    <circle cx="128" cy="148" r="56" fill="url(#badgeInner)" />
  </g>
</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function getResolvedBadgeImageUrl(badge) {
    const raw = badge?.image_url ? String(badge.image_url).trim() : "";
    if (raw) return raw;
    return buildBadgeImageUrl(badge?.title || "Badge");
  }

  function buildBadgeCard(record, badge, course) {
    const imageUrl = getResolvedBadgeImageUrl(badge || {});
    const cardTitle = badge?.title || "Course Badge";
    const courseTitle = course?.title || "Course";
    const description = badge?.description || "This badge recognises your course completion.";

    const isSvg = imageUrl.startsWith("data:image/svg+xml");
    const baseName = (cardTitle || "badge")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "badge";
    const fileName = `${baseName}.${isSvg ? "svg" : "png"}`;

    return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <div class="text-center mb-3">
              <img src="${imageUrl}" alt="${cardTitle}" class="img-fluid rounded" style="max-height: 160px; object-fit: contain;">
            </div>
            <h2 class="h5">${cardTitle}</h2>
            <p class="text-muted mb-1">Awarded for completing <strong>${courseTitle}</strong>.</p>
            <p class="small flex-grow-1">${description}</p>
            <div class="mt-3 d-flex justify-content-between align-items-center">
              <span class="badge bg-success-subtle text-success">Issued ${formatDate(record.date_issued)}</span>
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-sm btn-outline-success" data-achievement-id="${record.id}">View QR</button>
                <button type="button" class="btn btn-sm btn-outline-primary" data-achievement-id="${record.id}" data-action="certificate">View Certificate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function buildCertificateCard(record, badge, course) {
    const courseTitle = course?.title || "Course";
    const badgeTitle = badge?.title || "Completion Badge";
    const summary = badge?.description || "Course completion certificate";

    return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h2 class="h5 mb-0">${courseTitle}</h2>
              <span class="badge bg-primary-subtle text-primary">${formatDate(record.date_issued)}</span>
            </div>
            <p class="text-muted mb-2">Certificate earned together with the <strong>${badgeTitle}</strong> badge.</p>
            <p class="small flex-grow-1">${summary}</p>
            <div class="mt-3 d-grid gap-2">
              <a class="btn btn-success" href="course_details.html?id=${record.course_id}" target="_blank" rel="noopener">
                View Course Details
              </a>
              <button class="btn btn-outline-success" type="button" disabled>
                Download certificate (coming soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function ensureSupabase() {
    if (supabaseClient) return true;
    report("danger", "Unable to connect to the database. Please try again later.");
    return false;
  }

  async function fetchAchievements(studentId) {
    const { data, error } = await supabaseClient
      .from("issued_badges")
      .select("id, badge_id, course_id, date_issued")
      .eq("student_id", studentId)
      .order("date_issued", { ascending: false });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }

  async function fetchBadges(badgeIds) {
    if (!badgeIds.size) return [];
    const { data, error } = await supabaseClient
      .from("badges")
      .select("id, title, description, image_url")
      .in("id", Array.from(badgeIds));
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }

  async function fetchCourses(courseIds) {
    if (!courseIds.size) return [];
    const { data, error } = await supabaseClient
      .from("courses")
      .select("id, title, description, instructor_id")
      .in("id", Array.from(courseIds));
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }

  async function bootstrap() {
    if (!ensureSupabase()) return;

    const user = typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
    if (!user) {
      setStatus("Sign in to view your achievements.", { variant: "warning", hidden: false });
      return;
    }

    const studentId = Number(user.id);
    if (!Number.isFinite(studentId)) {
      setStatus("We couldn't determine your student account. Please sign in again.", {
        variant: "danger",
        hidden: false
      });
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const specificId = urlParams.get('id');

    try {
      setStatus("Loading your achievements...", { variant: "info", hidden: false });
      const achievements = await fetchAchievements(studentId);

      let filteredAchievements = achievements;
      if (isCertificatePage && specificId) {
        filteredAchievements = achievements.filter(a => String(a.id) === specificId);
      }

      if (!filteredAchievements.length) {
        const message = isBadgePage
          ? "Keep learning to unlock your first badge."
          : specificId
          ? "Certificate not found."
          : "Complete a course to unlock your first certificate.";
        setStatus(message, { variant: "info", hidden: false });
        if (isBadgePage && badgeGrid) badgeGrid.innerHTML = "";
        if (isCertificatePage && certificateGrid) certificateGrid.innerHTML = "";
        return;
      }

      const badgeIds = new Set(filteredAchievements.map(item => item.badge_id).filter(id => id !== null));
      const courseIds = new Set(filteredAchievements.map(item => item.course_id).filter(id => id !== null));

      const [badgeRecords, courseRecords] = await Promise.all([
        fetchBadges(badgeIds),
        fetchCourses(courseIds)
      ]);

      const badgeMap = new Map(badgeRecords.map(item => [item.id, item]));
      const courseMap = new Map(courseRecords.map(item => [item.id, item]));

      // Build instructor map so we can include publisher info in QR payloads
      const instructorIds = new Set(
        courseRecords
          .map(item => item.instructor_id)
          .filter(id => id !== null && id !== undefined)
      );

      let instructorMap = new Map();
      if (instructorIds.size) {
        const { data: instructorRows, error: instructorError } = await supabaseClient
          .from("users")
          .select("id, name, email")
          .in("id", Array.from(instructorIds));

        if (instructorError) throw instructorError;

        instructorMap = new Map(
          (Array.isArray(instructorRows) ? instructorRows : []).map(item => [item.id, item])
        );
      }

      const cards = filteredAchievements.map(record => {
        const badge = badgeMap.get(record.badge_id) || null;
        const course = courseMap.get(record.course_id) || null;
        const instructor =
          course && course.instructor_id != null
            ? instructorMap.get(course.instructor_id) || null
            : null;
        achievementDetails.set(String(record.id), { record, badge, course, instructor });
        if (isBadgePage) {
          return buildBadgeCard(record, badge, course);
        }
        return buildCertificateCard(record, badge, course);
      });

      if (isBadgePage && badgeGrid) {
        badgeGrid.innerHTML = cards.join("");
      }

      if (isCertificatePage && certificateGrid) {
        certificateGrid.innerHTML = cards.join("");
      }

      setStatus(
        isBadgePage
          ? "Here are the badges you've earned so far."
          : "Download and celebrate your course certificates.",
        { variant: "success", hidden: false }
      );
    } catch (error) {
      console.error(error);
      report("danger", error.message || "Failed to load your achievements.");
      setStatus("We could not load your achievements right now.", { variant: "danger", hidden: false });
    }
  }

  if (badgeGrid) {
    console.log("badgeGrid found:", badgeGrid);
    console.log("achievementDetails size:", achievementDetails.size);
  }

  // Global click handler so it catches dynamically rendered buttons
  document.addEventListener("click", event => {
    const button = event.target.closest("button[data-achievement-id]");
    if (!button) return;

    const achievementId = button.getAttribute("data-achievement-id");
    if (!achievementId) return;

    const detail = achievementDetails.get(String(achievementId));
    if (!detail) return;

    const user = typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
    const studentName = user?.name || user?.email || "Student";
    const courseTitle = detail.course?.title || "Course";
    const badgeTitle = detail.badge?.title || "Course Badge";
    const issued = formatDate(detail.record.date_issued);
    const publisher = detail.instructor || null;
    const publisherName = publisher?.name || publisher?.email || "ISU-Roxas DBS";

    const payload = "ISU-Roxas DBS Badge\n" +
      "Student: " + studentName + "\n" +
      "Course: " + courseTitle + "\n" +
      "Badge: " + badgeTitle + "\n" +
      "Issued: " + issued + "\n" +
      "Published by: " + publisherName + "\n" +
      "Ref: " + detail.record.id;

    const apiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=" + encodeURIComponent(payload);

    const action = button.getAttribute("data-action");
    if (action === "certificate") {
      // Show certificate modal
      if (certificateStudentName) {
        certificateStudentName.textContent = studentName;
      }
      if (certificateDescription) {
        certificateDescription.textContent = `has successfully passed/achieved the ${courseTitle} Course`;
      }
      if (certificateDate) {
        certificateDate.textContent = "Date: " + issued;
      }
      if (certificatePublisher) {
        certificatePublisher.textContent = "Published by: " + publisherName;
      }
      const certificateQrImage = document.getElementById("certificateQrImage");
      if (certificateQrImage) {
        certificateQrImage.src = apiUrl;
      }
      showCertificateModal();
    } else {
      // Show QR modal
      if (qrImage) {
        qrImage.src = apiUrl;
      }
      if (qrMeta) {
        qrMeta.textContent = studentName + " · " + courseTitle;
      }

      showQrModal();
    }
  });

  bootstrap();
});
