import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Checkbox } from 'components/Form';

import styles from './styles.module.scss';

const Active = (props) => {
    const { onChange, className, search } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.actives, className)}>
            <Checkbox
                direction={Checkbox.DIRECTION_RIGHT}
                className={classNames(styles.actives)}
                labelTextClassName={styles.activesText}
                label={translate.Active}
                labelClassName={styles.activesLabel}
                onChange={(e, val, checked) => onChange(e, checked)}
                checked={search?.active}
            />
        </div>
    );
};

Active.propTypes = {
    className: PropTypes.string,
    search: PropTypes.shape({
        active: PropTypes.bool,
    }).isRequired,
    onChange: PropTypes.func,
};

Active.defaultProps = {
    className: '',
    onChange: () => {},
};

export default Active;
