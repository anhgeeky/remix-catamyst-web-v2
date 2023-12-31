import NextHead from 'next/head'
import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  HStack,
  Link,
  ListItem,
  ButtonGroup,
  OrderedList,
  Stack,
  Text,
} from '@chakra-ui/react'

import { Content, Card, Icon, LinkButton } from '@/components'
import {
  SettingsHero,
  GumroadButton,
  SuperPlanRequestForm,
} from '@/components/settings'

export function SettingsSuper({ state }) {
  return (
    <>
      <NextHead>
        <title>Super Plan Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Super Plan Settings
        </Heading>
        <HStack>
          <Text>Request, upgrade, or configure Super plan.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%" maxW={760}>
          {state.profile.plan === 'Super' && (
            <Card as={Stack}>
              <Heading as="h3" size="md">
                Manage your Super plan
              </Heading>
              <Text>
                If you need help, chat directly with us. If you want to cancel
                before the mentorship sessions are scheduled, we'll refund your
                money (partially deducted from the processing fee). But if the
                mentorship is already scheduled or ongoing, there is no refund.
              </Text>
              <ButtonGroup size="sm">
                <LinkButton
                  href="/super"
                  colorScheme="green"
                  leftIcon={<Icon name="learn" />}
                >
                  Read Catamyst Super guide
                </LinkButton>
              </ButtonGroup>
            </Card>
          )}

          {state.profile.plan === 'Super' && (
            <Card as={Stack}>
              <Heading as="h3" size="md">
                Mentorship hours (sessions quota)
              </Heading>
              <Text>
                You have{' '}
                <b>{state.profile.super?.sessions_quota || 0} hour(s)</b> of
                live mentorship sessions.
              </Text>
              <ButtonGroup>
                <GumroadButton
                  productId="catamyst-super"
                  email={state.user.email}
                  leftIcon={<Icon name="super" />}
                >
                  Add mentorship hours
                </GumroadButton>
              </ButtonGroup>
            </Card>
          )}

          {state.profile.plan !== 'Super' && <SuperPlanRequestForm />}

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Super Plan Payment
            </Heading>

            {state.profile.plan !== 'Super' ? (
              <Stack align="flex-start">
                <GumroadButton
                  productId="catamyst-super"
                  email={state.user.email}
                  leftIcon={<Icon name="super" />}
                >
                  Upgrade to Super
                </GumroadButton>
              </Stack>
            ) : (
              <Alert status="success" rounded="md">
                <AlertIcon />
                You are in Super plan.
              </Alert>
            )}

            <Box>
              <OrderedList>
                <ListItem>
                  The payment is processed and handled by{' '}
                  <Link isExternal href="https://gumroad.com" color="teal.500">
                    Gumroad
                  </Link>{' '}
                  and{' '}
                  <Link isExternal href="https://stripe.com" color="teal.500">
                    Stripe
                  </Link>
                  , the trusted payment processor. Make sure the email is the
                  same within your Catamyst account.
                </ListItem>
                <ListItem>
                  Keep in mind that the payment confirmation takes time, about
                  several seconds. If you have any trouble, please chat us.
                </ListItem>
                <ListItem>
                  You only need to pay once for a lifetime, because this is not
                  a subscription. This will give you <b>Super</b> plan, added
                  with private mentorship sessions, between <b>50-200 hours</b>{' '}
                  (depending on your payment).
                </ListItem>
                <ListItem>
                  If you need to pay via other methods such as direct bank
                  transfer, via{' '}
                  <Link isExternal color="teal.500" href="https://wise.com">
                    TransferWise
                  </Link>
                  , or even crypto like Bitcoin, please tell us in the
                  discussion.
                </ListItem>
                <ListItem>
                  When you have paid, you will be assigned with the available
                  mentor and would be sent a confirmation to proceed further. So
                  you can immediately schedule the mentorship sessions.
                </ListItem>
              </OrderedList>
            </Box>
          </Card>

          {state.profile.mentors?.length && (
            <Card as={Stack}>
              <Heading as="h3" size="md">
                Mentors
              </Heading>
              {state.profile.mentors?.map((mentor, index) => {
                return <Text key={index}>{mentor}</Text>
              })}
            </Card>
          )}
        </Stack>
      </Content>
    </>
  )
}
