import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Link,
  Box,
  VStack,
  ButtonGroup,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import { Content, Icon } from '@components'

const buttons = [
  { slug: 'track', name: 'Track', href: '/learn/web' },
  { slug: 'topic', name: 'Topic', href: '/learn/web/getting-started' },
  {
    slug: 'lesson',
    name: 'Lesson',
    href: '/learn/web/getting-started/web-development-introduction',
  },
]

export function HomeScreens() {
  const { colorMode } = useColorMode()
  const [selected, setSelected] = useState('track')

  return (
    <Content p={0}>
      <Box
        maxW={1400}
        py={5}
        px={{ base: 5, lg: 20 }}
        borderRadius={{ base: 0, md: 'xl' }}
        bg={useColorModeValue('teal.50', 'teal.900')}
      >
        <VStack>
          <ButtonGroup variant="ghost" mb={5}>
            {buttons.map((button, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => setSelected(button.slug)}
                  leftIcon={<Icon name={`${button.slug}s`} />}
                  bg={
                    button.slug === selected
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

        <Box
          className="next-image-screenshot-container"
          rounded="md"
          boxShadow="lg"
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <AnimatePresence initial={false} exitBeforeEnter>
            {selected && colorMode && (
              <motion.div
                key={`${selected}-${colorMode}`}
                initial={{ opacity: 0.2 }}
                exit={{ opacity: 0.2, transition: { duration: 0.1 } }}
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
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/screenshots/${selected}-${colorMode}.png`}
                  objectFit="contain"
                  layout="responsive"
                  width={936}
                  height={585}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <VStack mt={5}>
          {buttons.map((button) => {
            if (button.slug === selected) {
              return (
                <NextLink href={button.href} passHref>
                  <Button as="a" colorScheme="teal">
                    Check this {button.slug} for real
                  </Button>
                </NextLink>
              )
            } else {
              return null
            }
          })}
        </VStack>
      </Box>
    </Content>
  )
}
