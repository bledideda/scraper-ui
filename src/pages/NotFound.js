import { Typography } from "@mui/material";

export default function NotFound(){
    return (
        <div style={{display:'flex',flexDirection:'column', alignItems:'center', height:'100vh',justifyContent:'center'}}>
            <Typography variant="h2" component="div" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
                Sorry the page you requested cannot be found.
            </Typography>
        </div>
    )
}