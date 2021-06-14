import NextHead from 'next/head'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Link,
  ListItem,
  OrderedList,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

import { Content, Card, Icon } from '@/components'
import { SettingsHero, GumroadButton } from '@/components/settings'

export function SettingsPro({ state }) {
  return (
    <>
      <NextHead>
        <title>Pro Plan Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Pro Plan Settings
        </Heading>
        <HStack>
          <Text>Upgrade or configure Pro plan.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%" maxW={760}>
          {state.profile.pro?.subscription_id && (
            <Card as={Stack}>
              <Heading as="h3" size="md">
                Manage your Pro plan
              </Heading>
              <ButtonGroup colorScheme="teal" size="sm">
                <Button
                  isExternal
                  as={Link}
                  href={`https://gumroad.com/subscriptions/${state.profile.pro?.subscription_id}/manage`}
                  leftIcon={<Icon name="billing" />}
                >
                  Manage membership
                </Button>
              </ButtonGroup>
              <Text>
                You can update, cancel, upgrade, or downgrade your plan. If you
                need help, chat directly with us.
              </Text>
              <Box>
                <Heading as="h3" size="sm" pt={3}>
                  Conditions if your subscription is cancelled or ended
                </Heading>
                <UnorderedList>
                  <ListItem>
                    If you paid in the beginning of the billing cycle, but then
                    you cancelled it after, your subscription will be stopped in
                    the end of the cycle after Pro plan is active for 30 days.
                  </ListItem>
                  <ListItem>
                    If you had more than 3 published projects, all of those
                    projects are still available to see and edit. But you cannot
                    projects unless you continue your subscription.
                  </ListItem>
                  <ListItem>
                    If you had posted some job vacancies, all of those vacancies
                    are still available to see and edit. But you cannot post
                    more vacancies unless you continue your subscription.
                  </ListItem>
                </UnorderedList>
              </Box>
            </Card>
          )}

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Pro Plan Payment
            </Heading>

            {state.profile.plan === 'Basic' ? (
              <Stack align="flex-start">
                <GumroadButton
                  productId="catamyst-pro"
                  email={state.user.email}
                  leftIcon={<Icon name="pro" />}
                >
                  Upgrade to Pro
                </GumroadButton>
              </Stack>
            ) : state.profile.plan === 'Pro' ? (
              <Alert status="success" rounded="md">
                <AlertIcon />
                You've paid for Pro plan.
              </Alert>
            ) : (
              <Alert status="success" rounded="md">
                <AlertIcon />
                You've already in Super plan. It's the same with lifetime Pro
                plan.
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
                  You only need to process this once while your subscription is
                  still active. You will be charged automatically per month.
                </ListItem>
                <ListItem>
                  If you need to pay via other methods such as direct bank
                  transfer, via TransferWise, or even cryptocurrency like
                  Bitcoin, you can ask us via the chat.
                </ListItem>
                <ListItem>
                  If your subscription is ended, your account will be downgraded
                  to <b>Basic</b> plan. Then we will not charge you again unless
                  you continue the subscription.
                </ListItem>
              </OrderedList>
            </Box>
          </Card>
        </Stack>
      </Content>
    </>
  )
}
