import { Divider, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UserInfo } from 'components/UserInfo';
import { IComment } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import comments from 'service/comments';
import { toDate } from 'utils/toDate';

const UserComments = () => {
  const { id } = useParams();
  const [commentsData, setCommentsData] = useState<IComment[]>([]);
  useEffect(() => {
    if (id) {
      comments.getUserComments(id).then(({ data }) => setCommentsData(data));
    }
  }, []);
  return (
    <Grid container direction="column">
      {commentsData.map((comment) => (
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
