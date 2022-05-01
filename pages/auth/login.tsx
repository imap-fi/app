import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginScreen = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  type FormValues = typeof form.values;

  const handleSubmit = async (values: FormValues) => {
    const res = (await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })) as unknown as {
      error?: unknown;
      ok: boolean;
      status: number;
      url?: string | null;
    };

    if (!res) return;

    if (res.error) {
      showNotification({
        title: `Failure`,
        color: 'red',
        message: String(res.error || 'Unknown error'),
      });
    } else {
      showNotification({
        title: `Success`,
        color: 'green',
        message: `You successfully logged in`,
      });

      router.push('/profile');
    }

    console.log(res);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'>
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="Email"
            placeholder="you@imap.fi"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor<'a'>
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
