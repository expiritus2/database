import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Item } from 'pages/Vacancies/Info/components';

import styles from './styles.module.scss';

const Active = (props) => {
    const { className, value } = props;
    const { translate } = useTranslate();

    const getValue = () => {
        if (value) {
            return translate.SheActive;
        }

        return translate.SheNotActive;
    };

    return (
        <div className={classNames(styles.active, className)}>
            <Item
                label=""
                value={(
                    <div>
                        <span>{getValue()}</span>
                    </div>
                )}
            />
        </div>
    );
};

Active.propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool.isRequired,
};

Active.defaultProps = {
    className: '',
};

export default Active;
