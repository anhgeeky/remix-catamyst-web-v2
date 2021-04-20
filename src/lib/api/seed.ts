import { supabaseAdmin } from '@lib/api'
import { dataTracks, dataTopics, dataLessons } from '@data'

export const seedTracks = async () => {
  await supabaseAdmin.from('tracks').delete()
  const { data, error } = await supabaseAdmin.from('tracks').insert(dataTracks)
  return { data, error }
}

export const seedTopics = async () => {
  await supabaseAdmin.from('topics').delete()
  const { data, error } = await supabaseAdmin.from('topics').insert(dataTopics)
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
