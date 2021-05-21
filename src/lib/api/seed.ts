import { supabaseAdmin } from '@lib/api'
import { dataTracks, dataTopics, dataLessons } from '@data'

export const seedTracks = async () => {
  await supabaseAdmin.from('tracks').delete()
  const { data, error } = await supabaseAdmin.from('tracks').insert(dataTracks)
  return { data, error }
}

export const seedTopics = async () => {
  const topics = dataTopics.map((topic) => {
    return {
      is_published: true,
      slug: topic.slug,
      title: topic.title,
      description: topic.description,
      category: topic.category,
      icon_url: topic.icon_url,
      icon_emoji: topic.icon_emoji,
      total_lessons: topic.total_lessons,
      total_hours: topic.total_hours,
      total_days: topic.total_days,
      levels: topic.levels,
      sections: [],
    }
  })

  await supabaseAdmin.from('topics').delete()
  const { data, error } = await supabaseAdmin.from('topics').insert(topics)
  return { data, error }
}

export const seedLessons = async () => {
  const lessons = dataLessons.map((lesson) => {
    return {
      slug: lesson.slug,
      title: lesson.title,
      level: lesson.level,
      category: lesson.category,
      is_published: lesson.is_published,
      blocks: lesson.blocks,
    }
  })

  await supabaseAdmin.from('lessons').delete()
  const { data, error } = await supabaseAdmin.from('lessons').insert(lessons)
  return { data, error }
}
