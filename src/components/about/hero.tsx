import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { Heading, Text, VStack } from '@chakra-ui/react'

import React from 'react'

export function AboutHero() {
  return (
    <VStack p={5} pt={10}>
      <motion.div
        initial={{ y: 0, rotate: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        animate={{
          y: -10,
          rotate: -2,
          transition: {
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'reverse', // A see-saw movement
            duration: 1, // A bit slow, not so fast
          },
        }}
      >
        <NextImage
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/hero-about.png`}
          alt="Cat flying with a red cape"
          width={200}
          height={200}
        />
      </motion.div>
      <Heading
        as="h1"
        textAlign="center"
        size="3xl"
        lineHeight="xl"
        maxW="16ch"
      >
        On helping people with their career
      </Heading>
      <Text fontSize="2xl">A quick story about Catamyst</Text>
    </VStack>
  )
}
