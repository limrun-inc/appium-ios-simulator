// transpile:main

import { getSimulator } from './lib/simulator';
import { killAllSimulators, simExists } from './lib/utils';
import { setLimrunIosClient } from 'appium-xcode';

export { getSimulator, killAllSimulators, simExists, setLimrunIosClient };

export type * from './lib/types';
