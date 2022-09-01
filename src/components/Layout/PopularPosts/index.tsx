import { List, ListItem, ListItemText } from '@mui/material';
import { SideBlock } from 'components/Shared/SideBlock';
import React from 'react';
import { NavLink } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppSelector } from 'hooks/redux';

const PopularPosts = () => {
  const { items } = useAppSelector((state) => state.posts);
  return (
    <SideBlock title="Обсуждаемые статьи">
      <List>
        {items.map((post) => (
          <ListItem key={post.id}>
            <ListItemText
              primary={<NavLink to={'/'}>{post.title}</NavLink>}
              secondary={
                <List sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ListItem sx={{ justifyContent: 'flex-end', padding: 0, flex: 0, marginLeft: 1 }}>
                    <FavoriteBorderIcon fontSize="small" />
                    <span>{post.likes}</span>
                  </ListItem>
                  <ListItem sx={{ justifyContent: 'flex-end', padding: 0, flex: 0, marginLeft: 1 }}>
                    <CommentIcon fontSize="small" />
                    <span>{post.viewsCount}</span>
                  </ListItem>
                </List>
              }
            />
          </ListItem>
        ))}
      </List>
    </SideBlock>
  );
};

export default PopularPosts;
