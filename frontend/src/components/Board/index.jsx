import { StyledBoardGrid } from '@/components/Board/Board.styles';
import Tasks from '@/components/Tasks';
import { useEditTaskMutation } from '@/utils/rtk/tasks/taskApiSlice';
import { selectTasks } from '@/utils/rtk/tasks/taskSlice';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

function Board() {
  const tasks = useSelector(selectTasks);
  const [editTodo] = useEditTaskMutation();

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;

    await editTodo({
      id: draggableId,
      status: destination.droppableId,
      order: destination.index,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StyledBoardGrid>
        {tasks && tasks.map((board) => <Tasks key={board.id} {...board} />)}
      </StyledBoardGrid>
    </DragDropContext>
  );
}

export default Board;
