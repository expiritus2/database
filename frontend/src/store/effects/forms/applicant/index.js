import moment from 'moment';
import Api from 'store/effects/core/api';
import {
    setApplicantExperienceFormStateAction,
    submitApplicantFormAction,
    uploadFilesAction,
    setApplicantFormStateAction,
    resetApplicantFormSelector,
} from 'store/actions/forms/applicant';
import { createApplicant, uploadFiles } from 'api/applicants';
import { getState } from 'store/index';
import { cloneDeep } from 'lodash-es';

export const setApplicantFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantFormStateAction(cfg));
};

export const setApplicantExperienceFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantExperienceFormStateAction(cfg));
};

export const resetApplicantFormEffect = () => (dispatch) => {
    dispatch(resetApplicantFormSelector());
};

export const submitApplicantFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execBase({ action: uploadFilesAction, method: uploadFiles });
    const sendRequest = Api.execBase({ action: submitApplicantFormAction, method: createApplicant });
    const { forms: { applicant } } = getState();

    const formData = new FormData();
    applicant?.files?.forEach((file) => {
        formData.append('files', file);
    });

    applicant?.photos?.forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data } = response || {};
        const clonedApplicant = cloneDeep(applicant);

        clonedApplicant.files = data?.files;
        clonedApplicant.photos = data?.photos;
        clonedApplicant.place = clonedApplicant?.place?.map(({ value }) => value);
        clonedApplicant.birthDate = moment(clonedApplicant?.birthDate?.[0]).valueOf();

        dispatch(sendRequest(clonedApplicant, options, (err, resp) => {
            if (!err) {
                dispatch(resetApplicantFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};
