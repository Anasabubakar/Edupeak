

export const sampleCurriculum = {
  title: "CS101: Introduction to Computer Science",
  description: "Fundamental concepts of computing and programming.",
  content: `This course introduces the fundamental concepts of computer science and programming. You will learn about algorithms, data structures, and the basics of software development. We will explore how computers solve problems and how to write code to automate tasks. Topics include variables, loops, conditionals, functions, and object-oriented programming.`,
  notesHtml: `
    <h3 class="font-semibold text-lg text-card-foreground">Lecture 1: Algorithms</h3>
    <p>An algorithm is a step-by-step procedure for solving a problem. It's like a recipe for a computer.</p>
    <pre class="bg-muted text-muted-foreground px-4 py-2 rounded-lg my-4"><code>Input -> Algorithm -> Output</code></pre>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Efficiency:</strong> How fast an algorithm runs.</li>
      <li><strong>Correctness:</strong> Whether the algorithm produces the right result.</li>
    </ul>
    <h4 class="font-semibold text-md text-card-foreground mt-4">Example: Sorting</h4>
    <p>Sorting a list of numbers is a classic algorithmic problem. Bubble sort, Merge sort, and Quick sort are common algorithms used to solve this.</p>
  `,
};


export const studentData = {
  name: "Adebayo Adekunle",
  progress: 75,
  points: 1250,
  skillQuests: [
    { id: 1, title: "CS101: Intro to CS", completed: true },
    { id: 2, title: "ECON101: Microeconomics", completed: true },
    { id: 3, title: "MATH101: Calculus I", completed: false },
    { id: 4, title: "ENG101: Academic Writing", completed: false },
  ],
};

export const studentProgressData = {
  user: {
    name: "Alex",
    initials: "A",
    avatar: "https://picsum.photos/seed/alex/100/100",
  },
  subjects: [
    { name: "Computer Science", progress: 85 },
    { name: "Economics", progress: 60 },
    { name: "Calculus", progress: 40 },
  ],
  skillQuests: [
    { title: "Binary Search Trees", progress: 60, status: "Recommended" },
    { title: "Supply and Demand", progress: 35, status: "In Progress" },
    { title: "Derivatives", progress: 80, status: "Overdue" },
  ],
  badges: [
    { name: "Code Warrior", achieved: true },
    { name: "Market Analyst", achieved: true },
    { name: "Math Whiz", achieved: false },
    { name: "Writer's Block", achieved: false },
  ],
};

export const resilienceData = {
  resilienceIndex: 88,
  scholarships: [
    { id: 1, title: "University STEM Grant", field: "STEM", deadline: "2024-10-31" },
    { id: 2, title: "Global Economics Scholarship", field: "Economics", deadline: "2024-09-15" },
    { id: 3, title: "Academic Excellence Award", field: "Various", deadline: "2024-11-20" },
    { id: 4, title: "Research Fellowship", field: "Research", deadline: "2024-08-30" },
  ]
};

export const resilienceHubData = {
  resilienceIndex: 75,
  coreSkills: [
    { name: "Time Management", progress: 90 },
    { name: "Critical Thinking", progress: 80 },
    { name: "Research Methods", progress: 60 },
  ],
  competition: {
    title: "University Hackathon 2024",
    description: "Build the next big thing in ed-tech. Teams of 4. Grand prize: $5000.",
  },
  scholarships: [
    { id: 1, title: "Tech Innovators Scholarship", description: "For students pursuing tech degrees." },
    { id: 2, title: "Young Entrepreneur Grant", description: "Funding for your first business venture." },
    { id: 3, title: "Future Leaders Award", description: "Recognizing community leadership potential." },
  ],
  readinessChecklist: [
    { id: 1, label: "Personal Essay Drafted", checked: true },
    { id: 2, label: "Recommendation Letter Requested", checked: true },
    { id: 3, label: "Financial Documents Prepared", checked: false },
  ],
  mentorTip: "Start your scholarship essays early to give yourself plenty of time for revisions!",
};


