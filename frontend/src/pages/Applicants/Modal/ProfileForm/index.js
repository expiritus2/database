import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Input, Checkbox, Select, Education, Position, Skills } from 'components';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { ContentWrapper } from '../components';

import styles from './styles.module.scss';

const ProfileForm = ({ className }) => {
    const { translate } = useTranslate();

    return (
        <ContentWrapper className={classNames(className)}>
            <Input
                className={styles.field}
                label={translate.FIO}
            />
            <FormControlLabel
                className={classNames(styles.field, styles.inActiveSearch)}
                control={<Checkbox />}
                label={translate.InActiveSearch}
            />
            <Input
                type="number"
                className={styles.field}
                label={translate.Experience}
            />
            <FormControl className={classNames(styles.field, styles.formControl)}>
                <Input
                    type="number"
                    className={classNames(styles.salary)}
                    label={translate.Salary}
                />
                <Select
                    className={classNames(styles.currency)}
                    label={translate.Currency}
                    options={ProfileForm.currencyOptions}
                />
            </FormControl>
            <Education
                className={styles.field}
            />
            <Position
                className={styles.field}
            />
            <Skills
                className={styles.field}
            />
            <Input
                className={styles.field}
                label={translate.Place}
            />
            <Input
                className={styles.field}
                label={translate.Regions}
            />
            <Input
                className={styles.field}
                label={translate.Address}
            />
            <Input
                className={styles.field}
                label={translate.Languages}
            />
        </ContentWrapper>
    );
};

ProfileForm.currencyOptions = [
    { id: 'dollars', label: 'USD', value: 'dollars' },
    { id: 'euro', label: 'EU', value: 'euro' },
];

ProfileForm.propTypes = {
    className: PropTypes.string,
};

ProfileForm.defaultProps = {
    className: '',
};

export default ProfileForm;
