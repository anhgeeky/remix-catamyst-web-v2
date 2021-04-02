import { useEffect } from 'react'
import NextHead from 'next/head'
import {
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
  Stack,
  Text,
  ListItem,
  OrderedList,
} from '@chakra-ui/react'

import { Content, Card, Icon } from '@components'
import { SettingsHero, PaySuperButton } from '@components/settings'
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
          <Card as={Stack}>
            <Heading as="h3" size="md">
              Request for discussion
            </Heading>
            <Text>
              Before you start for a <b>Super</b> plan, you can send a request
              to have a discussion before the payment. To see whether this
              mentorship is suitable for you and help you achieve your goals.
              You can also read the details on benefits and conditions below.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }}>
              <Button
                size="sm"
                colorScheme="green"
                leftIcon={<Icon name="send" />}
              >
                Send discussion request
              </Button>
              <Button size="sm" leftIcon={<Icon name="learn" />}>
                Read the details
              </Button>
            </Stack>
            <Text>
              Currently we're available for <b>{dataApp.superQuotaLeft}</b>{' '}
              learners out of <b>{dataApp.superQuotaTotal}</b> total learners
              quota.
            </Text>
          </Card>

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Payment
            </Heading>
            <Text>Click this button to pay for Super account.</Text>
            <Box>
              <PaySuperButton />
            </Box>

            <Box>
              <OrderedList>
                <ListItem>
                  You only need to pay once for a lifetime, because this is not
                  a subscription. This will give you <b>Pro</b>-tier access
                  forever, added with <b>150 hours</b> of live mentorship
                  sessions.
                </ListItem>
                <ListItem>
                  Your payment information is processed and handled by{' '}
                  <Link isExternal href="https://gumroad.com" color="teal.500">
                    Gumroad
                  </Link>{' '}
                  and{' '}
                  <Link isExternal href="https://stripe.com" color="teal.500">
                    Stripe
                  </Link>
                  , the trusted online payment processor.
                </ListItem>
                <ListItem>
                  After you paid for the one-time fee, click <b>View content</b>{' '}
                  or <b>check your email</b>. You will receive a license key
                  that looks like this:{' '}
                  <Code>A1234567-B1234567-C1234567-D1234567</Code>
                </ListItem>
                <ListItem>
                  If you need to pay via alternative methods such as direct bank
                  transfer, please tell us in the discussion.
                </ListItem>
                <ListItem>
                  When you have paid or your license key is applied, you will be
                  automatically assigned with the available mentor and being
                  sent an email. So you can immediately schedule the mentorship
                  sessions.
                </ListItem>
                <ListItem>
                  As long as the license key is active and valid, your account
                  is on the <b>Super</b> plan forever. If the license key is
                  removed or invalid, your account will be downgraded to{' '}
                  <b>Basic</b> plan.
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
                />
                <InputRightElement
                  color="green.500"
                  children={<Icon name="check" />}
                />
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

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Manage, cancel, or refund your Super plan
            </Heading>
            <Text>
              You can check your information by clicking the <b>View content</b>{' '}
              button again from the purchase confirmation email. There you can
              update your information.
            </Text>
            <Text>
              If you need help, chat directly with us. Before mentorship
              sessions are scheduled, if you want to cancel, we'll refund your
              money. But if the mentorship is already scheduled or ongoing,
              there is no refund.
            </Text>
          </Card>

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Mentorship sessions quota
            </Heading>
            <Text>
              You have <b>0 hour</b> of remaining live mentorship sessions.
            </Text>
          </Card>
        </Stack>
      </Content>
    </>
  )
}
