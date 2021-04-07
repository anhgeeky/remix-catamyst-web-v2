import NextHead from 'next/head'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Code,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from '@chakra-ui/react'

import { Content, Card, Icon } from '@components'
import { SettingsHero, GumroadButton } from '@components/settings'

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
          <Card as={Stack}>
            <Heading as="h3" size="md">
              Pro Plan Payment
            </Heading>

            {state.profile.plan !== 'Pro' ? (
              <Stack align="flex-start">
                <GumroadButton
                  productId="catamyst-pro"
                  email={state.user.email}
                  leftIcon={<Icon name="pro" />}
                >
                  Upgrade to Pro
                </GumroadButton>
              </Stack>
            ) : (
              <Alert status="success" rounded="md">
                <AlertIcon />
                You've paid for Pro plan.
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
                  You only need to process this once while your subscriptionis
                  still active. You will be charged automatically per month.
                </ListItem>
                <ListItem>
                  If your subscription is ended, your account will be downgraded
                  to <b>Basic</b> plan. Then we will not charge you again unless
                  you continue the subscription.
                </ListItem>
              </OrderedList>
            </Box>
          </Card>

          {state.profile.pro?.license_key && (
            <Card as={Stack}>
              <Heading as="h3" size="md">
                Manage or cancel your Pro plan
              </Heading>
              <ButtonGroup colorScheme="yellow">
                <Button
                  isExternal
                  as={Link}
                  href={`https://gumroad.com/subscriptions/${state.profile.pro?.subscription_id}/manage`}
                  leftIcon={<Icon name="billing" />}
                >
                  Manage subscription
                </Button>
              </ButtonGroup>
              <Text>
                You can update, cancel, upgrade, or downgrade your plan. If you
                need help, chat directly with us.
              </Text>
            </Card>
          )}

          {state.profile.pro?.license_key && (
            <Card as={Stack}>
              <Heading as="h3" size="md">
                Conditions if your Pro plan subscription is ended
              </Heading>
              <Text>
                If you had more than 3 published projects, all of those projects
                are still available to see and edit. But you cannot publish more
                unless you continue your subscription.
              </Text>
              <Text>
                If you had posted some job vacancies, all of those vacancies are
                still available to see and edit. But you cannot post more unless
                you continue your subscription.
              </Text>
            </Card>
          )}
        </Stack>
      </Content>
    </>
  )
}
