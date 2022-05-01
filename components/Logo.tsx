import { Title } from '@mantine/core';
import { useRouter } from 'next/router';

type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();
  return (
    <Title
      order={3}
      onClick={() => router.push('/')}
      sx={() => ({
        cursor: 'pointer',
      })}
    >
      imap.fi
    </Title>
  );
};

export default Logo;
