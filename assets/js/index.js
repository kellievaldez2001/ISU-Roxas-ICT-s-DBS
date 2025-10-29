document.addEventListener("DOMContentLoaded", () => {
  const counters = {
    students: [document.getElementById("studentsCount"), document.getElementById("heroStudentsCount")],
    subjects: [document.getElementById("subjectsCount")],
    badges: [document.getElementById("badgesCount"), document.getElementById("heroBadgesCount")],
    issued_badges: [document.getElementById("issuedBadgesCount"), document.getElementById("heroIssuedCount")]
  };

  async function fetchCount(endpoint) {
    try {
      const data = await window.apiRequest(endpoint);
      return Array.isArray(data) ? data.length : 0;
    } catch (error) {
      console.error(`Failed to load ${endpoint}:`, error);
      return null;
    }
  }

  async function loadCounts() {
    const mappings = {
      students: "students.php",
      subjects: "subjects.php",
      badges: "badges.php",
      issued_badges: "issued_badges.php"
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

  loadCounts();
});
