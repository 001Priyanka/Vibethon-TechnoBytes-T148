"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AvatarMentor } from "@/components/avatar/AvatarMentor";
import { FlashcardDeck } from "@/components/flashcards/Flashcard";
import { MCQQuiz } from "@/components/quiz/Quiz";

export default function LearningPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center gap-12 p-8">
      <h1 className="text-3xl font-bold">AI Learning Experience</h1>

      <AvatarMentor
        message="Let's start learning Linear Regression 🚀"
        mood="excited"
        size="lg"
      />

      <FlashcardDeck />

      <AvatarMentor
        message="Great! Now try a question 🎯"
        mood="happy"
      />

      <MCQQuiz />

      <AvatarMentor
        message="Awesome work! You earned XP 🎉"
        mood="excited"
      />
    </div>
  );
}
