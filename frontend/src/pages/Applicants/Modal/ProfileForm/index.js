import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Input, Checkbox, Select } from 'components';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styles from './styles.module.scss';

const ProfileForm = ({ className }) => {
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.profileWrapper, className)}>
            <Input
                className={styles.field}
                variant="outlined"
                label={translate.FIO}
                size="small"
            />
            <FormControlLabel
                className={styles.field}
                control={<Checkbox />}
                label={translate.InActiveSearch}
            />
            <Input
                type="number"
                className={styles.field}
                variant="outlined"
                label={translate.Experience}
                size="small"
            />
            <FormControl className={styles.formControl}>
                <Input
                    type="number"
                    className={classNames(styles.field, styles.salary)}
                    variant="outlined"
                    label={translate.Salary}
                    size="small"
                />
                <Select
                    className={classNames(styles.field, styles.currency)}
                    label={translate.Currency}
                    options={ProfileForm.currencyOptions}
                />
            </FormControl>
        </div>
    );
};

ProfileForm.currencyOptions = [
    { id: 'dollars', label: '$', value: 'dollars' },
    { id: 'euro', label: 'E', value: 'euro' },
];

ProfileForm.propTypes = {
    className: PropTypes.string,
};

ProfileForm.defaultProps = {
    className: '',
};

export default ProfileForm;
