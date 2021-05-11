import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getCurrentApplicantSelector } from 'store/selectors/applicant';
import { SubheaderWrapper } from 'components';

import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const applicant = useSelector(getCurrentApplicantSelector);

    return (
        <SubheaderWrapper className={classNames(className)}>
            <PaddingWrapper>
                <h5>
                    <span className={styles.name}>
                        {applicant?.id ? `${applicant?.name} (#${applicant?.id})` : null}
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
