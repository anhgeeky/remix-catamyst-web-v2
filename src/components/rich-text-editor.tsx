export function RichTextEditor({ htmlString }) {
  return (
    <div>
      <h1>Rich Text Editor</h1>
      <div>{JSON.stringify(htmlString, null, 2)}</div>
    </div>
  )
}
