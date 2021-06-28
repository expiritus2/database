import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getCurrentApplicantSelector } from 'store/selectors/applicant';
import { SubheaderWrapper, InfoHeaderName, PaddingWrapper } from 'components';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const { applicant } = useSelector(getCurrentApplicantSelector);

    return (
        <SubheaderWrapper className={classNames(styles.header, className)}>
            <PaddingWrapper>
                <InfoHeaderName>
                    {applicant?.id ? `${applicant?.name} (#${applicant?.id})` : null}
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
