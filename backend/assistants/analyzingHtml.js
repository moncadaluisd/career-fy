/**
 * This function is used to analyze the html of the job offer
 * @param {string} html
 * @returns {Assistant}
 */
export const analyzingHtml = (html = '', model = 'gpt-4o-mini') => {
  return {
    model,
    messages: [
      {
        role: 'system',
        content: `You are a expert in analyzing html, you will analyze the html
        and extract the title, description and tags of the job offer`,
      },
      {
        role: 'user',
        content: `Here is the html: ${html}`,
      },
      {
        role: 'assistant',
        content: `Your response should be a json, only return the json nothing else, with the following keys:
        - name, description, tags String[], location, typework, salary, company, url`,
      },
    ],
  };
};
