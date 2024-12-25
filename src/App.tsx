import { useState } from 'react';
import './App.css';
import { Button } from './components/shadcn/button';
import { InviteDialog } from './components/ui/invite-dialog';

function App() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
        <Button onClick={() => setShowDialog(true)}>Request an Invite</Button>

        {/* conditionally render the dialog to reset after submission*/}
        {showDialog && (
          <InviteDialog showDialog={showDialog} setShowDialog={setShowDialog} />
        )}
      </div>
    </>
  );
}

export default App;
