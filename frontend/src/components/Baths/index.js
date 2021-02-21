/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ButtonGroup } from 'components';

import styles from './styles.module.scss';

const Baths = (props) => {
    const { className, isPending, label, onChange, testid, buttonClassName, buttonGroupClassName } = props;

    return (
        <div className={classNames(styles.bathsWrapper, className)}>
            <ButtonGroup
                label={label}
                buttons={Baths.options}
                defaultValue={[Baths.options[0].id]}
                onChange={(val) => onChange(val[0])}
                disabled={isPending}
                multiple={false}
                testid={testid}
                buttonClassName={buttonClassName}
                buttonGroupClassName={buttonGroupClassName}
            />
        </div>
    );
};

Baths.options = [
    { id: 'any', label: 'Any' },
    { id: 1, label: '1+' },
    { id: 2, label: '2+' },
    { id: 3, label: '3+' },
    { id: 4, label: '4+' },
    { id: 5, label: '5+' },
];

Baths.propTypes = {
    className: PropTypes.string,
    buttonGroupClassName: PropTypes.string,
    isPending: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    testid: PropTypes.string,
    buttonClassName: PropTypes.shape({}),
};

Baths.defaultProps = {
    className: '',
    buttonGroupClassName: '',
    isPending: false,
    label: 'Baths',
    onChange: () => {},
    testid: '',
    buttonClassName: {},
};

export default Baths;
