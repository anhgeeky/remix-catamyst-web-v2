import slugify from 'slugify'

export function createSlug(text) {
  const options = {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  }

  return slugify(text || '', options)
}

export function generateSlug({ text, state, setState, toast }) {
  try {
    const generatedSlug = createSlug(text)
    if (generatedSlug) {
      setState({ ...state, slug: generatedSlug || '' })
      toast({
        title: 'Generated slug!',
        description: generatedSlug,
        status: 'info',
      })
    }
  } catch (error) {
    toast({ title: 'Failed to generate slug!', status: 'error' })
  }
}
