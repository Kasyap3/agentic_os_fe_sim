# 🚀 oneOS - Agentic Operating System Frontend Simulation

<div align="center">

![oneOS Logo](https://img.shields.io/badge/oneOS-Agentic%20OS-blue?style=for-the-badge&logo=linux)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**A revolutionary agentic operating system simulation with AI-powered applications and intelligent memory management**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [Applications](#-applications)

</div>

---

## 📖 Overview

**oneOS** is a cutting-edge frontend simulation of an agentic operating system that combines the power of AI agents, distributed cloud computing, and intelligent memory management. Built with modern web technologies, oneOS provides a seamless, macOS-inspired interface with a complete ecosystem of interconnected applications.

### 🎯 Key Highlights

- **🤖 AI-Powered Agent System**: Intelligent agents that handle conversations, bookings, and calendar management
- **☁️ Distributed Cloud Storage**: Connect and manage multiple cloud providers seamlessly
- **🧠 Memory Graph Visualization**: Interactive 3D graph showing agent memory relationships
- **🎙️ Voice Integration**: ElevenLabs-powered text-to-speech and voice cloning
- **📊 Advanced Analytics**: 30+ visualizations for memory and data analytics
- **🎨 Beautiful UI**: macOS-inspired design with smooth animations

---

## ✨ Features

### Core System Features

- **🔄 Boot Sequence**: Animated boot screen with system initialization
- **🔐 Secure Login**: Beautiful gradient login interface
- **🖥️ Desktop Environment**: Fully functional desktop with icons and taskbar
- **📱 Window Management**: Drag, resize, minimize, maximize with macOS-style animations
- **🔍 Application Menu**: Centralized app launcher with search functionality

### One Ecosystem Applications

#### 🤖 One Agent
- **Intelligent Conversation Handling**: AI-powered assistant using Claude API
- **Call Summarization**: Automatically summarizes phone conversations
- **Smart Booking**: Handles travel bookings with reasoning chain visualization
- **Calendar Integration**: Automatically adds events to calendar
- **Voice Support**: Text-to-speech integration with ElevenLabs

#### ☁️ oneData
- **Multi-Cloud Connection**: Connect to Google Drive, Dropbox, AWS S3, OneDrive, iCloud
- **Intelligent Scaling**: Auto-scale cloud resources up and down
- **Storage Optimization**: Automatic cleanup and space optimization
- **Advanced Analytics**: 4+ Chart.js visualizations
- **File Browser**: Unified file management across all clouds

#### 🧠 oneMemory
- **Memory Graph**: Interactive D3.js force-directed graph with ~150 nodes
- **Memory Clustering**: Nodes clustered by memory type (preference, fact, event, etc.)
- **Hover Tooltips**: Detailed JSON data on hover
- **Sub-graph Visualization**: Double-click nodes to see related memories
- **Analytics Dashboard**: 31+ Chart.js visualizations
- **Memory Types**: Preference, Fact, Event, Goal, Reminder, Note, LLM Fact, POI, Hotel

#### 🎙️ One Voice
- **Text-to-Speech**: High-quality TTS using ElevenLabs
- **Voice Cloning**: Clone voices from audio samples
- **Voice Conversion**: Convert voice in existing audio
- **Voice Library**: Manage and test multiple voices
- **Voice Settings**: Customize stability, similarity, and style

#### 🌐 oneBrowser
- **Full Browser Experience**: Complete web browsing capabilities
- **AI Assistant**: Built-in AI chatbot for quick questions
- **Tab Management**: Multiple tabs with smooth animations

#### 📝 onePad
- **Rich Text Editor**: Full-featured notepad application
- **File Management**: Save and load notes
- **Auto-save**: Automatic saving functionality

### Conventional Applications

- **📋 Todo**: Task management with AI-powered prioritization
- **📌 Sticky Notes**: Desktop widgets with AI enhancement
- **⏰ Reminders**: Smart scheduling with AI assistance
- **📓 Notes**: Note-taking with AI summarization
- **🌤️ Weather**: Weather information display
- **🕐 Clock**: Time display with alarm functionality

---

## 🏗️ Architecture

```
oneOS/
├── Frontend (HTML/CSS/JavaScript)
│   ├── index.html          # Main application file
│   ├── one-agent.js        # One Agent logic
│   ├── oneMemory.js        # Memory graph visualization
│   ├── messages.js         # Message handling
│   └── checklist-animation.js  # Booking visualization
│
├── Backend (Python/Flask)
│   ├── ai_server.py        # API server
│   └── requirements.txt    # Python dependencies
│
└── Data Visualization
    ├── D3.js               # Graph visualization
    └── Chart.js            # Analytics charts
```

### Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python 3.10+, Flask, Flask-CORS
- **APIs**: 
  - Anthropic Claude API (AI conversations)
  - ElevenLabs API (Text-to-Speech, Voice Cloning)
- **Visualization**: 
  - D3.js v7 (Force-directed graphs)
  - Chart.js v4 (Analytics charts)
- **Storage**: LocalStorage (client-side persistence)

---

## 🚀 Installation

### Prerequisites

- Python 3.10 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- API Keys:
  - Anthropic Claude API key
  - ElevenLabs API key (optional, for voice features)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Kasyap3/agentic_os_fe_sim.git
cd agentic_os_fe_sim
```

### Step 2: Set Up Python Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Configure API Keys

Edit `ai_server.py` and add your API keys:

```python
ANTHROPIC_API_KEY = "your-claude-api-key-here"
ELEVENLABS_API_KEY = "your-elevenlabs-api-key-here"  # Optional
```

### Step 4: Start the Backend Server

```bash
python ai_server.py
```

The server will start on `http://localhost:5001`

### Step 5: Open the Frontend

Open `index.html` in your web browser, or use a local server:

```bash
# Using Python's built-in server
python -m http.server 8000

# Then navigate to http://localhost:8000
```

---

## 💻 Usage

### Initial Setup

1. **Boot Screen**: Wait for the boot sequence to complete (12 seconds)
2. **Login**: Enter any credentials (demo mode)
3. **Desktop**: You'll see the oneOS desktop with application icons

### Using Applications

#### One Agent
1. Click the **One Agent** icon on the desktop
2. Start a conversation or let it handle a call
3. Use voice features by clicking the 🎧 icon
4. View conversation summaries and booking details

#### oneData
1. Open **oneData** from the desktop
2. Connect to cloud providers (simulated)
3. Browse files across all connected clouds
4. View analytics and storage optimization

#### oneMemory
1. Launch **oneMemory** application
2. View the interactive memory graph
3. Hover over nodes to see memory details
4. Double-click nodes to see sub-graphs
5. Switch to Analytics tab for detailed visualizations

#### One Voice
1. Open **One Voice** application
2. Enter text and generate speech
3. Clone voices from audio samples
4. Convert voices in existing audio files
5. Manage your voice library

### Keyboard Shortcuts

- **Double-click desktop icons**: Open applications
- **Click taskbar icons**: Focus/restore windows
- **Right-click taskbar icons**: Context menu (restore, maximize, minimize, close)
- **Click menu button (𖣠)**: Open application menu
- **Click hamburger menu (☰)**: System menu (Profile, Settings, Logout)

---

## 📊 Visualizations

### Memory Graph Visualization

The oneMemory application features an interactive force-directed graph showing:

- **~150 Memory Nodes**: Color-coded by type
- **Clustered Layout**: Nodes grouped by memory kind
- **Interactive Hover**: JSON data tooltips
- **Sub-graph View**: Related memories visualization
- **Legend**: Color-coded node type legend

### Analytics Dashboard

31+ Chart.js visualizations including:

- Memory Types Distribution (Doughnut)
- Topic Distribution (Pie)
- Tags Distribution (Bar)
- Memory Timeline (Line)
- Cluster Sizes (Bar)
- LLM Sources (Pie)
- Hotel Price Distribution (Bar)
- POI Count by Topic (Bar)
- And 23+ more visualizations

### Data Analytics

oneData provides comprehensive analytics:

- Storage Distribution (Doughnut)
- File Type Distribution (Pie)
- Storage Usage Over Time (Line)
- Cloud Performance (Bar)

---

## 🎨 Screenshots

### Boot Screen
```
┌─────────────────────────────────────┐
│           oneOS                     │
│                                     │
│  Initializing system...            │
│  Loading kernel modules...         │
│  Connecting to network...          │
│  Creating environment...            │
│  Setting up ubuntu...              │
│  Starting services...              │
│                                     │
│  [████████████░░░░░░░░] 80%        │
└─────────────────────────────────────┘
```

### Desktop View
```
┌─────────────────────────────────────────────────────┐
│  oneOS Desktop                                      │
│                                                     │
│  [One Agent]  [oneData]  [oneBrowser]              │
│  [onePad]     [One Voice] [oneMemory]               │
│                                                     │
│                                    [Files] [Trash]  │
│                                                     │
│  ────────────────────────────────────────────────  │
│  [☰] [Apps] [Time] [Weather] [AI Agent]            │
└─────────────────────────────────────────────────────┘
```

### Memory Graph
```
┌─────────────────────────────────────┐
│  oneMemory - Memory Graph           │
│                                     │
│  ●───●───●                          │
│  │   │   │                          │
│  ●───●───●                          │
│  │   │   │                          │
│  ●───●───●                          │
│                                     │
│  [Node Types Legend]                │
│  ● Preference  ● Fact              │
│  ● Event       ● Goal              │
└─────────────────────────────────────┘
```

---

## 🔧 Configuration

### API Keys

Edit `ai_server.py`:

```python
# Anthropic Claude API
ANTHROPIC_API_KEY = "sk-ant-api03-..."

# ElevenLabs API (Optional)
ELEVENLABS_API_KEY = "sk_..."
ELEVENLABS_VOICE_ID = "default-voice-id"
```

### Server Port

Default port is `5001`. To change:

```python
# In ai_server.py
app.run(host='0.0.0.0', port=5001, debug=True)
```

### Memory Data

Memory data is generated dynamically. To customize:

Edit `oneMemory.js` → `initializeMemoryData()` function

---

## 📁 Project Structure

```
agentic_os_fe_sim/
│
├── index.html                 # Main HTML file (9,800+ lines)
├── ai_server.py              # Flask backend server
├── requirements.txt           # Python dependencies
│
├── one-agent.js              # One Agent application logic
├── oneMemory.js              # Memory graph visualization
├── messages.js               # Message handling system
├── checklist-animation.js    # Booking visualization
│
└── README.md                 # This file
```

---

## 🛠️ Development

### Adding New Applications

1. Add desktop icon in `index.html`:
```html
<div class="desktop-icon" onclick="openApp('appId')">
    <div class="desktop-icon-img">🎯</div>
    <div class="desktop-icon-label">App Name</div>
</div>
```

2. Add window structure:
```html
<div class="window" id="appId">
    <!-- Window content -->
</div>
```

3. Add JavaScript functions:
```javascript
function openApp(appId) {
    // App logic
}
```

### Customizing Memory Graph

Edit `oneMemory.js`:
- `initializeMemoryData()`: Generate memory data
- `createMemoryNodes()`: Create graph nodes
- `renderMemoryGraph()`: Render visualization
- `renderMemoryAnalytics()`: Create analytics charts

---

## 🐛 Troubleshooting

### Backend Server Not Starting

```bash
# Check if port 5001 is available
lsof -i :5001

# Kill process if needed
kill -9 <PID>
```

### CORS Errors

Ensure Flask-CORS is installed:
```bash
pip install flask-cors
```

### Charts Not Rendering

- Check browser console for errors
- Ensure Chart.js is loaded: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`
- Clear browser cache

### Memory Graph Not Visible

- Check D3.js is loaded: `https://d3js.org/d3.v7.min.js`
- Open browser console for debug logs
- Ensure container has dimensions

---

## 📝 API Endpoints

### Backend API (`http://localhost:5001`)

#### Chat Endpoint
```http
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "Hello"}
  ]
}
```

#### Text-to-Speech
```http
POST /api/tts
Content-Type: application/json

{
  "text": "Hello world",
  "voice_id": "default-voice-id",
  "settings": {
    "stability": 0.5,
    "similarity_boost": 0.75
  }
}
```

#### Voice Library
```http
GET /api/voices
```

#### Voice Cloning
```http
POST /api/voice-clone
Content-Type: multipart/form-data

files: [audio file]
name: "Voice Name"
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Anthropic** for Claude API
- **ElevenLabs** for Voice API
- **D3.js** for graph visualization
- **Chart.js** for analytics charts
- **Flask** for backend framework

---

## 📧 Contact

**Kasyap Varanasi**

- GitHub: [@Kasyap3](https://github.com/Kasyap3)
- Repository: [agentic_os_fe_sim](https://github.com/Kasyap3/agentic_os_fe_sim)

---

## 🎯 Roadmap

- [ ] Real cloud provider integration
- [ ] Multi-user support
- [ ] Advanced AI agent capabilities
- [ ] Mobile responsive design
- [ ] Plugin system for custom apps
- [ ] Real-time collaboration
- [ ] Advanced security features

---

<div align="center">

**Made with ❤️ by Kasyap Varanasi**

⭐ Star this repo if you find it interesting!

</div>

