import React from 'react';

import { NavLink } from 'react-router-dom';

import { Box, List, ListItem, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { SideBlock } from 'components/Shared/SideBlock';
import { useAppSelector } from 'hooks/redux';

import styles from './popularPosts.module.scss';
import posts from 'service/posts';

const PopularPosts = () => {
  const { items } = useAppSelector((state) => state.posts);

  React.useEffect(() => {
    posts.getPopularPosts();
  }, []);

  return (
    <SideBlock title="Популярные статьи">
      <List>
        {items &&
          items.map((post) => (
            <ListItem color="CaptionText" key={post.id} sx={{ paddingLeft: 3, display: 'block' }}>
              <NavLink className={styles.postLink} to={`/posts/${post.id}`}>
                <Typography variant="body1">{post.title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
                  <Typography
                    className={styles.postDetail}
                    variant="caption"
                    sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
                    <CommentIcon fontSize="small" />
                    <Typography sx={{ marginLeft: '4px', color: '#fe9870' }} variant="caption">
                      {post.comments.length}
                    </Typography>
                  </Typography>
                </Box>
              </NavLink>
            </ListItem>
          ))}
      </List>
    </SideBlock>
  );
};

export default PopularPosts;
