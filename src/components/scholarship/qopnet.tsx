import NextHead from 'next/head'
import NextLink from 'next/link'
import {
  Avatar,
  chakra,
  Flex,
  Box,
  VStack,
  Stack,
  Button,
  Heading,
  Link,
  Text,
  useMediaQuery,
  useColorModeValue,
} from '@chakra-ui/react'
import Iframe from 'react-iframe'

import {
  Card,
  Icon,
  List,
  ListItemIcon,
  ListItemNumber,
  NextImage,
} from '@/components'
import { ScholarshipHero } from '@/components/scholarship'
import { FaqAccordionSimple } from '@/components/help'

export function ScholarshipQopnet() {
  const [isTooSmall] = useMediaQuery('(max-width: 920px)')
  const qopnetLogo = useColorModeValue(
    `https://ik.imagekit.io/catamyst/logos/qopnet-logo.png`,
    `https://ik.imagekit.io/catamyst/logos/qopnet-logo-white.png`
  )

  return (
    <Stack id="scholarship-page" spacing={40} px={5}>
      <NextHead>
        <title>
          Software Engineering Scholarship · Sponsored by Qopnet · Catamyst
        </title>
      </NextHead>

      <ScholarshipHero>
        <Stack
          id="scholarship-hero-texts-image"
          direction={isTooSmall ? 'column' : 'row'}
          spacing={20}
        >
          <Stack id="hero-texts" spacing={5}>
            <Heading
              as="h1"
              size={isTooSmall ? '3xl' : '4xl'}
              textAlign={isTooSmall ? 'center' : 'left'}
            >
              <Stack>
                <chakra.span>Software</chakra.span>
                <chakra.span>Engineering</chakra.span>
                <chakra.span color="#00aaaa">Scholarship</chakra.span>
              </Stack>
            </Heading>

            <Heading as="h2" size="lg">
              <Stack
                direction={isTooSmall ? 'column' : 'row'}
                align="center"
                spacing={3}
              >
                <chakra.span>Sponsored by</chakra.span>
                <Flex align="center">
                  <Link isExternal href="https://qopnet.id" display="inherit">
                    <NextImage
                      className="next-image"
                      src={qopnetLogo}
                      alt="Qopnet logo"
                      width={192}
                      height={60}
                    />
                  </Link>
                </Flex>
              </Stack>
            </Heading>

            <Stack
              mt={10}
              fontSize="xl"
              textAlign={isTooSmall ? 'center' : 'left'}
              align={isTooSmall ? 'center' : 'flex-start'}
            >
              <Flex align="center">
                <Icon name="date" />
                <Text ml={3}>Apply before 1 August 2021</Text>
              </Flex>
              <Flex align="center">
                <Icon name="code" />
                <Text ml={3}>For intermediate-level developers</Text>
              </Flex>
              <Flex align="center">
                <Icon name="users" />
                <Text ml={3}>Limited to 3 people, first come first serve</Text>
              </Flex>
            </Stack>
          </Stack>

          <VStack spacing={10}>
            <NextImage
              className="invertable next-image"
              src="https://ik.imagekit.io/catamyst/images/cats-scholarship.png"
              alt="Cats scholarship"
              width={330}
              height={275}
            />
            <Box>
              <Button
                as={Link}
                href="#apply"
                leftIcon={<Icon name="form" />}
                size="lg"
                colorScheme="orange"
                rounded="full"
              >
                Apply Now
              </Button>
            </Box>
          </VStack>
        </Stack>
      </ScholarshipHero>

      <VStack spacing={10}>
        <RecipientCards />
      </VStack>

      <VStack spacing={10}>
        <Stack
          direction={isTooSmall ? 'column' : 'row'}
          align="center"
          spacing={20}
        >
          <Box>
            <NextImage
              className="invertable next-image"
              src="https://ik.imagekit.io/catamyst/images/cats-criteria.png"
              alt="Cats criteria"
              width={300}
              height={330}
            />
          </Box>

          <Stack id="criteria" maxW={560} spacing={10}>
            <Stack id="scholarship-requirements">
              <Heading as="h3" size="lg">
                Requirements
              </Heading>
              <List>
                <ListItemIcon>
                  <b>Experience</b> in Software Engineering, UI/UX Design, Web
                  Development, JavaScript / TypeScript, Node.js, React /
                  Next.js, PostgreSQL / MongoDB, GCP / AWS, and more
                </ListItemIcon>
                <ListItemIcon>
                  <b>Age</b> 17–40
                </ListItemIcon>
                <ListItemIcon>
                  <b>Level</b> Intermediate–Advanced
                </ListItemIcon>
              </List>
            </Stack>

            <Stack id="scholarship-benefits">
              <Heading as="h3" size="lg">
                Benefits
              </Heading>
              <List>
                <ListItemIcon>
                  <b>100% full</b> scholarship worth USD 2,000 or IDR 28,500,000
                  per person, no additional hidden fee.
                </ListItemIcon>
                <ListItemIcon>
                  <b>Mentorship</b> with experienced developers.
                </ListItemIcon>
                <ListItemIcon>
                  <b>Super</b> membership account forever.
                </ListItemIcon>
                <ListItemIcon>
                  <b>Stipend</b> per month for lunch and Internet.
                </ListItemIcon>
                <ListItemIcon>
                  <b>Actual</b> project work experience for{' '}
                  <Link isExternal href="https://qopnet.id">
                    Qopnet
                  </Link>{' '}
                  projects, with scope to build commerce platform, chat app,
                  sales dashboard, POS (point of sale), and more.
                </ListItemIcon>
              </List>
            </Stack>

            <Stack id="scholarship-timeline">
              <Heading as="h3" size="lg">
                Timeline
              </Heading>
              <List>
                <ListItemNumber no={1}>
                  <b>Registration and screening</b> from 7 June 2021 to 1 August
                  2021. Can be closed as soon as the quota is fulfilled.
                </ListItemNumber>
                <ListItemNumber no={2}>
                  <b>Interview</b> process within 7 days after you have
                  registered and screened.
                </ListItemNumber>
                <ListItemNumber no={3}>
                  <b>Acceptance or rejection</b> information within 7 days after
                  you have been interviewed.
                </ListItemNumber>
                <ListItemNumber no={4}>
                  <b>Program</b> started as soon as you are accepted and
                  onboarded, until 1 October 2021.
                </ListItemNumber>
              </List>
            </Stack>
          </Stack>
        </Stack>

        <Flex justify="center">
          <Button
            as={Link}
            href="#apply"
            leftIcon={<Icon name="form" />}
            size="lg"
            colorScheme="orange"
            rounded="full"
          >
            Apply Now
          </Button>
        </Flex>
      </VStack>

      <VStack spacing={10}>
        <Stack
          direction={isTooSmall ? 'column' : 'row'}
          align="center"
          spacing={20}
        >
          <Stack maxW={580}>
            <Heading as="h3" size="lg">
              FAQ (Frequently Asked Questions)
            </Heading>
            <FaqAccordionSimple
              id="scholarship-faq"
              items={dataFAQScholarshipQopnet}
            />
          </Stack>

          <Box>
            <NextImage
              className="invertable next-image"
              src={`https://storage.catamyst.com/illustrations/help.png`}
              alt="Cat help"
              width={140}
              height={200}
            />
          </Box>
        </Stack>
      </VStack>

      <VStack id="apply" spacing={5}>
        <Box>
          <Button
            isExternal
            as={Link}
            leftIcon={<Icon name="external" />}
            href="https://airtable.com/shrFUZjGN57bZIKfc"
            colorScheme="orange"
            rounded="full"
          >
            Open form in new tab
          </Button>
        </Box>

        <Box width="100%" maxW={760} boxShadow="base">
          <Iframe
            id="qopnet-form"
            className="iframe airtable-embed airtable-dynamic-height"
            url="https://airtable.com/embed/shrFUZjGN57bZIKfc"
            width="100%"
            height={isTooSmall ? '590' : '720'}
          />
        </Box>
      </VStack>
    </Stack>
  )
}

