import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { JobDetails } from '@/components/jobs'

export default function jobIdPage() {
  const router = useRouter()
  const { jobParams } = router.query

  return (
    <Layout title="Loading job details... · Catamyst">
      {jobParams && <JobDetails jobParams={jobParams} />}
    </Layout>
  )
}
