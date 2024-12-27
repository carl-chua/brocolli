import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/shadcn/dialog';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { requestInvite } from '@/lib/api';
import {
  validateConfirmEmail,
  validateEmail,
  validateName,
} from '@/lib/validate';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { showDialogAtom } from '../../store';
import { ErrorContent } from './ErrorContent';
import { MemoizedHeaderContent } from './HeaderContent';
import { SuccessContent } from './SuccessContent';

export const InviteDialog = () => {
  const [showDialog, setShowDialog] = useAtom(showDialogAtom);

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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
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
            <MemoizedHeaderContent />

            {/* Optimsation: input can be memoized to prevent excessive rerenders*/}
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
                  id="send-button"
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
