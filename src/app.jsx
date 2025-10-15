import React, { useEffect, useState } from 'react';
import Intro from './components/intro';
import SignIn from './components/signin';
import ChatLayout from './components/chatlayout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 8000);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  if (showIntro) return <Intro />;
  if (!user) return <SignIn />;
  return <ChatLayout />;
}