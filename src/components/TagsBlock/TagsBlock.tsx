import React from 'react';

import { ITagsblock } from '../../types';
import { Chip } from '@mui/material';
import styles from './Tags.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { fetchPostsByTag } from 'store/actionCreators/post';
import clsx from 'clsx';

export const TagsBlock: React.FC<ITagsblock> = ({ items, isLoading }) => {
  const dispatch = useAppDispatch();
  const fetchPosts = (name: string) => {
    dispatch(fetchPostsByTag(name));
  };

  const activeClassName = 'active';
  return (
    <div className={styles.tags}>
      {(isLoading ? [...Array(5)] : items).map((name, i) => (
        <NavLink
          key={name}
          // className={[({ isActive }) => (isActive ? activeClassName : undefined), 'a']}
          to={`/posts/tags/${name}`}
          onClick={() => fetchPosts(name)}>
          <Chip label={`#${name}`} component="span" key={i} clickable />
        </NavLink>
      ))}
    </div>
  );
};
