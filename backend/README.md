# DevPulse - Backend Platform API Documentation

DevPulse is a production-level, highly scalable, and modular backend system built on **Node.js, Express.js, MongoDB (Mongoose), and OpenAI**. It acts as a comprehensive developer analytics platform that tracks daily coding streaks, parses resume PDF text for automated ATS scoring and optimization matching a Job Description, schedules upcoming coding contests, and audits live public GitHub accounts for contributions, languages, and activity analytics.

---

## 🚀 Key Modules & Architecture

* **Scalable MVC-S (Model-View-Controller-Service) Architecture**: Clean separation of routing layers, validation schemas, business controllers, and third-party API services.
* **Authentication**: Stateless, production-ready JWT token system backed by secure `bcryptjs` password hashing.
* **Zod Payload Validation**: Rigorous validation schemas defending all HTTP entry pathways, returning readable field-specific errors.
* **Resume Optimization Engine**: Multi-part upload handler capturing PDF files on disk and running raw buffer parsing (`pdf-parse`) before evaluating compliance metrics and suggesting bullet point rewrites through OpenAI's GPT models.
* **Gamified Developer Coding Tracker**: Daily metrics log rewarding coding activity with increments to streaks and `devScore` (+10 points daily baseline, +5 points per solved competitive question) using Duolingo-style streak checkups.
* **Coding Contest Reminder Feed**: Aggregates schedules for LeetCode, Codeforces, and CodeChef using free online aggregators, caching events locally, calculating live countdown time-remaining strings, and enabling users to toggle calendar reminder flags.
* **Live GitHub Aggregator**: Audits standard public handles, compiling star counts, followers, language percentage shares, and push/issue/PR counts within the public activity feed.

---

## 🛠️ Getting Started & Local Installation

