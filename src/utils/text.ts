export function getNickname(name: string): string {
  try {
    const split = name.split(' ')
    return split[0]
  } catch (error) {
    return name
  }
}
