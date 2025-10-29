(function () {
  const defaultConfig = { baseUrl: "api/", mode: "mock" };
  const config = Object.assign({}, defaultConfig, window.apiConfig || {});

  const storageKey = "dbs_mock_store_v1";
  const resourceMap = {
    "students.php": "students",
    "subjects.php": "subjects",
    "badges.php": "badges",
    "issued_badges.php": "issued_badges",
    "users.php": "users",
    "courses.php": "courses",
    "lessons.php": "lessons",
    "enrollments.php": "enrollments"
  };

  const managedResources = [
    "users",
    "students",
    "subjects",
    "badges",
    "issued_badges",
    "courses",
    "lessons",
    "enrollments"
  ];

  function getSeed() {
    const seed = config.seed;
    return seed && typeof seed === "object" ? seed : null;
  }

  function createEmptyStore() {
    return managedResources.reduce(
      (store, resource) => {
        if (resource === "_nextIds") return store;
        store[resource] = [];
        return store;
      },
      {
        _nextIds: {
          users: 1,
          students: 1,
          subjects: 1,
          badges: 1,
          issued_badges: 1,
          courses: 1,
          lessons: 1,
          enrollments: 1
        }
      }
    );
  }

  function normalizeRecord(resource, record) {
    const input = record && typeof record === "object" ? record : {};
    const normalized = Object.assign({}, input);
    if (resource === "issued_badges") {
      normalized.student_id = toNumber(input.student_id);
      normalized.subject_id = toNumber(input.subject_id);
      normalized.badge_id = toNumber(input.badge_id);
      normalized.course_id = toNumber(input.course_id);
    }

    if (resource === "courses") {
      normalized.instructor_id = toNumber(input.instructor_id);
      normalized.badge_id = toNumber(input.badge_id);
      normalized.status = typeof input.status === "string" ? input.status : "draft";
      normalized.category = typeof input.category === "string" ? input.category : "General";
      normalized.thumbnail_url = typeof input.thumbnail_url === "string" ? input.thumbnail_url : "";
    }

    if (resource === "lessons") {
      normalized.course_id = toNumber(input.course_id);
      normalized.sort_order = toNumber(input.sort_order) ?? 1;
      normalized.file_url = typeof input.file_url === "string" ? input.file_url : "";
      normalized.video_url = typeof input.video_url === "string" ? input.video_url : "";
      normalized.content = typeof input.content === "string" ? input.content : "";
    }

    if (resource === "enrollments") {
      normalized.student_id = toNumber(input.student_id);
      normalized.course_id = toNumber(input.course_id);
      const progress = toNumber(input.progress);
      normalized.progress = progress === null ? 0 : Math.min(Math.max(progress, 0), 100);
      normalized.status = typeof input.status === "string" ? input.status : "in-progress";
      normalized.completed_at = input.completed_at ?? null;
      normalized.completed_lessons = Array.isArray(input.completed_lessons)
        ? Array.from(new Set(input.completed_lessons.map(toNumber).filter(value => value !== null)))
        : [];
    }
    return normalized;
  }

  function sanitizeStore(rawStore) {
    const source = rawStore && typeof rawStore === "object" ? rawStore : {};
    const sanitized = createEmptyStore();

    managedResources.forEach(resource => {
      const collection = Array.isArray(source[resource]) ? source[resource] : [];
      const seenIds = new Set();

      let nextId = toNumber(source._nextIds?.[resource]);
      if (!nextId || nextId <= 0) {
        nextId = sanitized._nextIds[resource];
      }

      sanitized[resource] = collection.map(item => {
        const input = item && typeof item === "object" ? item : {};
        let id = toNumber(input.id);
        if (!id || id <= 0 || seenIds.has(id)) {
          id = nextId;
          nextId += 1;
        } else if (id >= nextId) {
          nextId = id + 1;
        }

        seenIds.add(id);
        const normalized = normalizeRecord(resource, input);
        if (Object.prototype.hasOwnProperty.call(normalized, "id")) {
          delete normalized.id;
        }
        return Object.assign({ id }, normalized);
      });

      sanitized._nextIds[resource] = nextId;
    });

    return sanitized;
  }

  function createStoreFromSeed(seed) {
    if (!seed) {
      return createEmptyStore();
    }

    return sanitizeStore(seed);
  }

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function loadStore() {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return createStoreFromSeed(getSeed());
    }

    try {
      const parsed = JSON.parse(raw);
      return sanitizeStore(parsed);
    } catch (error) {
      console.error("Failed to parse mock store. Resetting storage.", error);
      return createStoreFromSeed(getSeed());
    }
  }

  function saveStore(store) {
    window.localStorage.setItem(storageKey, JSON.stringify(store));
  }

  function ensureResource(endpoint) {
    const resource = resourceMap[endpoint];
    if (!resource) {
      throw new Error(`Unknown endpoint: ${endpoint}`);
    }
    return resource;
  }

  function toNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function resolveId(params, body) {
    if (params && params.id !== undefined && params.id !== null && params.id !== "") {
      return params.id;
    }

    if (body && body.id !== undefined && body.id !== null && body.id !== "") {
      return body.id;
    }

    return null;
  }

  function cascadeDelete(store, resource, id) {
    const numericId = toNumber(id);
    if (numericId === null) {
      return;
    }

    if (resource === "users") {
      // Remove courses created by instructor
      store.courses = store.courses.filter(course => {
        if (Number(course.instructor_id) === numericId) {
          cascadeDelete(store, "courses", course.id);
          return false;
        }
        return true;
      });

      // Remove enrollments for student users
      store.enrollments = store.enrollments.filter(enrollment => Number(enrollment.student_id) !== numericId);
      return;
    }

    if (resource === "courses") {
      // Remove lessons and enrollments tied to course
      store.lessons = store.lessons.filter(lesson => Number(lesson.course_id) !== numericId);
      store.enrollments = store.enrollments.filter(enrollment => Number(enrollment.course_id) !== numericId);

      // Clear badge references on issued badges tied via course_id
      store.issued_badges = store.issued_badges.filter(item => Number(item.course_id) !== numericId);
      return;
    }

    if (resource === "students") {
      store.issued_badges = store.issued_badges.filter(item => Number(item.student_id) !== numericId);
      store.enrollments = store.enrollments.filter(item => Number(item.student_id) !== numericId);
      return;
    }

    if (resource === "subjects") {
      store.issued_badges = store.issued_badges.filter(item => Number(item.subject_id) !== numericId);
      return;
    }

    if (resource === "badges") {
      store.issued_badges = store.issued_badges.filter(item => Number(item.badge_id) !== numericId);
      store.courses = store.courses.map(course => {
        if (Number(course.badge_id) === numericId) {
          return Object.assign({}, course, { badge_id: null });
        }
        return course;
      });
      return;
    }
  }

  function applyFilters(resource, collection, params) {
    if (!params) {
      return collection;
    }

    const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "");
    if (!entries.length) {
      return collection;
    }

    return collection.filter(item => {
      return entries.every(([key, rawValue]) => {
        const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;
        if (value === "") return true;

        if (key === "search" || key === "q") {
          const text = String(value).toLowerCase();
          if (resource === "courses") {
            const haystack = `${item.title || ""} ${item.description || ""}`.toLowerCase();
            return haystack.includes(text);
          }
          if (resource === "lessons") {
            const haystack = `${item.title || ""} ${item.content || ""}`.toLowerCase();
            return haystack.includes(text);
          }
          return true;
        }

        if (key === "category" && resource === "courses") {
          return String(item.category || "").toLowerCase() === String(value).toLowerCase();
        }

        if (key === "status" && resource === "courses") {
          return String(item.status || "").toLowerCase() === String(value).toLowerCase();
        }

        if (key === "instructor_id" && resource === "courses") {
          return String(item.instructor_id || "") === String(value);
        }

        if (key === "course_id" && (resource === "lessons" || resource === "enrollments" || resource === "issued_badges")) {
          return String(item.course_id || "") === String(value);
        }

        if (key === "student_id" && resource === "enrollments") {
          return String(item.student_id || "") === String(value);
        }

        if (key === "role" && resource === "users") {
          return String(item.role || "").toLowerCase() === String(value).toLowerCase();
        }

        if (key === "badge_id" && resource === "courses") {
          return String(item.badge_id || "") === String(value);
        }

        if (key === "id") {
          return String(item.id || "") === String(value);
        }

        return true;
      });
    });
  }

  function updateEnrollmentProgress(enrollment, store) {
    if (!enrollment) {
      return;
    }

    const courseId = toNumber(enrollment.course_id);
    if (courseId === null) {
      return;
    }

    const lessons = store.lessons.filter(lesson => Number(lesson.course_id) === courseId);
    const totalLessons = lessons.length;
    const completedSet = new Set(
      (enrollment.completed_lessons || []).map(value => {
        const numeric = toNumber(value);
        return numeric === null ? value : numeric;
      })
    );

    const completedLessons = lessons.filter(lesson => completedSet.has(Number(lesson.id))).length;
    const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

    enrollment.progress = progress;

    if (progress >= 100 && totalLessons > 0) {
      enrollment.status = "completed";
      if (!enrollment.completed_at) {
        enrollment.completed_at = new Date().toISOString();
      }
    } else {
      if (enrollment.status === "completed") {
        enrollment.status = "in-progress";
      }
      enrollment.completed_at = null;
    }
  }

  function syncEnrollmentsForCourse(store, courseId) {
    const numericCourseId = toNumber(courseId);
    if (numericCourseId === null) {
      return;
    }

    store.enrollments
      .filter(enrollment => Number(enrollment.course_id) === numericCourseId)
      .forEach(enrollment => {
        updateEnrollmentProgress(enrollment, store);
        ensureCourseCompletionBadge(store, enrollment);
      });
  }

  function ensureCourseCompletionBadge(store, enrollment) {
    if (!enrollment || enrollment.status !== "completed") {
      return;
    }

    const courseId = toNumber(enrollment.course_id);
    const studentId = toNumber(enrollment.student_id);
    if (courseId === null || studentId === null) {
      return;
    }

    const course = store.courses.find(item => Number(item.id) === courseId);
    if (!course) {
      return;
    }

    const badgeId = toNumber(course.badge_id);
    if (badgeId === null) {
      return;
    }

    const alreadyIssued = store.issued_badges.find(
      item => Number(item.student_id) === studentId && Number(item.badge_id) === badgeId && Number(item.course_id) === courseId
    );

    if (alreadyIssued) {
      return;
    }

    const nextId = store._nextIds.issued_badges || 1;
    const record = {
      id: nextId,
      student_id: studentId,
      subject_id: null,
      badge_id: badgeId,
      course_id: courseId,
      date_issued: new Date().toISOString().slice(0, 10)
    };

    store._nextIds.issued_badges = nextId + 1;
    store.issued_badges.push(record);
  }

  function mockRequest(endpoint, options = {}) {
    const { method = "GET", params = {}, body = null } = options;
    const upperMethod = method.toUpperCase();
    const resource = ensureResource(endpoint);
    const store = loadStore();
    const collection = store[resource];

    if (upperMethod === "GET") {
      if (params && params.id !== undefined && params.id !== null && params.id !== "") {
        const target = collection.find(item => String(item.id) === String(params.id));
        if (!target) {
          return Promise.reject(new Error("Record not found."));
        }
        return Promise.resolve(clone(target));
      }

      const filtered = applyFilters(resource, collection, params);
      return Promise.resolve(clone(filtered));
    }

    if (upperMethod === "POST") {
      const nextId = store._nextIds[resource] || 1;
      const recordData = normalizeRecord(resource, body);

      if (resource === "courses" && !recordData.created_at) {
        recordData.created_at = new Date().toISOString();
      }

      if (resource === "lessons") {
        if (!recordData.created_at) {
          recordData.created_at = new Date().toISOString();
        }

        if (!recordData.sort_order) {
          const maxSort = collection
            .filter(item => String(item.course_id) === String(recordData.course_id))
            .reduce((max, item) => Math.max(max, Number(item.sort_order) || 0), 0);
          recordData.sort_order = maxSort + 1;
        }
      }

      if (resource === "enrollments") {
        recordData.completed_lessons = Array.isArray(recordData.completed_lessons) ? recordData.completed_lessons : [];
      }

      const record = Object.assign({ id: nextId }, recordData);
      store._nextIds[resource] = nextId + 1;
      collection.push(record);

      if (resource === "enrollments") {
        updateEnrollmentProgress(record, store);
        ensureCourseCompletionBadge(store, record);
      }

      if (resource === "lessons") {
        syncEnrollmentsForCourse(store, record.course_id);
      }

      saveStore(store);
      return Promise.resolve(clone(record));
    }

    if (upperMethod === "PUT") {
      const rawId = resolveId(params, body);
      if (rawId === null) {
        return Promise.reject(new Error("Missing record id."));
      }

      const numericId = toNumber(rawId);
      const index = collection.findIndex(item => {
        if (numericId !== null && Number(item.id) === numericId) {
          return true;
        }
        return String(item.id) === String(rawId);
      });
      if (index === -1) {
        return Promise.reject(new Error("Record not found."));
      }

      const updatedData = normalizeRecord(resource, body);

      const currentId = collection[index].id;
      collection[index] = Object.assign({}, collection[index], updatedData, {
        id: numericId !== null ? numericId : currentId
      });

      if (resource === "enrollments") {
        updateEnrollmentProgress(collection[index], store);
        ensureCourseCompletionBadge(store, collection[index]);
      }

      if (resource === "lessons") {
        syncEnrollmentsForCourse(store, collection[index].course_id);
      }

      if (resource === "courses" && updatedData.status) {
        collection[index].status = updatedData.status;
      }

      saveStore(store);
      return Promise.resolve(clone(collection[index]));
    }

    if (upperMethod === "DELETE") {
      const rawId = resolveId(params, body);
      if (rawId === null) {
        return Promise.reject(new Error("Missing record id."));
      }

      const numericId = toNumber(rawId);
      const index = collection.findIndex(item => {
        if (numericId !== null && Number(item.id) === numericId) {
          return true;
        }
        return String(item.id) === String(rawId);
      });
      if (index === -1) {
        return Promise.reject(new Error("Record not found."));
      }

      const [removed] = collection.splice(index, 1);
      const cascadeId = numericId !== null ? numericId : removed?.id;
      cascadeDelete(store, resource, cascadeId);

      if (resource === "lessons") {
        syncEnrollmentsForCourse(store, removed?.course_id);
        store.enrollments.forEach(enrollment => {
          if (!Array.isArray(enrollment.completed_lessons)) return;
          enrollment.completed_lessons = enrollment.completed_lessons.filter(value => String(value) !== String(removed?.id));
          updateEnrollmentProgress(enrollment, store);
          ensureCourseCompletionBadge(store, enrollment);
        });
      }

      saveStore(store);
      return Promise.resolve({ success: true });
    }

    return Promise.reject(new Error(`Unsupported method: ${method}`));
  }

  function buildUrl(endpoint, params) {
    const url = new URL(config.baseUrl + endpoint, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        url.searchParams.set(key, String(value));
      });
    }
    return url.toString();
  }

  async function remoteRequest(endpoint, options = {}) {
    const { method = "GET", params = null, body = null } = options;
    const url = buildUrl(endpoint, params);
    const fetchOptions = { method, headers: {} };

    if (body !== null && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      fetchOptions.headers["Content-Type"] = "application/json";
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    const text = await response.text();
    const hasBody = text !== "";
    let data = null;

    if (hasBody) {
      try {
        data = JSON.parse(text);
      } catch (error) {
        throw new Error("Invalid JSON response from server.");
      }
    }

    if (!response.ok) {
      const message = data && typeof data.error === "string" ? data.error : `Request failed with status ${response.status}.`;
      throw new Error(message);
    }

    return data;
  }

  async function apiRequest(endpoint, options = {}) {
    if (config.mode === "remote") {
      return remoteRequest(endpoint, options);
    }

    if (config.mode === "auto") {
      try {
        return await remoteRequest(endpoint, options);
      } catch (error) {
        console.warn("Remote request failed. Falling back to mock storage.", error);
        return mockRequest(endpoint, options);
      }
    }

    return mockRequest(endpoint, options);
  }

  window.apiRequest = apiRequest;
})();
