import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import dataLessons from '@data/lessons.json'

export default async function lessonId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { lessonId },
    method,
  } = req

  /**
   * Only GET, PATCH, DELETE
   * The POST is in /api/lessons
   */
  if (method === 'GET') {
    getLesson({ req, res, lessonId })
  } else if (method === 'PATCH') {
    updateLesson({ req, res, lessonId })
  } else if (method === 'DELETE') {
    deleteLesson({ req, res, lessonId })
  } else {
    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
    res.status(405).end(`${method} is not allowed`)
  }
}

export const getLesson = async ({ req, res, lessonId }) => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single()
    if (error) throw error

    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({
      message: 'Lesson not found',
      id: lessonId,
      error,
    })
  }
}

export const updateLesson = ({ req, res, lessonId }) => {
  try {
    // supase upsert

    res.status(200).json({
      message: 'Updated lesson by id',
      lessonId,
    })
  } catch (error) {
    res.status(400).json({ message: 'Failed to update lesson' })
  }
}

export const deleteLesson = ({ req, res, lessonId }) => {
  try {
    // supase delete

    res.status(200).json({
      message: 'Deleted lesson by id',
      lessonId,
    })
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete lesson' })
  }
}
