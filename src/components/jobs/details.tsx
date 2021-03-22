import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import NextHead from 'next/head'
import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Tag,
  Text,
  VStack,
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
  const [jobId, jobSlug] = jobParams[0]

  const job = dataJobs.find((job) => job.id === Number(jobId))
  const [isApplied, setApplied] = useState(false)

  const handlePickSkill = () => {
    toast({ title: 'Added skill to filter' })
  }

  const handleApplyJob = () => {
    if (isAuthenticated) {
      if (isApplied) {
        setApplied(false)
        toast({ status: 'warning', title: 'Cancelled to apply' })
      } else {
        setApplied(true)
        toast({ status: 'success', title: 'Applied to this job!' })
      }
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
          <Tag>{job.status || 'Closed'}</Tag>
        </VStack>
      </JobHero>

      <Content maxW={700}>
        <Stack id="job-description" align="stretch" spacing={7}>
          <Stack>
            <HeadingStack>Description and Benefits</HeadingStack>
            <Card>
              {ReactHtmlParser(job.descriptionHtml, transformOptions)}
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>Skills and Technologies</HeadingStack>
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
            <HeadingStack>Country and Location</HeadingStack>
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
            <HeadingStack>Position Type and Salary Rate</HeadingStack>
            <Card>
              <Stack>
                {job?.positionTypes.length > 1 && (
                  <Text>
                    {job.positionTypes.map((position, index) => {
                      return (
                        <span>
                          {index > 0 && ' or '}
                          {position}
                        </span>
                      )
                    })}
                  </Text>
                )}
                <JobSalaryRate salary={job.salary} />
                {job.salary.description && (
                  <Text fontSize="sm">{job.salary.description}</Text>
                )}
              </Stack>
            </Card>
          </Stack>

          <Stack>
            <Text color="gray.500">
              {job.status === 'Open'
                ? 'This job vacancy is open to apply'
                : 'This job vacancy is closed but you can try to apply'}
            </Text>
            <ButtonGroup>
              <Button
                variant="solid"
                colorScheme={isApplied ? 'red' : 'teal'}
                onClick={handleApplyJob}
              >
                {isApplied ? 'Cancel apply' : 'Apply for this position'}
              </Button>
              <Button disabled variant="outline">
                Share
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
