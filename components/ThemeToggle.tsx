import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { MoonStars, Sun } from 'tabler-icons-react';

const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 90 }}
      whileTap={{
        scale: 0.8,
        rotate: -90,
        borderRadius: '100%',
      }}
    >
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    </motion.div>
  );
};

export default ColorSchemeToggle;
