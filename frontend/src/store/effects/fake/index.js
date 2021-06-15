import Api from 'store/effects/core/api';
import { generateDataAction } from 'store/actions/fake';
import { generateData } from 'api/fake';

export const generateDataEffect = Api.execResult({ action: generateDataAction, method: generateData });
