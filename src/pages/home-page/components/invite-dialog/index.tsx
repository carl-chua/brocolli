import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/shadcn/dialog';
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
import { MemoizedInputField } from './InputField';
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
      const res = await requestInvite(fullName, email);
      if (res === 'Registered') {
        setIsSuccess(true);
      } else {
        setError('An unknown error occurred');
      }
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

            <div className="grid w-full items-center gap-6">
              <MemoizedInputField
                id="full-name"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                onBlur={() => setEnableNameMessage(true)}
                errorMessage={enableNameMessage ? nameMessage : undefined}
              />

              <MemoizedInputField
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => setEnableEmailMessage(true)}
                errorMessage={enableEmailMessage ? emailMessage : undefined}
              />

              <MemoizedInputField
                id="confirm-email"
                type="email"
                placeholder="Confirm Email"
                value={confirmEmail}
                onChange={(event) => setConfirmEmail(event.target.value)}
                onBlur={() => setEnableConfirmEmailMessage(true)}
                errorMessage={
                  enableConfirmEmailMessage ? confirmEmailMessage : undefined
                }
              />

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
