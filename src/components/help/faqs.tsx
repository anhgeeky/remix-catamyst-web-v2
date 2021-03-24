import NextImage from 'next/image'
import {
  Box,
  Stack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  useMediaQuery,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { HeadingStack } from '@components'
import { transformOptions } from '@components/blocks'

import dataFaqsLearners from '@data/faqs-learners.json'
import dataFaqsEmployers from '@data/faqs-employers.json'

export function HelpFaqs() {
  const [isTooSmall] = useMediaQuery('(max-width: 1000px)')

  return (
    <Stack
      spacing={10}
      direction={isTooSmall ? 'column' : 'row'}
      align={isTooSmall ? 'center' : 'flex-start'}
      justify="center"
    >
      <NextImage
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/help.png`}
        alt="Cat confused need help"
        width={isTooSmall ? 105 : 140}
        height={isTooSmall ? 150 : 200}
      />
      <Stack direction="column" align="center" spacing={10}>
        <FaqAccordion
          id="learners"
          title="FAQ for Learners"
          items={dataFaqsLearners}
        />
        <FaqAccordion
          id="employers"
          title="FAQ for Employers"
          items={dataFaqsEmployers}
        />
      </Stack>
    </Stack>
  )
}

function FaqAccordion({ id, title, items }) {
  return (
    <Stack id={id} maxW={760} width="100%">
      <HeadingStack className="heading-with-anchor">
        <span>{title}</span>
        <Link
          href={`#${id}`}
          aria-label={`Anchor to ${id} FAQ`}
          color="teal.500"
          opacity={0}
          ml={3}
        >
          #
        </Link>
      </HeadingStack>
      <Accordion allowMultiple>
        {items.map((item, index) => {
          return (
            <AccordionItem key={index} my={1}>
              <Heading as="h2" id={item.slug}>
                <AccordionButton p={3}>
                  <Box flex="1" textAlign="left">
                    <span>{item.q}</span>
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
    </Stack>
  )
}
