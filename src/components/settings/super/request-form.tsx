import { ButtonGroup, Button, Heading, Stack, Text } from '@chakra-ui/react'

import { Card, Icon, LinkButton } from '@components'
import { dataApp } from '@data'

export function SuperPlanRequestForm({ state }) {
  return (
    <Card as={Stack}>
      <Heading as="h3" size="md">
        Request for discussion
      </Heading>
      <Text>
        Before you pay for a <b>Super</b> plan, you can send a request to have a
        discussion first, to see whether this mentorship is suitable for you and
        help you achieve your goals. You can also read the guide on benefits ,
        terms, and conditions below.
      </Text>
      <ButtonGroup>
        <LinkButton
          href="/guide/super"
          size="sm"
          colorScheme="green"
          leftIcon={<Icon name="learn" />}
        >
          Read the guide
        </LinkButton>
      </ButtonGroup>
      <Text>
        Currently we're available for <b>{dataApp.superQuotaLeft}</b> learners
        out of <b>{dataApp.superQuotaTotal}</b> total learners quota.
      </Text>
    </Card>
  )
}
