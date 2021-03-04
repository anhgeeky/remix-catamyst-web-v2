import slugify from 'slugify'

import dataTracks from '@/data/tracks.json'
import dataTopics from '@/data/topics.json'

export default function usePaginationTopics({ trackSlug, topicSlug }) {
  const track = dataTracks.find((track) => trackSlug === track.slug)
  const topic = dataTopics.find((topic) => {
    if (topic.slug) return topicSlug === topic.slug
    else return topicSlug === slugify(topic.title, { lower: true })
  })

  const topicIndex = track?.topics.findIndex((topicId) => topicId === topic.id)

  const prevId = topicIndex > -1 ? track?.topics[topicIndex - 1] : undefined
  const nextId = topicIndex > -1 ? track?.topics[topicIndex + 1] : undefined

  const prev = prevId && dataTopics.find((topic) => topic.id === prevId)
  const next = nextId && dataTopics.find((topic) => topic.id === nextId)

  return {
    track,
    topic,
    prev,
    next,
  }
}
