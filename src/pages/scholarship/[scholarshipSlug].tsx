import { Layout } from '@/layouts'
import { ScholarshipAll } from '@/components/scholarship'
import { useRouter } from 'next/router'

export default function scholarshipSlugPage() {
  const router = useRouter()
  const { scholarshipSlug } = router.query

  return (
    <Layout title="Loading scholarship... · Catamyst">
      {scholarshipSlug && <ScholarshipAll scholarshipSlug={scholarshipSlug} />}
    </Layout>
  )
}
