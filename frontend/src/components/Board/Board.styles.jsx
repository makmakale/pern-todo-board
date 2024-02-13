import { Paper } from '@mui/material';
import styled from 'styled-components';

export const StyledBoardContainer = styled(Paper).attrs({ elevation: 3 })`
  position: relative;
  background-color: #e3edf7 !important;
`;

export const StyledBoardContent = styled.div`
  position: relative;
  min-height: 50vh;
  display: flex;
`;

export const StyledBoardGrid = styled.div`
  margin: 2rem;
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  grid-template-rows: 100%;
  grid-gap: 1rem;
  overflow: hidden;
  transition: .5s;

  @media screen and (max-width: 976px) {
    grid-template-columns: minmax(300px, 1fr);
    grid-template-rows: unset;
  }
`;
