import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../components/inputs/TextInput";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { loginUser } from "../../service";
import { navigateTo } from "../../utils";
// import { unstable_HistoryRouter } from "react-router-dom";


export default function LoginPage({ setToken }) {
  // const history = unstable_HistoryRouter();
  const [isLaoding, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsLoading(true);
    if (username === "" | password === "") {
      alert("credentials are required");
      setIsLoading(false);
      return;
    }
    loginUser({ username, password }).then(res => {
      setIsLoading(false);
      if(res.statusCode === 200){
        setToken(res.data.data.accessToken);
      }else{
        alert('Something went Wrong. Please contact the system Admin and show this code: 100');
      }
    }).catch(()=>{
      alert('Something went Wrong. Please contact the system Admin and show this code: 101');
    })
  }

  return (
    <div style={{ display: "block" }}>
      <div style={{ textAlign: "center", marginBottom: "5em" }}>
        <Typography variant="h5">Welcome to Ultimate Panel.</Typography>
        <Typography variant="body1">Enter credentials to login.</Typography>
      </div>

      <TextInput
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={setUsername}
        value={username}
      />

      <TextInput
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        onChange={setPassword}
        value={password}
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
            Login
          </LoadingButton>
        ) : (
          <Button
            style={{ height: "3.5em", width: "100%" }}
            variant="contained"
            startIcon={<LoginOutlinedIcon />}
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
