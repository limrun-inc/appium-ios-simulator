import _ from 'lodash';
import { util } from '@appium/support';
import { waitForCondition } from 'asyncbox';
import type { CoreSimulator, InteractsWithApps, LaunchAppOptions } from '../types';

type CoreSimulatorWithApps = CoreSimulator & InteractsWithApps;

/**
 * Install valid .app package on Simulator.
 *
 * @param app The path to the .app package.
 */
export async function installApp(this: CoreSimulatorWithApps, app: string): Promise<void> {
  return await this.simctl.installApp(app);
}

/**
 * Returns user installed bundle ids which has 'bundleName' in their Info.Plist as 'CFBundleName'
 *
 * @param bundleName The bundle name of the application to be checked.
 * @return The list of bundle ids which have 'bundleName'
 */
export async function getUserInstalledBundleIdsByBundleName(
  this: CoreSimulatorWithApps,
  bundleName: string
): Promise<string[]> {
  const allApps = await this.simctl.listApps();
  const bundleIds = Object.values(allApps).filter((app: any) => app.ApplicationType === 'User' && app.CFBundleName === bundleName).map((app: any) => app.CFBundleIdentifier);
  this.log.debug(
    `The simulator has ${util.pluralize('bundle', bundleIds.length, true)} which ` +
    `have '${bundleName}' as their 'CFBundleName': ${JSON.stringify(bundleIds)}`
  );
  return bundleIds;
}

/**
 * Verify whether the particular application is installed on Simulator.
 *
 * @param bundleId The bundle id of the application to be checked.
 * @return True if the given application is installed.
 */
export async function isAppInstalled(this: CoreSimulatorWithApps, bundleId: string): Promise<boolean> {
  try {
    const allApps = await this.simctl.listApps();
    if (!allApps[bundleId]) {
      return false;
    }
  } catch {
    // get_app_container subcommand fails for system applications,
    // so we try the hidden appinfo subcommand, which prints correct info for
    // system/hidden apps
    try {
      await this.simctl.appInfo(bundleId);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Uninstall the given application from the current Simulator.
 *
 * @param bundleId The bundle ID of the application to be removed.
 */
export async function removeApp(this: CoreSimulatorWithApps, bundleId: string): Promise<void> {
  await this.simctl.removeApp(bundleId);
}

/**
 * Starts the given application on Simulator
 *
 * @param bundleId The bundle ID of the application to be launched
 * @param opts Launch options
 */
export async function launchApp(
  this: CoreSimulatorWithApps,
  bundleId: string,
  opts: LaunchAppOptions = {}
): Promise<void> {
  await this.simctl.launchApp(bundleId);
  const {
    wait = false,
    timeoutMs = 10000,
  } = opts;
  if (!wait) {
    return;
  }

  try {
    await waitForCondition(async () => await this.isAppRunning(bundleId), {
      waitMs: timeoutMs,
      intervalMs: 300
    });
  } catch {
    throw new Error(`App '${bundleId}' is not runnning after ${timeoutMs}ms timeout.`);
  }
}

/**
 * Stops the given application on Simulator.
 *
 * @param bundleId The bundle ID of the application to be stopped
 */
export async function terminateApp(this: CoreSimulatorWithApps, bundleId: string): Promise<void> {
  await this.simctl.terminateApp(bundleId);
}

/**
 * Check if app with the given identifier is running.
 *
 * @param bundleId The bundle ID of the application to be checked.
 */
export async function isAppRunning(this: CoreSimulatorWithApps, bundleId: string): Promise<boolean> {
  return (await this.ps()).some(({name}) => name === bundleId);
}

/**
 * Scrub (delete the preferences and changed files) the particular application on Simulator.
 * The app will be terminated automatically if it is running.
 *
 * @param bundleId Bundle identifier of the application.
 * @throws {Error} if the given app is not installed.
 */
export async function scrubApp(this: CoreSimulatorWithApps, bundleId: string): Promise<void> {
  return this.removeApp(bundleId);
}

