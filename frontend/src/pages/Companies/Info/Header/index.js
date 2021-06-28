import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getCurrentCompanySelector } from 'store/selectors/company';
import { SubheaderWrapper, InfoHeaderName, PaddingWrapper } from 'components';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const { company } = useSelector(getCurrentCompanySelector);

    return (
        <SubheaderWrapper className={classNames(styles.header, className)}>
            <PaddingWrapper>
                <InfoHeaderName>
                    {company?.id ? `${company?.name} (#${company?.id})` : null}
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
