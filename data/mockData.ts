import { Topic, Flashcard, MCQ } from '@/store/useStore'

export const topics: Topic[] = [
  {
    id: 'intro-ml',
    title: 'Introduction to ML',
    description: 'Learn the fundamentals of Machine Learning and AI',
    difficulty: 'beginner',
    progress: 100,
    completed: true,
    locked: false,
    icon: '🧠',
    xpReward: 500,
    estimatedTime: '2 hours',
  },
  {
    id: 'python-basics',
    title: 'Python Fundamentals',
    description: 'Master Python programming basics for ML',
    difficulty: 'beginner',
    progress: 100,
    completed: true,
    locked: false,
    icon: '🐍',
    xpReward: 600,
    estimatedTime: '3 hours',
  },
  {
    id: 'numpy-intro',
    title: 'NumPy Essentials',
    description: 'Array operations and numerical computing',
    difficulty: 'beginner',
    progress: 100,
    completed: true,
    locked: false,
    icon: '📊',
    xpReward: 700,
    estimatedTime: '2.5 hours',
  },
  {
    id: 'pandas-basics',
    title: 'Pandas for Data Analysis',
    description: 'Data manipulation and analysis with Pandas',
    difficulty: 'beginner',
    progress: 100,
    completed: true,
    locked: false,
    icon: '🐼',
    xpReward: 800,
    estimatedTime: '3 hours',
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra for ML',
    description: 'Vectors, matrices, and transformations',
    difficulty: 'intermediate',
    progress: 65,
    completed: false,
    locked: false,
    icon: '📐',
    xpReward: 1000,
    estimatedTime: '4 hours',
  },
  {
    id: 'statistics',
    title: 'Statistics & Probability',
    description: 'Statistical foundations for ML',
    difficulty: 'intermediate',
    progress: 30,
    completed: false,
    locked: false,
    icon: '📈',
    xpReward: 1000,
    estimatedTime: '4 hours',
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    description: 'Deep dive into artificial neural networks',
    difficulty: 'advanced',
    progress: 0,
    completed: false,
    locked: false,
    icon: '🕸️',
    xpReward: 1500,
    estimatedTime: '6 hours',
  },
  {
    id: 'backpropagation',
    title: 'Backpropagation',
    description: 'Understanding how neural networks learn',
    difficulty: 'advanced',
    progress: 0,
    completed: false,
    locked: true,
    icon: '🔄',
    xpReward: 1500,
    estimatedTime: '5 hours',
  },
  {
    id: 'cnns',
    title: 'Convolutional Neural Networks',
    description: 'Image recognition and CNN architectures',
    difficulty: 'advanced',
    progress: 0,
    completed: false,
    locked: true,
    icon: '👁️',
    xpReward: 2000,
    estimatedTime: '6 hours',
  },
  {
    id: 'transformers',
    title: 'Transformers & Attention',
    description: 'The architecture behind GPT and BERT',
    difficulty: 'advanced',
    progress: 0,
    completed: false,
    locked: true,
    icon: '⚡',
    xpReward: 2500,
    estimatedTime: '8 hours',
  },
]

export const flashcards: Flashcard[] = [
  {
    id: 'fc-1',
    topicId: 'linear-algebra',
    front: 'What is a dot product?',
    back: 'A scalar value obtained by multiplying corresponding elements of two vectors and summing them. Used to measure similarity between vectors.',
    difficulty: 1,
  },
  {
    id: 'fc-2',
    topicId: 'linear-algebra',
    front: 'What is matrix multiplication?',
    back: 'An operation where rows of the first matrix are multiplied with columns of the second matrix. The element at position (i,j) is the dot product of row i from first matrix and column j from second.',
    difficulty: 2,
  },
  {
    id: 'fc-3',
    topicId: 'linear-algebra',
    front: 'What is an eigenvalue?',
    back: 'A scalar that describes how a matrix transforms vectors. If A*v = λ*v, then λ is the eigenvalue and v is the eigenvector.',
    difficulty: 2,
  },
  {
    id: 'fc-4',
    topicId: 'neural-networks',
    front: 'What is a neuron in ML?',
    back: 'A computational unit that takes inputs, applies weights and bias, sums them, and passes through an activation function to produce output.',
    difficulty: 1,
  },
  {
    id: 'fc-5',
    topicId: 'neural-networks',
    front: 'What is a loss function?',
    back: 'A function that measures the difference between predicted and actual values. Common examples: MSE for regression, Cross-Entropy for classification.',
    difficulty: 1,
  },
  {
    id: 'fc-6',
    topicId: 'backpropagation',
    front: 'What is gradient descent?',
    back: 'An optimization algorithm that iteratively adjusts parameters in the direction of steepest descent of the loss function to find the minimum.',
    difficulty: 2,
  },
  {
    id: 'fc-7',
    topicId: 'backpropagation',
    front: 'Why use learning rate?',
    back: 'The learning rate controls how big the steps are during gradient descent. Too high = overshooting minimum. Too low = slow convergence.',
    difficulty: 1,
  },
  {
    id: 'fc-8',
    topicId: 'statistics',
    front: 'What is variance?',
    back: 'A measure of how spread out values are from the mean. Calculated as the average of squared differences from the mean.',
    difficulty: 1,
  },
]

