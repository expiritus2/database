import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Select } from 'components/Form';

import styles from './styles.module.scss';

const DisplayControls = (props) => {
    const { translate } = useTranslate();
    const { className, rowsPerPage, page, count, onChangeCountPerPage } = props;

    const getFrom = () => (page * rowsPerPage) + 1;
    const getTo = () => {
        const toCount = getFrom() + rowsPerPage - 1;
        if (count >= toCount) {
            return toCount;
        }

        return count;
    };

    return (
        <div className={classNames(styles.displayControls, className)}>
            <div className={styles.info}>
                <span>{`${getFrom()}-`}</span>
                <span>{getTo()}</span>
                <span className={styles.of}>{translate.Of}</span>
                <span>{count}</span>
            </div>
            <div className={styles.rowsPerPage}>
                <div className={styles.text}>{translate.RowsPerPage}</div>
                <Select
                    value={rowsPerPage}
                    options={DisplayControls.rowsPerPageOptions}
                    onChange={onChangeCountPerPage}
                    className={styles.rowsPerPageSelectWrapper}
                    menuTop
                />
            </div>
        </div>
    );
};

DisplayControls.rowsPerPageOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '100', value: 100 },
];

DisplayControls.propTypes = {
    className: PropTypes.string,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    count: PropTypes.number,
    onChangeCountPerPage: PropTypes.func,
};

DisplayControls.defaultProps = {
    className: '',
    onChangeCountPerPage: () => {},
    count: null,
};

export default DisplayControls;
