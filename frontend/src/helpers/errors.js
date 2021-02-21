import { get } from 'lodash-es';
import * as toastr from 'toastr';

const loopErrors = (errors) => {
    if (errors && Array.isArray(errors)) {
        errors.forEach((error) => {
            toastr.error(error?.message);
        });
    }
};

export const showErrorMessage = (err) => {
    if (typeof err === 'string') {
        return toastr.error(err);
    }

    const backendErrorMessage = get(err, 'response.data.message');
    if (backendErrorMessage) {
        return toastr.error(backendErrorMessage);
    }

    const axiosErrors = get(err, 'response.data.errors');
    if (axiosErrors) {
        return loopErrors(axiosErrors);
    }

    const message = get(err, 'message');
    if (message) {
        return toastr.error(message);
    }
};
