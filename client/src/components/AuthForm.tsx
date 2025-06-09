import React, { useState } from 'react';

interface AuthFormProps {
  onLoginSuccess: (userId: number) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLoginSuccess }) => {
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка входа');
      onLoginSuccess(data.user.id);
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка регистрации');
      onLoginSuccess(data.user.id);
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        {authTab === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
      </h2>
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setAuthTab('login')}
          className={`px-4 py-2 rounded ${
            authTab === 'login' ? 'bg-violet-600 text-white' : 'bg-gray-200'
          }`}
        >
          Вход
        </button>
        <button
          onClick={() => setAuthTab('register')}
          className={`px-4 py-2 rounded ${
            authTab === 'register' ? 'bg-violet-600 text-white' : 'bg-gray-200'
          }`}
        >
          Регистрация
        </button>
      </div>

      {authTab === 'register' && (
        <input
          className="w-full p-2 border mb-3 rounded"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        className="w-full p-2 border mb-3 rounded"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border mb-3 rounded"
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {authError && <p className="text-red-500 mb-4">{authError}</p>}

      <button
        onClick={authTab === 'login' ? handleLogin : handleRegister}
        className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
      >
        {authTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </main>
  );
};

export default AuthForm;