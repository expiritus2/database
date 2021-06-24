import { PENDING, READY, ERROR } from 'settings/constants/apiState';
import { showErrorMessage, convertErrors } from 'helpers/errors';

export default class Api {
    /**
     * @param action - redux-action function.
     * @param  method - request function returning Promise }
     * @returns function passing cfg = {}, options = {} for the method and cb(error, result) function
     */
    static execResult({ action, method }) {
        return (cfg = {}, options = {}, cb) => {
            const opts = { showError: true, ...options };
            return (
                Api.execFunc({ cfg, options: opts, action, method, cb })
            );
        };
    }

    /**
     *
     * @param cfg - params for request
     * @param options - passing callbacks for request
     * @param action - redux action
     * @param method - function for sending request
     * @param pending - inserted pending state to redux store
     * @param cb - callback by success or failure request
     * @returns {function(*): Promise<void>}
     */
    static execFunc({ cfg, options, action, method, cb }) {
        const { showError, ...opts } = options;

        return async (dispatch) => {
            if (!options.silent) {
                Api.setPending({ dispatch, action });
            }

            try {
                const response = await method(cfg, opts);
                Api.setData({ dispatch, action, cfg: { ...cfg, ...response.meta }, response });

                if (typeof cb === 'function') {
                    cb(null, response, dispatch);
                }

                return response;
            } catch (err) {
                const config = {
                    ...cfg,
                    status: err?.response?.status || err?.networkError?.statusCode,
                    message: err.message,
                };

                Api.setError({ dispatch, action, cfg: config, response: err, errors: err?.response?.data?.errors });

                if (typeof cb === 'function') {
                    cb(err, null, dispatch);
                }

                if (showError) {
                    showErrorMessage(err);
                }

                throw err;
            }
        };
    }

    /**
     *
     * @param dispatch - redux dispatch
     * @param action - redux action (redux-actions library)
     */
    static setPending({ dispatch, action }) {
        dispatch(action({ state: PENDING }));
    }

    /**
     *
     * @param dispatch - redux dispatch
     * @param action - redux action
     * @param cfg - request params
     * @param response
     */
    static setData({ dispatch, action, cfg, response }) {
        dispatch(action({ state: READY, data: response.data, meta: cfg }));
    }

    /**
     *
     * @param dispatch - redux dispatch
     * @param action - redux action
     * @param cfg - request params
     * @param errors
     */
    static setError({ dispatch, action, cfg, errors }) {
        dispatch(action({ state: ERROR, data: undefined, meta: cfg, errors: convertErrors(errors) }));
    }
}