### Prerequisites
* [Node.js](https://nodejs.org/en) (v16+ recommended)
* [MongoDB](https://www.mongodb.com/) (Local Community Server running on `mongodb://localhost:27017` or MongoDB Atlas URI)

### Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment variables:
   Copy `.env.example` into a local `.env` file:
   ```bash
   cp .env.example .env
   ```
   Modify `.env` variables:
   * `PORT`: Port server runs on (default: `5000`)
   * `MONGO_URI`: Standard Mongo connection string.
   * `JWT_SECRET`: Secure encryption key (min 8 chars).
   * `OPENAI_API_KEY`: API key for GPT auditing (falls back to smart mock engine if key is blank/mock).
   * `GITHUB_API_KEY`: GitHub personal token to increase API rate limits (optional, falls back to public rate limits/mocks).

4. Run the Dev Server:
   ```bash
   npm run dev
   ```
   *The server starts listening at [http://localhost:5000](http://localhost:5000) and prints a green console verification upon connecting to MongoDB successfully.*

---

## 📡 API Reference Index

### 1. Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new developer credentials and get JWT token |
| `POST` | `/api/auth/login` | Public | Authenticate developer, return token and profile |
| `GET` | `/api/auth/me` | Private | Fetch details of the current logged-in user |
| `POST` | `/api/auth/logout` | Private | Stateless logout clearance indicator |

#### 🔑 Register Developer Example
* **Request:** `POST http://localhost:5000/api/auth/register`
* **Body (JSON):**
  ```json
  {
    "username": "coder_neo",
    "email": "neo@devpulse.ai",
    "password": "supersecurepassword123",
    "githubUsername": "neocoder-git",
    "skills": ["JavaScript", "Node.js"]
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User registered successfully!",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "6472fa998a44d82b3d...",
        "username": "coder_neo",
        "email": "neo@devpulse.ai",
        "githubUsername": "neocoder-git",
        "skills": ["JavaScript", "Node.js"],
        "streak": 0,
        "devScore": 0,
        "createdAt": "2026-05-28T05:00:00.000Z"
      }
    }
  }
  ```

---

### 2. Developer Profiles (`/api/users`)

*All routes under this module require header: `Authorization: Bearer <JWT_TOKEN>`*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `PUT` | `/api/users/profile` | Update profile fields (username, avatar, githubUsername, skills) |
| `GET` | `/api/users/stats` | Retrieve aggregated dashboard rank and weekly devScore metrics |
| `POST` | `/api/users/score` | Manually increment devScore points or streaks (manually triggered actions) |

---

### 3. AI Resume Analyzer (`/api/resumes`)

*All routes under this module require header: `Authorization: Bearer <JWT_TOKEN>`*

| Method | Endpoint | Content-Type | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/resumes/analyze` | `multipart/form-data` | Upload PDF/Docx, parse text, audit matching score, and write optimization suggestions |
| `GET` | `/api/resumes/history` | `application/json` | Fetch all historical resume comparison cards for the user |
| `GET` | `/api/resumes/:id` | `application/json` | Fetch specific resume audit card, including extracted raw text |

#### 📂 Analyze Resume Example
* **Request:** `POST http://localhost:5000/api/resumes/analyze`
* **Multipart Form-Data fields:**
  * `resume`: [Choose File: `resume_john.pdf`]
  * `jobDescription`: `"Seeking a backend engineer with 3+ years experience in Node.js, Express, and MongoDB. Familiarity with React and Redux is a strong plus."`
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Resume audited and optimized successfully!",
    "data": {
      "_id": "6472fba12b3d8a44d8...",
      "fileName": "resume_john.pdf",
      "atsScore": 82,
      "missingSkills": ["React", "Redux"],
      "strengths": ["Strong Node.js experience", "Express setup proficiency", "MongoDB design skills"],
      "weakAreas": ["Lack of highlighted state management experience"],
      "optimizedContent": "### Resume summary suggestion:\nExpert backend engineer... with deep experience utilizing standard frameworks...",
      "createdAt": "2026-05-28T05:05:00.000Z"
    }
  }
  ```

---

### 4. Coding Tracker Dashboard (`/api/tracker`)

*All routes under this module require header: `Authorization: Bearer <JWT_TOKEN>`*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/tracker/progress` | Submit or update coding progress, solved questions, and weekly checklist goals |
| `GET` | `/api/tracker/history` | List complete history calendar logs |

#### 📝 Add Daily Coding Progress Example
* **Request:** `POST http://localhost:5000/api/tracker/progress`
* **Body (JSON):**
  ```json
  {
    "solvedQuestionCount": 3,
    "weeklyGoals": [
      { "title": "Solve 10 questions on LeetCode", "isCompleted": false },
      { "title": "Read modular routing design patterns", "isCompleted": true }
    ],
    "dailyProgress": "Learned Express MVC setups, resolved 3 LeetCode dynamic programming questions."
  }
  ```
* **Success Response (201 Created / 200 OK):**
  ```json
  {
    "success": true,
    "message": "Daily progress logged successfully!",
    "data": {
      "log": {
        "_id": "6472fc92b3d8a44d...",
        "user": "6472fa998a44d82b3d...",
        "date": "2026-05-28",
        "solvedQuestionCount": 3,
        "weeklyGoals": [
          { "title": "Solve 10 questions on LeetCode", "isCompleted": false },
          { "title": "Read modular routing design patterns", "isCompleted": true }
        ],
        "dailyProgress": "Learned Express MVC setups..."
      },
      "devScore": 25, // +10 base + 15 for 3 questions
      "streak": 1, // Streak incremented
      "pointsAwarded": 25
    }
  }
  ```

---

### 5. Contest Schedules Reminder (`/api/contests`)

*All routes under this module require header: `Authorization: Bearer <JWT_TOKEN>`*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/contests` | Fetch all synchronized upcoming contests, remaining countdown times, and reminder flags |
| `POST` | `/api/contests/:id/reminder` | Register current user ID to toggle a reminder trigger for that contest |
| `DELETE` | `/api/contests/:id/reminder` | Delete user ID to disable a reminder for that contest |

---

### 6. GitHub Analytics Module (`/api/github`)

*All routes under this module require header: `Authorization: Bearer <JWT_TOKEN>`*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/github/analytics/:username?` | Gather full public followers, stars, forks, languages percentage share, and 90-day activity trends |

#### 📊 Fetch GitHub Analytics Example
* **Request:** `GET http://localhost:5000/api/github/analytics` (Queries connected profile username)
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "GitHub metrics aggregated successfully for user: neocoder-git!",
    "data": {
      "username": "neocoder-git",
      "name": "Neo Coder",
      "followers": 48,
      "publicReposCount": 12,
      "totalStars": 38,
      "languages": {
        "TypeScript": 60,
        "JavaScript": 30,
        "HTML": 10
      },
      "activity": {
        "totalRecentCommits": 32,
        "totalRecentPRs": 4,
        "totalRecentIssues": 2,
        "totalRecentContributions": 38,
        "contributionTrend": {
          "2026-05-28": 5,
          "2026-05-27": 8,
          "2026-05-26": 3
        }
      }
    }
  }
  ```

---

## 🧪 Code Quality & Custom Features

1. **Self-Validating Startup**: Built using strict Zod configurations. Any missing environment key blocks process boot and returns validation warnings.
2. **Double-Ended Integrations**: Designed to run seamlessly in off-grid environments or offline development. If OpenAI or GitHub connections fail or lack credentials, the services fallback on dynamic mock data generators matching actual target JDs or GitHub APIs.
3. **Advanced Mongoose Hooks**: User models pre-save hook intercepts password changes automatically, hashing passwords prior to writing them to database indexes.
4. **Decoupled Business Services**: Standard Express controllers handle response delivery, completely delegating external API queries, calculations, and data syncs to the services layers.
