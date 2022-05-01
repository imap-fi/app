import {
  Avatar,
  createStyles,
  Divider,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  ChevronDown,
  Heart,
  Logout,
  Message,
  PlayerPause,
  Settings,
  Star,
  SwitchHorizontal,
  Trash,
} from 'tabler-icons-react';

type Props = {};

const useStyles = createStyles((theme) => ({
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

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

const UserButton = ({}: Props) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, cx, theme } = useStyles();
  const { data } = useSession();

  if (!data?.user?.mailBox) {
    return <div>not logged in</div>;
  }

  return (
    <Menu
      size={260}
      placement="end"
      transition="pop-top-right"
      className={classes.userMenu}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      control={
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
        >
          <Group spacing={7}>
            <Avatar
              src={`https://avatars.dicebear.com/api/bottts/${data.user.mailBox.username}.svg`}
              alt={data.user.mailBox.name}
              radius="xl"
              size={20}
            />
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {data.user.mailBox.name}
            </Text>
            <ChevronDown size={12} />
          </Group>
        </UnstyledButton>
      }
    >
      <Menu.Item icon={<Heart size={14} color={theme.colors.red[6]} />}>
        Liked posts
      </Menu.Item>
      <Menu.Item icon={<Star size={14} color={theme.colors.yellow[6]} />}>
        Saved posts
      </Menu.Item>
      <Menu.Item icon={<Message size={14} color={theme.colors.blue[6]} />}>
        Your comments
      </Menu.Item>

      <Menu.Label>Settings</Menu.Label>
      <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
      <Menu.Item icon={<SwitchHorizontal size={14} />}>
        Change account
      </Menu.Item>
      <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<PlayerPause size={14} />}>Pause subscription</Menu.Item>
      <Menu.Item color="red" icon={<Trash size={14} />}>
        Delete account
      </Menu.Item>
    </Menu>
  );
};

export default UserButton;
