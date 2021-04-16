import { NextApiRequest, NextApiResponse } from 'next'

// import { supabase } from '@lib'
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
   * The POST is in /api/lessons.ts
   */
  switch (method) {
    case 'GET':
      getLesson({ req, res, lessonId })
      break
    case 'PATCH':
      updateLesson({ req, res, lessonId })
      break
    case 'DELETE':
      deleteLesson({ req, res, lessonId })
      break
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} is not allowed`)
  }
}

export const getLesson = ({ req, res, lessonId }) => {
  try {
    const lesson = dataLessons.find((lesson) => lesson.id === Number(lessonId))

    res.status(200).json({
      message: 'Lesson by id',
      lessonId,
      lesson,
    })
  } catch (error) {
    res.status(404).json({ message: 'Lesson not found' })
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
