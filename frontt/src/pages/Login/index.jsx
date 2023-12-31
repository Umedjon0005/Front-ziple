import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const dispatch =useDispatch();
  const isAuth=useSelector(selectIsAuth)
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    // if(!data.payload) {
    //   return alert('Can not register!');
    // }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Can not register!')
    }
  }
  if(isAuth){
     return  <Navigate to="/"/>
  }
  return (
    <Paper classes={{ root: styles.root }}>
    <Typography classes={{ root: styles.title }} variant="h5">
      Sign In
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        type='email'
        {...register('email', {required: 'email'})}
        fullWidth
      />
      <TextField className={styles.field}
        label="Password"
        error={Boolean(errors.password?.message)}
        {...register('password', {required: 'Password'})}
        fullWidth
        />
          <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
            Sign In
          </Button>
    </form>
  </Paper>
  );
};
