import React from 'react';

const useUploadFile = () => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [image, setImage] = React.useState<Blob | string>('');

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files;
    if (file) {
      const objectUrl = URL.createObjectURL(file[0]);
      setImageUrl(objectUrl);
      setImage(file[0]);
    } else {
      return;
    }
  };
  const handleRemoveImage = () => {
    setImageUrl('');
    setImage('');
  };
  return { imageUrl, image, handleChangeFile, handleRemoveImage, setImage, setImageUrl };
};

export default useUploadFile;
