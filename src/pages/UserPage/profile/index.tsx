import React from 'react';
import { Grid, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UserInfo } from 'components/UserInfo';
import { IUserContext } from 'models';
import { useOutletContext } from 'react-router-dom';

const Profile = () => {
  const { user } = useOutletContext<IUserContext>();

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container direction="column">
        <Grid item justifyContent="center" display="flex">
          <UserInfo
            onlyAvatar={true}
            fullName={user.fullName}
            avatarUrl={user.avatar}
            width={164}
          />
        </Grid>
        <Grid item justifyContent="center" display="flex">
          <Stack sx={{ marginTop: 2 }}>
            <Typography sx={{ textAlign: 'center' }} variant="h4">
              {user.fullName}
            </Typography>
            <Box textAlign="center" marginTop={2}>
              <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                Дата регистрации
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {user.createdAt}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <List sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
                <ListItem>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                      Никнейм
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {user.nickName}
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                      Электронная почта
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {user.email}
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                      Город
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {user.city}
                    </Typography>
                  </Box>
                </ListItem>
              </List>
              {/* <List sx={{ padding: 2 }}>
                <ListItem sx={{ padding: 0, marginBottom: 1 }}>
                  
                </ListItem>
              </List> */}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
