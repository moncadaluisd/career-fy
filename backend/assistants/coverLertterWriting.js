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
  isMessage = null,
  model = 'gpt-4o-mini',
) => {
  const namePerson = process.env.NAME || '';
  const job = process.env.JOB || '';
  const country = process.env.COUNTRY || '';
  const additional = process.env.ADDITIONAL || '';

  const prompt = {
    model,
    messages: [
      {
        role: 'system',
        content: `You have to pretend to be me and write a cover letter to job offer. You will be given a job description and a resume data in txt.
                    You will write the coverletter based on the job description and the resume data.

                    About me:
                    My name is ${namePerson} and I am a ${job}. I am from ${country} ${additional}

                    Important:
                    - The coverletter has to be informal and no to long, it has to be 2 or 3 paragraphs max.
                    - Do not include complicated words, use simple words and phrases.
                    - You should be kindy, warm and professional.
                    - You should be excited about the job offer.
                    - - Do not include location, phone number, email or any other information only the important text of the coverletter.

                    You will need to return the coverletter in txt format."`,
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
      }
    ],
  };

  if (isMessage) {
    prompt.messages.push({
      role: 'user',
      content: isMessage,
    });
  }

  return prompt;
};
