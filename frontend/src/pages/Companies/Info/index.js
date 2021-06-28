/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScrollWrapper, PendingWrapper, Information, InfoLinks, InfoRecruiters } from 'components';

import { useSelector } from 'react-redux';
import { getCurrentCompanySelector } from 'store/selectors/company';
import Activities from './Activities';
import Addresses from './Addresses';

import Actions from './Actions';
import Header from './Header';
import Empty from './Empty';

import styles from './styles.module.scss';
import Name from './Name';

const Info = (props) => {
    const { className } = props;
    const { company, isPending } = useSelector(getCurrentCompanySelector);

    return (
        <>
            <Header />
            {company || isPending ? (
                <>
                    {!isPending && <Actions />}
                    <ScrollWrapper className={classNames(classNames(styles.info, styles.scroll), className)}>
                        <PendingWrapper isPending={isPending}>
                            <Name {...company} />
                            <InfoRecruiters list={company?.users} />
                            <Activities list={company?.activities} />
                            <InfoLinks list={company?.links} />
                            <Addresses list={company?.addresses} />
                            <Information value={company?.info} />
                        </PendingWrapper>
                    </ScrollWrapper>
                </>
            ) : <Empty />}
        </>
    );
};

Info.propTypes = {
    className: PropTypes.string,
};

Info.defaultProps = {
    className: '',
};

export default Info;
