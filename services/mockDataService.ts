
import { ReelContent, Interest, QuizQuestion } from '../types';

const scienceQuiz1: QuizQuestion = {
  id: 'sq1',
  questionText: "Who developed the theory of relativity?",
  options: [
    { id: 'sq1o1', text: 'Isaac Newton' },
    { id: 'sq1o2', text: 'Albert Einstein' },
    { id: 'sq1o3', text: 'Galileo Galilei' },
    { id: 'sq1o4', text: 'Nikola Tesla' },
  ],
  correctOptionId: 'sq1o2',
};

const techQuiz1: QuizQuestion = {
  id: 'tq1',
  questionText: "What does 'Python' primarily refer to in data science?",
  options: [
    { id: 'tq1o1', text: 'A type of snake' },
    { id: 'tq1o2', text: 'A statistical method' },
    { id: 'tq1o3', text: 'A programming language' },
    { id: 'tq1o4', text: 'A data visualization tool' },
  ],
  correctOptionId: 'tq1o3',
};

const historyQuiz1: QuizQuestion = {
  id: 'hq1',
  questionText: "Which empire is known for its Pax Romana period?",
  options: [
    { id: 'hq1o1', text: 'Ottoman Empire' },
    { id: 'hq1o2', text: 'Mongol Empire' },
    { id: 'hq1o3', text: 'Persian Empire' },
    { id: 'hq1o4', text: 'Roman Empire' },
  ],
  correctOptionId: 'hq1o4',
};

const mathQuiz1: QuizQuestion = {
  id: 'mq1',
  questionText: "What is the derivative of x^2?",
  options: [
    { id: 'mq1o1', text: '2x' },
    { id: 'mq1o2', text: 'x' },
    { id: 'mq1o3', text: 'x^3/3' },
    { id: 'mq1o4', text: '2' },
  ],
  correctOptionId: 'mq1o1',
};


