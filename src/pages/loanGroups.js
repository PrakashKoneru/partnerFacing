import React, { useState } from 'react';
import styled from 'styled-components';
import fieldLineUp from '../fieldLineUp';
import MappedCards from '../components/MappedCards';
import moment from 'moment';

const GroupActions = styled.div`
	padding: 10px 5px;
	max-width: 80%;
	margin: auto;
	margin-left: 30px;
	display: flex;
	white-space: nowrap;
`

const Card = styled.div`
	padding: 10px 5px;
	border-radius: 5px;
	max-width: 80%;
	display: flex;
	align-items: center;
	border: 1px solid rgba(224,210,210, 0.6);
	margin-bottom: 25px;
	margin-left: 30px;
`

const LoanGroups = (props) => {
	const [expandedLoanGroup, setExpandedLoanGroup] = useState(null)
	const allLoans = JSON.parse(localStorage.getItem('acceptedData'));
	const loansByTerm = allLoans.reduce((loan, value) => {
		// var oneDate = moment(loan[value.issue_d], 'DD-MM-YYYY');
    // var monthName = oneDate.format('MMMM');

		console.log(loan, 'loan avlue');
		// Group initialization
		if (!loan[value.grade]) {
			loan[value.grade] = {
				loans: [],
				loan_amnt: 0,
			};
		}
	 
		// Grouping
		loan[value.grade]['loans'] = [...loan[value.grade]['loans'], value];
		loan[value.grade]['loan_amnt'] = loan[value.grade]['loan_amnt'] + parseInt(value['loan_amnt'], "10")
		return loan;
	}, {});

	return (
		<div>
			<div style={{ width: '80%', marginLeft: '30px', marginTop: '30px' }}>
				Grouped By <span style={{ fontWeight: '600' }}>Term</span>
			</div>
			{Object.keys(loansByTerm).map((groupName, value) => {
				const group = loansByTerm[groupName]
				console.log(group);
				return (
					<div style={{ marginTop: '15px' }}>
						<GroupActions>
							<div style={{ width: '100%' }}>{groupName}</div>
							<div style={{ width: 'auto', display: 'flex' }}>
								<div
									style={{ padding: '5px 10px', cursor: 'pointer'}}
									onClick={() => setExpandedLoanGroup(groupName)}
								>
									Expand
								</div>
								<div
									style={{ padding: '5px 10px', cursor: 'pointer'}}
									onClick={() => setExpandedLoanGroup(null)}
								>
									Collapse All
								</div>
							</div>
						</GroupActions>
						{console.log(expandedLoanGroup !== groupName)}
						{expandedLoanGroup !== groupName ? (
							<Card>
								<div>
									<div style={{ fontWeight: '500' }}>
										Loan Amount
									</div>
									<div style={{ marginTop: '10px' }}>
										{Math.round(group['loan_amnt'] / group['loans'].length * 100) / 100}
									</div>
								</div>
							</Card>
						) : (
							<div>
								{group['loans'].map((loan, index) => {
									return (
										<Card key={Math.random()}>
											<MappedCards
												member={loan}
												index={index}
												fieldLineUp={fieldLineUp}
												noActions
											/>
										</Card>
									)
								})}
							</div>
						)}
					</div>
				);
			})}
		</div>
	)
}

export default LoanGroups;