document.addEventListener("DOMContentLoaded", () => {
  const counters = {
    students: [document.getElementById("studentsCount"), document.getElementById("heroStudentsCount")],
    subjects: [document.getElementById("subjectsCount")],
    badges: [document.getElementById("badgesCount"), document.getElementById("heroBadgesCount")],
    certificates: [document.getElementById("certificatesCount"), document.getElementById("heroCertificatesCount")]
  };

  function getActiveUser() {
    return typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
  }

  function getUserRole(user) {
    if (!user) return "guest";
    const normalized = typeof user.role === "string" ? user.role.trim().toLowerCase() : "";
    if (normalized === "admin") return "admin";
    if (normalized === "instructor") return "instructor";
    return "student";
  }

  async function fetchCount(endpoint) {
    try {
      const data = await window.apiRequest(endpoint);
      return Array.isArray(data) ? data.length : 0;
    } catch (error) {
      console.error(`Failed to load ${endpoint}:`, error);
      return null;
    }
  }

  async function loadInstructorHeroCounts() {
    const user = getActiveUser();
    const role = getUserRole(user);
    if (role !== "instructor") return;

    const heroStudents = document.getElementById("heroStudentsCount");
    const heroBadges = document.getElementById("heroBadgesCount");
    if (!heroStudents && !heroBadges) return;
    if (!user || !user.id) return;

    try {
      const instructorId = user.id;
      const coursesResult = await window.apiRequest("courses.php", { params: { instructor_id: instructorId } });
      const courses = Array.isArray(coursesResult)
        ? coursesResult
        : coursesResult && typeof coursesResult === "object"
          ? [coursesResult]
          : [];

      const courseIds = new Set(
        courses
          .map(course => Number(course.id))
          .filter(Number.isFinite)
      );

      const badgeCount = courses.filter(course => course.badge_id !== null && course.badge_id !== undefined).length || courses.length;

      const enrollmentsResult = await window.apiRequest("enrollments.php");
      const enrollments = Array.isArray(enrollmentsResult)
        ? enrollmentsResult
        : enrollmentsResult && typeof enrollmentsResult === "object"
          ? [enrollmentsResult]
          : [];

      const studentIds = new Set(
        enrollments
          .filter(enrollment => courseIds.has(Number(enrollment.course_id)))
          .map(enrollment => Number(enrollment.student_id))
          .filter(Number.isFinite)
      );

      if (heroStudents) heroStudents.textContent = String(studentIds.size);
      if (heroBadges) heroBadges.textContent = String(badgeCount);
    } catch (error) {
      console.error("Failed to load instructor hero stats", error);
    }
  }

  async function loadCounts() {
    const mappings = {
      students: "students.php",
      subjects: "subjects.php",
      badges: "badges.php",
      certificates: "certificates.php"
    };

    await Promise.all(
      Object.entries(counters).map(async ([key, elements]) => {
        const count = await fetchCount(mappings[key]);
        elements.forEach(element => {
          if (!element) return;
          element.textContent = count === null ? "-" : count;
        });
      })
    );
  }

  (async () => {
    await loadCounts();
    await loadInstructorHeroCounts();
  })();
});
