import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { OnboardAll } from '@/components/onboard'
import { useRedirectSignIn } from '@/hooks'

export default function onboardSlugPage() {
  const router = useRouter()
  const { onboardSlug } = router.query
  const state = useRedirectSignIn()

  return (
    <Layout title="Onboarding... · Catamyst">
      {onboardSlug && <OnboardAll onboardSlug={onboardSlug} state={state} />}
    </Layout>
  )
}
