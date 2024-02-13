import BoardLayout from '@/components/layouts/BoardLayout';
import Layout from '@/components/layouts/Layout';
import RequireAuth from '@/components/layouts/RequireAuth';
import BoardPage from '@/pages/Board';
import DetailsPage from '@/pages/Details';
import LoginPage from '@/pages/Login';
import ProfilePage from '@/pages/Profile';
import RegisterPage from '@/pages/Register';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<BoardLayout />}>
          <Route index element={<BoardPage />} />
          <Route element={<RequireAuth />}>
            <Route path="create" element={<DetailsPage />} />
            <Route path="edit/:id" element={<DetailsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
