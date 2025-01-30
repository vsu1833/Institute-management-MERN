import * as yup from "yup";

export const registerSchema = yup.object({
  school_name: yup
    .string()
    .min(8, "School name must contain 8 characters")
    .required("School name is  required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  owner_name: yup.string().min(3, "Owner name must contain 3 characters").required("Owner name is required"),
  password: yup
    .string()
    .min(8, "Password must contain 8 characters")
    .required("Password is a required field"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm password must match with password")
    .required("Confirm password is required field"),
});

// export const loginSchema = yup.object({
//   email: string,
//   password: string,
// });
