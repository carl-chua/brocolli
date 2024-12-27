import { HeroSection } from '@/pages/home-page/components/hero-section';
import { InviteDialog } from '@/pages/home-page/components/invite-dialog';
import { useAtomValue } from 'jotai';
import { showDialogAtom } from './store';

export const HomePage = () => {
  const showDialog = useAtomValue(showDialogAtom);

  return (
    <div className=" w-full flex flex-grow flex-col items-center justify-center gap-y-4 max-w-7xl mx-auto">
      <HeroSection />

      {/* Conditionally render the dialog to reset after submission */}
      {showDialog && <InviteDialog />}
    </div>
  );
};
