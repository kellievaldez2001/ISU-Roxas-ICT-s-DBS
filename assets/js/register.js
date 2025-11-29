document.addEventListener("DOMContentLoaded", () => {
  const yearDisplay = document.getElementById("registerYear");
  if (yearDisplay) {
    yearDisplay.textContent = new Date().getFullYear();
  }

  const form = document.getElementById("registerForm");
  const alertContainer = document.getElementById("registerAlert");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    event.stopPropagation();

    const password = form.registerPassword.value.trim();
    const confirmPassword = form.registerConfirm.value.trim();

    let passwordsMatch = true;
    if (password !== confirmPassword) {
      passwordsMatch = false;
      form.registerConfirm.setCustomValidity("Passwords do not match");
    } else {
      form.registerConfirm.setCustomValidity("");
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showAlert("danger", passwordsMatch ? "Please correct the highlighted fields." : "Passwords do not match. Please try again.");
      return;
    }

    try {
      const profile = buildProfileFromForm(new FormData(form));

      if (!window.supabaseClient) {
        throw new Error("Supabase client is not available. Please try again shortly.");
      }

      const { data, error } = await window.supabaseClient.auth.signUp({
        email: profile.email,
        password,
        options: {
          data: {
            name: profile.name,
            role: profile.role
          }
        }
      });

      if (error) {
        const message = (error.message || "").toLowerCase();
        if (error.code === "user_already_exists" || message.includes("already") || message.includes("registered")) {
          showAlert("warning", "That email is already registered. Try signing in or confirming your email.");
          return;
        }
        throw error;
      }

      if (!data?.user) {
        throw new Error("We were unable to complete the registration. Please try again.");
      }

      showAlert("success", "Thanks! Please check your email inbox to confirm your account before signing in.");
      form.reset();
      form.classList.remove("was-validated");
    } catch (error) {
      console.error("Failed to create account", error);
      showAlert("danger", error.message || "Unable to complete registration. Please try again.");
    }
  });

  function showAlert(type, message) {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} mb-0" role="alert">
        ${message}
      </div>
    `;
  }

  function buildProfileFromForm(formData) {
    const name = (formData.get("name") || "").trim();
    const email = (formData.get("email") || "").trim().toLowerCase();
    const role = (formData.get("role") || "student").toLowerCase();

    return {
      name,
      email,
      role
    };
  }
});
