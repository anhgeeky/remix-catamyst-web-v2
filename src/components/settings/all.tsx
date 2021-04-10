import { Heading } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { HeaderTabs } from '@components'
import { useRedirectSignIn } from '@hooks'
import {
  SettingsHero,
  SettingsOverview,
  SettingsProfile,
  SettingsEmail,
  SettingsPassword,
  SettingsPro,
  SettingsSuper,
} from '@components/settings'

import dataSettingsLinks from '@data/settings-links.json'

export function SettingsAll({ settingsSlug }) {
  const state = useRedirectSignIn(
    `id, handle, name, nickname, role, mode, plan, is_public, is_verified, avatar_url, cover_url, headline, bio_html, country, location, website_url, work, socials, pro, super, created_at, updated_at`
  )

  if (state.isError) {
    return (
      <SettingsHero>
        <Heading as="h1" size="xl">
          Failed to load settings
        </Heading>
      </SettingsHero>
    )
  }
  if (!state.profile) {
    return (
      <SettingsHero>
        <Heading as="h1" size="xl">
          Loading settings...
        </Heading>
      </SettingsHero>
    )
  }
  /**
   * This pattern is used so the header tabs navigation seamless.
   */
  return (
    <>
      <HeaderTabs links={dataSettingsLinks} />
      {settingsSlug === 'overview' && <SettingsOverview state={state} />}
      {settingsSlug === 'profile' && <SettingsProfile state={state} />}
      {settingsSlug === 'email' && <SettingsEmail state={state} />}
      {settingsSlug === 'password' && <SettingsPassword state={state} />}
      {settingsSlug === 'pro' && <SettingsPro state={state} />}
      {settingsSlug === 'super' && <SettingsSuper state={state} />}
    </>
  )
}
