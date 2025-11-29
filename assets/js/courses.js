document.addEventListener("DOMContentLoaded", () => {
  const alertContainer = document.getElementById("coursesAlert");
  const coursesCatalog = document.getElementById("coursesCatalog");
  const coursesLayout = document.getElementById("coursesLayout");
  const myCoursesList = document.getElementById("myCoursesList");
  const myCoursesColumn = document.getElementById("myCoursesColumn");
  const instructorTableBody = document.querySelector("#instructorCoursesTable tbody");
  const instructorSection = document.getElementById("instructorCoursesSection");
  const coursesActions = document.getElementById("coursesActions");
  const courseViewToggle = document.getElementById("courseViewToggle");
  const addCourseBtn = document.getElementById("addCourseBtn");
  const categoryList = document.getElementById("categoryList");
  const instructorList = document.getElementById("instructorList");
  const catalogHeading = document.getElementById("catalogHeading");
  const catalogCaption = document.getElementById("catalogCaption");
  const catalogFilters = {
    category: null,
    instructor: null,
    search: null
  };
  let activeCategory = "all";
  let activeInstructor = "all";

  const courseModalElement = document.getElementById("courseModal");
  const courseModal = courseModalElement ? new bootstrap.Modal(courseModalElement) : null;
  const courseForm = document.getElementById("courseForm");
  const courseModalLabel = document.getElementById("courseModalLabel");

  const rewardTypeSelect = document.getElementById("courseRewardType");

  const lessonModalElement = document.getElementById("lessonModal");
  const lessonModal = lessonModalElement ? new bootstrap.Modal(lessonModalElement) : null;
  const lessonForm = document.getElementById("lessonForm");
  const lessonCourseName = document.getElementById("lessonCourseName");
  const lessonModuleType = document.getElementById("lessonModuleType");
  const lessonModuleTitle = document.getElementById("lessonModuleTitle");
  const lessonModuleDescription = document.getElementById("lessonModuleDescription");
  const lessonModuleOrder = document.getElementById("lessonModuleOrder");
  const lessonModuleOrderGroup = document.getElementById("lessonModuleOrderGroup");
  const lessonItemCountGroup = document.getElementById("lessonItemCountGroup");
  const lessonItemCountInput = document.getElementById("lessonItemCount");
  const lessonTitleInput = document.getElementById("lessonTitle");
  const lessonIndexInput = document.getElementById("lessonIndex");
  const lessonSortOrderInput = document.getElementById("lessonSortOrder");
  const lessonMetaGroup = document.getElementById("lessonMetaGroup");
  const lessonVideoUrlInput = document.getElementById("lessonVideoUrl");
  const lessonResourceUrlInput = document.getElementById("lessonResourceUrl");
  const lessonResourcesGroup = document.getElementById("lessonResourcesGroup");
  const lessonContentGroup = document.getElementById("lessonContentGroup");
  const lessonContentInput = document.getElementById("lessonContent");
  const lessonQuizIntroInput = document.getElementById("lessonQuizIntro");
  const addQuizQuestionBtn = document.getElementById("addQuizQuestionBtn");
  const quizQuestionsContainer = document.getElementById("quizQuestionsContainer");
  const lessonFormAlert = document.getElementById("lessonFormAlert");
  const lessonPretestActions = document.getElementById("lessonPretestActions");
  const lessonStandardActions = document.getElementById("lessonStandardActions");
  const lessonModalFooter = document.getElementById("lessonModalFooter");
  const lessonSaveButton = document.getElementById("lessonSaveButton");
  const saveLessonButton = document.getElementById("lessonSaveButton");

  let courses = [];
  let lessons = [];
  let enrollments = [];
  let badges = [];
  let instructors = [];
  let editingCourseId = null;
  let activeView = "catalog";
  let activeLessonCourse = null;
  const SELECTED_COURSE_STORAGE_KEY = "dbs_selected_course";

  const supabaseClient = window.supabaseClient;
  const PROGRESS_STORAGE_PREFIX = "dbs_course_progress_";
  const COMPLETION_STORAGE_PREFIX = "dbs_course_completion_";

  function slugifyOptionLabel(value) {
    if (!value) return "option";
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 40) || "option";
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
    <linearGradient id="badgeRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f84e36" />
      <stop offset="100%" stop-color="#d1342a" />
    </linearGradient>
  </defs>
  <rect width="256" height="256" fill="#faf5eb" rx="24" />
  <g transform="translate(28 12)">
    <circle cx="100" cy="100" r="100" fill="#e8402c" />
    <circle cx="100" cy="100" r="82" fill="#f7bb3a" />
    <path d="M48 166 L74 236 L102 208 L130 236 L156 166" fill="url(#badgeRibbon)" />
    <path d="M52 162 L74 224 L102 198 L130 224 L152 162" fill="#f05033" />
    <text x="100" y="112" text-anchor="middle" font-family="'Poppins', 'Arial', sans-serif" font-weight="700" font-size="26" fill="#2f2a1d">
      ${text}
    </text>
  </g>
</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    const toHex = value => {
      const v = Math.round((value + m) * 255);
      return v.toString(16).padStart(2, "0");
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function buildCourseThumbnailPlaceholder(course, index) {
    const colorStart = "#22c55e"; // green
    const colorEnd = "#000000"; // black
    const rawTitle = (course?.title || "Course").trim();
    const maxLength = 34;
    const truncated = rawTitle.length > maxLength ? `${rawTitle.slice(0, maxLength - 1)}…` : rawTitle;
    const safeTitle = escapeSvgText(truncated);

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="320" height="80" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="courseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorStart}" />
      <stop offset="100%" stop-color="${colorEnd}" />
    </linearGradient>
  </defs>
  <rect width="320" height="80" fill="url(#courseGradient)" />
  <text x="50%" y="55%" text-anchor="middle" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="600" fill="#ecfdf5">
    ${safeTitle}
  </text>
</svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  if (lessonModuleType) {
    lessonModuleType.addEventListener("change", event => {
      applyModuleTypeDefaults(event.target.value, { resetQuestions: true });
    });
  }

  if (lessonItemCountInput) {
    const syncItemCount = () => {
      if (!lessonModuleType || lessonModuleType.value !== "pre-test") return;
      const parsed = Math.max(1, Number.parseInt(lessonItemCountInput.value, 10) || 0);
      lessonItemCountInput.value = parsed;
      setQuestionBlockCount(parsed);
    };
    lessonItemCountInput.addEventListener("input", syncItemCount);
    lessonItemCountInput.addEventListener("change", syncItemCount);
  }

  if (addQuizQuestionBtn) {
    addQuizQuestionBtn.addEventListener("click", () => {
      createQuestionBlock();
    });
  }

  if (lessonForm) {
    lessonForm.addEventListener("submit", handleLessonFormSubmit);
  }

  function clearLessonFormAlert() {
    if (!lessonFormAlert) return;
    lessonFormAlert.className = "alert d-none";
    lessonFormAlert.textContent = "";
  }

  function showLessonFormAlert(type, message) {
    if (!lessonFormAlert) return;
    lessonFormAlert.className = `alert alert-${type}`;
    lessonFormAlert.textContent = message;
  }

  function cacheSelectedCourse(course) {
    try {
      if (!window.sessionStorage) return;
      if (!course) {
        window.sessionStorage.removeItem(SELECTED_COURSE_STORAGE_KEY);
        return;
      }
      window.sessionStorage.setItem(SELECTED_COURSE_STORAGE_KEY, JSON.stringify(course));
    } catch (error) {
      console.warn("Failed to store selected course", error);
    }
  }

  function updateQuestionIndices() {
    if (!quizQuestionsContainer) return;
    quizQuestionsContainer.querySelectorAll(".lesson-question").forEach((block, index) => {
      const indexLabel = block.querySelector("[data-question-index]");
      if (indexLabel) indexLabel.textContent = index + 1;
    });
  }

  function removeQuestionBlock(block) {
    if (!block) return;
    block.remove();
    updateQuestionIndices();
  }

  function setQuestionBlockCount(count) {
    if (!quizQuestionsContainer) return;
    const target = Math.max(0, Number(count) || 0);
    const existingBlocks = Array.from(quizQuestionsContainer.querySelectorAll(".lesson-question"));
    if (existingBlocks.length > target) {
      existingBlocks.slice(target).forEach(block => block.remove());
    }
    let current = quizQuestionsContainer.querySelectorAll(".lesson-question").length;
    while (current < target) {
      createQuestionBlock();
      current += 1;
    }
    updateQuestionIndices();
  }

  function createQuestionBlock(prefill = null) {
    if (!quizQuestionsContainer) return null;
    const block = document.createElement("div");
    block.className = "card border lesson-question";
    block.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3 class="h6 mb-0">Question <span data-question-index></span></h3>
          <button type="button" class="btn btn-sm btn-outline-danger" data-remove-question>&times; Remove</button>
        </div>
        <div class="mb-3">
          <label class="form-label">Prompt</label>
          <textarea class="form-control question-prompt" rows="2" required></textarea>
        </div>
        <div class="row g-2 mb-3">
          ${["a", "b", "c", "d"].map(letter => `
            <div class="col-12 col-md-6">
              <label class="form-label">Option ${letter.toUpperCase()}</label>
              <input type="text" class="form-control question-option" data-option="${letter}" placeholder="Enter answer choice">
            </div>
          `).join("")}
        </div>
        <div class="mb-3">
          <label class="form-label">Correct answer</label>
          <select class="form-select question-answer">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
            <option value="d">Option D</option>
          </select>
        </div>
        <div>
          <label class="form-label">Explanation <span class="text-muted">(optional)</span></label>
          <textarea class="form-control question-explanation" rows="2" placeholder="Why is this the correct answer?"></textarea>
        </div>
      </div>
    `;

    const removeBtn = block.querySelector("[data-remove-question]");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        removeQuestionBlock(block);
      });
    }

    if (prefill) {
      const promptField = block.querySelector(".question-prompt");
      if (promptField) promptField.value = prefill.prompt || "";
      block.querySelectorAll(".question-option").forEach(optionInput => {
        const optionKey = optionInput.dataset.option;
        if (!optionKey || !prefill.options) return;
        const existing = prefill.options[optionKey];
        if (existing) optionInput.value = existing;
      });
      const answerSelect = block.querySelector(".question-answer");
      if (answerSelect && prefill.answer) answerSelect.value = prefill.answer;
      const explanationField = block.querySelector(".question-explanation");
      if (explanationField && prefill.explanation) explanationField.value = prefill.explanation;
    }

    quizQuestionsContainer.appendChild(block);
    updateQuestionIndices();
    return block;
  }

  function ensureQuestionBlockMinimum(minimum, { reset = false } = {}) {
    if (!quizQuestionsContainer) return;
    if (reset) {
      quizQuestionsContainer.innerHTML = "";
    }
    let current = quizQuestionsContainer.querySelectorAll(".lesson-question").length;
    while (current < minimum) {
      createQuestionBlock();
      current += 1;
    }
    updateQuestionIndices();
  }

  function toggleGroup(group, shouldShow) {
    if (!group) return;
    group.classList.toggle("d-none", !shouldShow);
  }

  function applyModuleTypeDefaults(type, { resetQuestions = false } = {}) {
    if (!lessonModuleType) return;

    const activeCourseTitle = activeLessonCourse?.title || "Module";
    if (resetQuestions) {
      ensureQuestionBlockMinimum(0, { reset: true });
    }

    const isPreTest = type === "pre-test";
    const isPostTest = type === "post-test";

    toggleGroup(lessonModuleOrderGroup, !isPreTest);
    toggleGroup(lessonItemCountGroup, isPreTest);
    toggleGroup(lessonMetaGroup, !isPreTest);
    toggleGroup(lessonResourcesGroup, !isPreTest);
    toggleGroup(lessonContentGroup, !isPreTest);
    toggleGroup(lessonModalFooter, true);
    if (lessonSaveButton) {
      lessonSaveButton.textContent = isPreTest ? "Save pre-test" : "Save lesson";
    }
    if (lessonStandardActions) toggleGroup(lessonStandardActions, !isPreTest);
    if (lessonPretestActions) toggleGroup(lessonPretestActions, isPreTest);

    if (lessonTitleInput) {
      lessonTitleInput.required = !isPreTest;
      if (isPreTest && resetQuestions) lessonTitleInput.value = "";
    }
    if (lessonIndexInput && isPreTest && resetQuestions) {
      lessonIndexInput.value = "";
    }
    if (lessonSortOrderInput) {
      lessonSortOrderInput.required = !isPreTest;
      if (isPreTest && resetQuestions) lessonSortOrderInput.value = "";
    }
    if (lessonVideoUrlInput && isPreTest && resetQuestions) {
      lessonVideoUrlInput.value = "";
    }
    if (lessonResourceUrlInput && isPreTest && resetQuestions) {
      lessonResourceUrlInput.value = "";
    }
    if (lessonContentInput) {
      lessonContentInput.required = !isPreTest;
      if (isPreTest && resetQuestions) lessonContentInput.value = "";
    }

    if (isPreTest) {
      if (lessonModuleTitle && (!lessonModuleTitle.value || resetQuestions)) lessonModuleTitle.value = "Pre-Test";
      if (lessonModuleDescription && (!lessonModuleDescription.value || resetQuestions)) {
        lessonModuleDescription.value = "Baseline assessment before the lessons.";
      }
      if (lessonModuleOrder) lessonModuleOrder.value = 0;
      if (lessonItemCountInput && (!lessonItemCountInput.value || resetQuestions)) {
        lessonItemCountInput.value = 5;
      }
      if (resetQuestions) {
        const targetCount = Math.max(1, Number.parseInt(lessonItemCountInput?.value, 10) || 5);
        setQuestionBlockCount(targetCount);
      }
    } else if (isPostTest) {
      if (lessonModuleTitle && (!lessonModuleTitle.value || resetQuestions)) lessonModuleTitle.value = "Post-Test";
      if (lessonModuleDescription && (!lessonModuleDescription.value || resetQuestions)) {
        lessonModuleDescription.value = "Final assessment after completing the lessons.";
      }
      if (lessonModuleOrder) lessonModuleOrder.value = lessonModuleOrder.value || 99;
      if (lessonIndexInput && (!lessonIndexInput.value || resetQuestions)) lessonIndexInput.value = "POST";
      if (lessonSortOrderInput) lessonSortOrderInput.value = lessonSortOrderInput.value || 99;
      ensureQuestionBlockMinimum(5);
    } else {
      if (lessonModuleTitle && (!lessonModuleTitle.value || resetQuestions)) {
        lessonModuleTitle.value = `${activeCourseTitle} Module`;
      }
      if (lessonModuleDescription && resetQuestions) lessonModuleDescription.value = "";
      if (lessonModuleOrder && (!lessonModuleOrder.value || resetQuestions)) lessonModuleOrder.value = 1;
      if (lessonIndexInput && resetQuestions) lessonIndexInput.value = "";
      if (lessonSortOrderInput && (!lessonSortOrderInput.value || resetQuestions)) lessonSortOrderInput.value = 1;
      if (quizQuestionsContainer && resetQuestions) ensureQuestionBlockMinimum(1, { reset: true });
      else ensureQuestionBlockMinimum(1);
    }
  }

  function resetLessonForm(course) {
    if (!lessonForm) return;
    lessonForm.reset();
    lessonForm.classList.remove("was-validated");
    clearLessonFormAlert();
    if (lessonCourseName) {
      lessonCourseName.textContent = course ? course.title : "";
    }
    if (lessonModuleType) {
      lessonModuleType.value = "lesson";
    }
    ensureQuestionBlockMinimum(0, { reset: true });
    applyModuleTypeDefaults("lesson", { resetQuestions: true });
  }

  function collectQuizQuestions() {
    if (!quizQuestionsContainer) return [];
    const blocks = Array.from(quizQuestionsContainer.querySelectorAll(".lesson-question"));
    const questions = [];

    blocks.forEach((block, index) => {
      const promptField = block.querySelector(".question-prompt");
      const optionInputs = Array.from(block.querySelectorAll(".question-option"));
      const answerSelect = block.querySelector(".question-answer");
      const explanationField = block.querySelector(".question-explanation");

      const prompt = promptField?.value.trim();
      if (!prompt) return;

      const options = [];
      optionInputs.forEach((input, optionIndex) => {
        const label = input.value.trim();
        if (!label) return;
        const value = String.fromCharCode(97 + optionIndex);
        options.push({ value, label });
      });

      if (options.length < 2) return;

      const answer = answerSelect?.value;
      const answerOption = options.find(option => option.value === answer);
      if (!answerOption) return;

      questions.push({
        id: `q${Date.now()}_${index}`,
        prompt,
        options,
        answer,
        explanation: explanationField?.value.trim() || null
      });
    });

    return questions;
  }

  function openLessonModalForCourse(course, presetKind = "lesson") {
    if (!lessonModal || !lessonForm) return;
    activeLessonCourse = course;
    resetLessonForm(course);
    if (lessonModuleType) {
      lessonModuleType.value = presetKind;
      applyModuleTypeDefaults(presetKind, { resetQuestions: true });
    }
    if (lessonCourseName) {
      lessonCourseName.textContent = course?.title || "Course";
      const numericIndices = relatedLessons
        .map(value => Number(value))
        .filter(Number.isFinite)
        .sort((a, b) => b - a);
      if (numericIndices.length && Number.isFinite(numericIndices[0])) {
        lessonIndexInput.value = String(numericIndices[0] + 1);
      }
    }
    lessonModal.show();
  }

  async function handleLessonFormSubmit(event) {
    if (!lessonForm) return;
    event.preventDefault();
    event.stopPropagation();

    if (!assertSupabase()) return;
    if (!activeLessonCourse) {
      showLessonFormAlert("danger", "Select a course before adding a lesson.");
      return;
    }

    lessonForm.classList.add("was-validated");

    if (!lessonForm.checkValidity()) {
      showLessonFormAlert("danger", "Please complete the required fields.");
      return;
    }

    const moduleTypeValue = lessonModuleType?.value || "lesson";
    const isPreTest = moduleTypeValue === "pre-test";
    const isPostTest = moduleTypeValue === "post-test";
    const moduleTitleValue = lessonModuleTitle?.value.trim() || null;
    const moduleDescriptionValue = lessonModuleDescription?.value.trim() || null;
    const moduleOrderValue = isPreTest
      ? 0
      : lessonModuleOrder?.value !== "" ? Number(lessonModuleOrder.value) : null;
    const lessonTitleRaw = lessonTitleInput?.value.trim() || null;
    const lessonTitleValue = isPreTest
      ? lessonTitleRaw || moduleTitleValue || "Pre-Test"
      : lessonTitleRaw;
    const lessonIndexValue = isPreTest ? null : lessonIndexInput?.value.trim() || null;
    const lessonSortOrderValue = isPreTest
      ? 0
      : lessonSortOrderInput?.value !== "" ? Number(lessonSortOrderInput.value) : null;
    const lessonVideoValue = isPreTest ? null : lessonVideoUrlInput?.value.trim() || null;
    const lessonResourceValue = isPreTest ? null : lessonResourceUrlInput?.value.trim() || null;
    const lessonContentValue = isPreTest ? "" : lessonContentInput?.value.trim() || "";
    const quizIntroValue = lessonQuizIntroInput?.value.trim() || "";

    if (!lessonTitleValue) {
      showLessonFormAlert("danger", "Lesson title is required.");
      return;
    }

    if (!isPreTest && !lessonContentValue) {
      showLessonFormAlert("danger", "Lesson content is required.");
      return;
    }

    const quizQuestions = collectQuizQuestions();

    if (isPreTest || isPostTest) {
      if (quizQuestions.length === 0) {
        showLessonFormAlert("danger", "Pre/Post tests need at least one quiz question.");
        return;
      }
      if (isPreTest) {
        const expected = Math.max(1, Number.parseInt(lessonItemCountInput?.value, 10) || 0);
        if (quizQuestions.length !== expected) {
          showLessonFormAlert("danger", `Pre-test needs exactly ${expected} question${expected === 1 ? "" : "s"}.`);
          return;
        }
      }
    }

    const payload = {
      course_id: activeLessonCourse.id,
      title: lessonTitleValue,
      content: lessonContentValue,
      module_title: moduleTitleValue,
      module_description: moduleDescriptionValue,
      module_sort_order: moduleOrderValue,
      lesson_index: lessonIndexValue,
      sort_order: lessonSortOrderValue,
      video_url: lessonVideoValue,
      file_url: lessonResourceValue,
      created_at: new Date().toISOString()
    };

    const usesNumericLessonIds = lessons.some(item => Number.isFinite(Number(item?.id)));
    if (usesNumericLessonIds) {
      const existingLessonIds = new Set(
        lessons
          .map(item => Number(item?.id))
          .filter(Number.isFinite)
      );
      let generatedId = Date.now();
      while (existingLessonIds.has(generatedId)) {
        generatedId += 1;
      }
      payload.id = generatedId;
    }

    try {
      showLessonFormAlert("info", "Saving lesson…");
      const { data: lessonInsert, error: lessonError } = await supabaseClient
        .from("lessons")
        .insert(payload)
        .select("id")
        .maybeSingle();

      if (lessonError) {
        throw lessonError;
      }

      const newLessonId = lessonInsert?.id;

      if (newLessonId && quizQuestions.length > 0) {
        const questionRows = quizQuestions.map((question, index) => ({
          lesson_id: newLessonId,
          prompt: question.prompt,
          answer: question.answer,
          explanation: question.explanation,
          intro: quizIntroValue || null
        }));

        const { data: insertedQuestions, error: questionError } = await supabaseClient
          .from("quiz_questions")
          .insert(questionRows)
          .select("id");

        if (questionError) {
          throw questionError;
        }

        if (Array.isArray(insertedQuestions) && insertedQuestions.length) {
          const optionRows = [];
          insertedQuestions.forEach((inserted, index) => {
            const sourceQuestion = quizQuestions[index];
            if (!sourceQuestion) return;
            const questionId = inserted.id;
            if (!questionId) return;
            sourceQuestion.options.forEach((option, optIndex) => {
              optionRows.push({
                question_id: questionId,
                value: option.value,
                label: option.label
              });
            });
          });

          if (optionRows.length) {
            const { error: optionError } = await supabaseClient
              .from("quiz_options")
              .insert(optionRows);
            if (optionError) {
              throw optionError;
            }
          }
        }
      }

      showLessonFormAlert("success", "Lesson saved successfully.");
      await loadData(false);
      lessonModal.hide();
      showAlert(alertContainer, "success", "Lesson added successfully.");
    } catch (error) {
      console.error("Failed to save lesson", error);
      showLessonFormAlert("danger", error.message || "Unable to save lesson. Please try again.");
    }
  }

  function assertSupabase() {
    if (!supabaseClient) {
      console.error("Supabase client is not initialised.");
      showAlert(alertContainer, "danger", "Unable to reach the database. Please refresh the page.");
      return false;
    }
    return true;
  }

  function getUserRole(user) {
    if (!user) return "guest";
    const normalizedRole = typeof user.role === "string" ? user.role.trim().toLowerCase() : "";
    if (normalizedRole === "admin") return "admin";
    if (normalizedRole === "instructor") return "instructor";
    return "student";
  }

  function getActiveUser() {
    return typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
  }

  // Allow deep-linking to instructor-specific catalogs from the admin
  // Instructors page, via courses.html?instructor=<id>.
  (function presetInstructorFromQuery() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      const instructorParam = params.get("instructor");
      if (instructorParam) {
        activeInstructor = String(instructorParam);
      }
    } catch (error) {
      console.warn("Unable to read instructor filter from query string", error);
    }
  })();

  function getSidebarCourseSource(user, role) {
    if (activeView === "my-courses" && (role === "instructor" || role === "admin")) {
      return courses.filter(course => String(course.instructor_id) === String(user?.id || ""));
    }
    return courses;
  }

  function getVisitedLessonsFromStorage(courseId) {
    if (!courseId) return new Set();
    try {
      const raw = window.localStorage?.getItem(`${PROGRESS_STORAGE_PREFIX}${courseId}`);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return new Set();
      return new Set(
        parsed
          .map(value => Number(value))
          .filter(Number.isFinite)
      );
    } catch (error) {
      console.warn("Unable to read stored course progress", error);
      return new Set();
    }
  }

  function getCompletionFromStorage(courseId) {
    if (!courseId) return null;
    try {
      const raw = window.localStorage?.getItem(`${COMPLETION_STORAGE_PREFIX}${courseId}`);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch (error) {
      console.warn("Unable to read stored course completion", error);
      return null;
    }
  }

  function calculateLocalCourseProgress(courseId) {
    if (!courseId) return 0;
    const courseLessons = lessons.filter(item => Number(item.course_id) === Number(courseId));
    if (!courseLessons.length) return 0;

    const visitedLessons = getVisitedLessonsFromStorage(courseId);
    if (!visitedLessons.size) return 0;

    const completedCount = courseLessons.filter(lesson => visitedLessons.has(Number(lesson.id))).length;
    if (!completedCount) return 0;

    const ratio = completedCount / courseLessons.length;
    return Math.min(100, Math.round(ratio * 100));
  }

  async function seedSupabaseWithConfigData() {
    const seed = window.apiConfig?.seed;
    if (!seed || !assertSupabase()) return false;

    const { users: seedUsers = [], badges: seedBadges = [], courses: seedCourses = [], lessons: seedLessons = [] } = seed;

    const pick = (records, allowedKeys) =>
      records.map(record =>
        allowedKeys.reduce((accumulator, key) => {
          if (record[key] !== undefined) {
            accumulator[key] = record[key];
          }
          return accumulator;
        }, {})
      );

    const cleanedUsers = pick(seedUsers, ["id", "name", "email", "role"]);
    const cleanedBadges = pick(seedBadges, ["id", "title", "description", "image_url"]);
    const cleanedCourses = pick(seedCourses, [
      "id",
      "title",
      "description",
      "instructor_id",
      "thumbnail_url",
      "category",
      "badge_id",
      "status",
      "level",
      "duration_hours",
      "delivery",
      "cost",
      "created_at"
    ]);
    const cleanedLessons = pick(seedLessons, [
      "id",
      "course_id",
      "title",
      "content",
      "module_title",
      "module_description",
      "module_sort_order",
      "lesson_index",
      "sort_order",
      "video_url",
      "file_url",
      "created_at"
    ]);

    try {
      if (cleanedUsers.length) {
        await supabaseClient.from("users").upsert(cleanedUsers, { onConflict: "id" });
      }

      if (cleanedBadges.length) {
        await supabaseClient.from("badges").upsert(cleanedBadges, { onConflict: "id" });
      }

      if (cleanedCourses.length) {
        await supabaseClient.from("courses").upsert(cleanedCourses, { onConflict: "id" });
      }

      if (cleanedLessons.length) {
        await supabaseClient.from("lessons").upsert(cleanedLessons, { onConflict: "id" });
      }

      // Seed quiz data for lessons that have quiz
      for (const seedLesson of seedLessons) {
        if (seedLesson.quiz && Array.isArray(seedLesson.quiz.questions) && seedLesson.quiz.questions.length) {
          const lessonId = seedLesson.id;
          const quizIntro = seedLesson.quiz.intro || "";
          const questions = seedLesson.quiz.questions.map((question, index) => ({
            lesson_id: lessonId,
            prompt: question.prompt,
            answer: question.answer,
            explanation: question.explanation || null,
            intro: quizIntro,
            sort_order: index + 1
          }));
          
          const { data: insertedQuestions, error: questionError } = await supabaseClient
            .from("quiz_questions")
            .upsert(questions, { onConflict: "lesson_id,prompt" })
            .select("id, prompt");
          
          if (questionError) throw questionError;
          
          if (Array.isArray(insertedQuestions)) {
            const questionMap = new Map(insertedQuestions.map(q => [q.prompt, q.id]));
            
            for (const question of seedLesson.quiz.questions) {
              const questionId = questionMap.get(question.prompt);
              if (questionId && Array.isArray(question.options)) {
                const options = question.options.map((option, optIndex) => ({
                  question_id: questionId,
                  value: option.value,
                  label: option.label,
                  sort_order: optIndex + 1
                }));
                
                const { error: optionError } = await supabaseClient
                  .from("quiz_options")
                  .upsert(options, { onConflict: "question_id,value" });
                
                if (optionError) throw optionError;
              }
            }
          }
        }
      }

      console.info("Supabase seeded from local config data.");
      return true;
    } catch (error) {
      console.error("Failed to seed Supabase", error);
      showAlert(alertContainer, "danger", "Unable to seed initial data. Please check Supabase configuration.");
      return false;
    }
  }

  function renderCatalog() {
    const user = getActiveUser();
    const role = getUserRole(user);
    const searchTerm = (catalogFilters.search?.value || "").trim().toLowerCase();

    const visibleCourses = courses.filter(course => {
      if (role === "student") {
        // Students can only see published courses
        if (course.status !== "published") {
          return false;
        }
      } else if (role === "admin" || role === "instructor") {
        if (activeView === "catalog") {
          // Admin/Instructor Courses tab: show only published courses (from anyone)
          if (course.status !== "published") {
            return false;
          }
        } else if (activeView === "my-courses") {
          // My Courses tab (admin/instructor view): only courses YOU created
          // (both draft/unpublished and published). We'll sort later so
          // drafts/unpublished appear first.
          if (String(course.instructor_id) !== String(user?.id || "")) {
            return false;
          }
        }
      } else {
        // Guests or unknown roles only see published courses
        if (course.status !== "published") {
          return false;
        }
      }

      const category = (course.category || "General").toLowerCase();
      if (activeCategory !== "all" && category !== activeCategory.toLowerCase()) {
        return false;
      }

      if (activeInstructor !== "all" && String(course.instructor_id) !== activeInstructor) {
        return false;
      }

      if (searchTerm) {
        const haystack = `${course.title || ""} ${course.description || ""}`.toLowerCase();
        if (!haystack.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });

    updateCatalogHeader(activeCategory, activeInstructor, visibleCourses.length);
    syncSidebarFilters(activeCategory, activeInstructor);

    if (coursesLayout) {
      const sidebar = coursesLayout.querySelector(".col-12.col-xl-3");
      if (sidebar) {
        const personalCourses = getSidebarCourseSource(user, role);
        const shouldHideSidebar = activeView === "my-courses" && (role === "instructor" || role === "admin") && personalCourses.length === 0;
        sidebar.hidden = shouldHideSidebar;
      }
    }

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

    let sortedCourses = visibleCourses;

    // For admin/instructor My Courses view, sort so that
    // unpublished (non-published) courses appear first.
    if ((role === "admin" || role === "instructor") && activeView === "my-courses") {
      sortedCourses = [...visibleCourses].sort((a, b) => {
        const aDraft = a.status !== "published";
        const bDraft = b.status !== "published";
        if (aDraft !== bDraft) {
          return aDraft ? -1 : 1;
        }

        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
        if (aTime !== bTime) {
          return bTime - aTime; // newer first
        }

        return String(a.title || "").localeCompare(String(b.title || ""));
      });
    }

    coursesCatalog.innerHTML = sortedCourses
      .map((course, index) => {
        const badge = badges.find(item => Number(item.id) === Number(course.badge_id));
        const enrollment = enrollments.find(item => Number(item.course_id) === Number(course.id) && Number(item.student_id) === Number(user?.id));
        const isStudent = role === "student";
        const isEnrolled = Boolean(enrollment) && isStudent;
        const localProgress = isStudent ? calculateLocalCourseProgress(course.id) : 0;
        const enrollmentProgress = isStudent && enrollment ? Math.min(enrollment.progress || 0, 100) : 0;
        const progress = isStudent ? Math.max(localProgress, enrollmentProgress) : 0;
        const completionRecord = isStudent ? getCompletionFromStorage(course.id) : null;
        const enrollmentStatus = String(enrollment?.status || "").trim().toLowerCase();
        const hasServerCompletion = enrollmentStatus === "completed" || enrollmentStatus === "passed";
        const hasBadgeIssued = Boolean(enrollment?.badge_issued);
        const hasPassed = completionRecord?.status === "passed" || hasServerCompletion || hasBadgeIssued;
        const hasCompletedCourse = isEnrolled && progress >= 100 && hasPassed;
        const courseLessons = lessons.filter(item => Number(item.course_id) === Number(course.id));
        // Count distinct modules (excluding pre-test and post-test which
        // use reserved sort orders 0 and 99).
        const moduleKeys = courseLessons
          .filter(item => {
            const order = Number(item.module_sort_order);
            return order !== 0 && order !== 99;
          })
          .map(item => `${item.module_sort_order ?? 999}_${item.module_title || "Module"}`);
        const moduleCount = new Set(moduleKeys).size;

        const statusPill = role !== "student"
          ? `<span class="badge bg-${course.status === "published" ? "success" : "secondary"}">${course.status}</span>`
          : "";

        const isInstructor = role === "instructor" || role === "admin";
        let actionMarkup = "";
        if (isStudent) {
          if (!isEnrolled) {
            actionMarkup = `<button class="btn btn-sm btn-primary" data-action="enroll" data-course="${course.id}">Enroll</button>`;
          } else if (hasCompletedCourse) {
            actionMarkup = `
              <div class="d-flex align-items-center flex-wrap justify-content-end gap-2">
                <span class="badge bg-success-subtle text-success fw-semibold">Completed Course</span>
                <button class="btn btn-sm btn-outline-primary" data-action="view" data-course="${course.id}">View</button>
              </div>
            `;
          } else {
            actionMarkup = `<button class="btn btn-sm btn-outline-primary" data-action="continue" data-course="${course.id}">Continue</button>`;
          }
        } else if (!isInstructor) {
          actionMarkup = `<button class="btn btn-sm btn-outline-secondary" data-action="view" data-course="${course.id}">View</button>`;
        }

        const instructorActions = !isInstructor
          ? ""
          : `<button class="btn btn-sm btn-outline-secondary" type="button" data-action="view-course" data-course="${course.id}">${course.status === "published" ? "View course" : "Manage content"}</button>`;

        const levelPill = course.level
          ? `<span class="badge rounded-pill bg-success-subtle text-success fw-semibold">${course.level}</span>`
          : "";

        const durationMeta = course.duration_hours ? `${course.duration_hours} hrs` : null;
        const deliveryMeta = course.delivery || null;
        const costMeta = course.cost || null;
        const modulesMeta = moduleCount ? `${moduleCount} module${moduleCount === 1 ? "" : "s"}` : null;
        const metaPieces = [durationMeta, deliveryMeta, costMeta, modulesMeta].filter(Boolean);

        const badgeInfo = badge
          ? `<div class="small text-muted">Badge: ${badge.title}</div>`
          : "";

        const showProgress = isStudent && (isEnrolled || progress > 0);
        const progressMarkup = showProgress
          ? `<div class="mt-2">
              <div class="progress" style="height: 6px;">
                <div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="small text-muted mt-1">Progress: ${progress}%</div>
            </div>`
          : "";

        const thumbnailSource = buildCourseThumbnailPlaceholder(course, index);
        const titleHeading = "";

        return `
          <div class="col-12 col-md-6">
            <div class="card h-100 shadow-sm">
              <img src="${thumbnailSource}" class="card-img-top" alt="${course.title}" onerror="this.style.display='none'">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  ${titleHeading}
                  ${statusPill}
                </div>
                ${levelPill}
                <p class="card-text">${course.description || ""}</p>
                <div class="small text-muted mb-2 d-flex flex-wrap gap-2">
                  <span class="fw-semibold">${course.category || "General"}</span>
                  ${metaPieces.map(item => `<span class="text-muted">• ${item}</span>`).join(" ")}
                </div>
                <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                  <div class="small text-muted">Prepared by ISU-Roxas DBS</div>
                  <div class="d-flex gap-2">
                    ${instructorActions}
                    ${actionMarkup}
                  </div>
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
    if (!myCoursesList) return;
    const user = getActiveUser();
    const role = getUserRole(user);

    if (role === "guest") {
      myCoursesList.innerHTML = `<div class="alert alert-warning mb-0" role="alert">Select a user to see course progress.</div>`;
      return;
    }

    if (role !== "student") {
      myCoursesList.innerHTML = "";
      return;
    }

    if (myCoursesColumn) {
      myCoursesColumn.hidden = false;
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
        const localProgress = calculateLocalCourseProgress(enrollment.course_id);
        const progress = Math.max(localProgress, Math.min(enrollment.progress || 0, 100));
        const statusText = progress >= 100 ? "Completed" : `In progress (${progress}%)`;
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
            <div class="small text-muted mt-2">${statusText}</div>
          </div>
        `;
      })
      .join("");
  }

  function renderInstructorTable() {
    if (!instructorTableBody) {
      return;
    }
    const user = getActiveUser();
    const role = getUserRole(user);
    const isInstructor = role === "admin" || role === "instructor";

    if (!isInstructor) {
      if (instructorTableBody) {
        instructorTableBody.innerHTML = "";
      }
      return;
    }

    const managedCoursesRaw = role === "admin" ? courses : courses.filter(course => Number(course.instructor_id) === Number(user.id));

    if (!managedCoursesRaw.length) {
      instructorTableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No courses created yet.</td></tr>`;
      return;
    }

    const managedCourses = [...managedCoursesRaw].sort((a, b) => {
      const aDraft = a.status !== "published";
      const bDraft = b.status !== "published";
      if (aDraft !== bDraft) {
        // Draft/unpublished courses first
        return aDraft ? -1 : 1;
      }

      const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
      if (aTime !== bTime) {
        // Newer courses first within each group
        return bTime - aTime;
      }

      return String(a.title || "").localeCompare(String(b.title || ""));
    });

    instructorTableBody.innerHTML = managedCourses
      .map(course => {
        const lessonCount = lessons.filter(lesson => Number(lesson.course_id) === Number(course.id)).length;
        const enrollmentCount = enrollments.filter(enrollment => Number(enrollment.course_id) === Number(course.id)).length;
        const statusBadge = course.status === "published" ? "success" : course.status === "draft" ? "secondary" : "info";

        return `
          <tr data-course="${course.id}">
            <td class="fw-semibold">${course.title}</td>
            <td><span class="badge bg-${statusBadge}">${course.status}</span></td>
            <td>${lessonCount}</td>
            <td>${enrollmentCount}</td>
            <td class="text-end d-flex gap-2 justify-content-end">
              ${course.status === "draft" ? `
                <button class="btn btn-sm btn-outline-secondary" data-action="edit-course" data-course="${course.id}">Edit</button>
                <button class="btn btn-sm btn-outline-danger" data-action="delete-course" data-course="${course.id}">Delete</button>
              ` : `
                <button class="btn btn-sm btn-outline-secondary" data-action="view-course" data-course="${course.id}">View</button>
              `}
            </td>
          </tr>
        `;
      })
      .join("");
  }

  function updateViewToggleState(isInstructor) {
    if (!courseViewToggle) return;
    const buttons = courseViewToggle.querySelectorAll("button[data-view]");
    buttons.forEach(button => {
      button.classList.toggle("active", button.dataset.view === activeView);
    });
    courseViewToggle.hidden = !isInstructor;
  }

  function updateViewVisibility() {
    const user = getActiveUser();
    const role = getUserRole(user);
    const isInstructor = role === "admin" || role === "instructor";
    const isStudent = role === "student";

    if (!isInstructor && activeView !== "catalog") {
      activeView = "catalog";
    }

    updateViewToggleState(isInstructor);

    if (coursesActions) {
      coursesActions.hidden = !isInstructor;
    }

    if (coursesLayout) {
      coursesLayout.hidden = false;
    }

    if (instructorSection) {
      instructorSection.hidden = !(isInstructor && activeView === "my-courses");
    }

    if (myCoursesColumn) {
      myCoursesColumn.hidden = !isStudent;
    }
  }

  function setActiveView(view) {
    if (view !== "catalog" && view !== "my-courses") return;
    if (activeView === view) return;
    activeView = view;
    updateViewVisibility();
    populateFilters();
    renderCatalog();
  }

  function updateCatalogHeader(selectedCategory, selectedInstructor, courseCount) {
    if (!catalogHeading || !catalogCaption) return;

    const categoryLabel = selectedCategory === "all" ? "All Subjects" : selectedCategory;
    catalogHeading.textContent = `Available Courses – ${categoryLabel}`;
    catalogCaption.textContent = courseCount
      ? `Showing ${courseCount} course${courseCount === 1 ? "" : "s"}.`
      : "No courses available for this selection.";
  }

  function syncSidebarFilters(selectedCategory, selectedInstructor) {
    if (categoryList) {
      const items = categoryList.querySelectorAll("[data-category]");
      items.forEach(item => {
        item.classList.toggle("active", item.dataset.category === selectedCategory);
      });
    }

    if (instructorList) {
      const items = instructorList.querySelectorAll("[data-instructor]");
      items.forEach(item => {
        item.classList.toggle("active", item.dataset.instructor === selectedInstructor);
      });
    }
  }

  function populateCategoryList(categories = [], sourceCourses = []) {
    if (!categoryList) return;
    const selectedValue = activeCategory || "all";
    const referenceCourses = Array.isArray(sourceCourses) && sourceCourses.length ? sourceCourses : courses;
    const items = [
      { label: "All Subjects", value: "all", description: "Discover every course we offer." },
      ...categories.map(label => ({
        label,
        value: label,
        description: `Explore ${label} learning paths.`
      }))
    ];

    categoryList.innerHTML = items
      .map(item => `
        <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
          item.value === selectedValue ? "active" : ""
        }" data-category="${item.value}">
          <span>${item.label}</span>
          <span class="small text-muted">${
            item.value === "all"
              ? referenceCourses.length
              : referenceCourses.filter(course => (course.category || "").toLowerCase() === item.value.toLowerCase()).length
          }</span>
        </button>
      `)
      .join("");
  }

  function populateInstructorList(instructorOptions = []) {
    if (!instructorList) return;
    const selectedValue = activeInstructor || "all";
    const items = [
      {
        label: "All mentors",
        value: "all",
        specialty: "Browse every instructor"
      },
      ...instructorOptions.map(user => ({
        label: user.name,
        value: String(user.id),
        specialty: user.email
      }))
    ];

    instructorList.innerHTML = items
      .map(item => `
        <button type="button" class="list-group-item list-group-item-action ${
          item.value === selectedValue ? "active" : ""
        }" data-instructor="${item.value}">
          <span class="d-block fw-semibold">${item.label}</span>
          <span class="small text-muted">${item.specialty || ""}</span>
        </button>
      `)
      .join("");
  }

  function populateFilters() {
    const activeUser = getActiveUser();
    const activeUserRole = getUserRole(activeUser);
    const relevantCourses = getSidebarCourseSource(activeUser, activeUserRole);
    const categories = Array.from(new Set(relevantCourses.map(course => (course.category || "General").trim())));
    let instructorOptions = instructors.filter(user => user.role === "instructor");

    if (activeUserRole === "instructor" && activeUser?.id) {
      const activeId = String(activeUser.id);
      instructorOptions = instructorOptions.filter(user => String(user.id) !== activeId);
      if (activeInstructor === activeId) {
        activeInstructor = "all";
      }
    }

    if (activeCategory !== "all" && !categories.some(label => label.toLowerCase() === activeCategory.toLowerCase())) {
      activeCategory = "all";
    }

    if (
      activeInstructor !== "all" &&
      !instructorOptions.some(user => String(user.id) === String(activeInstructor))
    ) {
      activeInstructor = "all";
    }

    populateCategoryList(categories, relevantCourses);
    populateInstructorList(instructorOptions);
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
    if (rewardTypeSelect) {
      rewardTypeSelect.value = "none";
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
      if (rewardTypeSelect) {
        rewardTypeSelect.value = course.reward_type || (course.badge_id ? "badge" : "none");
      }
    } else {
      resetCourseForm();
    }

    courseModal.show();
  }

  function closeCourseModal() {
    if (!courseModal) return;
    courseModal.hide();
  }

  function buildBadgeImageUrl(title) {
    return "https://placehold.co/240?text=" + encodeURIComponent(title);
  }

  async function loadData(allowSeedFlag = true) {
    if (!assertSupabase()) return;

    try {
      const user = getActiveUser();
      const role = getUserRole(user);
      const enrollmentsQuery = role === "student"
        ? supabaseClient.from("enrollments").select("*").eq("student_id", user?.id || 0)
        : supabaseClient.from("enrollments").select("*");

      const [
        { data: coursesData, error: coursesError },
        { data: lessonsData, error: lessonsError },
        { data: quizQuestionsData, error: quizQuestionsError },
        { data: quizOptionsData, error: quizOptionsError },
        { data: enrollmentsData, error: enrollmentsError },
        { data: badgesData, error: badgesError },
        { data: usersData, error: usersError }
      ] = await Promise.all([
        supabaseClient.from("courses").select("*"),
        supabaseClient.from("lessons").select("*"),
        supabaseClient.from("quiz_questions").select("*"),
        supabaseClient.from("quiz_options").select("*"),
        enrollmentsQuery,
        supabaseClient.from("badges").select("*"),
        supabaseClient.from("users").select("*")
      ]);

      if (coursesError) throw coursesError;
      if (lessonsError) throw lessonsError;
      if (quizQuestionsError) throw quizQuestionsError;
      if (quizOptionsError) throw quizOptionsError;
      if (enrollmentsError) throw enrollmentsError;
      if (badgesError) throw badgesError;
      if (usersError) throw usersError;

      courses = Array.isArray(coursesData) ? coursesData : [];
      lessons = Array.isArray(lessonsData) ? lessonsData : [];
      const questionsByLesson = Array.isArray(quizQuestionsData)
        ? quizQuestionsData.reduce((collection, row) => {
          const lessonId = Number(row.lesson_id);
          if (!Number.isFinite(lessonId)) return collection;
          if (!collection[lessonId]) {
            collection[lessonId] = {
              intro: row.intro || null,
              questions: []
            };
          }
          if (row.intro && !collection[lessonId].intro) {
            collection[lessonId].intro = row.intro;
          }
          collection[lessonId].questions.push({
            id: row.id,
            prompt: row.prompt,
            answer: row.answer,
            explanation: row.explanation || null,
            sort_order: row.sort_order || collection[lessonId].questions.length + 1
          });
          return collection;
        }, {})
        : {};

      const optionsByQuestion = Array.isArray(quizOptionsData)
        ? quizOptionsData.reduce((collection, row) => {
          const questionId = Number(row.question_id);
          if (!Number.isFinite(questionId)) return collection;
          if (!collection[questionId]) {
            collection[questionId] = [];
          }
          collection[questionId].push({
            value: row.value,
            label: row.label,
            sort_order: row.sort_order || collection[questionId].length + 1
          });
          return collection;
        }, {})
        : {};

      lessons = lessons.map(lesson => {
        const lessonId = Number(lesson.id);
        const quizBundle = questionsByLesson[lessonId];
        if (quizBundle) {
          const orderedQuestions = [...quizBundle.questions].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
          return Object.assign({}, lesson, {
            quiz: {
              intro: quizBundle.intro,
              questions: orderedQuestions.map(question => {
                const optionSet = optionsByQuestion[Number(question.id)] || [];
                const orderedOptions = [...optionSet]
                  .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                  .map(option => ({ value: option.value, label: option.label }));
                return {
                  id: question.id,
                  prompt: question.prompt,
                  options: orderedOptions,
                  answer: question.answer,
                  explanation: question.explanation
                };
              })
            }
          });
        }
        return Object.assign({}, lesson, { quiz: null });
      });

      enrollments = Array.isArray(enrollmentsData) ? enrollmentsData : [];
      badges = Array.isArray(badgesData) ? badgesData : [];
      instructors = Array.isArray(usersData) ? usersData.filter(item => item.role === "instructor" || item.role === "admin" || item.role === "student") : [];

      if (!courses.length && allowSeedFlag) {
        const seeded = await seedSupabaseWithConfigData();
        if (seeded) {
          await loadData(false);
          return;
        }
      }

      populateFilters();
      renderCatalog();
      renderMyCourses();
      renderInstructorTable();
      updateViewVisibility();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", "Unable to load courses. Please try again later.");
    }
  }

  async function handleEnroll(courseId) {
    if (!assertSupabase()) return;
    const user = getActiveUser();
    const role = getUserRole(user);
    if (!user) {
      showAlert(alertContainer, "warning", "Select a user before enrolling in a course.");
      return;
    }

    const numericCourseId = Number(courseId);

    try {
      const { error } = await supabaseClient.from("enrollments").insert({
        student_id: user.id,
        course_id: numericCourseId,
        status: "in-progress",
        progress: 0,
        badge_issued: false
      });
      if (error) throw error;

      showAlert(alertContainer, "success", "Successfully enrolled in the course.");
      await loadData();

      // After enrolling, take the student straight into the course so the
      // Enroll button behaves like a clear action.
      handleContinueCourse(numericCourseId);
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to enroll in the course.");

      // Even if enrollment fails due to backend permissions, still allow the
      // student to open the course so the Enroll button is functional.
      if (!Number.isNaN(numericCourseId)) {
        handleContinueCourse(numericCourseId);
      }
    }
  }

  async function handleDeleteCourse(courseId) {
    if (!assertSupabase()) return;
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
      await supabaseClient.from("lessons").delete().eq("course_id", courseId);
      await supabaseClient.from("enrollments").delete().eq("course_id", courseId);
      const { error } = await supabaseClient.from("courses").delete().eq("id", courseId);
      if (error) throw error;
      showAlert(alertContainer, "success", "Course deleted successfully.");
      await loadData();
    } catch (error) {
      console.error(error);
      showAlert(alertContainer, "danger", error.message || "Failed to delete course.");
    }
  }

  function handleContinueCourse(courseId) {
    const numericId = Number(courseId);
    const selectedCourse = courses.find(item => Number(item.id) === numericId) || null;
    cacheSelectedCourse(selectedCourse);
    window.location.href = `course_details.html?id=${courseId}`;
  }

  async function handleCourseFormSubmit(event) {
    event.preventDefault();
    const submitButton = courseForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Saving...";
    }

    if (!assertSupabase()) {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Save";
      }
      return;
    }

    const user = getActiveUser();
    const role = getUserRole(user);
    if (!user) {
      showAlert(alertContainer, "warning", "Select an instructor user before creating a course.");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Save";
      }
      return;
    }

    if (role !== "admin" && role !== "instructor") {
      showAlert(alertContainer, "warning", "Only instructors can create courses.");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Save";
      }
      return;
    }

    try {
      const rewardSelection = "both";
      const payload = {
        title: courseForm.querySelector("#courseTitle").value.trim(),
        description: courseForm.querySelector("#courseDescription").value.trim(),
        category: courseForm.querySelector("#courseCategory").value.trim() || "General",
        status: courseForm.querySelector("#courseStatus").value,
        instructor_id: user.id,
        reward_type: rewardSelection
      };

      const rewardIncludesBadge = rewardSelection === "badge" || rewardSelection === "both";
      const rewardIncludesCertificate = rewardSelection === "certificate" || rewardSelection === "both";
      const existingCourse = editingCourseId
        ? courses.find(course => Number(course.id) === Number(editingCourseId))
        : null;
      let badgeIdNeedingCourseLink = null;
      let pendingCertificateInsert = null;
      let shouldDeleteCertificate = false;

      if (rewardIncludesBadge) {
        if (existingCourse?.badge_id) {
          const badgeTitle = payload.title || "Course Badge";
          const badgeDescription = `Awarded for completing the ${badgeTitle} course.`;
          const badgeImageUrl = buildBadgeImageUrl(badgeTitle);

          const updatePayload = {
            title: badgeTitle,
            description: badgeDescription,
            image_url: badgeImageUrl
          };
          if (editingCourseId) {
            updatePayload.course_id = Number(editingCourseId);
          }

          const { data: updatedBadge, error: badgeUpdateError } = await supabaseClient
            .from("badges")
            .update(updatePayload)
            .eq("id", existingCourse.badge_id)
            .select()
            .single();

          if (badgeUpdateError) throw badgeUpdateError;
          payload.badge_id = updatedBadge?.id || existingCourse.badge_id;
        } else {
          const baseBadgeTitle = payload.title || "Course Completion";
          const badgeTitle = baseBadgeTitle;
          const badgeDescription = `Awarded for completing the ${baseBadgeTitle} course.`;
          const badgeImageUrl = buildBadgeImageUrl(badgeTitle);

          const insertPayload = {
            title: badgeTitle,
            description: badgeDescription,
            image_url: badgeImageUrl,
            course_id: editingCourseId ? Number(editingCourseId) : null
          };

          const { data: newBadge, error: badgeError } = await supabaseClient
            .from("badges")
            .insert(insertPayload)
            .select()
            .single();

          if (badgeError) throw badgeError;
          const newBadgeId = newBadge?.id || null;
          payload.badge_id = newBadgeId;
          if (!editingCourseId && newBadgeId) {
            badgeIdNeedingCourseLink = newBadgeId;
          }
        }
      } else {
        payload.badge_id = null;
        if (existingCourse?.badge_id) {
          await supabaseClient
            .from("badges")
            .update({ course_id: null })
            .eq("id", existingCourse.badge_id);
        }
      }

      if (rewardIncludesCertificate) {
        const certificateTitle = payload.title || "Course Certificate";
        const certificateDescription = `Awarded for completing the ${certificateTitle} course.`;
        const certificateImageUrl = `https://placehold.co/600x400?text=${encodeURIComponent(`${certificateTitle} Certificate`)}`;

        if (editingCourseId) {
          const { data: existingCertificates, error: certificateLookupError } = await supabaseClient
            .from("certificates")
            .select("id")
            .eq("course_id", editingCourseId)
            .limit(1);
          if (certificateLookupError) throw certificateLookupError;

          const existingCertificateId = existingCertificates?.[0]?.id || null;
          if (existingCertificateId) {
            const { error: certificateUpdateError } = await supabaseClient
              .from("certificates")
              .update({ title: certificateTitle, description: certificateDescription })
              .eq("id", existingCertificateId);
            if (certificateUpdateError) throw certificateUpdateError;
          } else {
            const { error: certificateInsertError } = await supabaseClient
              .from("certificates")
              .insert({
                course_id: Number(editingCourseId),
                title: certificateTitle,
                description: certificateDescription,
                image_url: certificateImageUrl
              });
            if (certificateInsertError) throw certificateInsertError;
          }
        } else {
          pendingCertificateInsert = {
            title: certificateTitle,
            description: certificateDescription,
            image_url: certificateImageUrl
          };
        }
      } else if (editingCourseId) {
        shouldDeleteCertificate = true;
      }

      let courseIdForLink = editingCourseId ? Number(editingCourseId) : null;

      if (editingCourseId) {
        const { error } = await supabaseClient
          .from("courses")
          .update(payload)
          .eq("id", editingCourseId);
        if (error) throw error;
      } else {
        const { data: insertedCourse, error } = await supabaseClient
          .from("courses")
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        courseIdForLink = insertedCourse?.id || null;
      }

      if (badgeIdNeedingCourseLink && courseIdForLink) {
        await supabaseClient
          .from("badges")
          .update({ course_id: courseIdForLink })
          .eq("id", badgeIdNeedingCourseLink);
      }

      if (pendingCertificateInsert && courseIdForLink) {
        const { error: certificateCreateError } = await supabaseClient
          .from("certificates")
          .insert({
            course_id: courseIdForLink,
            title: pendingCertificateInsert.title,
            description: pendingCertificateInsert.description,
            image_url: pendingCertificateInsert.image_url
          });
        if (certificateCreateError) throw certificateCreateError;
      }

      if (shouldDeleteCertificate && editingCourseId) {
        const { error: certificateDeleteError } = await supabaseClient
          .from("certificates")
          .delete()
          .eq("course_id", editingCourseId);
        if (certificateDeleteError) throw certificateDeleteError;
      }

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

    if (instructorTableBody) {
      instructorTableBody.addEventListener("click", event => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const action = button.getAttribute("data-action");
        const courseId = Number(button.getAttribute("data-course"));
        if (!courseId) return;

        if (action === "edit-course") {
          const course = courses.find(c => Number(c.id) === courseId);
          if (course) openCourseModal(course);
        } else if (action === "delete-course") {
          handleDeleteCourse(courseId);
        }
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
        return;
      }

      if (action === "view" || action === "view-course") {
        handleContinueCourse(courseId);
        return;
      }

      if (action === "continue") {
        handleContinueCourse(courseId);
        return;
      }

      if (action === "edit-course") {
        const course = courses.find(c => Number(c.id) === courseId);
        if (course) openCourseModal(course);
        return;
      }

      if (action === "delete-course") {
        handleDeleteCourse(courseId);
        return;
      }
    });

    if (myCoursesList) {
      myCoursesList.addEventListener("click", event => {
        const button = event.target.closest("button[data-action='continue']");
        if (!button) return;
        const courseId = Number(button.getAttribute("data-course"));
        if (!courseId) return;
        handleContinueCourse(courseId);
      });
    }

    if (courseViewToggle) {
      courseViewToggle.addEventListener("click", event => {
        const button = event.target.closest("button[data-view]");
        if (!button) return;
        const view = button.dataset.view || "catalog";
        if (view === "my-courses") {
          renderInstructorTable();
        }
        setActiveView(view);
      });
    }

    categoryList?.addEventListener("click", event => {
      const item = event.target.closest("[data-category]");
      if (!item) return;
      const value = item.dataset.category || "all";
      if (value === activeCategory) return;
      activeCategory = value;
      renderCatalog();
    });

    instructorList?.addEventListener("click", event => {
      const item = event.target.closest("[data-instructor]");
      if (!item) return;
      const value = item.dataset.instructor || "all";
      if (value === activeInstructor) return;
      activeInstructor = value;
      renderCatalog();
    });

    const searchField = document.getElementById("catalogSearch");
    if (searchField) {
      catalogFilters.search = searchField;
      searchField.addEventListener("input", () => {
        renderCatalog();
      });
    }
  }

  attachEvents();
  loadData();
});
