import { Control } from "../constants/control.js";
import { SpecialMoveButton, SpecialMoveDirection } from "../constants/fighter.js";
import * as control from "../inputHandler.js";

const historyCap = 10;
const MoveDelay = 150;

// Historique des contrôles
export const controlHistory = [
  [{
    time: 0,
    move: undefined,
    buttons: [false, false, false, false, false, false],
    buttonsConsumed: [false, false, false, false, false, false], // Ajout de l'état des boutons consommés
  }],
  [{
    time: 0,
    move: undefined,
    buttons: [false, false, false, false, false, false],
    buttonsConsumed: [false, false, false, false, false, false], // Ajout de l'état des boutons consommés
  }],
];

export const buttonOrder = [
  Control.LIGHT_Kick, Control.MEDIUM_Kick,
  Control.HEAVY_Kick, Control.LIGHT_PUNCH,
  Control.MEDIUM_PUNCH, Control.HEAVY_PUNCH
];

// Obtenir la direction du mouvement
function getMoveDirection(controls) {
  if (controls.forward) {
    if (controls.down) return SpecialMoveDirection.FORWARD_DOWN;
    if (controls.up) return SpecialMoveDirection.FORWARD_UP;
    return SpecialMoveDirection.FORWARD;
  } else if (controls.backward) {
    if (controls.down) return SpecialMoveDirection.BACKWARD_DOWN;
    if (controls.up) return SpecialMoveDirection.BACKWARD_UP;
    return SpecialMoveDirection.BACKWARD;
  } else if (controls.down) {
    return SpecialMoveDirection.DOWN;
  } else if (controls.up) {
    return SpecialMoveDirection.UP;
  }

  return SpecialMoveDirection.NONE;
}

// Obtenir l'instantané des contrôles actuels
function getCurrentControlSnashot(time, id, direction) {
  const polledControls = {
    forward: control.isForward(id, direction),
    backward: control.isBackward(id, direction),
    down: control.isDown(id, direction),
    up: control.isUp(id, direction),
  };

  return {
    time: time.previous,
    move: getMoveDirection(polledControls),
    buttons: buttonOrder.map((button) => control.isControlDown(id, button)),
    buttonsConsumed: [false, false, false, false, false, false] // Réinitialisation des boutons consommés
  };
}

// Vérifier si l'instantané précédent est différent du nouveau
function isLastSnapshotDifferent(snapshot, id) {
  if (
    controlHistory[id][0].move !== snapshot.move
    || controlHistory[id][0].buttons.some((button, index) => snapshot.buttons[index] !== button)
  ) {
    return true;
  }
  return false;
}

// Vérifier si un contrôle a été effectué
function hasControlMatched(control, id) {
  switch (control) {
    case SpecialMoveButton.ANY_PUNCH:
      for (let buttonIndex = 3; buttonIndex < 6; buttonIndex++) {
        if (controlHistory[id][0].buttons[buttonIndex] && !controlHistory[id][0].buttonsConsumed[buttonIndex]) {
          controlHistory[id][0].buttonsConsumed[buttonIndex] = true;  // Marquer comme consommé
          return buttonOrder[buttonIndex];
        }
      }
      break;
    case SpecialMoveButton.L_PUNCH:
      if (controlHistory[id][0].buttons[3] && !controlHistory[id][0].buttonsConsumed[3]) {
        controlHistory[id][0].buttonsConsumed[3] = true;  // Marquer comme consommé
        return buttonOrder[3];
      }
      break;
    case SpecialMoveButton.M_PUNCH:
      if (controlHistory[id][0].buttons[4] && !controlHistory[id][0].buttonsConsumed[4]) {
        controlHistory[id][0].buttonsConsumed[4] = true;  // Marquer comme consommé
        return buttonOrder[4];
      }
      break;
    case SpecialMoveButton.H_PUNCH:
      if (controlHistory[id][0].buttons[5] && !controlHistory[id][0].buttonsConsumed[5]) {
        controlHistory[id][0].buttonsConsumed[5] = true;  // Marquer comme consommé
        return buttonOrder[5];
      }
      break;
    case SpecialMoveButton.ANY_KICK:
      for (let buttonIndex = 0; buttonIndex < 3; buttonIndex++) {
        if (controlHistory[id][0].buttons[buttonIndex] && !controlHistory[id][0].buttonsConsumed[buttonIndex]) {
          controlHistory[id][0].buttonsConsumed[buttonIndex] = true;  // Marquer comme consommé
          return buttonOrder[buttonIndex];
        }
      }
      break;
    case SpecialMoveButton.L_Kick:
      if (controlHistory[id][0].buttons[0] && !controlHistory[id][0].buttonsConsumed[0]) {
        controlHistory[id][0].buttonsConsumed[0] = true;  // Marquer comme consommé
        return buttonOrder[0];
      }
      break;
    case SpecialMoveButton.M_Kick:
      if (controlHistory[id][0].buttons[1] && !controlHistory[id][0].buttonsConsumed[1]) {
        controlHistory[id][0].buttonsConsumed[1] = true;  // Marquer comme consommé
        return buttonOrder[1];
      }
      break;
    case SpecialMoveButton.H_Kick:
      if (controlHistory[id][0].buttons[2] && !controlHistory[id][0].buttonsConsumed[2]) {
        controlHistory[id][0].buttonsConsumed[2] = true;  // Marquer comme consommé
        return buttonOrder[2];
      }
      break;
    default:
      if (control === controlHistory[id][0].move) return true;
  }
  return false;
}

// Fonction pour mettre à jour l'état des contrôles
export function pollControl(time, id, direction) {
  const currentControlSnapshot = getCurrentControlSnashot(time, id, direction);

  if (!isLastSnapshotDifferent(currentControlSnapshot, id)) return;

  controlHistory[id].unshift(currentControlSnapshot);
  if (controlHistory[id].length == historyCap) controlHistory[id].pop();
}

// Vérifier si un mouvement spécial a été exécuté
export function hasSpecialMoveBeenExecuted(specialMove, id, time) {
  const controlMatched = hasControlMatched(specialMove.sequence[specialMove.cursor], id);
  if (!controlMatched) {
    if (controlHistory[id][0].time + MoveDelay < time.previous && specialMove.cursor > 1) {
      specialMove.cursor = 0;
    }
    return false;
  }
  if (specialMove.cursor === specialMove.sequence.length - 1) {
    specialMove.cursor = 0;
    return controlMatched;
  }

  specialMove.cursor += 1;

  return false;
}

// Réinitialiser l'état des boutons consommés après un délai
function resetConsumedButtons(id) {
  const currentTime = Date.now();
  if (currentTime - controlHistory[id][0].time > MoveDelay) {
    controlHistory[id][0].buttonsConsumed = [false, false, false, false, false, false];
  }
}
