// src/util/KarmaLookup.ts
import EnvVars from '@constants/EnvVars';
import { HttpStatusCodes } from '@src/constants';
import { HttpError } from '../constants/Errors';
import logger from '@src/logger';

export async function checkKarmaBlacklist(identity: string): Promise<boolean> {
  try {
    const url = `${EnvVars.KarmaLookupApiUrl}/${encodeURIComponent(identity)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${EnvVars.AccessToken}`,
      },
    });

    if (!response.ok) {
      throw new HttpError(
        'Failed to check blacklist status',
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const data = await response.json();

    return !!data.data?.karma_identity;
  } catch (error) {
    logger.error('Error checking blacklist status', error);
    throw new HttpError(
      'Error checking blacklist status',
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
