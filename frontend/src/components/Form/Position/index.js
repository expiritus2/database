import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BaseAutocomplete } from 'components';

import { useTranslate } from 'hooks';

const Position = (props) => {
    const { className, onChange, value } = props;

    const { translate } = useTranslate();

    return (
        <BaseAutocomplete
            label={translate.Position}
            className={classNames(className)}
            onChange={onChange}
            value={value}
            options={[]}
        />
    );
};

Position.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
};

Position.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Position;
