import UserAvatar from '@/components/common/User/UserAvatar';
import {
  TaskInfo, TaskMarkers, TaskNumber, TaskShortContent, TaskTypeBox,
} from '@/components/Task/Task.styles';
import { TASK_TYPE_COLORS, TASK_TYPE_ICONS } from '@/utils/constants';
import {
  Card, CardActions, CardContent, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

function Task({ task, index }) {
  const taskColor = TASK_TYPE_COLORS[task.type];
  const taskIconClass = TASK_TYPE_ICONS[task.type];
  const navigate = useNavigate();

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          <CardContent>
            <Typography variant="body1" component="div">
              {task.title}
            </Typography>
          </CardContent>

          <CardActions>
            <TaskShortContent>
              <TaskMarkers>
                <TaskTypeBox color={taskColor}>
                  <i className={taskIconClass} />
                </TaskTypeBox>
              </TaskMarkers>
              <TaskInfo>
                <TaskNumber>TDB-{task.id}</TaskNumber>
                <UserAvatar user={task.user} />
              </TaskInfo>
            </TaskShortContent>
          </CardActions>

          {provided.placeholder}
        </Card>
      )}
    </Draggable>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      fullName: PropTypes.string,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default Task;
