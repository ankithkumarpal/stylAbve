import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function SideNav() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ 
        width: '100%',
        height: '100%', 
        bgcolor: '#d3b46dd5', 
        color: 'black', 
        fontFamily: 'cursive'
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader 
          component="div" 
          id="nested-list-subheader"
          sx={{ 
            bgcolor: 'inherit',
            background: "none", 
            color: 'purple', 
            fontFamily: 'cursive', 
            fontSize: "1.5rem", 
            marginLeft: "1rem", 
            marginRight: "1rem"
          }}
        >
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton sx={{ fontFamily: 'cursive', color: 'inherit' }}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" sx={{ fontFamily: 'cursive' }} />
      </ListItemButton>
      <ListItemButton sx={{ fontFamily: 'cursive', color: 'inherit' }}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" sx={{ fontFamily: 'cursive' }} />
      </ListItemButton>
      <ListItemButton onClick={handleClick} sx={{ fontFamily: 'cursive', color: 'inherit' }}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" sx={{ fontFamily: 'cursive' }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4, fontFamily: 'cursive', color: 'inherit' }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" sx={{ fontFamily: 'cursive' }} />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
