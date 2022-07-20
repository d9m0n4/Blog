import React, { useEffect, useState } from 'react';

const usePagePercent = () => {
  const [pagePercent, setPagePercent] = useState<number>(0);

  const handleScroll = () => {
    const percent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    setPagePercent(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return pagePercent;
};

export default usePagePercent;
