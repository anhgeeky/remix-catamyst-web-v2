import NextImage from 'next/image'
import {
  Box,
  Stack,
  Flex,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

import { Card, LinkButton } from '@components'
import { useAuth } from '@hooks'

import dataPlans from '@data/plans.json'

export function PricingPlans() {
  const { isAuthenticated } = useAuth()

  return (
    <Stack
      spacing={5}
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'center', lg: 'stretch' }}
    >
      {dataPlans.map((plan, index) => {
        return (
          <Card
            key={plan.slug}
            as={VStack}
            flex={1}
            maxW={420}
            spacing={10}
            justify="space-between"
          >
            <VStack>
              <Flex display="flex" width="100%" justify="center">
                <NextImage
                  className="invertable next-image"
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/plan-${plan.slug}.png`}
                  alt={plan.name}
                  layout="fixed"
                  objectFit="contain"
                  width={200}
                  height={128}
                />
              </Flex>

              <Heading as="h3" size="xl" color="teal.500">
                {plan.name}
              </Heading>

              <List spacing={1}>
                {plan.benefits.map((benefit, index) => {
                  return (
                    <ListItem key={index}>
                      <ListIcon as={FaCheckCircle} color="teal.500" />
                      {benefit}
                    </ListItem>
                  )
                })}
              </List>
            </VStack>

            <VStack spacing={5}>
              <VStack spacing={1}>
                <Heading as="h4" size="2xl">
                  {plan.price.cost > 0 ? `$${plan.price.cost}` : 'Free'}
                </Heading>
                <Heading as="h5" size="md">
                  {plan.price.cost > 0 ? `${plan.price.info}` : 'Forever'}
                </Heading>
              </VStack>

              {!isAuthenticated && (
                <LinkButton
                  href={plan.buttons.isNotAuthenticated.href}
                  colorScheme="teal"
                >
                  {plan.buttons.isNotAuthenticated.text}
                </LinkButton>
              )}
              {isAuthenticated && (
                <LinkButton
                  href={plan.buttons.isAuthenticated.href}
                  colorScheme="blue"
                >
                  {plan.buttons.isAuthenticated.text}
                </LinkButton>
              )}
            </VStack>
          </Card>
        )
      })}
    </Stack>
  )
}
