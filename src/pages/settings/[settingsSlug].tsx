import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { HeaderTabs } from '@components'
import { useRedirectSignIn } from '@hooks'
import {
  SettingsOverview,
  SettingsProfile,
  SettingsEmail,
  SettingsPassword,
  SettingsPro,
  SettingsSuper,
  SettingsGumroad,
} from '@components/settings'

import dataSettingsLinks from '@data/settings-links.json'

export default function settingsSlug() {
  const router = useRouter()
  const { settingsSlug } = router.query
  const state = useRedirectSignIn(
    `id, handle, name, nickname, role, mode, plan, is_public, is_verified, avatar_url, cover_url, headline, bio_html, country, location, website_url, work, socials, created_at, updated_at`
  )

  /**
   * This pattern is used so the header tabs navigation seamless.
   */
  return (
    <Layout title="Loading settings... · Catamyst">
      {settingsSlug && state.profile && (
        <>
          <SettingsGumroad />

          <HeaderTabs links={dataSettingsLinks} />
          {settingsSlug === 'overview' && <SettingsOverview state={state} />}
          {settingsSlug === 'profile' && <SettingsProfile state={state} />}
          {settingsSlug === 'email' && <SettingsEmail state={state} />}
          {settingsSlug === 'password' && <SettingsPassword state={state} />}
          {settingsSlug === 'pro' && <SettingsPro state={state} />}
          {settingsSlug === 'super' && <SettingsSuper state={state} />}
        </>
      )}
    </Layout>
  )
}
