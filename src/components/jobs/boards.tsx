import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  chakra,
  Link,
  Avatar,
  Stack,
  Box,
  Heading,
  Text,
  Tooltip,
  HStack,
  Tag,
  Flex,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'

import {
  Card,
  Icon,
  TagSkill,
  Country,
  LinkButton,
  HeadingStack,
} from '@components'
import { JobsToolbar } from '@components/jobs'
import { useToast, useAuth } from '@hooks'
import {
  getCompleteDate,
  getRelativePublishedDate,
  formatNumberCurrency,
} from '@utils'
import dataJobs from '@data/jobs.json'

/**
 * As this is not a Collection component, the data is retrived directly
 * from the component itself, not from the parent.
 * Because there are a lot of jobs, the identification is using className.
 */
export function JobsBoards() {
  return (
    <Stack>
      <JobsToolbar />
      <HeadingStack>Featured Jobs</HeadingStack>
      <Stack spacing={3}>
        {dataJobs.map((job, index) => {
          return <JobDetail key={index} job={job} />
        })}
      </Stack>
    </Stack>
  )
}

export function JobDetail({ job }) {
  const toast = useToast()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isApplied, setApplied] = useState(false) // Can be from user.jobs

  const handlePickSkill = (skill) => {
    toast({ title: `Added ${skill} to filter` })
  }

  const state = {
    publishedDate: getCompleteDate(job.publishedDate),
    relativePublishedDate: getRelativePublishedDate(job.publishedDate),
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
    <Stack
      as={Card}
      justify="space-between"
      align="flex-start"
      spacing={5}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Stack
        className="job-logo-info"
        spacing={3}
        direction={{ base: 'column', sm: 'row' }}
        flex={3}
      >
        <NextLink href={`/${job.organization.handle}`} passHref>
          <Link height="80px">
            <JobOrganizationLogo org={job.organization} size="80px" />
          </Link>
        </NextLink>
        <Stack className="job-info" spacing={1}>
          <Box>
            <HStack className="job-organization-name">
              {!job.organization.handle && (
                <Text
                  as="h1"
                  fontSize="md"
                  fontWeight="700"
                  fontFamily="heading"
                >
                  {job.organization.name}
                </Text>
              )}
              {job.organization.handle && (
                <NextLink href={`/${job.organization.handle}`} passHref>
                  <Link fontSize="md" fontWeight="700" fontFamily="heading">
                    {job.organization.name}
                  </Link>
                </NextLink>
              )}
              {job.organization.isVerified && (
                <Tooltip
                  hasArrow
                  label="Verified organization account"
                  aria-label="Verified"
                  placement="top"
                >
                  <chakra.span
                    fontSize="sm"
                    color="teal.500"
                    position="relative"
                    top="-2px"
                    left="-3px"
                  >
                    <Icon name="verified" />
                  </chakra.span>
                </Tooltip>
              )}
            </HStack>

            <HStack className="job-title">
              <NextLink href={`/jobs/${job.id}/${job.slug}`} passHref>
                <Link fontSize="2xl" fontWeight="700" fontFamily="heading">
                  {job.title}
                </Link>
              </NextLink>
              {job.isVerified && (
                <Tooltip
                  hasArrow
                  label="This job is is verified and trustworty"
                  aria-label="Verified"
                  placement="top"
                >
                  <chakra.span
                    fontSize="xl"
                    color="gray.500"
                    position="relative"
                    top="-2px"
                  >
                    <Icon name="trusted" />
                  </chakra.span>
                </Tooltip>
              )}
            </HStack>
          </Box>

          <JobSalaryRate salary={job.salary} />

          <Box className="job-country-location">
            <Flex flexWrap="wrap">
              <chakra.span mr={3}>
                <Country code={job.organization.country} />
              </chakra.span>
              <HStack className="jobs-location" spacing={1}>
                <Icon name="location" />
                <span>{job.organization.location}</span>
              </HStack>
            </Flex>
          </Box>
        </Stack>
      </Stack>

      <Box className="job-skills" maxW={{ base: 700, lg: 500 }} flex={2}>
        <JobSkillsTags
          isLimited
          skills={job.skills}
          actions={{
            handlePickSkill,
          }}
        />
      </Box>

      <Stack className="job-meta" minW={160}>
        <Stack
          className="job-date-actions"
          textAlign={{ base: 'left', lg: 'right' }}
          alignItems={{ base: 'flex-start', lg: 'flex-end' }}
          spacing={1}
        >
          <HStack spacing={1}>
            <Icon name="date" />
            <Text as="span">{state.publishedDate}</Text>
          </HStack>
          <Text as="span" fontSize="sm" color="gray.500">
            {state.relativePublishedDate}
          </Text>
          <Tag colorScheme={job.status === 'Open' ? 'green' : 'red'}>
            {job.status || 'Closed'} Vacancy
          </Tag>
          <ButtonGroup size="sm" pt={1}>
            <LinkButton
              colorScheme="teal"
              variant="outline"
              href={`/jobs/${job.id}/${job.slug}`}
            >
              Details
            </LinkButton>
            {job.status === 'Open' && (
              <Button
                colorScheme={isApplied ? 'red' : 'teal'}
                onClick={handleApplyJob}
              >
                {isApplied ? 'Cancel' : 'Apply'}
              </Button>
            )}
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  )
}

