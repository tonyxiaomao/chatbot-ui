import { Prompt } from '@/types/prompt';
import { StorageType } from '@/types/storage';

import {
  couchdbGetPrompts,
  couchdbSavePrompts,
} from './documentBased/couchdb/prompts';
import {
  localGetPrompts,
  localSavePrompts,
} from './documentBased/local/prompts';
import { rdbmsGetPrompts, rdbmsUpdatePrompts } from './rdbms/prompts';

export const storageGetPrompts = async (storageType: StorageType) => {
  if (storageType === StorageType.COUCHDB) {
    return await couchdbGetPrompts();
  } else if (storageType === StorageType.RDBMS) {
    return await rdbmsGetPrompts();
  } else {
    return localGetPrompts();
  }
};

export const storageUpdatePrompts = async (
  storageType: StorageType,
  updatedPrompts: Prompt[],
) => {
  if (storageType === StorageType.COUCHDB) {
    await couchdbSavePrompts(updatedPrompts);
  } else if (storageType === StorageType.RDBMS) {
    await rdbmsUpdatePrompts(updatedPrompts);
  } else {
    localSavePrompts(updatedPrompts);
  }
};
