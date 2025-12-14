 Detect_X — AI Crime Suspect Identification Platform

**Detect_X** is a powerful full-stack forensic application featuring AI-driven sketch generation, intelligent case management, and seamless investigation workflows. Built with React (MERN Stack) and the FIBO Image API, Detect_X offers a modern approach to criminal identification by transforming eyewitness descriptions into realistic forensic sketches instantly.

### 🚀 [View Live Demo (detectc.netlify.app)](https://detectc.netlify.app)

---

## 🌟 Key Features

### 🎨 Core Sketching Features
* **AI-Powered Generation:** Instantly transforms text descriptions into pencil-style forensic sketches using FIBO API.
* **Conversational Refinement:** Iteratively refine facial features through a natural language chat interface.
* **Real-time Rendering:** Fast processing ensures immediate visual feedback for investigators.
* **High-Res Export:** Download sketches in high-resolution formats for official police reports.

### 🕵️‍♂️ Investigation Management
* **Digital Case Logs:** Create, organize, and archive specific criminal cases with unique Case IDs.
* **History Tracking:** Every sketch iteration is saved, allowing investigators to revert to previous versions.
* **Metadata Storage:** Automatically logs timestamp, location, and officer details with every case.
* **Secure Access:** Role-based access control ensuring only authorized personnel view sensitive case files.

### 🧠 Smart Analysis & Context
* **Confidence Scoring:** AI provides a percentage score indicating how well the sketch matches the provided description.
* **Vague Description Alerts:** Smart detection warns users if the input description is too generic (e.g., "Average male").
* **Conflict Detection:** Alerts the user if the description contains contradictions (e.g., "Blue eyes" vs "Dark eyes").
* **Context Preservation:** The AI remembers previous prompts within a session to ensure consistent refinements.

### 🎨 User Experience
* **Modern Dashboard:** Clean, command-center style interface designed for high-stress environments.
* **Dark Mode Support:** Optimized UI for low-light control room usage.
* **Responsive Design:** Works seamlessly on desktop workstations and field tablets.
* **Keyboard Shortcuts:** Quick navigation for rapid data entry during investigations.

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                          Detect_X                           │
├─────────────────┬─────────────────┬─────────────────────────┤
│    Frontend     │     Backend     │    External Services    │
│    (React +     │    (Node.js +   │                         │
│   Tailwind)     │     Express)    │                         │
├─────────────────┼─────────────────┼─────────────────────────┤
│ • Sketch UI     │ • REST API      │ • MongoDB Atlas         │
│ • Chat Console  │ • Auth System   │ • FIBO Image API        │
│ • Case Dashboard│ • Case Logic    │ • AWS S3 (Optional)     │
│ • History View  │ • Image Process │                         │
│ • User Settings │ • Logging       │                         │
└─────────────────┴─────────────────┴─────────────────────────┘
🚀 Getting StartedPrerequisitesBefore you begin, ensure you have the following installed:Node.js 18+ and npmMongoDB (local installation or MongoDB Atlas account)FIBO API Key (for image generation)Installation1. Clone the RepositoryBashgit clone [https://github.com/yourusername/detect-x.git](https://github.com/yourusername/detect-x.git)
cd detect-x
2. Backend SetupBash# Navigate to backend directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
Edit server/.env with your configuration:Code snippet# Database Configuration
MONGO_URI=mongodb://localhost:27017/detectx
# Or use MongoDB Atlas connection string

# Authentication
JWT_SECRET=your-secure-jwt-secret-key

# AI Service
FIBO_API_KEY=your-fibo-api-key-here

# Server Configuration
PORT=5000
NODE_ENV=development
3. Frontend SetupBash# Navigate to frontend directory
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
Edit client/.env:Code snippetVITE_API_URL=http://localhost:5000
4. Start the ApplicationBash# Start backend (from /server)
npm run dev

# In a new terminal, start frontend (from /client)
npm run dev
5. Access the ApplicationFrontend: http://localhost:5173Backend API: http://localhost:5000First Time SetupOpen http://localhost:5173 in your browser.Register a new officer account.Navigate to the Dashboard and click "New Case".Enter the suspect description to generate your first sketch.🎯 How to Use Detect_XCreating a Forensic Sketch1. Initialize CaseClick "New Case" in the sidebar.Enter Case Number, Incident Type, and Location.2. Describe SuspectIn the chat panel, type a detailed description.Example: "Male, 40s, oval face, receding hairline, thick eyebrows, scar on left cheek."Press Generate.3. Refine & IterateRefine: Use the chat to tweak features.Command: "Make the nose slightly wider and eyes darker."Compare: Use the history slider to compare the current sketch with previous versions.4. FinalizeClick "Save to Case" to lock the sketch.Click "Export" to download as PNG/JPG.Case ManagementSearch & RetrieveUse the search bar to find cases by ID or Date.Filter cases by status (Open, Closed, Pending).Smart AlertsIf a red warning icon appears next to the input bar, hover over it.The system will suggest adding missing details (e.g., "Missing eye color" or "Specify hair texture").🔧 ConfigurationBackend Environment VariablesVariableDescriptionRequiredDefaultMONGO_URIMongoDB connection stringYes-JWT_SECRETSecret key for auth tokensYes-FIBO_API_KEYKey for Image Gen ServiceYes-PORTServer portNo5000NODE_ENVEnvironment modeNodevelopmentFrontend Environment VariablesVariableDescriptionRequiredDefaultVITE_API_URLBackend API EndpointYeshttp://localhost:5000🧪 TestingBackend TestsBashcd server
# Run all API tests
npm test
Frontend TestsBashcd client
# Run UI component tests
npm test
🚢 DeploymentProduction BuildBackend:Bashcd server
npm run build
npm start
Frontend:Bashcd client
npm run build
npm run preview
🐛 TroubleshootingCommon IssuesFIBO API Errors (401/429)Verify your API Key in .env.Check if you have exceeded your daily generation quota.MongoDB Connection FailedEnsure mongod service is running locally.Check if your IP is whitelisted in MongoDB Atlas.CORS ErrorVerify VITE_API_URL in the frontend matches the Backend port.Check cors configuration in server/index.js.Images Not LoadingEnsure the backend uploads folder exists if storing locally.Check console for broken URL paths.🤝 ContributingWe welcome contributions from the open-source community!Fork the repository.Create a feature branch: git checkout -b feature/amazing-featureCommit your changes: git commit -m 'Add amazing feature'Push to the branch: git push origin feature/amazing-featureOpen a Pull Request.📄 LicenseThis project is licensed under the MIT License - see the LICENSE file for details.📞 Support & ContactIssues: GitHub IssuesEmail: support@detectx-app.comDocumentation: /docs folder<br /><p align="center">Built with ❤️ for Public Safety</p>
