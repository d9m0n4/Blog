import React, { useMemo, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import EasyMDE from 'easymde';
import posts from 'service/posts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import useUploadFile from 'hooks/useUploadFile';

export const AddPost = () => {
  const autosavedValue = localStorage.getItem(`smde_1`) || '';

  const navigate = useNavigate();
  const [text, settext] = useState(autosavedValue);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const { user } = useAppSelector((state) => state.auth);

  const inputRef = useRef<HTMLInputElement>(null);

  const { image, imageUrl, handleChangeFile, handleRemoveImage } = useUploadFile();

  const submit = () => {
    let formData = new FormData();
    formData.append('img', image);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('tags', tags);
    formData.append('userId', user?.id!);

    posts.createPost(formData).then(({ data }) => {
      navigate(`/posts/${data.id}`);
    });
  };

  const setTagNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const onChange = (e: string) => {
    settext(e);
  };

  const uploadImage = async (image: any, onSuccess: any, onError: any) => {
    try {
      const objectURL = URL.createObjectURL(image);
      onSuccess(objectURL);
    } catch (error) {
      return onError(error);
    }
  };

  const options = useMemo(
    () =>
      ({
        spellChecker: false,
        showIcons: ['strikethrough', 'table', 'code', 'upload-image'],
        shortcuts: { toggleFullScreen: null, toggleSideBySide: null },
        hideIcons: ['quote', 'side-by-side', 'fullscreen'],
        previewImagesInEditor: true,
        uploadImage: true,
        autofocus: true,
        imageUploadFunction: uploadImage,
        maxHeight: '400px',
        placeholder: '?????????????? ??????????...',
        status: false,
        autosave: {
          enabled: true,
          delay: 1000,
          uniqueId: 1,
        },
      } as unknown as EasyMDE.Options),
    [],
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputRef.current?.click()}
        variant="outlined"
        size="medium"
        sx={{ borderRadius: '16px', marginLeft: '8px', marginRight: '8px' }}>
        ?????????????????? ????????????
      </Button>
      <input
        ref={inputRef}
        type="file"
        onChange={handleChangeFile}
        hidden
        accept=".jpg, .png, .jpeg"
      />
      {imageUrl && (
        <Button
          variant="contained"
          color="error"
          onClick={handleRemoveImage}
          size="medium"
          sx={{ borderRadius: '16px', marginLeft: '8px', marginRight: '8px' }}>
          ??????????????
        </Button>
      )}
      <div className={styles.previewImage}>
        {imageUrl && <img className={styles.image} src={`${imageUrl}`} alt="Uploaded" />}
      </div>

      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="?????????????????? ????????????..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="????????"
        value={tags}
        onChange={setTagNames}
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={submit} size="medium" sx={{ borderRadius: '16px' }} variant="contained">
          ????????????????????????
        </Button>
        <a href="/">
          <Button size="medium" sx={{ borderRadius: '16px' }}>
            ????????????
          </Button>
        </a>
      </div>
    </Paper>
  );
};
