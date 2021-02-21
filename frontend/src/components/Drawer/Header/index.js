import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from 'components';

const Header = ({ onClose, className }) => (
    <div className={classNames(className)}>
        <Button title="Cancel" onClick={onClose} />
    </div>
);

Header.propTypes = {
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
};

Header.defaultProps = {
    className: '',
};

export default Header;
