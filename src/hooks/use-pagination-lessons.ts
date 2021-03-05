import slugify from 'slugify'

import dataTracks from '@data/tracks.json'
import dataTopics from '@data/topics.json'
import dataLessons from '@data/lessons.json'

export default function usePaginationLessons({
  trackSlug,
  topicSlug,
  lessonSlug,
}) {
  const track = dataTracks.find((track) => trackSlug === track.slug)
  const topic = dataTopics.find((topic) => {
    if (topic.slug) return topicSlug === topic.slug
    else return topicSlug === slugify(topic.title, { lower: true })
  })
  const lesson = dataLessons.find((lesson) => {
    if (lesson.slug) return lessonSlug === lesson.slug
    else return lessonSlug === slugify(lesson.title, { lower: true })
  })

  /**
   * The flatten process might take a while
   */
  const topicSectionsLessons = topic?.sections.map((section) =>
    section.lessons.map((lessonId) => lessonId)
  )
  const topicLessons = topicSectionsLessons?.flat()

  /**
   * Check whether the flatten process is finished
   */
  if (!topicLessons) {
    return { track, topic, lesson, prev: {}, next: {} }
  } else {
    const lessonIndex = topicLessons.findIndex((id) => id === lesson.id)
    const prevId = lessonIndex > -1 ? topicLessons[lessonIndex - 1] : undefined
    const nextId = lessonIndex > -1 ? topicLessons[lessonIndex + 1] : undefined

    const prev = prevId && dataLessons.find((lesson) => lesson.id === prevId)
    const next = nextId && dataLessons.find((lesson) => lesson.id === nextId)

    return {
      track,
      topic,
      lesson,
      prev,
      next,
    }
  }
}
