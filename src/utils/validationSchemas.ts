import * as Yup from "yup";
import {
  authLimit,
  commentLimit,
  createPostLimit,
} from "../constants/validation";

export const createPostValidation = Yup.object({
  title: Yup.string()
    .max(
      createPostLimit.title.maxLength,
      `Must be at most ${createPostLimit.title.maxLength} characters`
    )
    .required("Required"),
  link: Yup.string().url(),
  text: Yup.string().max(
    createPostLimit.text.maxLength,
    `Must be at most ${createPostLimit.text.maxLength} characters`
  ),
});

export const createCommentValidation = Yup.object({
  text: Yup.string()
    .max(
      commentLimit.text.maxLength,
      `Must be at most ${commentLimit.text.maxLength} characters`
    )
    .required("Required"),
});

export const loginValidation = Yup.object({
  username: Yup.string()
    .min(
      authLimit.username.minLength,
      `Must be at least ${authLimit.username.minLength} characters`
    )
    .max(
      authLimit.username.maxLength,
      `Must be at most ${authLimit.username.maxLength} characters`
    )
    .required("Required"),
  password: Yup.string()
    .min(
      authLimit.password.minLength,
      `Must be at least ${authLimit.password.minLength} characters`
    )
    .max(
      authLimit.password.maxLength,
      `Must be at most ${authLimit.password.maxLength} characters`
    )
    .required("Required"),
});

export const registerValidation = Yup.object({
  username: Yup.string()
    .min(
      authLimit.username.minLength,
      `Must be at least ${authLimit.username.minLength} characters`
    )
    .max(
      authLimit.username.maxLength,
      `Must be at most ${authLimit.username.maxLength} characters`
    )
    .required("Required"),
  password: Yup.string()
    .min(
      authLimit.password.minLength,
      `Must be at least ${authLimit.password.minLength} characters`
    )
    .max(
      authLimit.password.maxLength,
      `Must be at most ${authLimit.password.maxLength} characters`
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
