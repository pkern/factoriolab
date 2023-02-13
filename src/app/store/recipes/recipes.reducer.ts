import { Entities, IdDefaultPayload, RecipeSettings } from '~/models';
import { StoreUtility } from '~/utilities';
import { Items } from '../';
import * as App from '../app.actions';
import * as Settings from '../settings';
import { RecipesAction, RecipesActionType } from './recipes.actions';

export type RecipesState = Entities<RecipeSettings>;

export const initialRecipesState: RecipesState = {};

export function recipesReducer(
  state: RecipesState = initialRecipesState,
  action:
    | RecipesAction
    | App.AppAction
    | Settings.SetModAction
    | Items.ResetCheckedAction
): RecipesState {
  switch (action.type) {
    case App.AppActionType.LOAD:
      return { ...initialRecipesState, ...action.payload.recipesState };
    case App.AppActionType.RESET:
    case Settings.SettingsActionType.SET_MOD:
      return initialRecipesState;
    case RecipesActionType.SET_FACTORY:
      return StoreUtility.resetFields(
        StoreUtility.compareReset(state, 'factoryId', action.payload),
        ['factoryModuleIds', 'beacons'],
        action.payload.id
      );
    case RecipesActionType.SET_FACTORY_MODULES:
      return StoreUtility.compareReset(
        state,
        'factoryModuleIds',
        action.payload
      );
    case RecipesActionType.ADD_BEACON:
      return {
        ...state,
        ...{
          [action.payload]: {
            ...(state[action.payload] ?? {}),
            ...{
              beacons: [...(state[action.payload]?.beacons ?? [{}]), {}],
            },
          },
        },
      };
    case RecipesActionType.REMOVE_BEACON:
      return {
        ...state,
        ...{
          [action.payload.id]: {
            ...state[action.payload.id],
            ...{
              beacons: (state[action.payload.id].beacons ?? [{}]).filter(
                (v, i) => i !== action.payload.value
              ),
            },
          },
        },
      };
    case RecipesActionType.SET_BEACON_COUNT:
      return StoreUtility.compareResetIndex(
        state,
        'beacons',
        'count',
        action.payload
      );
    case RecipesActionType.SET_BEACON:
      return StoreUtility.resetFieldIndex(
        StoreUtility.compareResetIndex(state, 'beacons', 'id', action.payload),
        'beacons',
        'moduleIds',
        action.payload.index,
        action.payload.id
      );
    case RecipesActionType.SET_BEACON_MODULES:
      return StoreUtility.compareResetIndex(
        state,
        'beacons',
        'moduleIds',
        action.payload,
        true
      );
    case RecipesActionType.SET_BEACON_TOTAL:
      return StoreUtility.assignIndexValue(
        state,
        'beacons',
        'total',
        action.payload
      );
    case RecipesActionType.SET_OVERCLOCK:
      return StoreUtility.compareReset(state, 'overclock', action.payload);
    case RecipesActionType.SET_COST:
      return StoreUtility.compareReset(
        state,
        'cost',
        action.payload as IdDefaultPayload
      );
    case RecipesActionType.SET_CHECKED:
      return StoreUtility.compareReset(state, 'checked', {
        id: action.payload.id,
        value: action.payload.value,
        def: false,
      });
    case RecipesActionType.RESET_RECIPE: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case RecipesActionType.RESET_RECIPE_MODULES:
      return StoreUtility.resetFields(
        state,
        ['factoryModuleIds', 'beacons'],
        action.payload
      );
    case RecipesActionType.RESET_FACTORIES:
      return StoreUtility.resetFields(state, [
        'factoryId',
        'overclock',
        'factoryModuleIds',
        'beacons',
      ]);
    case RecipesActionType.RESET_BEACONS:
      return StoreUtility.resetField(state, 'beacons');
    case RecipesActionType.RESET_COST:
      return StoreUtility.resetField(state, 'cost');
    case Items.ItemsActionType.RESET_CHECKED:
      return StoreUtility.resetField(state, 'checked');
    default:
      return state;
  }
}
