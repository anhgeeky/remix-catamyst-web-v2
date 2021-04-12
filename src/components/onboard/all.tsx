import { Spinner, Text } from '@chakra-ui/react'

import {
  OnboardContainer,
  OnboardWelcome,
  OnboardMode,
  OnboardReady,
} from '@components/onboard'

export function OnboardAll({ onboardSlug, state }) {
  return (
    <>
      {state.isLoading && (
        <OnboardContainer>
          <Spinner color="teal.500" />
        </OnboardContainer>
      )}

      {!state.isLoading && state.isError && (
        <OnboardContainer>
          <Text>Failed to onboard. Please refresh to try again.</Text>
        </OnboardContainer>
      )}

      {!state.isLoading && state.profile && (
        <>
          {onboardSlug === 'welcome' && <OnboardWelcome state={state} />}
          {onboardSlug === 'mode' && <OnboardMode state={state} />}
          {onboardSlug === 'ready' && <OnboardReady state={state} />}
        </>
      )}
    </>
  )
}
