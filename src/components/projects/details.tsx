import NextImage from 'next/image'
import NextLink from 'next/link'
import NextHead from 'next/head'
import {
  Avatar,
  Flex,
  Heading,
  Tooltip,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'

import { HeadingStack, SocialLinks } from '@components'
import { JobSkillsTags } from '@components/jobs'
import { trimUrl } from '@utils'

import dataProjects from '@data/projects.json'
import dataUsers from '@data/users.json'

export function ProjectDetails({ projectSlug }) {
  const [isTooSmall] = useMediaQuery('(max-width: 600px)')
  const project = dataProjects.find((project) => project.slug === projectSlug)

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
            {!project.cover_url && (
              <Flex className="next-image-container" justify="center">
                <NextImage
                  src={`https://storage.catamyst.com/covers/grass.jpg`}
                  alt={project.title}
                  layout="fixed"
                  objectFit="cover"
                  width={1440}
                  height={200}
                />
              </Flex>
            )}

            {project.cover_url && (
              <Flex justify="center">
                <Flex
                  className="next-image-container"
                  justify="center"
                  bg={useColorModeValue('gray.200', 'gray.500')}
                >
                  <NextImage
                    src={project.cover_url}
                    alt={project.title}
                    width={1440}
                    height={400}
                    layout="fixed"
                    objectFit={isTooSmall ? 'contain' : 'scale-down'}
                  />
                </Flex>
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
                      <Link
                        isExternal
                        href={project.url}
                        wordWrap="break-word"
                        wordBreak="break-word"
                      >
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

                {project.socials && project.socials?.length > 0 && (
                  <Stack id="project-social-links" mr={5} my={1}>
                    <HeadingStack>Links and Repositories</HeadingStack>
                    <SocialLinks links={project.socials} size="3xl" />
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
