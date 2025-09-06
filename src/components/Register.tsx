import { useState, useRef, type FormEvent } from "react";
import FormField from "./FormField";
import { useMutation } from "@/hooks/useMutation";
import { authApi } from "@/api/authApi";
import type { RegisterRequest, RegisterResponse } from "@/types/api";
import axios from "axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const { mutate: register } = useMutation<RegisterResponse, RegisterRequest>(
    authApi.register
  );
  const errRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [usernameValid, setUsernameValid] = useState(false);
  const [pwdValid, setPwdValid] = useState(false);
  const [confirmPwdValid, setConfirmPwdValid] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const allValid = usernameValid && pwdValid && confirmPwdValid;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!allValid) {
      setErrMsg("Invalid Entry");
      return;
    }

    register({
      password: pwd,
      username: username,
    })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setErrMsg(err.response?.data.message);
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
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Account Information</legend>
          <FormField
            id="username"
            label="Username"
            value={username}
            setValue={setUsername}
            autoFocus
            pattern={USER_REGEX}
            validationMessage={
              <>
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </>
            }
            onValidityChange={setUsernameValid}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            value={pwd}
            setValue={setPwd}
            pattern={PWD_REGEX}
            validationMessage={
              <>
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters: ! @ # $ %
              </>
            }
            onValidityChange={setPwdValid}
          />
          <FormField
            id="confirm_pwd"
            label="Confirm Password"
            type="password"
            value={confirmPwd}
            setValue={setConfirmPwd}
            confirmWith={pwd}
            validationMessage="Must match the first password input field."
            onValidityChange={setConfirmPwdValid}
          />
          <button disabled={!allValid}>Sign Up</button>
        </fieldset>
      </form>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
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
