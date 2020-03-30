import { SettingsAction, SettingsActionType } from './settings.actions';
import { DisplayRate } from 'src/app/models';
import Fraction from 'fraction.js';

export interface SettingsState {
  displayRate: DisplayRate;
  precision: Fraction;
  belt: string;
  assembler: string;
  furnace: string;
  drill: string;
  module: [string, string];
  beacons: [string, Fraction];
  oilRecipe: string;
  useCracking: boolean;
  fuel: string;
  miningBonus: Fraction;
}

export const initialSettingsState: SettingsState = {
  displayRate: DisplayRate.PerMinute,
  precision: null,
  belt: 'express-transport-belt',
  assembler: 'assembling-machine-3',
  furnace: 'electric-furnace',
  drill: 'electric-mining-drill',
  module: ['productivity-module-3', 'speed-module-3'],
  beacons: ['speed-module-3', new Fraction(0)],
  oilRecipe: 'advanced-oil-processing',
  useCracking: true,
  fuel: 'coal',
  miningBonus: new Fraction(0)
};

export function settingsReducer(
  state: SettingsState = initialSettingsState,
  action: SettingsAction
): SettingsState {
  switch (action.type) {
    case SettingsActionType.SET_DISPLAY_RATE: {
      return {
        ...state,
        ...{ displayRate: action.payload }
      };
    }
    case SettingsActionType.SET_BELT: {
      return {
        ...state,
        ...{ belt: action.payload }
      };
    }
    case SettingsActionType.SET_OIL_RECIPE: {
      return { ...state, ...{ oilRecipe: action.payload } };
    }
    case SettingsActionType.SET_USE_CRACKING: {
      return { ...state, ...{ useCracking: action.payload } };
    }
    default:
      return state;
  }
}