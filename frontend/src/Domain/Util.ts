export function shuffle <T>(array: T[]): T[] {
  const newArray = array.map(() => null as T)
  const arrayReference = array.map((_, index) => index)
  array.forEach(randomize)

  return newArray

  function randomize (item: T) {
    const randomIndex = getRandomIndex()
    newArray[arrayReference[randomIndex]] = item
    arrayReference.splice(randomIndex, 1)
  }

  function getRandomIndex () {
    const min = 0
    const max = arrayReference.length
    return Math.floor(Math.random() * (max - min)) + min
  }
}
