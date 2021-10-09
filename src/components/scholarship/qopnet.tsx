import NextHead from 'next/head'
import NextLink from 'next/link'
import {
  Avatar,
  chakra,
  Flex,
  Box,
  VStack,
  Stack,
  Heading,
  Link,
  Text,
  useMediaQuery,
  useColorModeValue,
} from '@chakra-ui/react'

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

const recipientsBatch1 = [
  {
    name: 'Guntur Kurniawan Heryanto',
    handle: 'gunturkh',
    avatar_url: 'https://ik.imagekit.io/catamyst/avatars/gunturkh.jpg',
  },
  {
    name: 'Budianto Istu Pribadi',
    handle: 'budiantoip',
    avatar_url: 'https://ik.imagekit.io/catamyst/avatars/budiantoip.jpg',
  },
  {
    name: 'Muhammad Taufiq Hidayah',
    handle: 'hidayahhtaufik',
    avatar_url: 'https://ik.imagekit.io/catamyst/avatars/hidayahhtaufik.jpg',
  },
]

const recipientsBatch2 = [
  {
    name: 'Auliya Michelle Adhana',
    handle: 'auliya',
  },
  {
    name: 'Dicky Muhamad R',
    handle: 'dickymr',
  },
  {
    name: 'Krishna Rowter',
    handle: 'krowter',
  },
  {
    name: 'Muhammad Zaki Sulistya',
    handle: 'zakisu',
  },
  {
    name: 'Rizky Zhang',
    handle: 'rizkyzhang',
  },
]

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
                <Icon name="code" />
                <Text ml={3}>For intermediate-level developers</Text>
              </Flex>
              <Flex align="center">
                <Icon name="date" />
                <Text ml={3}>Registration is already closed.</Text>
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
          </VStack>
        </Stack>
      </ScholarshipHero>

      <VStack spacing={10}>
        <RecipientCards title="Batch 2" recipients={recipientsBatch2} />
        <RecipientCards title="Batch 1" recipients={recipientsBatch1} />
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
                  Next.js, PostgreSQL, Heroku / Railway.app / AWS, and more
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
                  <b>100% full</b> scholarship worth USD 2,000 or IDR 29,000,000
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
                  projects, with scope to build commerce platform and more.
                </ListItemIcon>
              </List>
            </Stack>

            <Stack id="scholarship-timeline">
              <Heading as="h3" size="lg">
                Timeline
              </Heading>
              <List>
                <ListItemNumber no={1}>
                  <b>Registration and screening</b> for Batch 2 from 20
                  September 2021 to 8 October 2021. Can be closed as soon as the
                  quota is fulfilled.
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
                  onboarded, until 26 November 2021 (for Batch 2).
                </ListItemNumber>
              </List>
            </Stack>
          </Stack>
        </Stack>
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
    </Stack>
  )
}

export function RecipientCards({ title, recipients }) {
  const [isTooSmall] = useMediaQuery('(max-width: 920px)')

  return (
    <VStack spacing={5} px={5}>
      <VStack>
        <Heading as="h3" size="lg">
          {title}
        </Heading>
      </VStack>
      <Stack
        spacing={isTooSmall ? 0 : 5}
        textAlign="center"
        justifyContent="center"
        flexWrap="wrap"
        direction="row"
        width="100%"
      >
        {recipients.map((recipient, index) => {
          return (
            <Card key={index} width="100%" w="220px" mb={5}>
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
    a: 'From the day you accepted, until 26 November 2021 (for Batch 2).',
  },
  {
    slug: 'age',
    q: 'I am under 17 or above 40, can I still apply?',
    a: 'Yes, you can still apply, but we still consider your acceptance if you have a great qualification.',
  },
  {
    slug: 'age',
    q: 'I am working in a company/studying in a school right now, can I join this program?',
    a: 'Still possible, we will consider it based on your qualification and commitment guarantee. But keep in mind the scholarship program itself is very packed with lessons and tasks that requires you a lot of time to work on.',
  },
  {
    slug: 'job',
    q: 'After completing this program, am I guaranteed to get a job?',
    a: 'There is no absolute guarantee. However, depending on your performance, attitude, and skills, Qopnet might consider you joining the company as an employee. Your actual work portfolio itself in this scholarship will help you to get a better job.',
  },
  {
    slug: 'nationality',
    q: 'Do you accept candidates from any nationalities?',
    a: 'Yes.',
  },
  {
    slug: 'another',
    q: 'I am currently receiving another scholarship, can I still apply?',
    a: 'Yes, it is not a problem as long as you can still manage the time.',
  },
  {
    slug: 'english',
    q: 'Do I have to be proficient in English?',
    a: 'Yes, at least in reading and writing.',
  },
]
