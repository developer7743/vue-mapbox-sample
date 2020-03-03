import MAP_POINT_TYPES from './mapPointTypes';
import CONTEXT_MENU_MODES from './contextMenuModeTypes';

export default Object.freeze({
  [CONTEXT_MENU_MODES.MAP]: Object.freeze([
    {
      type: MAP_POINT_TYPES.GOING_FROM,
      name: 'Create Going From Point',
    },
    {
      type: MAP_POINT_TYPES.VIA,
      name: 'Create Via Point',
    },
    {
      type: MAP_POINT_TYPES.GOING_TO,
      name: 'Create Going To Point',
    },
  ]),
  [CONTEXT_MENU_MODES.POINT]: Object.freeze([
    {
      type: MAP_POINT_TYPES.GOING_FROM,
      name: 'Make Going From Point',
    },
    {
      type: MAP_POINT_TYPES.VIA,
      name: 'Make Via Point',
    },
    {
      type: MAP_POINT_TYPES.STAY,
      name: 'Make Stay Point',
    },
    {
      type: MAP_POINT_TYPES.GOING_TO,
      name: 'Make Going To Point',
    },
    {
      name: 'Remove Point',
    },
  ]),
});