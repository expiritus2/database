import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableItem } from 'components';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const TableSkills = (props) => {
    const { list, className } = props;
    const { translate } = useTranslate();

    if (!list) return null;

    const getValue = () => list.map((item) => item?.label).join(', ');

    return (
        <div className={classNames(styles.skills, className)}>
            <TableItem label={`${translate.Skills}: `} value={getValue()} />
        </div>
    );
};

TableSkills.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

TableSkills.defaultProps = {
    className: '',
};

export default TableSkills;
