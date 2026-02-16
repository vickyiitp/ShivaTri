
# 🔱 VickyIiitp: The Venture Operating System

![Status](https://img.shields.io/badge/Status-Active-success)
![Stack](https://img.shields.io/badge/Tech-React%20%7C%20Gemini%20AI%20%7C%20Tailwind-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

**VickyIiitp** is a next-generation, AI-driven startup accelerator and legal foresight engine. It combines advanced Generative AI with a divine, high-performance 3D interface to validate business ideas, identify market gaps, and provide concrete execution roadmaps with a focus on Indian legal compliance.

---

## 🚀 Key Features

### 🧠 Divine Intelligence Engine
- **Deep Validation**: Instantly analyzes startup ideas for viability, giving a specific "Valid/Invalid" verdict.
- **Multi-Query Processing**: Capable of handling complex, multi-part questions (e.g., "How to register AND How to market?") in a single run.
- **SWOT Analysis**: Automatically generates Strengths, Weaknesses, Opportunities, and Threats.

### 🛡️ The Trishul Protocol (Legal & Strategy)
- **Legal Compliance**: Provides specific Indian legal advice (IT Act, Company incorporation).
- **Government Schemes**: Identifies relevant Startup India schemes and government benefits.
- **IP Strategy**: Suggests trademark and patent strategies.

### ⚡ Execution Roadmap
- **8-Phase Plan**: Generates a step-by-step guide from "Idea" to "Launch".
- **Video Learning**: intelligently suggests curated YouTube search queries for self-learning.
- **Smart Follow-up**: Suggests the *next* logical questions a founder should ask.

### 🎨 Immersive Experience
- **Real-Time 3D VFX**: Features a reactive 3D "Trishul" (Trident) that responds to scroll and mouse movement physics.
- **Responsive Design**: Fully optimized for Mobile, Tablet, Desktop, and 4K displays.
- **Zero-Lag Architecture**: Optimized rendering loop for high performance on low-end devices.

---

## 🛠️ Tech Stack

This project uses a modern, high-performance frontend stack:

- **Core Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/) (`gemini-3-flash-preview`)
- **SDK**: `@google/genai`
- **Build Tool**: Vite / ESM (inferred)
- **Fonts**: Syne & Outfit (Google Fonts)

---

## 📂 Project Structure

```bash
├── index.html              # Entry point & global styles
├── index.tsx               # React Root & Mounting
├── App.tsx                 # Main Logic, Routing, 3D Physics Engine
├── constants.ts            # System Prompts & Model Configuration
├── types.ts                # TypeScript Interfaces (Data Models)
├── services/
│   └── geminiService.ts    # Google GenAI API Integration & Schema
└── components/
    ├── LandingPage.tsx     # Scroll-based Parallax Landing Experience
    └── AnalysisResult.tsx  # The Analysis Dashboard & Data Rendering
```

---

## ⚙️ Installation & Setup

Follow these steps to run the Divine Engine locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vickyiitp.git
cd vickyiitp
```

### 2. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
# OR
yarn install
```

### 3. Configure API Key
The application requires a Google Gemini API Key.
1. Get your key from [Google AI Studio](https://aistudio.google.com/).
2. Create a `.env` file in the root directory:
```env
API_KEY=your_google_gemini_api_key_here
```
*Note: The application expects `process.env.API_KEY` to be available at build/runtime.*

### 4. Run the Development Server
```bash
npm start
# OR
npm run dev
```

Open `http://localhost:3000` (or the port shown in your terminal) to launch the app.

---

## 💡 How It Works

### The Process Flow
1. **Input**: The user enters a startup idea or a complex business question into the "Divine Input" field.
2. **Analysis**: The app sends the prompt to the **Gemini 3 Flash** model, guided by a specialized "Accelerator Expert" system instruction.
3. **Structured Output**: The AI returns a strict JSON object containing:
   - Validation Status
   - Detailed Markdown Response
   - SWOT Grid
   - Roadmap Steps
   - Legal/Govt Data
4. **Rendering**: The React frontend parses this JSON and renders it into an interactive dashboard with iconography, progress bars, and clickable resources.

---

## 📸 Screenshots

*(Add screenshots of your Landing Page and Analysis Dashboard here)*

---

## 🤝 Contributing

We welcome visionaries to contribute to the Venture OS.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>Build. Legacy.</strong><br>
  Designed with ❤️ by VickyIiitp
</div>
