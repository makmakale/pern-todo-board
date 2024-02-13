import { StyledBoardContainer, StyledBoardContent } from '@/components/Board/Board.styles';
import BoardsToolbar from '@/components/Board/components/ToolBar';
import { Outlet } from 'react-router-dom';

function BoardLayout() {
  return (
    <StyledBoardContainer>
      <BoardsToolbar />

      <StyledBoardContent>
        <Outlet />
      </StyledBoardContent>
    </StyledBoardContainer>
  );
}

export default BoardLayout;
