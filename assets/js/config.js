window.apiConfig = {
  baseUrl: "api/",
  mode: "supabase", //SUCCESS SHOWED WHAT'S  IN TEH USERS TABLE IN TEH SUPABSE
  storageKey: "dbs_mock_store_v2",
  seed: {
    users: [
      {
        id: 1,
        name: "ISU-Roxas DBS Learning Team",
        email: "learning@isu-roxas.edu.ph",
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
        image_url: "https://placehold.co/64x64?text=Honor"
      },
      {
        id: 2,
        title: "Leadership",
        description: "Recognizing leadership in student organizations.",
        image_url: "https://placehold.co/64x64?text=Leader"
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
        title: "Basic Computer Skills & Maintenance",
        description: "Master the fundamentals of PC hardware, assembly, and preventive maintenance tailored for ISU-Roxas labs.",
        instructor_id: 1,
        thumbnail_url: "https://placehold.co/320x180?text=Computer+Skills",
        category: "Hardware",
        badge_id: 1,
        status: "published",
        level: "Beginner",
        duration_hours: 20,
        delivery: "Hands-on Workshops",
        cost: "Free",
        created_at: "2024-06-01T08:00:00Z"
      },
      {
        id: 2,
        title: "Storage & Installation Basics",
        description: "Prepare bootable media, install operating systems, and configure BIOS/UEFI the DBS way.",
        instructor_id: 1,
        thumbnail_url: "https://placehold.co/320x180?text=Installation",
        category: "Installation",
        badge_id: 2,
        status: "published",
        level: "Beginner",
        duration_hours: 18,
        delivery: "Guided Labs",
        cost: "Free",
        created_at: "2024-06-04T09:00:00Z"
      },
      {
        id: 3,
        title: "Basic Networking & Connectivity",
        description: "Set up home networks, share resources, and grasp IP fundamentals for community deployments.",
        instructor_id: 1,
        thumbnail_url: "https://placehold.co/320x180?text=Connectivity",
        category: "Networking",
        badge_id: 1,
        status: "published",
        level: "Beginner",
        duration_hours: 22,
        delivery: "Blended Learning",
        cost: "Free",
        created_at: "2024-06-08T09:00:00Z"
      },
      {
        id: 4,
        title: "Digital Safety & System Management",
        description: "Protect systems with antivirus, backups, and smart password practices for campus-ready resilience.",
        instructor_id: 1,
        thumbnail_url: "https://placehold.co/320x180?text=Digital+Safety",
        category: "Security",
        badge_id: 2,
        status: "published",
        level: "Intermediate",
        duration_hours: 16,
        delivery: "Instructor-led",
        cost: "Free",
        created_at: "2024-06-12T09:00:00Z"
      },
      {
        id: 5,
        title: "Software Essentials",
        description: "Install applications responsibly, troubleshoot common issues, and manage critical device drivers.",
        instructor_id: 1,
        thumbnail_url: "https://placehold.co/320x180?text=Software",
        category: "Software",
        badge_id: 1,
        status: "published",
        level: "Intermediate",
        duration_hours: 18,
        delivery: "Self-paced · Guided",
        cost: "Free",
        created_at: "2024-06-16T09:00:00Z"
      },
      {
        id: 6,
        title: "Useful Utilities and Tools",
        description: "Harness Windows utilities, command-line basics, and compression tools for support excellence.",
        instructor_id: 1,
        thumbnail_url: "https://placehold.co/320x180?text=Utilities",
        category: "System Tools",
        badge_id: 2,
        status: "published",
        level: "Intermediate",
        duration_hours: 20,
        delivery: "Lab Immersion",
        cost: "Free",
        created_at: "2024-06-20T09:00:00Z"
      }
    ],
    lessons: [
      {
        id: 100,
        course_id: 1,
        title: "Pre-Test: Baseline Skills Assessment",
        content: "<p>Gauge your current knowledge before diving into the modules. Answer each multiple-choice item without reviewing the lessons yet.</p><ol><li>Read every question carefully.</li><li>Select the option that best matches your understanding.</li><li>Submit once you have answered all items. Scores are for benchmarking, not grading.</li></ol>",
        file_url: null,
        video_url: null,
        module_title: "Pre-Test",
        module_description: "Establish a baseline before the first module.",
        module_sort_order: 0,
        lesson_index: "PT",
        sort_order: 0,
        created_at: "2024-06-01T07:30:00Z",
        quiz: {
          intro: "Answer the 10-item pre-test to benchmark your starting knowledge.",
          questions: [
            {
              id: "pre-components",
              prompt: "Which component is primarily responsible for executing instructions and calculations in a computer?",
              options: [
                { value: "ram", label: "Random access memory (RAM)" },
                { value: "cpu", label: "Central processing unit (CPU)" },
                { value: "psu", label: "Power supply unit (PSU)" },
                { value: "gpu", label: "Graphics processing unit (GPU)" }
              ],
              answer: "cpu",
              explanation: "The CPU executes program instructions and performs primary calculations."
            },
            {
              id: "pre-post",
              prompt: "During POST, which outcome indicates that the basic hardware check succeeded?",
              options: [
                { value: "constant_beeps", label: "Continuous beeping without display" },
                { value: "blank_screen", label: "Blank display and no sound" },
                { value: "single_beep", label: "A single beep followed by a display output" },
                { value: "fan_only", label: "Only case fans spinning" }
              ],
              answer: "single_beep",
              explanation: "Most motherboards emit a single beep when POST completes successfully."
            },
            {
              id: "pre-sata",
              prompt: "Which connector is typically used to attach a 2.5-inch SSD to the motherboard?",
              options: [
                { value: "sata", label: "SATA data cable" },
                { value: "pcie", label: "PCIe x16 slot" },
                { value: "molex", label: "Molex power connector" },
                { value: "vga", label: "VGA cable" }
              ],
              answer: "sata",
              explanation: "2.5-inch SSDs commonly use SATA data and power connectors."
            },
            {
              id: "pre-thermal",
              prompt: "Why do technicians apply thermal paste between the CPU and heatsink?",
              options: [
                { value: "looks", label: "To make the build look cleaner" },
                { value: "adhesion", label: "To glue the heatsink in place" },
                { value: "conduct", label: "To improve heat transfer by filling microscopic gaps" },
                { value: "power", label: "To supply power to the heatsink" }
              ],
              answer: "conduct",
              explanation: "Thermal paste fills tiny air gaps and improves heat conduction from CPU to heatsink."
            },
            {
              id: "pre-antistatic",
              prompt: "Which practice best prevents electrostatic discharge when handling components?",
              options: [
                { value: "wool", label: "Wearing wool gloves" },
                { value: "bracelet", label: "Using an anti-static wrist strap clipped to ground" },
                { value: "carpet", label: "Standing on a carpet for insulation" },
                { value: "metal", label: "Touching painted metal surfaces" }
              ],
              answer: "bracelet",
              explanation: "An anti-static wrist strap grounds the technician and prevents static build-up."
            },
            {
              id: "pre-clean",
              prompt: "A dusty computer lab PC overheats frequently. What is the most effective first step?",
              options: [
                { value: "raise_temp", label: "Increase the room temperature" },
                { value: "reinstall_os", label: "Reinstall the operating system" },
                { value: "clean_fans", label: "Power down, open the case, and clean fans and vents" },
                { value: "add_ram", label: "Install additional RAM" }
              ],
              answer: "clean_fans",
              explanation: "Dust removal restores airflow and is the first corrective step for overheating due to clogging."
            },
            {
              id: "pre-bootmedia",
              prompt: "What utility is popular for creating bootable USB drives for Windows installers?",
              options: [
                { value: "rufus", label: "Rufus" },
                { value: "excel", label: "Microsoft Excel" },
                { value: "steam", label: "Steam" },
                { value: "acrobat", label: "Adobe Acrobat" }
              ],
              answer: "rufus",
              explanation: "Rufus is widely used for preparing bootable flash drives."
            },
            {
              id: "pre-os",
              prompt: "Which partition style is typically paired with UEFI firmware for modern systems?",
              options: [
                { value: "gpt", label: "GUID Partition Table (GPT)" },
                { value: "mbr", label: "Master Boot Record (MBR)" },
                { value: "fat12", label: "FAT12" },
                { value: "ntfs", label: "NTFS" }
              ],
              answer: "gpt",
              explanation: "UEFI systems use GPT to support larger disks and secure boot features."
            },
            {
              id: "pre-network",
              prompt: "In a home network, which device typically distributes IP addresses to connected clients?",
              options: [
                { value: "switch", label: "Unmanaged network switch" },
                { value: "router", label: "Router with DHCP service" },
                { value: "modem", label: "Cable or DSL modem" },
                { value: "access_point", label: "Standalone access point" }
              ],
              answer: "router",
              explanation: "The router usually includes a DHCP server to lease IP addresses to clients."
            },
            {
              id: "pre-security",
              prompt: "Which action strengthens password security for campus accounts?",
              options: [
                { value: "reuse", label: "Reuse the same password on every site" },
                { value: "share", label: "Share passwords with teammates" },
                { value: "manager", label: "Store unique passwords in a trusted manager" },
                { value: "sticky", label: "Write passwords on sticky notes" }
              ],
              answer: "manager",
              explanation: "Password managers help enforce unique, complex passwords for each account."
            }
          ]
        }
      },
      {
        id: 201,
        course_id: 2,
        title: "Post-Test: Deployment and Firmware Mastery",
        content: "<p>Wrap up the course with a comprehensive 20-question assessment on media creation, operating system installation, and BIOS/UEFI configuration.</p><p>Use the explanations to reinforce correct workflows and policy requirements.</p>",
        file_url: null,
        video_url: null,
        module_title: "Post-Test",
        module_description: "Evaluate mastery after Modules 1–3.",
        module_sort_order: 99,
        lesson_index: "POST",
        sort_order: 1,
        created_at: "2024-06-18T17:00:00Z",
        quiz: {
          intro: "Complete all 20 questions to confirm you can deploy systems the DBS way.",
          questions: [
            {
              id: "post2-media-step",
              prompt: "What is the first step when preparing a flash drive with Rufus for a new OS install?",
              options: [
                { value: "select_device", label: "Select the correct USB device and ISO image" },
                { value: "overclock", label: "Overclock the CPU" },
                { value: "disable_smart", label: "Disable SMART monitoring" },
                { value: "remove_wifi", label: "Remove the Wi-Fi antenna" }
              ],
              answer: "select_device",
              explanation: "Selecting the desired USB drive and ISO is the foundation for creating boot media."
            },
            {
              id: "post2-checksum",
              prompt: "Why do technicians compare an ISO checksum before deployment?",
              options: [
                { value: "validate", label: "To confirm the download is authentic and error-free" },
                { value: "speed", label: "To make the installer run faster" },
                { value: "color", label: "To change the color of the interface" },
                { value: "sound", label: "To calibrate system audio" }
              ],
              answer: "validate",
              explanation: "Checksums ensure the media has not been tampered with or corrupted."
            },
            {
              id: "post2-persistence",
              prompt: "Which scenario warrants enabling persistence when creating a Linux bootable USB?",
              options: [
                { value: "live_usb", label: "When you need a live USB that saves changes across reboots" },
                { value: "windows_install", label: "When installing Windows" },
                { value: "bios_flash", label: "When flashing BIOS via DOS" },
                { value: "firmware_reset", label: "When resetting firmware to defaults" }
              ],
              answer: "live_usb",
              explanation: "Persistence retains user data and configuration on live Linux media."
            },
            {
              id: "post2-gpt-benefit",
              prompt: "What is a key benefit of GPT over MBR for lab deployments?",
              options: [
                { value: "larger", label: "Supports large disks and more partitions" },
                { value: "slower", label: "Boots slower" },
                { value: "less_secure", label: "Disables Secure Boot" },
                { value: "floppy", label: "Requires floppy drives" }
              ],
              answer: "larger",
              explanation: "GPT handles modern large-capacity disks and multiple partitions efficiently."
            },
            {
              id: "post2-bios-key",
              prompt: "If a device uses F2 instead of Delete to open firmware settings, what should you do?",
              options: [
                { value: "check_doc", label: "Consult the vendor documentation or on-screen prompt" },
                { value: "force_del", label: "Hold Delete regardless" },
                { value: "reset_cmos", label: "Reset CMOS immediately" },
                { value: "remove_battery", label: "Remove the CMOS battery" }
              ],
              answer: "check_doc",
              explanation: "Motherboard splash screens or manuals specify which key enters setup."
            },
            {
              id: "post2-secureboot",
              prompt: "How do you temporarily install unsigned drivers when Secure Boot is enabled?",
              options: [
                { value: "disable_secureboot", label: "Disable Secure Boot temporarily, then re-enable it after installation" },
                { value: "raise_voltage", label: "Increase CPU voltage" },
                { value: "factory_reset", label: "Factory reset Windows" },
                { value: "none", label: "Nothing—Secure Boot never blocks unsigned code" }
              ],
              answer: "disable_secureboot",
              explanation: "Secure Boot must be disabled or signatures enrolled to allow unsigned drivers."
            },
            {
              id: "post2-boot-order",
              prompt: "After installing Windows, what should you do with the firmware boot order?",
              options: [
                { value: "restore_disk", label: "Restore the primary system drive to the top to prevent boot loops" },
                { value: "leave_usb", label: "Leave the installer USB first" },
                { value: "clear_nvram", label: "Clear NVRAM" },
                { value: "disable_post", label: "Disable POST" }
              ],
              answer: "restore_disk",
              explanation: "Keeping the USB first can cause it to reboot into setup repeatedly."
            },
            {
              id: "post2-driver_priority",
              prompt: "Which drivers should be installed immediately after the OS?",
              options: [
                { value: "chipset", label: "Chipset, storage, and network drivers" },
                { value: "games", label: "Game launchers" },
                { value: "wallpaper", label: "Wallpapers" },
                { value: "screensaver", label: "Screensavers" }
              ],
              answer: "chipset",
              explanation: "Critical drivers ensure stable hardware communication."
            },
            {
              id: "post2-imaging",
              prompt: "Why is Sysprep used before capturing a Windows image for mass deployment?",
              options: [
                { value: "reset_sid", label: "To reset unique identifiers and prepare the OS for cloning" },
                { value: "remove_updates", label: "To remove Windows updates" },
                { value: "install_games", label: "To install games automatically" },
                { value: "increase_speed", label: "To permanently increase CPU frequency" }
              ],
              answer: "reset_sid",
              explanation: "Sysprep generalizes the installation so each clone gets unique IDs."
            },
            {
              id: "post2-vlan",
              prompt: "While imaging labs, why might you separate deployment traffic on its own VLAN?",
              options: [
                { value: "isolate", label: "To isolate heavy multicast traffic from production devices" },
                { value: "rgb", label: "To control RGB lighting" },
                { value: "music", label: "To stream music" },
                { value: "waste", label: "There is no benefit" }
              ],
              answer: "isolate",
              explanation: "Dedicated VLANs prevent imaging traffic from congesting production networks."
            },
            {
              id: "post2-recovery",
              prompt: "Which Windows utility creates a recovery image after deployment tweaks?",
              options: [
                { value: "dism", label: "DISM" },
                { value: "calc", label: "Calculator" },
                { value: "paint", label: "Paint" },
                { value: "notepad", label: "Notepad" }
              ],
              answer: "dism",
              explanation: "Deployment Image Servicing and Management (DISM) manages and captures Windows images."
            },
            {
              id: "post2-bitlocker",
              prompt: "Before enabling BitLocker campus-wide, what prerequisite should be confirmed?",
              options: [
                { value: "tpm", label: "TPM availability or a policy for recovery keys" },
                { value: "gpu", label: "GPU clock speed" },
                { value: "rgb", label: "RGB profiles" },
                { value: "mousepad", label: "Mouse pad texture" }
              ],
              answer: "tpm",
              explanation: "BitLocker typically requires TPM or alternate key storage planning."
            },
            {
              id: "post2-resources",
              prompt: "Which log helps confirm what changes were made during an installation session?",
              options: [
                { value: "deployment_log", label: "The deployment checklist and change log" },
                { value: "music_playlist", label: "Music playlists" },
                { value: "weather", label: "Weather reports" },
                { value: "sports", label: "Sports schedules" }
              ],
              answer: "deployment_log",
              explanation: "Accurate logs document steps, versions, and configurations for auditing."
            },
            {
              id: "post2-dualboot",
              prompt: "What is a recommended partitioning approach for a Windows/Linux dual boot?",
              options: [
                { value: "separate", label: "Separate partitions for each OS plus a shared data partition" },
                { value: "single", label: "Install both OSes in the same partition" },
                { value: "swap_only", label: "Use only a swap partition" },
                { value: "usb_only", label: "Run Linux exclusively from USB" }
              ],
              answer: "separate",
              explanation: "Dedicated partitions prevent conflicts and simplify recovery."
            },
            {
              id: "post2-bios_profile",
              prompt: "Why export BIOS/UEFI configuration profiles after tuning settings?",
              options: [
                { value: "reapply", label: "So you can reapply or deploy the same settings consistently" },
                { value: "music", label: "To play background music at boot" },
                { value: "lights", label: "To control classroom lighting" },
                { value: "clipboard", label: "To copy text to the clipboard" }
              ],
              answer: "reapply",
              explanation: "Exported profiles accelerate repeat deployments and disaster recovery."
            },
            {
              id: "post2-uefi_updates",
              prompt: "What should you confirm before updating BIOS/UEFI firmware from within Windows?",
              options: [
                { value: "power", label: "Stable power or a charged UPS/laptop battery" },
                { value: "screensaver", label: "Screensaver settings" },
                { value: "theme", label: "Desktop theme" },
                { value: "audio", label: "Speaker volume" }
              ],
              answer: "power",
              explanation: "Firmware updates must not lose power mid-flash to avoid corruption."
            },
            {
              id: "post2-postinstall",
              prompt: "Which script step should run after imaging to finalize lab machines?",
              options: [
                { value: "rename", label: "Rename the workstation per campus convention" },
                { value: "video", label: "Play a welcome video" },
                { value: "games", label: "Install random games" },
                { value: "delete_logs", label: "Delete all event logs" }
              ],
              answer: "rename",
              explanation: "Renaming and domain joining align systems with asset records."
            },
            {
              id: "post2-restore",
              prompt: "Why maintain a tested recovery image for each lab template?",
              options: [
                { value: "fast_restore", label: "To accelerate disaster recovery if updates cause issues" },
                { value: "music", label: "To store music" },
                { value: "themes", label: "To experiment with themes" },
                { value: "gaming", label: "To host gaming tournaments" }
              ],
              answer: "fast_restore",
              explanation: "Known-good recovery images minimize downtime after failed updates or malware incidents."
            },
            {
              id: "post2-document",
              prompt: "After completing an OS deployment, which documentation should be updated?",
              options: [
                { value: "change_log", label: "The DBS change log and deployment checklist" },
                { value: "photo_album", label: "Photo albums" },
                { value: "music_list", label: "Music playlists" },
                { value: "none", label: "None" }
              ],
              answer: "change_log",
              explanation: "Documenting steps provides traceability and repeatability for future work."
            }
          ]
        }
      },
      {
        id: 1,
        course_id: 1,
        title: "Identifying Computer Components",
        content: "<p>Explore the internal and external parts of a personal computer using campus-ready samples.</p><p>The DBS learning team walks you through real laboratory desktops and laptops, calling out the connectors, sockets, and chips that make each machine unique. You will inspect motherboards, GPUs, memory modules, and power supplies while learning how airflow and cable management affect reliability.</p><p>To reinforce the walkthrough, compare the inventory profile of a newly acquired PC against the checklist used by our campus technicians. Spot the differences between ATX, microATX, and mini-ITX boards, then document compatible replacements for each.</p><ul><li>Match each component to its role in processing, storage, or connectivity.</li><li>Practice tracing hardware faults using DBS troubleshooting flowcharts.</li><li>Explain how input devices, output peripherals, and expansion cards extend the value of the base unit.</li></ul><p>By the end of the discussion, you should be comfortable mapping front-panel ports to their headers and verifying that every system fan is connected to the right controller.</p>",
        file_url: "https://example.com/files/computer-components.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=computer+components+basics",
        module_title: "Module 1: Computer Parts and Functions",
        module_description: "Identify how every PC component contributes to system performance.",
        module_sort_order: 1,
        lesson_index: "1.1",
        sort_order: 1,
        created_at: "2024-06-02T08:00:00Z",
        quiz: {
          intro: "Answer the question to confirm you understand the essential PC components.",
          questions: [
            {
              id: "comp-role",
              prompt: "Which component temporarily stores data so the CPU can access it quickly during processing?",
              options: [
                { value: "ssd", label: "Solid-state drive" },
                { value: "ram", label: "Random access memory" },
                { value: "psu", label: "Power supply unit" }
              ],
              answer: "ram",
              explanation: "RAM serves as the computer's short-term high-speed storage, allowing the CPU to retrieve active data immediately."
            }
          ]
        }
      },
      {
        id: 2,
        course_id: 1,
        title: "Hardware Roles and Basic Troubleshooting",
        content: "<p>Diagnose common hardware issues using visual inspection and quick swap strategies.</p><p>This lesson outlines the systematic approach used by DBS mentors when a unit refuses to boot, emits beep codes, or displays intermittent artifacts. You will simulate triage sessions that start with questioning the user, confirming what changed, and validating power and display connections.</p><p>Next, dive into a decision tree that shows when to reseat memory, swap power supplies, or reapply thermal paste. Each branch includes notes about warranty considerations and how to prevent electrostatic discharge incidents.</p><ul><li>Review symptom-to-cause matrices for RAM, PSU, and storage failures.</li><li>Document findings in the DBS maintenance log template.</li><li>Record before-and-after metrics such as temperature and boot times to prove corrective action.</li></ul><p>Round out the module by drafting a knowledge-base article capturing the root cause, fix, and prevention tips for the incident you resolved.</p>",
        file_url: "https://example.com/files/hardware-troubleshooting.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=pc+hardware+troubleshooting",
        module_title: "Module 1: Computer Parts and Functions",
        module_description: "Identify how every PC component contributes to system performance.",
        module_sort_order: 1,
        lesson_index: "1.2",
        sort_order: 2,
        created_at: "2024-06-03T08:00:00Z",
        quiz: {
          intro: "Check your readiness before running a live troubleshooting session.",
          questions: [
            {
              id: "triage-first",
              prompt: "What is the first action recommended when diagnosing a hardware issue in the DBS workflow?",
              options: [
                { value: "swap_parts", label: "Immediately swap suspected parts" },
                { value: "question_user", label: "Interview the user about recent changes" },
                { value: "full_disassembly", label: "Disassemble the system completely" }
              ],
              answer: "question_user",
              explanation: "Gathering context from the user surfaces changes or patterns that guide the rest of the diagnosis."
            }
          ]
        }
      },
      {
        id: 3,
        course_id: 1,
        title: "PC Assembly Walkthrough",
        content: "<p>Follow a step-by-step guide for assembling a workstation used in ISU-Roxas laboratories.</p><p>We start with unboxing components, inspecting packaging for tamper evidence, and organizing screws using the DBS assembly tray. The lesson demonstrates the correct application of thermal paste, how to align CPU notches, and how to snap DIMMs into place without flexing the board.</p><p>After the mainboard is prepared, route cables along predetermined channels to avoid blocking case fans. You will compare modular, semi-modular, and non-modular PSUs and practice grouping cables for future maintenance.</p><ul><li>Seat the CPU, RAM, and storage devices with anti-static precautions.</li><li>Verify power supply connections and first boot checklist.</li><li>Complete the BIOS POST validation sheet included in the resource pack.</li></ul><p>Close out the build by documenting serial numbers, firmware versions, and installed accessories in the DBS asset registry.</p>",
        file_url: "https://example.com/files/pc-assembly.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=pc+assembly+step+by+step",
        module_title: "Module 2: Building and Assembling a PC",
        module_description: "Assemble reliable lab-ready computers from boxed components.",
        module_sort_order: 2,
        lesson_index: "2.1",
        sort_order: 1,
        created_at: "2024-06-04T08:00:00Z",
        quiz: {
          intro: "Confirm you remember the safe assembly sequence.",
          questions: [
            {
              id: "assembly-sequence",
              prompt: "Why is it important to route power cables before closing the side panels?",
              options: [
                { value: "looks", label: "It improves the cosmetic look for users." },
                { value: "airflow", label: "It keeps airflow unobstructed and simplifies future maintenance." },
                { value: "weight", label: "It reduces the overall system weight." }
              ],
              answer: "airflow",
              explanation: "Cable management protects airflow paths and leaves space for technicians to service components later."
            }
          ]
        }
      },
      {
        id: 4,
        course_id: 1,
        title: "Installing Core Components",
        content: "<p>Install CPUs, RAM, and expansion cards while checking compatibility and BIOS recognition.</p><p>The walkthrough explores using manufacturer compatibility matrices, updating motherboard firmware, and confirming POST codes before and after upgrades. Learn how to stage components on an antistatic mat, use torque-limited screwdrivers, and double-check retention clips.</p><p>We also cover how to install NVMe drives on different chipsets, configure RAID when necessary, and update GPU drivers immediately after hardware swaps.</p><p>Hands-on practice ensures students can replace parts safely and confirm optimal performance. The lesson wraps with a bench test flow you can reuse whenever the lab receives donations or refurbished units.</p>",
        file_url: "https://example.com/files/installing-components.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=installing+pc+components",
        module_title: "Module 2: Building and Assembling a PC",
        module_description: "Assemble reliable lab-ready computers from boxed components.",
        module_sort_order: 2,
        lesson_index: "2.2",
        sort_order: 2,
        created_at: "2024-06-05T08:00:00Z",
        quiz: {
          intro: "Validate that you can prep upgrades responsibly.",
          questions: [
            {
              id: "compatibility-check",
              prompt: "Which reference should you consult before installing a new memory kit into a lab workstation?",
              options: [
                { value: "color", label: "The color of the heat spreader" },
                { value: "compatibility_list", label: "The motherboard's qualified vendor list (QVL) or compatibility chart" },
                { value: "fan_size", label: "The size of the case fans" }
              ],
              answer: "compatibility_list",
              explanation: "The QVL ensures the DIMMs have been validated for the board's chipset, voltage, and timings."
            }
          ]
        }
      },
      {
        id: 5,
        course_id: 1,
        title: "Hardware Cleaning Routine",
        content: "<p>Perform physical cleaning procedures using recommended tools and ESD-safe practices.</p><p>Review the DBS quarterly maintenance calendar, including which classrooms receive deep cleanings and how to coordinate with faculty schedules. Learn proper use of compressed air, antistatic brushes, and vacuum attachments to keep heat sinks and vents clear.</p><ul><li>Schedule preventive maintenance and record findings in the DBS asset tracker.</li><li>Spot warning signs of overheating and dust clogging.</li><li>Replace aging thermal pads and verify fan RPM thresholds.</li></ul><p>Case studies highlight how neglecting maintenance shortened device lifespan and how our team recovered by implementing stricter checklists.</p>",
        file_url: "https://example.com/files/hardware-cleaning.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=computer+cleaning+guide",
        module_title: "Module 3: Computer Cleaning and Maintenance",
        module_description: "Keep laboratory machines healthy through regular care routines.",
        module_sort_order: 3,
        lesson_index: "3.1",
        sort_order: 1,
        created_at: "2024-06-06T08:00:00Z",
        quiz: {
          intro: "Ensure you can maintain lab hardware safely.",
          questions: [
            {
              id: "cleaning-tool",
              prompt: "Which tool is recommended for loosening dust from fan blades without damaging components?",
              options: [
                { value: "metal_brush", label: "Metal wire brush" },
                { value: "antistatic_brush", label: "Antistatic brush" },
                { value: "wet_cloth", label: "Wet cloth" }
              ],
              answer: "antistatic_brush",
              explanation: "An antistatic brush breaks up dust while preventing electrostatic discharge risks."
            }
          ]
        }
      },
      {
        id: 6,
        course_id: 1,
        title: "Preventive Maintenance Checklist",
        content: "<p>Create a maintenance plan that covers firmware updates, cable management, and safe handling.</p><p>You will design a rotating duty roster for student assistants, assign responsibility for BIOS updates, and document escalation paths when a device fails mid-semester. The lesson explains how to use DBS ticketing tags to categorize incidents and how to coordinate with third-party warranty providers.</p><p>Use DBS-approved documentation to report issues and escalate repairs, then evaluate sample reports for completeness.</p><p>Finally, outline your own preventive maintenance strategy for a hypothetical computer lab, including spare parts inventory, firmware tracking, and downtime communication templates.</p>",
        file_url: "https://example.com/files/preventive-maintenance.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=preventive+maintenance+computer",
        module_title: "Module 3: Computer Cleaning and Maintenance",
        module_description: "Keep laboratory machines healthy through regular care routines.",
        module_sort_order: 3,
        lesson_index: "3.2",
        sort_order: 2,
        created_at: "2024-06-07T08:00:00Z",
        quiz: {
          intro: "Check that you can document maintenance activities completely.",
          questions: [
            {
              id: "maintenance-log",
              prompt: "What record should be updated after completing firmware updates and cleaning tasks?",
              options: [
                { value: "social_media", label: "The school's social media page" },
                { value: "maintenance_log", label: "The DBS preventive maintenance log" },
                { value: "student_diary", label: "A student's personal diary" }
              ],
              answer: "maintenance_log",
              explanation: "Documenting in the official log keeps the campus inventory accurate and audits-ready."
            }
          ]
        }
      },
      {
        id: 101,
        course_id: 1,
        title: "Post-Test: Final Competency Check",
        content: "<p>Demonstrate what you have learned across all modules. The post-test covers hardware identification, assembly, maintenance, deployment, networking, security, and troubleshooting scenarios you practiced in the course.</p><p>Answer all questions and review the explanations after you submit to reinforce key lessons.</p>",
        file_url: null,
        video_url: null,
        module_title: "Post-Test",
        module_description: "Validate competency after completing every module.",
        module_sort_order: 99,
        lesson_index: "POST",
        sort_order: 1,
        created_at: "2024-06-25T09:00:00Z",
        quiz: {
          intro: "Complete the 20-item post-test to confirm your mastery.",
          questions: [
            {
              id: "post-component-match",
              prompt: "Which pairing correctly matches the component to its role?",
              options: [
                { value: "cpu-storage", label: "CPU — long-term storage" },
                { value: "ram-working", label: "RAM — temporary working memory" },
                { value: "psu-cooling", label: "PSU — cools the processor" },
                { value: "gpu-power", label: "GPU — regulates power delivery" }
              ],
              answer: "ram-working",
              explanation: "RAM temporarily stores data that the CPU actively uses."
            },
            {
              id: "post-troubleshoot-order",
              prompt: "A desktop will not power on and shows no LEDs. What should you check first?",
              options: [
                { value: "reinstall_windows", label: "Reinstall Windows" },
                { value: "power_cable", label: "Verify the PSU switch and power cable connection" },
                { value: "gpu_driver", label: "Update the graphics driver" },
                { value: "replace_mouse", label: "Replace the mouse" }
              ],
              answer: "power_cable",
              explanation: "Always confirm power delivery before deeper troubleshooting."
            },
            {
              id: "post-cable-management",
              prompt: "Why is cable management important during assembly?",
              options: [
                { value: "cosmetic", label: "It is purely cosmetic." },
                { value: "airflow", label: "It improves airflow and simplifies maintenance." },
                { value: "boot", label: "It makes the system boot faster." },
                { value: "weight", label: "It reduces chassis weight." }
              ],
              answer: "airflow",
              explanation: "Organized cables keep airflow paths clear and reduce dust buildup."
            },
            {
              id: "post-bios-update",
              prompt: "Which precaution is critical when updating BIOS/UEFI firmware?",
              options: [
                { value: "interrupt", label: "Power off mid-update to save time" },
                { value: "stable_power", label: "Ensure stable power until the update finishes" },
                { value: "remove_storage", label: "Physically remove every storage drive" },
                { value: "overclock", label: "Overclock the CPU before flashing" }
              ],
              answer: "stable_power",
              explanation: "A power loss can corrupt firmware and brick the motherboard."
            },
            {
              id: "post-cleaning-schedule",
              prompt: "How often should a busy computer lab schedule deep cleaning of PCs?",
              options: [
                { value: "monthly", label: "Every month" },
                { value: "quarterly", label: "Quarterly, aligned with the maintenance calendar" },
                { value: "yearly", label: "Only once a year" },
                { value: "never", label: "Only when a system fails" }
              ],
              answer: "quarterly",
              explanation: "Quarterly deep cleaning preserves airflow and extends component life."
            },
            {
              id: "post-dust-tool",
              prompt: "Which tool is safest for dislodging dust on a motherboard?",
              options: [
                { value: "metal_brush", label: "Metal wire brush" },
                { value: "compressed_air", label: "Canned compressed air" },
                { value: "water", label: "Damp cloth" },
                { value: "vacuum", label: "Household vacuum" }
              ],
              answer: "compressed_air",
              explanation: "Compressed air cleans without physical contact or moisture."
            },
            {
              id: "post-rufus",
              prompt: "Which Rufus configuration prepares a USB for native UEFI installs?",
              options: [
                { value: "mbr_bios", label: "MBR + BIOS" },
                { value: "gpt_uefi", label: "GPT + UEFI (non-CSM)" },
                { value: "gpt_bios", label: "GPT + BIOS" },
                { value: "ntfs_only", label: "NTFS only" }
              ],
              answer: "gpt_uefi",
              explanation: "UEFI requires GPT partitioning for proper boot support."
            },
            {
              id: "post-sysprep",
              prompt: "Why do administrators run Sysprep before imaging a Windows installation?",
              options: [
                { value: "remove_drivers", label: "To remove all device drivers permanently" },
                { value: "reset_ids", label: "To reset system identifiers for multi-device deployment" },
                { value: "disable_updates", label: "To disable Windows Update" },
                { value: "speed", label: "To increase CPU clock speed" }
              ],
              answer: "reset_ids",
              explanation: "Sysprep generalizes identifiers so the image can be reused across machines."
            },
            {
              id: "post-secure-boot",
              prompt: "Secure Boot primarily defends against which threat?",
              options: [
                { value: "overheating", label: "Overheating" },
                { value: "unsigned_boot", label: "Unsigned or tampered bootloaders" },
                { value: "slow_network", label: "Slow network speed" },
                { value: "storage_full", label: "Low storage capacity" }
              ],
              answer: "unsigned_boot",
              explanation: "Secure Boot permits only signed bootloaders to run during startup." 
            },
            {
              id: "post-wifi-survey",
              prompt: "During a Wi-Fi survey, which tool helps map signal strength across rooms?",
              options: [
                { value: "heatmap", label: "Wireless heat-mapping software" },
                { value: "word", label: "Word processor" },
                { value: "calc", label: "Calculator" },
                { value: "paint", label: "Graphic design canvas" }
              ],
              answer: "heatmap",
              explanation: "Heat-mapping apps visualize strong and weak coverage zones."
            },
            {
              id: "post-dhcp",
              prompt: "A printer needs a constant IP address. Which DHCP feature should you configure?",
              options: [
                { value: "reservation", label: "DHCP reservation" },
                { value: "short_lease", label: "Shorter lease time" },
                { value: "relay", label: "DHCP relay" },
                { value: "scope", label: "Separate DHCP scope" }
              ],
              answer: "reservation",
              explanation: "Reservations bind a MAC address to a specific IP." 
            },
            {
              id: "post-ipv6",
              prompt: "Which IPv6 address type operates only within the local network segment?",
              options: [
                { value: "global", label: "Global unicast" },
                { value: "link_local", label: "Link-local" },
                { value: "loopback", label: "Loopback" },
                { value: "multicast", label: "Multicast" }
              ],
              answer: "link_local",
              explanation: "Link-local addresses (fe80::/10) communicate inside the local link."
            },
            {
              id: "post-antivirus",
              prompt: "Which indicator shows that antivirus protection is properly maintained?",
              options: [
                { value: "expired", label: "Definition status expired" },
                { value: "scheduled", label: "Scheduled scans with current signatures" },
                { value: "disabled", label: "Real-time protection disabled" },
                { value: "ignored", label: "Ignored detection logs" }
              ],
              answer: "scheduled",
              explanation: "Updated signatures and scheduled scans keep systems protected."
            },
            {
              id: "post-backup",
              prompt: "Which backup approach minimizes recovery time for lab PCs?",
              options: [
                { value: "full_only", label: "Occasional full backups only" },
                { value: "incremental", label: "Full backup followed by regular incremental backups" },
                { value: "manual", label: "Manual copies when convenient" },
                { value: "none", label: "No backups" }
              ],
              answer: "incremental",
              explanation: "Incremental backups reduce processing time while keeping restore points current."
            },
            {
              id: "post-password",
              prompt: "Which option demonstrates the strongest account security practice?",
              options: [
                { value: "reuse", label: "Reuse passwords across services" },
                { value: "shared", label: "Share the password with teammates" },
                { value: "unique_mfa", label: "Use unique passwords combined with multi-factor authentication" },
                { value: "sticky", label: "Write passwords on sticky notes" }
              ],
              answer: "unique_mfa",
              explanation: "Unique passwords and MFA offer layered protection."
            },
            {
              id: "post-software-cleanup",
              prompt: "After uninstalling stubborn software, which follow-up step removes residual files?",
              options: [
                { value: "defrag", label: "Run disk defragmenter" },
                { value: "cleanup", label: "Clear temporary folders and related registry entries" },
                { value: "format", label: "Format the drive" },
                { value: "ignore", label: "Ignore the leftovers" }
              ],
              answer: "cleanup",
              explanation: "Clearing temporary data prevents clutter and future conflicts."
            },
            {
              id: "post-triage",
              prompt: "Which step appears early in the DBS troubleshooting workflow for recurring crashes?",
              options: [
                { value: "wipe", label: "Wipe the system immediately" },
                { value: "gather_info", label: "Interview the user and review recent changes" },
                { value: "replace_all", label: "Replace every component" },
                { value: "ignore_logs", label: "Ignore event logs" }
              ],
              answer: "gather_info",
              explanation: "Gathering context directs the troubleshooting path."
            },
            {
              id: "post-device-manager",
              prompt: "Where can you roll back a problematic driver in Windows?",
              options: [
                { value: "task_manager", label: "Task Manager" },
                { value: "device_manager", label: "Device Manager" },
                { value: "control_panel", label: "Control Panel Home" },
                { value: "bios", label: "BIOS setup" }
              ],
              answer: "device_manager",
              explanation: "Device Manager offers options to update or roll back drivers."
            },
            {
              id: "post-disk-management",
              prompt: "Which Disk Management action prepares an unallocated drive for use?",
              options: [
                { value: "shrink", label: "Shrink volume" },
                { value: "extend", label: "Extend volume" },
                { value: "new_simple", label: "Create a new simple volume and format it" },
                { value: "defrag", label: "Run the defragmenter" }
              ],
              answer: "new_simple",
              explanation: "Creating and formatting a simple volume initializes the disk for storage."
            },
            {
              id: "post-cli",
              prompt: "Which command helps resolve DNS cache-related connectivity problems?",
              options: [
                { value: "format", label: "format C:" },
                { value: "echo", label: "echo" },
                { value: "ipconfig_flushdns", label: "ipconfig /flushdns" },
                { value: "dir", label: "dir" }
              ],
              answer: "ipconfig_flushdns",
              explanation: "Flushing the DNS cache removes stale entries that can block name resolution."
            }
          ]
        }
      },
      {
        id: 200,
        course_id: 2,
        title: "Pre-Test: Installation Readiness Gauge",
        content: "<p>Measure how comfortable you are with creating boot media, installing operating systems, and configuring firmware before starting this course.</p><ol><li>Answer all items without reviewing the lessons yet.</li><li>Use the score to identify which modules deserve extra focus.</li><li>Submit once every question has a selected answer.</li></ol>",
        file_url: null,
        video_url: null,
        module_title: "Pre-Test",
        module_description: "Establish a baseline before Module 1.",
        module_sort_order: 0,
        lesson_index: "PT",
        sort_order: 0,
        created_at: "2024-06-08T08:30:00Z",
        quiz: {
          intro: "Answer the 10-item pre-test to benchmark your installation knowledge.",
          questions: [
            {
              id: "pre2-iso-verify",
              prompt: "Which action verifies that a downloaded ISO is authentic before creating boot media?",
              options: [
                { value: "checksum", label: "Compare its checksum with the vendor-provided hash" },
                { value: "rename", label: "Rename the ISO file" },
                { value: "compress", label: "Compress the ISO into a ZIP" },
                { value: "shortcut", label: "Create a shortcut to the ISO" }
              ],
              answer: "checksum",
              explanation: "Matching the checksum confirms the image has not been tampered with or corrupted."
            },
            {
              id: "pre2-partition-style",
              prompt: "UEFI-based systems typically require which partition style for the system disk?",
              options: [
                { value: "gpt", label: "GUID Partition Table (GPT)" },
                { value: "mbr", label: "Master Boot Record (MBR)" },
                { value: "fat12", label: "FAT12" },
                { value: "swap", label: "Swap" }
              ],
              answer: "gpt",
              explanation: "UEFI firmware expects drives formatted with GPT to support Secure Boot and large capacities."
            },
            {
              id: "pre2-usb-speed",
              prompt: "Which factor most improves OS installation speed from a USB installer?",
              options: [
                { value: "usb3", label: "Using a USB 3.x flash drive on a USB 3.x port" },
                { value: "mouse_color", label: "Using a black mouse" },
                { value: "wallpaper", label: "Changing the desktop wallpaper" },
                { value: "laptop_bag", label: "Carrying the laptop in a padded bag" }
              ],
              answer: "usb3",
              explanation: "High-speed USB hardware drastically reduces file copy times during setup."
            },
            {
              id: "pre2-bios-key",
              prompt: "Which key commonly opens BIOS/UEFI setup on many desktop motherboards?",
              options: [
                { value: "del", label: "Delete" },
                { value: "ctrl", label: "Ctrl" },
                { value: "shift", label: "Shift" },
                { value: "tab", label: "Tab" }
              ],
              answer: "del",
              explanation: "Most vendors use Delete or a function key to launch firmware settings during POST."
            },
            {
              id: "pre2-secureboot",
              prompt: "Secure Boot blocks which risk during installation?",
              options: [
                { value: "unsigned_boot", label: "Loading unsigned or tampered bootloaders" },
                { value: "noisy_fans", label: "Noisy chassis fans" },
                { value: "storage_full", label: "Running out of disk space" },
                { value: "printer_error", label: "Printer driver misconfiguration" }
              ],
              answer: "unsigned_boot",
              explanation: "Secure Boot refuses bootloaders that lack trusted signatures."
            },
            {
              id: "pre2-dualboot",
              prompt: "What is the safest first step before resizing partitions for a dual-boot setup?",
              options: [
                { value: "backup", label: "Back up important data" },
                { value: "disable_fans", label: "Disable case fans" },
                { value: "overclock", label: "Overclock the CPU" },
                { value: "remove_wifi", label: "Uninstall Wi-Fi adapters" }
              ],
              answer: "backup",
              explanation: "Backups protect data if partitioning mistakes occur."
            },
            {
              id: "pre2-rufus-filesystem",
              prompt: "When preparing a Windows UEFI installer in Rufus, which file system is typically required?",
              options: [
                { value: "fat32", label: "FAT32" },
                { value: "ext4", label: "ext4" },
                { value: "ntfs", label: "NTFS" },
                { value: "hfs", label: "HFS+" }
              ],
              answer: "fat32",
              explanation: "UEFI firmware expects removable media formatted with FAT32 for compatibility."
            },
            {
              id: "pre2-postinstall",
              prompt: "Right after a fresh Windows installation, what should technicians do first?",
              options: [
                { value: "updates", label: "Install critical updates and device drivers" },
                { value: "screensaver", label: "Change the screensaver" },
                { value: "games", label: "Install games" },
                { value: "delete_admin", label: "Delete the administrator account" }
              ],
              answer: "updates",
              explanation: "Installing updates and drivers stabilizes and secures the new system."
            },
            {
              id: "pre2-boot-order",
              prompt: "Which BIOS/UEFI setting ensures a PC boots from a USB installer first?",
              options: [
                { value: "boot_priority", label: "Set the boot priority order" },
                { value: "fan_curve", label: "Adjust the fan curve" },
                { value: "rgb", label: "Change RGB lighting" },
                { value: "secure_erase", label: "Run secure erase" }
              ],
              answer: "boot_priority",
              explanation: "Placing the USB media at the top of the boot order forces the system to start from it."
            },
            {
              id: "pre2-license",
              prompt: "At what point is the Windows product key typically entered during installation?",
              options: [
                { value: "setup_prompt", label: "When the setup wizard prompts for it" },
                { value: "bios_only", label: "Inside BIOS setup only" },
                { value: "printer", label: "Within printer properties" },
                { value: "never", label: "Never—Windows does not require keys" }
              ],
              answer: "setup_prompt",
              explanation: "The installer collects the product key during setup to activate Windows legally."
            }
          ]
        }
      },
      {
        id: 7,
        course_id: 2,
        title: "Creating Bootable Media",
        content: "<p>Use Rufus, Ventoy, and other trusted tools to turn flash drives into installation media.</p><p>The module provides screenshots of every configuration screen, from file system selection to persistence options, so you can confidently prepare devices with either BIOS or UEFI targets.</p><p>Compare different utilities, note their logging capabilities, and outline the scenarios where each one shines. You will also learn how to embed custom scripts that run after installation to reduce repetitive tasks.</p><ul><li>Validate ISO integrity and select the correct partition scheme.</li><li>Document settings for Windows and Linux templates used in DBS labs.</li><li>Create a troubleshooting checklist for unreadable media or secure boot refusals.</li></ul><p>Finish by drafting a quick-start guide you can hand to student technicians during deployment days.</p>",
        file_url: "https://example.com/files/bootable-media.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=creating+bootable+usb+rufus",
        module_title: "Module 1: Creating a Bootable Flash Drive",
        module_description: "Prepare installation media for rapid system provisioning.",
        module_sort_order: 1,
        lesson_index: "1.1",
        sort_order: 1,
        created_at: "2024-06-09T09:00:00Z",
        quiz: {
          intro: "Can you prepare boot media without missing a critical step?",
          questions: [
            {
              id: "partition-scheme",
              prompt: "Which partition scheme should you choose when creating media for UEFI-based systems?",
              options: [
                { value: "mbr", label: "MBR" },
                { value: "gpt", label: "GPT" },
                { value: "fat16", label: "FAT16" }
              ],
              answer: "gpt",
              explanation: "UEFI firmware expects boot media formatted with GUID Partition Table (GPT) so it can load EFI bootloaders."
            }
          ]
        }
      },
      {
        id: 8,
        course_id: 2,
        title: "Operating System Installation",
        content: "<p>Install Windows and Ubuntu with guided steps for formatting drives and setting partitions.</p><p>We walk through customizing language packs, choosing partition layouts for dual boot, and enabling disk encryption when policy requires it.</p><p>Follow DBS post-install scripts to configure updates, drivers, and accessibility defaults. The lesson also covers how to capture reference images with Sysprep or Clonezilla so large batches of devices stay consistent.</p><p>Reflect on potential pitfalls such as driver signature enforcement or Wi-Fi credentials not persisting, and document solutions in your deployment plan.</p>",
        file_url: "https://example.com/files/os-installation.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=windows+ubuntu+installation+tutorial",
        module_title: "Module 2: Operating System Installation",
        module_description: "Deploy operating systems with consistent campus standards.",
        module_sort_order: 2,
        lesson_index: "2.1",
        sort_order: 1,
        created_at: "2024-06-10T09:00:00Z",
        quiz: {
          intro: "Verify you can deploy an OS with DBS standards in mind.",
          questions: [
            {
              id: "post-install",
              prompt: "After installing Windows for the lab, which action ensures devices stay compliant with DBS guidelines?",
              options: [
                { value: "skip_updates", label: "Skip Windows updates to save time" },
                { value: "run_script", label: "Run the DBS post-install automation script" },
                { value: "disable_defender", label: "Disable Microsoft Defender permanently" }
              ],
              answer: "run_script",
              explanation: "The post-install script applies approved policies, drivers, and accessibility defaults automatically."
            }
          ]
        }
      },
      {
        id: 9,
        course_id: 2,
        title: "Configuring BIOS and UEFI",
        content: "<p>Access firmware settings, adjust boot order, and enable secure boot when needed.</p><p>The DBS checklist illustrates how to navigate common vendor interfaces (ASUS, MSI, Lenovo) and which hotkeys to press during POST. You will practice toggling virtualization support, legacy USB modes, and TPM options.</p><ul><li>Troubleshoot failed boots using recovery utilities.</li><li>Log configuration changes for auditing.</li><li>Compare secure boot certificates and learn when to reset to factory defaults.</li></ul><p>Close the lesson by planning a rollback strategy in case firmware updates fail.</p>",
        file_url: "https://example.com/files/bios-config.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=bios+uefi+configuration+guide",
        module_title: "Module 3: Basic BIOS/UEFI Configuration",
        module_description: "Stabilize installations with correct firmware settings.",
        module_sort_order: 3,
        lesson_index: "3.1",
        sort_order: 1,
        created_at: "2024-06-11T09:00:00Z",
        quiz: {
          intro: "Confirm your mastery of firmware adjustments.",
          questions: [
            {
              id: "bios-toggle",
              prompt: "A donated desktop requires launching a legacy imaging tool from USB. Which firmware change enables this without permanently weakening security?",
              options: [
                { value: "temporarily_toggle", label: "Temporarily disable Secure Boot, boot the tool, then re-enable it afterward" },
                { value: "remove_tpm", label: "Physically remove the TPM module" },
                { value: "reset_cmos", label: "Reset CMOS to factory defaults every time" }
              ],
              answer: "temporarily_toggle",
              explanation: "Temporarily disabling Secure Boot allows installation to proceed while keeping the device compliant afterward."
            }
          ]
        }
      },
      {
        id: 10,
        course_id: 3,
        title: "Setting Up a Home Network",
        content: "<p>Connect modems, routers, and devices to deliver secure Wi-Fi for households and classrooms.</p><p>Follow the illustrated topology diagrams covering fiber, DSL, and mobile broadband inputs. The narrative explains how to label cables, change default admin credentials, and choose optimal channels.</p><p>Use DBS network setup checklists to assign IPs and test coverage. Complete a site survey template, noting dead zones and remedies such as range extenders or mesh systems.</p><p>Wrap up by configuring guest networks, QoS policies, and automatic firmware updates.</p>",
        file_url: "https://example.com/files/home-network.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=home+network+setup+tutorial",
        module_title: "Module 1: Setting Up a Home Network",
        module_description: "Bring small office/home office networks online with confidence.",
        module_sort_order: 1,
        lesson_index: "1.1",
        sort_order: 1,
        created_at: "2024-06-12T09:00:00Z",
        quiz: {
          intro: "Evaluate your readiness to deploy home networks for the community.",
          questions: [
            {
              id: "default-password",
              prompt: "Why must default router admin credentials be changed during initial setup?",
              options: [
                { value: "speed", label: "It increases internet speed" },
                { value: "security", label: "It prevents unauthorized access using published default passwords" },
                { value: "warranty", label: "It extends the router's warranty" }
              ],
              answer: "security",
              explanation: "Default credentials are widely known and put the entire network at risk if left unchanged."
            }
          ]
        }
      },
      {
        id: 11,
        course_id: 3,
        title: "Sharing Files and Printers",
        content: "<p>Configure LAN sharing, permissions, and printer access across Windows workgroups.</p><p>Dive into NTFS versus share permissions, map drives using Group Policy preferences, and maintain printer queues with standardized naming conventions.</p><ul><li>Resolve common SMB errors and offline printer states.</li><li>Log network shares in the DBS resource inventory.</li><li>Create reusable scripts for reconnecting drives after password changes.</li></ul><p>Conclude with a lab that simulates a mixed Windows/macOS environment, highlighting compatibility steps.</p>",
        file_url: "https://example.com/files/file-sharing.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=network+file+sharing+windows",
        module_title: "Module 2: Sharing Files and Printers",
        module_description: "Enable collaborative workspaces through shared resources.",
        module_sort_order: 2,
        lesson_index: "2.1",
        sort_order: 1,
        created_at: "2024-06-13T09:00:00Z",
        quiz: {
          intro: "Validate your LAN sharing know-how.",
          questions: [
            {
              id: "permissions",
              prompt: "To allow students to modify files in a shared folder, which permissions combination is required?",
              options: [
                { value: "ntfs_read_only", label: "NTFS read-only + share read" },
                { value: "ntfs_modify_share_change", label: "NTFS modify + share change" },
                { value: "share_full_only", label: "Share full control only" }
              ],
              answer: "ntfs_modify_share_change",
              explanation: "Both NTFS and share permissions must grant modify/change to permit edits across the network."
            }
          ]
        }
      },
      {
        id: 12,
        course_id: 3,
        title: "Internet and IP Fundamentals",
        content: "<p>Demystify IP addresses, DNS, ping tests, and bandwidth diagnostics.</p><p>The DBS primer compares IPv4 and IPv6 structures, explains subnet masks in plain language, and shows practical uses of loopback and broadcast addresses.</p><p>Interpret traceroute outputs to spot connectivity bottlenecks. Practice checking DNS propagation, measuring latency, and filing escalation tickets with ISPs.</p><p>Finally, design a mini-lesson plan to teach classmates the difference between download speed, upload speed, and latency.</p>",
        file_url: "https://example.com/files/internet-basics.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=internet+ip+address+basics",
        module_title: "Module 3: Understanding Internet and IP Basics",
        module_description: "Explain core internet concepts to learners and clients.",
        module_sort_order: 3,
        lesson_index: "3.1",
        sort_order: 1,
        created_at: "2024-06-14T09:00:00Z",
        quiz: {
          intro: "Solidify your understanding of internet diagnostics.",
          questions: [
            {
              id: "ping-purpose",
              prompt: "What does a successful ping test confirm when troubleshooting connectivity?",
              options: [
                { value: "dns_updated", label: "DNS records are updated" },
                { value: "reachability", label: "The target host is reachable across the network" },
                { value: "high_speed", label: "The connection supports gigabit speeds" }
              ],
              answer: "reachability",
              explanation: "Ping verifies that packets can reach the destination and return, indicating basic network connectivity."
            }
          ]
        }
      },
      {
        id: 13,
        course_id: 4,
        title: "Installing and Updating Antivirus",
        content: "<p>Deploy reliable antivirus suites, schedule scans, and interpret threat reports.</p><p>The walkthrough explains how signature-based detection differs from behavior monitoring, and when to escalate suspicious findings to the security team.</p><ul><li>Compare free versus enterprise solutions recommended by DBS.</li><li>Set up notifications for rapid response.</li><li>Create an incident triage form capturing infection scope and containment steps.</li></ul><p>Analyze real-world malware case studies faced by schools and discuss key lessons learned.</p>",
        file_url: "https://example.com/files/antivirus-setup.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=installing+antivirus+software",
        module_title: "Module 1: Installing and Updating Antivirus Software",
        module_description: "Build protection layers against malware and unwanted software.",
        module_sort_order: 1,
        lesson_index: "1.1",
        sort_order: 1,
        created_at: "2024-06-15T09:00:00Z",
        quiz: {
          intro: "Gauge your antivirus deployment readiness.",
          questions: [
            {
              id: "malware-response",
              prompt: "When a scan detects ransomware, what should be your immediate first step?",
              options: [
                { value: "ignore", label: "Ignore the alert and continue working" },
                { value: "isolate", label: "Isolate the affected device from the network" },
                { value: "uninstall_av", label: "Uninstall the antivirus to avoid false positives" }
              ],
              answer: "isolate",
              explanation: "Isolation prevents the ransomware from spreading while you investigate and remediate."
            }
          ]
        }
      },
      {
        id: 14,
        course_id: 4,
        title: "System Backup and Restore",
        content: "<p>Use Windows Backup, File History, and third-party tools to protect user data.</p><p>Learn when to choose differential versus incremental backups, how to verify integrity, and how to store encryption keys securely.</p><p>Practice restoring snapshots after simulated failures. Compare cloud-based backup services with offline imaging tools and prepare a disaster recovery checklist tailored for classrooms.</p><p>Reflect on communication strategies for informing stakeholders before, during, and after restoration.</p>",
        file_url: "https://example.com/files/backup-restore.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=system+backup+and+restore+windows",
        module_title: "Module 2: System Backup and Restore",
        module_description: "Safeguard learning progress with reliable recovery plans.",
        module_sort_order: 2,
        lesson_index: "2.1",
        sort_order: 1,
        created_at: "2024-06-16T09:00:00Z",
        quiz: {
          intro: "Confirm you can recover systems after a failure.",
          questions: [
            {
              id: "backup-type",
              prompt: "Which backup method stores only the changes since the last full backup, optimizing storage use?",
              options: [
                { value: "full", label: "Full backup" },
                { value: "incremental", label: "Incremental backup" },
                { value: "mirror", label: "Mirror backup" }
              ],
              answer: "incremental",
              explanation: "Incremental backups capture only new changes after the previous full backup, saving time and storage."
            }
          ]
        }
      },
      {
        id: 15,
        course_id: 4,
        title: "Password Management and Digital Safety",
        content: "<p>Design strong passwords, enable multi-factor authentication, and educate users on phishing cues.</p><p>This lesson includes printable infographics, classroom scripts, and role-playing exercises for coaching classmates on safe habits.</p><ul><li>Adopt password managers and account recovery practices.</li><li>Distribute DBS digital safety guidelines to students.</li><li>Conduct simulated phishing drills and analyze response metrics.</li></ul><p>Develop an action plan for supporting families who need help adopting MFA on shared devices.</p>",
        file_url: "https://example.com/files/password-management.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=password+management+best+practices",
        module_title: "Module 3: Password Management and Digital Safety",
        module_description: "Teach everyday habits that keep identities secure.",
        module_sort_order: 3,
        lesson_index: "3.1",
        sort_order: 1,
        created_at: "2024-06-17T09:00:00Z",
        quiz: {
          intro: "Check your digital safety coaching skills.",
          questions: [
            {
              id: "phishing-sign",
              prompt: "Which indicator most strongly suggests an email is a phishing attempt?",
              options: [
                { value: "greeting", label: "It uses a friendly greeting" },
                { value: "urgency_link", label: "It pressures you to click a link urgently and provide credentials" },
                { value: "signature", label: "It includes a long signature" }
              ],
              answer: "urgency_link",
              explanation: "Phishing emails often exploit urgency and malicious links to trick recipients into sharing credentials."
            }
          ]
        }
      },
      {
        id: 16,
        course_id: 5,
        title: "Installing and Uninstalling Applications",
        content: "<p>Install software responsibly, verify publishers, and remove leftovers that slow down systems.</p><p>Create a baseline image of authorized applications, vet installers for unwanted bundles, and configure silent deployment switches.</p><p>Maintain a change log for each workstation to track software state. Practice uninstalling stubborn programs with safe registry edits and cleaning temporary files.</p><p>End the lesson by designing an onboarding checklist for new faculty laptops.</p>",
        file_url: "https://example.com/files/software-installation.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=install+uninstall+software+windows",
        module_title: "Module 1: Installing and Uninstalling Applications",
        module_description: "Keep systems clean while rolling out required software.",
        module_sort_order: 1,
        lesson_index: "1.1",
        sort_order: 1,
        created_at: "2024-06-18T09:00:00Z",
        quiz: {
          intro: "Verify best practices for software deployment.",
          questions: [
            {
              id: "authorized-list",
              prompt: "Why should a change log be updated after installing new software on lab PCs?",
              options: [
                { value: "marketing", label: "For marketing announcements" },
                { value: "audit_trail", label: "To maintain an audit trail of what changed and why" },
                { value: "fun", label: "Because it's fun to document" }
              ],
              answer: "audit_trail",
              explanation: "Accurate change logs help administrators track deployments and troubleshoot issues later."
            }
          ]
        }
      },
      {
        id: 17,
        course_id: 5,
        title: "Basic Troubleshooting Techniques",
        content: "<p>Resolve boot loops, missing DLL files, and driver conflicts using standard workflows.</p><p>Compare safe mode, system restore, and startup repair tools. Learn how to read Windows event logs and identify patterns pointing to failing hardware.</p><ul><li>Record incident details using DBS service desk forms.</li><li>Share quick fixes for recurring classroom issues.</li><li>Create decision trees showing when to escalate to senior technicians.</li></ul><p>Conclude by documenting lessons learned in a troubleshooting wiki entry.</p>",
        file_url: "https://example.com/files/basic-troubleshooting.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=basic+computer+troubleshooting",
        module_title: "Module 2: Basic Troubleshooting Techniques",
        module_description: "Shorten downtime through systematic diagnostics.",
        module_sort_order: 2,
        lesson_index: "2.1",
        sort_order: 1,
        created_at: "2024-06-19T09:00:00Z",
        quiz: {
          intro: "Validate your diagnostic workflow.",
          questions: [
            {
              id: "event-log",
              prompt: "Which Windows tool should you consult to review system errors after a blue screen event?",
              options: [
                { value: "paint", label: "Microsoft Paint" },
                { value: "event_viewer", label: "Event Viewer" },
                { value: "calculator", label: "Calculator" }
              ],
              answer: "event_viewer",
              explanation: "Event Viewer logs system, application, and security events that help diagnose crashes and errors."
            }
          ]
        }
      },
      {
        id: 18,
        course_id: 5,
        title: "Managing Device Drivers",
        content: "<p>Update and reinstall device drivers safely using vendor tools and Windows Device Manager.</p><p>Study the difference between WHQL-certified drivers and manufacturer betas, then practice rolling back drivers if instability appears.</p><p>Establish a backup strategy for driver libraries across labs. Build a repository structure that tags drivers by device model, OS version, and installation notes.</p><p>Finish with a checklist ensuring accessibility devices receive priority updates.</p>",
        file_url: "https://example.com/files/device-drivers.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=update+device+drivers+windows",
        module_title: "Module 3: Device Drivers",
        module_description: "Ensure peripherals operate reliably after maintenance and upgrades.",
        module_sort_order: 3,
        lesson_index: "3.1",
        sort_order: 1,
        created_at: "2024-06-20T09:00:00Z",
        quiz: {
          intro: "Check your driver management knowledge.",
          questions: [
            {
              id: "driver-source",
              prompt: "Where should DBS technicians download drivers to ensure reliability?",
              options: [
                { value: "random_forums", label: "Random internet forums" },
                { value: "vendor_site", label: "Official manufacturer or trusted campus repository" },
                { value: "pirate_sites", label: "Unofficial torrent sites" }
              ],
              answer: "vendor_site",
              explanation: "Balancing security and compatibility requires sourcing drivers from trusted vendors or curated repositories."
            }
          ]
        }
      },
      {
        id: 19,
        course_id: 6,
        title: "Disk Management and Task Manager",
        content: "<p>Monitor performance and storage using Windows Task Manager and Disk Management.</p><p>Walk through interpreting CPU, memory, and disk graphs to identify runaway processes. Dig into SMART attributes to predict drive failure and practice shrinking and extending volumes.</p><p>Create partitions, assign drive letters, and capture screenshots for reports. Build an operational playbook summarizing recommended thresholds and alert triggers.</p>",
        file_url: "https://example.com/files/disk-management.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=task+manager+disk+management+guide",
        module_title: "Module 1: Using Disk Management and Task Manager",
        module_description: "Leverage built-in utilities to assess system health.",
        module_sort_order: 1,
        lesson_index: "1.1",
        sort_order: 1,
        created_at: "2024-06-21T09:00:00Z",
        quiz: {
          intro: "Ensure you can interpret system telemetry.",
          questions: [
            {
              id: "task-manager",
              prompt: "Which Task Manager tab helps you identify processes consuming the most CPU resources?",
              options: [
                { value: "startup", label: "Startup" },
                { value: "processes", label: "Processes" },
                { value: "users", label: "Users" }
              ],
              answer: "processes",
              explanation: "The Processes tab highlights per-process CPU usage so you can pinpoint heavy applications quickly."
            }
          ]
        }
      },
      {
        id: 20,
        course_id: 6,
        title: "Command Prompt Basics",
        content: "<p>Execute essential commands for networking, file management, and diagnostics.</p><p>Follow annotated walkthroughs showing how each command works, what outputs mean, and how to automate repetitive checks with scripts.</p><ul><li>Practice ipconfig, ping, tracert, and chkdsk scenarios.</li><li>Create reusable batch files for support teams.</li><li>Log command results to shared folders for collaborative troubleshooting.</li></ul><p>Round out the lesson by converting popular commands into PowerShell equivalents.</p>",
        file_url: "https://example.com/files/command-prompt-basics.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=command+prompt+basics",
        module_title: "Module 2: Command Prompt Basics",
        module_description: "Gain confidence with command-line utilities.",
        module_sort_order: 2,
        lesson_index: "2.1",
        sort_order: 1,
        created_at: "2024-06-22T09:00:00Z",
        quiz: {
          intro: "Test your command-line fundamentals.",
          questions: [
            {
              id: "ipconfig-task",
              prompt: "Which command renews a Windows device's IP address from the DHCP server?",
              options: [
                { value: "ping", label: "ping" },
                { value: "ipconfig_renew", label: "ipconfig /renew" },
                { value: "tracert", label: "tracert" }
              ],
              answer: "ipconfig_renew",
              explanation: "ipconfig /renew requests a new lease from the DHCP server, resolving many network connectivity issues."
            }
          ]
        }
      },
      {
        id: 21,
        course_id: 6,
        title: "File Compression and Extraction",
        content: "<p>Handle ZIP, RAR, and ISO archives using WinRAR, 7-Zip, and system tools.</p><p>Learn how to encrypt archives, split large files for easier distribution, and verify checksums before releasing resources to students.</p><p>Standardize archive naming conventions for DBS resource kits. Explore mounting ISO files as virtual drives and automating extraction tasks with command-line switches.</p><p>Design a storage policy for long-term archival of project deliverables.</p>",
        file_url: "https://example.com/files/file-compression.pdf",
        video_url: "https://www.youtube.com/embed?listType=search&list=file+compression+and+extraction",
        module_title: "Module 3: File Compression and Extraction",
        module_description: "Distribute and preserve learning resources efficiently.",
        module_sort_order: 3,
        lesson_index: "3.1",
        sort_order: 1,
        created_at: "2024-06-23T09:00:00Z",
        quiz: {
          intro: "Evaluate your handling of compressed resources.",
          questions: [
            {
              id: "checksum",
              prompt: "Why should you verify an archive's checksum before distributing it to learners?",
              options: [
                { value: "looks", label: "To change how the archive icon looks" },
                { value: "integrity", label: "To confirm the contents weren't corrupted or tampered with" },
                { value: "speed", label: "To increase download speed" }
              ],
              answer: "integrity",
              explanation: "Checksums authenticate that the archive matches the original and hasn't been altered during transfer."
            }
          ]
        }
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
