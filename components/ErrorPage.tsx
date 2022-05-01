import { Container, createStyles, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  vector: {
    width: '50%',
    marginBottom: theme.spacing.md,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

interface Props {
  vector: any;
  title: string;
  description: string;
  button: any;
}

export default function ErrorPage({
  vector,
  title,
  description,
  button,
}: Props) {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Container className={classes.root}>
      <div className={classes.vector}>{vector}</div>
      <Title className={classes.title}>{title}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        {description}
      </Text>
      <Group position="center">{button}</Group>
    </Container>
  );
}
