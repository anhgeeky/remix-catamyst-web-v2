import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  chakra,
  Avatar,
  AspectRatio,
  Box,
  Heading,
  HStack,
  Flex,
  Link,
  LinkOverlay,
  Stack,
  Text,
  StackDivider,
  VStack,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'

import { Card } from '@components'
import { trimUrl } from '@utils'

/**
 * Because there are a lot of projects,
 * the identification is using className.
 */
export function CollectionProjects({ projects }) {
  return (
    <SimpleGrid spacing={3} minChildWidth={320}>
      {projects
        .filter((project) => project.isPublished)
        .map((project, index) => {
          return <ProjectBoard key={project.slug} project={project} />
        })}
    </SimpleGrid>
  )
}

function ProjectBoard({ project }) {
  return (
    <NextLink href={`/projects/${project.slug}`} passHref>
      <Link
        rounded="md"
        _hover={{
          boxShadow: 'outline',
          textDecoration: 'none',
        }}
      >
        <Card as={Stack} p={3} spacing={3} height="100%">
          {!project.coverUrl && (
            <Box minH={200} height="100%" width="100%" bg="teal.200"></Box>
          )}
          {project.coverUrl && (
            <AspectRatio ratio={16 / 10}>
              <Box className="next-image-container">
                <NextImage
                  src={project.coverUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </AspectRatio>
          )}
          <Stack direction={{ base: 'column', lg: 'row' }}>
            <HStack minW={300} spacing={3}>
              <Stack spacing={1}>
                <Heading className="project-title" as="h3" size="lg">
                  {project.title}
                </Heading>
                {project.url && (
                  <Heading as="h4" size="sm">
                    {trimUrl(project.url)}
                  </Heading>
                )}
                <Text>{project.description}</Text>
              </Stack>
            </HStack>
          </Stack>
        </Card>
      </Link>
    </NextLink>
  )
}
