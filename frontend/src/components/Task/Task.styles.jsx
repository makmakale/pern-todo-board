import styled from 'styled-components';

export const TaskShortContent = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  width: 100%;
`;

export const TaskMarkers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .7rem;
`;

export const TaskTypeBox = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: unset !important;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: ${(props) => props.color};
  color: #fff !important;
  font-size: .5rem;
  margin-right: 5px;
`;

export const TaskInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .7rem;
`;

export const TaskNumber = styled.div`
  color: #aaa;
  font-size: .8rem;
  font-weight: 600;
`;
