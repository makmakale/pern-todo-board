export const BOARD_IDS = {
  todo: 'todo',
  inProgress: 'inProgress',
  done: 'done',
};

export const DEFAULT_BOARDS = [
  { id: BOARD_IDS.todo, title: 'To Do', tasks: [] },
  { id: BOARD_IDS.inProgress, title: 'In Progress', tasks: [] },
  { id: BOARD_IDS.done, title: 'Done', tasks: [] },
];

export const TASK_TYPES = {
  epic: 'epic',
  story: 'story',
  task: 'task',
  bug: 'bug',
};
export const TASK_TYPE_COLORS = {
  [TASK_TYPES.epic]: '#8f4edc',
  [TASK_TYPES.story]: '#74c050',
  [TASK_TYPES.task]: '#38b3f8',
  [TASK_TYPES.bug]: '#dd5342',
};

export const TASK_TYPE_ICONS = {
  [TASK_TYPES.epic]: 'fa-solid fa-bolt',
  [TASK_TYPES.story]: 'fa-solid fa-bookmark',
  [TASK_TYPES.task]: 'fa-solid fa-check',
  [TASK_TYPES.bug]: 'fa-solid fa-circle',
};

export const BOARDS_OPTIONS = [
  { value: BOARD_IDS.todo, label: 'To Do' },
  { value: BOARD_IDS.inProgress, label: 'In Progress' },
  { value: BOARD_IDS.done, label: 'Done' },
];

export const PROJECT_OPTIONS = [{ value: 'tdb', label: 'ToDo Board (TDB)' }];

export const TASK_TYPE_OPTIONS = [
  {
    value: TASK_TYPES.epic,
    label: 'Epic',
  },
  {
    value: TASK_TYPES.story,
    label: 'Story',
  },
  {
    value: TASK_TYPES.task,
    label: 'Task',
  },
  {
    value: TASK_TYPES.bug,
    label: 'Bug',
  },
];

export const IMAGE_PATH = process.env.NODE_ENV === 'production' ? `${import.meta.env.VITE_BACKEND_URL}/images` : '/images';
