import React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton, ImageList, ImageListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import comments from 'service/comments';
import { UserInfo } from 'components/Shared/UserAvatar';
import styles from './AddComment.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { postActions } from '../../../store/slices/post';

export const AddComment = () => {
  const [previewFiles, setPreviewFiles] = React.useState<string[] | null>(null);
  const [files, setFiles] = React.useState<FileList | []>([]);
  const [comment, setComment] = React.useState('');
  const { user } = useAppSelector((state) => state.auth);
  const { currentPost } = useAppSelector((state) => state.posts);

  const dispatch = useAppDispatch();

  const setFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      if (fileList.length > 3) {
        alert('Можно загружать не более 3х файлов');
        return;
      }
      const f = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const fileUrl = URL.createObjectURL(file);
        f.push(fileUrl);
      }
      setFiles(fileList);
      setPreviewFiles(f);
    }
  };

  const submit = () => {
    if (user && currentPost) {
      dispatch(postActions.setLoading(true));
      let formData = new FormData();
      formData.append('comment', comment);
      formData.append('userId', user.id);
      formData.append('postId', currentPost?.id);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('file', file);
      }

      comments.createComment(formData).then(({ data }) => {
        dispatch(postActions.addComment(data));
        dispatch(postActions.setLoading(false));
      });
      setComment('');
      setFiles([]);
      setPreviewFiles(null);
    }
  };

  return (
    <>
      <div className={styles.root}>
        {user && (
          <div className={styles.avatar}>
            <UserInfo avatarUrl={user.avatar?.thumb} fullName={user.fullName} onlyAvatar />
          </div>
        )}
        <div className={styles.form}>
          <TextField
            label="Оставьте свой комментарий"
            variant="outlined"
            maxRows={10}
            minRows={2}
            multiline
            fullWidth
            value={comment}
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
