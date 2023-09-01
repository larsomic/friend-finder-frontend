import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { PopupContext } from '../contexts/PopupContext';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface ShortlistViewerProps {
  isDemoUser: boolean
}

const ShortlistViewer = ({isDemoUser}:ShortlistViewerProps) => {
  const [shortlist, setShortlist] = useState<User[]>([]);
  const popupContext = useContext(PopupContext);
  if (!popupContext) {
    throw new Error("PopupContext is undefined, make sure you're using the PopupProvider");
  }
  const { isPopupOpen, openPopup} = popupContext;

  useEffect(() => {
    const fetchShortlist = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/shortlist', {
          params: {
              isDemo: isDemoUser
          }
      });
        const fetchedShortlist = response.data.shortlist;
        setShortlist(fetchedShortlist);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShortlist();
  }, []);

  function viewMatch (id: string){
    openPopup('user-viewer', id);
  }

  return (
    <Grid container spacing={2}>
      {shortlist.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user._id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="subtitle1">{user.email}</Typography>
              <Button onClick={() => viewMatch(user._id)} variant="contained">View Match</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShortlistViewer;
