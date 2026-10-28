/**
 * CONFIDENTIAL // POLICE DATABASE SYSTEM // SUSPECT DOSSIER CONFIGURATION
 * SUBJECT IDENTIFICATION CODE: #FINOTELOZA-2026
 * DO NOT DISTRIBUTE OR MUTATE OUTSIDE AUTHORIZED OPERATOR PRIVILEGES.
 */

export const suspectData = {
  // Core Profile Vitals
  vitals: {
    suspectName: "Finoteloza",
    suspectId: "#FINOTELOZA-2026",
    aliases: "FRONTEND-DEV",
    yearStarted: 2024,
    location: "BAHIR DAR, ETHIOPIA",
    threatLevel: "HIGH", // Options: 'LOW', 'MEDIUM', 'HIGH', 'MAXIMUM'
    biometricMatch: "99.8%",
    deptIndex: "5542-X-CYBER"
  },

  // Offense Profile (Bio Narrative)
  bio: {
    title: "OFFENSE PROFILE // INVESTIGATION NOTES",
    summary: "INVESTIGATION SUMMARY",
    statusNote: "Status: Active, learning, and highly motivated",
    paragraphs: [
      "The suspect, known Finoteloza, first entered the programming world in 2024. Initial reports indicate repeated experimentation with C++, often resulting in unexpected errors, endless debugging sessions, and excessive use of online documentation.",
      "As the investigation progressed, the suspect developed a strong interest in web development and was later found operating with React, Node.js, Express, and MySQL.",
      "Authorities confirmed involvement in multiple personal and academic projects, including full-stack web applications, responsive user interfaces, and database-driven systems.",
      "Recent surveillance shows the suspect actively studying software architecture, operating systems, databases, networking, and modern web technologies while continuously expanding technical capabilities.",
      "Current threat assessment suggests a high probability of future involvement in large-scale software development projects."
    ]
  },

  // Known Weapons / Skills Registry
  skills: [
    {
      name: "React.js",
      category: "Frontend Weaponry",
      level: "90%",
      bagId: "EVID-RX-701",
      caseRef: "Case #001 & #002",
      recovered: "09-12-2021",
      notes: "Primary frontend rendering engine. High risk of responsive DOM manipulation."
    },
    {
      name: "JavaScript / ES6",
      category: "Core Arsenal",
      level: "95%",
      bagId: "EVID-JS-102",
      caseRef: "Core Framework",
      recovered: "04-03-2020",
      notes: "Core execution script. Used extensively in async loop constructions and node contexts."
    },
    {
      name: "Tailwind CSS",
      category: "Frontend Weaponry",
      level: "85%",
      bagId: "EVID-TW-934",
      caseRef: "Case #001 & #003",
      recovered: "01-15-2022",
      notes: "Utility-first layout wrapper. Used to build high-definition styles with minimum payload sizes."
    },
    {
      name: "Node.js / Express",
      category: "Backend Weaponry",
      level: "88%",
      bagId: "EVID-ND-804",
      caseRef: "Case #001 & #003",
      recovered: "06-20-2022",
      notes: "Event-driven server framework. Handles concurrent socket pipelines."
    },
    {
      name: "MySQL",
      category: "Database Asset",
      level: "80%",
      bagId: "EVID-MY-202",
      caseRef: "Case #002 & #003",
      recovered: "10-05-2022",
      notes: "Relational data vault. Storing visitor metadata and communication records."
    },
    {
      name: "Prisma ORM",
      category: "Database Asset",
      level: "85%",
      bagId: "EVID-PR-111",
      caseRef: "Case #002 & #003",
      recovered: "11-12-2022",
      notes: "Object-Relational mapping module. Standardized query builder for database schemas."
    },
    {
      name: "Socket.IO",
      category: "Communication Pipe",
      level: "90%",
      bagId: "EVID-SK-555",
      caseRef: "Case #001 & HQ Feed",
      recovered: "02-18-2023",
      notes: "Bi-directional web socket client. Pushes instant surveillance metrics to HQ."
    },
    {
      name: "Git / Version Control",
      category: "Tactical Tooling",
      level: "90%",
      bagId: "EVID-GT-007",
      caseRef: "General Audit",
      recovered: "02-10-2020",
      notes: "Distributed ledger system. Audits version diffs and code merges."
    }
  ],

  // Tech Stack categories (for layout groups)
  techStackCategories: {
    client: [
      "React.js / Vite / React Router",
      "Tailwind CSS (Tactical Styling)",
      "Framer Motion (Transitions)",
      "Socket.IO Client (Surveillance)",
      "Recharts / Chart.js (Telemetry)"
    ],
    server: [
      "Node.js / Express Server",
      "Socket.IO (Socket Servers)",
      "Prisma ORM / Sequelize",
      "MySQL Databases",
      "JWT Auth & bcrypt Encryption"
    ]
  },

  // Case Dossiers (Projects)
  cases: [
    {
      id: "case-001",
      number: "CASE #001",
      title: "Weather Intelligence System",
      subtitle: "Real-Time Weather Monitoring",
      description: "Weather application that provides current conditions and forecasts using external APIs.",
      fullDescription: "A responsive weather application built with React that fetches real-time weather data from a public API. Users can search for cities worldwide, view current temperature, humidity, wind speed, and weather forecasts. Features clean UI, API integration, and responsive design.",
      tech: ["HTML", "JavaScript", "Weather API", "CSS"],
      status: "DEPLOYED",
      statusColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/20",
      role: "Frontend Developer",
      github: "https://github.com/finoteloza549/Weather-app",
      demo: "https://weather-app-pied-iota-68.vercel.app/"
    },
    {
      id: "case-002",
      number: "CASE #002",
      title: "Task Management System",
      subtitle: "Personal Productivity Tracker",
      description: "A to-do application for organizing and tracking daily tasks.",
      fullDescription: "A task management application that allows users to create, edit, complete, and delete tasks. Features local storage persistence, filtering, and responsive design to improve daily productivity.",
      tech: ["HTML", "JavaScript", "Local Storage", "CSS"],
      status: "DEPLOYED",
      statusColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/20",
      role: "Frontend Developer",
      github: "https://github.com/finoteloza549",
      demo: "https://to-do-list-app-dun-nine.vercel.app/"
    },
    {
      id: "case-003",
      number: "CASE #003",
      title: "Personal Portfolio",
      subtitle: "Developer Showcase Platform",
      description: "Professional portfolio website showcasing projects and skills.",
      fullDescription: "A modern portfolio website designed to showcase projects, technical skills, education, and contact information. Built with React and Tailwind CSS featuring responsive design, animations, and project galleries.",
      tech: ["React", "Tailwind CSS", "JavaScript", "Framer Motion"],
      status: "ACTIVE",
      statusColor: "text-police-cyan border-police-cyan/40 bg-cyan-950/20",
      role: "Full-Stack Developer",
      github: "https://github.com/finoteloza549/unique-portfolio",
      demo: "https://unique-portfolio-n593.vercel.app/"
    }
  ],

  // Timeline Incidents
  incidents: [
    {
      year: "2026 - PRESENT",
      incidentCode: "CR-2026-404",
      title: "Wanted FRONTEND Developer",
      location: "CYBER NETWORKS",
      description: "Currently under investigation for learning React, Node.js, Express, databases, and full-stack application development. Suspected of building increasingly advanced websites.",
      status: "ACTIVE INVESTIGATION",
      iconColor: "bg-emerald-500 shadow-[0_0_10px_#10b981]",
      statusColor: "text-emerald-400 bg-emerald-950/20 border-emerald-500/30"
    },
    {
      year: "2026",
      incidentCode: "CR-2026-302",
      title: "Weather Intelligence Operation",
      location: "API SURVEILLANCE NODE",
      description: "Successfully constructed a weather intelligence system capable of tracking real-time meteorological conditions through external API surveillance networks.",
      status: "CASE CLOSED",
      iconColor: "bg-police-cyan shadow-[0_0_10px_#00f0ff]",
      statusColor: "text-police-cyan bg-police-cyan/10 border-police-cyan/30"
    },
    {
      year: "2026",
      incidentCode: "CR-2026-201",
      title: "Task Management Conspiracy",
      location: "LOCAL STORAGE GRID",
      description: "Developed a productivity monitoring platform allowing subjects to create, update, track, and eliminate assignments. Evidence stored locally for future review.",
      status: "CASE CLOSED",
      iconColor: "bg-police-cyan shadow-[0_0_10px_#00f0ff]",
      statusColor: "text-police-cyan bg-police-cyan/10 border-police-cyan/30"
    },
    {
      year: "2024",
      incidentCode: "CR-2023-001",
      title: "First Programming Offense",
      location: "C++ COMPILING MATRIX",
      description: "Initial exposure to programming concepts including variables, loops, conditions, functions, and problem solving. This incident marked the beginning of the criminal coding career.",
      status: "FILE ARCHIVED",
      iconColor: "bg-police-amber shadow-[0_0_10px_#ffb300]",
      statusColor: "text-police-amber bg-police-amber/10 border-police-amber/30"
    }
  ]
};
