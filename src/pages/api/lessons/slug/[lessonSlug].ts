import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@/lib'

/**
 * /api/lessons/slug/{lessonSlug}
 */
export default async function lessonSlug(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'GET') {
    await getLesson(req, res)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`${method} is not allowed`)
  }
}

/**
 * GET /api/lessons/slug/{lessonSlug}
 */
export const getLesson = async (req, res) => {
  const {
    query: { lessonSlug: slug },
  } = req

  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error

    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({
      message: 'Lesson not found',
      slug,
      error,
    })
  }
}
