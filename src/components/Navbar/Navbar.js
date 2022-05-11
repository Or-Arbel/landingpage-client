import React from 'react';
import { AppBar, Toolbar, IconButton, Stack, Button } from '@mui/material';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Navbar = (props) => {
  return (
    <AppBar position="sticky" id={styles.appBar}>
      <Toolbar>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="logo"
          // href="/"
        >
          <EmojiFlagsIcon />
        </IconButton>

        <Stack direction="row" spacing={2}>
          <Button color="inherit">
            <Link className={styles.navLink} to="/">
              פורטל שוע"ל מפקדות
            </Link>
          </Button>
          <Button color="inherit">
            <Link className={styles.navLink} to="/shob">
              מעבדת פיתוח שו"ב
            </Link>
          </Button>
          <Button color="inherit">
            <Link className={styles.navLink} to="/report">
              דיווח תקלה ויצירת קשר
            </Link>
          </Button>
          <Button color="inherit">
            <Link className={styles.navLink} to="/update">
              עדכון
            </Link>
          </Button>
        </Stack>
        <Button
          style={{ color: 'white' }}
          onClick={() => props.setOpenModal(true)}
          className={styles.navLink}
        >
          התחברות
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
