import NextImage from 'next/image'
import { Stack, Flex } from '@chakra-ui/react'

import {
  CollectionOrganizations,
  CollectionUsers,
  HeadingStack,
} from '@components'

import dataUsers from '@data/users.json'
import dataOrganizations from '@data/organizations.json'

export function DiscoverFeatured() {
  return (
    <>
      <Stack spacing={20} width="100%">
        <Flex justify="center" mb="-40px">
          <NextImage
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/projects.png`}
            alt="Cat reading book with floating shapes"
            width={200}
            height={200}
          />
        </Flex>

        {/* <Stack>
          <HeadingStack>Featured Projects</HeadingStack>
          <CollectionProjects projects={dataProjects} />
        </Stack> */}

        <Stack>
          <HeadingStack>Featured Members</HeadingStack>
          <CollectionUsers users={dataUsers} />
        </Stack>

        <Stack>
          <HeadingStack>Featured Organizations</HeadingStack>
          <CollectionOrganizations organizations={dataOrganizations} />
        </Stack>
      </Stack>
    </>
  )
}
