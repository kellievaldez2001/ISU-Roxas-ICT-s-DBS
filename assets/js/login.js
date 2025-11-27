document.addEventListener("DOMContentLoaded", () => {
  const yearDisplay = document.getElementById("loginYear");
  if (yearDisplay) {
    yearDisplay.textContent = new Date().getFullYear();
  }

  const form = document.getElementById("loginForm");
  const alertContainer = document.getElementById("loginAlert");

  if (!form) {
    return;
  }

  const roleRedirects = {
    admin: "../admin/index.html",
    instructor: "../instructors/index.html",
    student: "../students/index.html"
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showAlert("danger", "Please complete all required fields before continuing.");
      return;
    }

    const formData = new FormData(form);
    const requestedRole = (formData.get("role") || "").toLowerCase();
    const email = (formData.get("email") || "").trim().toLowerCase();
    const password = (formData.get("password") || "").trim();

    try {
      if (!window.supabaseClient) {
        throw new Error("Supabase client is not available. Please try again shortly.");
      }

      const { data: authData, error: authError } = await window.supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        const message = (authError.message || "").toLowerCase();
        if (message.includes("email not confirmed")) {
          showAlert("warning", "Please confirm your email before signing in. Check your inbox for the verification link.");
          return;
        }
        if (message.includes("invalid")) {
          showAlert("danger", "Invalid email or password. Please try again.");
          return;
        }
        throw authError;
      }

      const authenticatedUser = authData?.user;

      if (!authenticatedUser) {
        throw new Error("We could not verify your credentials. Please try again.");
      }

      if (!authenticatedUser.email_confirmed_at) {
        await window.supabaseClient.auth.signOut();
        showAlert("warning", "Your email address is not yet confirmed. Please verify it before signing in.");
        return;
      }

      const metadata = authenticatedUser.user_metadata || {};
      const confirmedRole = (metadata.role || "").toLowerCase();

      const { data: existingUser, error: lookupError } = await window.supabaseClient
        .from("users")
        .select("id, name, email, role")
        .eq("email", authenticatedUser.email)
        .maybeSingle();

      if (lookupError && lookupError.code !== "PGRST116") {
        throw lookupError;
      }

      let userProfile = existingUser;

      if (!userProfile) {
        const insertPayload = {
          name: metadata.name || authenticatedUser.email || "User",
          email: authenticatedUser.email,
          role: confirmedRole || "student"
        };

        const { data: insertedUser, error: insertError } = await window.supabaseClient
          .from("users")
          .insert(insertPayload)
          .select("id, name, email, role")
          .maybeSingle();

        if (insertError) {
          console.warn("Unable to insert new user due to RLS policy. Using auth metadata.", insertError);
          // Fall back to using auth metadata for new users
          userProfile = {
            id: authenticatedUser.id,
            name: insertPayload.name,
            email: insertPayload.email,
            role: insertPayload.role
          };
        } else {
          userProfile = insertedUser;
        }
      }

      if (!userProfile) {
        throw new Error("We were unable to load your profile. Please try again.");
      }

      let normalizedRole = userProfile.role || confirmedRole || "student";

      // Update auth metadata to match the role from the users table
      if (confirmedRole !== normalizedRole) {
        await window.supabaseClient.auth.updateUser({
          data: { role: normalizedRole }
        });
      }

      const redirectTarget = roleRedirects[normalizedRole];

      if (!redirectTarget) {
        showAlert("danger", "Unable to determine where to send you for this role.");
        return;
      }

      // Update the role select to reflect the actual role
      const roleSelect = document.getElementById("loginRole");
      if (roleSelect) {
        roleSelect.value = normalizedRole;
      }

      if (window.storeAuthSession) {
        window.storeAuthSession({
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          role: normalizedRole
        });
      }

      if (window.setCurrentUserFromSession) {
        window.setCurrentUserFromSession({
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          role: normalizedRole
        });
      }

      if (window.updateAuthBadge) {
        window.updateAuthBadge({
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          role: normalizedRole
        });
      }

      showAlert("success", "Signing you in…");

      window.setTimeout(() => {
        window.location.href = redirectTarget;
      }, 300);
    } catch (error) {
      console.error("Login failed", error);
      showAlert("danger", error.message || "Unable to sign you in. Please try again.");
    }
  });

  const guestLink = document.getElementById("guestLink");
  if (guestLink) {
    guestLink.addEventListener("click", () => {
      if (window.storeAuthSession) {
        window.storeAuthSession(null);
      }
    });
  }

  function showAlert(type, message) {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} mb-0" role="alert">
        ${message}
      </div>
    `;
  }
});
