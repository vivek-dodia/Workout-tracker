import { REGEX_DECIMAL } from "./const"

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ")
}

export const arrayMove = <T>(
  array: T[],
  fromIndex: number,
  toIndex: number
): T[] => {
  if (fromIndex === toIndex) {
    return array.slice() // Return a copy of the original array
  }

  const newArray = array.slice() // Create a copy of the original array
  const element = newArray[fromIndex]
  newArray.splice(fromIndex, 1) // Remove the element from its current position
  newArray.splice(toIndex, 0, element) // Insert the element at the new position

  return newArray
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

