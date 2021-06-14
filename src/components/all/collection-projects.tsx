import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'

import { Card } from '@/components'
import { trimUrl } from '@/utils'

/**
 * Because there are a lot of projects,
 * the identification is using className.
 */
export function CollectionProjects({ projects }) {
  return (
    <SimpleGrid spacing={3} minChildWidth={300}>
      {projects
        .filter((project) => project.is_published)
        .map((project) => {
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
          {!project.cover_url && (
            <AspectRatio ratio={16 / 10}>
              <Box className="next-image-container">
                <NextImage
                  src={`https://storage.catamyst.com/covers/grass.jpg`}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </AspectRatio>
          )}
          {project.cover_url && (
            <AspectRatio ratio={16 / 10}>
              <Box className="next-image-container">
                <NextImage
                  src={project.cover_url}
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
