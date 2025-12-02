import _ from 'lodash';
import path from 'path';
import { fs, mkdirp, tempDir, util } from '@appium/support';
import { exec } from 'teen_process';

/**
 * Create the backup of keychains folder.
 * The previously created backup will be automatically
 * deleted if this method was called twice in a row without
 * `restoreKeychains` being invoked.
 *
 * @this {CoreSimulatorWithKeychain}
 * @returns {Promise<boolean>} True if the backup operation was successfull.
 */
export async function backupKeychains () {
  throw new Error('Not implemented');
}

/**
 * Restore the previsouly created keychains backup.
 *
 * @this {CoreSimulatorWithKeychain}
 * @param {string[]} excludePatterns - The list
 * of file name patterns to be excluded from restore. The format
 * of each item should be the same as '-x' option format for
 * 'unzip' utility. This can also be a comma-separated string,
 * which is going be transformed into a list automatically,
 * for example: '*.db*,blabla.sqlite'
 * @returns {Promise<boolean>} If the restore opration was successful.
 * @throws {Error} If there is no keychains backup available for restore.
 */
export async function restoreKeychains (excludePatterns = []) {
  throw new Error('Not implemented');
}

/**
 * Clears Keychains for the particular simulator in runtime (there is no need to stop it).
 *
 * @this {CoreSimulatorWithKeychain}
 * @returns {Promise<void>}
 * @throws {Error} If keychain cleanup has failed.
 */
export async function clearKeychains () {
  throw new Error('Not implemented');
}

/**
 * @typedef {import('../types').CoreSimulator & import('../types').InteractsWithKeychain} CoreSimulatorWithKeychain
 */
