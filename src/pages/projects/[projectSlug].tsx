import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { ProjectDetails } from '@/components/projects'

export default function projectSlugPage() {
  const router = useRouter()
  const { projectSlug } = router.query

  return (
    <Layout title="Loading project... · Catamyst">
      {projectSlug && <ProjectDetails projectSlug={projectSlug} />}
    </Layout>
  )
}
