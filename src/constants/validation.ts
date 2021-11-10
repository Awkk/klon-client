export const authLimit = {
  username: { minLength: 3, maxLength: 20 },
  password: { minLength: 6, maxLength: 128 },
};
export const createPostLimit = {
  title: { maxLength: 300 },
  text: { maxLength: 15000 },
};
export const commentLimit = {
  text: { maxLength: 15000 },
};
