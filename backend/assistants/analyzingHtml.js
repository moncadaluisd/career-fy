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
        content: `You are an expert analyzing html code to get the information about that html code.

                    You will be given a html code and you will need to extract the information about the html code. The information that you will receive
                      is about job offers.

                    Important:
                    - Do not return the html code, only the information requested.
                    - The description should be a string with the whole description of the job offer nicely formatted explain legibly and with all the details.

                    You will need to extract the following information:
                    - name - String
                    - description - String
                    - location - String | Optional
                    - salary - String | Optional
                    - type - Remote, Hybrid, Onsite | Optional
                    - tags - String[] | Optional
                    - company - String | Optional


                    You will need to return the information in a json format.`,
      },
      {
        role: 'user',
        content: `Here is the html: ${html}`,
      },
    ],
  };
};
