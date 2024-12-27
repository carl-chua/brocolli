import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import { memo } from 'react';

const HeaderContent = () => (
  <DialogHeader>
    <DialogTitle>Request an Invite</DialogTitle>
    <DialogDescription>
      Please fill in the form below to request an invite. We will review your
      request and get back to you as soon as possible.
    </DialogDescription>
  </DialogHeader>
);

export const MemoizedHeaderContent = memo(HeaderContent);
