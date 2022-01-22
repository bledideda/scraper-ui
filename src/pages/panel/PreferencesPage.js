import { Container, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Switch } from "@mui/material";
import React, { useState } from "react";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
export default function PreferencesPage() {
    const [checked, setChecked] = useState(['wifi']);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    return(
        <Container>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                subheader={<ListSubheader>Categories</ListSubheader>}
                >
                <ListItem>
                    <ListItemIcon>
                    <FolderOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="Category 1" />
                    <Switch
                        edge="end"
                        onChange={handleToggle('cat1')}
                        checked={checked.indexOf('cat1') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-cat1',
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                    <FolderOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="Category 2" />
                    <Switch
                        edge="end"
                        onChange={handleToggle('cat2')}
                        checked={checked.indexOf('cat2') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-cat2',
                        }}
                    />
                </ListItem>
          </List>
        </Container>
    )
}