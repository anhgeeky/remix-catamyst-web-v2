export function getNickname(name: string): string {
  try {
    const split = name.split(' ')
    return split[0]
  } catch (error) {
    return name
  }
}

export function getName(profile): string {
  try {
    return profile.nickname || profile.name || 'You'
  } catch (error) {
    return 'You'
  }
}

export function trimId(id): string {
  try {
    return id.substring(0, 8)
  } catch (error) {
    return id
  }
}
