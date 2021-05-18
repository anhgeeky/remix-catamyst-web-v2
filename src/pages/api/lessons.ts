import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function lessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req

  if (method === 'GET') {
    if (query.q) {
      await searchLessons(req, res)
    } else {
      await getLessons(req, res)
    }
  } else if (method === 'POST') {
    await createLesson(req, res)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`${method} is not allowed`)
  }
}

/**
 * GET /api/lessons?q=query
 * Search lessons by query
 */
export const searchLessons = async (req, res) => {
  const { query } = req

  const { data, error } = await supabase
    .from('lessons')
    .select('id,slug,title,level,category,is_published,created_at,updated_at')
    .ilike('title', `%${query.q}%`)
    .order('created_at', { ascending: true })
  if (error) throw error

  res.status(200).json({
    message: 'Get lessons by query',
    query: query,
    lessons: data,
  })
}

/**
 * GET /api/lessons
 * Get all lessons
 */
export const getLessons = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('id,slug,title,level,category,is_published,created_at,updated_at')
      .order('created_at', { ascending: true })
    if (error) throw error

    res.status(200).json({
      message: 'Get all lessons',
      lessons: data,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Failed to get all lessons',
      error,
    })
  }
}

/**
 * POST /api/lessons
 * Create new lesson
 */
export const createLesson = async (req, res) => {
  try {
    const { data, error } = await supabase.from('lessons').insert({}).single()
    if (error) throw error

    res.status(200).json({ message: 'Created new lesson', lesson: data })
  } catch (error) {
    res.status(401).json({ message: 'Failed to create new lesson', error })
  }
}