export const teacherAnalyticsData = {
  students: [
    { id: 1, name: "Amina Yusuf", skillMastery: 92, completionRate: 100, lastActive: "2 hours ago" },
    { id: 2, name: "Chinedu Okafor", skillMastery: 78, completionRate: 85, lastActive: "1 day ago" },
    { id: 3, name: "Bolanle Adeoye", skillMastery: 65, completionRate: 70, lastActive: "3 days ago" },
    { id: 4, name: "Musa Ibrahim", skillMastery: 88, completionRate: 95, lastActive: "5 hours ago" },
    { id: 5, name: "Ngozi Eze", skillMastery: 55, completionRate: 60, lastActive: "1 week ago" },
    { id: 6, name: "Tunde Bakare", skillMastery: 95, completionRate: 100, lastActive: "Just now" },
  ],
  classAverage: {
    skillMastery: 79,
    completionRate: 85,
  },
  difficultAreas: [
    "Advanced Algorithms",
    "Macroeconomic Theory",
    "Multivariable Calculus",
  ]
};

export const tpdModules = [
  { id: 1, title: "Modern Pedagogy in Higher Ed", progress: 100, certificate: true, imageId: "pedagogy" },
  { id: 2, title: "Integrating AI in Curriculum", progress: 75, certificate: false, imageId: "classroom-management" },
  { id: 3, title: "Research Methodologies", progress: 20, certificate: false, imageId: "digital-skills" },
  { id: 4, title: "Grant Writing for Academics", progress: 0, certificate: false, imageId: "financial-literacy" },
];

export const iadtData = {
  facilityHealth: [
    { title: "Computer Lab", status: 45, color: "hsl(var(--chart-2))" },
    { title: "Lecture Halls", status: 60, color: "hsl(var(--chart-4))" },
    { title: "Library", status: 85, color: "hsl(var(--chart-1))" },
    { title: "Research Center", status: 70, color: "hsl(var(--chart-5))" },
  ],
  maintenanceRequests: [
    { id: "REQ-001", issue: "Projector in Hall A", status: "Resolved", reported: "2024-05-10", resolutionTime: "5 days" },
    { id: "REQ-002", issue: "Server Room AC", status: "In Progress", reported: "2024-05-20", resolutionTime: "N/A" },
    { id: "REQ-003", issue: "Chairs in Lab 3", status: "Open", reported: "2024-05-28", resolutionTime: "N/A" },
    { id: "REQ-004", issue: "Wifi Access Point", status: "Resolved", reported: "2024-04-15", resolutionTime: "2 days" },
  ],
  assetUtilization: [
    { name: "Jan", "Digital Skills": 400, "Financial Literacy": 240 },
    { name: "Feb", "Digital Skills": 300, "Financial Literacy": 139 },
    { name: "Mar", "Digital Skills": 200, "Financial Literacy": 980 },
    { name: "Apr", "Digital Skills": 278, "Financial Literacy": 390 },
    { name: "May", "Digital Skills": 189, "Financial Literacy": 480 },
    { name: "Jun", "Digital Skills": 239, "Financial Literacy": 380 },
  ]
};

export const skillQuests = [
  {
    id: 1,
    title: "Intro to Python",
    subject: "Computer Science",
    difficulty: "Easy",
    progress: 75,
  },
  {
    id: 2,
    title: "Market Structures",
    subject: "Economics",
    difficulty: "Medium",
    progress: 100,
  },
  {
    id: 3,
    title: "Limits and Continuity",
    subject: "Calculus",
    difficulty: "Easy",
    progress: 25,
  },
  {
    id: 4,
    title: "Essay Structure",
    subject: "Academic Writing",
    difficulty: "Hard",
    progress: 0,
  },
];

export const certificates = [
  { id: 1, title: "Certified Python Developer", date: "15/08/2024", imageId: "cert-digital" },
  { id: 2, title: "Microeconomics Principles", date: "22/07/2024", imageId: "cert-math" },
  { id: 3, title: "Academic Writing Proficiency", date: "05/06/2024", imageId: "cert-english" },
];
