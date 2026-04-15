import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface UserData {
  id: string
  name: string
  email: string
  image?: string
  xp: number
  level: number
  createdAt: string
}

export function useUser() {
  return useQuery<UserData>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('/api/user')
      if (!res.ok) throw new Error('Failed to fetch user')
      return res.json()
    },
    retry: false,
    staleTime: 30_000,
  })
}

export function useAddXP() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (xp: number) => {
      const res = await fetch('/api/xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xp }),
      })
      if (!res.ok) throw new Error('Failed to add XP')
      return res.json() as Promise<{ xp: number; level: number }>
    },
    onSuccess: (data) => {
      queryClient.setQueryData<UserData>(['user'], (old) =>
        old ? { ...old, xp: data.xp, level: data.level } : old
      )
    },
  })
}
