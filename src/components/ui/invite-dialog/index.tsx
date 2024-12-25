import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { requestInvite } from '@/lib/api';
import {
  validateConfirmEmail,
  validateEmail,
  validateName,
} from '@/lib/validate';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ErrorContent } from './ErrorContent';
import { SuccessContent } from './SuccessContent';

interface InviteDialogProps {
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
}

export const InviteDialog = ({
  showDialog,
  setShowDialog,
}: InviteDialogProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [enableNameMessage, setEnableNameMessage] = useState(false);
  const [enableEmailMessage, setEnableEmailMessage] = useState(false);
  const [enableConfirmEmailMessage, setEnableConfirmEmailMessage] =
    useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const nameMessage = validateName(fullName);
  const emailMessage = validateEmail(email);
  const confirmEmailMessage = validateConfirmEmail(email, confirmEmail);

  const disableSendButton = Boolean(
    nameMessage || emailMessage || confirmEmailMessage || isLoading
  );

  const handleSend = async () => {
    setIsLoading(true);

    try {
      await requestInvite(fullName, email);
      setIsSuccess(true);
    } catch (err) {
      setError(
        (err as { errorMessage?: string })?.errorMessage || 'An error occurred'
      );
    }
    setIsLoading(false);
  };

  // Reset the form after the user clicks the Ok button instead of closing the dialog
  const handleErrorClick = () => {
    setEmail('');
    setConfirmEmail('');
    setError(null);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[425px]">
        {!isSuccess && !error && (
          <>
            <DialogHeader>
              <DialogTitle>Request an Invite</DialogTitle>
              <DialogDescription>
                Please fill in the form below to request an invite. We will
                review your request and get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <div className="grid w-full items-center gap-6">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  type="text"
                  id="full-name"
                  placeholder="Carl Chua"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setEnableNameMessage(true)}
                />

                {enableNameMessage && nameMessage && (
                  <div className="text-red-500 text-xs">{nameMessage}</div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="carl.chua@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEnableEmailMessage(true)}
                />

                {enableEmailMessage && emailMessage && (
                  <div className="text-red-500 text-xs">{emailMessage}</div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-email">Confirm Email</Label>
                <Input
                  type="email"
                  id="confirm-email"
                  placeholder="Re-enter your email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  onBlur={() => setEnableConfirmEmailMessage(true)}
                />

                {enableConfirmEmailMessage && confirmEmailMessage && (
                  <div className="text-red-500 text-xs">
                    {confirmEmailMessage}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleSend}
                  className="w-full"
                  disabled={disableSendButton}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Send'}
                </Button>
              </DialogFooter>
            </div>
          </>
        )}

        {isSuccess && <SuccessContent />}

        {error && (
          <ErrorContent message={error} handleErrorClick={handleErrorClick} />
        )}
      </DialogContent>
    </Dialog>
  );
};
