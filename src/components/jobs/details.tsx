import NextHead from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
  chakra,
  HStack,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { Icon, Content, Card, HeadingStack, Country } from '@components'
import { transformOptions } from '@components/blocks'
import {
  JobHero,
  JobOrganizationLogo,
  JobSkillsTags,
  JobSalaryRate,
} from '@components/jobs'
import { useAuth, useToast } from '@hooks'

import dataJobs from '@data/jobs.json'

export function JobDetails({ jobParams }) {
  const toast = useToast()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const job = dataJobs.find((job) => {
    return job.id === Number(jobParams[0])
  })

  const handlePickSkill = () => {
    toast({ title: 'Added skill to filter' })
  }

  const handleApplyJob = () => {
    if (isAuthenticated) {
      toast({ status: 'success', title: 'Applied to this job!' })
    } else {
      router.push('/signin')
    }
  }

  return (
    <>
      <NextHead>
        <title>
          {job.title} at {job.organization.name} · Jobs · Catamyst
        </title>
      </NextHead>

      <JobHero theme={job.theme}>
        <VStack>
          <JobOrganizationLogo org={job.organization} size={100} />
          <Heading as="h1" size="xl">
            {job.title}
          </Heading>
          {!job.organization.handle && (
            <Text as="h2" fontSize="2xl" fontWeight="700" fontFamily="heading">
              {job.organization.name}
            </Text>
          )}
          {job.organization.handle && (
            <NextLink href={`/${job.organization.handle}`} passHref>
              <Link fontSize="2xl" fontWeight="700" fontFamily="heading">
                {job.organization.name}
              </Link>
            </NextLink>
          )}
        </VStack>
      </JobHero>

      <Content maxW={700}>
        <Stack id="job-description" align="stretch" spacing={7}>
          <Stack>
            <HeadingStack>Job Description</HeadingStack>
            <Card>
              {ReactHtmlParser(job.descriptionHtml, transformOptions)}
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>Skills</HeadingStack>
            <Card>
              <JobSkillsTags
                skills={job.skills}
                actions={{
                  handlePickSkill,
                }}
              />
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>Origin Country and Location</HeadingStack>
            <Card>
              <Box id="job-country-location">
                <Flex flexWrap="wrap">
                  <chakra.span mr={3}>
                    <Country code={job.organization.countryCode} />
                  </chakra.span>
                  <HStack id="jobs-location" spacing={1}>
                    <Icon name="location" />
                    <span>{job.organization.location}</span>
                  </HStack>
                </Flex>
              </Box>
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>Salary Rate</HeadingStack>
            <Card>
              <JobSalaryRate salary={job.salary} />
            </Card>
          </Stack>

          <Box>
            <Button colorScheme="teal" size="lg" onClick={handleApplyJob}>
              Apply for this position
            </Button>
          </Box>
        </Stack>
      </Content>
    </>
  )
}
