document.addEventListener("DOMContentLoaded", () => {
  const navMarkup = `
    <div class="container">
      <a class="navbar-brand" href="index.html"><span>ISU-Roxas DBS</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="courses.html">Courses</a></li>
          <li class="nav-item"><a class="nav-link" href="students.html">Students</a></li>
          <li class="nav-item"><a class="nav-link" href="badges.html">Badges</a></li>
        </ul>
        <div class="nav-auth d-flex align-items-center gap-2 mt-3 mt-lg-0 pe-lg-1">
          <div class="dropdown">
            <button class="btn btn-outline-light btn-sm dropdown-toggle" type="button" id="userMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <span id="userMenuLabel">Account</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
              <li><a class="dropdown-item text-danger" href="#" id="logoutLink">Log out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-instructor-navbar]").forEach(nav => {
    if (!nav) return;
    if (nav.dataset.rendered === "true") return;
    nav.innerHTML = navMarkup;
    nav.dataset.rendered = "true";
  });

  if (typeof window.initializeUserMenu === "function") {
    window.initializeUserMenu();
  }
});
