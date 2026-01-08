// app/oyun/[id]/page.tsx  (veya app/games/[id]/page.tsx)

'use client';

import { use } from 'react';
import GameDetails from './GameDetails';
import gamesData from '../../../data/games.json';

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const game = gamesData.find((g: any) => g.id === id);

  if (!game) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0d001f] text-pink-400">
        <p className="text-2xl">Oyun bulunamadı.</p>
      </main>
    );
  }

  return <GameDetails game={game} />;
}