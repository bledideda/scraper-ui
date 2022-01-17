import { TextField } from "@mui/material";
import "./Input.css";
export default function TextInput({
  id,
  label,
  variant,
  autoComplete,
  type,
  onChange,
	value
}) {
  return (
    <div className="input-wrapper">
      <TextField
			  value={value}
        id={id}
        label={label}
        type={type}
        variant={variant}
        autoComplete={autoComplete}
				onChange={({target:{value}})=>onChange(value)}
      />
    </div>
  );
}
