import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegisterReturn,
} from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  autoFocus?: boolean;
  register: UseFormRegisterReturn;
  errors?: FieldErrors;
  control: Control<any>;
}

const FormField = ({
  id,
  label,
  type = "text",
  autoFocus = false,
  register,
  errors,
  control,
}: FormFieldProps) => {
  const error = errors?.[id];
  const value = useWatch({ control: control, name: id });
  const isValid = value != undefined && !error && value.trim() !== "";
  const validationId = `${id}-note`;

  return (
    <div>
      <label htmlFor={id}>
        {label}:
        <span className={isValid ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={error ? "invalid" : "hide"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </label>
      <input
        id={id}
        type={type}
        autoFocus={autoFocus}
        autoComplete="off"
        aria-invalid={error ? "false" : "true"}
        aria-describedby={validationId}
        {...register}
      />
      {error && (
        <p id={validationId} className="instructions">
          <FontAwesomeIcon icon={faInfoCircle} /> {error.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default FormField;
