import { Stack } from '@chakra-ui/react'

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
      <Stack spacing={10} width="100%">
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
