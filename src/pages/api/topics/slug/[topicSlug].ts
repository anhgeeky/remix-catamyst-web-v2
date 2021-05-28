import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

/**
 * /api/topics/slug/{topicSlug}
 */
export default async function topicSlug(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'GET') {
    await getTopic(req, res)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`${method} is not allowed`)
  }
}

/**
 * GET /api/topics/slug/{topicSlug}
 */
export const getTopic = async (req, res) => {
  const {
    query: { topicSlug: slug },
  } = req

  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error

    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({
      message: 'Topic not found',
      slug,
      error,
    })
  }
}
