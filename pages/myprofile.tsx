import React, { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from 'next';
import cookie from 'cookie';

import axios from 'axios';
import { TextField, Button, Grid, Box, Alert, AlertColor } from '@mui/material';
import CenteredContainer from '../components/CenteredContainer';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../redux/store_type';

import UserProfileForm from '../components/UserProfileForm';

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

const MyProfile: NextPage = (props) => {
  const user = useSelector((state: StoreType) => state.user);
  const { name, email } = user;

  return (
    <CenteredContainer maxWidth="sm">
      <UserProfileForm currentName={name} currentEmail={email}/>
    </CenteredContainer>
  );
};

export default MyProfile;