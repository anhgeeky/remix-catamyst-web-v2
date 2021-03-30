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
} from '@chakra-ui/react'

import { Content, Card, Icon } from '@components'
import { SettingsHero } from '@components/settings'
import { dataApp } from '@data'

export function SettingsSuper({ auth }) {
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
              Payment
            </Heading>
            <Text>Click this button to pay for Super account.</Text>
            <Box>
              <Link
                target="_blank"
                className="gumroad-button"
                href="https://gum.co/catamyst-super?wanted=true"
                data-gumroad-single-product="true"
              >
                $2000 one-time fee
              </Link>
            </Box>
            <Text>
              Currently <b>{dataApp.superQuotaLeft}</b> left out of{' '}
              <b>{dataApp.superQuotaTotal}</b> total availability.
            </Text>
            <Text>You only need to pay once for a lifetime.</Text>
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
              After you paid for the one-time fee, click <b>View content</b> or{' '}
              <b>check your email</b>. You will receive a license key that looks
              like this: <Code>A1234567-B1234567-C1234567-D1234567</Code>
            </Text>
            <Text>
              Then you will be automatically assigned with the available mentor.
              So you can start to schedule the mentorship sessions immediately.
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
                Enter license key to activate your Super plan.
              </FormHelperText>
              <Button leftIcon={<Icon name="save" />} colorScheme="blue">
                Save license key
              </Button>
            </FormControl>
          </Card>
        </Stack>
      </Content>
    </>
  )
}
