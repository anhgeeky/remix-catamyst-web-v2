import { ButtonGroup } from '@chakra-ui/react'

import { LinkButton, Icon } from '@components'

export function MembershipButtons({ plan }) {
  return (
    <ButtonGroup>
      {plan !== 'Super' && (
        <LinkButton
          href="/settings/pro"
          colorScheme="yellow"
          size="sm"
          leftIcon={<Icon name="pro" />}
        >
          {plan !== 'Pro' ? 'Upgrade to Pro' : 'Manage Pro'}
        </LinkButton>
      )}
      <LinkButton
        href="/settings/super"
        colorScheme="yellow"
        size="sm"
        leftIcon={<Icon name="super" />}
      >
        {plan !== 'Super' ? 'Upgrade to Super' : 'Manage Super'}
      </LinkButton>
    </ButtonGroup>
  )
}
