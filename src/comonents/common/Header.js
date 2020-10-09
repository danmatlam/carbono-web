import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ArrowBackIos';
import { useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header({title, back}) {
  const classes = useStyles();
  let history = useHistory();

  debugger
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">

          {
            back && (<IconButton 
              onClic={()=>history.goBack()}
              edge="start" 
              className={classes.menuButton} color="inherit" aria-label="menu">
                <ChevronLeft />
              </IconButton>)
          }
          
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}