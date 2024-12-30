import { Button } from '@/components/shadcn/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';

interface ErrorContentProps {
  message: string;
  handleErrorClick: () => void;
}

export const ErrorContent = ({
  message,
  handleErrorClick,
}: ErrorContentProps): JSX.Element => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Error</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          id="error-button"
          type="button"
          onClick={handleErrorClick}
          className="w-full"
        >
          Ok
        </Button>
      </DialogFooter>
    </>
  );
};
