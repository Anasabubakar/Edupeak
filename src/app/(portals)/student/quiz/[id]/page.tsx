
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EdupeakLogo } from '@/components/icons';
import { Clock, X, Check, Award, BookOpen, Loader2 } from 'lucide-react';
import { skillQuests } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Answers = { [key: number]: string | null };

const placeholderQuestions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
        explanation: "This is basic arithmetic. 2 + 2 always equals 4."
    },
    {
        question: "What is the capital of Nigeria?",
        options: ["Lagos", "Kano", "Abuja", "Ibadan"],
        answer: "Abuja",
        explanation: "Abuja became the capital of Nigeria in 1991."
    },
    {
        question: "Which of these is a primary color?",
        options: ["Green", "Orange", "Blue", "Purple"],
        answer: "Blue",
        explanation: "The primary colors are red, yellow, and blue."
    },
    {
        question: "Who wrote 'Things Fall Apart'?",
        options: ["Wole Soyinka", "Chinua Achebe", "Ben Okri", "Chimamanda Ngozi Adichie"],
        answer: "Chinua Achebe",
        explanation: "'Things Fall Apart' is a landmark of African literature, written by Chinua Achebe."
    },
    {
        question: "What does 'CPU' stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Core Processing Unit"],
        answer: "Central Processing Unit",
        explanation: "The CPU is the brain of the computer, where most calculations take place."
    },
];

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  const [quizQuestions, setQuizQuestions] = useState(placeholderQuestions);
  const [isLoading, setIsLoading] = useState(false);

  const quest = skillQuests.find(q => q.id.toString() === params.id);
  const selectedOption = answers[currentQuestionIndex] ?? null;
  
  useEffect(() => {
    if (timeLeft === 0 || showResult || isLoading) return;
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, isLoading]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return; // Prevent changing answer
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    let correctAnswers = 0;
    quizQuestions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / quizQuestions.length) * 100);
    setScore(finalScore);
    setShowResult(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground p-6 sm:p-8 items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground mt-4 text-lg">Loading your SkillQuest...</p>
        <p className="text-sm text-muted-foreground/50">Topic: {quest?.title}</p>
      </div>
    );
  }

  if (!quest || quizQuestions.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground p-6 sm:p-8 items-center justify-center">
        <p className="text-lg">Could not load quiz questions.</p>
        <Button asChild variant="link" className="mt-4"><Link href="/student/quiz">Return to Quests</Link></Button>
      </div>
    );
  }

  const question = quizQuestions[currentQuestionIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === question.answer;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const passed = score >= 70;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background text-foreground p-6 sm:p-8">
        <header className="flex items-center justify-between mb-8">
          <Link href="/student/quiz" className="flex items-center gap-2 font-bold">
            <EdupeakLogo className="h-6 w-6 text-primary" />
            <span>EDUPEAK SkillQuest: {quest.title}</span>
          </Link>
          <div className="flex items-center gap-2 bg-yellow-400/10 text-yellow-300 rounded-full px-3 py-1 text-sm font-medium border border-yellow-400/30">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center max-w-3xl w-full mx-auto">
          <div className="space-y-8">
            <div>
              <p className="text-primary font-semibold mb-2">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold">{question.question}</h1>
            </div>

            <RadioGroup
              value={selectedOption || ''}
              onValueChange={handleOptionSelect}
              disabled={isAnswered}
              className="space-y-4"
            >
              {question.options.map(option => {
                const isSelected = selectedOption === option;
                const isCorrectOption = question.answer === option;

                return (
                  <Label
                    key={option}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                      "border-card bg-card hover:border-primary/50",
                      isAnswered && !isSelected && "opacity-50",
                      isAnswered && isCorrectOption && "border-green-500 bg-green-500/10 text-green-300",
                      isAnswered && isSelected && !isCorrectOption && "border-red-500 bg-red-500/10 text-red-300",
                    )}
                  >
                    <RadioGroupItem value={option} id={option} className="h-5 w-5" />
                    <span className="flex-1 font-medium">{option}</span>
                    {isAnswered && isSelected && !isCorrectOption && <X className="h-6 w-6 text-red-500" />}
                    {isAnswered && isCorrectOption && <Check className="h-6 w-6 text-green-500" />}
                  </Label>
                );
              })}
            </RadioGroup>

            {isAnswered && (
              <div className={cn("p-4 rounded-lg", isCorrect ? "bg-green-500/10" : "bg-red-500/10")}>
                <h3 className={cn("font-bold text-lg", isCorrect ? "text-green-400" : "text-red-400")}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        </main>

        <footer className="mt-8 max-w-3xl w-full mx-auto">
          <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                  Previous
              </Button>
              <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="flex-1" />
              {isLastQuestion ? (
                <Button onClick={handleFinish} disabled={!isAnswered}>Finish</Button>
              ) : (
                <Button onClick={handleNext} disabled={!isAnswered}>Next</Button>
              )}
          </div>
        </footer>
      </div>

      <AlertDialog open={showResult}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-center">
              {passed ? "Congratulations!" : "Keep Trying!"}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-center">
                You scored <span className={cn("font-bold", passed ? "text-green-400" : "text-red-400")}>{score}%</span>.
                <div className="mt-2 text-sm text-muted-foreground">
                  {passed
                    ? "You've successfully passed this skill quest and earned a new certificate."
                    : "You didn't pass this time. Please review the learning material and try again."}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            {passed ? (
              <AlertDialogAction onClick={() => router.push('/student/certificates')}>
                <Award className="mr-2 h-4 w-4" />
                View Certificate
              </AlertDialogAction>
            ) : (
              <AlertDialogAction onClick={() => router.push('/student/learn')}>
                <BookOpen className="mr-2 h-4 w-4" />
                Go to Learning
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
