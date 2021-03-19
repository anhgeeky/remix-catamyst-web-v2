import NextImage from 'next/image'
import {
  Heading,
  Stack,
  Flex,
  Text,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { FaCheckCircle as CheckIcon } from 'react-icons/fa'

import { QuickSignUpForm } from '@components'
import dataHeroHome from '@data/hero-home.json'

export function HomeHero() {
  return (
    <Flex px={{ base: 3, sm: 5 }} justify="center">
      <Stack
        id="hero-home"
        align="center"
        width="100%"
        maxW="1200px"
        pt={{ base: 10, md: 50, lg: 70 }}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Stack spacing={5}>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl', xl: '5xl' }}
            bgGradient="linear(to-r, teal.400, green.400)"
            bgClip="text"
            maxW="40rem"
          >
            {dataHeroHome.title}
          </Heading>
          <Text maxW="40rem" fontSize={['md', 'lg']}>
            {dataHeroHome.subtitle}
          </Text>

          <List>
            {dataHeroHome.benefits.map((benefit, index) => {
              return (
                <ListItem key={index}>
                  <ListIcon as={CheckIcon} color="teal.500" />
                  <Text as="span">{benefit}</Text>
                </ListItem>
              )
            })}
          </List>

          <QuickSignUpForm />
        </Stack>

        <NextImage
          priority
          alt="Multiple cats learning"
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/hero-home.png`}
          objectFit="contain"
          width={500}
          height={300}
        />
      </Stack>
    </Flex>
  )
}
