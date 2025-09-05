import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState<string>("");
  const [validUsername, setValidUsername] = useState<boolean>(false);
  const [usernameFocus, setUsernameFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [validConfirmPwd, setValidConfirmPwd] = useState<boolean>(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === confirmPwd;
    setValidConfirmPwd(match);
  }, [pwd, confirmPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, confirmPwd]);

  return (
    <section aria-labelledby="register-title">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 id="register-title">Register</h1>
      <form>
        <fieldset>
          <legend>Account Information</legend>
          <div>
            <label htmlFor="username">
              Username:
              <span className={validUsername ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validUsername || !username ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
            />
            <p
              id="uidnote"
              className={
                usernameFocus && username && !validUsername
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: ! @ # $ %
            </p>
          </div>
          <div>
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span
                className={validConfirmPwd && confirmPwd ? "valid" : "hide"}
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validConfirmPwd || !confirmPwd ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setConfirmPwd(e.target.value)}
              required
              aria-invalid={validConfirmPwd ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setConfirmPwdFocus(true)}
              onBlur={() => setConfirmPwdFocus(false)}
            />
            <p
              id="confirmnote"
              className={confirmPwdFocus && !validConfirmPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
             Must match the first password input field.
            </p>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
