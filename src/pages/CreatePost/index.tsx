import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import 'easymde/dist/easymde.min.css';

import styles from './AddPost.module.scss';
import posts from 'service/posts';

import ReactDOMServer from 'react-dom/server';
import SimpleMdeReact from 'react-simplemde-editor';

import { Comp } from 'components/ReactMarkDown';
import AlertDialog from 'components/Dialog';

interface ICreatePost {
  title: string;
  text: string;
  tags: string;
  imageUrl: string;
  inputRef: React.RefObject<HTMLInputElement>;
  handleRemoveImage: () => void;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEditor: (e: string) => void;
  onSubmit: () => void;
  setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTagNames: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openDialog?: boolean;
}

export const CreatePost: React.FC<ICreatePost> = ({
  title,
  text,
  tags,
  imageUrl,
  handleRemoveImage,
  handleChangeFile,
  onChangeEditor,
  onSubmit,
  inputRef,
  setTitle,
  setTagNames,
  openDialog,
}) => {
  const uploadImage = async (image: any, onSuccess: any, onError: any) => {
    try {
      const formData = new FormData();
      formData.append('img', image);
      const { data } = await posts.uploadImage(formData);
      onSuccess(data.url);
    } catch (error) {
      return onError(error);
    }
  };

  const options = React.useMemo(
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
    <>
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
          onChange={setTitle}
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
          onChange={onChangeEditor}
          options={options}
        />
        <div className={styles.buttons}>
          <Button
            onClick={onSubmit}
            size="medium"
            sx={{ borderRadius: '16px' }}
            variant="contained">
            Опубликовать
          </Button>
          <a href="/">
            <Button size="medium" sx={{ borderRadius: '16px' }}>
              Отмена
            </Button>
          </a>
        </div>
      </Paper>
    </>
  );
};
