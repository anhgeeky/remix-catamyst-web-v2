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
    <Flex px={5} justify="center">
      <Stack
        id="hero-home"
        align="center"
        width="100%"
        maxW="1200px"
        px={{ base: 0, lg: 5 }}
        py={{ base: '10', md: '20', lg: '30' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Stack maxW="40rem" spacing={5}>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl', xl: '5xl' }}
            maxW="30ch"
            bgGradient="linear(to-r, teal.500, green.500)"
            bgClip="text"
          >
            {dataHeroHome.title}
          </Heading>
          <Text fontSize={['md', 'lg']}>{dataHeroHome.subtitle}</Text>
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
          alt="Evolution of cats"
          src="https://storage.catamyst.com/illustrations/hero-home.png"
          objectFit="contain"
          width={500}
          height={300}
        />
      </Stack>
    </Flex>
  )
}