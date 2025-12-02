import _ from 'lodash';
import path from 'path';
import { fs, mkdirp, tempDir, util } from '@appium/support';
import { exec } from 'teen_process';
import type { CoreSimulator, InteractsWithKeychain } from '../types';

type CoreSimulatorWithKeychain = CoreSimulator & InteractsWithKeychain;

/**
 * Create the backup of keychains folder.
 * The previously created backup will be automatically
 * deleted if this method was called twice in a row without
 * `restoreKeychains` being invoked.
 *
 * @returns True if the backup operation was successful.
 */
export async function backupKeychains(this: CoreSimulatorWithKeychain): Promise<boolean> {
  throw new Error('backupKeychains is not implemented');
}

/**
 * Restore the previously created keychains backup.
 *
 * @param excludePatterns The list
 * of file name patterns to be excluded from restore. The format
 * of each item should be the same as '-x' option format for
 * 'unzip' utility. This can also be a comma-separated string,
 * which is going be transformed into a list automatically,
 * for example: '*.db*,blabla.sqlite'
 * @returns If the restore operation was successful.
 * @throws {Error} If there is no keychains backup available for restore.
 */
export async function restoreKeychains(
  this: CoreSimulatorWithKeychain,
  excludePatterns: string[] | string = []
): Promise<boolean> {
  throw new Error('restoreKeychains is not implemented');
}

/**
 * Clears Keychains for the particular simulator in runtime (there is no need to stop it).
 *
 * @returns Promise that resolves when keychains are cleared
 * @throws {Error} If keychain cleanup has failed.
 */
export async function clearKeychains(this: CoreSimulatorWithKeychain): Promise<void> {
  throw new Error('clearKeychains is not implemented');
}

