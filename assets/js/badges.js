document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#badgesTable tbody");
  const alertContainer = document.getElementById("badgesAlert");
  const badgeForm = document.getElementById("badgeForm");
  const modalElement = document.getElementById("badgeModal");
  const modalInstance = new bootstrap.Modal(modalElement);
  const modalLabel = document.getElementById("badgeModalLabel");
  const imageInput = document.getElementById("badgeImageUrl");
  const imagePreview = document.getElementById("badgePreview");

  let editingId = null;
  let badges = [];

  const endpoint = "badges.php";

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

  function updatePreview(url) {
    if (url) {
      imagePreview.src = url;
      imagePreview.classList.remove("d-none");
    } else {
      imagePreview.src = "";
      imagePreview.classList.add("d-none");
    }
  }

  function resetForm() {
    badgeForm.reset();
    badgeForm.querySelector("button[type='submit']").disabled = false;
    badgeForm.querySelector("button[type='submit']").textContent = "Save";
    editingId = null;
    modalLabel.textContent = "Add Badge";
    updatePreview("");
  }

  modalElement.addEventListener("hidden.bs.modal", () => {
    resetForm();
  });

  imageInput.addEventListener("input", event => {
    updatePreview(event.target.value.trim());
  });

  async function loadBadges() {
    try {
      const data = await window.apiRequest(endpoint);
      badges = Array.isArray(data) ? data : [];
      renderTable();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to load badges. Please try again.");
    }
  }

  function renderTable() {
    if (!badges.length) {
      tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No badges created yet.</td></tr>';
      return;
    }

    tableBody.innerHTML = badges
      .map(badge => {
        const imageCell = badge.image_url
          ? `<img src="${escapeHtml(badge.image_url)}" alt="${escapeHtml(badge.title)}" class="badge-preview">`
          : '<span class="text-muted">No image</span>';
        return `
          <tr data-id="${badge.id}">
            <td>${escapeHtml(badge.title)}</td>
            <td>${escapeHtml(badge.description)}</td>
            <td>${imageCell}</td>
            <td class="text-end table-actions">
              <button class="btn btn-sm btn-outline-secondary edit-badge" data-id="${badge.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger delete-badge" data-id="${badge.id}">Delete</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  badgeForm.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = badgeForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";

    const payload = {
      title: badgeForm.querySelector("#badgeTitle").value.trim(),
      description: badgeForm.querySelector("#badgeDescription").value.trim(),
      image_url: imageInput.value.trim() || ""
    };

    const method = editingId ? "PUT" : "POST";
    const options = { method, body: payload };

    if (editingId) {
      options.params = { id: editingId };
    }

    try {
      await window.apiRequest(endpoint, options);
      await loadBadges();
      showAlert(
        alertContainer,
        "success",
        editingId ? "Badge updated successfully." : "Badge added successfully."
      );
      modalInstance.hide();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Unable to save badge.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Save";
    }
  });

  tableBody.addEventListener("click", async event => {
    const editButton = event.target.closest(".edit-badge");
    const deleteButton = event.target.closest(".delete-badge");

    if (editButton) {
      const id = editButton.getAttribute("data-id");
      const badge = badges.find(item => String(item.id) === String(id));
      if (!badge) return;

      editingId = badge.id;
      modalLabel.textContent = "Edit Badge";
      badgeForm.querySelector("#badgeTitle").value = badge.title || "";
      badgeForm.querySelector("#badgeDescription").value = badge.description || "";
      imageInput.value = badge.image_url || "";
      updatePreview(badge.image_url || "");
      modalInstance.show();
      return;
    }

    if (deleteButton) {
      const id = deleteButton.getAttribute("data-id");
      const confirmDelete = await window.showConfirm({
        title: "Delete Badge",
        body: "Are you sure you want to delete this badge?",
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmClass: "btn btn-danger",
        cancelClass: "btn btn-outline-secondary"
      });
      if (!confirmDelete) return;

      try {
        await window.apiRequest(endpoint, {
          method: "DELETE",
          params: { id }
        });
        await loadBadges();
        showAlert(alertContainer, "success", "Badge deleted successfully.");
      } catch (error) {
        console.error(error);
        showAlert(alertContainer, "danger", error.message || "Failed to delete badge.");
      }
    }
  });

  loadBadges();
});
