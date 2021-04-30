import React, { useState } from 'react';
import styled from 'styled-components';
import fieldLineUp from '../fieldLineUp';
import MappedCards from '../components/MappedCards';

const Select = styled.select`
	border: 1px solid #0079C6;
	cursor: pointer;
	border-radius: 5px;
	margin-top: 15px;
	width: 100%;
	padding: 8px;
	-o-appearance: none;
	-ms-appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	&:active {
		border: 1px solid #0079C6;
	}
`;

const Option = styled.option`
	border: 1px solid rgba(224,210,210, 0.6);
`;

const Actions = styled.div`
	width: 300px;
	position: relative;
`;

const StickyContainer = styled.div`
	border: 1px solid rgba(224,210,210, 0.6);
	padding: 20px;
	border-radius: 5px;
`

const ItemsGrid = styled.div`
	display: flex;
	margin-top: 50px;
	padding-left: 30px;
	padding-right: 30px;
`;

const NavBar = styled.div`
	display: flex;
	padding-left: 30px;
	padding-right: 30px;
	margin-top: 40px;
`;

const NavItem = styled.div`
	width: 200px;
	text-align: center;
	padding: 5px 15px;
	cursor: pointer;
	border: 1px solid rgba(224,210,210, 0.6);
	margin-right: -0.5px;
`;

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
	const [view, setView] = useState('listView');
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
	const activeTabStyle = { background: '#0079C6', color: 'white'};

	return (
		<div>
			<NavBar>
				<NavItem
					style={view === 'listView' ? activeTabStyle : {}}
					onClick={() => setView('listView')}
				>
					List View
				</NavItem>
				<NavItem
					style={view === 'graphView' ? activeTabStyle : {}}
					onClick={() => setView('graphView')}
				>
					Graph View
				</NavItem>
			</NavBar>
			{view === 'listView' && (
				<ItemsGrid>
					<Actions>
						<StickyContainer>
							<div>Group By</div>
							<Select
								name="loans"
								id="loans"
								// onChange={(e) => {setSortBy(e.target.value)}}
							>
								<Option value={'term'}>Term</Option>
								<Option value={'year'}>Year</Option>
							</Select>
						</StickyContainer>
					</Actions>
					<div style={{ width: '100%'}}>
						{Object.keys(loansByTerm).map((groupName, value) => {
							const group = loansByTerm[groupName]
							return (
								<div style={{ marginTop: '15px', width: '100%' }}>
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
				</ItemsGrid>
			)}
		</div>
	)
}

export default LoanGroups;