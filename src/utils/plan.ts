export const getPlan = (permalink: string) => {
  const word = permalink.split('-')[1]
  return word.charAt(0).toUpperCase() + word.slice(1)
}
