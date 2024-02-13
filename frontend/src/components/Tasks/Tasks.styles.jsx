import { Badge, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledTasksContainer = styled(Paper).attrs({ elevation: 3 })`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledTasks = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  gap: 1rem;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, .2),
    inset -4px -4px 6px -1px rgba(255, 255, 255, .7),
    -.5px -.5px 0 rgba(255, 255, 255, 1),
  .5px .5px 0 rgba(0, 0, 0, .15),
  0 12px 10px -10px rgba(0, 0, 0, .05);
  background: #efefef;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */ 
  }
`;

export const StyledBoardTaskTitle = styled(Typography).attrs({ variant: 'h6' })``;
export const StyledBoardTaskTitleBadge = styled(Badge).attrs({ color: 'primary' })`
  left: 1rem;
  top: -10px;
`;
