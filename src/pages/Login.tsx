import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormField from "../components/FormField";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { loginUser } from "@/features/auth/authSlice";
import { PWD_REGEX, USER_REGEX } from "@/constants/regex";

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
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const errRef = useRef<HTMLDivElement>(null);

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
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (error) {
      errRef.current?.focus();
    }
  }, [error]);

  if (accessToken) {
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
        <button disabled={!isValid || loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {error && (
        <p className="errmsg" aria-live="assertive" ref={errRef} tabIndex={-1}>
          {error || "\u00A0"}
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
