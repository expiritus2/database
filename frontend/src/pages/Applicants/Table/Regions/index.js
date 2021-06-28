import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableItem } from 'components';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Regions = (props) => {
    const { regions, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.regions, className)}>
            <TableItem label={`${translate.Regions}: `} value={regions.join(', ')} />
        </div>
    );
};

Regions.propTypes = {
    className: PropTypes.string,
    regions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Regions.defaultProps = {
    className: '',
};

export default Regions;
