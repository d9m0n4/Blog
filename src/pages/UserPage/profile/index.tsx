import React from 'react';
import { Grid, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UserInfo } from 'components/UserInfo';
import { CurrentUserData, IUser, IUserContext } from 'models';
import { useOutletContext } from 'react-router-dom';

const Profile = () => {
  const userData = useOutletContext<CurrentUserData>();

  return (
    <>
      {userData && (
        <Paper sx={{ padding: 2 }}>
          <Grid container direction="column">
            <Grid item justifyContent="center" display="flex">
              <UserInfo
                onlyAvatar={true}
                fullName={userData.fullName}
                avatarUrl={userData.avatar}
                width={164}
              />
            </Grid>
            <Grid item justifyContent="center" display="flex">
              <Stack sx={{ marginTop: 2 }}>
                <Typography sx={{ textAlign: 'center' }} variant="h4">
                  {userData.fullName}
                </Typography>
                <Box textAlign="center" marginTop={2}>
                  <Typography variant="subtitle1" sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                    Дата регистрации
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {userData.createdAt}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <List
                    sx={{
                      padding: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                    <ListItem>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                          Никнейм
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {userData.nickName}
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                          Электронная почта
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {userData.email}
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                          Город
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {userData.city}
                        </Typography>
                      </Box>
                    </ListItem>
                  </List>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default Profile;
