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
  const { auth, isAuthenticated } = useRedirectSignIn()

  /**
   * This pattern is used so the header tabs navigation seamless.
   */
  return (
    <Layout title="Loading settings... · Catamyst">
      {settingsSlug && isAuthenticated && auth && (
        <>
          <SettingsGumroad />

          <HeaderTabs links={dataSettingsLinks} />
          {settingsSlug === 'overview' && <SettingsOverview auth={auth} />}
          {settingsSlug === 'profile' && <SettingsProfile auth={auth} />}
          {settingsSlug === 'email' && <SettingsEmail auth={auth} />}
          {settingsSlug === 'password' && <SettingsPassword auth={auth} />}
          {settingsSlug === 'pro' && <SettingsPro auth={auth} />}
          {settingsSlug === 'super' && <SettingsSuper auth={auth} />}
        </>
      )}
    </Layout>
  )
}
