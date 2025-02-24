 const parseToJson = (text) => {
  try {

    const cleanText = text.replace(/```json\n|\n```/g, '');

    const json = JSON.parse(cleanText);
    return json;
  } catch (error) {
    console.error('Error parsing to json:', error);
    return null;
  }
};

export { parseToJson };
