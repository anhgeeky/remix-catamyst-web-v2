/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="@mdx-js/loader" />

declare module '*.svg' {
  const content: any
  export default content
}
