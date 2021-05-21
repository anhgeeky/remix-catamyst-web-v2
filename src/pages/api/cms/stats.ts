import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function lessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { error: tracksError, count: tracksCount } = await supabase
      .from('tracks')
      .select('id', { count: 'exact' })
    if (tracksError) throw tracksError

    const { error: topicsError, count: topicsCount } = await supabase
      .from('topics')
      .select('id', { count: 'exact' })
    if (topicsError) throw topicsError

    const { error: lessonsError, count: lessonsCount } = await supabase
      .from('lessons')
      .select('id', { count: 'exact' })
    if (lessonsError) throw lessonsError

    const { error: profilesError, count: profilesCount } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
    if (profilesError) throw profilesError

    const dataStats = [
      { label: 'Tracks', total: tracksCount, href: '/cms/tracks' },
      { label: 'Topics', total: topicsCount, href: '/cms/topics' },
      { label: 'Lessons', total: lessonsCount, href: '/cms/lessons' },
      { label: 'Users', total: profilesCount, href: '/cms/users' },
      { label: 'Discussions', total: 0, href: '/cms/discussions' },
      { label: 'Projects', total: 0, href: '/cms/projects' },
      { label: 'Posts', total: 0, href: '/cms/posts' },
      { label: 'Jobs', total: 0, href: '/cms/jobs' },
      { label: 'Mentors', total: 0, href: '/cms/mentors' },
    ]

    res.status(200).json({
      message: 'Get all stats',
      stats: dataStats,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Failed to get all stats',
    })
  }
}
