import { Button } from '@/components/shadcn/button';
import { showDialogAtom } from '@/pages/home-page/store';
import { useSetAtom } from 'jotai';

export const HeroSection = () => {
  const setShowDialog = useSetAtom(showDialogAtom);

  return (
    <div className="px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold text-primary md:text-5xl">
        A better way to enjoy every day.
      </h1>
      <p className="mb-8 text-base text-slate-700 md:text-lg">
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
