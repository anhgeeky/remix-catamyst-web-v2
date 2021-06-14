import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@/lib'

export default async function apiTopics(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req

  if (method === 'GET') {
    if (query.q) {
      await searchTopics(req, res)
    } else {
      await getTopics(req, res)
    }
  } else if (method === 'POST') {
    await createTopic(req, res)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`${method} is not allowed`)
  }
}

/**
 * GET /api/topics?q=query
 * Search topics by query
 */
export const searchTopics = async (req, res) => {
  const { query } = req

  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .ilike('title', `%${query.q}%`)
    .order('created_at', { ascending: true })
  if (error) throw error

  res.status(200).json({
    message: 'Search topics by query',
    query: query,
    topics: data,
  })
}

/**
 * GET /api/topics
 * Get all topics
 */
export const getTopics = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw error

    res.status(200).json({
      message: 'Get all topics',
      topics: data,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Failed to get all topics',
      error,
    })
  }
}

/**
 * POST /api/topics
 * Create new topic
 */
export const createTopic = async (req, res) => {
  try {
    const { data, error } = await supabase.from('topics').insert({}).single()
    if (error) throw error

    res.status(200).json({
      message: 'Created new topic',
      topic: data,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Failed to create new topic',
      error,
    })
  }
}
