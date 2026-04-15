import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface ProgressData {
  _id: string
  userId: string
  topicId: string
  completed: boolean
  score: number
  updatedAt: string
}

export function useProgress() {
  return useQuery<ProgressData[]>({
    queryKey: ['progress'],
    queryFn: async () => {
      const res = await fetch('/api/progress')
      if (!res.ok) throw new Error('Failed to fetch progress')
      return res.json()
    },
    staleTime: 30_000,
  })
}

export function useUpdateProgress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      topicId,
      completed,
      score,
    }: {
      topicId: string
      completed?: boolean
      score?: number
    }) => {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId, completed, score }),
      })
      if (!res.ok) throw new Error('Failed to update progress')
      return res.json() as Promise<ProgressData>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] })
    },
  })
}
