import { Burger, Container, createStyles, Group, Tabs } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tab } from '../utils/types';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import UserButton from './UserButton';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  userMenu: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tabControl: {
    fontWeight: 500,
    height: 38,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },

  tabControlActive: {
    borderColor: `${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    } !important`,
  },
}));

interface HeaderProps {
  tabs: Tab[];
}

export function Header({ tabs }: HeaderProps) {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const items = tabs.map((tab) => (
    <Tabs.Tab
      label={tab.name}
      key={tab.link}
      tabKey={tab.link}
      icon={tab.icon}
    />
  ));

  useEffect(() => {
    // get the active tab, if site was refreshed
    const tab = tabs.find((t) => t.link === router.asPath);
    if (!tab) return;

    setActiveTab(tabs.indexOf(tab));
  }, []);

  const handleTabChange = (active: number, tabKey: string) => {
    setActiveTab(active);
    router.push(tabKey);
  };

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Logo />

          <Group>
            <Burger
              opened={opened}
              onClick={() => toggleOpened()}
              className={classes.burger}
              size="sm"
            />

            <UserButton
              user={{
                name: 'Midka',
                image: 'https://avatars.dicebear.com/api/bottts/Midka.svg',
              }}
            />

            <ThemeToggle />
          </Group>
        </Group>
      </Container>
      <Container>
        <Tabs
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsListWrapper: classes.tabsList,
            tabControl: classes.tabControl,
            tabActive: classes.tabControlActive,
          }}
          position="center"
          active={activeTab}
          onTabChange={handleTabChange}
        >
          {items}
        </Tabs>
      </Container>
    </div>
  );
}
