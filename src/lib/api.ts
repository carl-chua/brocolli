import { fetcher } from './fetcher';

export const requestInvite = async (name: string, email: string) => {
  return fetcher({
    endpoint: '/fake-auth',
    method: 'POST',
    body: { name: name.trim(), email: email.trim() },
  });
};
