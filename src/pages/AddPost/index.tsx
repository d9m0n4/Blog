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

export const AddPost = () => {
  const navigate = useNavigate();
  const [text, settext] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState<any>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files;
    if (file) {
      const objectUrl = URL.createObjectURL(file[0]);
      setImageUrl(objectUrl);
      setImage(file[0]);
    }
  };

  const submit = () => {
    let formData = new FormData();
    formData.append('img', image);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('tags', tags);
    formData.append('userId', '3f4cd372-0f14-42d2-9d6e-2c69593bb85c');

    posts.createPost(formData).then(({ data }) => {
      navigate(`/posts/${data.id}`);
    });
  };

  const setTagNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((e: string) => {
    settext(e);
  }, []);

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
        previewImagesInEditor: true,
        uploadImage: true,
        imageUploadFunction: uploadImage,
        maxHeight: '400px',
        autofocus: true,
        placeholder: 'Введите текст...',
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
        Загрузить превью
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button
          variant="contained"
          color="error"
          onClick={onClickRemoveImage}
          size="medium"
          sx={{ borderRadius: '16px', marginLeft: '8px', marginRight: '8px' }}>
          Удалить
        </Button>
      )}
      <div className={styles.previewImage}>
        {imageUrl && <img className={styles.image} src={`${imageUrl}`} alt="Uploaded" />}
      </div>

      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={setTagNames}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={{ ...options }}
      />
      <div className={styles.buttons}>
        <Button onClick={submit} size="medium" sx={{ borderRadius: '16px' }} variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="medium" sx={{ borderRadius: '16px' }}>
            Отмена
          </Button>
        </a>
      </div>
    </Paper>
  );
};
