import * as Yup from "yup";
import { createPostLimit } from "../constants/validation";

export const createPostValidation = Yup.object({
  title: Yup.string()
    .max(
      createPostLimit.title.maxLength,
      `Must be at most ${createPostLimit.title.maxLength} characters`
    )
    .required("Required"),
  text: Yup.string()
    .max(
      createPostLimit.text.maxLength,
      `Must be at most ${createPostLimit.text.maxLength} characters`
    )
    .required("Required"),
});
