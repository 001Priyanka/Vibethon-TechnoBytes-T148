const API_BASE = '/api';

export async function fetchUser() {
  const res = await fetch(`${API_BASE}/user`, { credentials: 'include' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch user');
  }
  return res.json();
}

export async function addXP(xp: number) {
  const res = await fetch(`${API_BASE}/xp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ xp }),
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to add XP');
  }
  return res.json();
}

export async function fetchProgress() {
  const res = await fetch(`${API_BASE}/progress`, { credentials: 'include' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch progress');
  }
  return res.json();
}

export async function updateProgress(topicId: string, completed: boolean, score: number) {
  const res = await fetch(`${API_BASE}/progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicId, completed, score }),
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update progress');
  }
  return res.json();
}