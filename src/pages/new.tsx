import { Layout } from '@layouts'
import { Content } from '@components'
import { NewQuickPanel } from '@components/new'

export default function newPage() {
  return (
    <Layout title="Create something new · Catamyst">
      <Content>
        <NewQuickPanel />
      </Content>
    </Layout>
  )
}
