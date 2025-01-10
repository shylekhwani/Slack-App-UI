import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,DialogTitle } from "@/components/ui/dialog";

export const useConfirm = function ({ title, message }) {
  const [promise, setPromise] = useState(null);

  // Function to initiate the confirmation dialog and return a Promise
  const confirmation = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  // Close the dialog and resolve with `false`
  const handleClose = () => {
    promise?.resolve(false); // Resolve `false` when canceled
    setPromise(null);
  };

  // Confirm action and resolve with `true`
  const handleConfirm = () => {
    promise?.resolve(true); // Resolve `true` when confirmed
    setPromise(null);
  };

  const ConfirmDialog = () => {
    if (!promise) return null;

    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return { ConfirmDialog, confirmation };
};
