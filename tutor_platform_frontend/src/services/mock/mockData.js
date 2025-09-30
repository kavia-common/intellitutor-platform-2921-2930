export const mockAgents = [
  { id: 'a_math', name: 'Math Mentor', expertise: 'Algebra & Calculus', model: 'gpt-4o-mini' },
  { id: 'a_sci', name: 'Science Sage', expertise: 'Physics & Chemistry', model: 'gpt-4o-mini' },
  { id: 'a_hist', name: 'History Guide', expertise: 'World History', model: 'gpt-4o-mini' },
];

export const mockChats = [
  {
    id: 'c1',
    title: 'Algebra Practice',
    updatedAt: new Date(Date.now() - 3600_000).toISOString(),
    messageCount: 2,
    messages: [
      { id: 'm1', role: 'user', content: 'What is the quadratic formula?' },
      { id: 'm2', role: 'agent', content: 'The quadratic formula is x = (-b ± √(b² - 4ac)) / (2a).' },
    ],
  },
];

export const mockContent = [
  { id: 'ct1', title: 'Intro to Derivatives', summary: 'Learn the basics of derivatives with examples.', tags: ['calculus', 'derivative'] },
  { id: 'ct2', title: 'Newton’s Laws', summary: 'Understand motion with Newton’s three laws.', tags: ['physics'] },
  { id: 'ct3', title: 'World War II Overview', summary: 'Major events and outcomes.', tags: ['history'] },
];