export function JobSalaryRate({ salary }) {
  const hasHourly = salary.hourlyMin && salary.hourlyMax
  const hasMonthly = salary.monthlyMin && salary.monthlyMax
  const hasYearly = salary.yearlyMin && salary.yearlyMax

  return (
    <Box className="job-salary-rate">
      {hasHourly && !hasMonthly && !hasYearly && (
        <Text>
          {salary.currencyCode} {salary.currencySymbol}
          {formatNumberCurrency(salary.hourlyMin)}/hour –{' '}
          {salary.currencySymbol}
          {formatNumberCurrency(salary.hourlyMax)}/hour
        </Text>
      )}
      {hasMonthly && !hasHourly && !hasYearly && (
        <Text>
          {salary.currencyCode} {salary.currencySymbol}
          {formatNumberCurrency(salary.monthlyMin)}/month –{' '}
          {salary.currencySymbol}
          {formatNumberCurrency(salary.monthlyMax)}/month
        </Text>
      )}
      {hasYearly && (
        <Text>
          {salary.currencyCode} {salary.currencySymbol}
          {formatNumberCurrency(salary.yearlyMin)}/year –{' '}
          {salary.currencySymbol}
          {formatNumberCurrency(salary.yearlyMax)}/year
        </Text>
      )}
    </Box>
  )
}

export function JobOrganizationLogo({ org, size = 100 || '100px' }) {
  if (!org.avatar_url) {
    return (
      <Avatar
        name={org.name}
        src={org.avatar_url}
        width={size}
        height={size}
        size="xl"
        rounded="md"
      />
    )
  }
  if (org.avatar_url) {
    return (
      <Box className="next-image-container org-avatar" rounded="md">
        <NextImage
          className="next-image"
          src={org.avatar_url}
          width={size}
          height={size}
          layout="fixed"
        />
      </Box>
    )
  }
  return null
}

export function JobSkillsTags({
  skills,
  isLimited = false,
  actions = {
    handlePickSkill: (skill) => {},
  },
}) {
  return (
    <Flex flexWrap="wrap" className="job-skills-tags">
      {skills
        .filter((skill, index) => {
          if (!isLimited) return skill
          if (isLimited && index < 12) return skill
        })
        .map((skill, index) => {
          return (
            <Link
              key={index}
              href="#"
              onClick={() => actions.handlePickSkill(skill)}
            >
              <TagSkill skill={skill} />
            </Link>
          )
        })}

      {isLimited && skills?.length > 12 && (
        <Tag variant="ghost">+{skills?.length - 12} more</Tag>
      )}
    </Flex>
  )
}
