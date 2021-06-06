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
  Text,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { HeadingStack } from '@components'
import { transformOptions } from '@components/blocks'
import { dataFAQLearners, dataFAQEmployers } from '@data'

export function HelpFaqs() {
  const [isTooSmall] = useMediaQuery('(max-width: 1000px)')

  return (
    <Stack
      spacing={10}
      direction={isTooSmall ? 'column' : 'row'}
      align={isTooSmall ? 'center' : 'flex-start'}
      justify="center"
    >
      <Box className="next-image-container">
        <NextImage
          className="invertable next-image"
          src={`https://storage.catamyst.com/illustrations/help.png`}
          alt="Cat confused need help"
          width={isTooSmall ? 105 : 140}
          height={isTooSmall ? 150 : 200}
        />
      </Box>
      <Stack direction="column" align="center" spacing={10}>
        <FaqAccordion
          id="learners"
          title="FAQ for Learners"
          items={dataFAQLearners}
        />
        <FaqAccordion
          id="employers"
          title="FAQ for Employers"
          items={dataFAQEmployers}
        />
      </Stack>
    </Stack>
  )
}

export function FaqAccordion({ id, title = '', items }) {
  return (
    <Stack id={id} maxW={760} width="100%">
      {title && (
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
      )}

      {items?.length && (
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
      )}
    </Stack>
  )
}

export function FaqAccordionSimple({ id, items }) {
  return (
    <Stack id={id} maxW={580} width="100%">
      {items?.length && (
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
                  <Text>{item.a}</Text>
                </AccordionPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
    </Stack>
  )
}
