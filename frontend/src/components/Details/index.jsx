import CreateTask from '@/components/Details/components/CreateTask';
import EditTask from '@/components/Details/components/EditTask';
import { StyledDetailsWrapper } from '@/components/Details/Details.styles';
import { useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const pageTitle = id ? `Edit task TDB-${id}` : 'Create task';

  return (
    <StyledDetailsWrapper>
      {id ? <EditTask id={id} pageTitle={pageTitle} /> : <CreateTask pageTitle={pageTitle} />}
    </StyledDetailsWrapper>
  );
}

export default Details;
