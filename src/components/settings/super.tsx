import NextHead from 'next/head'
import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  HStack,
  Link,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from '@chakra-ui/react'

import { Content, Card, Icon } from '@components'
import {
  SettingsHero,
  GumroadButton,
  SuperPlanRequestForm,
} from '@components/settings'

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
          {state.profile.super?.license_key && (
            <Card as={Stack}>
              <Heading as="h3" size="md">
                Manage or cancel your Super plan
              </Heading>
              <Text>
                If you need help, chat directly with us. If you want to cancel
                before the mentorship sessions are scheduled, we'll refund your
                money (partially deducted from the processing fee). But if the
                mentorship is already scheduled or ongoing, there is no refund.
              </Text>
            </Card>
          )}

          {state.profile.plan !== 'Super' && (
            <SuperPlanRequestForm state={state} />
          )}

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
                You've paid for Super plan.
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
                  You only need to pay once for a lifetime, because this is not
                  a subscription. This will give you <b>Super</b> plan, added
                  with <b>150 hours</b> of live mentorship sessions.
                </ListItem>
                <ListItem>
                  If you need to pay via alternative methods such as direct bank
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

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Mentorship sessions quota
            </Heading>
            <Text>
              You have <b>{state.profile.super?.sessions_quota || 0} hour(s)</b>{' '}
              of live mentorship sessions.
            </Text>
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
