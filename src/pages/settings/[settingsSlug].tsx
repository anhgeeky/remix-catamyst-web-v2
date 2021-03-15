import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { HeaderTabs } from '@components'
import { useRedirectSignIn } from '@hooks'
import {
  SettingsOverview,
  SettingsProfile,
  SettingsEmail,
  SettingsPassword,
  SettingsBilling,
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
    <Layout>
      {settingsSlug && isAuthenticated && auth && (
        <>
          <HeaderTabs links={dataSettingsLinks} />
          {settingsSlug === 'overview' && <SettingsOverview auth={auth} />}
          {settingsSlug === 'profile' && <SettingsProfile auth={auth} />}
          {settingsSlug === 'email' && <SettingsEmail auth={auth} />}
          {settingsSlug === 'password' && <SettingsPassword auth={auth} />}
          {settingsSlug === 'billing' && <SettingsBilling auth={auth} />}
        </>
      )}
    </Layout>
  )
}
