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
import { SettingsHero, PayProButton } from '@components/settings'

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
              Payment
            </Heading>
            <Text>Click this button to pay for Pro account subscription.</Text>
            <Box>
              <PayProButton />
            </Box>

            <Box>
              <OrderedList>
                <ListItem>
                  You only need to process this once while your subscription or
                  license key are still active. You will be charged
                  automatically per month.
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
                  After you paid for the membership, click <b>View content</b>{' '}
                  or <b>check your email</b>. You will receive a license key
                  that looks like this:{' '}
                  <Code>A1234567-B1234567-C1234567-D1234567</Code>
                </ListItem>
                <ListItem>
                  As long as the license key is active and valid, your account
                  is on the <b>Pro</b> plan. If the license key is removed,
                  expired, or your subscription is ended, your account will be
                  downgraded to <b>Basic</b> plan.
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
                Enter license key to activate your Pro plan. It is recommended
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
              Manage, cancel, or refund your Pro plan
            </Heading>
            <Text>
              You can cancel your ongoing subscription by clicking the{' '}
              <b>View content</b> button again from the purchase confirmation
              email, then click the <b>Manage membership</b> button. There you
              will see the <b>Cancel membership</b> button. Alternatively, you
              can also <b>Update membership</b> information.
            </Text>
            <Text>
              If you need help or want to refund, chat directly with us. We
              offer a 7 day money-back guarantee. If you're not satisfied with
              Catamyst after using it for a week, we'll refund your money.
            </Text>
          </Card>

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Conditions if your subscription is ended
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
        </Stack>
      </Content>
    </>
  )
}
