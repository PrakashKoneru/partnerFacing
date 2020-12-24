import React, { useState } from 'react';
import acceptedData from './acceptedData';
import styled from 'styled-components'
import MappedCards from './components/MappedCards';
import Header from './components/Header';

const fieldLineUp = [
	{
		title: 'Funded Amount',
		def: 'funded_amnt'
	},
	{
		title: 'Term',
		def: 'term'
	},
	{
		title: 'Interest Rate',
		def: 'int_rate'
	},
	{
		title: 'Annual Income',
		def: 'annual_inc'
	},
	{
		title: 'Loan Grade',
		def: 'grade'
	},
	{
		title: 'Installment Size',
		def: 'installment'
	},
	{
		title: 'Employer Name',
		def: 'emp_title'
	},
	{
		title: 'Home Ownership',
		def: 'home_ownership'
	},
	{
		title: 'Verification Status',
		def: 'verification_status'
	},
	{
		title: 'Issue Date',
		def: 'issue_d'
	},
	{
		title: 'Last Payment Date',
		def: 'last_pymnt_d'
	},
	{
		title: 'Loan Status',
		def: 'loan_status'
	},
	{
		title: 'Fico High',
		def: 'fico_range_high'
	},
	{
		title: 'Inquiries',
		def: 'inq_last_6mths'
	},
	{
		title: 'Open Accounts',
		def: 'open_acc'
	},
];

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

const ItemsGrid = styled.div`
	display: flex;
	margin-top: 20px;
	padding-left: 30px;
	padding-right: 30px;
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

const DisplayItems = styled.div`
	width: 80%;
`;

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

const Input = styled.input`
	width: 50px;
	margin-right: 20px;
	border: 1px solid rgba(224,210,210, 0.6);
	border-radius: 5px;
`;

export default function Home() {
		const [sortBy, setSortBy] = useState('funded_amnt');
    return (
			<div>
				<Header />
				<NavBar>
					<NavItem style={{ background: '#0079C6', color: 'white'}}>New Loans</NavItem>
					<NavItem>Pending Loans</NavItem>
					<NavItem>Approved Loans</NavItem>
					<NavItem>Rejected Loans</NavItem>
				</NavBar>
				<ItemsGrid>
					<Actions>
						<StickyContainer>
							<div>
								<div style={{ fontWeight: '700' }}>Sort By :</div>
								<Select
									name="loans"
									id="loans"
									onChange={(e) => setSortBy(e.target.value)}
								>
									{fieldLineUp.map((item) => {
										return(<Option value={item.def}>{item.title}</Option>)
									})}
								</Select>
							</div>
							<div style={{ marginTop: '30px'}}>
								<div style={{ fontWeight: '700' }}>Filter By :</div>
								<div>
									<div style={{fontSize: '14px', marginTop: '15px'}}>
										<div style={{ fontWeight: '400' }}>Funded Amount</div>
										<div style={{display: 'flex', marginTop: '7px'}}>
											<Input placeholder="min" />
											<Input placeholder="max" />
										</div>
									</div>
									<div style={{fontSize: '14px', marginTop: '15px'}}>
										<div style={{ fontWeight: '400' }}>Annual Income</div>
										<div style={{display: 'flex', marginTop: '7px'}}>
											<Input placeholder="min" type="number" />
											<Input placeholder="max" type="number" />
										</div>
									</div>
									<div style={{fontSize: '14px', marginTop: '15px'}}>
										<div style={{ fontWeight: '400' }}>Loan Grade</div>
										<div style={{display: 'flex', marginTop: '7px'}}>
											<Select style={{ marginTop: '0px', fontSize: '14px', border: '1px solid rgba(224,210,210, 0.6)'}}>
												<option>---</option>
												<option value="A">A</option>
												<option value="B">B</option>
												<option value="C">C</option>
											</Select>
										</div>
									</div>
								</div>
							</div>
						</StickyContainer>
					</Actions>
					<DisplayItems>
						{acceptedData.sort((a, b) => a[sortBy] - b[sortBy]).map((member, index) => {
							return (
								<Card key={Math.random()}>
									<MappedCards member={member} index={index} fieldLineUp={fieldLineUp}/>
								</Card>
							)
						})}
					</DisplayItems>
				</ItemsGrid>
			</div>
    )
}