import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Box,
  VStack,
  ButtonGroup,
  Button,
  Link,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import { Icon } from '@components'

export function HomeScreens() {
  const { colorMode } = useColorMode()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const screens = [
    { slug: 'track', name: 'Track', href: '/learn/web' },
    { slug: 'topic', name: 'Topic', href: '/learn/web/getting-started' },
    {
      slug: 'lesson',
      name: 'Lesson',
      href: '/learn/web/getting-started/web-development-introduction',
    },
  ]

  return (
    <Box maxW={1200} p={0} width="100%">
      <Box
        maxW={1200}
        py={5}
        px={{ base: 5, lg: 20 }}
        borderRadius={{ base: 0, md: 'xl' }}
        bg={useColorModeValue('teal.50', 'teal.900')}
      >
        <VStack>
          <ButtonGroup variant="ghost" mb={5}>
            {screens.map((button, index) => {
              return (
                <Button
                  key={button.slug}
                  onClick={() => setSelectedIndex(index)}
                  leftIcon={<Icon name={`${button.slug}s`} />}
                  bg={
                    index === selectedIndex
                      ? useColorModeValue('teal.100', 'teal.800')
                      : useColorModeValue('teal.50', 'teal.900')
                  }
                >
                  {button.name}
                </Button>
              )
            })}
          </ButtonGroup>
        </VStack>

        <NextLink href={screens[selectedIndex].href} passHref>
          <a>
            <Flex justify="center">
              <AnimatePresence initial={false} exitBeforeEnter>
                <Box
                  key={`${screens[selectedIndex].slug}-${colorMode}`}
                  as={motion.div}
                  className="next-image-screenshot-container"
                  rounded="md"
                  boxShadow="lg"
                  transition="0.25s ease"
                  _hover={{ boxShadow: 'outline' }}
                  bg={useColorModeValue('gray.50', 'gray.900')}
                  initial={{ opacity: 0.2 }}
                  exit={{
                    opacity: 0.2,
                    transition: { duration: 0.1 },
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 0.1,
                      delay: 0.1,
                      when: 'beforeChildren',
                    },
                  }}
                >
                  <NextImage
                    src={`https://storage.catamyst.com/screenshots/${screens[selectedIndex].slug}-${colorMode}.png`}
                    objectFit="contain"
                    width={936}
                    height={585}
                  />
                </Box>
              </AnimatePresence>
            </Flex>
          </a>
        </NextLink>

        <VStack mt={-5}>
          {screens.map((button, index) => {
            if (index === selectedIndex) {
              return (
                <NextLink key={button.slug} href={button.href} passHref>
                  <Button
                    as="a"
                    colorScheme="teal"
                    boxShadow="xl"
                    leftIcon={<Icon name="learn" />}
                  >
                    Check the {button.slug} for real
                  </Button>
                </NextLink>
              )
            } else {
              return null
            }
          })}
        </VStack>
      </Box>
    </Box>
  )
}
