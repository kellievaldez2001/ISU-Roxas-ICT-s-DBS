  const alertContainer = document.getElementById("courseDetailAlert");
  const breadcrumbCourse = document.getElementById("breadcrumbCourse");
  const courseHero = document.getElementById("courseHero");
  const courseTitle = document.getElementById("courseTitle");
  const publishCourseButton = document.getElementById("publishCourseButton");
  const courseSummary = document.getElementById("courseSummary");
  const courseMeta = document.getElementById("courseMeta");
  const courseBadgeWrap = document.getElementById("courseBadgeWrap");
  const coursePrimaryAction = document.getElementById("coursePrimaryAction");
  const courseSecondaryAction = document.getElementById("courseSecondaryAction");
  const courseLevelPill = document.getElementById("courseLevelPill");
  const courseContent = document.getElementById("courseContent");
  const lessonOutline = document.getElementById("lessonOutline");
  const lessonCountCaption = document.getElementById("lessonCountCaption");
  const lessonTitle = document.getElementById("lessonTitle");
  const lessonMeta = document.getElementById("lessonMeta");
  const lessonContent = document.getElementById("lessonContent");
  const lessonVideoWrapper = document.getElementById("lessonVideoWrapper");
  const lessonVideo = document.getElementById("lessonVideo");
  const downloadResource = document.getElementById("downloadResource");
  const lessonScrollContainer = document.getElementById("lessonScrollContainer");
  const lessonScrollProgress = document.getElementById("lessonScrollProgress");
  const lessonScrollProgressBar = document.getElementById("lessonScrollProgressBar");
  const lessonScrollProgressCaption = document.getElementById("lessonScrollProgressCaption");
  const lessonQuiz = document.getElementById("lessonQuiz");
  const lessonQuizBody = document.getElementById("lessonQuizBody");
  const lessonQuizStatus = document.getElementById("lessonQuizStatus");
  const lessonQuizResult = document.getElementById("lessonQuizResult");
  const lessonQuizTitle = lessonQuiz ? lessonQuiz.querySelector("h3") : null;
  const prevModuleBtn = document.getElementById("prevModuleBtn");
  const nextModuleBtn = document.getElementById("nextModuleBtn");
  const courseManageActions = document.getElementById("courseManageActions");
  const courseManageModals = document.getElementById("courseManageModals");

  const editLessonModalElement = document.getElementById("editLessonModal");
  const editLessonModal = editLessonModalElement ? new bootstrap.Modal(editLessonModalElement) : null;
  const editLessonModalTitle = editLessonModalElement ? editLessonModalElement.querySelector(".modal-title") : null;
  const editLessonForm = document.getElementById("editLessonForm");
  const editLessonFormAlert = document.getElementById("editLessonFormAlert");
  const editLessonCourseTitle = document.getElementById("editLessonCourseTitle");
  const editLessonTitleInput = document.getElementById("editLessonTitle");
  const editLessonOverviewInput = document.getElementById("editLessonOverview");
  const editLessonContentInput = document.getElementById("editLessonContent");
  const editLessonSaveButton = document.getElementById("editLessonSaveButton");
  const editLessonQuizButton = document.getElementById("editLessonQuizButton");
  const lessonQuizEditModalElement = document.getElementById("lessonQuizEditModal");
  const lessonQuizEditModal = lessonQuizEditModalElement ? new bootstrap.Modal(lessonQuizEditModalElement) : null;
  const lessonQuizEditForm = document.getElementById("lessonQuizEditForm");
  const lessonQuizEditFormAlert = document.getElementById("lessonQuizEditFormAlert");
  const lessonQuizEditCourseTitle = document.getElementById("lessonQuizEditCourseTitle");
  const lessonQuizEditItemCount = document.getElementById("lessonQuizEditItemCount");
  const lessonQuizEditQuestions = document.getElementById("lessonQuizEditQuestions");
  const lessonQuizEditSaveButton = document.getElementById("lessonQuizEditSaveButton");
  const moduleLessonsContainerId = "moduleLessonsContainer";
  const moduleLessonsModalMarkup = `
    <div class="modal fade" id="moduleLessonsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h2 class="modal-title h5 mb-0">Add Module &amp; Lessons</h2>
              <p class="small text-muted mb-0" id="moduleLessonsCourseTitle"></p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="moduleLessonsForm" class="needs-validation" novalidate>
            <div class="modal-body">
              <div id="moduleLessonsFormAlert" class="alert d-none" role="alert"></div>

              <div class="row g-3 align-items-end">
                <div class="col-12 col-md-6">
                  <label for="moduleLessonsTitle" class="form-label">Module title</label>
                  <input type="text" class="form-control" id="moduleLessonsTitle" placeholder="Module title" required>
                  <div class="invalid-feedback">Module title is required.</div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="moduleLessonsCount" class="form-label">Number of lessons</label>
                  <input type="number" class="form-control" id="moduleLessonsCount" min="0" value="0" required>
                  <div class="invalid-feedback">Please specify how many lessons this module will contain.</div>
                </div>
              </div>

              <div class="mt-3">
                <label for="moduleLessonsDescription" class="form-label">Module description <span class="text-muted">(optional)</span></label>
                <textarea id="moduleLessonsDescription" class="form-control" rows="2" placeholder="Provide a short description"></textarea>
              </div>

              <hr class="my-4">

              <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="h6 mb-0">Lesson details</h3>
                <p class="small text-muted mb-0">Lesson fields update automatically when you change the count above.</p>
              </div>

              <div id="moduleLessonsContainer" class="vstack gap-3"></div>
            </div>
            <div class="modal-footer bg-body">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" id="moduleLessonsSaveButton">Save module &amp; lessons</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <template id="moduleLessonTemplate">
      <section class="card shadow-sm border-0 lesson-block">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <p class="badge bg-success-subtle text-success lesson-index mb-1">Lesson <span data-role="lesson-number">1</span></p>
              <h4 class="h6 mb-0">Lesson details</h4>
            </div>
            <button type="button" class="btn btn-link text-danger p-0 lesson-remove" data-role="remove-lesson" aria-label="Remove lesson">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label class="form-label">Lesson title</label>
              <input type="text" class="form-control" data-role="lesson-title" placeholder="Lesson title" required>
              <div class="invalid-feedback">Lesson title is required.</div>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label">Lesson Overview <span class="text-muted">(optional)</span></label>
              <input type="text" class="form-control" data-role="lesson-index" placeholder="Add a short overview of this lesson">
            </div>
            <div class="col-12">
              <label class="form-label">Discussion / lesson content</label>
              <textarea class="form-control" rows="4" data-role="lesson-content" placeholder="Add discussion points, objectives, or resources" required></textarea>
              <div class="invalid-feedback">Please provide lesson content.</div>
            </div>
          </div>

          <div class="d-flex justify-content-end mt-3">
            <button type="button" class="btn btn-outline-success btn-sm" data-role="lesson-add-quiz">Add quiz</button>
          </div>

          <div class="card bg-body-tertiary border-0 mt-3 d-none" data-role="lesson-quiz-container">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p class="badge bg-primary-subtle text-primary mb-1">Quiz Items</p>
                  <h5 class="h6 mb-1">Lesson quiz</h5>
                  <p class="text-muted small mb-0">Provide optional assessment items for this lesson.</p>
                </div>
                <button type="button" class="btn btn-link text-danger p-0" data-role="lesson-remove-quiz">Remove</button>
              </div>

              <div class="row align-items-end g-3 mb-3">
                <div class="col-12 col-md-4">
                  <label class="form-label">Number of items</label>
                  <input type="number" class="form-control" min="1" value="1" data-role="lesson-quiz-count">
                </div>
                <div class="col">
                  <p class="small text-muted mb-0">Adjust to add more multiple-choice questions for this lesson.</p>
                </div>
              </div>

              <div class="vstack gap-3" data-role="lesson-quiz-questions"></div>

              <template data-role="lesson-quiz-question-template">
                <div class="lesson-quiz-question border rounded p-3" data-role="lesson-quiz-question">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="mb-0">Item <span data-role="quiz-item-number">1</span></h6>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Question</label>
                    <textarea class="form-control" rows="3" data-role="quiz-question" placeholder="Enter the quiz question"></textarea>
                  </div>

                  <div class="row g-2 mb-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label">Option A</label>
                      <input type="text" class="form-control" data-role="quiz-option" data-option="a" placeholder="Option A">
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">Option B</label>
                      <input type="text" class="form-control" data-role="quiz-option" data-option="b" placeholder="Option B">
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">Option C</label>
                      <input type="text" class="form-control" data-role="quiz-option" data-option="c" placeholder="Option C">
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">Option D</label>
                      <input type="text" class="form-control" data-role="quiz-option" data-option="d" placeholder="Option D">
                    </div>
                  </div>

                  <div>
                    <label class="form-label">Correct answer</label>
                    <select class="form-select" data-role="quiz-answer">
                      <option value="a">Option A</option>
                      <option value="b">Option B</option>
                      <option value="c">Option C</option>
                      <option value="d">Option D</option>
                    </select>
                  </div>

                  <div class="mt-3">
                    <label class="form-label">Explanation <span class="text-muted">(optional)</span></label>
                    <textarea class="form-control" rows="2" data-role="quiz-explanation" placeholder="Provide additional context for the correct answer"></textarea>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>
    </template>
  `;
  const postTestModalMarkup = `
    <div class="modal fade" id="postTestModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h2 class="modal-title h5 mb-0">Add Post-Test</h2>
              <p class="small text-muted mb-0" id="postTestCourseTitle"></p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="postTestForm" class="needs-validation" novalidate>
            <div class="modal-body">
              <div id="postTestFormAlert" class="alert d-none" role="alert"></div>

              <div class="mb-3">
                <label for="postTestInstructions" class="form-label">Post-test instructions</label>
                <textarea id="postTestInstructions" class="form-control" rows="3" placeholder="Provide guidance for the learners" required></textarea>
                <div class="invalid-feedback">Please add instructions for the post-test.</div>
              </div>

              <div class="row g-3 align-items-end mb-3">
                <div class="col-12 col-sm-4">
                  <label for="postTestItemCount" class="form-label">Number of items</label>
                  <input type="number" id="postTestItemCount" class="form-control" min="1" value="5" required>
                  <div class="invalid-feedback">Enter how many questions the post-test should have.</div>
                </div>
                <div class="col">
                  <p class="small text-muted mb-0">Question fields update automatically when you change the number above.</p>
                </div>
              </div>

              <div id="postTestQuestions" class="vstack gap-3"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" id="postTestSaveButton">Save post-test</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  function buildBadgePreviewImageUrl(title) {
    const safeTitle = escapeHtml(title || "Badge");
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="courseBadgeMedal" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#facc15" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <radialGradient id="courseBadgeInner" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fee2e2" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#b91c1c" />
    </radialGradient>
  </defs>
  <rect width="256" height="256" fill="#ffffff" rx="24" />
  <g transform="translate(0,0)">
    <path d="M104 16 L128 96 L152 16 Z" fill="#b91c1c" />
    <path d="M112 16 L128 82 L144 16 Z" fill="#ef4444" opacity="0.9" />
  </g>
  <g>
    <circle cx="128" cy="148" r="70" fill="url(#courseBadgeMedal)" />
    <circle cx="128" cy="148" r="56" fill="url(#courseBadgeInner)" />
  </g>
</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function injectPostTestMarkup() {
    const existingModal = document.getElementById("postTestModal");
    if (existingModal) {
      existingModal.remove();
    }

    const target = courseManageModals || document.body;
    if (!target) return;
    target.insertAdjacentHTML("beforeend", postTestModalMarkup);
  }

  // Medal-style badge image used for Course Badge Earned modal
  function buildCourseBadgeMedalImageUrl() {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="strapFill" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#b91c1c" />
      <stop offset="100%" stop-color="#ef4444" />
    </linearGradient>
    <radialGradient id="medalInner" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fecaca" />
      <stop offset="45%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#b91c1c" />
    </radialGradient>
  </defs>
  <rect width="256" height="256" fill="#ffffff" rx="24" />
  <!-- Strap -->
  <g transform="translate(0,8)">
    <path d="M96 0 L128 96 L160 0 Z" fill="url(#strapFill)" />
    <path d="M108 0 L128 64 L148 0 Z" fill="#dc2626" opacity="0.9" />
  </g>
  <!-- Medal frame -->
  <g>
    <circle cx="128" cy="152" r="70" fill="#facc15" />
    <circle cx="128" cy="152" r="60" fill="#f97316" />
    <circle cx="128" cy="152" r="52" fill="url(#medalInner)" />
  </g>
</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function getResolvedCourseBadgeImage(badge, courseTitle) {
    const raw = badge?.image_url ? String(badge.image_url).trim() : "";
    if (raw) return raw;
    return buildCourseBadgeMedalImageUrl();
  }

  function showEditLessonFormAlert(type, message) {
    if (!editLessonFormAlert) return;
    editLessonFormAlert.className = `alert alert-${type}`;
    editLessonFormAlert.textContent = message;
  }

  function clearEditLessonFormAlert() {
    if (!editLessonFormAlert) return;
    editLessonFormAlert.className = "alert d-none";
    editLessonFormAlert.textContent = "";
  }

  function showLessonQuizEditFormAlert(type, message) {
    if (!lessonQuizEditFormAlert) return;
    lessonQuizEditFormAlert.className = `alert alert-${type}`;
    lessonQuizEditFormAlert.textContent = message;
  }

  function clearLessonQuizEditFormAlert() {
    if (!lessonQuizEditFormAlert) return;
    lessonQuizEditFormAlert.className = "alert d-none";
    lessonQuizEditFormAlert.textContent = "";
  }

  function updateLessonQuizEditQuestionLabels() {
    if (!lessonQuizEditQuestions) return;
    const blocks = Array.from(lessonQuizEditQuestions.querySelectorAll("[data-lesson-quiz-question]"));
    blocks.forEach((block, index) => {
      const label = block.querySelector("[data-lesson-quiz-question-number]");
      if (label) {
        label.textContent = index + 1;
      }
    });
  }

  function setLessonQuizEditQuestionCount(count) {
    if (!lessonQuizEditQuestions) return;
    const target = Math.max(0, Number(count) || 0);
    const existing = Array.from(lessonQuizEditQuestions.querySelectorAll("[data-lesson-quiz-question]"));
    if (existing.length > target) {
      existing.slice(target).forEach(block => block.remove());
    }
    const template = document.getElementById("lessonQuizEditQuestionTemplate");
    if (!template) return;
    let current = lessonQuizEditQuestions.querySelectorAll("[data-lesson-quiz-question]").length;
    while (current < target) {
      const fragment = template.content.cloneNode(true);
      lessonQuizEditQuestions.appendChild(fragment);
      current += 1;
    }
    updateLessonQuizEditQuestionLabels();
  }

  function collectLessonQuizEditQuestions() {
    if (!lessonQuizEditQuestions) return [];
    return Array.from(lessonQuizEditQuestions.querySelectorAll("[data-lesson-quiz-question]")).map(block => {
      const promptField = block.querySelector("[data-field='prompt']");
      const optionInputs = Array.from(block.querySelectorAll("[data-field='option']"));
      const answerSelect = block.querySelector("[data-field='answer']");
      const explanationField = block.querySelector("[data-field='explanation']");

      const prompt = promptField?.value.trim() || "";
      const options = optionInputs.map(input => ({
        value: input.dataset.option,
        label: input.value.trim()
      }));
      const answer = answerSelect?.value || "";
      const explanation = explanationField?.value.trim() || "";

      return { prompt, options, answer, explanation };
    });
  }

  function resetLessonQuizEditForm(lesson = null) {
    if (!lessonQuizEditForm) return;
    lessonQuizEditForm.reset();
    lessonQuizEditForm.classList.remove("was-validated");
    clearLessonQuizEditFormAlert();
    if (lessonQuizEditCourseTitle) {
      const courseName = currentCourse?.title || "";
      const lessonTitle = lesson?.title || "";
      lessonQuizEditCourseTitle.textContent = lessonTitle ? `${courseName}  ${lessonTitle}` : courseName;
    }
    if (lessonQuizEditItemCount) {
      lessonQuizEditItemCount.value = 0;
    }
    if (lessonQuizEditQuestions) {
      setLessonQuizEditQuestionCount(0);
    }
  }

  async function openLessonQuizEditModal(lessonId) {
    if (!lessonQuizEditModal || !lessonQuizEditForm) return;
    const target = courseLessons.find(item => Number(item.id) === Number(lessonId));
    if (!target) {
      showAlert("danger", "Lesson details are not available for quiz editing.");
      return;
    }
    const quiz = target.quiz;
    const questions = Array.isArray(quiz?.questions) ? quiz.questions : [];
    if (!questions.length) {
      showAlert("info", "This lesson does not have a quiz yet.");
      return;
    }

    editingLessonId = Number(lessonId);
    resetLessonQuizEditForm(target);

    const count = questions.length;
    if (lessonQuizEditItemCount) {
      lessonQuizEditItemCount.value = count;
    }
    setLessonQuizEditQuestionCount(count);

    if (lessonQuizEditQuestions && count) {
      const blocks = Array.from(lessonQuizEditQuestions.querySelectorAll("[data-lesson-quiz-question]"));
      questions.forEach((question, index) => {
        const block = blocks[index];
        if (!block) return;

        const promptField = block.querySelector("[data-field='prompt']");
        const optionInputs = Array.from(block.querySelectorAll("[data-field='option']"));
        const answerSelect = block.querySelector("[data-field='answer']");
        const explanationField = block.querySelector("[data-field='explanation']");

        if (promptField) {
          promptField.value = question.prompt || "";
        }

        if (Array.isArray(question.options)) {
          optionInputs.forEach(input => {
            const key = input.dataset.option;
            const match = question.options.find(option => option.value === key);
            if (match) {
              input.value = match.label || "";
            }
          });
        }

        if (answerSelect && question.answer) {
          answerSelect.value = question.answer;
        }

        if (explanationField) {
          explanationField.value = question.explanation || "";
        }
      });
    }

    lessonQuizEditModal.show();
  }

  async function handleLessonQuizEditSubmit(event) {
    if (!lessonQuizEditForm) return;
    event.preventDefault();
    event.stopPropagation();

    lessonQuizEditForm.classList.add("was-validated");

    if (!lessonQuizEditForm.checkValidity()) {
      showLessonQuizEditFormAlert("danger", "Please complete all required fields.");
      return;
    }

    if (!supabaseClient) {
      showLessonQuizEditFormAlert("danger", "Database connection is unavailable. Please refresh the page.");
      return;
    }

    if (!currentCourse || !Number.isFinite(editingLessonId)) {
      showLessonQuizEditFormAlert("danger", "Lesson details are not available for quiz editing.");
      return;
    }

    const itemCountRaw = Number.parseInt(lessonQuizEditItemCount?.value, 10);
    const itemCount = Number.isFinite(itemCountRaw) ? itemCountRaw : 0;
    if (itemCount <= 0) {
      showLessonQuizEditFormAlert("danger", "Set the number of items before saving.");
      return;
    }

    const questions = collectLessonQuizEditQuestions();
    if (questions.length !== itemCount) {
      setLessonQuizEditQuestionCount(itemCount);
      showLessonQuizEditFormAlert("danger", "Question count did not match the number of items. Please verify and try again.");
      return;
    }

    const hasMissingFields = questions.some(question => {
      if (!question.prompt || !question.answer) return true;
      if (!Array.isArray(question.options) || !question.options.length) return true;
      return question.options.some(option => !option.label);
    });

    if (hasMissingFields) {
      showLessonQuizEditFormAlert("danger", "Complete all question prompts, options, and answers.");
      return;
    }

    try {
      if (lessonQuizEditSaveButton) {
        lessonQuizEditSaveButton.disabled = true;
      }
      showLessonQuizEditFormAlert("info", "Saving quiz3");

      const { data: existingQuestions, error: fetchError } = await supabaseClient
        .from("quiz_questions")
        .select("id")
        .eq("lesson_id", editingLessonId);

      if (fetchError) {
        throw fetchError;
      }

      if (Array.isArray(existingQuestions) && existingQuestions.length) {
        const questionIds = existingQuestions.map(row => row.id);

        const { error: optionsError } = await supabaseClient
          .from("quiz_options")
          .delete()
          .in("question_id", questionIds);
        if (optionsError) {
          throw optionsError;
        }

        const { error: deleteQuestionsError } = await supabaseClient
          .from("quiz_questions")
          .delete()
          .in("id", questionIds);
        if (deleteQuestionsError) {
          throw deleteQuestionsError;
        }
      }

      let nextQuestionId = await getNextSupabaseId("quiz_questions");
      let nextOptionId = await getNextSupabaseId("quiz_options");

      const questionRows = questions.map((question, index) => {
        const row = {
          lesson_id: editingLessonId,
          prompt: question.prompt,
          answer: question.answer,
          explanation: question.explanation || null,
          sort_order: index + 1
        };
        if (Number.isFinite(nextQuestionId)) {
          row.id = nextQuestionId;
          nextQuestionId += 1;
        }
        return row;
      });

      let insertedQuestions = [];
      if (questionRows.length) {
        const { data: inserted, error: insertError } = await supabaseClient
          .from("quiz_questions")
          .insert(questionRows)
          .select("id");

        if (insertError) {
          throw insertError;
        }

        insertedQuestions = Array.isArray(inserted) ? inserted : [];
      }

      if (insertedQuestions.length) {
        const optionRows = [];
        insertedQuestions.forEach((questionRow, index) => {
          const source = questions[index];
          if (!source) return;
          source.options.forEach(option => {
            const payload = {
              question_id: questionRow.id,
              value: option.value,
              label: option.label
            };
            if (Number.isFinite(nextOptionId)) {
              payload.id = nextOptionId;
              nextOptionId += 1;
            }
            optionRows.push(payload);
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

      showLessonQuizEditFormAlert("success", "Lesson quiz updated successfully.");
      lessonQuizEditModal.hide();
      await loadCourse(currentCourseId);
      showAlert("success", "Lesson quiz updated successfully.");
    } catch (error) {
      console.error("Failed to update lesson quiz", error);
      showLessonQuizEditFormAlert("danger", error.message || "Unable to update lesson quiz. Please try again.");
    } finally {
      if (lessonQuizEditSaveButton) {
        lessonQuizEditSaveButton.disabled = false;
      }
    }
  }

  function isPreTestLesson(lesson) {
    if (!lesson) return false;
    const moduleTitleNorm = String(lesson.module_title || "").toLowerCase();
    const titleNorm = String(lesson.title || "").toLowerCase();
    return (
      moduleTitleNorm.includes("pre-test") ||
      titleNorm.includes("pre-test") ||
      Number(lesson.module_sort_order) === 0
    );
  }

  async function openPreTestEditModal(lessonId) {
    const lesson = courseLessons.find(item => Number(item.id) === Number(lessonId));
    if (!lesson) {
      showAlert("danger", "Pre-test lesson details are not available.");
      return;
    }

    await ensurePreTestModal();
    if (!preTestModal || !preTestForm) {
      showAlert("danger", "Unable to open pre-test editor. Please refresh the page.");
      return;
    }

    resetPreTestForm(currentCourse);

    const quiz = lesson.quiz || {};
    const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
    const instructions = (quiz.intro && String(quiz.intro).trim()) || String(lesson.content || "");

    if (preTestCourseTitle) {
      preTestCourseTitle.textContent = currentCourse?.title || "";
    }
    if (preTestInstructions) {
      preTestInstructions.value = instructions;
    }

    const count = questions.length || 0;
    if (preTestItemCount) {
      preTestItemCount.value = count;
    }
    setPreTestQuestionCount(count);

    if (preTestQuestions && count) {
      const blocks = Array.from(preTestQuestions.querySelectorAll(".pretest-question"));
      questions.forEach((question, index) => {
        const block = blocks[index];
        if (!block) return;

        const promptField = block.querySelector("[data-field='prompt']");
        const optionInputs = Array.from(block.querySelectorAll("[data-field='option']"));
        const answerSelect = block.querySelector("[data-field='answer']");
        const explanationField = block.querySelector("[data-field='explanation']");

        if (promptField) {
          promptField.value = question.prompt || "";
        }

        if (Array.isArray(question.options)) {
          optionInputs.forEach(input => {
            const key = input.dataset.option;
            const match = question.options.find(option => option.value === key);
            if (match) {
              input.value = match.label || "";
            }
          });
        }

        if (answerSelect && question.answer) {
          answerSelect.value = question.answer;
        }

        if (explanationField) {
          explanationField.value = question.explanation || "";
        }
      });
    }

    preTestModal.show();
    if (preTestInstructions) {
      preTestInstructions.focus();
    }
  }

  function isPostTestLesson(lesson) {
    if (!lesson) return false;
    const moduleTitleNorm = String(lesson.module_title || "").toLowerCase();
    const titleNorm = String(lesson.title || "").toLowerCase();
    return (
      moduleTitleNorm.includes("post-test") ||
      moduleTitleNorm.includes("posttest") ||
      moduleTitleNorm.includes("final competency") ||
      titleNorm.includes("post-test") ||
      titleNorm.includes("posttest") ||
      titleNorm.includes("final competency") ||
      Number(lesson.module_sort_order) === 99
    );
  }

  async function openPostTestEditModal(lessonId) {
    const lesson = courseLessons.find(item => Number(item.id) === Number(lessonId));
    if (!lesson) {
      showAlert("danger", "Post-test lesson details are not available.");
      return;
    }

    await ensurePostTestModal();
    if (!postTestModal || !postTestForm) {
      showAlert("danger", "Unable to open post-test editor. Please refresh the page.");
      return;
    }

    resetPostTestForm(currentCourse);

    const quiz = lesson.quiz || {};
    const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
    const instructions = (quiz.intro && String(quiz.intro).trim()) || String(lesson.content || "");

    if (postTestCourseTitle) {
      postTestCourseTitle.textContent = currentCourse?.title || "";
    }
    if (postTestInstructions) {
      postTestInstructions.value = instructions;
    }

    const count = questions.length || 0;
    if (postTestItemCount) {
      postTestItemCount.value = count;
    }
    setPostTestQuestionCount(count);

    if (postTestQuestions && count) {
      const blocks = Array.from(postTestQuestions.querySelectorAll(".posttest-question"));
      questions.forEach((question, index) => {
        const block = blocks[index];
        if (!block) return;

        const promptField = block.querySelector("[data-field='prompt']");
        const optionInputs = Array.from(block.querySelectorAll("[data-field='option']"));
        const answerSelect = block.querySelector("[data-field='answer']");
        const explanationField = block.querySelector("[data-field='explanation']");

        if (promptField) {
          promptField.value = question.prompt || "";
        }

        if (Array.isArray(question.options)) {
          optionInputs.forEach(input => {
            const key = input.dataset.option;
            const match = question.options.find(option => option.value === key);
            if (match) {
              input.value = match.label || "";
            }
          });
        }

        if (answerSelect && question.answer) {
          answerSelect.value = question.answer;
        }

        if (explanationField) {
          explanationField.value = question.explanation || "";
        }
      });
    }

    const postTestElement = document.getElementById("postTestModal");
    const postTestTitle = postTestElement ? postTestElement.querySelector(".modal-title") : null;
    if (postTestTitle) {
      postTestTitle.textContent = "Edit Post-Test";
    }

    postTestModal.show();
    if (postTestInstructions) {
      postTestInstructions.focus();
    }
  }

  function openEditLessonModal(lessonId) {
    if (!editLessonModal || !editLessonForm) return;
    const target = courseLessons.find(item => Number(item.id) === Number(lessonId));
    if (!target) {
      showAlert("danger", "Lesson details are not available for editing.");
      return;
    }

    if (editLessonModalTitle) {
      let heading = "Edit Lesson";
      const moduleTitleNorm = String(target.module_title || "").toLowerCase();
      if (moduleTitleNorm.includes("pre-test") || Number(target.module_sort_order) === 0) {
        heading = "Edit Pre-Test";
      } else if (moduleTitleNorm.includes("post-test") || Number(target.module_sort_order) === 99) {
        heading = "Edit Post-Test";
      }
      editLessonModalTitle.textContent = heading;
    }

    if (editLessonQuizButton) {
      const hasQuiz = target.quiz && Array.isArray(target.quiz.questions) && target.quiz.questions.length > 0;
      editLessonQuizButton.classList.toggle("d-none", !hasQuiz);
      editLessonQuizButton.disabled = !hasQuiz;
    }

    editingLessonId = Number(lessonId);
    clearEditLessonFormAlert();
    editLessonForm.classList.remove("was-validated");

    if (editLessonCourseTitle) {
      editLessonCourseTitle.textContent = currentCourse?.title || "";
    }
    if (editLessonTitleInput) {
      editLessonTitleInput.value = target.title || "";
    }
    if (editLessonOverviewInput) {
      editLessonOverviewInput.value = target.lesson_index || "";
    }
    if (editLessonContentInput) {
      editLessonContentInput.value = target.content || "";
    }

    editLessonModal.show();
  }

  async function handleEditLessonSubmit(event) {
    if (!editLessonForm) return;
    event.preventDefault();
    event.stopPropagation();

    editLessonForm.classList.add("was-validated");

    if (!editLessonForm.checkValidity()) {
      showEditLessonFormAlert("danger", "Please complete the required fields.");
      return;
    }

    if (!supabaseClient) {
      showEditLessonFormAlert("danger", "Database connection is unavailable. Please refresh the page.");
      return;
    }

    if (!currentCourse || !Number.isFinite(editingLessonId)) {
      showEditLessonFormAlert("danger", "Lesson details are not available for editing.");
      return;
    }

    const title = editLessonTitleInput?.value.trim() || "";
    const overview = editLessonOverviewInput?.value.trim() || "";
    const content = editLessonContentInput?.value.trim() || "";

    if (!title || !content) {
      showEditLessonFormAlert("danger", "Lesson title and content are required.");
      return;
    }

    const payload = {
      title,
      lesson_index: overview || null,
      content
    };

    try {
      if (editLessonSaveButton) {
        editLessonSaveButton.disabled = true;
      }
      showEditLessonFormAlert("info", "Saving changes…");

      const { error } = await supabaseClient
        .from("lessons")
        .update(payload)
        .eq("id", editingLessonId);

      if (error) {
        throw error;
      }

      showEditLessonFormAlert("success", "Lesson updated successfully.");
      editLessonModal.hide();
      await loadCourse(currentCourseId);
      showAlert("success", "Lesson updated successfully.");
    } catch (error) {
      console.error("Failed to update lesson", error);
      showEditLessonFormAlert("danger", error.message || "Unable to update lesson. Please try again.");
    } finally {
      if (editLessonSaveButton) {
        editLessonSaveButton.disabled = false;
      }
    }
  }

  let moduleLessonsModal = null;
  let moduleLessonsForm = null;
  let moduleLessonsCourseTitle = null;
  let moduleLessonsTitle = null;
  let moduleLessonsDescription = null;
  let moduleLessonsCount = null;
  let moduleLessonsBlocks = null;
  let moduleLessonsFormAlert = null;
  let moduleLessonsSaveButton = null;

  function injectModuleLessonsMarkup() {
    const existingModal = document.getElementById("moduleLessonsModal");
    if (existingModal) {
      existingModal.remove();
    }
    const target = courseManageModals || document.body;
    if (!target) return;
    target.insertAdjacentHTML("beforeend", moduleLessonsModalMarkup);
  }

  async function removeExistingPostTestLessons(courseId) {
    const client = window.supabaseClient;
    if (!client) {
      throw new Error("Database connection is unavailable. Please refresh the page.");
    }

    const { data: existingLessons, error: lessonsError } = await client
      .from("lessons")
      .select("id")
      .eq("course_id", courseId)
      .eq("module_sort_order", 99);

    if (lessonsError) {
      throw lessonsError;
    }

    if (!Array.isArray(existingLessons) || !existingLessons.length) {
      return;
    }

    const lessonIds = existingLessons.map(lesson => lesson.id);

    const { data: existingQuestions, error: questionsError } = await client
      .from("quiz_questions")
      .select("id")
      .in("lesson_id", lessonIds);

    if (questionsError) {
      throw questionsError;
    }

    if (Array.isArray(existingQuestions) && existingQuestions.length) {
      const questionIds = existingQuestions.map(question => question.id);

      const { error: optionsError } = await client
        .from("quiz_options")
        .delete()
        .in("question_id", questionIds);
      if (optionsError) {
        throw optionsError;
      }

      const { error: deleteQuestionsError } = await client
        .from("quiz_questions")
        .delete()
        .in("id", questionIds);
      if (deleteQuestionsError) {
        throw deleteQuestionsError;
      }
    }

    const { error: deleteLessonsError } = await client
      .from("lessons")
      .delete()
      .in("id", lessonIds);
    if (deleteLessonsError) {
      throw deleteLessonsError;
    }
  }

  function handleModuleLessonsQuizActions(event) {
    const addTrigger = event.target.closest("[data-role='lesson-add-quiz']");
    if (addTrigger) {
      event.preventDefault();
      const block = addTrigger.closest(".lesson-block");
      if (!block) return;
      const quizContainer = block.querySelector("[data-role='lesson-quiz-container']");
      if (!quizContainer) return;
      quizContainer.classList.remove("d-none");
      addTrigger.classList.add("d-none");
      const countInput = quizContainer.querySelector("[data-role='lesson-quiz-count']");
      const targetCount = Number.parseInt(countInput?.value, 10) || 1;
      setLessonQuizQuestionCount(quizContainer, targetCount);
      updateLessonQuizQuestionLabels(quizContainer);
      toggleQuizFieldRequirements(quizContainer, true);
      return;
    }

    const removeTrigger = event.target.closest("[data-role='lesson-remove-quiz']");
    if (removeTrigger) {
      event.preventDefault();
      const block = removeTrigger.closest(".lesson-block");
      if (!block) return;
      const quizContainer = block.querySelector("[data-role='lesson-quiz-container']");
      const addButton = block.querySelector("[data-role='lesson-add-quiz']");
      if (!quizContainer || !addButton) return;
      quizContainer.classList.add("d-none");
      addButton.classList.remove("d-none");
      const countInput = quizContainer.querySelector("[data-role='lesson-quiz-count']");
      if (countInput) {
        countInput.value = 1;
      }
      setLessonQuizQuestionCount(quizContainer, 1);
      quizContainer.querySelectorAll("input, textarea, select").forEach(input => {
        if (input.matches("[data-role='lesson-quiz-count']")) return;
        if (input.tagName === "SELECT") {
          input.value = "a";
          return;
        }
        input.value = "";
      });
      toggleQuizFieldRequirements(quizContainer, false);
    }
  }

  function handleModuleLessonsQuizInputs(event) {
    const countInput = event.target.closest("[data-role='lesson-quiz-count']");
    if (countInput) {
      const quizContainer = countInput.closest("[data-role='lesson-quiz-container']");
      if (!quizContainer) return;
      const targetCount = Math.max(1, Number.parseInt(countInput.value, 10) || 1);
      countInput.value = targetCount;
      setLessonQuizQuestionCount(quizContainer, targetCount);
      updateLessonQuizQuestionLabels(quizContainer);
      toggleQuizFieldRequirements(quizContainer, true);
    }
  }

  function showModuleLessonsAlert(type, message) {
    if (!moduleLessonsFormAlert) return;
    moduleLessonsFormAlert.className = `alert alert-${type}`;
    moduleLessonsFormAlert.textContent = message;
  }

  function clearModuleLessonsAlert() {
    if (!moduleLessonsFormAlert) return;
    moduleLessonsFormAlert.className = "alert d-none";
    moduleLessonsFormAlert.textContent = "";
  }

  function setModuleLessonsCount(target) {
    if (!moduleLessonsBlocks) return;
    const parsed = Math.max(0, Number(target) || 0);
    const template = document.getElementById("moduleLessonTemplate");
    if (!template) return;

    const existingBlocks = Array.from(moduleLessonsBlocks.querySelectorAll(".lesson-block"));
    if (existingBlocks.length > parsed) {
      existingBlocks.slice(parsed).forEach(block => block.remove());
    }

    while (moduleLessonsBlocks.querySelectorAll(".lesson-block").length < parsed) {
      const fragment = template.content.cloneNode(true);
      moduleLessonsBlocks.appendChild(fragment);
    }

    const blocks = Array.from(moduleLessonsBlocks.querySelectorAll(".lesson-block"));
    blocks.forEach((block, index) => {
      const counter = block.querySelector("[data-role='lesson-number']");
      if (counter) {
        counter.textContent = index + 1;
      }

      const removeButton = block.querySelector("[data-role='remove-lesson']");
      if (removeButton) {
        removeButton.hidden = blocks.length <= 1;
        removeButton.onclick = () => {
          block.remove();
          if (moduleLessonsCount) {
            const nextValue = Math.max(0, Number.parseInt(moduleLessonsCount.value, 10) - 1 || 0);
            moduleLessonsCount.value = nextValue;
            setModuleLessonsCount(nextValue);
          }
        };
      }
    });
  }

  function toggleQuizFieldRequirements(container, enabled) {
    if (!container) return;
    container.querySelectorAll("[data-role='quiz-question']").forEach(field => {
      field.required = enabled;
    });
    container.querySelectorAll("[data-role='quiz-option']").forEach(input => {
      input.required = enabled;
    });
    container.querySelectorAll("[data-role='quiz-answer']").forEach(select => {
      select.required = enabled;
    });
    container.querySelectorAll("[data-role='quiz-explanation']").forEach(field => {
      field.required = false;
    });
    const countInput = container.querySelector("[data-role='lesson-quiz-count']");
    if (countInput) {
      countInput.required = enabled;
    }
  }

  function setLessonQuizQuestionCount(container, target) {
    if (!container) return;
    const holder = container.querySelector("[data-role='lesson-quiz-questions']");
    const template = container.querySelector("template[data-role='lesson-quiz-question-template']");
    if (!holder || !template) return;

    const desired = Math.max(1, Number(target) || 1);
    const existing = Array.from(holder.querySelectorAll("[data-role='lesson-quiz-question']"));
    if (existing.length > desired) {
      existing.slice(desired).forEach(block => block.remove());
    }

    while (holder.querySelectorAll("[data-role='lesson-quiz-question']").length < desired) {
      const fragment = template.content.cloneNode(true);
      holder.appendChild(fragment);
    }

    updateLessonQuizQuestionLabels(container);
  }

  function updateLessonQuizQuestionLabels(container) {
    if (!container) return;
    const blocks = Array.from(container.querySelectorAll("[data-role='lesson-quiz-question']"));
    blocks.forEach((block, index) => {
      const label = block.querySelector("[data-role='quiz-item-number']");
      if (label) {
        label.textContent = index + 1;
      }
    });
  }

  function resetModuleLessonsForm(course = currentCourse) {
    if (!moduleLessonsForm) return;
    moduleLessonsForm.reset();
    moduleLessonsForm.classList.remove("was-validated");
    clearModuleLessonsAlert();

    const targetCourse = course ?? currentCourse;
    if (moduleLessonsForm) {
      moduleLessonsForm.dataset.courseId = targetCourse?.id ? String(targetCourse.id) : "";
    }
    if (moduleLessonsCourseTitle) {
      moduleLessonsCourseTitle.textContent = targetCourse?.title || "";
    }
    if (moduleLessonsTitle) {
      moduleLessonsTitle.value = "";
    }
    if (moduleLessonsDescription) {
      moduleLessonsDescription.value = "";
    }

    const defaultCount = 0;
    if (moduleLessonsCount) {
      moduleLessonsCount.value = defaultCount;
    }
    setModuleLessonsCount(defaultCount);
  }

  async function ensureModuleLessonsModal() {
    if (moduleLessonsModal && moduleLessonsForm) return moduleLessonsModal;
    if (moduleLessonsModal) {
      return moduleLessonsModal;
    }

    let modalElement = document.getElementById("moduleLessonsModal");

    if (!modalElement && courseManageModals) {
      try {
        const response = await fetch("modals/add-modules-and-lessons.html", { cache: "no-store" });
        const markup = await response.text();
        courseManageModals.insertAdjacentHTML("beforeend", markup);
      } catch (error) {
        console.warn("Failed to load module and lessons modal via fetch; falling back to inline template", error);
        injectModuleLessonsMarkup();
      }
      modalElement = document.getElementById("moduleLessonsModal");
    }

    if (!modalElement) {
      injectModuleLessonsMarkup();
      modalElement = document.getElementById("moduleLessonsModal");
    }

    if (!modalElement) {
      showAlert("danger", "Module form markup is unavailable. Please refresh the page.");
      return null;
    }

    moduleLessonsModal = new bootstrap.Modal(modalElement);
    moduleLessonsForm = document.getElementById("moduleLessonsForm");
    moduleLessonsCourseTitle = document.getElementById("moduleLessonsCourseTitle");
    moduleLessonsTitle = document.getElementById("moduleLessonsTitle");
    moduleLessonsDescription = document.getElementById("moduleLessonsDescription");
    moduleLessonsCount = document.getElementById("moduleLessonsCount");
    moduleLessonsBlocks = document.getElementById(moduleLessonsContainerId);
    moduleLessonsFormAlert = document.getElementById("moduleLessonsFormAlert");
    moduleLessonsSaveButton = document.getElementById("moduleLessonsSaveButton");

    if (moduleLessonsCount) {
      const syncCount = () => {
        const parsed = Math.max(0, Number.parseInt(moduleLessonsCount.value, 10) || 0);
        moduleLessonsCount.value = parsed;
        setModuleLessonsCount(parsed);
      };
      moduleLessonsCount.addEventListener("input", syncCount);
      moduleLessonsCount.addEventListener("change", syncCount);
      syncCount();
    }

    if (moduleLessonsBlocks && !moduleLessonsBlocks.dataset.quizDelegation) {
      moduleLessonsBlocks.addEventListener("click", handleModuleLessonsQuizActions);
      moduleLessonsBlocks.addEventListener("input", handleModuleLessonsQuizInputs);
      moduleLessonsBlocks.addEventListener("change", handleModuleLessonsQuizInputs);
      moduleLessonsBlocks.dataset.quizDelegation = "1";
    }

    modalElement.addEventListener("hidden.bs.modal", () => {
      resetModuleLessonsForm();
    });

    if (moduleLessonsForm) {
      moduleLessonsForm.addEventListener("submit", handleModuleLessonsSubmit);
    }

    return moduleLessonsModal;
  }

  function collectModuleLessonsPayload() {
    if (!moduleLessonsBlocks) return [];
    const blocks = Array.from(moduleLessonsBlocks.querySelectorAll(".lesson-block"));
    return blocks.map(block => {
      const title = block.querySelector("[data-role='lesson-title']")?.value.trim() || "";
      const index = block.querySelector("[data-role='lesson-index']")?.value.trim() || "";
      const content = block.querySelector("[data-role='lesson-content']")?.value.trim() || "";
      const quizContainer = block.querySelector("[data-role='lesson-quiz-container']");

      let quiz = null;
      if (quizContainer && !quizContainer.classList.contains("d-none")) {
        const questionBlocks = Array.from(quizContainer.querySelectorAll("[data-role='lesson-quiz-question']"));
        const questions = questionBlocks.map(blockNode => {
          const prompt = blockNode.querySelector("[data-role='quiz-question']")?.value.trim() || "";
          const options = Array.from(blockNode.querySelectorAll("[data-role='quiz-option']")).map(input => ({
            value: input.dataset.option,
            label: input.value.trim()
          }));
          const answer = blockNode.querySelector("[data-role='quiz-answer']")?.value || "";
          const explanation = blockNode.querySelector("[data-role='quiz-explanation']")?.value.trim() || "";
          return { prompt, options, answer, explanation };
        });

        quiz = {
          questions
        };
      }

      return { title, lesson_index: index || null, content, quiz };
    });
  }

  async function handleModuleLessonsSubmit(event) {
    event.preventDefault();
    if (!moduleLessonsForm) return;

    moduleLessonsForm.classList.add("was-validated");

    if (!moduleLessonsForm.checkValidity()) {
      showModuleLessonsAlert("danger", "Complete all required fields before saving.");
      return;
    }

    if (!currentCourse) {
      showModuleLessonsAlert("danger", "Course details are unavailable. Please reload the page.");
      return;
    }

    const supabaseClient = window.supabaseClient;
    if (!supabaseClient) {
      showModuleLessonsAlert("danger", "Database connection is unavailable. Please refresh the page.");
      return;
    }

    const moduleTitleValue = moduleLessonsTitle?.value.trim() || "";
    const moduleDescriptionValue = moduleLessonsDescription?.value.trim() || "";
    const lessonCountRaw = Number.parseInt(moduleLessonsCount?.value, 10);
    const lessonCount = Number.isFinite(lessonCountRaw) ? Math.max(0, lessonCountRaw) : 0;

    if (lessonCount <= 0) {
      showModuleLessonsAlert("danger", "Specify how many lessons this module will contain.");
      return;
    }

    const lessons = collectModuleLessonsPayload();
    if (lessons.length !== lessonCount) {
      setModuleLessonsCount(lessonCount);
      showModuleLessonsAlert("danger", "Lesson details did not match the specified count. Please review before saving.");
      return;
    }

    const trimmedLessons = lessons.map(item => ({
      title: item.title.trim(),
      lesson_index: item.lesson_index?.trim() || null,
      content: item.content.trim(),
      quiz: item.quiz
        ? {
            questions: Array.isArray(item.quiz.questions)
              ? item.quiz.questions.map(question => ({
                  prompt: question.prompt.trim(),
                  options: question.options.map(option => ({
                    value: option.value,
                    label: option.label.trim()
                  })),
                  answer: question.answer,
                  explanation: question.explanation?.trim() || ""
                }))
              : []
          }
        : null
    }));

    const hasEmptyLesson = trimmedLessons.some(lesson => !lesson.title || !lesson.content);
    if (hasEmptyLesson) {
      showModuleLessonsAlert("danger", "Each lesson needs a title and discussion content.");
      return;
    }

    const quizWithMissingFields = trimmedLessons.some(lesson => {
      if (!lesson.quiz) return false;
      if (!lesson.quiz.questions.length) return true;
      return lesson.quiz.questions.some(question => {
        if (!question.prompt || !question.answer) return true;
        if (!Array.isArray(question.options) || question.options.length === 0) return true;
        return question.options.some(option => !option.label);
      });
    });

    if (quizWithMissingFields) {
      showModuleLessonsAlert("danger", "Complete all quiz question and option fields.");
      return;
    }

    const relevantLessons = Array.isArray(courseLessons)
      ? courseLessons.filter(item => Number(item.course_id) === Number(currentCourse.id))
      : [];

    const usesNumericLessonIds = Array.isArray(courseLessons)
      ? courseLessons.some(item => Number.isFinite(Number(item?.id)))
      : false;

    let nextLessonIdCounter = null;
    let nextQuestionIdCounter = null;
    let nextOptionIdCounter = null;
    if (usesNumericLessonIds) {
      try {
        nextLessonIdCounter = await getNextSupabaseId("lessons");
      } catch (error) {
        console.error("Unable to determine next lesson id", error);
        showModuleLessonsAlert("danger", "Unable to determine the next lesson id. Please try again later.");
        return;
      }
    }
    try {
      nextQuestionIdCounter = await getNextSupabaseId("quiz_questions");
      nextOptionIdCounter = await getNextSupabaseId("quiz_options");
    } catch (error) {
      console.error("Unable to determine next quiz ids", error);
      showModuleLessonsAlert("danger", "Unable to prepare quiz identifiers. Please try again later.");
      return;
    }
    const reservedOrders = new Set([0, 99]);
    const usedOrders = relevantLessons
      .map(item => Number(item.module_sort_order))
      .filter(order => Number.isFinite(order) && !reservedOrders.has(order));
    const moduleSortOrder = usedOrders.length ? Math.max(...usedOrders) + 1 : 1;

    const timestamp = new Date().toISOString();
    const moduleTitleForSave = moduleTitleValue || `Module ${moduleSortOrder}`;
    const moduleDescriptionForSave = moduleDescriptionValue || null;

    const lessonRows = trimmedLessons.map((lesson, index) => {
      const row = {
        course_id: currentCourse.id,
        title: lesson.title,
        content: lesson.content,
        module_title: moduleTitleForSave,
        module_description: moduleDescriptionForSave,
        module_sort_order: moduleSortOrder,
        lesson_index: lesson.lesson_index || null,
        sort_order: index + 1,
        created_at: timestamp
      };

      if (usesNumericLessonIds && Number.isFinite(nextLessonIdCounter)) {
        row.id = nextLessonIdCounter;
        nextLessonIdCounter += 1;
      }

      return row;
    });

    if (moduleLessonsSaveButton) {
      moduleLessonsSaveButton.disabled = true;
    }
    showModuleLessonsAlert("info", "Saving module…");

    const insertedLessonIds = [];
    const insertedQuestionIds = [];

    try {
      const { data: insertedLessons, error: lessonsError } = await supabaseClient
        .from("lessons")
        .insert(lessonRows)
        .select("id");

      if (lessonsError) {
        throw lessonsError;
      }

      if (!Array.isArray(insertedLessons) || insertedLessons.length !== lessonRows.length) {
        throw new Error("Unexpected response while saving lessons. Please try again.");
      }

      insertedLessons.forEach(lesson => {
        if (lesson?.id) {
          insertedLessonIds.push(lesson.id);
        }
      });

      for (let index = 0; index < trimmedLessons.length; index += 1) {
        const sourceLesson = trimmedLessons[index];
        const insertedLessonId = insertedLessons[index]?.id;
        if (!insertedLessonId || !sourceLesson.quiz || !sourceLesson.quiz.questions.length) continue;

        const questionPayloads = sourceLesson.quiz.questions.map((question, questionIndex) => ({
          lesson_id: insertedLessonId,
          prompt: question.prompt,
          answer: question.answer,
          explanation: question.explanation || null,
          sort_order: questionIndex + 1
        }));

        const { data: insertedQuestions, error: questionError } = await supabaseClient
          .from("quiz_questions")
          .insert(
            questionPayloads.map(payload => {
              if (Number.isFinite(nextQuestionIdCounter)) {
                const withId = { ...payload, id: nextQuestionIdCounter };
                nextQuestionIdCounter += 1;
                return withId;
              }
              return payload;
            })
          )
          .select("id");

        if (questionError) {
          throw questionError;
        }

        if (!Array.isArray(insertedQuestions) || insertedQuestions.length !== questionPayloads.length) {
          throw new Error("Quiz questions saved with unexpected response.");
        }

        insertedQuestions.forEach(question => {
          if (question?.id) {
            insertedQuestionIds.push(question.id);
          }
        });

        for (let questionIndex = 0; questionIndex < insertedQuestions.length; questionIndex += 1) {
          const questionRecord = insertedQuestions[questionIndex];
          const sourceQuestion = sourceLesson.quiz.questions[questionIndex];
          const questionId = questionRecord?.id;
          if (!questionId || !sourceQuestion) continue;

          const optionRows = sourceQuestion.options.map(option => {
            const payload = {
              question_id: questionId,
              value: option.value,
              label: option.label
            };

            if (Number.isFinite(nextOptionIdCounter)) {
              payload.id = nextOptionIdCounter;
              nextOptionIdCounter += 1;
            }

            return payload;
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

      showModuleLessonsAlert("success", "Module saved successfully.");

      try {
        await loadCourse(currentCourse.id);
      } catch (refreshError) {
        console.warn("Module saved but course view failed to refresh", refreshError);
      }

      if (moduleLessonsModal) {
        moduleLessonsModal.hide();
      }
    } catch (error) {
      console.error("Failed to save module and lessons", error);
      const message = error?.message || "Unable to save module. Please try again.";
      showModuleLessonsAlert("danger", message);

      if (insertedQuestionIds.length) {
        try {
          await supabaseClient.from("quiz_options").delete().in("question_id", insertedQuestionIds);
        } catch (cleanupError) {
          console.warn("Cleanup quiz options failed", cleanupError);
        }
        try {
          await supabaseClient.from("quiz_questions").delete().in("id", insertedQuestionIds);
        } catch (cleanupError) {
          console.warn("Cleanup quiz questions failed", cleanupError);
        }
      }

      if (insertedLessonIds.length) {
        try {
          await supabaseClient.from("lessons").delete().in("id", insertedLessonIds);
        } catch (cleanupError) {
          console.warn("Cleanup lessons failed", cleanupError);
        }
      }
    } finally {
      if (moduleLessonsSaveButton) {
        moduleLessonsSaveButton.disabled = false;
      }
    }
  }

  async function openModuleLessonsModalForCourse(course) {
    if (!course) return;
    const modal = await ensureModuleLessonsModal();
    if (!modal || !moduleLessonsForm) return;

    resetModuleLessonsForm(course);
    if (moduleLessonsTitle) {
      moduleLessonsTitle.focus();
    }
    modal.show();
  }

  function openLessonModalForCourse(course, presetKind = "lesson") {
    if (!course) return;
    if (window.courseManager && typeof window.courseManager.openLessonModal === "function") {
      window.courseManager.openLessonModal(course, presetKind);
      return;
    }

    try {
      window.sessionStorage.setItem("dbs_manage_course", JSON.stringify({ course, presetKind }));
    } catch (error) {
      console.error("Unable to cache course for lesson modal", error);
    }

    window.location.href = "courses.html?openLesson=1";
  }

  const completionModalElement = document.getElementById("courseCompletionModal");
  const completionModal = completionModalElement ? new bootstrap.Modal(completionModalElement) : null;
  const completionMessage = document.getElementById("courseCompletionMessage");
  const completionSummary = document.getElementById("courseCompletionSummary");
  const completionStatusLabel = document.getElementById("courseCompletionStatus");
  const completionAverageLabel = document.getElementById("courseCompletionAverage");
  const completionActions = document.getElementById("courseCompletionActions");
  const retryPreTestBtn = document.getElementById("retryPreTestBtn");
  const retryPostTestBtn = document.getElementById("retryPostTestBtn");
  const completionViewBadgeBtn = document.getElementById("courseCompletionViewBadge");
  const completionViewCertificateBtn = document.getElementById("courseCompletionViewCertificate");
  const badgeModalElement = document.getElementById("badgeModal");
  const badgeModal = badgeModalElement ? new bootstrap.Modal(badgeModalElement) : null;
  const badgeModalImage = document.getElementById("badgeModalImage");
  const badgeModalTitle = document.getElementById("badgeModalTitle");
  const badgeModalDescription = document.getElementById("badgeModalDescription");
  const badgeModalCourseTitle = document.getElementById("badgeModalCourseTitle");
  const badgeModalDate = document.getElementById("badgeModalDate");
  const badgeVerifyLink = document.getElementById("badgeVerifyLink");
  const certificateModalElement = document.getElementById("certificateModal");
  const certificateModal = certificateModalElement ? new bootstrap.Modal(certificateModalElement) : null;
  const certificateModalStudentName = document.getElementById("certificateModalStudentName");
  const certificateModalCourseTitle = document.getElementById("certificateModalCourseTitle");
  const certificateModalScores = document.getElementById("certificateModalScores");
  const certificateModalDate = document.getElementById("certificateModalDate");
  const certificateModalResult = document.getElementById("certificateModalResult");

  const supabaseClient = window.supabaseClient;
  const endpoints = {
    courses: "courses.php",
    lessons: "lessons.php",
    users: "users.php",
    enrollments: "enrollments.php",
    badges: "badges.php"
  };

  let currentCourse = null;
  let courseLessons = [];
  const providerName = "ISU-Roxas DBS Learning Team";
  let instructors = [];
  let enrollments = [];
  let activeLessonId = null;
  let currentCourseId = null;
  let isPublishingCourse = false;
  let visitedLessonIds = new Set();
  let courseModules = [];
  let lessonScrollMaxProgress = 0;
  let completionNoticeShown = false;
  let completionSyncInProgress = false;
  let insufficientAverageNoticeShown = false;
  let courseBadge = null;
  let lastCompletionSummary = null;
  let lastCompletionResultLabel = null;
  let lastCompletionAverage = null;
  let lastCompletionIssuedDate = null;
  let lastIssuedBadgeId = null;
  let preTestModal = null;
  let preTestModalReadyPromise = null;
  let preTestForm = null;
  let preTestCourseTitle = null;
  let preTestInstructions = null;
  let preTestItemCount = null;
  let preTestQuestions = null;
  let preTestFormAlert = null;
  let preTestSaveButton = null;
  let postTestModal = null;
  let postTestModalReadyPromise = null;
  let postTestForm = null;
  let postTestCourseTitle = null;
  let postTestInstructions = null;
  let postTestItemCount = null;
  let postTestQuestions = null;
  let postTestFormAlert = null;
  let postTestSaveButton = null;

  let editingLessonId = null;

  function updatePublishButton(course, viewerRole) {
    if (!publishCourseButton) return;

    const isInstructorRole = viewerRole === "instructor" || viewerRole === "admin";
    if (!course || !isInstructorRole) {
      publishCourseButton.classList.add("d-none");
      publishCourseButton.disabled = false;
      publishCourseButton.textContent = "Publish";
      return;
    }

    const isPublished = course.status === "published";

    publishCourseButton.classList.remove("d-none");
    publishCourseButton.disabled = isPublishingCourse || isPublished;
    publishCourseButton.style.pointerEvents = isPublished ? "none" : "";
    publishCourseButton.textContent = isPublishingCourse
      ? "Publishing…"
      : isPublished
        ? "Published"
        : "Publish";
    publishCourseButton.classList.toggle("btn-success", isPublished);
    publishCourseButton.classList.toggle("btn-outline-success", !isPublished);
  }

  async function publishCourse() {
    if (!supabaseClient) {
      showAlert("danger", "Database connection is unavailable. Please refresh the page.");
      return;
    }

    if (!currentCourse || !Number.isFinite(Number(currentCourse?.id))) {
      showAlert("danger", "Course details are not available yet.");
      return;
    }

    if (isPublishingCourse) return;
    isPublishingCourse = true;
    const activeUser = getActiveUser();
    const role = getUserRole(activeUser);
    updatePublishButton(currentCourse, role);

    try {
      const payload = { status: "published" };

      const { error } = await supabaseClient
        .from("courses")
        .update(payload)
        .eq("id", currentCourse.id);

      if (error) {
        throw error;
      }

      currentCourse = Object.assign({}, currentCourse, payload);
      updatePublishButton(currentCourse, role);
      showAlert("success", "Course has been published successfully.");

      // Reload course details so that manage actions and edit/delete icons
      // are fully refreshed for the published state.
      if (currentCourse?.id) {
        await loadCourse(currentCourse.id);
      }
    } catch (error) {
      console.error("Failed to publish course", error);
      showAlert("danger", error.message || "Unable to publish the course. Please try again.");
      updatePublishButton(currentCourse, getUserRole(getActiveUser()));
    } finally {
      isPublishingCourse = false;
      updatePublishButton(currentCourse, getUserRole(getActiveUser()));
    }
  }

  const LESSON_SCROLL_COMPLETE_THRESHOLD = 92;
  const QUIZ_PASS_SCORE = 100;
  const MINIMUM_COURSE_AVERAGE = 75;

  function showPostTestFormAlert(type, message) {
    if (!postTestFormAlert) return;
    postTestFormAlert.className = `alert alert-${type}`;
    postTestFormAlert.textContent = message;
  }

  function clearPostTestFormAlert() {
    if (!postTestFormAlert) return;
    postTestFormAlert.className = "alert d-none";
    postTestFormAlert.textContent = "";
  }

  function showModuleLessonsAlert(type, message) {
    if (!moduleLessonsFormAlert) return;
    moduleLessonsFormAlert.className = `alert alert-${type}`;
    moduleLessonsFormAlert.textContent = message;
  }

  function clearModuleLessonsAlert() {
    if (!moduleLessonsFormAlert) return;
    moduleLessonsFormAlert.className = "alert d-none";
    moduleLessonsFormAlert.textContent = "";
  }

  function setModuleLessonsCount(target) {
    if (!moduleLessonsBlocks) return;
    const parsed = Math.max(1, Number(target) || 1);
    const template = document.getElementById("moduleLessonTemplate");
    if (!template) return;

    const existingBlocks = Array.from(moduleLessonsBlocks.querySelectorAll(".lesson-block"));
    if (existingBlocks.length > parsed) {
      existingBlocks.slice(parsed).forEach(block => block.remove());
    }

    while (moduleLessonsBlocks.querySelectorAll(".lesson-block").length < parsed) {
      const fragment = template.content.cloneNode(true);
      moduleLessonsBlocks.appendChild(fragment);
    }

    Array.from(moduleLessonsBlocks.querySelectorAll(".lesson-block")).forEach((block, index) => {
      const counter = block.querySelector("[data-role='lesson-number']");
      if (counter) {
        counter.textContent = index + 1;
      }

      const removeButton = block.querySelector("[data-role='remove-lesson']");
      if (removeButton) {
        removeButton.hidden = parsed === 1;
        removeButton.onclick = () => {
          block.remove();
          if (moduleLessonsCount) {
            const nextValue = Math.max(1, Number.parseInt(moduleLessonsCount.value, 10) - 1 || 1);
            moduleLessonsCount.value = nextValue;
            setModuleLessonsCount(nextValue);
          }
        };
      }
    });
  }

  function clearPreTestFormAlert() {
    if (!preTestFormAlert) return;
    preTestFormAlert.className = "alert d-none";
    preTestFormAlert.textContent = "";
  }

  function showPreTestFormAlert(type, message) {
    if (!preTestFormAlert) return;
    preTestFormAlert.className = `alert alert-${type}`;
    preTestFormAlert.textContent = message;
  }

  function updatePostTestQuestionLabels() {
    if (!postTestQuestions) return;
    const labels = postTestQuestions.querySelectorAll("[data-posttest-question-label]");
    labels.forEach((label, index) => {
      label.textContent = index + 1;
    });
  }

  function createPostTestQuestionBlock() {
    const block = document.createElement("div");
    block.className = "card border posttest-question";
    block.innerHTML = `
      <div class="card-body">
        <h3 class="h6 mb-3">Question <span data-posttest-question-label></span></h3>
        <div class="mb-3">
          <label class="form-label">Prompt</label>
          <textarea class="form-control" data-field="prompt" rows="2" required></textarea>
          <div class="invalid-feedback">Enter the question prompt.</div>
        </div>
        <div class="row g-2 mb-3">
          ${["a", "b", "c", "d"].map(letter => `
            <div class="col-12 col-md-6">
              <label class="form-label">Option ${letter.toUpperCase()}</label>
              <input type="text" class="form-control" data-field="option" data-option="${letter}" required>
              <div class="invalid-feedback">Please provide option ${letter.toUpperCase()}.</div>
            </div>
          `).join("")}
        </div>
        <div class="mb-3">
          <label class="form-label">Correct answer</label>
          <select class="form-select" data-field="answer" required>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
            <option value="d">Option D</option>
          </select>
          <div class="invalid-feedback">Choose the correct answer.</div>
        </div>
        <div>
          <label class="form-label">Explanation <span class="text-muted">(optional)</span></label>
          <textarea class="form-control" data-field="explanation" rows="2" placeholder="Why is this the correct answer?"></textarea>
        </div>
      </div>
    `;
    return block;
  }

  function setPostTestQuestionCount(count) {
    if (!postTestQuestions) return;
    const target = Math.max(0, Number(count) || 0);
    const existing = Array.from(postTestQuestions.querySelectorAll(".posttest-question"));
    if (existing.length > target) {
      existing.slice(target).forEach(block => block.remove());
    }

    let current = postTestQuestions.querySelectorAll(".posttest-question").length;
    while (current < target) {
      const block = createPostTestQuestionBlock();
      postTestQuestions.appendChild(block);
      current += 1;
    }

    updatePostTestQuestionLabels();
  }

  function collectPostTestQuestions() {
    if (!postTestQuestions) return [];
    return Array.from(postTestQuestions.querySelectorAll(".posttest-question")).map(block => {
      const promptField = block.querySelector("[data-field='prompt']");
      const optionInputs = Array.from(block.querySelectorAll("[data-field='option']"));
      const answerSelect = block.querySelector("[data-field='answer']");
      const explanationField = block.querySelector("[data-field='explanation']");

      const prompt = promptField?.value.trim() || "";
      const options = optionInputs.map(input => ({
        value: input.dataset.option,
        label: input.value.trim()
      }));

      const answer = answerSelect?.value || "";
      const explanation = explanationField?.value.trim() || "";

      return { prompt, options, answer, explanation };
    });
  }

  function updatePreTestQuestionLabels() {
    if (!preTestQuestions) return;
    const labels = preTestQuestions.querySelectorAll("[data-pretest-question-label]");
    labels.forEach((label, index) => {
      label.textContent = index + 1;
    });
  }

  function createPreTestQuestionBlock() {
    const block = document.createElement("div");
    block.className = "card border pretest-question";
    block.innerHTML = `
      <div class="card-body">
        <h3 class="h6 mb-3">Question <span data-pretest-question-label></span></h3>
        <div class="mb-3">
          <label class="form-label">Prompt</label>
          <textarea class="form-control" data-field="prompt" rows="2" required></textarea>
          <div class="invalid-feedback">Enter the question prompt.</div>
        </div>
        <div class="row g-2 mb-3">
          ${["a", "b", "c", "d"].map(letter => `
            <div class="col-12 col-md-6">
              <label class="form-label">Option ${letter.toUpperCase()}</label>
              <input type="text" class="form-control" data-field="option" data-option="${letter}" required>
              <div class="invalid-feedback">Please provide option ${letter.toUpperCase()}.</div>
            </div>
          `).join("")}
        </div>
        <div class="mb-3">
          <label class="form-label">Correct answer</label>
          <select class="form-select" data-field="answer" required>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
            <option value="d">Option D</option>
          </select>
          <div class="invalid-feedback">Choose the correct answer.</div>
        </div>
        <div>
          <label class="form-label">Explanation <span class="text-muted">(optional)</span></label>
          <textarea class="form-control" data-field="explanation" rows="2" placeholder="Why is this the correct answer?"></textarea>
        </div>
      </div>
    `;
    return block;
  }

  function setPreTestQuestionCount(count) {
    if (!preTestQuestions) return;
    const target = Math.max(0, Number(count) || 0);
    const existing = Array.from(preTestQuestions.querySelectorAll(".pretest-question"));
    if (existing.length > target) {
      existing.slice(target).forEach(block => block.remove());
    }

    let current = preTestQuestions.querySelectorAll(".pretest-question").length;
    while (current < target) {
      const block = createPreTestQuestionBlock();
      preTestQuestions.appendChild(block);
      current += 1;
    }

    updatePreTestQuestionLabels();
  }

  async function ensurePreTestModal() {
    if (preTestModal && preTestForm) return preTestModal;
    if (preTestModalReadyPromise) return preTestModalReadyPromise;

    preTestModalReadyPromise = (async () => {
      const modalElement = document.getElementById("preTestModal");
      if (!modalElement) {
        throw new Error("Pre-test modal markup missing.");
      }

      preTestForm = document.getElementById("preTestForm");
      preTestCourseTitle = document.getElementById("preTestCourseTitle");
      preTestInstructions = document.getElementById("preTestInstructions");
      preTestItemCount = document.getElementById("preTestItemCount");
      preTestQuestions = document.getElementById("preTestQuestions");
      preTestFormAlert = document.getElementById("preTestFormAlert");
      preTestSaveButton = document.getElementById("preTestSaveButton");
      preTestModal = new bootstrap.Modal(modalElement);

      const syncCount = () => {
        if (!preTestItemCount) return;
        const count = Math.max(0, Number.parseInt(preTestItemCount.value, 10) || 0);
        preTestItemCount.value = count;
        setPreTestQuestionCount(count);
      };

      if (preTestItemCount) {
        preTestItemCount.addEventListener("change", syncCount);
        preTestItemCount.addEventListener("input", syncCount);
      }

      if (preTestForm) {
        preTestForm.addEventListener("submit", handlePreTestSubmit);
      }

      syncCount();

      modalElement.addEventListener("hidden.bs.modal", () => {
        if (preTestForm) {
          preTestForm.classList.remove("was-validated");
          preTestForm.reset();
        }
        clearPreTestFormAlert();
        if (preTestItemCount) {
          preTestItemCount.value = 0;
          setPreTestQuestionCount(0);
        }
      });

      return preTestModal;
    })()
      .catch(error => {
        console.error("Failed to initialise pre-test modal", error);
        preTestModalReadyPromise = null;
        return null;
      });

    return preTestModalReadyPromise;
  }

  function resetPreTestForm(course) {
    if (!preTestForm) return;
    preTestForm.reset();
    preTestForm.classList.remove("was-validated");
    clearPreTestFormAlert();
    if (preTestCourseTitle) {
      preTestCourseTitle.textContent = course?.title || "";
    }
    if (preTestInstructions) {
      preTestInstructions.value = "";
    }
    if (preTestItemCount) {
      preTestItemCount.value = 0;
      setPreTestQuestionCount(0);
    }
  }

  function collectPreTestQuestions() {
    if (!preTestQuestions) return [];
    return Array.from(preTestQuestions.querySelectorAll(".pretest-question")).map(block => {
      const promptField = block.querySelector("[data-field='prompt']");
      const optionInputs = Array.from(block.querySelectorAll("[data-field='option']"));
      const answerSelect = block.querySelector("[data-field='answer']");
      const explanationField = block.querySelector("[data-field='explanation']");

      const prompt = promptField?.value.trim() || "";
      const options = optionInputs.map(input => ({
        value: input.dataset.option,
        label: input.value.trim()
      }));

      const answer = answerSelect?.value || "";
      const explanation = explanationField?.value.trim() || "";

      return { prompt, options, answer, explanation };
    });
  }

  async function getNextSupabaseId(table, column = "id") {
    const client = window.supabaseClient;
    if (!client) {
      throw new Error("Database connection is unavailable. Please refresh the page.");
    }

    const { data, error } = await client
      .from(table)
      .select(column)
      .order(column, { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    const currentValue = data?.[0]?.[column];
    const numeric = Number(currentValue);
    return Number.isFinite(numeric) ? numeric + 1 : 1;
  }

  async function removeExistingPreTestLessons(courseId) {
    const client = window.supabaseClient;
    if (!client) {
      throw new Error("Database connection is unavailable. Please refresh the page.");
    }

    const { data: existingLessons, error: lessonsError } = await client
      .from("lessons")
      .select("id")
      .eq("course_id", courseId)
      .eq("module_sort_order", 0);

    if (lessonsError) {
      throw lessonsError;
    }

    if (!Array.isArray(existingLessons) || !existingLessons.length) {
      return;
    }

    const lessonIds = existingLessons.map(lesson => lesson.id);

    const { data: existingQuestions, error: questionsError } = await client
      .from("quiz_questions")
      .select("id")
      .in("lesson_id", lessonIds);

    if (questionsError) {
      throw questionsError;
    }

    if (Array.isArray(existingQuestions) && existingQuestions.length) {
      const questionIds = existingQuestions.map(question => question.id);

      const { error: optionsError } = await client
        .from("quiz_options")
        .delete()
        .in("question_id", questionIds);
      if (optionsError) {
        throw optionsError;
      }

      const { error: deleteQuestionsError } = await client
        .from("quiz_questions")
        .delete()
        .in("id", questionIds);
      if (deleteQuestionsError) {
        throw deleteQuestionsError;
      }
    }

    const { error: deleteLessonsError } = await client
      .from("lessons")
      .delete()
      .in("id", lessonIds);
    if (deleteLessonsError) {
      throw deleteLessonsError;
    }
  }

  async function openPreTestModalForCourse(course) {
    await ensurePreTestModal();
    if (!preTestModal || !preTestForm) {
      showAlert("danger", "Unable to open pre-test modal. Please refresh the page.");
      return;
    }

    resetPreTestForm(course);
    preTestForm.dataset.courseId = String(course?.id || "");
    preTestModal.show();
    if (preTestInstructions) {
      preTestInstructions.focus();
    }
  }

  async function ensurePostTestModal() {
    if (postTestModal && postTestForm) return postTestModal;
    if (postTestModalReadyPromise) return postTestModalReadyPromise;

    postTestModalReadyPromise = (async () => {
      let modalElement = document.getElementById("postTestModal");

      if (!modalElement && courseManageModals) {
        try {
          const response = await fetch("modals/add-post-test.html", { cache: "no-store" });
          const markup = await response.text();
          courseManageModals.insertAdjacentHTML("beforeend", markup);
          modalElement = document.getElementById("postTestModal");
        } catch (error) {
          console.warn("Failed to load post-test modal via fetch", error);
          injectPostTestMarkup();
          modalElement = document.getElementById("postTestModal");
        }
      }

      if (!modalElement) {
        injectPostTestMarkup();
        modalElement = document.getElementById("postTestModal");
      }

      if (!modalElement) {
        throw new Error("Post-test modal markup missing.");
      }

      postTestForm = document.getElementById("postTestForm");
      postTestCourseTitle = document.getElementById("postTestCourseTitle");
      postTestInstructions = document.getElementById("postTestInstructions");
      postTestItemCount = document.getElementById("postTestItemCount");
      postTestQuestions = document.getElementById("postTestQuestions");
      postTestFormAlert = document.getElementById("postTestFormAlert");
      postTestSaveButton = document.getElementById("postTestSaveButton");
      postTestModal = new bootstrap.Modal(modalElement);

      const syncCount = () => {
        if (!postTestItemCount) return;
        const count = Math.max(0, Number.parseInt(postTestItemCount.value, 10) || 0);
        postTestItemCount.value = count;
        setPostTestQuestionCount(count);
      };

      if (postTestItemCount) {
        postTestItemCount.addEventListener("change", syncCount);
        postTestItemCount.addEventListener("input", syncCount);
      }

      if (postTestForm) {
        postTestForm.addEventListener("submit", handlePostTestSubmit);
      }

      syncCount();

      modalElement.addEventListener("hidden.bs.modal", () => {
        if (postTestForm) {
          postTestForm.classList.remove("was-validated");
          postTestForm.reset();
        }
        clearPostTestFormAlert();
        if (postTestItemCount) {
          postTestItemCount.value = 0;
          setPostTestQuestionCount(0);
        }
      });

      return postTestModal;
    })()
      .catch(error => {
        console.error("Failed to initialise post-test modal", error);
        postTestModalReadyPromise = null;
        return null;
      });

    return postTestModalReadyPromise;
  }

  function resetPostTestForm(course) {
    if (!postTestForm) return;
    postTestForm.reset();
    postTestForm.classList.remove("was-validated");
    clearPostTestFormAlert();
    if (postTestCourseTitle) {
      postTestCourseTitle.textContent = course?.title || "";
    }
    if (postTestInstructions) {
      postTestInstructions.value = "";
    }
    if (postTestItemCount) {
      postTestItemCount.value = 0;
      setPostTestQuestionCount(0);
    }
  }

  async function openPostTestModalForCourse(course) {
    await ensurePostTestModal();
    if (!postTestModal || !postTestForm) {
      showAlert("danger", "Unable to open post-test modal. Please refresh the page.");
      return;
    }

    resetPostTestForm(course);
    postTestForm.dataset.courseId = String(course?.id || "");
    const postTestElement = document.getElementById("postTestModal");
    const postTestTitle = postTestElement ? postTestElement.querySelector(".modal-title") : null;
    if (postTestTitle) {
      postTestTitle.textContent = "Add Post-Test";
    }
    postTestModal.show();
    if (postTestInstructions) {
      postTestInstructions.focus();
    }
  }

  async function handlePreTestSubmit(event) {
    event.preventDefault();
    if (!preTestForm || !preTestQuestions) return;

    preTestForm.classList.add("was-validated");
    if (!preTestForm.checkValidity()) {
      showPreTestFormAlert("danger", "Please complete all required fields.");
      return;
    }

    if (!currentCourse) {
      showPreTestFormAlert("danger", "Course details are not available.");
      return;
    }

    const instructions = preTestInstructions?.value.trim() || "";
    const itemCountRaw = Number.parseInt(preTestItemCount?.value, 10);
    const itemCount = Number.isFinite(itemCountRaw) ? itemCountRaw : 0;

    if (itemCount <= 0) {
      showPreTestFormAlert("danger", "Please set the number of items before saving.");
      return;
    }
    const questions = collectPreTestQuestions();

    if (questions.length !== itemCount) {
      setPreTestQuestionCount(itemCount);
      showPreTestFormAlert("danger", "Question count did not match the number of items. Please verify and try again.");
      return;
    }

    const supabaseClient = window.supabaseClient;
    if (!supabaseClient) {
      showPreTestFormAlert("danger", "Database connection is unavailable. Please refresh the page.");
      return;
    }

    if (preTestSaveButton) {
      preTestSaveButton.disabled = true;
    }
    showPreTestFormAlert("info", "Saving pre-test…");

    try {
      await removeExistingPreTestLessons(currentCourse.id);

      const lessonId = await getNextSupabaseId("lessons");
      const lessonPayload = {
        id: lessonId,
        course_id: currentCourse.id,
        title: "Pre-Test",
        content: instructions,
        module_title: "Pre-Test",
        module_description: "Baseline assessment before the lessons.",
        module_sort_order: 0,
        lesson_index: "PT",
        sort_order: 0,
        created_at: new Date().toISOString()
      };

      const { error: lessonError } = await supabaseClient
        .from("lessons")
        .insert(lessonPayload);

      if (lessonError) {
        throw lessonError;
      }

      let nextQuestionId = await getNextSupabaseId("quiz_questions");
      const questionRows = questions.map((question, index) => {
        const questionId = nextQuestionId + index;
        return {
          id: questionId,
          lesson_id: lessonId,
          prompt: question.prompt,
          answer: question.answer,
          explanation: question.explanation || null,
          intro: instructions || null,
          sort_order: index + 1
        };
      });

      if (questionRows.length) {
        const { error: questionError } = await supabaseClient
          .from("quiz_questions")
          .insert(questionRows);
        if (questionError) {
          throw questionError;
        }

        let nextOptionId = await getNextSupabaseId("quiz_options");
        const optionRows = [];
        questionRows.forEach((row, index) => {
          const source = questions[index];
          if (!source) return;
          source.options.forEach((option, optionIndex) => {
            optionRows.push({
              id: nextOptionId++,
              question_id: row.id,
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

      showPreTestFormAlert("success", "Pre-test saved successfully.");
      preTestModal?.hide();
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            Pre-test added successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
      }
      await loadCourse(currentCourseId);
    } catch (error) {
      console.error("Failed to save pre-test", error);
      showPreTestFormAlert("danger", error.message || "Unable to save pre-test. Please try again.");
    } finally {
      if (preTestSaveButton) {
        preTestSaveButton.disabled = false;
      }
    }
  }

  async function handlePostTestSubmit(event) {
    event.preventDefault();
    if (!postTestForm || !postTestQuestions) return;

    postTestForm.classList.add("was-validated");
    if (!postTestForm.checkValidity()) {
      showPostTestFormAlert("danger", "Please complete all required fields.");
      return;
    }

    if (!currentCourse) {
      showPostTestFormAlert("danger", "Course details are not available.");
      return;
    }

    const instructions = postTestInstructions?.value.trim() || "";
    const itemCountRaw = Number.parseInt(postTestItemCount?.value, 10);
    const itemCount = Number.isFinite(itemCountRaw) ? itemCountRaw : 0;

    if (itemCount <= 0) {
      showPostTestFormAlert("danger", "Please set the number of items before saving.");
      return;
    }

    const questions = collectPostTestQuestions();

    if (questions.length !== itemCount) {
      setPostTestQuestionCount(itemCount);
      showPostTestFormAlert("danger", "Question count did not match the number of items. Please verify and try again.");
      return;
    }

    const supabaseClient = window.supabaseClient;
    if (!supabaseClient) {
      showPostTestFormAlert("danger", "Database connection is unavailable. Please refresh the page.");
      return;
    }

    if (postTestSaveButton) {
      postTestSaveButton.disabled = true;
    }
    showPostTestFormAlert("info", "Saving post-test…");

    try {
      await removeExistingPostTestLessons(currentCourse.id);

      const lessonId = await getNextSupabaseId("lessons");
      const lessonPayload = {
        id: lessonId,
        course_id: currentCourse.id,
        title: "Post-Test",
        content: instructions,
        module_title: "Post-Test",
        module_description: "Evaluate mastery after completing the lessons.",
        module_sort_order: 99,
        lesson_index: "POST",
        sort_order: 99,
        created_at: new Date().toISOString()
      };

      const { error: lessonError } = await supabaseClient
        .from("lessons")
        .insert(lessonPayload);

      if (lessonError) {
        throw lessonError;
      }

      let nextQuestionId = await getNextSupabaseId("quiz_questions");
      const questionRows = questions.map((question, index) => {
        const questionId = nextQuestionId + index;
        return {
          id: questionId,
          lesson_id: lessonId,
          prompt: question.prompt,
          answer: question.answer,
          explanation: question.explanation || null,
          intro: instructions || null,
          sort_order: index + 1
        };
      });

      if (questionRows.length) {
        const { error: questionError } = await supabaseClient
          .from("quiz_questions")
          .insert(questionRows);
        if (questionError) {
          throw questionError;
        }

        let nextOptionId = await getNextSupabaseId("quiz_options");
        const optionRows = [];
        questionRows.forEach((row, index) => {
          const source = questions[index];
          if (!source) return;
          source.options.forEach(option => {
            optionRows.push({
              id: nextOptionId++,
              question_id: row.id,
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

      showPostTestFormAlert("success", "Post-test saved successfully.");
      postTestModal?.hide();
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            Post-test added successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
      }
      await loadCourse(currentCourseId);
    } catch (error) {
      console.error("Failed to save post-test", error);
      showPostTestFormAlert("danger", error.message || "Unable to save post-test. Please try again.");
    } finally {
      if (postTestSaveButton) {
        postTestSaveButton.disabled = false;
      }
    }
  }

  function formatDisplayDate(value) {
    if (!value) {
      return new Date().toLocaleDateString();
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return value;
    }
    return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function cloneSummary(summary) {
    if (!summary || typeof summary !== "object") return null;
    const {
      total = 0,
      missing = 0,
      scores = [],
      average = null,
      preTestScore = null,
      postTestScore = null
    } = summary;
    return {
      total,
      missing,
      scores: Array.isArray(scores) ? [...scores] : [],
      average: Number.isFinite(average) ? Number(average) : null,
      preTestScore: Number.isFinite(preTestScore) ? Number(preTestScore) : null,
      postTestScore: Number.isFinite(postTestScore) ? Number(postTestScore) : null
    };
  }

  function showAlert(type, message) {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
  }

  function clearAlert() {
    if (alertContainer) {
      alertContainer.innerHTML = "";
    }
  }

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function sanitizeStorageToken(value) {
    return String(value ?? "").replace(/[^a-z0-9_-]/gi, "_");
  }

  function getActiveUserStorageToken() {
    const user = getActiveUser();
    if (!user) return null;

    if (user.id !== undefined && user.id !== null && user.id !== "") {
      const numericId = Number(user.id);
      if (Number.isFinite(numericId)) {
        return sanitizeStorageToken(numericId);
      }
      return sanitizeStorageToken(user.id);
    }

    if (user.email) {
      return sanitizeStorageToken(user.email);
    }

    return null;
  }

  function getCourseStorageKeys(prefix, courseId) {
    const normalizedCourseId = courseId === undefined || courseId === null ? "" : courseId;
    const legacyKey = `${prefix}${normalizedCourseId}`;
    const userToken = getActiveUserStorageToken();
    const scopedKey = userToken ? `${legacyKey}__${userToken}` : legacyKey;
    return { scopedKey, legacyKey };
  }

  function readScopedStorage(prefix, courseId) {
    if (!window?.localStorage) {
      const keys = getCourseStorageKeys(prefix, courseId);
      return { raw: null, key: keys.scopedKey, legacyKey: keys.legacyKey };
    }

    const { scopedKey, legacyKey } = getCourseStorageKeys(prefix, courseId);
    let raw = window.localStorage.getItem(scopedKey);

    if (!raw && legacyKey !== scopedKey) {
      const legacyValue = window.localStorage.getItem(legacyKey);
      if (legacyValue) {
        raw = legacyValue;
        window.localStorage.setItem(scopedKey, legacyValue);
        window.localStorage.removeItem(legacyKey);
      }
    }

    return { raw, key: scopedKey, legacyKey };
  }

  function writeScopedStorage(prefix, courseId, value) {
    if (!window?.localStorage) return;
    const { scopedKey, legacyKey } = getCourseStorageKeys(prefix, courseId);
    window.localStorage.setItem(scopedKey, value);
    if (legacyKey !== scopedKey) {
      window.localStorage.removeItem(legacyKey);
    }
  }

  function clearScopedStorage(prefix, courseId) {
    if (!window?.localStorage) return;
    const { scopedKey, legacyKey } = getCourseStorageKeys(prefix, courseId);
    window.localStorage.removeItem(scopedKey);
    if (legacyKey !== scopedKey) {
      window.localStorage.removeItem(legacyKey);
    }
  }

  function getProgressStorageKey(courseId) {
    return getCourseStorageKeys("dbs_course_progress_", courseId).scopedKey;
  }

  function getQuizStorageKey(courseId) {
    return getCourseStorageKeys("dbs_course_quiz_", courseId).scopedKey;
  }

  function getCompletionStorageKey(courseId) {
    return getCourseStorageKeys("dbs_course_completion_", courseId).scopedKey;
  }

  function loadCourseCompletion(courseId) {
    if (!courseId) return null;
    try {
      const { raw } = readScopedStorage("dbs_course_completion_", courseId);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch (error) {
      console.warn("Unable to read stored course completion", error);
      return null;
    }
  }

  function saveCourseCompletion(courseId, payload) {
    if (!courseId) return;
    try {
      const sanitized = Object.assign({}, payload, { courseId });
      writeScopedStorage("dbs_course_completion_", courseId, JSON.stringify(sanitized));
    } catch (error) {
      console.warn("Unable to persist course completion", error);
    }
  }

  function clearCourseCompletion(courseId) {
    if (!courseId) return;
    try {
      clearScopedStorage("dbs_course_completion_", courseId);
    } catch (error) {
      console.warn("Unable to clear course completion", error);
    }
  }

  function getModuleKey(lesson) {
    if (!lesson) return null;
    return `${lesson.module_sort_order ?? 999}_${lesson.module_title || "General Module"}`;
  }

  function getLessonById(lessonId) {
    if (!Array.isArray(courseLessons) || !courseLessons.length) return null;
    return courseLessons.find(item => Number(item.id) === Number(lessonId)) || null;
  }

  function isLessonQuizComplete(lessonId) {
    const lesson = getLessonById(lessonId);
    if (!lesson) return false;
    if (!lesson.quiz || !Array.isArray(lesson.quiz.questions) || !lesson.quiz.questions.length) {
      return true;
    }

    const saved = lessonQuizResults[String(lessonId)];
    if (!saved || saved.incomplete) {
      return false;
    }

    const totalQuestions = lesson.quiz.questions.length;
    if (!totalQuestions) {
      return true;
    }

    const responses = saved.responses || {};
    const answeredCount = Object.values(responses).filter(value => value !== null && value !== undefined && value !== "").length;
    return answeredCount >= totalQuestions;
  }

  function sanitizeVisitedLessons() {
    if (!visitedLessonIds || !visitedLessonIds.size) return;
    const invalid = [];
    visitedLessonIds.forEach(lessonId => {
      if (!isLessonQuizComplete(lessonId)) {
        invalid.push(lessonId);
      }
    });

    if (!invalid.length) return;

    invalid.forEach(lessonId => visitedLessonIds.delete(lessonId));
    saveVisitedLessons(currentCourseId, visitedLessonIds);
  }

  function loadVisitedLessons(courseId) {
    if (!courseId) return new Set();
    try {
      const { raw } = readScopedStorage("dbs_course_progress_", courseId);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return new Set();
      return new Set(parsed.map(value => Number(value)).filter(value => Number.isFinite(value)));
    } catch (error) {
      console.warn("Unable to load stored lesson progress", error);
      return new Set();
    }
  }

  function saveVisitedLessons(courseId, visitedSet) {
    if (!courseId) return;
    try {
      const payload = JSON.stringify(Array.from(visitedSet));
      writeScopedStorage("dbs_course_progress_", courseId, payload);
    } catch (error) {
      console.warn("Unable to persist lesson progress", error);
    }
  }

  function loadQuizResults(courseId) {
    if (!courseId) return {};
    try {
      const { raw } = readScopedStorage("dbs_course_quiz_", courseId);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
      return {};
    } catch (error) {
      console.warn("Unable to load quiz results", error);
      return {};
    }
  }

  function saveQuizResults(courseId, results) {
    if (!courseId) return;
    try {
      const payload = JSON.stringify(results || {});
      writeScopedStorage("dbs_course_quiz_", courseId, payload);
    } catch (error) {
      console.warn("Unable to persist quiz results", error);
    }
  }

  let lessonQuizResults = {};

  function updateModuleProgressUI() {
    if (!lessonOutline) return;
    const viewer = getActiveUser();
    if (getUserRole(viewer) !== "student") return;
    lessonOutline.querySelectorAll(".module-section").forEach(section => {
      const lessonButtons = Array.from(section.querySelectorAll("[data-lesson]"));
      const total = lessonButtons.length;
      if (!total) return;
      const visited = lessonButtons.filter(button => button.classList.contains("visited")).length;
      const percent = Math.round((visited / total) * 100);

      const progressBar = section.querySelector(".module-progress .progress-bar");
      if (progressBar) {
        progressBar.style.width = `${percent}%`;
        progressBar.setAttribute("aria-valuenow", String(percent));
      }

      const caption = section.querySelector(".module-progress-caption");
      if (caption) {
        caption.textContent = `${visited} / ${total} lesson${total === 1 ? "" : "s"} completed`;
      }
    });
  }

  function getAssessmentSummary() {
    const summary = {
      total: 0,
      missing: 0,
      scores: [],
      average: null,
      preTestScore: null,
      postTestScore: null
    };

    if (!Array.isArray(courseLessons) || !courseLessons.length) {
      summary.average = 100;
      return summary;
    }

    const trackedAssessments = [];
    const preTestLesson = findPreTestLesson();
    const postTestLesson = findPostTestLesson();

    if (preTestLesson) {
      trackedAssessments.push({ key: "pre", lesson: preTestLesson });
    }

    if (postTestLesson) {
      trackedAssessments.push({ key: "post", lesson: postTestLesson });
    }

    summary.total = trackedAssessments.length;

    if (!summary.total) {
      summary.average = 100;
      return summary;
    }

    trackedAssessments.forEach(item => {
      const lessonId = Number(item.lesson.id);
      const saved = lessonQuizResults[String(lessonId)];

      if (!saved || saved.incomplete || typeof saved.score !== "number" || Number.isNaN(saved.score)) {
        summary.missing += 1;
        return;
      }

      const numericScore = Number(saved.score);
      summary.scores.push(numericScore);

      if (item.key === "pre") {
        summary.preTestScore = numericScore;
      }

      if (item.key === "post") {
        summary.postTestScore = numericScore;
      }
    });

    if (summary.missing > 0) {
      summary.average = null;
      return summary;
    }

    const divisor = summary.scores.length || 1;
    const totalScore = summary.scores.reduce((acc, value) => acc + value, 0);
    summary.average = totalScore / divisor;
    return summary;
  }

  function hasPassedAllQuizzes() {
    const summary = getAssessmentSummary();
    updateCompletionSummary(summary);
    if (summary.total === 0) {
      return true;
    }

    if (summary.missing > 0) {
      return false;
    }

    return typeof summary.average === "number" && summary.average >= MINIMUM_COURSE_AVERAGE;
  }

  function hasVisitedAllLessons() {
    if (!Array.isArray(courseLessons) || !courseLessons.length) return false;
    if (!visitedLessonIds || !visitedLessonIds.size) return false;
    return courseLessons.every(lesson => visitedLessonIds.has(Number(lesson.id)));
  }

  function getActiveUser() {
    return typeof window.getCurrentUser === "function" ? window.getCurrentUser() : null;
  }

  function getUserRole(user) {
    if (!user) return "guest";
    const normalizedRole = typeof user.role === "string" ? user.role.trim().toLowerCase() : "";
    if (normalizedRole === "admin") return "admin";
    if (normalizedRole === "instructor") return "instructor";
    return "student";
  }

  function hasSupabase() {
    if (supabaseClient) return true;
    console.warn("Supabase client not available; skipping completion sync.");
    return false;
  }

  function openBadgePreview() {
    const badge = courseBadge;
    const courseTitle = currentCourse?.title || "Course";
    completionModal?.hide();
    if (!badgeModal || !badge) {
      window.location.href = "mybadges.html";
      return;
    }

    const resolvedImageUrl = getResolvedCourseBadgeImage(badge, courseTitle);

    if (badgeModalImage) {
      badgeModalImage.src = resolvedImageUrl;
      badgeModalImage.alt = `${badge.title || courseTitle} badge`;
    }
    if (badgeModalTitle) {
      badgeModalTitle.textContent = badge.title || "Course Badge";
    }
    if (badgeModalDescription) {
      badgeModalDescription.textContent = badge.description || "You earned this badge by completing the course.";
    }
    if (badgeModalCourseTitle) {
      badgeModalCourseTitle.textContent = courseTitle;
    }
    if (badgeModalDate) {
      badgeModalDate.textContent = formatDisplayDate(lastCompletionIssuedDate);
    }

    badgeModal.show();
  }

  function openCertificatePreview() {
    completionModal?.hide();
    if (!certificateModal) {
      window.location.href = "mycertificates.html";
      return;
    }

    const user = getActiveUser();
    const summary = lastCompletionSummary || getAssessmentSummary();
    const courseTitle = currentCourse?.title || "Course";
    const computedAverage = summary && typeof summary.average === "number" ? summary.average : null;
    const averageScore = Number.isFinite(lastCompletionAverage) ? lastCompletionAverage : computedAverage;
    let resultLabel = lastCompletionResultLabel;
    if (!resultLabel) {
      if (typeof computedAverage === "number") {
        resultLabel = computedAverage >= MINIMUM_COURSE_AVERAGE ? "PASSED" : "FAILED";
      } else if (summary && summary.total > 0 && summary.missing > 0) {
        resultLabel = "PENDING";
      } else {
        resultLabel = "PASSED";
      }
    }
    resultLabel = resultLabel.toUpperCase();

    if (certificateModalStudentName) {
      certificateModalStudentName.textContent = user?.name || "Student";
    }
    if (certificateModalCourseTitle) {
      certificateModalCourseTitle.textContent = courseTitle;
    }

    if (certificateModalScores) {
      if (summary && typeof summary === "object" && summary.total > 0 && summary.missing === 0 && typeof summary.average === "number") {
        const parts = [];
        if (typeof summary.preTestScore === "number") {
          parts.push(`Pre-test: ${summary.preTestScore.toFixed(1)}%`);
        }
        if (typeof summary.postTestScore === "number") {
          parts.push(`Post-test: ${summary.postTestScore.toFixed(1)}%`);
        }
        if (typeof summary.average === "number") {
          parts.push(`Average: ${summary.average.toFixed(1)}%`);
        }
        certificateModalScores.textContent = parts.join(" · ") || "Assessment results available.";
      } else if (typeof averageScore === "number") {
        certificateModalScores.textContent = `Average score: ${averageScore.toFixed(1)}%.`;
      } else {
        certificateModalScores.textContent = "Assessment details will appear once all tests are completed.";
      }
    }

    if (certificateModalDate) {
      certificateModalDate.textContent = formatDisplayDate(lastCompletionIssuedDate);
    }

    if (certificateModalResult) {
      certificateModalResult.textContent = resultLabel;
      certificateModalResult.classList.remove("text-success", "text-danger", "text-warning");
      const resultClass = resultLabel === "PASSED" ? "text-success" : resultLabel === "FAILED" ? "text-danger" : "text-warning";
      certificateModalResult.classList.add(resultClass);
    }

    certificateModal.show();
  }

  function handleCompletionAction(action) {
    if (action === "view-badge") {
      openBadgePreview();
      return;
    }
    if (action === "view-certificate") {
      openCertificatePreview();
    }
  }

  function showCompletionModal(title, withBadge, averageScore, outcomeLabel) {
    if (!completionModal) return;
    if (completionMessage) {
      const safeTitle = title || "this course";
      const rewardCopy = withBadge ? "a badge and certificate" : "a course certificate";
      const resultCopy = outcomeLabel ? ` Result: ${outcomeLabel}.` : "";
      let message = `Congratulations! You earned ${rewardCopy} by completing "${safeTitle}".${resultCopy}`;
      if (typeof averageScore === "number" && Number.isFinite(averageScore)) {
        message += ` Your final average score is ${averageScore.toFixed(1)}%.`;
      }
      completionMessage.textContent = message;
    }
    completionModal.show();
  }

  function updateCompletionSummary(summary) {
    if (!completionSummary || !completionStatusLabel || !completionAverageLabel) {
      return;
    }

    const user = getActiveUser();
    const role = getUserRole(user);
    if (role !== "student") {
      completionSummary.classList.add("d-none");
      completionSummary.classList.remove("alert-success", "alert-warning", "alert-info");
      completionStatusLabel.textContent = "";
      completionAverageLabel.textContent = "";
      return;
    }

    const { average, missing, total } = summary;

    lastCompletionSummary = cloneSummary(summary);

    if (total === 0) {
      completionSummary.classList.add("d-none", "alert-info");
      completionSummary.classList.remove("alert-success", "alert-warning");
      completionStatusLabel.textContent = "Result pending.";
      completionAverageLabel.textContent = "Complete the lessons to view your results.";
      return;
    }

    completionSummary.classList.remove("d-none");

    if (missing > 0 || typeof average !== "number") {
      completionSummary.classList.add("alert-info");
      completionSummary.classList.remove("alert-success", "alert-warning");
      completionStatusLabel.textContent = "Result pending.";
      completionAverageLabel.innerHTML = "Complete both pre-test and post-test to view your average score.";
      return;
    }

    const outcomePassed = average >= MINIMUM_COURSE_AVERAGE;
    const formattedAverage = `${average.toFixed(1)}%`;

    if (summary.preTestScore !== null && summary.postTestScore !== null) {
      completionAverageLabel.innerHTML = `Pre-test: <strong>${summary.preTestScore.toFixed(1)}%</strong> · Post-test: <strong>${summary.postTestScore.toFixed(1)}%</strong> · Overall average: <strong>${formattedAverage}</strong>.`;
    } else {
      completionAverageLabel.innerHTML = `Average score: <strong>${formattedAverage}</strong>.`;
    }
    completionStatusLabel.innerHTML = `Result: <strong>${outcomePassed ? "PASSED" : "FAILED"}</strong>.`;

    completionSummary.classList.toggle("alert-success", outcomePassed);
    completionSummary.classList.toggle("alert-warning", !outcomePassed);
    completionSummary.classList.remove("alert-info");

    if (completionActions) {
      completionActions.classList.toggle("d-none", outcomePassed);
    }

    if (completionViewBadgeBtn) {
      const hasBadge = Boolean(currentCourse?.badge_id);
      completionViewBadgeBtn.classList.toggle("d-none", !hasBadge);
    }
  }

  async function ensureEnrollmentCompletion() {
    if (!hasSupabase() || completionSyncInProgress || !currentCourseId) return;
    const user = getActiveUser();
    if (!user) return;
    const role = getUserRole(user);
    if (role !== "student") return;

    const studentId = Number(user.id);
    if (!Number.isFinite(studentId)) return;

    completionSyncInProgress = true;

    try {
      const completedAt = new Date().toISOString();

      const { data: existingRows, error: fetchError } = await supabaseClient
        .from("enrollments")
        .select("id, badge_issued")
        .eq("student_id", studentId)
        .eq("course_id", currentCourseId)
        .limit(1);

      if (fetchError) throw fetchError;

      let enrollmentId = existingRows?.[0]?.id || null;

      if (enrollmentId) {
        const { error: updateError } = await supabaseClient
          .from("enrollments")
          .update({ status: "completed", progress: 100, completed_at: completedAt })
          .eq("id", enrollmentId);
        if (updateError) throw updateError;
      } else {
        const { data: inserted, error: insertError } = await supabaseClient
          .from("enrollments")
          .insert({
            student_id: studentId,
            course_id: currentCourseId,
            status: "completed",
            progress: 100,
            completed_at: completedAt
          })
          .select("id")
          .maybeSingle();
        if (insertError) throw insertError;
        enrollmentId = inserted?.id || null;
      }

      if (!enrollmentId) return;

      const courseBadgeId = currentCourse?.badge_id;
      const needsBadge = Boolean(courseBadgeId);

      let issuedBadgeId = null;

      if (needsBadge) {
        const { data: existingBadge, error: badgeFetchError } = await supabaseClient
          .from("issued_badges")
          .select("id")
          .eq("student_id", studentId)
          .eq("course_id", currentCourseId)
          .eq("badge_id", courseBadgeId)
          .maybeSingle();

        if (badgeFetchError) throw badgeFetchError;

        issuedBadgeId = existingBadge?.id || null;

        if (!issuedBadgeId) {
          const { data: insertedBadge, error: issueError } = await supabaseClient
            .from("issued_badges")
            .insert({
              student_id: studentId,
              course_id: currentCourseId,
              badge_id: courseBadgeId,
              date_issued: completedAt.slice(0, 10)
            })
            .select("id")
            .maybeSingle();

          if (issueError) throw issueError;
          issuedBadgeId = insertedBadge?.id || null;
        }
      }

      if (needsBadge) {
        await supabaseClient.from("enrollments").update({ badge_issued: true }).eq("id", enrollmentId);
        lastIssuedBadgeId = issuedBadgeId || lastIssuedBadgeId;
      }

      showCompletionModal(currentCourse?.title || "this course", needsBadge);
    } catch (error) {
      console.error("Failed to sync course completion", error);
    } finally {
      completionSyncInProgress = false;
    }
  }

  function announceCourseCompletion() {
    if (completionNoticeShown) return;
    if (!currentCourseId) return;
    if (!hasPassedAllQuizzes()) return;

    const user = getActiveUser();
    const role = getUserRole(user);
    if (role !== "student") return;

    const summary = getAssessmentSummary();
    updateCompletionSummary(summary);

    if (summary.total > 0 && summary.missing > 0) {
      return;
    }

    const averageScore = typeof summary.average === "number" ? summary.average : 100;

    if (summary.total > 0 && summary.average !== null && summary.average < MINIMUM_COURSE_AVERAGE) {
      if (!insufficientAverageNoticeShown) {
        const averageCopy = averageScore.toFixed(1);
        showAlert(
          "warning",
          `Result: <strong>FAILED</strong>. Your current assessment average is ${averageCopy}%. You need at least ${MINIMUM_COURSE_AVERAGE}% to earn the badge. Review the lessons and try again.`
        );
        insufficientAverageNoticeShown = true;
      }
      return;
    }

    completionNoticeShown = true;

    const title = currentCourse?.title || "this course";
    const hasBadge = Boolean(currentCourse?.badge_id);

    const messageParts = [
      `<strong>Congratulations!</strong> You've completed <strong>${title}</strong>.`,
      hasBadge
        ? "You just earned a new course badge and certificate."
        : "You just earned your course completion badge and certificate."
    ];

    const resultLabel = averageScore >= MINIMUM_COURSE_AVERAGE ? "PASSED" : "FAILED";

    messageParts.push(`<span class="d-block">Result: <strong>${resultLabel}</strong>.</span>`);

    if (summary.total > 0 && summary.average !== null) {
      if (summary.preTestScore !== null && summary.postTestScore !== null) {
        messageParts.push(`<span class="d-block">Pre-test: <strong>${summary.preTestScore.toFixed(1)}%</strong> · Post-test: <strong>${summary.postTestScore.toFixed(1)}%</strong> · Average: <strong>${averageScore.toFixed(1)}%</strong>.</span>`);
      } else {
        messageParts.push(`<span class="d-block">Average score: <strong>${averageScore.toFixed(1)}%</strong>.</span>`);
      }
    }

    const actionButtons = [];
    if (hasBadge) {
      actionButtons.push('<button type="button" class="btn btn-success btn-sm" data-action="view-badge">View badge</button>');
    }

    if (actionButtons.length) {
      messageParts.push(
        `<div class="mt-2 d-flex flex-wrap gap-2">${actionButtons.join(" ")}</div>`
      );
    }

    showAlert("success", messageParts.join(" "));
    const summarySnapshot = cloneSummary(summary);
    lastCompletionSummary = summarySnapshot;
    lastCompletionAverage = averageScore;
    lastCompletionResultLabel = resultLabel;
    lastCompletionIssuedDate = new Date().toISOString();
    saveCourseCompletion(currentCourseId, {
      status: "passed",
      average: averageScore,
      recorded_at: lastCompletionIssuedDate,
      result: resultLabel,
      summary: summarySnapshot
    });
    ensureEnrollmentCompletion();
    showCompletionModal(title, hasBadge, averageScore, resultLabel);
  }

  function findPreTestLesson() {
    if (!Array.isArray(courseLessons)) return null;
    return courseLessons.find(lesson => {
      const title = lesson?.title?.toLowerCase() || "";
      return title.includes("pre-test") || title.includes("pretest");
    }) || null;
  }

  function findPostTestLesson() {
    if (!Array.isArray(courseLessons)) return null;
    return courseLessons.find(lesson => {
      const title = lesson?.title?.toLowerCase() || "";
      return title.includes("post-test") || title.includes("posttest") || title.includes("final competency");
    }) || null;
  }

  function resetLessonAssessment(lessonId) {
    if (!Number.isFinite(Number(lessonId))) return;
    const key = String(lessonId);

    if (lessonQuizResults[key]) {
      delete lessonQuizResults[key];
      saveQuizResults(currentCourseId, lessonQuizResults);
    }

    if (visitedLessonIds.has(Number(lessonId))) {
      visitedLessonIds.delete(Number(lessonId));
      saveVisitedLessons(currentCourseId, visitedLessonIds);
    }

    clearCourseCompletion(currentCourseId);

    const outlineButton = lessonOutline?.querySelector(`[data-lesson="${lessonId}"]`);
    if (outlineButton) {
      outlineButton.classList.remove("visited");
      const badge = outlineButton.querySelector(".module-lesson-status");
      if (badge) {
        badge.remove();
      }
    }

    completionNoticeShown = false;
    insufficientAverageNoticeShown = false;
    updateModuleProgressUI();
    updateCompletionSummary(getAssessmentSummary());
  }

  retryPreTestBtn?.addEventListener("click", () => {
    const lesson = findPreTestLesson();
    if (!lesson) {
      showAlert("info", "Pre-test lesson is not available in this course.");
      return;
    }
    resetLessonAssessment(lesson.id);
    activateLesson(lesson.id);
    showAlert("info", "Pre-test has been reset. Submit new answers to improve your score.");
  });

  retryPostTestBtn?.addEventListener("click", () => {
    const lesson = findPostTestLesson();
    if (!lesson) {
      showAlert("info", "Post-test lesson is not available in this course.");
      return;
    }
    resetLessonAssessment(lesson.id);
    activateLesson(lesson.id);
    showAlert("info", "Post-test has been reset. Submit new answers to improve your score.");
  });

  completionViewBadgeBtn?.addEventListener("click", () => handleCompletionAction("view-badge"));
  completionViewCertificateBtn?.addEventListener("click", () => handleCompletionAction("view-certificate"));

  alertContainer?.addEventListener("click", event => {
    const trigger = event.target.closest("[data-action='view-badge'], [data-action='view-certificate']");
    if (!trigger) return;
    event.preventDefault();
    const action = trigger.dataset.action;
    if (!action) return;
    handleCompletionAction(action);
  });

  function syncCourseOutlineFocus(button) {
    if (!lessonOutline || !button) return;
    const section = button.closest(".module-section");

    lessonOutline.querySelectorAll(".module-section").forEach(moduleSection => {
      const isActive = moduleSection === section;
      moduleSection.classList.toggle("module-section-active", isActive);
      if (isActive) {
        moduleSection.classList.remove("collapsed");
      }
    });

    window.requestAnimationFrame(() => {
      const container = lessonOutline;
      if (!container.contains(button)) return;
      const containerRect = container.getBoundingClientRect();
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const padding = 24;

      const ensureVisibility = target => {
        if (!target) return false;
        const rect = target.getBoundingClientRect();
        const top = rect.top - containerRect.top + containerScrollTop;
        const bottom = top + rect.height;
        const upperBound = containerScrollTop + padding;
        const lowerBound = containerScrollTop + containerHeight - padding;

        if (top < upperBound) {
          container.scrollTo({ top: Math.max(top - padding, 0), behavior: "smooth" });
          return true;
        }
        if (bottom > lowerBound) {
          container.scrollTo({ top: Math.max(bottom - containerHeight + padding, 0), behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!ensureVisibility(section)) {
        ensureVisibility(button);
      }
    });
  }

  function updateLessonScrollIndicator(progress) {
    if (!lessonScrollProgress || !lessonScrollProgressBar || !lessonScrollProgressCaption) return;
    const viewer = getActiveUser();
    if (getUserRole(viewer) !== "student") {
      lessonScrollProgress.hidden = true;
      return;
    }
    const safeProgress = Math.max(0, Math.min(100, Number.isFinite(progress) ? progress : 0));
    lessonScrollProgress.hidden = false;
    lessonScrollProgressBar.style.width = `${safeProgress}%`;
    lessonScrollProgressBar.setAttribute("aria-valuenow", String(safeProgress));
    lessonScrollProgressCaption.textContent = `${safeProgress}% completed`;
  }

  function resetLessonScrollTracking(lesson) {
    lessonScrollMaxProgress = 0;
    const viewer = getActiveUser();
    if (getUserRole(viewer) !== "student") {
      lessonContent.dataset.lessonId = "";
      if (lessonScrollProgress) {
        lessonScrollProgress.hidden = true;
      }
      return;
    }

    if (!lesson) {
      lessonContent.dataset.lessonId = "";
      if (lessonScrollProgress) {
        lessonScrollProgress.hidden = true;
      }
      return;
    }

    const lessonId = Number(lesson.id);
    lessonContent.dataset.lessonId = Number.isFinite(lessonId) ? String(lessonId) : "";
    lessonContent.scrollTop = 0;

    const visited = visitedLessonIds.has(lessonId);
    if (lessonScrollProgress) {
      const isScrollable = lessonContent.scrollHeight > lessonContent.clientHeight;
      const hasQuiz = Boolean(lesson.quiz && Array.isArray(lesson.quiz.questions) && lesson.quiz.questions.length);
      const initialProgress = hasQuiz
        ? (visited ? 100 : 0)
        : (visited || !isScrollable ? 100 : 0);
      updateLessonScrollIndicator(initialProgress);
      lessonScrollMaxProgress = initialProgress;
      if (!hasQuiz && initialProgress >= LESSON_SCROLL_COMPLETE_THRESHOLD && Number.isFinite(lessonId) && !visitedLessonIds.has(lessonId)) {
        markLessonVisited(lessonId);
      }
    }

    window.requestAnimationFrame(() => {
      handleLessonScroll();
    });
  }

  function markLessonVisited(lessonId) {
    if (!Number.isFinite(lessonId)) return;
    if (!isLessonQuizComplete(lessonId)) return;
    if (visitedLessonIds.has(lessonId)) return;
    visitedLessonIds.add(lessonId);
    saveVisitedLessons(currentCourseId, visitedLessonIds);

    const button = lessonOutline?.querySelector(`[data-lesson="${lessonId}"]`);
    if (button) {
      button.classList.add("visited");
      const meta = button.querySelector(".module-lesson-meta");
      if (meta && !meta.querySelector(".module-lesson-status")) {
        const badge = document.createElement("span");
        badge.className = "badge bg-success-subtle text-success module-lesson-status";
        badge.textContent = "Done";
        meta.appendChild(badge);
      }
    }

    if (Number(lessonContent?.dataset?.lessonId) === lessonId) {
      lessonScrollMaxProgress = 100;
      updateLessonScrollIndicator(100);
    }

    updateModuleProgressUI();
    announceCourseCompletion();
  }

  function renderQuiz(lesson, options = {}) {
    if (!lessonQuiz || !lessonQuizBody || !lessonQuizStatus || !lessonQuizResult) return;
    if (!lesson || !lesson.quiz || !Array.isArray(lesson.quiz.questions) || !lesson.quiz.questions.length) {
      lessonQuiz.hidden = true;
      lessonQuizBody.innerHTML = "";
      lessonQuizBody.dataset.lesson = "";
      return;
    }

    if (lessonQuizTitle) {
      if (isPreTestLesson(lesson)) {
        lessonQuizTitle.textContent = "Pre-Test Questions";
      } else if (isPostTestLesson(lesson)) {
        lessonQuizTitle.textContent = "Post-Test Questions";
      } else {
        lessonQuizTitle.textContent = "Lesson Quiz";
      }
    }

    const { readOnly = false } = options;
    const lessonId = Number(lesson.id);
    const saved = lessonQuizResults[String(lessonId)] || null;
    const isSubmitted = Boolean(saved);
    const isPassed = isSubmitted && saved.score === QUIZ_PASS_SCORE;

    lessonQuiz.hidden = false;
    lessonQuizBody.dataset.lesson = String(lessonId);

    if (readOnly) {
      lessonQuizStatus.textContent = "Preview";
      lessonQuizStatus.className = "badge bg-secondary-subtle text-secondary";
      lessonQuizResult.hidden = false;
      lessonQuizResult.className = "alert alert-info";
      lessonQuizResult.textContent = lesson.quiz.intro || "Review the questions below.";

      const previewMarkup = lesson.quiz.questions
        .map((question, index) => {
          const optionsList = question.options
            .map(option => {
              const isCorrect = option.value === question.answer;
              const badge = isCorrect ? '<span class="badge bg-success-subtle text-success ms-2">Answer</span>' : "";
              return `<li>${option.label}${badge}</li>`;
            })
            .join("");
          const explanation = question.explanation
            ? `<div class="small text-muted mt-2">Explanation: ${question.explanation}</div>`
            : "";
          return `
            <section class="quiz-question-preview" data-question="${question.id}">
              <p class="fw-semibold mb-2">Q${index + 1}. ${question.prompt}</p>
              <ul class="list-unstyled mb-2 ms-3">${optionsList}</ul>
              ${explanation}
            </section>
          `;
        })
        .join("");

      lessonQuizBody.innerHTML = previewMarkup;
      return;
    }

    lessonQuizResult.hidden = false;

    if (isSubmitted) {
      lessonQuizStatus.textContent = isPassed ? "Perfect Score" : "Submitted";
      lessonQuizStatus.className = isPassed
        ? "badge bg-success-subtle text-success"
        : "badge bg-warning-subtle text-warning";

      const missedList = Array.isArray(saved.missed) && saved.missed.length
        ? `<ul class="mb-0">${saved.missed
            .map(item => `<li><strong>${item.prompt}</strong>: ${item.explanation}</li>`)
            .join("")}</ul>`
        : "";

      lessonQuizResult.className = isPassed ? "alert alert-success" : "alert alert-secondary";
      lessonQuizResult.innerHTML = `<p class="mb-1">Score: ${saved.score}%${isPassed ? " – Great work!" : " – Quiz submitted."}</p>${missedList}`;
    } else {
      lessonQuizStatus.textContent = "Pending";
      lessonQuizStatus.className = "badge bg-primary-subtle text-primary";
      lessonQuizResult.className = "alert alert-info";
      lessonQuizResult.textContent = lesson.quiz.intro || "Answer the questions below.";
    }

    const questionMarkup = lesson.quiz.questions
      .map((question, index) => {
        const selectedValue = saved?.responses ? saved.responses[question.id] : null;
        return `
          <div class="quiz-question" data-question="${question.id}">
            <p class="fw-semibold mb-2">Q${index + 1}. ${question.prompt}</p>
            <div class="quiz-options">
              ${question.options
                .map((option, optIndex) => {
                  const inputId = `quiz-${lessonId}-${question.id}-${optIndex}`;
                  const checked = selectedValue === option.value ? "checked" : "";
                  const disabled = isSubmitted ? "disabled" : "";
                  return `
                    <label for="${inputId}">
                      <input type="radio" id="${inputId}" name="${lessonId}-${question.id}" value="${option.value}" ${checked} ${disabled}>
                      <span>${option.label}</span>
                    </label>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;
      })
      .join("");

    const footerControls = isSubmitted
      ? '<button type="button" class="btn btn-outline-primary" id="lessonQuizReset">Repeat Quiz</button>'
      : '<button type="button" class="btn btn-success" id="lessonQuizSubmit">Submit Answers</button>';

    const footerMarkup = `
      <div class="lesson-quiz-footer mt-3 d-flex flex-wrap gap-2 align-items-center">
        ${footerControls}
        <div class="text-muted small" id="lessonQuizFeedback"></div>
      </div>
    `;

    lessonQuizBody.innerHTML = questionMarkup + footerMarkup;

    if (!isSubmitted) {
      const submitButton = document.getElementById("lessonQuizSubmit");
      const feedback = document.getElementById("lessonQuizFeedback");
      if (submitButton) {
        submitButton.addEventListener("click", () => {
          const result = gradeQuiz(lesson);
          if (!result) return;
          if (result.incomplete) {
            lessonQuizResult.className = "alert alert-warning";
            lessonQuizResult.textContent = "Please answer all questions before submitting.";
            if (feedback) {
              feedback.textContent = "";
            }
            return;
          }
          lessonQuizResults[String(lessonId)] = result;
          saveQuizResults(currentCourseId, lessonQuizResults);
          markLessonVisited(lessonId);

          const passed = result.score === QUIZ_PASS_SCORE;
          submitButton.disabled = true;
          Array.from(lessonQuizBody.querySelectorAll("input[type='radio']")).forEach(input => {
            input.disabled = true;
          });

          if (passed) {
            lessonQuizStatus.textContent = "Perfect Score";
            lessonQuizStatus.className = "badge bg-success-subtle text-success";
            lessonQuizResult.className = "alert alert-success";
            lessonQuizResult.innerHTML = `<p class="mb-1">Score: ${result.score}% – Great work!</p>`;
            if (feedback) {
              feedback.textContent = "Perfect score achieved.";
            }
          } else {
            lessonQuizStatus.textContent = "Submitted";
            lessonQuizStatus.className = "badge bg-warning-subtle text-warning";
            const missedList = result.missed.length
              ? `<ul class="mb-0">${result.missed
                  .map(item => `<li><strong>${item.prompt}</strong>: ${item.explanation}</li>`)
                  .join("")}</ul>`
              : "";
            lessonQuizResult.className = "alert alert-secondary";
            lessonQuizResult.innerHTML = `<p class="mb-1">Score: ${result.score}% – Quiz submitted.</p>${missedList}`;
            if (feedback) {
              feedback.textContent = "Review the explanations above. Quiz attempts cannot be retaken.";
            }
          }
          updateModuleProgressUI();
        });
      }
    } else {
      const feedback = document.getElementById("lessonQuizFeedback");
      if (feedback) {
        feedback.textContent = isPassed
          ? "Quiz already completed with a perfect score."
          : "Quiz already submitted. Review the feedback above.";
      }
      if (!visitedLessonIds.has(lessonId)) {
        markLessonVisited(lessonId);
      }

      const resetButton = document.getElementById("lessonQuizReset");
      if (resetButton) {
        resetButton.addEventListener("click", () => {
          resetLessonAssessment(lessonId);
          renderQuiz(lesson);
          showAlert("info", "Quiz has been reset. Submit new answers to improve your score.");
          announceCourseCompletion();
        });
      }
    }
  }

  function gradeQuiz(lesson) {
    if (!lesson || !lesson.quiz) return null;
    const lessonId = Number(lesson.id);
    const responses = {};
    const missed = [];
    let correctCount = 0;
    let answeredCount = 0;

    lesson.quiz.questions.forEach(question => {
      const groupName = `${lessonId}-${question.id}`;
      const selected = lessonQuizBody?.querySelector(`input[name="${groupName}"]:checked`);
      const value = selected ? selected.value : null;
      responses[question.id] = value;
      if (value !== null) {
        answeredCount += 1;
      }
      if (value === question.answer) {
        correctCount += 1;
      } else {
        missed.push({ prompt: question.prompt, explanation: question.explanation || "Review the lesson above." });
      }
    });

    const totalQuestions = lesson.quiz.questions.length;
    if (!totalQuestions) {
      return { score: QUIZ_PASS_SCORE, responses, missed: [], incomplete: false };
    }

    if (answeredCount < totalQuestions) {
      return { score: 0, responses, missed: [], incomplete: true };
    }

    const score = Math.round((correctCount / totalQuestions) * 100);
    return { score, responses, missed, incomplete: false };
  }

  function buildUserDisplayName(user) {
    if (!user || typeof user !== "object") return "";

    const nameParts = [];
    if (typeof user.first_name === "string" && user.first_name.trim()) {
      nameParts.push(user.first_name.trim());
    }
    if (typeof user.middle_name === "string" && user.middle_name.trim()) {
      nameParts.push(user.middle_name.trim());
    }
    if (typeof user.last_name === "string" && user.last_name.trim()) {
      nameParts.push(user.last_name.trim());
    }

    const joined = nameParts.join(" ").replace(/\s+/g, " ").trim();
    if (joined) return joined;

    const fallbackFields = ["name", "full_name", "display_name"];
    for (const field of fallbackFields) {
      const value = user[field];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }

    if (typeof user.email === "string" && user.email.trim()) {
      return user.email.trim();
    }

    return "";
  }

  function decorateNameWithRole(user, displayName) {
    if (!displayName) return displayName;
    const role = getUserRole(user);
    if (role === "instructor") {
      const hasPrefix = displayName.toLowerCase().startsWith("instructor ");
      if (hasPrefix) {
        return displayName;
      }
      return `Instructor ${displayName}`;
    }
    return displayName;
  }

  function getCourseInstructorName(course) {
    if (!course || typeof course !== "object") {
      return providerName;
    }

    const instructorId = Number(course.instructor_id);
    if (Number.isFinite(instructorId) && Array.isArray(instructors)) {
      const record = instructors.find(user => Number(user.id) === instructorId);
      const displayName = decorateNameWithRole(record, buildUserDisplayName(record));
      if (displayName) return displayName;
    }

    const activeUser = getActiveUser();
    if (Number.isFinite(Number(activeUser?.id)) && Number(activeUser.id) === instructorId) {
      const activeName = decorateNameWithRole(activeUser, buildUserDisplayName(activeUser));
      if (activeName) return activeName;
    }

    const courseFields = [
      "instructor_name",
      "created_by_name",
      "created_by_full_name",
      "owner_name",
      "prepared_by"
    ];
    for (const field of courseFields) {
      const value = course[field];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }

    return providerName;
  }

  function formatMeta(course) {
    const parts = [];
    if (course.category) parts.push(`<span>Category: <strong>${course.category}</strong></span>`);
    if (course.duration_hours) parts.push(`<span>Duration: <strong>${course.duration_hours} hrs</strong></span>`);
    if (course.delivery) parts.push(`<span>Format: <strong>${course.delivery}</strong></span>`);
    if (course.cost) parts.push(`<span>Cost: <strong>${course.cost}</strong></span>`);
    const instructorDisplayName = getCourseInstructorName(course);
    parts.push(`<span>Prepared by: <strong>${instructorDisplayName}</strong></span>`);
    return parts.join("<span class=\"meta-divider\">•</span>");
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

  function buildCourseThumbnailPlaceholder(course) {
    const colorStart = "#22c55e"; // green
    const colorEnd = "#000000"; // black
    const rawTitle = (course?.title || "Course").trim();
    const maxLength = 42;
    const truncated = rawTitle.length > maxLength ? `${rawTitle.slice(0, maxLength - 1)}…` : rawTitle;
    const safeTitle = typeof escapeHtml === "function" ? escapeHtml(truncated) : truncated;

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="320" height="180" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="courseHeroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorStart}" />
      <stop offset="100%" stop-color="${colorEnd}" />
    </linearGradient>
  </defs>
  <rect width="320" height="180" fill="url(#courseHeroGradient)" rx="16" ry="16" />
  <text x="50%" y="56%" text-anchor="middle" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-size="22" font-weight="600" fill="#ecfdf5">
    ${safeTitle}
  </text>
</svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function renderCourse() {
    if (!currentCourse) {
      showAlert("warning", "Course not found. Return to the <a href='courses.html' class='alert-link'>courses list</a>.");
      courseHero.hidden = true;
      courseContent.hidden = true;
      return;
    }

    clearAlert();
    courseTitle.textContent = currentCourse.title;
    courseSummary.textContent = currentCourse.description || "";
    courseMeta.innerHTML = formatMeta(currentCourse);

    courseBadgeWrap.innerHTML = "";
    if (currentCourse.level) {
      courseLevelPill.textContent = currentCourse.level;
    } else {
      courseLevelPill.textContent = "";
    }

    if (courseTitle) {
      courseTitle.classList.add("visually-hidden");
    }

    const banner = document.createElement("div");
    banner.className = "course-hero-banner";
    banner.textContent = currentCourse.title || "Course";
    courseBadgeWrap.appendChild(banner);

    const activeUser = getActiveUser();
    const activeRole = getUserRole(activeUser);
    const isInstructorRole = activeRole === "instructor" || activeRole === "admin";

    if (isInstructorRole) {
      coursePrimaryAction.classList.add("d-none");
      courseSecondaryAction.textContent = "Back to catalog";
      courseSecondaryAction.onclick = null;
      courseSecondaryAction.onclick = () => {
        window.location.href = "courses.html";
      };
      if (courseManageActions) {
        if (currentCourse.status !== "published") {
          courseManageActions.classList.remove("d-none");
        } else {
          courseManageActions.classList.add("d-none");
        }
        
        
        
      }
      updatePublishButton(currentCourse, activeRole);
    } else {
      coursePrimaryAction.classList.remove("d-none");
      coursePrimaryAction.textContent = "Start Learning";
      coursePrimaryAction.onclick = null;
      coursePrimaryAction.onclick = () => {
        if (courseLessons.length) {
          activateLesson(courseLessons[0].id);
        } else {
          showAlert("info", "This course does not have lessons yet.");
        }
      };

      courseSecondaryAction.textContent = "Back to catalog";
      courseSecondaryAction.onclick = null;
      courseSecondaryAction.onclick = () => {
        window.location.href = "courses.html";
      };
      if (courseManageActions) {
        courseManageActions.classList.add("d-none");
      }
      updatePublishButton(null, activeRole);
    }

    courseHero.hidden = false;
    courseContent.hidden = false;
    if (!isInstructorRole) {
      announceCourseCompletion();
    }
  }

  function renderOutline() {
    if (!lessonOutline) return;
    if (!courseLessons.length) {
      lessonOutline.innerHTML = "<div class='text-muted'>Lessons will appear here once added.</div>";
      lessonCountCaption.textContent = "No lessons available";
      return;
    }

    const viewer = getActiveUser();
    const viewerRole = getUserRole(viewer);
    const isStudentRole = viewerRole === "student";
    const canManageLessons =
      (viewerRole === "instructor" || viewerRole === "admin") &&
      currentCourse &&
      currentCourse.status !== "published";

    const sortedLessons = [...courseLessons].sort((a, b) => {
      const moduleA = a.module_sort_order ?? 999;
      const moduleB = b.module_sort_order ?? 999;
      if (moduleA !== moduleB) return moduleA - moduleB;
      const orderA = a.sort_order ?? Number.POSITIVE_INFINITY;
      const orderB = b.sort_order ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) return orderA - orderB;
      const indexA = a.lesson_index || "zz";
      const indexB = b.lesson_index || "zz";
      return indexA.localeCompare(indexB, undefined, { numeric: true, sensitivity: "base" });
    });

    const moduleMap = new Map();
    sortedLessons.forEach(lesson => {
      const moduleKey = `${lesson.module_sort_order ?? 999}_${lesson.module_title || "General Module"}`;
      if (!moduleMap.has(moduleKey)) {
        moduleMap.set(moduleKey, {
          key: moduleKey,
          title: lesson.module_title || `Module ${moduleMap.size + 1}`,
          description: lesson.module_description || "",
          sortOrder: lesson.module_sort_order ?? moduleMap.size + 1,
          lessons: []
        });
      }
      moduleMap.get(moduleKey)?.lessons.push(lesson);
      lesson.moduleKey = moduleKey;
    });

    const modules = Array.from(moduleMap.values()).sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return a.title.localeCompare(b.title);
    });

    courseModules = modules.map(module => ({
      ...module,
      lessons: [...module.lessons]
    }));

    lessonCountCaption.textContent = `${modules.length} module${modules.length === 1 ? "" : "s"} · ${courseLessons.length} lesson${courseLessons.length === 1 ? "" : "s"}`;

    let numberedModuleCounter = 0;

    lessonOutline.innerHTML = modules
      .map(module => {
        const totalLessons = module.lessons.length;
        const visitedLessonsCount = isStudentRole
          ? module.lessons.filter(lesson => visitedLessonIds.has(Number(lesson.id))).length
          : 0;
        const percent = isStudentRole && totalLessons
          ? Math.round((visitedLessonsCount / totalLessons) * 100)
          : 0;

        const isNumberedModule = module.sortOrder !== 0 && module.sortOrder !== 99;
        const moduleNumber = isNumberedModule ? ++numberedModuleCounter : null;
        const moduleTitleLabel = moduleNumber ? `Module ${moduleNumber}: ${module.title}` : module.title;

        const lessonsMarkup = module.lessons
          .map(lesson => {
            const lessonVisited = isStudentRole && visitedLessonIds.has(Number(lesson.id));
            const hasVideo = Boolean(lesson.video_url);
            const lessonStatus = lessonVisited
              ? '<span class="badge bg-success-subtle text-success module-lesson-status">Done</span>'
              : "";
            return `
              <button type="button" class="list-group-item list-group-item-action module-lesson d-flex justify-content-between align-items-start${lessonVisited ? " visited" : ""}" data-lesson="${lesson.id}">
                <div class="module-lesson-copy">
                  <div class="fw-semibold">${lesson.lesson_index ? `${lesson.lesson_index} ` : ""}${lesson.title}</div>
                  <div class="small text-muted">${lesson.module_title || "Module"}${lesson.lesson_index ? ` · Lesson ${lesson.lesson_index}` : ""}</div>
                </div>
                <div class="module-lesson-meta d-flex gap-2 align-items-center">
                  ${hasVideo ? '<span class="badge bg-success-subtle text-success">Video</span>' : ""}
                  ${lessonStatus}
                  ${canManageLessons ? `
                  <span role="button" tabindex="0" class="module-lesson-edit" data-lesson-edit="${lesson.id}" title="Edit lesson" aria-label="Edit lesson">
                    <span class="module-lesson-edit-icon" aria-hidden="true">✏</span>
                  </span>
                  <span role="button" tabindex="0" class="module-lesson-delete" data-lesson-delete="${lesson.id}" title="Delete lesson" aria-label="Delete lesson">
                    <svg class="module-lesson-delete-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path fill="currentColor" d="M9 2a1 1 0 0 0-1 1v1H5.5a1 1 0 0 0 0 2h.32l.7 11.66A2.5 2.5 0 0 0 9.01 20h5.98a2.5 2.5 0 0 0 2.49-2.34L18.19 6H18.5a1 1 0 1 0 0-2H16V3a1 1 0 0 0-1-1H9Zm1 .5h4a.5.5 0 0 1 .5.5v1h-5V3a.5.5 0 0 1 .5-.5Zm-.73 6.75a.75.75 0 0 1 .8.7l.3 6.5a.75.75 0 1 1-1.5.07l-.3-6.5a.75.75 0 0 1 .7-.77Zm4.8.7.3 6.5a.75.75 0 0 1-1.5.07l-.3-6.5a.75.75 0 1 1 1.5-.07Z" />
                    </svg>
                  </span>
                  ` : ""}
                </div>
              </button>
            `;
          })
          .join("");

        const progressMarkup = isStudentRole
          ? `
                <div class="module-progress">
                  <div class="progress progress-thin" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" aria-valuenow="${percent}" style="width: ${percent}%"></div>
                  </div>
                  <small class="module-progress-caption">${visitedLessonsCount} / ${totalLessons} lesson${totalLessons === 1 ? "" : "s"} completed</small>
                </div>
            `
          : "";

        return `
          <div class="module-section" data-module-key="${module.key}">
            <button type="button" class="module-header list-group-item list-group-item-action d-flex justify-content-between align-items-start" data-module-toggle="${module.key}">
              <div class="flex-grow-1">
                <div class="fw-semibold">${moduleTitleLabel}</div>
                ${module.description ? `<div class="small text-muted">${module.description}</div>` : ""}
                ${progressMarkup}
              </div>
              <div class="badge bg-light text-success">${totalLessons} lesson${totalLessons === 1 ? "" : "s"}</div>
            </button>
            <div class="module-lesson-list">
              ${lessonsMarkup}
            </div>
          </div>
        `;
      })
      .join("");

    updateModuleProgressUI();
    const outlineViewer = getActiveUser();
    if (getUserRole(outlineViewer) === "student") {
      announceCourseCompletion();
    }
  }

  function renderLesson(lesson) {
    if (!lesson) {
      lessonTitle.textContent = "Select a lesson to begin";
      lessonMeta.textContent = "";
      lessonContent.innerHTML = "";
      lessonVideoWrapper.hidden = true;
      downloadResource.hidden = true;
      resetLessonScrollTracking(null);
      renderQuiz(null);
      updateModuleNavButtons(null);
      return;
    }

    lessonTitle.textContent = lesson.title || "Untitled lesson";

    let metaLine = "";
    const hasModuleTitle = Boolean(lesson.module_title);
    const hasOverview = Boolean(lesson.lesson_index);

    if (hasModuleTitle) {
      metaLine = lesson.module_title;
    }

    if (hasOverview) {
      // Treat lesson_index as the Lesson Overview text shown on a new line,
      // but keep a simple "Lesson" label on the first meta line.
      metaLine = metaLine ? `${metaLine} · Lesson` : "Lesson";
    } else if (lesson.sort_order) {
      metaLine = metaLine
        ? `${metaLine} · Lesson ${lesson.sort_order}`
        : `Lesson ${lesson.sort_order}`;
    }

    if (hasOverview) {
      lessonMeta.innerHTML = `${metaLine}<br>${lesson.lesson_index}`;
    } else {
      lessonMeta.textContent = metaLine || "On-demand lesson";
    }

    lessonContent.innerHTML = lesson.content || "<p class='text-muted'>No content available.</p>";

    if (lesson.video_url) {
      lessonVideoWrapper.hidden = false;
      lessonVideo.src = lesson.video_url;
    } else {
      lessonVideoWrapper.hidden = true;
      lessonVideo.src = "";
    }

    if (lesson.file_url) {
      downloadResource.hidden = false;
      downloadResource.href = lesson.file_url;
    } else {
      downloadResource.hidden = true;
      downloadResource.removeAttribute("href");
    }

    resetLessonScrollTracking(lesson);
    const lessonViewer = getActiveUser();
    const lessonViewerRole = getUserRole(lessonViewer);

    const isStudentViewer = lessonViewerRole === "student";
    renderQuiz(lesson, { readOnly: !isStudentViewer });

    if (isStudentViewer) {
      updateModuleNavButtons(lesson);
      announceCourseCompletion();
    } else {
      prevModuleBtn.hidden = true;
      nextModuleBtn.hidden = true;
    }
  }

  function activateLesson(lessonId) {
    const target = courseLessons.find(item => Number(item.id) === Number(lessonId));
    if (!target) return;
    activeLessonId = target.id;
    renderLesson(target);

    const lessonButton = lessonOutline.querySelector(`[data-lesson="${lessonId}"]`);
    if (lessonButton) {
      const section = lessonButton.closest(".module-section");
      if (section && section.classList.contains("collapsed")) {
        section.classList.remove("collapsed");
      }
      syncCourseOutlineFocus(lessonButton);
    }

    lessonOutline.querySelectorAll("[data-lesson]").forEach(button => {
      button.classList.toggle("active", Number(button.dataset.lesson) === Number(lessonId));
    });

    const activeViewer = getActiveUser();
    if (getUserRole(activeViewer) === "student") {
      updateModuleProgressUI();
    }
  }

  function updateModuleNavButtons(lesson) {
    if (!prevModuleBtn || !nextModuleBtn) return;
    if (!lesson || !courseModules.length) {
      prevModuleBtn.hidden = true;
      nextModuleBtn.hidden = true;
      delete prevModuleBtn.dataset.targetIndex;
      delete nextModuleBtn.dataset.targetIndex;
      return;
    }

    const moduleKey = lesson.moduleKey || getModuleKey(lesson);
    const moduleIndex = courseModules.findIndex(module => module.key === moduleKey);

    if (moduleIndex === -1) {
      prevModuleBtn.hidden = true;
      nextModuleBtn.hidden = true;
      delete prevModuleBtn.dataset.targetIndex;
      delete nextModuleBtn.dataset.targetIndex;
      return;
    }

    const hasPrev = moduleIndex > 0;
    const hasNext = moduleIndex < courseModules.length - 1;

    prevModuleBtn.hidden = !hasPrev;
    nextModuleBtn.hidden = !hasNext;

    if (hasPrev) {
      prevModuleBtn.dataset.targetIndex = String(moduleIndex - 1);
    } else {
      delete prevModuleBtn.dataset.targetIndex;
    }

    if (hasNext) {
      nextModuleBtn.dataset.targetIndex = String(moduleIndex + 1);
    } else {
      delete nextModuleBtn.dataset.targetIndex;
    }
  }

  function navigateToModule(moduleIndex) {
    if (!Array.isArray(courseModules) || !courseModules.length) return;
    const targetModule = courseModules[moduleIndex];
    if (!targetModule) return;
    const lessons = [...targetModule.lessons].sort((a, b) => {
      const orderA = a.sort_order ?? Number.POSITIVE_INFINITY;
      const orderB = b.sort_order ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) return orderA - orderB;
      const indexA = a.lesson_index || "zz";
      const indexB = b.lesson_index || "zz";
      return indexA.localeCompare(indexB, undefined, { numeric: true, sensitivity: "base" });
    });
    const targetLesson = lessons[0];
    if (targetLesson) {
      activateLesson(targetLesson.id);
    }
  }

  function handleModuleNav(direction) {
    if (!Number.isFinite(direction) || !courseModules.length) return;
    if (!activeLessonId) return;
    const activeLesson = courseLessons.find(item => Number(item.id) === Number(activeLessonId));
    if (!activeLesson) return;
    const moduleKey = activeLesson.moduleKey || getModuleKey(activeLesson);
    const moduleIndex = courseModules.findIndex(module => module.key === moduleKey);
    if (moduleIndex === -1) return;
    const targetIndex = moduleIndex + direction;
    if (targetIndex < 0 || targetIndex >= courseModules.length) return;
    navigateToModule(targetIndex);
  }

  function attachOutlineEvents() {
    lessonOutline.addEventListener("click", event => {
      const moduleToggle = event.target.closest("[data-module-toggle]");
      if (moduleToggle) {
        const section = moduleToggle.closest(".module-section");
        if (section) {
          section.classList.toggle("collapsed");
        }
        return;
      }

      const editTrigger = event.target.closest("[data-lesson-edit]");
      if (editTrigger) {
        event.preventDefault();
        event.stopPropagation();
        const lessonId = Number(editTrigger.dataset.lessonEdit);
        if (Number.isFinite(lessonId)) {
          const target = courseLessons.find(item => Number(item.id) === Number(lessonId));
          if (isPreTestLesson(target)) {
            openPreTestEditModal(lessonId);
          } else if (isPostTestLesson(target)) {
            openPostTestEditModal(lessonId);
          } else {
            openEditLessonModal(lessonId);
          }
        }
        return;
      }

      const deleteTrigger = event.target.closest("[data-lesson-delete]");
      if (deleteTrigger) {
        event.preventDefault();
        event.stopPropagation();
        const lessonId = Number(deleteTrigger.dataset.lessonDelete);
        if (Number.isFinite(lessonId)) {
          handleLessonDelete(lessonId);
        }
        return;
      }

      const button = event.target.closest("[data-lesson]");
      if (!button) return;
      activateLesson(button.dataset.lesson);
    });

    lessonOutline.addEventListener("keydown", event => {
      const editTrigger = event.target.closest("[data-lesson-edit]");
      if (editTrigger && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        const lessonId = Number(editTrigger.dataset.lessonEdit);
        if (Number.isFinite(lessonId)) {
          const target = courseLessons.find(item => Number(item.id) === Number(lessonId));
          if (isPreTestLesson(target)) {
            openPreTestEditModal(lessonId);
          } else if (isPostTestLesson(target)) {
            openPostTestEditModal(lessonId);
          } else {
            openEditLessonModal(lessonId);
          }
        }
        return;
      }

      const deleteTrigger = event.target.closest("[data-lesson-delete]");
      if (deleteTrigger && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        const lessonId = Number(deleteTrigger.dataset.lessonDelete);
        if (Number.isFinite(lessonId)) {
          handleLessonDelete(lessonId);
        }
      }
    });
  }

  async function deleteLessonWithRelations(lessonId) {
    const client = window.supabaseClient;
    if (!client) {
      throw new Error("Database connection is unavailable. Please refresh the page.");
    }

    const { data: questions, error: questionsError } = await client
      .from("quiz_questions")
      .select("id")
      .eq("lesson_id", lessonId);

    if (questionsError) {
      throw questionsError;
    }

    if (Array.isArray(questions) && questions.length) {
      const questionIds = questions.map(question => question.id);
      const { error: optionsError } = await client
        .from("quiz_options")
        .delete()
        .in("question_id", questionIds);
      if (optionsError) {
        throw optionsError;
      }

      const { error: deleteQuestionsError } = await client
        .from("quiz_questions")
        .delete()
        .in("id", questionIds);
      if (deleteQuestionsError) {
        throw deleteQuestionsError;
      }
    }

    const { error: deleteLessonError } = await client
      .from("lessons")
      .delete()
      .eq("id", lessonId);
    if (deleteLessonError) {
      throw deleteLessonError;
    }
  }

  async function handleLessonDelete(lessonId) {
    const viewer = getActiveUser();
    const viewerRole = getUserRole(viewer);
    if (viewerRole !== "instructor" && viewerRole !== "admin") {
      return;
    }

    const confirmed = await showConfirm({
      title: "Delete lesson",
      body: "Are you sure you want to delete this lesson? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmClass: "btn btn-danger",
      cancelClass: "btn btn-outline-secondary"
    });

    if (!confirmed) return;

    try {
      await deleteLessonWithRelations(lessonId);
      await loadCourse(currentCourseId);
      showAlert("success", "Lesson deleted successfully.");
    } catch (error) {
      console.error("Failed to delete lesson", error);
      showAlert("danger", error.message || "Unable to delete lesson. Please try again.");
    }
  }

  async function loadCourse(courseId) {
    try {
      const [
        courseResponse,
        lessonsResponse,
        usersResponse,
        enrollmentsResponse,
        badgesResponse
      ] = await Promise.allSettled([
        window.apiRequest(endpoints.courses, { params: { id: courseId } }),
        window.apiRequest(endpoints.lessons, { params: { course_id: courseId } }),
        window.apiRequest(endpoints.users),
        window.apiRequest(endpoints.enrollments),
        window.apiRequest(endpoints.badges)
      ]);

      if (courseResponse.status === "rejected") {
        console.warn("Failed to fetch course from API", courseResponse.reason);
      }
      if (lessonsResponse.status === "rejected") {
        console.warn("Failed to fetch lessons from API", lessonsResponse.reason);
      }
      if (usersResponse.status === "rejected") {
        console.warn("Failed to fetch users from API", usersResponse.reason);
      }
      if (enrollmentsResponse.status === "rejected") {
        console.warn("Failed to fetch enrollments from API", enrollmentsResponse.reason);
      }
      if (badgesResponse.status === "rejected") {
        console.warn("Failed to fetch badges from API", badgesResponse.reason);
      }

      const courseData = courseResponse.status === "fulfilled" ? courseResponse.value : null;
      const lessonsData = lessonsResponse.status === "fulfilled" ? lessonsResponse.value : [];
      const usersData = usersResponse.status === "fulfilled" ? usersResponse.value : [];
      const enrollmentsData = enrollmentsResponse.status === "fulfilled" ? enrollmentsResponse.value : [];
      const badgesData = badgesResponse.status === "fulfilled" ? badgesResponse.value : [];

      currentCourseId = Number(courseId);
      if (Array.isArray(courseData)) {
        currentCourse = courseData.find(item => Number(item.id) === Number(courseId)) || null;
      } else if (courseData && typeof courseData === "object") {
        currentCourse = Number(courseData.id) === Number(courseId) ? courseData : null;
      } else {
        currentCourse = null;
      }

      if (!currentCourse && window.sessionStorage) {
        try {
          const cachedRaw = window.sessionStorage.getItem("dbs_selected_course");
          if (cachedRaw) {
            const cached = JSON.parse(cachedRaw);
            if (Number(cached?.id) === Number(courseId)) {
              currentCourse = cached;
            }
          }
        } catch (storageError) {
          console.warn("Failed to read cached course", storageError);
        }
      }
      courseLessons = Array.isArray(lessonsData)
        ? lessonsData.filter(item => Number(item.course_id) === Number(courseId))
        : [];

      const supabaseActive = Boolean(supabaseClient?.from);
      if (supabaseActive && courseLessons.length) {
        const lessonIds = courseLessons
          .map(lesson => Number(lesson.id))
          .filter(Number.isFinite);

        if (lessonIds.length) {
          try {
            const { data: quizQuestionsData, error: quizQuestionsError } = await supabaseClient
              .from("quiz_questions")
              .select("*")
              .in("lesson_id", lessonIds);
            if (quizQuestionsError) throw quizQuestionsError;

            const questionIds = Array.isArray(quizQuestionsData)
              ? quizQuestionsData.map(row => Number(row.id)).filter(Number.isFinite)
              : [];

            const { data: quizOptionsData, error: quizOptionsError } = questionIds.length
              ? await supabaseClient
                  .from("quiz_options")
                  .select("*")
                  .in("question_id", questionIds)
              : { data: [], error: null };
            if (quizOptionsError) throw quizOptionsError;

            const questionsByLesson = Array.isArray(quizQuestionsData)
              ? quizQuestionsData.reduce((collection, row) => {
                  const lessonId = Number(row.lesson_id);
                  if (!Number.isFinite(lessonId)) return collection;
                  if (!collection[lessonId]) {
                    collection[lessonId] = { intro: row.intro || null, questions: [] };
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

            courseLessons = courseLessons.map(lesson => {
              const lessonId = Number(lesson.id);
              const bundle = questionsByLesson[lessonId];
              if (!bundle) {
                return Object.assign({}, lesson, { quiz: null });
              }

              const orderedQuestions = [...bundle.questions].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
              return Object.assign({}, lesson, {
                quiz: {
                  intro: bundle.intro,
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
            });
          } catch (quizError) {
            console.warn("Failed to load quiz questions for lessons", quizError);
            courseLessons = courseLessons.map(lesson => Object.assign({}, lesson, { quiz: lesson.quiz ?? null }));
          }
        }
      }

      const badgeRecords = Array.isArray(badgesData) ? badgesData : [];
      courseBadge = badgeRecords.find(item => Number(item.id) === Number(currentCourse?.badge_id)) || null;
      const activeViewer = getActiveUser();
      const viewerRole = getUserRole(activeViewer);
      const isStudentRole = viewerRole === "student";
      if (isStudentRole) {
        visitedLessonIds = loadVisitedLessons(currentCourseId);
        lessonQuizResults = loadQuizResults(currentCourseId);
        sanitizeVisitedLessons();
        const storedCompletion = loadCourseCompletion(currentCourseId);
        if (storedCompletion) {
          lastCompletionAverage = Number.isFinite(Number(storedCompletion.average))
            ? Number(storedCompletion.average)
            : null;
          lastCompletionResultLabel = typeof storedCompletion.result === "string"
            ? storedCompletion.result.toUpperCase()
            : typeof storedCompletion.status === "string"
              ? storedCompletion.status.toUpperCase()
              : null;
          lastCompletionIssuedDate = storedCompletion.recorded_at || storedCompletion.issued_at || null;
          lastCompletionSummary = cloneSummary(storedCompletion.summary);
        }
      } else {
        visitedLessonIds = new Set();
        lessonQuizResults = {};
        lastCompletionAverage = null;
        lastCompletionResultLabel = null;
        lastCompletionIssuedDate = null;
        lastCompletionSummary = null;
      }
      instructors = Array.isArray(usersData) ? usersData.filter(item => item.role === "instructor" || item.role === "admin") : [];
      enrollments = Array.isArray(enrollmentsData) ? enrollmentsData : [];

      renderCourse();
      updatePublishButton(currentCourse, viewerRole);
      renderOutline();
      attachOutlineEvents();

      if (courseLessons.length) {
        if (isStudentRole) {
          activateLesson(courseLessons[0].id);
        } else {
          activeLessonId = null;
          renderLesson(null);
          lessonOutline?.querySelectorAll("[data-lesson]")?.forEach(button => {
            button.classList.remove("active");
          });
        }
      } else {
        renderLesson(null);
      }
    } catch (error) {
      console.error(error);
      showAlert("danger", error.message || "Failed to load course details.");
    }
  }

  function handleLessonScroll() {
    if (!lessonContent || !lessonScrollProgress) return;
    const user = getActiveUser();
    if (getUserRole(user) !== "student") return;

    const activeLessonId = Number(lessonContent.dataset.lessonId);
    const activeLesson = Number.isFinite(activeLessonId) ? getLessonById(activeLessonId) : null;
    const hasQuiz = Boolean(activeLesson && activeLesson.quiz && Array.isArray(activeLesson.quiz.questions) && activeLesson.quiz.questions.length);

    // For lessons with quizzes (pre-test, post-test, lesson quizzes), keep progress at 0%
    // until the quiz has been fully completed. Scrolling alone should not move the bar.
    if (hasQuiz && !isLessonQuizComplete(activeLessonId)) {
      lessonScrollMaxProgress = 0;
      updateLessonScrollIndicator(0);
      return;
    }

    const scrollSource = lessonScrollContainer || lessonContent;
    const { scrollTop, scrollHeight, clientHeight } = scrollSource;
    if (!scrollHeight) {
      updateLessonScrollIndicator(0);
      return;
    }

    const rawProgress = ((scrollTop + clientHeight) / scrollHeight) * 100;
    const progress = Math.max(0, Math.min(100, Math.round(rawProgress)));
    const nextProgress = Math.max(lessonScrollMaxProgress, progress);
    lessonScrollMaxProgress = nextProgress;
    updateLessonScrollIndicator(nextProgress);

    if (nextProgress >= LESSON_SCROLL_COMPLETE_THRESHOLD) {
      if (Number.isFinite(activeLessonId) && !visitedLessonIds.has(activeLessonId)) {
        markLessonVisited(activeLessonId);
      }
    }
  }

  if (prevModuleBtn) {
    prevModuleBtn.addEventListener("click", () => handleModuleNav(-1));
  }

  if (nextModuleBtn) {
    nextModuleBtn.addEventListener("click", () => handleModuleNav(1));
  }

  if (editLessonForm) {
    editLessonForm.addEventListener("submit", handleEditLessonSubmit);
  }

  if (lessonQuizEditForm) {
    lessonQuizEditForm.addEventListener("submit", handleLessonQuizEditSubmit);
  }

  if (lessonQuizEditItemCount && lessonQuizEditQuestions) {
    const syncLessonQuizEditCount = () => {
      const parsed = Math.max(0, Number.parseInt(lessonQuizEditItemCount.value, 10) || 0);
      lessonQuizEditItemCount.value = parsed;
      setLessonQuizEditQuestionCount(parsed);
    };
    lessonQuizEditItemCount.addEventListener("input", syncLessonQuizEditCount);
    lessonQuizEditItemCount.addEventListener("change", syncLessonQuizEditCount);
  }

  if (lessonQuizEditModalElement) {
    lessonQuizEditModalElement.addEventListener("hidden.bs.modal", () => {
      resetLessonQuizEditForm();
    });
  }

  if (editLessonQuizButton) {
    editLessonQuizButton.addEventListener("click", () => {
      if (!Number.isFinite(editingLessonId)) return;
      openLessonQuizEditModal(editingLessonId);
    });
  }

  function init() {
    const courseId = getQueryParam("id");
    if (!courseId) {
      showAlert("warning", "Missing course ID. Return to the <a href='courses.html' class='alert-link'>courses list</a>.");
      return;
    }

    loadCourse(courseId);

    if (courseManageActions) {
      courseManageActions.addEventListener("click", async event => {
        const button = event.target.closest("[data-manage-action]");
        if (!button || !currentCourse) return;
        const kind = button.dataset.manageAction;
        if (kind === "pre-test") {
          await openPreTestModalForCourse(currentCourse);
          return;
        }

        if (kind === "post-test") {
          await openPostTestModalForCourse(currentCourse);
          return;
        }

        if (kind === "module") {
          await openModuleLessonsModalForCourse(currentCourse);
          return;
        }

        const defaultKind = kind === "post-test" ? "post-test" : "lesson";
        openLessonModalForCourse(currentCourse, defaultKind);
      });
    }
  }

  if (lessonScrollContainer) {
    lessonScrollContainer.addEventListener("scroll", handleLessonScroll, { passive: true });
  } else if (lessonContent) {
    lessonContent.addEventListener("scroll", handleLessonScroll, { passive: true });
  }

  if (publishCourseButton) {
    publishCourseButton.addEventListener("click", publishCourse);
  }

  document.addEventListener("DOMContentLoaded", init);
