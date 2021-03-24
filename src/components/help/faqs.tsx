import {
  chakra,
  Box,
  Text,
  Stack,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { HeadingStack } from '@components'
import { transformOptions } from '@components/blocks'

import dataFaqsLearners from '@data/faqs-learners.json'
import dataFaqsEmployers from '@data/faqs-employers.json'

export function HelpFaqs() {
  return (
    <VStack spacing={10}>
      <Stack maxW={760} width="100%">
        <HeadingStack>FAQ for Learners</HeadingStack>
        <FaqAccordion items={dataFaqsLearners} />
      </Stack>
      <Stack maxW={760} width="100%">
        <HeadingStack>FAQ for Employers</HeadingStack>
        <FaqAccordion items={dataFaqsEmployers} />
      </Stack>
    </VStack>
  )
}

function FaqAccordion({ items }) {
  return (
    <Accordion allowMultiple>
      {items.map((item, index) => {
        return (
          <AccordionItem my={1} key={index}>
            <chakra.span id={item.slug} opacity={0} />
            <Heading as="h2"  className="heading-with-anchor">
              <AccordionButton p={3}>
                <Box flex="1" textAlign="left">
                  <span>{item.q}</span>
                  <Link
                    href={`#${item.slug}`}
                    aria-label={`Anchor to ${item.q}`}
                    color="teal.500"
                    opacity={0}
                    ml={3}
                  >
                    #
                  </Link>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
              {ReactHtmlParser(item.a, transformOptions)}
            </AccordionPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
