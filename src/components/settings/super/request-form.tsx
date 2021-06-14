import { ButtonGroup, Heading, Stack, Text } from '@chakra-ui/react'

import { Card, Icon, LinkButton } from '@components'
import { dataSuper } from '@data'

export function SuperPlanRequestForm() {
  return (
    <Card as={Stack}>
      <Heading as="h3" size="md">
        Request for discussion
      </Heading>
      <Text>
        Before you get into <b>Super</b> plan, you can read the guide on
        benefits, terms, and conditions. Also send a request to have a
        discussion first, to see whether this is suitable for you and match with
        your expectations.
      </Text>
      <ButtonGroup size="sm">
        <LinkButton
          href="/super"
          colorScheme="green"
          leftIcon={<Icon name="learn" />}
        >
          Read the guide
        </LinkButton>
        <LinkButton
          href="/super/form"
          colorScheme="green"
          variant="outline"
          leftIcon={<Icon name="form" />}
        >
          Fill the form
        </LinkButton>
      </ButtonGroup>
      <Text>
        Currently we're available for <b>{dataSuper.quota_left}</b> learners out
        of <b>{dataSuper.quota_total}</b> total learners quota.
      </Text>
    </Card>
  )
}
