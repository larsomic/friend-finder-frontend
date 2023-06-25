import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

interface User {
    _id: string;
    name: string;
    email: string;
  }

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/matches');
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user._id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="subtitle1">{user.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UsersList;
