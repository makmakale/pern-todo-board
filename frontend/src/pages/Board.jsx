import Board from '@/components/Board';
import Loader from '@/components/common/Loader';
import { useGetTasksQuery } from '@/utils/rtk/tasks/taskApiSlice';
import { setBoards } from '@/utils/rtk/tasks/taskSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function BoardPage() {
  const dispatch = useDispatch();

  const { data: todos, isLoading } = useGetTasksQuery();

  useEffect(() => {
    dispatch(setBoards(todos));
  }, [todos]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <Board />
  );
}

export default BoardPage;
