import Task from '@/components/Task';
import {
  StyledBoardTaskTitle,
  StyledBoardTaskTitleBadge,
  StyledTasks,
  StyledTasksContainer,
} from '@/components/Tasks/Tasks.styles';
import { Droppable } from 'react-beautiful-dnd';

function Tasks({ id, title, tasks = [] }) {
  return (
    <StyledTasksContainer>
      <StyledBoardTaskTitle>
        {title}
        <StyledBoardTaskTitleBadge badgeContent={tasks.length} />
      </StyledBoardTaskTitle>

      <Droppable droppableId={id}>
        {(provided) => (
          <StyledTasks
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks && tasks.length > 0 ? tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            )) : 'No Tasks'}
          </StyledTasks>
        )}
      </Droppable>
    </StyledTasksContainer>
  );
}

export default Tasks;
