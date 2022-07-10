import React from 'react';

import { ITagsblock } from '../../types';
import { Chip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { fetchPostsByTag, fetchAllPosts } from 'store/actionCreators/post';
import styles from './Tags.module.scss';

export const TagsBlock: React.FC<ITagsblock> = ({ items, isLoading }) => {
  const dispatch = useAppDispatch();

  const fetchPosts = (action: any) => {
    dispatch(action);
  };

  return (
    <div className={styles.tags}>
      <NavLink
        className={({ isActive }) => styles.link + ' ' + (isActive ? styles.activeLink : '')}
        to={`/`}
        onClick={() => fetchPosts(fetchAllPosts())}>
        <Chip label={`Все`} component="span" clickable />
      </NavLink>
      {items.map((name, i) => (
        <NavLink
          key={name}
          className={({ isActive }) => styles.link + ' ' + (isActive ? styles.activeLink : '')}
          to={`/posts/tags/${name}`}
          onClick={() => fetchPosts(fetchPostsByTag(name))}>
          <Chip label={`#${name}`} component="span" key={i} clickable />
        </NavLink>
      ))}
    </div>
  );
};
