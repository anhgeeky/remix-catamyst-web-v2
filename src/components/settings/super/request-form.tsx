import { ButtonGroup, Button, Heading, Stack, Text } from '@chakra-ui/react'

import { Card, Icon } from '@components'
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
        help you achieve your goals. You can also read the details on benefits
        and conditions below.
      </Text>
      <ButtonGroup>
        <Button size="sm" leftIcon={<Icon name="learn" />}>
          Read terms and conditions
        </Button>
      </ButtonGroup>
      <Text>
        Currently we're available for <b>{dataApp.superQuotaLeft}</b> learners
        out of <b>{dataApp.superQuotaTotal}</b> total learners quota.
      </Text>
    </Card>
  )
}
