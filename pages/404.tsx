import NotFoundVector from '../vectors/not-found.svg';

import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import ErrorPage from '../components/ErrorPage';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <ErrorPage
      title="You have found a secret place."
      description="Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL."
      button={
        <Button variant="subtle" size="md" onClick={() => router.back()}>
          Go Back
        </Button>
      }
      vector={<NotFoundVector />}
    />
  );
}
