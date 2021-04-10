import { Heading } from '@chakra-ui/react'

import { HeaderTabs } from '@components'
import {
  SettingsHero,
  SettingsOverview,
  SettingsProfile,
  SettingsEmail,
  SettingsPassword,
  SettingsPro,
  SettingsSuper,
} from '@components/settings'

import { supabase } from '@lib'
import dataSettingsLinks from '@data/settings-links.json'

export function SettingsAll({ settingsSlug, state }) {
  /**
   * Settings need user data, not just profile.
   */
  const user = supabase.auth.user()

  /**
   * This pattern is used so the header tabs navigation seamless.
   * Conditions are inside because there is HeaderTabs for each.
   */
  return (
    <>
      <HeaderTabs links={dataSettingsLinks} />

      {state.isError && (
        <SettingsHero>
          <Heading as="h1" size="xl">
            Failed to load settings
          </Heading>
        </SettingsHero>
      )}

      {!user && !state.profile && (
        <SettingsHero>
          <Heading as="h1" size="xl">
            Loading settings...
          </Heading>
        </SettingsHero>
      )}

      {user && state.profile && (
        <>
          {settingsSlug === 'overview' && (
            <SettingsOverview state={state} user={user} />
          )}
          {settingsSlug === 'email' && (
            <SettingsEmail state={state} user={user} />
          )}
          {settingsSlug === 'password' && <SettingsPassword state={state} />}
          {settingsSlug === 'profile' && <SettingsProfile state={state} />}
          {settingsSlug === 'pro' && <SettingsPro state={state} />}
          {settingsSlug === 'super' && <SettingsSuper state={state} />}
        </>
      )}
    </>
  )
}
