window.apiConfig = {
  baseUrl: "api/",
  mode: "mock",
  seed: {
    users: [
      {
        id: 1,
        name: "Prof. Andrea Cruz",
        email: "andrea.cruz@example.com",
        role: "instructor"
      },
      {
        id: 2,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin"
      },
      {
        id: 3,
        name: "Juan Dela Cruz",
        email: "juan.delacruz@example.com",
        role: "student"
      },
      {
        id: 4,
        name: "Maria Santos",
        email: "maria.santos@example.com",
        role: "student"
      }
    ],
    students: [
      {
        id: 1,
        student_id: "2023-001",
        name: "Juan Dela Cruz",
        email: "juan.delacruz@example.com",
        course: "BSIT",
        year_level: "3"
      },
      {
        id: 2,
        student_id: "2023-002",
        name: "Maria Santos",
        email: "maria.santos@example.com",
        course: "BSCS",
        year_level: "2"
      }
    ],
    subjects: [
      {
        id: 1,
        code: "IT101",
        title: "Introduction to Information Technology",
        instructor: "Prof. Cruz"
      },
      {
        id: 2,
        code: "CS201",
        title: "Data Structures",
        instructor: "Prof. Reyes"
      }
    ],
    badges: [
      {
        id: 1,
        title: "Honor Student",
        description: "Awarded for outstanding academic performance.",
        image_url: "https://via.placeholder.com/64?text=Honor"
      },
      {
        id: 2,
        title: "Leadership",
        description: "Recognizing leadership in student organizations.",
        image_url: "https://via.placeholder.com/64?text=Leader"
      }
    ],
    issued_badges: [
      {
        id: 1,
        student_id: 1,
        subject_id: 1,
        badge_id: 1,
        course_id: null,
        date_issued: "2024-05-15"
      },
      {
        id: 2,
        student_id: 2,
        subject_id: 2,
        badge_id: 2,
        course_id: null,
        date_issued: "2024-05-20"
      }
    ],
    courses: [
      {
        id: 1,
        title: "Foundations of Networking",
        description: "Learn the basics of networking concepts inspired by NetAcad modules.",
        instructor_id: 1,
        thumbnail_url: "https://via.placeholder.com/320x180?text=Networking",
        category: "Networking",
        badge_id: 1,
        status: "published",
        created_at: "2024-06-01T08:00:00Z"
      },
      {
        id: 2,
        title: "Web Development Essentials",
        description: "Step-by-step guide to building responsive websites with HTML, CSS, and JavaScript.",
        instructor_id: 1,
        thumbnail_url: "https://via.placeholder.com/320x180?text=Web+Dev",
        category: "Web Development",
        badge_id: 2,
        status: "draft",
        created_at: "2024-06-10T08:00:00Z"
      }
    ],
    lessons: [
      {
        id: 1,
        course_id: 1,
        title: "Introduction to Networking",
        content: "<p>Understand the role of networks in modern communication systems.</p>",
        file_url: "https://example.com/files/networking-intro.pdf",
        video_url: "https://www.youtube.com/embed/example1",
        sort_order: 1,
        created_at: "2024-06-02T08:00:00Z"
      },
      {
        id: 2,
        course_id: 1,
        title: "OSI Model Overview",
        content: "<p>Dive into each layer of the OSI model and understand their responsibilities.</p>",
        file_url: "https://example.com/files/osi-overview.pdf",
        video_url: "https://www.youtube.com/embed/example2",
        sort_order: 2,
        created_at: "2024-06-03T08:00:00Z"
      }
    ],
    enrollments: [
      {
        id: 1,
        student_id: 3,
        course_id: 1,
        status: "in-progress",
        progress: 50,
        completed_at: null,
        completed_lessons: [1]
      }
    ]
  }
};
