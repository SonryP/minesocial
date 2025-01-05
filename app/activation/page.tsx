'use client';

import { useSearchParams } from 'next/navigation';
import RegistrationForm from '../components/RegistrationForm';
import { getUser } from '../actions/activate';
import { useEffect, useState, Suspense } from 'react';
import { useLocale } from '../components/Locale';

export const dynamic = 'force-dynamic';

function ActivationContent() {
  const [username, setUsername] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const locale = useLocale("activation");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const aid = searchParams.get('aid');
        if (aid) {
          const name = await getUser(aid);
          setUsername(name || '');
          localStorage.setItem('pretoken', aid);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
        setUsername('');
      }
    };
    fetchUsername();
  }, [searchParams]);

  if (username === null) {
    return <h1 className="text-4xl text-white font-bold mb-8">{locale.loadingText}</h1>;
  }

  if (username === '') {
    return <h1 className="text-4xl text-white font-bold mb-8">{locale.userActivated}</h1>;
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">{locale.welcome} {username}!</h1>
      <RegistrationForm username={username} />
    </>
  );
}

export default function Activation() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black bg-opacity-50">
        <ActivationContent />
      </main>
    </Suspense>
  );
}

function LoadingFallback(){
  const locale = useLocale("activation");
  return <h1 className="text-4xl text-white font-bold mb-8">{locale.loadingText}
  </h1>;
}
