'use client';
import { useEffect } from 'react';

export default function ExoNative() {
  useEffect(() => {
    (window as any).AdProvider = (window as any).AdProvider || [];
    (window as any).AdProvider.push({ serve: {} });
  }, []);

  return (
    <div className="my-12 flex justify-center w-full">
      <ins
        className="eas6a97888e20"
        data-zoneid="5824860"   // ✅ PANELDEKİYLE AYNI
        style={{ display: 'block', width: '100%' }}
      />
    </div>
  );
}
