import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { Logger } from 'services';
import { useTranslate } from 'hooks';
import { Input, Checkbox, Education, Position, Skills, Textarea, Currency, NumberInput, Place } from 'components';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useSelector } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { ContentWrapper } from '../components';

import styles from './styles.module.scss';

const ProfileForm = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const modal = useSelector(getModalStateSelector);

    const formik = useFormik({
        initialValues: {
            name: '',
            inActiveSearch: false,
            experience: '',
            salary: '',
            currency: '',
            education: '',
            position: [],
            skills: [],
            place: [],
        },
        onSubmit(values) {
            Logger.log(values);
        },
    });

    const onActiveSearchChange = (e, val) => {
        formik.setFieldValue('inActiveSearch', val);
    };

    return (
        <ContentWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Input
                    name="name"
                    className={styles.field}
                    label={translate.FIO}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <FormControlLabel
                    className={classNames(styles.field, styles.inActiveSearch)}
                    control={<Checkbox onChange={onActiveSearchChange} checked={formik.values.inActiveSearch} />}
                    label={translate.InActiveSearch}
                />
                <Input
                    name="experience"
                    type="number"
                    className={styles.field}
                    label={translate.Experience}
                    onChange={formik.handleChange}
                    value={formik.values.experience}
                />
                <FormControl className={classNames(styles.field, styles.formControl)}>
                    <NumberInput
                        name="salary"
                        className={classNames(styles.salary)}
                        label={translate.Salary}
                        onChange={formik.handleChange}
                        value={formik.values.salary}
                    />
                    <Currency
                        name="currency"
                        className={styles.currency}
                        onChange={formik.handleChange}
                        value={formik.values.currency}
                    />
                </FormControl>
                <Education
                    name="education"
                    className={styles.field}
                    onChange={formik.handleChange}
                    value={formik.values.education}
                />
                <Position
                    className={styles.field}
                    onChange={(e, val) => formik.setFieldValue('position', val)}
                    value={formik.values.position}
                />
                <Skills
                    className={styles.field}
                    onChange={(e, val) => formik.setFieldValue('skills', val)}
                    value={formik.values.skills}
                />
                <Place
                    className={styles.field}
                    label={translate.Place}
                    onChange={(e, val) => formik.setFieldValue('place', val)}
                    value={formik.values.place}
                />
                <Input
                    name="regions"
                    className={styles.field}
                    label={translate.Regions}
                    onChange={formik.handleChange}
                    value={formik.values.regions}
                />
                <Input
                    name="address"
                    className={styles.field}
                    label={translate.Address}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />
                <Input
                    name="languages"
                    className={styles.field}
                    label={translate.Languages}
                    onChange={formik.handleChange}
                    value={formik.values.languages}
                />
                <Textarea
                    name="info"
                    className={styles.field}
                    label={translate.Info}
                    onChange={formik.handleChange}
                    value={formik.values.info}
                />
            </form>
        </ContentWrapper>
    );
};

ProfileForm.propTypes = {
    className: PropTypes.string,
};

ProfileForm.defaultProps = {
    className: '',
};

export default ProfileForm;
