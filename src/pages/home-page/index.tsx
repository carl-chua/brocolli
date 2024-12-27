import { HeroSection } from '@/pages/home-page/components/hero-section';
import { InviteDialog } from '@/pages/home-page/components/invite-dialog';
import { useAtomValue } from 'jotai';
import { showDialogAtom } from './store';

export const HomePage = () => {
  const showDialog = useAtomValue(showDialogAtom);

  return (
    <div className="mx-auto mt-16 flex w-full max-w-7xl flex-grow flex-col items-center justify-center gap-y-4">
      <HeroSection />

      {/* Conditionally render the dialog to reset after submission */}
      {showDialog && <InviteDialog />}
    </div>
  );
};
