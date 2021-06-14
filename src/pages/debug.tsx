import { Layout } from '@/layouts'
import { Debug } from '@/components'
import { useProfile } from '@/hooks'

export default function debugPage() {
  const state = useProfile()

  return (
    <Layout title="Debug · Catamyst">{state && <Debug state={state} />}</Layout>
  )
}
