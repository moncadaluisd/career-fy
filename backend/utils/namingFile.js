export const generateNameFile = (file) => {
  const name = file.originalname.split('.')[0].replace(/\s+/g, '');
  const extension = file.originalname.split('.').pop();
  const customName = `${name}-${Date.now()}.${extension}`;
  return customName;
};
