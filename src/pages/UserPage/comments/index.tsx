import React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UserInfo } from 'components/UserInfo';
import { Link, useOutletContext } from 'react-router-dom';
import { toDate } from 'utils/toDate';
import { CurrentUserData } from 'models';

const UserComments = () => {
  const userData = useOutletContext<CurrentUserData>();

  return (
    <Grid container direction="column">
      {userData.comments.map((comment) => (
        <Grid item key={comment.id}>
          <Paper sx={{ marginBottom: 2, padding: '16px' }}>
            <Link to={`/posts/${comment.postId}`}>
              <Typography sx={{ color: '#3e5060' }} variant="h5">
                {comment.post.title}
              </Typography>
            </Link>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 2,
                marginBottom: 2,
              }}>
              <UserInfo onlyAvatar={false} fullName={comment.user.fullName} /> <Divider light />
              <span>{toDate(comment.createdAt)}</span>
            </Box>
            <Typography>{comment.text}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserComments;
