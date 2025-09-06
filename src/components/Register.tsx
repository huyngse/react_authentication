import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormField from "./FormField";
import { useMutation } from "@/hooks/useMutation";
import { authApi } from "@/api/authApi";
import type { RegisterRequest, RegisterResponse } from "@/types/api";
import axios from "axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const schema = yup.object({
  username: yup
    .string()
    .matches(
      USER_REGEX,
      "Your username must be between 4 and 24 characters. It must start with a letter, and can include letters, numbers, underscores, and hyphens."
    )
    .required("Username is required"),
  password: yup
    .string()
    .matches(
      PWD_REGEX,
      "Your password must be between 8 and 24 characters. It must include at least one uppercase letter, one lowercase letter, one number, and one special character from !, @, #, $, or %."
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Must match the first password input field.")
    .required("Confirm password is required"),
});

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { mutate: register } = useMutation<RegisterResponse, RegisterRequest>(
    authApi.register
  );
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    register({ username: data.username, password: data.password })
      .then(() => setSuccess(true))
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setErrMsg(err.response?.data.message || "Registration failed");
        } else {
          setErrMsg("Registration failed");
        }
        setSuccess(false);
      });
  };

  if (success) {
    return (
      <section>
        <h1>Success!</h1>
        <p>
          <a href="#">Sign up</a>
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="register-title">
      <h1 id="register-title">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Account Information</legend>

          <FormField
            id="username"
            label="Username"
            autoFocus
            register={formRegister("username")}
            errors={errors}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            register={formRegister("password")}
            errors={errors}
          />

          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            register={formRegister("confirmPassword")}
            errors={errors}
          />

          <button disabled={!isValid}>Sign Up</button>
        </fieldset>
      </form>

      {errMsg && (
        <p className="errmsg" aria-live="assertive">
          {errMsg}
        </p>
      )}

      <aside>
        <p>
          Already registered?
          <br />
          <a href="#">Sign In</a>
        </p>
      </aside>
    </section>
  );
};

export default Register;
