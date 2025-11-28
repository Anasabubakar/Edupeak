
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EdupeakLogo } from '@/components/icons';
import { Eye, EyeOff } from 'lucide-react';

export default function StudentLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/student');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <EdupeakLogo className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">EDUPEAK Student Login</CardTitle>
          <CardDescription>Welcome Back! Ready to Learn?</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Username or Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            </div>
            <div className="text-right">
              <Link
                href="#"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
            <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/student/signup" className="text-primary hover:underline">
                    Sign Up
                </Link>
            </p>
        </CardFooter>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        Copyright © 2025 SPARK™ - All rights reserved.
      </footer>
    </div>
  );
}
