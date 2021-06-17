import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Label,
	LabelList,
	PieChart,
	Pie,
	Sector,
	Cell
} from "recharts";
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

// const renderCustomizedLabel = (props) => {
//   const { content, ...rest } = props;

//   return <Label {...rest} fontSize="12" fill="#FFFFFF" fontWeight="Bold" />;
// };

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const LoanGroups = (props) => {
	const [view, setView] = useState('listView');
	const [groupingState, setGroupinState] = useState('grade');
	const [expandedLoanGroup, setExpandedLoanGroup] = useState(null)
	const allLoans = JSON.parse(localStorage.getItem('acceptedData'));
	const loansBySelectedGroup = allLoans.reduce((loan, value) => {
		console.log(loan[value[groupingState]], groupingState)
		if (!loan[value[groupingState]]) {
			loan[value[groupingState]] = {
				loans: [],
				loan_amnt: 0,
			};
		}
	 
		// Grouping
		loan[value[groupingState]]['loans'] = [...loan[value[groupingState]]['loans'], value];
		loan[value[groupingState]]['loan_amnt'] = loan[value[groupingState]]['loan_amnt'] + parseInt(value['loan_amnt'], "10")
		return loan;
	}, {});

	const grapViewCalculations = {
		total_invested: 0,
		total_returns: 0,
		principal_paid: 0,
		principal_left: 0,
		expected_principal: 0,
		expected_return: 0,
		principal_charged_off: 0
	}
	allLoans.map((loan) => {
		grapViewCalculations.total_invested = grapViewCalculations.total_invested + parseInt (loan.funded_amnt, 10)
		grapViewCalculations.total_returns = grapViewCalculations.total_returns + parseInt (loan.returns_received, 10)
		grapViewCalculations.principal_paid = grapViewCalculations.principal_paid + parseInt (loan.principal_paid, 10)
		grapViewCalculations.principal_left = loan.status === '1' ? grapViewCalculations.principal_left + parseInt (loan.principal_left, 10) : grapViewCalculations.principal_left;
		grapViewCalculations.expected_principal = 0.98 * grapViewCalculations.principal_left;
		grapViewCalculations.expected_return = 0.0225 * grapViewCalculations.principal_left;
		grapViewCalculations.principal_charged_off = (loan.status === '2' || loan.status === '3') ? grapViewCalculations.principal_charged_off + (parseInt(loan.principal_left, 10) - parseInt(loan.collected_principal, 10)) : grapViewCalculations.principal_charged_off;
	})

	const principalGraphData = [
		{ 
			name: "Principal",
			returned: grapViewCalculations.principal_paid,
			left: grapViewCalculations.principal_left,
			moneyLost: grapViewCalculations.principal_charged_off
		}
	];

	const piechartDivison = allLoans.reduce((loan, value) => {
		if (!loan[value['status']]) {
			loan[value['status']] = {
				loans: [],				
			};
		}
	 
		// Grouping
		loan[value['status']]['loans'] = [...loan[value['status']]['loans'], value];
		return loan;
	}, {});

	const pieChartData = [
		{ name: "Active", value: piechartDivison['1'] ? piechartDivison['1'].loans.length : 0, fill: '#0088FE' },
		{ name: "Charged off", value: piechartDivison['2'] ? piechartDivison['2'].loans.length : 0, fill: '#dd7876' },
		{ name: "Default", value: piechartDivison['3'] ? piechartDivison['3'].loans.length : 0, fill: '#FFBB28' },
		{ name: "Completed", value: piechartDivison['4'] ? piechartDivison['4'].loans.length : 0, fill: '#82ba7f' }
	];
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
								onChange={(e) => {setGroupinState(e.target.value)}}
							>
								<Option value='grade' default>Grade</Option>
								<Option value='issue_m'>Month</Option>
							</Select>
						</StickyContainer>
					</Actions>
					<div style={{ width: '100%'}}>
						{Object.keys(loansBySelectedGroup).map((groupName, value) => {
							const group = loansBySelectedGroup[groupName]
							console.log(loansBySelectedGroup)
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
			{view === 'graphView' && (
				<>
					<ItemsGrid>
						<>
							{Object.keys(grapViewCalculations).map((eachCalcluation) => {
								return (
									<div
										style={{ 
											width: '25%',
											textAlign: 'center',
											border: '1px solid black',
											padding: '25px',
											marginRight: '25px'
										}}>
										<div>
											{eachCalcluation.split('_').map((string) => { return string.charAt(0).toUpperCase() + string.slice(1)}).join(' ')}
										</div>
										<div style={{ marginTop: '8px', textAlign: 'center' }}>
											{grapViewCalculations[eachCalcluation]}
										</div>
									</div>
								)
							})}
						</>
					</ItemsGrid>
					<div
						style={{
							marginTop: '50px',
							paddingLeft: '30px',
							paddingRight: '30px'
						}}
					>
						<div>
							<div>
								<div
									style={{
										fontWeight: 600
									}}
								>
									Principal Data Graph
								</div>
							</div>
							<div 
								style={{
									marginTop: '50px',
									marginLeft: "-50px"
								}}
							>
								<ResponsiveContainer
									height={250}
									width={"90%"}
								>
								<BarChart
									layout="vertical"
									data={principalGraphData}
									margin={{ left: 50, right: 50 }}
									stackOffset="expand"
								>
									<XAxis type="number" />
									<YAxis
										type="category"
										dataKey="name"
										fontSize="12"
									/>
									<Tooltip />
									<Bar dataKey="returned" fill="#82ba7f"  stackId="a">
										<LabelList
											dataKey="returned"
											position="center"
										/>
									</Bar>
									<Bar dataKey="left" fill="#76a8dd" stackId="a">
										<LabelList
											dataKey="left"
											position="center"
										/>
									</Bar>
									<Bar dataKey="moneyLost" fill="#dd7876" stackId="a">
										<LabelList
											dataKey="moneyLost"
											position="center"
										/>
									</Bar>
								</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
						{/* Graph Gap */}
						<div>
							<div
								style={{
									marginTop: '50px',
									fontWeight: 600
								}}
							>
								Loan Standings
							</div>
							<div>
								<div style={{ marginLeft: '-70px' }}>
									<ResponsiveContainer width="100%" height={400}>
										<PieChart width={400} height={400}>
											<Pie
												data={pieChartData.filter((entry) => { return entry.value != 0 })}
												cx="50%"
												cy="50%"
												labelLine={false}
												label={renderCustomizedLabel}
												outerRadius={125}
												fill="#8884d8"
												dataKey="value"
											>
												{pieChartData.filter((entry) => { return entry.value != 0 }).map((entry, index) => (
													<Cell key={`cell-${index}`} fill={entry.fill} />
												))}
											</Pie>
										</PieChart>
									</ResponsiveContainer>
								</div>
								<div
									style={{ 
										display: 'flex',
										justifyContent: 'center'
									}}
								>
									{pieChartData.map((entry) => {
										return (
											<div style={{
												display: 'flex',
												alignItems: 'center',
												marginRight: '40px',
												paddingBottom: '80px',
												marginTop: '-40px'
											}}>
												<div
													style={{
														height: '25px',
														width: '25px',
														backgroundColor: entry.fill,
														marginRight: '8px'
													}}
												>
												</div>
												<div>{entry.name}</div>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default LoanGroups;