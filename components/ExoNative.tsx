'use client';

import { useEffect } from 'react';

export default function ExoNative() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      (window.AdProvider = window.AdProvider || []).push({ serve: {} });
    }
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
