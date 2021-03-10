import slugify from 'slugify'

export function utilSlugify(text) {
  const options = {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  }

  return slugify(text || '', options)
}

export function generateSlug({ text, state, setState, toast }) {
  try {
    const generatedSlug = utilSlugify(text)
    if (generatedSlug) {
      setState({ ...state, slug: generatedSlug || '' })
      toast({
        description: generatedSlug,
        title: 'Slug generated!',
        status: 'success',
      })
    }
  } catch (error) {
    toast({ title: 'Slug error to generate!', status: 'error' })
  }
}
