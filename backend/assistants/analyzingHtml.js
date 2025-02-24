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
        - name: string - title of the job description
        - description: string - description of the job description
        - tags: string[] - tags of the job description
        - location: string | null - location of the job description
        - typeWork: string | null - remote or hybrid or in person
        - salary: string | null - salary of the job description
        - company: string | null - company of the job description
        - url: string - url of the job description
        `,
      },
    ],
  };
};
