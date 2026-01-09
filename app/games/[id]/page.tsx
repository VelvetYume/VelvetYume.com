// app/games/[id]/page.tsx - HATASIZ HALİ (Next.js 14+ uyumlu)
'use client';

import { use } from 'react'; // ← Bu import zorunlu
import GameDetails from './GameDetails';
import gamesData from '../../../data/games.json';
import type { Game } from '../../../types/game';

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ← Promise'ı unwrap et (zorunlu)

  const decodedId = decodeURIComponent(id); // ← Artık güvenli

  const game = gamesData.find((g: Game) => g.id === decodedId);

  if (!game) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0d001f] text-pink-400">
        <p className="text-2xl">Game not found. ID: {decodedId}</p>
      </main>
    );
  }

  return <GameDetails game={game} />;
}