export function RecipientCards() {
  const [isTooSmall] = useMediaQuery('(max-width: 920px)')
  const recipients = [
    {
      name: 'Budianto Istu Pribadi',
      handle: 'budiantoip',
      avatar_url: 'https://ik.imagekit.io/catamyst/avatars/budiantoip.jpg',
    },
    {
      name: 'Guntur Kurniawan Heryanto',
      handle: 'gunturkh',
      avatar_url: 'https://ik.imagekit.io/catamyst/avatars/gunturkh.jpg',
    },
    {
      name: 'Muhammad Taufiq Hidayah',
      handle: 'hidayahhtaufik',
      avatar_url: 'https://ik.imagekit.io/catamyst/avatars/hidayahhtaufik.jpg',
    },
  ]

  return (
    <VStack spacing={5} px={5}>
      <VStack>
        <Heading as="h3" size="lg">
          Scholarship Recipients
        </Heading>
        <Text>The chosen 3 people</Text>
      </VStack>
      <Stack
        spacing={5}
        textAlign="center"
        direction={isTooSmall ? 'column' : 'row'}
        width={isTooSmall ? '100%' : '720px'}
      >
        {recipients.map((recipient, index) => {
          return (
            <Card width="100%" key={index}>
              <NextLink
                href={
                  recipient?.handle
                    ? `/${recipient.handle}`
                    : `/scholarship/qopnet`
                }
              >
                <a>
                  <Stack align="center" spacing={5}>
                    <Avatar
                      size="xl"
                      name={recipient.name}
                      src={recipient.avatar_url}
                    />
                    <Heading as="h4" size="md">
                      {recipient.name}
                    </Heading>
                  </Stack>
                </a>
              </NextLink>
            </Card>
          )
        })}
      </Stack>
    </VStack>
  )
}

