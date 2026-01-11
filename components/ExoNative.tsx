'use client';
import { useEffect } from 'react';

export default function ExoNative() {
  useEffect(() => {
    (window as any).AdProvider = (window as any).AdProvider || [];
    (window as any).AdProvider.push({ serve: {} });
  }, []);

  return (
    <div className="my-12 flex justify-center">
      <ins
        className="eas6a97888e20"
        data-zoneid="5824850"
        style={{ display: 'block' }}
      />
    </div>
  );
}
