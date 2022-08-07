import React from 'react';
import { Grid, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UserInfo } from 'components/UserInfo';

const Profile = () => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <UserInfo onlyAvatar={true} fullName="Дмитрий" width={164} />
        </Grid>
        <Grid item xs={9}>
          <Stack>
            <Typography variant="h4">Дмитрий</Typography>
            <Box sx={{ display: 'flex' }}>
              <List sx={{ marginRight: 6 }}>
                <ListItem sx={{ padding: 0, marginBottom: 1 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                      Никнейм
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      D9m0n
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem sx={{ padding: 0, marginBottom: 1 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                      Город
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      Яранск
                    </Typography>
                  </Box>
                </ListItem>
              </List>
              <List sx={{ marginRight: 6 }}>
                <ListItem sx={{ padding: 0, marginBottom: 1 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                      Электронная почта
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      ched08@yandex.ru
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem sx={{ padding: 0, marginBottom: 1 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                      Дата регистрации
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      13.07.2022
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
