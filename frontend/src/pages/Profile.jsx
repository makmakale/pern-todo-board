import { StyledDetailsWrapper } from '@/components/Details/Details.styles';
import Profile from '@/components/Profile';

function ProfilePage() {
  return (
    <StyledDetailsWrapper>
      <h1>Profile</h1>

      <Profile />
    </StyledDetailsWrapper>
  );
}

export default ProfilePage;
