import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getCurrentContactSelector } from 'store/selectors/contact';
import { SubheaderWrapper, InfoHeaderName, PaddingWrapper } from 'components';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const { contact } = useSelector(getCurrentContactSelector);

    return (
        <SubheaderWrapper className={classNames(className)}>
            <PaddingWrapper>
                <InfoHeaderName className={styles.name}>
                    {contact?.id ? `${contact?.name} (#${contact?.id})` : null}
                </InfoHeaderName>
            </PaddingWrapper>
        </SubheaderWrapper>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

Header.defaultProps = {
    className: '',
};

export default Header;
