export const signOut = async () => {
  const res = await fetch(`${process.env.HEROKU_URL}/api/v1/github/login`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
  });

  return res.ok;
};