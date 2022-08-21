import { useAppSelector } from 'hooks/redux';
import useUploadFile from 'hooks/useUploadFile';
import { CreatePost } from 'pages/CreatePost';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import posts from 'service/posts';

const AddPost = () => {
  const autosavedValue = localStorage.getItem(`smde_1`) || '';

  const navigate = useNavigate();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [text, settext] = React.useState(autosavedValue || '');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');

  const { user } = useAppSelector((state) => state.auth);

  const { image, imageUrl, handleChangeFile, handleRemoveImage } = useUploadFile();

  const setTagNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const onChangeText = (e: string) => {
    settext(e);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onSubmit = () => {
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

  return (
    <CreatePost
      title={title}
      text={text}
      tags={tags}
      imageUrl={imageUrl}
      inputRef={inputRef}
      onSubmit={onSubmit}
      handleChangeFile={handleChangeFile}
      handleRemoveImage={handleRemoveImage}
      onChangeEditor={onChangeText}
      setTagNames={setTagNames}
      setTitle={onChangeTitle}
    />
  );
};

export default AddPost;
