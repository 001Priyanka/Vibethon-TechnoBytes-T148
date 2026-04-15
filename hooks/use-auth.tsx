'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  xp: number;
  level: number;
}

export function useUser() {
  const { data, isLoading, error } = useQuery<AuthUser>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('/api/user');
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    },
    retry: false,
  });

  return { user: data, isLoading, error };
}

export function useUpdateXP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (xpToAdd: number) => {
      const res = await fetch('/api/xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xp: xpToAdd }),
      });
      if (!res.ok) throw new Error('Failed to update XP');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], (old: AuthUser | undefined) =>
        old ? { ...old, xp: data.xp, level: data.level } : old
      );
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ topicId, completed, score }: { topicId: string; completed?: boolean; score?: number }) => {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId, completed, score }),
      });
      if (!res.ok) throw new Error('Failed to update progress');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}

export function useUserProgress() {
  const { data, isLoading } = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const res = await fetch('/api/progress');
      if (!res.ok) throw new Error('Failed to fetch progress');
      return res.json();
    },
  });

  return { progress: data, isLoading };
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/user')
      .then((res) => {
        setIsAuthenticated(res.ok);
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  return { isAuthenticated, isLoading, router };
}