const allowedOrigins = [
  'http://localhost:3000',
  'https://pern-todo-board.onrender.com',
  'https://pern-todo-board.vercel.app',
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
