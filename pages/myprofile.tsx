import React, { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from 'next';
import cookie from 'cookie';

import axios from 'axios';
import { TextField, Button, Grid, Box, Alert, AlertColor } from '@mui/material';
import CenteredContainer from '../components/CenteredContainer';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../redux/store_type';
import { useRouter } from 'next/router';

import UserAccountForm from '../components/forms/UserAccountForm';

axios.defaults.withCredentials = true;

import config from '../config';
require('dotenv').config();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const authCookie = cookies.token;

  if (!authCookie) {
    context.res.setHeader('location', '/login');
    context.res.statusCode = 302;
    context.res.end();
    return { props: {} };
  }

  return { props: { /* your props here */ } };
};

const MyAccount: NextPage = (props) => {
  const user = useSelector((state: StoreType) => state.user);
  const { name = '', email='' } = user;
  const currentName = name === null ? '' : name;
  const currentEmail = email === null ? '' : email;
  const router = useRouter();
  const onSubmit = () => {
    router.push('/');
  };

  return (
    <CenteredContainer maxWidth="sm">
      <UserAccountForm currentName={currentName} currentEmail={currentEmail} onSubmit={onSubmit}/>
    </CenteredContainer>
  );
};

export default MyAccount;