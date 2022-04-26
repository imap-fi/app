import {
  Button,
  Container,
  createStyles,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BrandGithub, Check } from 'tabler-icons-react';
import Graphic from '../vectors/image.svg';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },

  highlight2: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
    color: theme.colors[theme.primaryColor][0],
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Uusi, <span className={classes.highlight}>moderni</span>{' '}
              sähköpostipalvelu
            </Title>
            <Text color="dimmed" mt="md">
              Tämä on imap.fi. Kyseessä on harrastuksena ylläpidetty sähköposti.
              Jos harrastuspohjainen toiminta huolettaa, voit katsoa palvelimien
              yhtäjaksoisen päälläoloajan. Tarjoamme kaikille käyttäjille 512 Mt
              tallennustilaa. Rekisteröidy ilmaiseksi
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>512Mt ilmaista tilaa</b> – säästä monet sähköpostit ja niiden
                kuvat ilmaiseksi
              </List.Item>
              <List.Item>
                <b>Avoin lähdekoodi</b> – täydellinen, avoimen lähdekoodin
                palvelu
              </List.Item>
              <List.Item>
                <b>IMAP/POP3 protokollat</b> – lisää sähköpostisi valitsemaasi
                palveluun (Gmail, Outlook)
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Rekisteröidy
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
                leftIcon={<BrandGithub />}
                onClick={() => router.push('https://github.com/imap-fi')}
              >
                Lähdekoodi
              </Button>
            </Group>
          </div>
          {/* <Image
            src={image.src}
            className={classes.image}
            alt="cool graphics"
          /> */}
          <Graphic />
        </div>
      </Container>
    </div>
  );
};

export default Home;
