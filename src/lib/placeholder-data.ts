

export const sampleCurriculum = {
  title: "Lesson 1: Calculating Profit",
  description: "Learn how to determine if a business is making money.",
  content: `To calculate profit, you must subtract your total costs from your total revenue. For example, if a street vendor selling roasted corn (or "Agbado" as it's locally known) spends 500 Naira on corn and charcoal, and sells the corn for a total of 1500 Naira, the profit is 1000 Naira. This principle can be applied to any small business, from a tailor in Aba to a fish seller in Yenagoa.`,
  notesHtml: `
    <h3 class="font-semibold text-lg text-card-foreground">What is Profit?</h3>
    <p>Profit is the financial gain made in a transaction or business period. It's the money left over after all the expenses have been paid. The formula is simple:</p>
    <pre class="bg-muted text-muted-foreground px-4 py-2 rounded-lg my-4"><code>Revenue - Costs = Profit</code></pre>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Revenue:</strong> The total amount of money generated from selling goods or services.</li>
      <li><strong>Costs:</strong> The total expenses incurred to create and sell the goods or services (e.g., materials, labor, rent).</li>
    </ul>
    <h4 class="font-semibold text-md text-card-foreground mt-4">Local Example: A "Boli" Seller in Port Harcourt</h4>
    <p>Imagine a roadside seller of roasted plantain ("Boli") and fish.
    <br/>- Cost of raw plantains and fish: ₦3,000
    <br/>- Cost of charcoal and oil: ₦500
    <br/>- Total daily sales (Revenue): ₦7,500
    <br/>- Total Costs: ₦3,000 + ₦500 = ₦3,500
    <br/>- Daily Profit: ₦7,500 - ₦3,500 = ₦4,000
    </p>
  `,
};


export const studentData = {
  name: "Adebayo Adekunle",
  progress: 75,
  points: 1250,
  skillQuests: [
    { id: 1, title: "Introduction to Digital Literacy", completed: true },
    { id: 2, title: "Fundamentals of Financial Resilience", completed: true },
    { id: 3, title: "Advanced Problem Solving", completed: false },
    { id: 4, title: "Basics of Entrepreneurship", completed: false },
  ],
};

export const studentProgressData = {
  user: {
    name: "Alex",
    initials: "A",
    avatar: "https://picsum.photos/seed/alex/100/100",
  },
  subjects: [
    { name: "Mathematics", progress: 75 },
    { name: "English Language", progress: 50 },
    { name: "Basic Science", progress: 100 },
  ],
  skillQuests: [
    { title: "Algebra Basics", progress: 60, status: "Recommended" },
    { title: "Poetry Analysis", progress: 35, status: "In Progress" },
    { title: "Nigerian History", progress: 80, status: "Overdue" },
  ],
  badges: [
    { name: "Math Magician", achieved: true },
    { name: "Grammar Guru", achieved: true },
    { name: "Science Whiz", achieved: true },
    { name: "History Buff", achieved: false },
  ],
};

export const resilienceData = {
  resilienceIndex: 88,
  scholarships: [
    { id: 1, title: "MTN Science & Technology Scholarship", field: "STEM", deadline: "2024-10-31" },
    { id: 2, title: "NLNG Postgraduate Scholarship", field: "Engineering, Geosciences", deadline: "2024-09-15" },
    { id: 3, title: "NNPC/Total National Merit Scholarship", field: "Various", deadline: "2024-11-20" },
    { id: 4, title: "UBA Foundation National Essay Competition", field: "Essay", deadline: "2024-08-30" },
  ]
};

export const resilienceHubData = {
  resilienceIndex: 75,
  coreSkills: [
    { name: "Budgeting", progress: 90 },
    { name: "Saving", progress: 80 },
    { name: "Investing", progress: 60 },
  ],
  competition: {
    title: "National Business Pitch Competition",
    description: "Showcase your entrepreneurial spirit and win seed funding for your business idea. Applications close soon!",
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
    "Advanced Algorithmic Thinking",
    "Capital Investment Analysis",
    "Network Security Principles",
  ]
};

export const tpdModules = [
  { id: 1, title: "Modern Pedagogy in the Digital Age", progress: 100, certificate: true, imageId: "pedagogy" },
  { id: 2, title: "Integrating EDUPEAK in Your Classroom", progress: 75, certificate: false, imageId: "classroom-management" },
  { id: 3, title: "Teaching Physics with Local Examples", progress: 20, certificate: false, imageId: "digital-skills" },
  { id: 4, title: "Financial Literacy for Educators", progress: 0, certificate: false, imageId: "financial-literacy" },
];

export const iadtData = {
  facilityHealth: [
    { title: "Lab Functionality", status: 45, color: "hsl(var(--chart-2))" },
    { title: "Sanitation Facilities", status: 60, color: "hsl(var(--chart-4))" },
    { title: "Furniture Adequacy", status: 85, color: "hsl(var(--chart-1))" },
    { title: "Library Resources", status: 70, color: "hsl(var(--chart-5))" },
  ],
  maintenanceRequests: [
    { id: "REQ-001", issue: "Leaking Roof in Classroom 3", status: "Resolved", reported: "2024-05-10", resolutionTime: "5 days" },
    { id: "REQ-002", issue: "Broken Lab Equipment (Microscope #2)", status: "In Progress", reported: "2024-05-20", resolutionTime: "N/A" },
    { id: "REQ-003", issue: "Insufficient Chairs in JSS2", status: "Open", reported: "2024-05-28", resolutionTime: "N/A" },
    { id: "REQ-004", issue: "Faulty Wiring in Admin Block", status: "Resolved", reported: "2024-04-15", resolutionTime: "2 days" },
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
        title: "Introduction to Algebra",
        subject: "Mathematics",
        difficulty: "Easy",
        progress: 75,
    },
    {
        id: 2,
        title: "Reading Comprehension",
        subject: "English Studies",
        difficulty: "Medium",
        progress: 100,
    },
    {
        id: 3,
        title: "Photosynthesis Basics",
        subject: "Basic Science",
        difficulty: "Easy",
        progress: 25,
    },
    {
        id: 4,
        title: "Nigerian Civil War History",
        subject: "Social Studies",
        difficulty: "Hard",
        progress: 0,
    },
];

export const certificates = [
  { id: 1, title: "Digital Literacy Certification Level 1", date: "15/08/2024", imageId: "cert-digital" },
  { id: 2, title: "Foundational Mathematics", date: "22/07/2024", imageId: "cert-math" },
  { id: 3, title: "Basic English Proficiency", date: "05/06/2024", imageId: "cert-english" },
];
