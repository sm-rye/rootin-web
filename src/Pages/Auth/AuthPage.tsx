import React, { useState } from 'react';

import type { AuthMode } from '@/entities/auth';
import AuthForm from '@/features/auth/Components/AuthForm';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');

  const handleAuthMode = () => setMode(mode === 'signup' ? 'login' : 'signup');

  return (
    <div>
      <AuthForm mode={mode} handleAuthMode={handleAuthMode} />
    </div>
  );
}
