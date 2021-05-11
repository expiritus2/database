import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getCurrentCompanySelector } from 'store/selectors/company';
import { SubheaderWrapper } from 'components';

import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const contact = useSelector(getCurrentCompanySelector);

    return (
        <SubheaderWrapper className={classNames(className)}>
            <PaddingWrapper>
                <h5>
                    <span className={styles.name}>
                        {contact?.id ? `${contact?.name} (#${contact?.id})` : null}
                    </span>
                </h5>
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
