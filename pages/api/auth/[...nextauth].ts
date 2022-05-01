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

        const { token, success } = await fetch(API_URL('auth'), {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: modifiedEmail,
            password: password,
          }),
        }).then((res) => res.json());

        if (!success) throw new Error('Invalid Credentials');

        // get user info

        const userData = await fetch(
          API_URL('account?email=' + modifiedEmail),
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userData.ok) throw new Error("Couldn't get user data");

        const user = await userData.json();

        return {
          token,
          user,
        };
      },
    }),
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'database',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
});
