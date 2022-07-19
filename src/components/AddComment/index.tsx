import React, { useEffect, useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { IconButton, ImageList, ImageListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { IUser } from 'models';
import comments from 'service/comments';

interface IAddComment {
  user: IUser;
  postId: string;
}

export const AddComment: React.FC<IAddComment> = ({ user, postId }) => {
  const [previewFiles, setPreviewFiles] = useState<any>();
  const [files, setFiles] = useState<any>([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    console.log(files);
  }, [files]);

  const setFileHandler = (e: any) => {
    const fileList = e.currentTarget.files;
    if (fileList.length > 3) {
      alert('you may upload up maximum of free files');
      return;
    }
    const f = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const fileUrl = URL.createObjectURL(file);
      f.push(fileUrl);
    }
    setFiles([...fileList]);
    setPreviewFiles(f);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const submit = () => {
    let formData = new FormData();
    formData.append('comment', comment);
    formData.append('userId', user.id);
    formData.append('postId', postId);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append('file', file);
    }
    comments.createComment(formData);
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={user.avatar} />
        <div className={styles.form}>
          <TextField
            label="Оставьте свой комментарий"
            variant="outlined"
            maxRows={10}
            minRows={2}
            multiline
            fullWidth
            onChange={(e) => setComment(e.target.value)}
          />
          <div className={styles.formFooter}>
            <div className={styles.addFile}>
              <label htmlFor="icon-button-file">
                <input
                  id="icon-button-file"
                  type="file"
                  hidden
                  multiple
                  accept=".png, .jpg, .jpeg"
                  max={3}
                  onChange={setFileHandler}
                />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <AddIcon />
                </IconButton>
              </label>
            </div>
            <Button
              disabled={!comment}
              variant="contained"
              sx={{ borderRadius: '16px' }}
              onClick={submit}>
              Отправить
            </Button>
          </div>
          <div className={styles.filesPreview}>
            {previewFiles && (
              <ImageList cols={3} rowHeight={80}>
                {previewFiles.map((item: string) => (
                  <ImageListItem key={item} sx={{ width: '80px' }}>
                    <img
                      src={`${item}`}
                      srcSet={`${item}`}
                      alt={item}
                      className={styles.image}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
