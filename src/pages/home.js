import React, { useState } from 'react';
// import acceptedData from '../acceptedData';
import styled from 'styled-components'
import MappedCards from '../components/MappedCards';
import fieldLineUp from '../fieldLineUp';

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
	width: 85%;
	max-height: calc(100vh - 175px);
	overflow: scroll;
`;

const Card = styled.div`
	padding: 10px 5px;
	border-radius: 5px;
	max-width: 90%;
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
	// const acceptedData = JSON.parse(localStorage.getItem('acceptedData'));
	const [acceptedData, setAcceptedData] = useState(JSON.parse(localStorage.getItem('acceptedData')));
	const [sortBy, setSortBy] = useState('funded_amnt');
	const [filterBy, setFilterBy] = useState('new');
	const activeTabStyle = { background: '#0079C6', color: 'white'};
	// console.log(acceptedData, 'acceptedData');
    return (
			<div>
				<NavBar>
					<NavItem
						style={filterBy === 'new' ? activeTabStyle : {}}
						onClick={() => setFilterBy('new')}
					>
						New Loans({(acceptedData.filter((each) => each.approval_status === 'new').length)})
					</NavItem>
					<NavItem
						style={filterBy === 'pending' ? activeTabStyle : {}}
						onClick={() => setFilterBy('pending')}
					>
						Pending Loans({(acceptedData.filter((each) => each.approval_status === 'pending').length)})
					</NavItem>
					<NavItem
						style={filterBy === 'approved' ? activeTabStyle : {}}
						onClick={() => setFilterBy('approved')}
					>
						Approved Loans({(acceptedData.filter((each) => each.approval_status === 'approved').length)})
					</NavItem>
					<NavItem
						style={filterBy === 'rejected' ? activeTabStyle : {}}
						onClick={() => setFilterBy('rejected')}
					>
						Rejected Loans({(acceptedData.filter((each) => each.approval_status === 'rejected').length)})
					</NavItem>
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
						{acceptedData
							.filter((each) => {
								let filterCondition = each.approval_status === filterBy;
								return filterCondition
							})
							.sort((a, b) => a[sortBy] - b[sortBy]).map((member, index) => {
							return (
								<Card key={Math.random()}>
									<MappedCards
										member={member}
										index={index}
										fieldLineUp={fieldLineUp}
										setAcceptedData={setAcceptedData}
									/>
								</Card>
							)
						})}
					</DisplayItems>
				</ItemsGrid>
			</div>
    )
}