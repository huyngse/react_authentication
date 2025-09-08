import { authApi } from "@/api/authApi";
import { useMutation } from "@/hooks/useMutation";
import type { LoginRequest, LoginResponse } from "@/types/api";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormField from "./FormField";

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
});

type LoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const { mutate: login } = useMutation<LoginResponse, LoginRequest>(
    authApi.login
  );

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef<HTMLDivElement>(null);

  const [success, setSuccess] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginForm) => {
    login({ username: data.username, password: data.password })
      .then(() => setSuccess(true))
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setErrMsg(err.response?.data.message || "Login failed");
        } else {
          setErrMsg("Login failed");
        }
        setSuccess(false);
      });
  };

  useEffect(() => {
    if (errMsg) {
      errRef.current?.focus();
    }
  }, [errMsg]);

  if (success) {
    return (
      <section>
        <h1>You are logged in!</h1>
        <p>
          <a href="#">Go to Home</a>
        </p>
      </section>
    );
  }

  return (
    <section aria-describedby="login-title">
      <h1 id="login-title">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="username"
          label="Username"
          autoFocus
          register={formRegister("username")}
          errors={errors}
          control={control}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          register={formRegister("password")}
          errors={errors}
          control={control}
        />
        <button disabled={!isValid}>Log In</button>
      </form>

      {errMsg && (
        <p className="errmsg" aria-live="assertive" ref={errRef} tabIndex={-1}>
          {errMsg || "\u00A0"}
        </p>
      )}
      <aside>
        <p>
          Need an Account?
          <br />
          <a href="/register">Sign Up</a>
        </p>
      </aside>
    </section>
  );
};

export default Login;
