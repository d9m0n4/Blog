import React from 'react';
import { Button, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { UserInfo } from 'components/UserInfo';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import styles from './userPage.module.scss';
import { Box } from '@mui/system';
import SortIcon from '@mui/icons-material/Sort';

const UserPage = () => {
  const { id } = useParams();
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Stack>
          <UserInfo onlyAvatar={true} fullName="qwe" width={164} />
          <List>
            <ListItem sx={{ justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ color: 'gray' }} variant="caption">
                  Полное имя
                </Typography>
                <Typography variant="body1">Дмитрий</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: 'gray' }} variant="caption">
                  Никнейм
                </Typography>
                <Typography variant="body1">Дмитрий</Typography>
              </Box>
            </ListItem>

            <ListItem sx={{ justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ color: 'gray' }} variant="caption">
                  Электронная почта
                </Typography>
                <Typography variant="body1">Дмитрий</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: 'gray' }} variant="caption">
                  Город
                </Typography>
                <Typography variant="body1">Дмитрий</Typography>
              </Box>
            </ListItem>

            <ListItem sx={{ justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ color: 'gray' }} variant="caption">
                  Дата регистрации
                </Typography>
                <Typography variant="body1">Дмитрий</Typography>
              </Box>
            </ListItem>
          </List>
        </Stack>
      </Grid>
      <Grid item xs={9}>
        <List className={styles.navList} sx={{ marginBottom: 2 }}>
          <NavLink
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
            }
            end
            to={`/user/${id}/posts`}>
            <Button>Посты</Button>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
            }
            to={`/user/${id}/comments`}>
            <Button>Комментарии</Button>
          </NavLink>
          {/* <Button  variant="text">
            <SortIcon />
          </Button> */}
        </List>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default UserPage;
