import { FuturePickValue } from '~/types/CustomSettings';

export const getFuturePickStr = (futurePickValue: FuturePickValue) => {
    switch (futurePickValue) {
        case FuturePickValue.VERY_LOW:
          return "Very low";
        case FuturePickValue.LOW:
          return "Low";
        case FuturePickValue.MEDIUM:
          return "Medium";
        case FuturePickValue.HIGH:
          return "High";
        case FuturePickValue.VERY_HIGH:
          return "Very high";
        default:
          return "Medium";
      }
}

export const getBonusFuturePickAdjustment = (futurePickValue: FuturePickValue) => {
    switch (futurePickValue) {
      case FuturePickValue.VERY_LOW:
        return -50;
      case FuturePickValue.LOW:
        return -25;
      case FuturePickValue.MEDIUM:
        return 0;
      case FuturePickValue.HIGH:
        return 25;
      case FuturePickValue.VERY_HIGH:
        return 50;
      default:
        return 0;
    }
  };
  