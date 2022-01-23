import { useEffect, useState } from "react";
import { updateCategory } from "../service";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import "./CategoryItem.css";


export default function CategoryItem({ item }) {
  const [checked, setChecked] = useState(item.active);
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(()=>{
  // },[])
  //
  const handleChange = () => {
    setIsLoading(true);
    updateCategory({ category: item.slug, active: !checked })
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          setChecked(!checked);
        } else {
          alert(
            "Something went Wrong. Please contact the system Admin and show this code: 1008"
          );
        }
      })
      .catch(() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setChecked(!checked);
        }, 4000);
        alert(
          "Something went Wrong. Please contact the system Admin and show this code: 1009"
        );
      });
  };

  return (
    <ListItem key={`key_${item.slug}`}>
      <ListItemIcon>
        <FolderOutlinedIcon />
      </ListItemIcon>
      <ListItemText id="switch-list-label-bluetooth" primary={item.name} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {isLoading && (
          <span
            className="spinner"
            style={{
              display: "block",
              height: "24px",
            }}
          >
            <RefreshIcon color="disabled" />
          </span>
        )}
        <Switch
          disabled={isLoading}
          edge="end"
          onChange={handleChange}
          checked={checked}
          inputProps={{
            "aria-labelledby": "switch-list-label-cat1",
          }}
        />
      </div>
    </ListItem>
  );
}
