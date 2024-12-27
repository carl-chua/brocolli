import { Button } from '@/components/shadcn/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';

export const SuccessContent = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Invite Sent!</DialogTitle>
        <DialogDescription>
          Please check your email for the invite.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button id="success-button" type="button" className="w-full">
            Ok
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
