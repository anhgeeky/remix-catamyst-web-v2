import NextImage from 'next/image'
import NextLink from 'next/link'
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

import { Card, Icon, TagSkill, Country, LinkButton } from '@components'
import { getPublishedDate, getRelativePublishedDate } from '@utils'
import { useToast } from '@hooks'

import dataJobs from '@data/jobs.json'

/**
 * As this is not a Collection component, the data is retrived directly
 * from the component itself, not from the parent.
 * Because there are a lot of jobs, the identification is using className.
 */
export function JobsBoards() {
  const toast = useToast()
  const handlePickSkill = (skill) => {
    toast({ title: `Added ${skill} to filter` })
  }

  return (
    <Stack spacing={3}>
      {dataJobs.map((job, index) => {
        const state = {
          publishedDate: getPublishedDate(job.publishedDate),
          relativePublishedDate: getRelativePublishedDate(job.publishedDate),
        }

        return (
          <Stack
            as={Card}
            key={index}
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
              <JobOrganizationLogo org={job.organization} size="80px" />
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
                        <Link
                          fontSize="md"
                          fontWeight="700"
                          fontFamily="heading"
                        >
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
                    <NextLink href={`/jobs/${job.id}`} passHref>
                      <Link
                        fontSize="2xl"
                        fontWeight="700"
                        fontFamily="heading"
                      >
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
                      <Country code={job.organization.countryCode} />
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

            <Stack className="job-meta">
              <Stack
                className="job-published-date"
                spacing={1}
                textAlign={{ lg: 'right' }}
              >
                <HStack spacing={1} justify={{ lg: 'flex-end' }}>
                  <Icon name="date" />
                  <Text as="span">{state.publishedDate}</Text>
                </HStack>
                <Text as="span" fontSize="sm" color="gray.500">
                  {state.relativePublishedDate}
                </Text>
              </Stack>

              <Box className="job-actions">
                <ButtonGroup size="sm">
                  <LinkButton variant="outline" href={`/jobs/${job.id}`}>
                    Details
                  </LinkButton>
                  <Button colorScheme="teal">Apply</Button>
                </ButtonGroup>
              </Box>
            </Stack>
          </Stack>
        )
      })}
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
          {salary.hourlyMin}/hour – {salary.currencySymbol}
          {salary.hourlyMax}/hour
        </Text>
      )}
      {hasMonthly && !hasHourly && !hasYearly && (
        <Text>
          {salary.currencyCode} {salary.currencySymbol}
          {salary.monthlyMin}/month – {salary.currencySymbol}
          {salary.monthlyMax}/month
        </Text>
      )}
      {hasYearly && (
        <Text>
          {salary.currencyCode} {salary.currencySymbol}
          {salary.yearlyMin}/year – {salary.currencySymbol}
          {salary.yearlyMax}/year
        </Text>
      )}
    </Box>
  )
}

export function JobOrganizationLogo({ org, size = 100 || '100px' }) {
  if (!org.avatarUrl) {
    return (
      <Avatar
        name={org.name}
        src={org.avatarUrl}
        width={size}
        height={size}
        size="xl"
        rounded="md"
      />
    )
  }
  if (org.avatarUrl) {
    return (
      <Box className="next-image-container org-avatar" rounded="md">
        <NextImage
          className="next-image"
          src={org.avatarUrl}
          width={size}
          height={size}
          layout="fixed"
        />
      </Box>
    )
  }
  return null
}

export function JobSkillsTags({ isLimited = false, skills, actions }) {
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

      {isLimited && skills.length > 12 && (
        <Tag variant="ghost">+{skills.length - 12} more</Tag>
      )}
    </Flex>
  )
}
