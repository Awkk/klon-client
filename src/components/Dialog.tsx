import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
} from "@chakra-ui/react";
import React, { MouseEventHandler, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: MouseEventHandler<HTMLButtonElement>;
  header: string;
  body: string;
  cancelText?: string;
  confirmText?: string;
  cancelButtonProps?: Partial<ButtonProps>;
  confirmButtonProps?: Partial<ButtonProps>;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onClick,
  header,
  body,
  cancelText = "cancel",
  confirmText = "confirm",
  cancelButtonProps = { variant: "outline" },
  confirmButtonProps = { colorScheme: "red", ml: "3" },
}) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{header}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{body}</AlertDialogBody>
        <AlertDialogFooter>
          <Button {...cancelButtonProps} ref={cancelRef} onClick={onClose}>
            {cancelText}
          </Button>
          <Button {...confirmButtonProps} onClick={onClick}>
            {confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