const dataFAQScholarshipQopnet = [
  {
    slug: 'condition',
    q: "What's the primary condition for the scholarship recipients?",
    a: 'We have a first come first serve basis. If the quota of recipients is already fulfilled, the registration will be closed.',
  },
  {
    slug: 'pay',
    q: 'Do I need to pay to join this program?',
    a: 'No, this is a 100% full scholarship, there is no need to pay any fee.',
  },
  {
    slug: 'experience',
    q: "I don't have any experience in software engineering, can I apply?",
    a: 'No, this program requires you to have experience in software engineering, intermediate to advanced level.',
  },
  {
    slug: 'remote',
    q: 'Is this program done remotely or in a classroom?',
    a: 'You will learn remotely via video call with the mentors.',
  },
  {
    slug: 'schedule',
    q: 'How long does it take to complete the program?',
    a: 'From the day you accepted, until 1 October 2021.',
  },
  {
    slug: 'age',
    q: 'I am under 17 or above 40, can I still apply?',
    a: 'Yes, you can still apply, we will consider your acceptance if you have a great qualification.',
  },
  {
    slug: 'age',
    q: 'I am working in a company/studying in a school right now, can I join this program?',
    a: 'Yes, we will consider it based on your qualification and commitment guarantee. But keep in mind the scholarship program itself is very packed with lessons and tasks that requires you a lot of time to work on.',
  },
  {
    slug: 'job',
    q: 'After completing this program, am I guaranteed to get a job?',
    a: 'No, we cannot guarantee. However, depending on your performance, attitude, and skills, Qopnet might consider you joining the company as an employee. Your actual work portfolio itself in this scholarship will help you to get a better job.',
  },
  {
    slug: 'nationality',
    q: 'Do you accept candidates from any nationalities?',
    a: 'Yes.',
  },
  {
    slug: 'another',
    q: 'I am currently receiving another scholarship, can I still apply?',
    a: 'Yes, it is not a problem.',
  },
  {
    slug: 'english',
    q: 'Do I have to be proficient in English?',
    a: 'Yes, at least in reading and writing.',
  },
]
