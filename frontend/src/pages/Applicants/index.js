import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getApplicantsEffect } from 'store/effects/applicant';
import { getApplicantsSelector } from 'store/selectors/applicants';
import { Header, ContentWrapper } from 'components';
import AddModal from './Modal';
import Table from './Table';

const Applicants = () => {
    const { isIdle } = useSelector(getApplicantsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isIdle) {
            dispatch(getApplicantsEffect());
        } else {
            dispatch(getApplicantsEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    return (
        <div>
            <Header />
            <ContentWrapper>
                <Table />
            </ContentWrapper>
            <AddModal />
        </div>
    );
};

export default Applicants;
