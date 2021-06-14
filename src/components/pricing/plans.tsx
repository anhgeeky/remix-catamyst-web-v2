import NextImage from 'next/image'
import {
  Stack,
  Flex,
  Heading,
  VStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

import { Card, LinkButton, Icon } from '@/components'
import { useAuth } from '@/hooks'
import { dataPlans } from '@/data'

export function PricingPlans() {
  const { isAuthenticated } = useAuth()

  return (
    <VStack spacing={5} align="stretch">
      <Stack
        spacing={5}
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'center', lg: 'stretch' }}
      >
        {dataPlans.map((plan) => {
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
                <Flex width="100%" justify="center">
                  <NextImage
                    className="invertable next-image"
                    src={`https://ik.imagekit.io/catamyst/images/plan-${plan.slug}.png`}
                    alt={plan.name}
                    layout="fixed"
                    objectFit="contain"
                    width={200}
                    height={128}
                  />
                </Flex>

                <Heading as="h3" size="2xl" color="teal.500">
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
                  <Heading as="h5" size="md">
                    {plan.price.cost > 0 ? `${plan.price.info}` : 'Forever'}
                  </Heading>
                  <Heading as="h4" size="2xl">
                    {plan.price.cost > 0 ? `$${plan.price.cost}` : 'Free'}
                  </Heading>
                </VStack>

                {!isAuthenticated && (
                  <LinkButton
                    href={plan.buttons.isNotAuthenticated.href}
                    colorScheme="teal"
                    leftIcon={<Icon name={plan.slug} />}
                  >
                    {plan.buttons.isNotAuthenticated.text}
                  </LinkButton>
                )}
                {isAuthenticated && (
                  <LinkButton
                    href={plan.buttons.isAuthenticated.href}
                    colorScheme="teal"
                    leftIcon={<Icon name={plan.slug} />}
                  >
                    {plan.buttons.isAuthenticated.text}
                  </LinkButton>
                )}
              </VStack>
            </Card>
          )
        })}
      </Stack>

      <VStack id="stack-business">
        <Card
          id="business-plan"
          as={Stack}
          flex={1}
          spacing={10}
          align="center"
          justify="space-between"
          direction={{ base: 'column', lg: 'row' }}
          maxW={{ base: '420px', lg: '100%' }}
          py={10}
        >
          <Stack>
            <Flex justify={{ base: 'center', lg: 'flex-start' }}>
              <Stack align="center">
                <NextImage
                  className="invertable next-image"
                  src={`https://ik.imagekit.io/catamyst/images/plan-business.png`}
                  alt="Business"
                  layout="fixed"
                  objectFit="contain"
                  width={200}
                  height={128}
                />
                <Heading
                  as="h3"
                  size="2xl"
                  color="teal.500"
                  bgClip="text"
                  bgGradient="linear(to-r, yellow.400, yellow.900)"
                  textAlign={{ base: 'center', lg: 'left' }}
                >
                  Business
                </Heading>
              </Stack>
            </Flex>

            <List spacing={1}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.500" />
                Custom training or mentorship for your existing or new team
                members
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.500" />
                Custom webiste or web application development.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.500" />
                Campaign for a scholarship program
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.500" />
                Recruitment for curated developers
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.500" />
                Technical consultation. Catamyst as a CTO.
              </ListItem>
            </List>
          </Stack>

          <VStack spacing={5}>
            <VStack spacing={1}>
              <Heading as="h4" size="xl">
                Custom
              </Heading>
            </VStack>

            {!isAuthenticated && (
              <LinkButton
                href={`/signup?plan=business`}
                colorScheme="teal"
                leftIcon={<Icon name="business" />}
              >
                Sign up
              </LinkButton>
            )}
            {isAuthenticated && (
              <LinkButton
                href={`/business`}
                colorScheme="teal"
                leftIcon={<Icon name="business" />}
              >
                Contact us
              </LinkButton>
            )}
          </VStack>
        </Card>
      </VStack>
    </VStack>
  )
}
