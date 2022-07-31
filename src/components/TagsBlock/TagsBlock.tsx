import React, { useEffect, useState } from 'react';

import { ITagsblock } from '../../models';
import { Chip } from '@mui/material';
import { useAppDispatch } from 'hooks/redux';
import { fetchPostsByTag, fetchAllPosts } from 'store/actions/post';
import styles from './Tags.module.scss';
import clsx from 'clsx';
import { MAIN_TAGS_CATEGORY } from '../../constants';

export const TagsBlock: React.FC<ITagsblock> = ({ items, isLoading }) => {
  const dispatch = useAppDispatch();
  const [activeItem, setActiveItem] = useState(`${MAIN_TAGS_CATEGORY}`);

  const fetchPosts = (name: string, action: any) => {
    dispatch(action);
    setActiveItem(name);
  };

  return (
    <div className={styles.tags}>
      <Chip
        label={`${MAIN_TAGS_CATEGORY}`}
        className={clsx(
          styles.link,
          activeItem === `${MAIN_TAGS_CATEGORY}` ? styles.activeLink : '',
        )}
        component="span"
        clickable
        onClick={() => fetchPosts(`${MAIN_TAGS_CATEGORY}`, fetchAllPosts())}
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
