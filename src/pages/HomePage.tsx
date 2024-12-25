import { Button } from '@/components/shadcn/button';
import { InviteDialog } from '@/components/ui/invite-dialog';
import { useState } from 'react';

export const HomePage = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className=" w-full flex flex-grow flex-col items-center justify-center gap-y-4 max-w-7xl mx-auto">
      {/* Hero Section */}
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

      {/* Conditionally render the dialog to reset after submission */}
      {showDialog && (
        <InviteDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      )}
    </div>
  );
};
