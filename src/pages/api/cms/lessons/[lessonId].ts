import { NextApiRequest, NextApiResponse } from 'next'

// import { supabase } from '@lib'
import dataLessons from '@data/lessons.json'

export default async function getProfileById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lessonId } = req.query
  try {
    const lesson = dataLessons.find((lesson) => lesson.id === Number(lessonId))
    res.status(200).json(lesson)
  } catch (error) {
    res.status(404).json({ message: 'Lesson not found' })
  }
}
