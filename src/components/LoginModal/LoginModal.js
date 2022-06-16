import React, { useState, useEffect } from "react";
import styles from "./LoginModal.module.scss";
import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import useInput from "../../Hooks/use-input";

const LoginModal = (props) => {
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailError,
    valueChangeHandler: emailChanged,
    inputBlurHandler: emailTouched,
    reset: resetEmail,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordError,
    valueChangeHandler: passwordChanged,
    inputBlurHandler: passwordTouched,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "");

  const loginHandler = (event) => {
    event.preventDefault();
    console.log(enteredEmail);
    console.log(enteredPassword);

    props.loginFunc();
    props.closeModal();

    resetEmail();
    resetPassword();
  };

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    setFormIsValid(emailIsValid && passwordIsValid);
  }, [enteredEmail, enteredPassword]);

  const closeLoginModal = () => {
    resetEmail();
    resetPassword();
    props.closeModal();
  };

  if (!props.openModal) return null;

  return (
    <Modal dir="rtl" open={props.openModal} onClose={props.closeModal}>
      <Box className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => props.closeModal()}>X</button>
        </div>

        <h1>התחברות</h1>

        <form onSubmit={loginHandler}>
          <div className={styles.body}>
            <TextField
              className={styles.formInput}
              id="email"
              value={enteredEmail}
              label="כתובת אימייל"
              autoComplete="off"
              variant="standard"
              required
              error={emailError}
              helperText={
                emailError ? "שדה זה הוא חובה, נא הזן כתובת אימייל" : ""
              }
              onChange={emailChanged}
              onBlur={emailTouched}
            />
            <br />
            <TextField
              className={styles.formInput}
              id="password"
              value={enteredPassword}
              label="סיסמא"
              type="password"
              variant="standard"
              required
              error={passwordError}
              helperText={passwordError ? "שדה זה הוא חובה, נא הזן סיסמה" : ""}
              onChange={passwordChanged}
              onBlur={passwordTouched}
            />
          </div>
          <div className={styles.footer}>
            <Button variant="contained" type="submit" disabled={!formIsValid}>
              התחבר
            </Button>
            <Button variant="contained" color="error" onClick={closeLoginModal}>
              סגור
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
