import { Textarea, TextareaProps } from "@chakra-ui/react";
import React from "react";
import ResizeTextarea, { TextareaAutosizeProps } from "react-textarea-autosize";

export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & TextareaAutosizeProps
>((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={4}
      as={ResizeTextarea}
      {...props}
    />
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
