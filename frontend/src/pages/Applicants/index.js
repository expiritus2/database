import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getApplicantsEffect } from 'store/effects/applicant';
import { getApplicantsSelector } from 'store/selectors/applicants';
import { Header, PendingWrapper } from 'components';
import { IDLE, PENDING } from 'settings/constants/apiState';
import AddModal from './Modal';
import Table from './Table';

const Applicants = () => {
    const applicants = useSelector(getApplicantsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (applicants.state === IDLE) {
            dispatch(getApplicantsEffect());
        } else {
            dispatch(getApplicantsEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const isPending = applicants?.state === PENDING;

    return (
        <div>
            <Header />
            <PendingWrapper isPending={isPending}>
                <Table data={applicants?.data} />
            </PendingWrapper>
            <AddModal />
        </div>
    );
};

export default Applicants;
