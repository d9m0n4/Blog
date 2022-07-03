import React from 'react';

import { ITagsblock } from '../../types';
import { Chip } from '@mui/material';
import styles from './Tags.module.scss';
import { Link } from 'react-router-dom';

export const TagsBlock: React.FC<ITagsblock> = ({ items, isLoading = true }) => {
  return (
    <div className={styles.tags}>
      {(isLoading ? [...Array(5)] : items).map((name, i) => (
        <Link key={name} className={styles.link} to={`posts/tags/${name}`}>
          <Chip label={`#${name}`} component="a" key={i} clickable />
        </Link>
      ))}
    </div>
  );
};
