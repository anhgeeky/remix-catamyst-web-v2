import { useEffect } from 'react'
import NextHead from 'next/head'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
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
import { dataApp } from '@data'

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
          {state.profile.plan !== 'Super' && (
            <SuperPlanRequestForm state={state} />
          )}

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Payment
            </Heading>

            {state.profile.plan !== 'Super' ? (
              <Stack align="flex-start">
                <Text>Click this button to pay for Super account.</Text>
                <GumroadButton productId="catamyst-super">
                  $2000 one-time fee
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
                  , the trusted payment processor.
                </ListItem>
                <ListItem>
                  You only need to pay once for a lifetime, because this is not
                  a subscription. This will give you <b>Super</b> plan, added
                  with <b>150 hours</b> of live mentorship sessions.
                </ListItem>
                <ListItem>
                  After you paid for the one-time fee, click the{' '}
                  <b>View content</b> button or <b>check your email</b>. You
                  will receive a license key that looks like this:{' '}
                  <Code>A1234567-B1234567-C1234567-D1234567</Code>
                </ListItem>
                <ListItem>
                  If you didn't find the license key,{' '}
                  <Link
                    isExternal
                    color="teal.500"
                    href="https://gumroad.com/license-key-lookup"
                  >
                    check with license key lookup
                  </Link>
                  .
                </ListItem>
                <ListItem>
                  If you need to pay via alternative methods such as direct bank
                  transfer, please tell us in the discussion.
                </ListItem>
                <ListItem>
                  When you have paid or your license key is applied, you will be
                  automatically assigned with the available mentor and would be
                  sent an email to proceed further. So you can immediately
                  schedule the mentorship sessions.
                </ListItem>
                <ListItem>
                  As you already paid and applied the license key, your account
                  is on the <b>Super</b> plan forever. If the license key is
                  removed or invalid, your account should stay on <b>Super</b>{' '}
                  plan.
                </ListItem>
                <ListItem>
                  If you previously had <b>Pro</b> plan, you should immediately
                  cancel the subscription as this <b>Super</b> plan already has
                  Pro-tier access forever.
                </ListItem>
              </OrderedList>
            </Box>
          </Card>

          <Card as={Stack} align="flex-start">
            <Heading as="h3" size="md">
              License key
            </Heading>
            <FormControl as={Stack} align="flex-start">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="A1234567-B1234567-C1234567-D1234567"
                  defaultValue={state.profile.super?.license_key}
                />
                {state.profile.super?.license_key && (
                  <InputRightElement
                    color="green.500"
                    children={<Icon name="check" />}
                  />
                )}
              </InputGroup>
              <FormHelperText>
                Enter license key to activate your Super plan. It is recommended
                for you to backup the key using password manager like{' '}
                <Link isExternal color="teal.500" href="https://bitwarden.com">
                  Bitwarden
                </Link>
                .
              </FormHelperText>
              <Button leftIcon={<Icon name="save" />} colorScheme="blue">
                Save license key
              </Button>
            </FormControl>
          </Card>

          {state.profile.super?.license_key && (
            <Card as={Stack}>
              <Heading as="h3" size="md">
                Manage, cancel, or refund your Super plan
              </Heading>
              <Text>
                You can check your information by clicking the{' '}
                <b>View content</b> button again from the purchase confirmation
                email. There you can update your information.
              </Text>
              <Text>
                If you need help, chat directly with us. Before mentorship
                sessions are scheduled, if you want to cancel, we'll refund your
                money. But if the mentorship is already scheduled or ongoing,
                there is no refund.
              </Text>
            </Card>
          )}

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

function SuperPlanRequestForm({ state }) {
  return (
    <Card as={Stack}>
      <Heading as="h3" size="md">
        Request for discussion
      </Heading>
      <Text>
        Before you start for a <b>Super</b> plan, you can send a request to have
        a discussion before the payment. To see whether this mentorship is
        suitable for you and help you achieve your goals. You can also read the
        details on benefits and conditions below.
      </Text>
      <Stack direction={{ base: 'column', sm: 'row' }}>
        <Button size="sm" colorScheme="green" leftIcon={<Icon name="send" />}>
          Send discussion request
        </Button>
        <Button size="sm" leftIcon={<Icon name="learn" />}>
          Read the details
        </Button>
      </Stack>
      <Text>
        Currently we're available for <b>{dataApp.superQuotaLeft}</b> learners
        out of <b>{dataApp.superQuotaTotal}</b> total learners quota.
      </Text>
    </Card>
  )
}
