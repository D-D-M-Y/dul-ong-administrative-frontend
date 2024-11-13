// src/hoc/withAuth.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      // Check if user has visited or is authenticated
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const hasVisited = localStorage.getItem('hasVisited');

      if (!isAuthenticated || !hasVisited) {
        // If not authenticated or first time visiting, redirect to login
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
