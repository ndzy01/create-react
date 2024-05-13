import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const Modal = ({
  open = false,
  setOpen,
  children,
  renderTrigger,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  children: any;
  renderTrigger?: any;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {renderTrigger && <Dialog.Trigger asChild>{renderTrigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
