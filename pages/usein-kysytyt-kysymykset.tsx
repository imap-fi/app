import {
  Accordion,
  Col,
  Container,
  createStyles,
  Grid,
  Title,
} from '@mantine/core';
import QuestionsVector from '../vectors/questions.svg';

type Props = {};

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  vector: {
    maxWidth: '80%',
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },
}));

const placeholder = 'moi';

const UKK = (props: Props) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6} className={classes.vector}>
            <QuestionsVector />
          </Col>
          <Col span={12} md={6}>
            <Title order={2} align="left" className={classes.title}>
              Usein Kysytyt Kysymykset
            </Title>

            <Accordion iconPosition="right" initialItem={0}>
              <Accordion.Item
                label="Kuinka luen sähköpostini?"
                className={classes.item}
              >
                {placeholder}
              </Accordion.Item>
              <Accordion.Item
                label="Kuinka käytän omaa sähköposti ohjelmaa?"
                className={classes.item}
              >
                {placeholder}
              </Accordion.Item>
              <Accordion.Item
                label="Voinko tehdä useamman käyttäjän?"
                className={classes.item}
              >
                {placeholder}
              </Accordion.Item>
              <Accordion.Item
                label="Voiko harrastepalveluun luottaa?"
                className={classes.item}
              >
                {placeholder}
              </Accordion.Item>
              <Accordion.Item
                label="Onko tämä turvallinen?"
                className={classes.item}
              >
                {placeholder}
              </Accordion.Item>
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
};

export default UKK;