export const mcqs: MCQ[] = [
  {
    id: 'mcq-1',
    topicId: 'linear-algebra',
    question: 'What is the shape of a matrix with 3 rows and 4 columns?',
    options: ['3x4', '4x3', '12x1', '7x1'],
    correctAnswer: 0,
    explanation: 'A matrix with m rows and n columns is called an m×n matrix.',
  },
  {
    id: 'mcq-2',
    topicId: 'linear-algebra',
    question: 'What is the result of a dot product between two perpendicular vectors?',
    options: ['1', '0', '-1', 'Undefined'],
    correctAnswer: 1,
    explanation: 'Perpendicular vectors have a dot product of 0 because cos(90°) = 0.',
  },
  {
    id: 'mcq-3',
    topicId: 'neural-networks',
    question: 'Which activation function outputs values between 0 and 1?',
    options: ['ReLU', 'Sigmoid', 'Tanh', 'Leaky ReLU'],
    correctAnswer: 1,
    explanation: 'The sigmoid function squashes values to the range (0, 1).',
  },
  {
    id: 'mcq-4',
    topicId: 'neural-networks',
    question: 'What happens during forward propagation?',
    options: [
      'Weights are updated',
      'Gradients are calculated',
      'Input data flows through network to produce output',
      'Data is normalized',
    ],
    correctAnswer: 2,
    explanation: 'Forward propagation passes input data through all layers to generate predictions.',
  },
  {
    id: 'mcq-5',
    topicId: 'backpropagation',
    question: 'What is the purpose of backpropagation?',
    options: [
      'To normalize input data',
      'To reduce overfitting',
      'To compute gradients for weight updates',
      'To increase model complexity',
    ],
    correctAnswer: 2,
    explanation: 'Backpropagation calculates the gradient of the loss with respect to each weight by propagating errors backward through the network.',
  },
  {
    id: 'mcq-6',
    topicId: 'statistics',
    question: 'What does a p-value of 0.03 indicate?',
    options: [
      '3% chance the null hypothesis is true',
      '3% chance of observing this result if null hypothesis is true',
      '97% confidence in the alternative hypothesis',
      'The effect size is small',
    ],
    correctAnswer: 1,
    explanation: 'A p-value is the probability of observing results at least as extreme as the observed, assuming the null hypothesis is true.',
  },
]

export const labExperiments = [
  {
    id: 'lab-1',
    title: 'Gradient Descent Visualizer',
    description: 'Interactive visualization of gradient descent optimization',
    parameters: [
      { name: 'Learning Rate', min: 0.001, max: 1, default: 0.1, step: 0.01 },
      { name: 'Momentum', min: 0, max: 0.99, default: 0.9, step: 0.01 },
    ],
    code: `function gradientDescent(learningRate, momentum) {
  let velocity = 0;
  let position = 5;
  const history = [];
  
  for (let i = 0; i < 100; i++) {
    const gradient = 2 * position; // derivative of x^2
    velocity = momentum * velocity - learningRate * gradient;
    position += velocity;
    history.push(position);
  }
  
  return history;
}`,
  },
  {
    id: 'lab-2',
    title: 'Activation Functions',
    description: 'Compare different activation functions',
    parameters: [
      { name: 'Input Value', min: -5, max: 5, default: 1, step: 0.1 },
    ],
    code: `function activations(x) {
  return {
    sigmoid: 1 / (1 + Math.exp(-x)),
    relu: Math.max(0, x),
    tanh: Math.tanh(x),
    leakyRelu: x > 0 ? x : 0.01 * x
  };
}`,
  },
]

export const chatResponses = {
  greeting: "Hey there! I'm Nova, your AI mentor. What would you like to learn about today?",
  default: "That's a great question! Let me help you understand this concept better. In the context of ML, this relates to how our models learn patterns from data.",
  topic_intro: "This is a fundamental concept in machine learning. Let me break it down step by step...",
  encouragement: "You're doing great! Keep exploring and don't hesitate to ask questions.",
  hint: "Hint: Think about how this relates to the concepts we covered earlier in this module.",
}
