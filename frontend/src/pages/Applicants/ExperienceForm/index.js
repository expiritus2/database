/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { setApplicantExperienceFormStateEffect } from 'store/effects/forms/applicant';
import { getApplicantExperienceFormStateSelector } from 'store/selectors/applicantForm';
import { useTranslate } from 'hooks';
import { Period, Input, Position, Textarea, Button } from 'components';
import { cloneDeep } from 'lodash-es';
import { IoIosRemoveCircle } from 'react-icons/io';
import { experienceInitialData } from 'store/reducers/forms/applicant';
import { ContentWrapper } from '../components';

import Name from '../components/Name';

import styles from './styles.module.scss';

const ExperienceForm = (props) => {
    const { className } = props;

    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const modal = useSelector(getModalStateSelector);
    const experienceFormState = useSelector(getApplicantExperienceFormStateSelector);

    const formik = useFormik({
        initialValues: { ...experienceFormState },
        enableReinitialize: true,
    });

    const onCustomFieldChange = (val, propName, index) => {
        const clonedValue = cloneDeep(experienceFormState);
        clonedValue[index][propName] = val;
        dispatch(setApplicantExperienceFormStateEffect(clonedValue));
    };

    const onAdd = () => {
        const clonedValues = cloneDeep(experienceFormState);
        clonedValues.push(cloneDeep(experienceInitialData));
        dispatch(setApplicantExperienceFormStateEffect(clonedValues));
    };

    const onRemove = (index) => {
        const clonedValues = cloneDeep(experienceFormState);
        clonedValues.splice(index, 1);
        dispatch(setApplicantExperienceFormStateEffect(clonedValues));
    };

    return (
        <ContentWrapper className={classNames(styles.experienceForm, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Name />
                {experienceFormState?.map(({ period, company, position, info }, index) => (
                    <Paper key={index} className={styles.block} elevation={3}>
                        <div className={styles.fields}>
                            <Period
                                name="period"
                                className={styles.field}
                                onChange={(e, val, timestamps) => onCustomFieldChange(timestamps, 'period', index)}
                                defaultDate={period}
                            />
                            <Input
                                name="company"
                                label={translate.Company}
                                className={styles.field}
                                onChange={(e) => onCustomFieldChange(e.target.value, 'company', index)}
                                value={company}
                            />
                            <Position
                                className={styles.field}
                                onChange={(e, val) => onCustomFieldChange(val, 'position', index)}
                                value={position}
                            />
                            <Textarea
                                name="info"
                                className={styles.field}
                                label={translate.Info}
                                onChange={(e) => onCustomFieldChange(e.target.value, 'info', index)}
                                value={info}
                            />
                        </div>
                        <div>
                            {experienceFormState?.length > 1 && (
                                <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                            )}
                        </div>
                    </Paper>
                ))}
                <Button
                    className={classNames(styles.field, styles.addButton)}
                    color="primary"
                    onClick={onAdd}
                >
                    {translate.Add}
                </Button>
            </form>
        </ContentWrapper>
    );
};

ExperienceForm.propTypes = {
    className: PropTypes.string,
};

ExperienceForm.defaultProps = {
    className: '',
};

export default ExperienceForm;
