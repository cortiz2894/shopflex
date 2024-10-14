import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/shared/Scene/Scene'), {
  ssr: false,
});

export default async function NotFound() {
  return (
    <main className="h-screen w-screen relative">
      <Scene />
    </main>
  );
}
