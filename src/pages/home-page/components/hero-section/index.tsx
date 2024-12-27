import { Button } from '@/components/shadcn/button';
import { showDialogAtom } from '@/pages/home-page/store';
import { useSetAtom } from 'jotai';

export const HeroSection = () => {
  const setShowDialog = useSetAtom(showDialogAtom);

  return (
    <div className="text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
        A better way to enjoy every day.
      </h1>
      <p className="text-base md:text-lg text-slate-700 mb-8">
        Be the first to know when we launch.
      </p>
      <Button
        id="request-invite-button"
        onClick={() => setShowDialog(true)}
        className="p-6 text-lg"
      >
        Request an Invite
      </Button>
    </div>
  );
};
