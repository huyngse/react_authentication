import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ReactNode, useState, useEffect, useRef } from "react";

const ValidationMessage = ({
  id,
  show,
  children,
}: {
  id: string;
  show: boolean;
  children: ReactNode;
}) => (
  <p id={id} className={show ? "instructions" : "offscreen"}>
    <FontAwesomeIcon icon={faInfoCircle} /> {children}
  </p>
);

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  setValue: (val: string) => void;
  validationMessage: ReactNode;
  autoFocus?: boolean;
  pattern?: RegExp;
  confirmWith?: string;
  onValidityChange?: (isValid: boolean) => void;
}

const FormField = ({
  id,
  label,
  type = "text",
  value,
  setValue,
  validationMessage,
  autoFocus = false,
  pattern,
  confirmWith,
  onValidityChange,
}: FormFieldProps) => {
  const [focus, setFocus] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validationId = `${id}-note`;

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    let valid = false;
    if (confirmWith !== undefined) {
      valid = value === confirmWith;
    } else if (pattern) {
      valid = pattern.test(value);
    } else {
      valid = !!value;
    }
    setIsValid(valid);
    onValidityChange?.(valid);
  }, [value, pattern, confirmWith, onValidityChange]);

  return (
    <div>
      <label htmlFor={id}>
        {label}:
        <span className={isValid ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={isValid || !value ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </label>
      <input
        id={id}
        type={type}
        ref={inputRef}
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        aria-invalid={isValid ? "false" : "true"}
        aria-describedby={validationId}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <ValidationMessage id={validationId} show={focus && !!value && !isValid}>
        {validationMessage}
      </ValidationMessage>
    </div>
  );
};

export default FormField;
