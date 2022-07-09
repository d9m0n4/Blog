import React from 'react';

import { ITagsblock } from '../../types';
import { Chip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { fetchPostsByTag } from 'store/actionCreators/post';
import styles from './Tags.module.scss';

export const TagsBlock: React.FC<ITagsblock> = ({ items, isLoading }) => {
  const dispatch = useAppDispatch();

  const fetchPosts = (name: string) => {
    dispatch(fetchPostsByTag(name));
  };

  return (
    <div className={styles.tags}>
      {items.map((name, i) => (
        <NavLink
          key={name}
          className={({ isActive }) => styles.link + ' ' + (isActive ? styles.activeLink : '')}
          to={`/posts/tags/${name}`}
          onClick={() => fetchPosts(name)}>
          <Chip label={`#${name}`} component="span" key={i} clickable />
        </NavLink>
      ))}
    </div>
  );
};
