import React, { useMemo, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import 'easymde/dist/easymde.min.css';

import styles from './AddPost.module.scss';
import posts from 'service/posts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import useUploadFile from 'hooks/useUploadFile';
import ReactDOMServer from 'react-dom/server';
import SimpleMdeReact from 'react-simplemde-editor';

import { Comp } from 'components/ReactMarkDown';

export const AddPost = () => {
  const autosavedValue = localStorage.getItem(`smde_1`) || '';

  const navigate = useNavigate();
  const [text, settext] = useState(autosavedValue);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const { user } = useAppSelector((state) => state.auth);

  const [imgs, setImg] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const { image, imageUrl, handleChangeFile, handleRemoveImage } = useUploadFile();

  const submit = () => {
    let formData = new FormData();
    formData.append('img', image);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('tags', tags);
    formData.append('userId', user?.id!);
    for (let img = 0; img < imgs.length; img++) {
      const element = imgs[img];
      formData.append('textimg', element);
    }

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
      const formData = new FormData();
      formData.append('img', image);
      const { data } = await posts.uploadImage(formData);
      onSuccess(data.url);
      setImg((prev) => [...prev, image]);
    } catch (error) {
      return onError(error);
    }
  };

  const options = useMemo(
    () =>
      ({
        previewRender(text: any) {
          return ReactDOMServer.renderToString(<Comp text={text} />);
        },
        spellChecker: false,
        showIcons: ['strikethrough', 'table', 'code', 'upload-image'],
        shortcuts: { toggleFullScreen: null, toggleSideBySide: null },
        hideIcons: ['quote'],
        uploadImage: true,
        autofocus: true,
        imageUploadFunction: uploadImage,
        maxHeight: '400px',
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

      <SimpleMdeReact
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
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
