import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { API_URL } from '../../../utils/api-url';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@imap.fi' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return {
            message: 'Please enter your email and password',
          };
        }

        const { password, email } = credentials;
        const modifiedEmail = email.replace('@imap.fi', '');

        const res = await fetch(API_URL('/auth'), {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: modifiedEmail,
            password: password,
          }),
        });

        console.log('res', res);

        const { token, success } = await res.json();

        console.log('token', token);
        console.log('success', success);

        if (!success) return null;

        // get user info

        const userData = await fetch(API_URL('/account?email=' + email), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userData.ok) {
          return null;
        }

        const user = await userData.json();
        console.log(user);

        return {
          token,
          user,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
});
