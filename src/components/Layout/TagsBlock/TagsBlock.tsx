import React, { useState } from 'react';

import { ITagsblock } from '../../../models';
import { Button, Chip } from '@mui/material';
import { useAppDispatch } from 'hooks/redux';
import { fetchPostsByTag, fetchAllPosts } from 'store/actions/post';
import styles from './Tags.module.scss';
import clsx from 'clsx';
import { DEFAULT_PAGE, MAIN_TAGS_CATEGORY, PAGE_LIMIT } from '../../../constants';
import AddIcon from '@mui/icons-material/Add';
import { postActions } from 'store/slices/post';

export const TagsBlock: React.FC<ITagsblock> = ({ items, isLoading }) => {
  const [tagsIsOpened, setTagsIsOpened] = React.useState(false);

  const dispatch = useAppDispatch();
  const [activeItem, setActiveItem] = useState(`${MAIN_TAGS_CATEGORY}`);

  const fetchPosts = (name: string, action: any) => {
    dispatch(action);
    setActiveItem(name);
    dispatch(postActions.setCurrentPage(DEFAULT_PAGE));
  };

  return (
    <div className={clsx(styles.tagsWrapper, { [styles.opened]: tagsIsOpened })}>
      <div className={styles.tags}>
        <Chip
          label={`${MAIN_TAGS_CATEGORY}`}
          className={clsx(
            styles.link,
            activeItem === `${MAIN_TAGS_CATEGORY}` ? styles.activeLink : '',
          )}
          component="span"
          clickable
          onClick={() =>
            fetchPosts(
              `${MAIN_TAGS_CATEGORY}`,
              fetchAllPosts({ page: DEFAULT_PAGE, limit: PAGE_LIMIT }),
            )
          }
        />

        {items.map((name, i) => (
          <Chip
            label={`#${name}`}
            className={clsx(styles.link, activeItem === name ? styles.activeLink : '')}
            component="span"
            key={i + name}
            clickable
            onClick={() => fetchPosts(name, fetchPostsByTag(name))}
          />
        ))}
      </div>
      <div className={styles.showTags}>
        <Button
          variant="text"
          sx={{ minWidth: 'auto', borderRadius: 4 }}
          onClick={() => setTagsIsOpened(!tagsIsOpened)}>
          <AddIcon classes={{ root: styles.IconRoot }} />
        </Button>
      </div>
    </div>
  );
};
