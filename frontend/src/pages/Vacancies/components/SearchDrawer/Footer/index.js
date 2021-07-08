import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getScrollbarWidth, setUnit } from 'helpers';
import { Button } from 'components/Form';

import styles from './styles.module.scss';

const Footer = (props) => {
    const { className, onReset, onSearch } = props;

    return (
        <div style={{ paddingRight: `${setUnit(20 + getScrollbarWidth())}` }} className={classNames(styles.footer, className)}>
            <Button onClick={onReset} title="Reset" />
            <Button onClick={onSearch} title="Search" />
        </div>
    );
};

Footer.propTypes = {
    className: PropTypes.string,
    onReset: PropTypes.func,
    onSearch: PropTypes.func,
};

Footer.defaultProps = {
    className: '',
    onReset: () => {},
    onSearch: () => {},
};

export default Footer;
