import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../components/inputs/TextInput";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { forgotPassword, resetPassword } from "../../service";
import { navigateTo } from "../../utils";
import { useParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [isLaoding, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForgotPassword = () => {
    setIsLoading(true);
    if (email === "") {
      alert("Email is required");
      setIsLoading(false);
      return;
    }
    forgotPassword({ email })
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
					let domain = email.substring(email.lastIndexOf("@") +1);
          navigateTo({ path: "//"+domain });
        } else {
          alert(
            "Something went Wrong. Please contact the system Admin and show this code: 1002"
          );
        }
      })
      .catch(() => {
        alert(
          "Something went Wrong. Please contact the system Admin and show this code: 1003"
        );
      });
  };

  const handleResetPassword = () => {
		setIsLoading(true);
		if (password === "" | confirmPassword === "") {
      alert("All fields are required");
      setIsLoading(false);
      return;
    }
		resetPassword().then((res)=>{
			if(res.statusCode === 200){
				navigateTo({ path: "/login" });
			}else{
				alert(
					"Something went Wrong. Please contact the system Admin and show this code: 1004"
				);
			}
		}).catch(()=>{
			alert(
				"Something went Wrong. Please contact the system Admin and show this code: 1005"
			);
		})
	};

  if (token) {
    return (
      <div style={{ display: "block" }}>
        <div style={{ textAlign: "center", marginBottom: "5em" }}>
          <Typography variant="h5">Reset password.</Typography>
          <Typography variant="body1">
            Enter your new password credentials.
          </Typography>
        </div>

        <TextInput
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={setPassword}
          value={password}
        />

        <TextInput
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={setConfirmPassword}
          value={confirmPassword}
        />

        <div className="text-center">
          {isLaoding ? (
            <LoadingButton
              loading
              style={{ height: "3.5em", width: "100%" }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Reset password
            </LoadingButton>
          ) : (
            <Button
              style={{ height: "3.5em", width: "100%" }}
              variant="contained"
              startIcon={<LoginOutlinedIcon />}
              onClick={handleResetPassword}
            >
              Reset password
            </Button>
          )}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "block" }}>
      <div style={{ textAlign: "center", marginBottom: "5em" }}>
        <Typography variant="h5">Forgot password ?</Typography>
        <Typography variant="body1">
          Enter your email and we will send you the link to <br />
          reset password.
        </Typography>
      </div>

      <TextInput
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={setEmail}
        value={email}
      />

      <div className="text-center">
        {isLaoding ? (
          <LoadingButton
            loading
            style={{ height: "3.5em", width: "100%" }}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Send Email
          </LoadingButton>
        ) : (
          <Button
            style={{ height: "3.5em", width: "100%" }}
            variant="contained"
            startIcon={<LoginOutlinedIcon />}
            onClick={handleForgotPassword}
          >
            Send Email
          </Button>
        )}
      </div>
    </div>
  );
}
