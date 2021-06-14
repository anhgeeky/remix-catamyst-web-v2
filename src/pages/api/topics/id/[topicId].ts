import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@/lib'

/**
 * /api/topics/id/{topicId}
 */
export default async function topicId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'GET') {
    await getTopic(req, res)
  } else if (method === 'PATCH') {
    await updateTopic(req, res)
  } else if (method === 'DELETE') {
    await deleteTopic(req, res)
  } else {
    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
    res.status(405).end(`${method} is not allowed`)
  }
}

/**
 * GET /api/topics/id/{topicId}
 */
export const getTopic = async (req, res) => {
  const {
    query: { topicId: id },
  } = req

  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error

    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({
      message: 'Topic not found',
      id,
      error,
    })
  }
}

/**
 * PATCH /api/topics/id/{topicId}
 */
export const updateTopic = async (req, res) => {
  const {
    query: { topicId: id },
  } = req

  try {
    const { data, error } = await supabase.from('topics').upsert({
      id,
      ...req.body,
    })
    if (error) throw error

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update topic',
      id,
      error,
    })
  }
}

/**
 * DELETE /api/topics/id/{topicId}
 */
export const deleteTopic = (req, res) => {
  const {
    query: { topicId: id },
  } = req

  try {
    // supase delete

    res.status(200).json({
      message: 'Deleted topic by id',
      id,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete topic',
      id,
      error,
    })
  }
}
