import axios from 'axios'

import { supabase } from '@lib'

export const updateLesson = async (id, body) => {
  try {
    const session = supabase.auth.session()
    const { data } = await axios.patch(`/api/lessons/id/${id}`, body, {
      headers: { Authorization: session?.access_token },
    })
    return data
  } catch (error) {
    return error
  }
}
