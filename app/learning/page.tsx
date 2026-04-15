"use client";

import { AvatarMentor } from "@/components/avatar/AvatarMentor";
import { FlashcardDeck } from "@/components/flashcards/Flashcard";
import { MCQQuiz } from "@/components/quiz/Quiz";

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center gap-12 p-8">

      <h1 className="text-3xl font-bold">AI Learning Experience</h1>

      {/* Avatar intro */}
      <AvatarMentor
        message="Let's start learning Linear Regression 🚀"
        mood="excited"
        size="lg"
      />

      {/* Flashcard */}
      <FlashcardDeck />

      {/* Avatar reaction */}
      <AvatarMentor
        message="Great! Now try a question 🎯"
        mood="happy"
      />

      {/* Quiz */}
      <MCQQuiz />

      {/* Final Avatar */}
      <AvatarMentor
        message="Awesome work! You earned XP 🎉"
        mood="excited"
      />

    </div>
  );
}