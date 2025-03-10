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
      that is tailored to the job description and the resume provided. ${short}. The coverletter has to be informal and not too long but also in the text write the match skills with the job description.
      example: "I came across your website when I saw the job offer, and I really liked its UI/UX. I also find the company very interesting, and I’m excited about the opportunity to work with you.
      I am a great candidate for {company name} because I have experience working with the different technologies the company uses, such as React and Angular. I am passionate about building products that people love."`,
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
        - coverletter: string - the coverletter ${isShort ? 'if is short should be a short coverletter without greetings and without a goodbye or signature or time only the important text' : 'full coverletter'}`,
      },
    ],
  };
};
