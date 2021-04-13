import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BaseAutocomplete } from 'components/index';

import { useTranslate } from 'hooks';

const Regions = (props) => {
    const { className, onChange, value } = props;

    const { translate } = useTranslate();

    return (
        <BaseAutocomplete
            label={translate.Regions}
            className={classNames(className)}
            onChange={onChange}
            value={value}
            options={[]}
        />
    );
};

Regions.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
};

Regions.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Regions;
