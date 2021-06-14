import NextImage from 'next/image'
import { Stack, Flex, Box } from '@chakra-ui/react'

import {
  HeadingStack,
  CollectionProjects,
  CollectionUsers,
  CollectionOrganizations,
} from '@/components'
import { dataProjects, dataUsers, dataOrganizations } from '@/data'

export function DiscoverFeatured() {
  return (
    <>
      <Stack spacing={20} width="100%">
        <Flex justify="center" mb="-40px">
          <Box>
            <NextImage
              className="invertable next-image"
              src={`https://storage.catamyst.com/illustrations/projects.png`}
              alt="Cat reading book with floating shapes"
              width={200}
              height={200}
            />
          </Box>
        </Flex>

        <Stack>
          <HeadingStack>Featured Members</HeadingStack>
          <CollectionUsers users={dataUsers} />
        </Stack>

        <Stack>
          <HeadingStack>Featured Projects</HeadingStack>
          <CollectionProjects projects={dataProjects} />
        </Stack>

        <Stack>
          <HeadingStack>Featured Organizations</HeadingStack>
          <CollectionOrganizations organizations={dataOrganizations} />
        </Stack>
      </Stack>
    </>
  )
}
