import { BOARD_IDS } from '@/utils/constants';

export const setInitialBoards = (boards = [], todos = []) => boards.map((board) => {
  if (board.id === BOARD_IDS.inProgress) {
    return {
      ...board,
      tasks: todos.filter((task) => task.status === BOARD_IDS.inProgress),
    };
  }
  if (board.id === BOARD_IDS.done) {
    return {
      ...board,
      tasks: todos.filter((task) => task.status === BOARD_IDS.done),
    };
  }
  return {
    ...board,
    tasks: todos.filter((task) => task.status !== BOARD_IDS.inProgress && task.status !== BOARD_IDS.done),
  };
});

export const getUserName = (user) => {
  if (user?.firstName && user?.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user?.username;
};

export const getShortUserName = (user) => {
  if (!user) return '';

  if (user.firstName && user.lastName) {
    return `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;
  }

  return `${user.username[0].toUpperCase()}`;
};