export const mockReels: ReelContent[] = [
  {
    id: '1',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/science_relativity/400/700',
    user: { name: 'physics.insights', avatarUrl: 'https://picsum.photos/seed/avatar_physics/40/40' },
    description: 'Exploring Einsteins theory of relativity. A cornerstone of modern physics! #science #physics',
    likes: 1850,
    comments: 120,
    tags: ['Science'],
    quiz: scienceQuiz1,
  },
  {
    id: '2',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/code_python/400/700',
    user: { name: 'coder.pete', avatarUrl: 'https://picsum.photos/seed/avatar_coder/40/40' },
    description: 'Quick Python tips for data science. #programming #datascience #technology',
    likes: 2500,
    comments: 210,
    tags: ['Technology & Programming'],
    quiz: techQuiz1,
  },
  {
    id: '3',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/history_rome/400/700',
    user: { name: 'history.revealed', avatarUrl: 'https://picsum.photos/seed/avatar_history/40/40' },
    description: 'A brief look into the rise and fall of the Roman Empire. #history #ancientcivilizations',
    likes: 1100,
    comments: 75,
    tags: ['History'],
    quiz: historyQuiz1,
  },
  {
    id: '4',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/math_calculus/400/700',
    user: { name: 'math.magician', avatarUrl: 'https://picsum.photos/seed/avatar_math/40/40' },
    description: 'Understanding the fundamentals of Calculus. Derivatives explained simply! #mathematics #education',
    likes: 950,
    comments: 60,
    tags: ['Mathematics'],
    quiz: mathQuiz1,
  },
  {
    id: '5',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/science_astro/400/700',
    user: { name: 'space.explorer', avatarUrl: 'https://picsum.photos/seed/avatar_space/40/40' },
    description: 'The wonders of our galaxy. What are black holes? #science #astronomy',
    likes: 2200,
    comments: 150,
    tags: ['Science'],
    quiz: {
      id: 'sq2',
      questionText: "What is a primary characteristic of a black hole?",
      options: [
        { id: 'sq2o1', text: 'Emits bright visible light' },
        { id: 'sq2o2', text: 'Extremely strong gravitational pull' },
        { id: 'sq2o3', text: 'Repels all nearby matter' },
        { id: 'sq2o4', text: 'Is made of pure energy' },
      ],
      correctOptionId: 'sq2o2',
    },
  },
  {
    id: '6',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/tech_ai/400/700',
    user: { name: 'ai.guru', avatarUrl: 'https://picsum.photos/seed/avatar_ai/40/40' },
    description: 'The future of Artificial Intelligence and Machine Learning. #technology #ai #ml',
    likes: 3100,
    comments: 280,
    tags: ['Technology & Programming', 'Science'],
    quiz: {
      id: 'tq2',
      questionText: "What does 'AI' stand for?",
      options: [
        { id: 'tq2o1', text: 'Automated Interaction' },
        { id: 'tq2o2', text: 'Artificial Intelligence' },
        { id: 'tq2o3', text: 'Advanced Interface' },
      ],
      correctOptionId: 'tq2o2',
    }
  },
   {
    id: '7',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/history_ww2/400/700',
    user: { name: 'world.wars.docs', avatarUrl: 'https://picsum.photos/seed/avatar_ww2/40/40' },
    description: 'Key battles of World War II. A historical overview. #history #worldwar2',
    likes: 1300,
    comments: 90,
    tags: ['History'],
    quiz: {
      id: 'hq2',
      questionText: "Which major global conflict occurred between 1939 and 1945?",
      options: [
        { id: 'hq2o1', text: 'World War I' },
        { id: 'hq2o2', text: 'The Cold War' },
        { id: 'hq2o3', text: 'World War II' },
        { id: 'hq2o4', text: 'The Napoleonic Wars' },
      ],
      correctOptionId: 'hq2o3',
    },
  },
  {
    id: '8',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/math_algebra/400/700',
    user: { name: 'algebra.ace', avatarUrl: 'https://picsum.photos/seed/avatar_algebra/40/40' },
    description: 'Solving complex algebraic equations with ease. #mathematics #algebra',
    likes: 800,
    comments: 50,
    tags: ['Mathematics'],
    quiz: {
      id: 'mq3',
      questionText: "If 3y - 5 = 10, what is the value of y?",
      options: [
        { id: 'mq3o1', text: '3' },
        { id: 'mq3o2', text: '5' },
        { id: 'mq3o3', text: '15' },
        { id: 'mq3o4', text: '10/3' },
      ],
      correctOptionId: 'mq3o2', // 3y = 15, y = 5
    },
  },
  {
    id: '9',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/gauss_distribution_example/400/700',
    user: { name: 'stats.simplified', avatarUrl: 'https://picsum.photos/seed/avatar_stats/40/40' },
    description: 'Understanding Gaussian Distribution (Normal Distribution) in statistics. #mathematics #statistics #science',
    likes: 1256,
    comments: 88,
    tags: ['Mathematics', 'Science'],
    quiz: {
      id: 'mq2', // Note: This ID was already used; ideally, quiz IDs should be unique across all quizzes.
                // For this update, I'll keep it as is but point it out. In a real system, use unique IDs.
      questionText: "A Gaussian distribution is also known as?",
      options: [
        { id: 'mq2o1', text: 'Poisson Distribution' },
        { id: 'mq2o2', text: 'Binomial Distribution' },
        { id: 'mq2o3', text: 'Normal Distribution' },
      ],
      correctOptionId: 'mq2o3',
    }
  },
  {
    id: '10',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/clt_meme_example/400/700',
    user: { name: 'data.driven.decisions', avatarUrl: 'https://picsum.photos/seed/avatar_data/40/40' },
    description: 'The Central Limit Theorem (CLT) visualized. Why is it so important? #mathematics #statistics #datascience',
    likes: 3021,
    comments: 152,
    tags: ['Mathematics', 'Science', 'Technology & Programming'],
    quiz: {
      id: 'mq4',
      questionText: "The Central Limit Theorem states that the sampling distribution of the mean will approximate a normal distribution as what increases?",
      options: [
        { id: 'mq4o1', text: 'Population variance' },
        { id: 'mq4o2', text: 'Number of variables' },
        { id: 'mq4o3', text: 'Sample size' },
        { id: 'mq4o4', text: 'Standard deviation' },
      ],
      correctOptionId: 'mq4o3',
    },
  }
];

export const getMockReels = async (): Promise<ReelContent[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockReels);
    }, 300);
  });
};
