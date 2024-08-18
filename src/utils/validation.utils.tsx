import { useCallback } from "react";
import { FieldErrors } from "react-hook-form";
import * as Yup from "yup";
import { ValidationError } from "yup";
import { ControlledForm } from "../types/item.types";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]/, "Name must start with a letter")
    .required("Name is required")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
  age: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return null;
      }
      return value;
    })
    .nullable()
    .required("Age is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  gender: Yup.string().required("Gender is required"),
  acceptTerms: Yup.boolean()
    .required("You must accept the terms and conditions"),
  image: Yup.mixed()
    .required("Picture is required")
    .test("fileSize", "File size is too large", (value) => {
      if (value instanceof File) {
        return value.size <= 1024 * 1024 * 2;
      }
      return true;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (value instanceof File) {
        return ["image/png", "image/jpeg"].includes(value.type);
      }
      return true;
    }),
  country: Yup.string()
    .required("Country is required"),
});

export const useYupValidationResolver = () =>
  useCallback(
    async (data: ControlledForm) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        if (errors instanceof Yup.ValidationError) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors: FieldErrors<FormData>, currentError: ValidationError) => ({
                ...allErrors,
                [currentError.path!]: {
                  type: currentError.type ?? "validation",
                  message: currentError.message,
                },
              }),
              {},
            ),
          };
        } else {
          return {
            values: {},
            errors: {},
          };
        }
      }
    },
    [validationSchema],
  );
