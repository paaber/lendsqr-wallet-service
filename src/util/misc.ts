import crypto from 'crypto';

/**
 * Miscellaneous shared functions go here.
 */

/**
 * Get a random number between 1 and 1,000,000,000,000
 */
export function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

/**
 * Wait for a certain number of milliseconds.
 */
export function tick(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

export function generateOTP(length: number) {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    otp += characters.charAt(randomIndex);
  }

  return otp;
}



interface LevelsDeep<T> { 
  One: Array<Record<string, T>>
  Two: Array<Record<string, Record<string, T>>> 
}
// type ExtractArrayElementType<T> = T extends (infer U)[] ? U : never;
/**
 * Normalize the values two levels deep into an array
 * @param nestedObjectArray The array with nested objects
 * @param keyOne Key for the object on the first level
 * @param keyTwo Key for the object on the second level
 * @returns An array of the values at keyTwo
 */
export const normalizeTwoLevelsDeepObject = <T>(nestedObjectArray: LevelsDeep<T>["Two"], keyOne: string, keyTwo: string) => {
  return nestedObjectArray.map(element => {
    return element[keyOne][keyTwo];
  });
};

/**
 * Normalize the values one level deep into an array
 * @param nestedObjectArray The array with nested objects
 * @param keyOne Key for the object on the first level
 * @returns An array of the values at keyOne
 */
export const normalizeOneLevelDeepObject = <T>(nestedObjectArray: LevelsDeep<T>["One"], keyOne: string) => {
  return nestedObjectArray.map(element => {
    return element[keyOne];
  });
};
