# Mock Interview Matching Platform
![mock](https://github.com/user-attachments/assets/42fdd1c5-d5e7-4c09-a45a-aa2df6ead37a)

A full-stack web application that connects users for mock technical interviews. Users can schedule practice interviews, match with partners, conduct video interviews with code collaboration, and receive AI-powered feedback.

## Features

- 🔐 **Discord OAuth Authentication** - Secure login using Discord accounts
- 📅 **Interview Scheduling** - Calendar-based scheduling system with time slot management
- 👥 **Partner Matching** - Find and match with other users for practice interviews
- 🎥 **Video Interviews** - Real-time video calls powered by Jitsi
- 💻 **Code Collaboration** - Integrated code editor with syntax highlighting (CodeMirror)
- 🤖 **AI Assistant** - OpenAI-powered interview helper and feedback
- 📝 **Interview Feedback** - Receive detailed feedback after sessions
- 📚 **Resources Page** - Access learning materials and resources
- 📊 **Session History** - View past interviews and feedback

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **CodeMirror** - Code editor component
- **Jitsi React SDK** - Video conferencing
- **Firebase Realtime Database** - Real-time data synchronization
- **Axios** - HTTP client
- **date-fns** - Date manipulation

### Backend
- **Spring Boot 3.3.3** - Java framework
- **Java 17** - Programming language
- **Spring Data JPA** - Database ORM
- **MySQL** - Relational database
- **JDA (Java Discord API)** - Discord integration
- **Lombok** - Boilerplate reduction
- **Jackson** - JSON processing

## Project Structure

```
mock-interview-matching/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── DiscordLogin.jsx
│   │   │   ├── History/    # Interview history components
│   │   │   ├── Interview/  # Interview session components
│   │   │   ├── Schedule/   # Scheduling components
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   ├── services/       # API and service integrations
│   │   └── context/        # React context providers
│   └── package.json
│
└── server/                 # Spring Boot backend application
    ├── src/main/java/
    │   └── com/example/interviewmatching/
    │       ├── controller/  # REST controllers
    │       ├── model/      # JPA entities
    │       ├── repository/  # Data repositories
    │       ├── service/     # Business logic
    │       └── config/      # Configuration classes
    └── build.gradle
```
