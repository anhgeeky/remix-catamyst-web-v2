import { Spinner, Text } from '@chakra-ui/react'

import { OnboardWelcome, OnboardMode, OnboardReady } from '@components/onboard'

export function OnboardAll({ onboardSlug, state }) {
  return (
    <>
      {state.isLoading && <Spinner color="teal.500" />}

      {!state.isLoading && state.isError && (
        <Text>Failed to onboard. Please refresh to try again.</Text>
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
