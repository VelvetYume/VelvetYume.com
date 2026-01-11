'use client';
import { useEffect, useState } from 'react';

export default function ExoNative() {
  const [zoneId, setZoneId] = useState<string | null>(null);

  useEffect(() => {
    // cihaz tespiti
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setZoneId(isMobile ? '5824860' : '5824850');

    (window as any).AdProvider = (window as any).AdProvider || [];
    (window as any).AdProvider.push({ serve: {} });
  }, []);

  if (!zoneId) return null;

  return (
    <div className="my-12 flex justify-center w-full">
      <ins
        className="eas6a97888e20"
        data-zoneid={zoneId}
        style={{ display: 'block', width: '100%' }}
      />
    </div>
  );
}
