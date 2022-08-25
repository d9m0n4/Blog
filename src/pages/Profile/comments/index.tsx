import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UserInfo } from 'components/Shared/UserAvatar';
import { Link, useOutletContext } from 'react-router-dom';
import { toDate } from 'utils/toDate';
import { CurrentUserData } from 'models';
import Loader from 'components/UI/Loader';

const UserComments = () => {
  const userData = useOutletContext<CurrentUserData>();

  return (
    <>
      {userData ? (
        <Grid container direction="column">
          {userData.comments.map((comment) => (
            <Grid item key={comment.id}>
              <Paper sx={{ marginBottom: 2, padding: '16px' }}>
                <Link to={`/posts/${comment.postId}/#comments`}>
                  <Typography sx={{ color: '#3e5060' }} variant="h5">
                    {comment.post?.title}
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
                  <UserInfo fullName={comment.user.fullName} avatarUrl={comment.user.avatar} />{' '}
                  <Typography variant="caption" sx={{ color: 'gray' }}>
                    {toDate(comment.createdAt, { hour: 'numeric', minute: 'numeric' })}
                  </Typography>
                </Box>
                <Typography sx={{ marginLeft: 6 }}>{comment.text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserComments;
