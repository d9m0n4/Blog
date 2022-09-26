import useUploadFile from 'hooks/useUploadFile';
import { IPost } from 'models';
import CreatePost from 'pages/CreatePost';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import posts from 'service/posts';

const EditPost = () => {
  const [post, setPost] = React.useState<IPost | null>(null);
  const [error, setError] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { image, imageUrl, handleChangeFile, handleRemoveImage, setImageUrl } = useUploadFile();

  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      posts.getPostById(id).then(({ data }) => {
        setPost(data);
        setImageUrl(data.previewImage.thumb);
      });
    }
  }, [id, setImageUrl]);

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('img', image);
    if (post) {
      for (let [key, value] of Object.entries(post)) {
        formData.append(key, value);
      }
      posts
        .updatePost(formData, post.id)
        .then(({ data }) => {
          setLoading(false);
          navigate(`/posts/${data.id}`);
        })
        .catch((error) => {
          console.log(error);
          setError('qweqwe');
        });
    }
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
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default EditPost;
