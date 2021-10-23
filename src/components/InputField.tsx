import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { FieldHookConfig, useField } from "formik";
import React from "react";

type InputFieldProps = FieldHookConfig<string> & {
  label: string;
  helperText?: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  placeholder,
  textarea,
  type,
  ...props
}) => {
  const [field, { touched, error }] = useField(props);

  return (
    <FormControl isInvalid={touched && !!error}>
      <FormLabel id={`${props.name}-label`} htmlFor={`${props.name}-input`}>
        {label}
      </FormLabel>
      {textarea ? (
        <Textarea id={`${props.name}-input`} {...field} type={type} />
      ) : (
        <Input
          id={`${props.name}-input`}
          {...field}
          type={type}
          placeholder={placeholder}
        />
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
