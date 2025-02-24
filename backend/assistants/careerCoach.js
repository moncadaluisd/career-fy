// assistant for career coach

/**
 * Assistant for career coach
 * @returns {Assistant}
 */

export const careerCoach = (text = '', isBase64 = false, model = 'gpt-4o-mini') => {
  return {
    model,
    messages: [
      {
        role: 'system',
        content: `Your an expert in career coaching, you will help the user to improve their career
         and find a new job, you especially focus in  review curriculum and cover letter and resume
         and you have experience with scanning resumes and cover letters and curriculum and you can give feedback
         and suggestions to the user to improve their resume, cover letter and curriculum and
         you should give a score between 0 and 100 based on the quality of the resume, cover letter and curriculum`,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Here is the resume in ${isBase64 ? 'base64' : 'text'}: ${text}`,
          }
        ],
      },
      {
        role: 'assistant',
        content: `Your response should be in json format with the following keys:
        - feedback: string
        - suggestions: string
        - score: number
        `,
      },
    ],
  };
};
