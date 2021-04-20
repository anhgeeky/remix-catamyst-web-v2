import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import dataLessons from '@data/lessons.json'

/**
 * /api/lessons/id/{lessonId}
 */
export default async function lessonId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { lessonId: id },
    method,
  } = req

  if (method === 'GET') {
    await getLesson(req, res)
  } else if (method === 'PATCH') {
    await updateLesson(req, res)
  } else if (method === 'DELETE') {
    await deleteLesson(req, res)
  } else {
    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
    res.status(405).end(`${method} is not allowed`)
  }
}

/**
 * GET /api/lessons/id/{lessonId}
 */
export const getLesson = async (req, res) => {
  const {
    query: { lessonId: id },
  } = req

  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error

    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({
      message: 'Lesson not found',
      id,
      error,
    })
  }
}

/**
 * PATCH /api/lessons/id/{lessonId}
 */
export const updateLesson = async (req, res) => {
  const {
    query: { lessonId: id },
  } = req

  try {
    const { data, error } = await supabase.from('lessons').upsert({
      id,
      ...req.body,
    })
    if (error) throw error

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update lesson',
      id,
      error,
    })
  }
}

/**
 * DELETE /api/lessons/id/{lessonId}
 */
export const deleteLesson = (req, res) => {
  const {
    query: { lessonId: id },
  } = req

  try {
    // supase delete

    res.status(200).json({
      message: 'Deleted lesson by id',
      id,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete lesson',
      id,
      error,
    })
  }
}
