import { NextPageContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';

type Props = {};

const Profile = (props: Props) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <h1>403</h1>;
  }

  return (
    <div>
      <h1>Server Side Rendering</h1>
      <p>
        This page uses the universal <strong>getSession()</strong> method in{' '}
        <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getSession()</strong> in{' '}
        <strong>getServerSideProps()</strong> is the recommended approach if you
        need to support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require
        client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to
        render.
      </p>
      {JSON.stringify(session, null, 2)}
      <button onClick={() => signOut()}>LogOut</button>
    </div>
  );
};

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default Profile;
