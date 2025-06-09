import AuthForm from 'components/AuthForm';
import ProfileTabs from 'components/ProfileTabs';
import React, { useState, useEffect } from 'react';

export const ProfilePage: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) setUserId(Number(storedUserId));
  }, []);

  const handleLoginSuccess = (id: number) => {
    localStorage.setItem('userId', id.toString());
    setUserId(id);
  };

  if (!userId) {
    return <AuthForm onLoginSuccess={handleLoginSuccess} />;
  }

  return <ProfileTabs userId={userId} />;
};

export default ProfilePage;