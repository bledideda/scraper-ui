import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../components/inputs/TextInput";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { forgotPassword } from "../../service";
import { navigateTo } from "../../utils";

export default function ResetPasswordPage() {
    const [isLaoding, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleForgotPassword = () => {
        setIsLoading(true);
        if (email === "") {
          alert("Email is required");
          setIsLoading(false);
          return;
        }
        forgotPassword({email}).then((res)=>{
            setIsLoading(false);
            if(res.statusCode === 200){
                navigateTo({path:'/'});
            }else{
                alert('Something went Wrong. Please contact the system Admin and show this code: 102');
            }
        }).catch(()=>{
            alert('Something went Wrong. Please contact the system Admin and show this code: 103');
        })
    }

    return(
        <div style={{ display: "block" }}>

        <div style={{ textAlign: "center", marginBottom: "5em" }}>
          <Typography variant="h5">Forgot password ?</Typography>
          <Typography variant="body1">Enter your email and we will send you the link to <br/>reset password.</Typography>
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
    )
}