# NeuroLearn AI

A futuristic, gamified AI/ML learning platform built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![NeuroLearn AI](https://via.placeholder.com/800x400/0a0a0a/a855f7?text=NeuroLearn+AI)

## Features

- **AI Avatar Mentor (Nova)** - Animated holographic avatar that guides learning
- **Gamified Progress** - XP system, streaks, levels, and achievements
- **Interactive Labs** - Real-time code playground with Monaco Editor
- **Flashcards** - 3D flip animations with spaced repetition
- **MCQ Quizzes** - Instant feedback with shake/glow animations
- **Learning Path** - Visual roadmap with connected nodes
- **Doubt Chat** - AI-powered assistance with typing indicators
- **Dark Futuristic Theme** - Glassmorphism, neon gradients, particle effects

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Code Editor**: Monaco Editor
- **Charts**: Recharts
- **UI Components**: Radix UI + custom glassmorphism

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  /dashboard    - Main dashboard with stats and learning path
  /topic        - Individual topic pages
  page.tsx      - Landing page
  layout.tsx    - Root layout with providers

/components
  /avatar       - AI Mentor component
  /dashboard    - Dashboard stats and cards
  /learning     - Learning path visualization
  /flashcards   - Flashcard deck with 3D flip
  /quiz         - MCQ quiz with animations
  /editor       - Monaco code playground
  /lab          - Virtual lab with charts
  /chat         - Doubt chat interface
  /ui           - Reusable UI components
  /effects      - Animations and particles

/store
  useStore.ts   - Zustand state management

/data
  mockData.ts   - Topics, flashcards, MCQs
```

## Key Components

### AvatarMentor
Animated holographic avatar with mood states and typing animation.

### XPProgressBar
Animated gradient progress bar showing level progression.

### FlashcardDeck
3D flip animation cards with swipe gestures.

### MCQQuiz
Interactive quiz with instant visual feedback.

### CodePlayground
Monaco editor with live code execution.

### VirtualLab
Interactive experiments with parameter sliders.

## Design System

- **Colors**: Purple (#a855f7), Blue (#3b82f6), Cyan (#06b6d4)
- **Theme**: Dark futuristic with glassmorphism
- **Animations**: Smooth micro-interactions, floating elements
- **Typography**: Inter font family

## License

MIT
