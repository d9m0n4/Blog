import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton, ImageList, ImageListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { IComment, IUser } from 'models';
import comments from 'service/comments';
import { UserInfo } from 'components/UserInfo';
import styles from './AddComment.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { postActions } from 'store/slices/post';
import { toDate } from 'utils/toDate';

interface IAddComment {
  user: IUser;
  postId: string;
  currentComments: IComment[];
}

export const AddComment: React.FC<IAddComment> = ({ user, postId, currentComments }) => {
  const [previewFiles, setPreviewFiles] = useState<any>();
  const [files, setFiles] = useState<any>([]);
  const [comment, setComment] = useState('');

  const dispatch = useAppDispatch();

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

  const submit = () => {
    let formData = new FormData();
    formData.append('comment', comment);
    formData.append('userId', user.id);
    formData.append('postId', postId);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append('file', file);
    }

    comments.createComment(formData).then(({ data }) => {
      dispatch(postActions.addComment({ id: data.postId, comment: data }));
    });
    setComment('');
    setFiles([]);
    setPreviewFiles(null);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.avatar}>
          <UserInfo avatarUrl={user.avatar} fullName={user.fullName} onlyAvatar={true} />
        </div>
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
