import React from 'react';

const useUploadFile = () => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [image, setImage] = React.useState<any>();

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files;
    if (file) {
      const objectUrl = URL.createObjectURL(file[0]);
      setImageUrl(objectUrl);
      setImage(file[0]);
    }
  };
  return { imageUrl, image, handleChangeFile };
};

export default useUploadFile;
