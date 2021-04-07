import { useState } from 'react'
import { useRouter } from 'next/router'
import NextImage from 'next/image'
import NextLink from 'next/link'
import NextHead from 'next/head'
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Heading,
  Tooltip,
  HStack,
  Link,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'

import {
  Icon,
  Content,
  Card,
  HeadingStack,
  Country,
  SocialLinks,
} from '@components'
import { JobSkillsTags } from '@components/jobs'
import { useAuth, useToast } from '@hooks'
import { trimUrl } from '@utils'

import dataProjects from '@data/projects.json'
import dataUsers from '@data/users.json'

export function ProjectDetails({ projectSlug }) {
  const toast = useToast()
  const router = useRouter()
  const project = dataProjects.find((project) => project.slug === projectSlug)

  const hasSocialLinks = Boolean(project?.socialLinks?.length > 0)

  return (
    <>
      {!project && (
        <>
          <NextHead>
            <title>Project not found · Catamyst</title>
          </NextHead>
          <Text>Sorry, project is not found.</Text>
        </>
      )}
      {project && (
        <>
          <NextHead>
            <title>{project.title} · Project · Catamyst</title>
          </NextHead>

          <Stack width="100%" spacing={5}>
            {!project.coverUrl && (
              <Flex className="next-image-container" justify="center">
                <NextImage
                  src={`https://storage.catamyst.com/covers/grass.jpg`}
                  alt={project.title}
                  layout="fixed"
                  objectFit="cover"
                  height={200}
                  width={1440}
                />
              </Flex>
            )}
            {project.coverUrl && (
              <Flex className="next-image-container" justify="center">
                <NextImage
                  src={project.coverUrl}
                  alt={project.title}
                  layout="fixed"
                  objectFit="cover"
                  height={400}
                  width={1440}
                />
              </Flex>
            )}
            <Flex justify="center" px={5}>
              <Stack maxW={700} spacing={10}>
                <Stack id="project-info">
                  <Heading as="h1" size="2xl">
                    {project.title || ''}
                  </Heading>
                  {project.url && (
                    <Heading as="h2" size="lg">
                      <Link isExternal href={project.url}>
                        {trimUrl(project.url)}
                      </Link>
                    </Heading>
                  )}
                  <Text>{project.description || ''}</Text>
                </Stack>

                {project.skills && (
                  <Stack id="project-skills">
                    <HeadingStack>Skills, Tools, and Technologies</HeadingStack>
                    <JobSkillsTags skills={project.skills} />
                  </Stack>
                )}

                {project.socialLinks && (
                  <Stack id="project-social-links" mr={5} my={1}>
                    <HeadingStack>Links and Repositories</HeadingStack>
                    <SocialLinks links={project.socialLinks} size="3xl" />
                  </Stack>
                )}

                {project.contributors && (
                  <ProjectContributorsAvatars
                    contributors={project.contributors}
                  />
                )}
              </Stack>
            </Flex>
          </Stack>
        </>
      )}
    </>
  )
}

function ProjectContributorsAvatars({ contributors }) {
  return (
    <Stack id="project-contributors" mr={5} my={1}>
      <HeadingStack>Contributors</HeadingStack>
      <Flex>
        {contributors.map((contributor, index) => {
          const user = dataUsers.find((user) => user.id === contributor.userId)
          if (user) {
            return (
              <NextLink key={index} href={`/${user.handle}`} passHref>
                <Link mr={2} rounded="full">
                  <Tooltip
                    hasArrow
                    key={index}
                    aria-label="Contributor role"
                    placement="top"
                    fontSize="md"
                    label={`${user.name} as ${contributor.role}`}
                  >
                    <Avatar name={user.name} src={user.avatar_url} />
                  </Tooltip>
                </Link>
              </NextLink>
            )
          }
        })}
      </Flex>
      )
    </Stack>
  )
}
