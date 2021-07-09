/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PendingWrapper, Information, InfoLinks, InfoRecruiters, InfoScrollWrapper, InfoRegions } from 'components';

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
                    <InfoScrollWrapper className={classNames(classNames(styles.info), className)}>
                        <PendingWrapper isPending={isPending}>
                            <Name {...company} />
                            <div className={styles.details}>
                                <InfoRecruiters list={company?.users} />
                                <Activities list={company?.activities} />
                                <InfoRegions list={company?.regions} />
                                <InfoLinks list={company?.links} />
                                <Addresses list={company?.addresses} />
                                <Information value={company?.info} />
                            </div>
                        </PendingWrapper>
                    </InfoScrollWrapper>
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
