import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Checkbox } from 'components';

import styles from '../../styles.module.scss';

const SelectAll = ({ data, selections, onChange }) => {
    const checked = !!data.length && (data.length === selections.length);

    return (
        <th className={styles.select}>
            <Checkbox
                className={classNames(styles.checkbox, styles.select__all)}
                onChange={onChange}
                checked={checked}
            />
        </th>
    );
};

SelectAll.propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    selections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SelectAll;
