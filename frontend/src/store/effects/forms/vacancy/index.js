import Api from 'store/effects/core/api';
import {
    submitVacancyFormAction,
    uploadVacancyFilesAction,
    setVacancyFormStateAction,
    resetVacancyFormAction,
    setVacancyFormDataAction,
    updateVacancyFormAction,
} from 'store/actions/forms/vacancy';
import { createVacancy, updateVacancy } from 'api/vacancies';
import { uploadFiles } from 'api/common';
import { getState } from 'store/index';
import { prepareData } from './helpers';

export const setVacancyFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setVacancyFormStateAction(cfg));
};

export const resetVacancyFormEffect = () => (dispatch) => {
    dispatch(resetVacancyFormAction());
};

export const submitVacancyFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execBase({ action: uploadVacancyFilesAction, method: uploadFiles });
    const sendRequest = Api.execBase({ action: submitVacancyFormAction, method: createVacancy });
    const { forms: { vacancy } } = getState();

    const formData = new FormData();

    if (vacancy?.test) {
        formData.append('test', vacancy?.test);
    }

    vacancy?.files?.forEach((file) => {
        if (file?.data) {
            formData.append('files', file?.data);
        }
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data: uploadedFiles } = response || {};
        const clonedVacancy = prepareData(vacancy, uploadedFiles);

        dispatch(sendRequest(clonedVacancy, options, (err, resp) => {
            if (!err) {
                dispatch(resetVacancyFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};

export const updateVacancyFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execBase({ action: uploadVacancyFilesAction, method: uploadFiles });
    const sendRequest = Api.execBase({ action: updateVacancyFormAction, method: updateVacancy });
    const { forms: { vacancy } } = getState();

    const formData = new FormData();

    if (vacancy?.test instanceof File) {
        formData.append('test', vacancy?.test);
    }

    vacancy?.files?.filter((file) => file instanceof File).forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data: uploadedFiles } = response || {};
        const clonedVacancy = prepareData(vacancy, uploadedFiles);

        dispatch(sendRequest(clonedVacancy, options, (err, resp) => {
            if (!err) {
                dispatch(resetVacancyFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};

export const setVacancyFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setVacancyFormDataAction(cfg));
};
