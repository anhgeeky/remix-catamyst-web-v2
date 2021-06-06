import { ScholarshipHaidar, ScholarshipQopnet } from '@components/scholarship'

export function ScholarshipAll({ scholarshipSlug }) {
  return (
    <>
      {scholarshipSlug === 'haidar' && <ScholarshipHaidar />}
      {scholarshipSlug === 'qopnet' && <ScholarshipQopnet />}
    </>
  )
}
