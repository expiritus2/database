import moment from 'moment';
import Api from 'store/effects/core/api';
import {
    setProfileFormStateAction,
    resetProfileFormStateAction,
    setInfoFormStateAction,
    resetInfoFormStateAction,
    setExperienceFormStateAction,
    resetExperienceFormStateAction,
    setFilesFormStateAction,
    resetFilesFormStateAction,
    submitApplicantFormAction,
    uploadFilesAction,
} from 'store/actions/forms';
import { createApplicant, uploadFiles } from 'api/applicants';
import { getState } from 'store';
import { cloneDeep } from 'lodash-es';

export const setProfileFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setProfileFormStateAction(cfg));
};

export const resetProfileFormStateEffect = () => (dispatch) => {
    dispatch(resetProfileFormStateAction());
};

export const setInfoFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setInfoFormStateAction(cfg));
};

export const resetInfoFormStateEffect = () => (dispatch) => {
    dispatch(resetInfoFormStateAction());
};

export const setExperienceFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setExperienceFormStateAction(cfg));
};

export const resetExperienceFormStateEffect = () => (dispatch) => {
    dispatch(resetExperienceFormStateAction());
};

export const setFilesFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setFilesFormStateAction(cfg));
};

export const resetFilesFormStateEffect = () => (dispatch) => {
    dispatch(resetFilesFormStateAction());
};

export const submitApplicantFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execBase({ action: uploadFilesAction, method: uploadFiles });
    const sendRequest = Api.execBase({ action: submitApplicantFormAction, method: createApplicant });
    const { forms: { applicant } } = getState();

    const formData = new FormData();
    applicant?.files?.files?.forEach((file) => {
        formData.append('files', file);
    });

    applicant?.info?.photos?.forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data } = response || {};
        const clonedApplicant = cloneDeep(applicant);

        clonedApplicant.files = data?.files;
        clonedApplicant.info.photos = data?.photos;
        clonedApplicant.profile.languages = clonedApplicant.profile.languages.map(({ value }) => value);
        clonedApplicant.profile.place = clonedApplicant.profile.place.map(({ value }) => value);
        // clonedApplicant.profile.position = clonedApplicant.profile.position.map(({ value }) => value);
        // clonedApplicant.profile.skills = clonedApplicant.profile.skills.map(({ value }) => value);
        clonedApplicant.info.birthDate = moment(clonedApplicant.info?.birthDate?.[0]).valueOf();

        dispatch(sendRequest(clonedApplicant, options, (err, resp) => {
            cb?.(err, resp);
        }));
    }));
};
