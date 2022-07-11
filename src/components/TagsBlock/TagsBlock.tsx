import React, { useEffect, useState } from 'react';

import { ITagsblock } from '../../types';
import { Chip } from '@mui/material';
import { useAppDispatch } from 'hooks/redux';
import { fetchPostsByTag, fetchAllPosts } from 'store/actionCreators/post';
import styles from './Tags.module.scss';
import clsx from 'clsx';

export const TagsBlock: React.FC<ITagsblock> = ({ items, isLoading }) => {
  const dispatch = useAppDispatch();
  const [activeItem, setActiveItem] = useState('Все');

  const fetchPosts = (name: string, action: any) => {
    dispatch(action);
    setActiveItem(name);
  };

  useEffect(() => {
    console.log(activeItem);
  }, [activeItem]);

  return (
    <div className={styles.tags}>
      <Chip
        label={`Все`}
        className={clsx(styles.link, activeItem === 'Все' ? styles.activeLink : '')}
        component="span"
        clickable
        onClick={() => fetchPosts('Все', fetchAllPosts())}
      />

      {items.map((name, i) => (
        <Chip
          label={`#${name}`}
          className={clsx(styles.link, activeItem === name ? styles.activeLink : '')}
          component="span"
          key={i}
          clickable
          onClick={() => fetchPosts(name, fetchPostsByTag(name))}
        />
      ))}
    </div>
  );
};
