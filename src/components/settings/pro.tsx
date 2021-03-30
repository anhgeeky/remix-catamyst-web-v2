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
} from '@chakra-ui/react'

import { Content, Card, Icon } from '@components'
import { SettingsHero } from '@components/settings'

export function SettingsPro({ auth }) {
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
              <Link
                target="_blank"
                className="gumroad-button"
                href="https://gum.co/catamyst-pro?wanted=true"
                data-gumroad-single-product="true"
              >
                $10 per month
              </Link>
            </Box>
            <Text>
              You only need to process this once while your subscription or
              license key are still active. You will be charged automatically
              per month.
            </Text>
            <Text>
              Your payment information is processed and handled by{' '}
              <Link isExternal href="https://gumroad.com" color="teal.500">
                Gumroad
              </Link>{' '}
              and{' '}
              <Link isExternal href="https://stripe.com" color="teal.500">
                Stripe
              </Link>
              , the trusted payment gateway.
            </Text>
            <Text>
              After you paid for the membership, click <b>View content</b> or{' '}
              <b>check your email</b>. You will receive a license key that looks
              like this: <Code>A1234567-B1234567-C1234567-D1234567</Code>
            </Text>
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
                Enter license key to activate your Pro plan.
              </FormHelperText>
              <Button leftIcon={<Icon name="save" />} colorScheme="blue">
                Save license key
              </Button>
            </FormControl>
          </Card>

          <Card as={Stack}>
            <Heading as="h3" size="md">
              Manage or cancel your membership
            </Heading>
            <Text>
              You can cancel your ongoing subscription by clicking the{' '}
              <b>View content</b> button again from the email, then click the{' '}
              <b>Manage membership</b> button. There you will see the{' '}
              <b>Cancel membership</b> button. Alternatively, you can also{' '}
              <b>Update membership</b> information.
            </Text>
            <Text>If you need help, chat directly with us.</Text>
          </Card>
        </Stack>
      </Content>
    </>
  )
}
