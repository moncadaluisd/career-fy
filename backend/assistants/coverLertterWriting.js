/**
 * Write a coverletter
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.description
 * @param {string} data.tags
 * @param {string} data.resume
 * @param {string} model
 * @returns {Assistant}
 */
export const coverLertterWriting = (
  { name, description, tags, resume },
  isShort = false,
  model = 'gpt-4o-mini',
) => {
  const short = isShort ? 'the text should be not to long' : '';
  return {
    model,
    messages: [
      {
        role: 'system',
        content: `You are a expert in writing cover letters, you are especialized in writing cover letters for developers in the world tech, you will
      read the job description, name and tags and also you will read the resume provided. with that information you will write a coverletter
      that is tailored to the job description and the resume provided. ${short}`,
      },
      {
        role: 'user',
        content: `Here is the job:
        name: ${name}
        description: ${description}
        tags: ${tags}`,
      },
      {
        role: 'user',
        content: `Here is the resume: ${resume}`,
      },
      {
        role: 'assistant',
        content: `Your response should be a json, only return the json nothing else, with the following keys:
        - coverletter: string - the coverletter
        `,
      },
    ],
  };
};
