import React, { useState, useEffect, useContext } from "react";
import styles from "./LoginModal.module.scss";
import {
  Button,
  Modal,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

//show/hide password icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import { Box } from "@mui/system";
import { SnackbarContext } from "../../App";
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("האימייל שהוזן אינו תקין")
    .required("שדה אימייל אינו יכול להיות ריק"),
  password: Yup.string().required("שדה סיסמא אינו יכול להיות ריק"),
});

const LoginModal = (props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const { setSnackbarDetails } = useContext(SnackbarContext);

  const successfulLoginHandler = (res) => {
    console.log(res);
    props.setIsLoggedIn(true);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: res.name,
        tokenExpiration: res.tokenExpiration,
        token: res.token,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let res = await validateEmailPassword(values.email, values.password);
      if (res?.message) {
        setSnackbarDetails({
          open: true,
          message: res.message,
          isError: res.status === "fail",
        });
      }
      if (res.status === "success") {
        successfulLoginHandler(res);
      }
    },
  });

  const closeLoginModal = () => {
    formik.resetForm();
    props.closeModal();
  };

  const validateEmailPassword = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/users/login`,
        {
          email,
          password,
        }
      );

      closeLoginModal();
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <Modal dir="rtl" open={true} onClose={closeLoginModal}>
      <Box className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button onClick={closeLoginModal}>X</button>
        </div>

        <h1>התחברות</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.body}>
            {/* Email Field :  */}
            <TextField
              id="email"
              name="email"
              className={styles.formInput}
              label="כתובת אימייל"
              type="text"
              variant="standard"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email ? formik.errors.email : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <br />

            {/* Password Field :  */}
            <TextField
              id="password"
              name="password"
              className={styles.formInput}
              label="סיסמא"
              type={hidePassword ? "password" : "text"}
              variant="standard"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password ? formik.errors.password : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setHidePassword((prev) => !prev)}
                      edge="end"
                    >
                      {hidePassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={styles.footer}>
            <Button variant="contained" type="submit">
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

export default React.memo(LoginModal);
