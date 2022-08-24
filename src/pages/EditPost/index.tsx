import useUploadFile from 'hooks/useUploadFile';
import { IPost } from 'models';
import { CreatePost } from 'pages/CreatePost';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import posts from 'service/posts';

const EditPost = () => {
  const [post, setPost] = React.useState<any>();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { image, imageUrl, handleChangeFile, handleRemoveImage, setImageUrl } = useUploadFile();

  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      posts.getPostById(id).then(({ data }) => {
        setPost(data);
        setImageUrl(data.previewImage);
      });
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    window.addEventListener('unload', handleTabClosing);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
      window.removeEventListener('unload', handleTabClosing);
    };
  });

  const handleTabClosing = () => {
    console.log(123);
  };

  const alertUser = (event: any) => {
    event.preventDefault();
    event.returnValue = '';
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('img', image);
    for (const i in post) {
      formData.append(i, post[i]);
    }
    posts.updatePost(formData, post.id).then(({ data }) => {
      navigate(`/posts/${data.id}`);
    });
  };

  const setTagNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev: any) => ({ ...prev, tags: e.target.value }));
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev: any) => ({ ...prev, title: e.target.value }));
  };

  const onChangeText = (e: string) => {
    setPost((prev: any) => ({ ...prev, text: e }));
  };

  return (
    <div>
      {post && (
        <CreatePost
          title={post?.title}
          text={post?.text}
          tags={post?.tags}
          imageUrl={imageUrl}
          onSubmit={onSubmit}
          inputRef={inputRef}
          handleChangeFile={handleChangeFile}
          handleRemoveImage={handleRemoveImage}
          onChangeEditor={onChangeText}
          setTagNames={setTagNames}
          setTitle={onChangeTitle}
          openDialog={open}
        />
      )}
    </div>
  );
};

export default EditPost;