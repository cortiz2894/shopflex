import Container from '@/components/Container/index';
import dynamic from 'next/dynamic';
import styles from './NotFound.module.scss';

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
