import React, { useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	font-size: 14px;
`

const Col = styled.div`
	width: 20%;
	padding: 10px;
`

const Expand = styled.div`
	padding-right: 5px;
	cursor: pointer;
`;

const Buttons = styled.div`
	margin-left: 15px;
	margin-bottom: 10px;
	width: 125px;
	border-radius: 5px;
	text-align: center;
	padding: 5px 15px;
	cursor: pointer;
	border: 1px solid rgba(224,210,210, 0.6);
`;

const MappedCards = ({ member, index, fieldLineUp, noActions, setAcceptedData, ...rest }) => {
	const [colShown, setColShown] = useState(5);
	const [loadingState, setLoadingState] = useState(null);
	const updateData = (approval_status) => {
		setLoadingState(approval_status)
		const acceptedData = JSON.parse(localStorage.getItem('acceptedData'));
		const updatedApplication = { ...member, approval_status }
		const newApplicationData = acceptedData.map((each) => {
			if(each.id === member.id) {
				each = updatedApplication;
			}
			return each;
		});
		localStorage.setItem('acceptedData', JSON.stringify(newApplicationData));
		setTimeout(() => setAcceptedData(newApplicationData), 750);
	};
	console.log(member.approval_status);
	const colorHelper = {
		approved: '#179942',
		rejected: '#FA1103',
		pending: '#19858F',
	}
	if(loadingState) return (<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			color: colorHelper[loadingState],
			fontSize: '25px',
			height: '75px',
			alignItems: 'center'
		}}
	>
		{
			`Added to ${loadingState.charAt(0).toUpperCase() + loadingState.slice(1)} Loans`
		}
	</div>)
	return (
		<>
			<Grid>	
				{fieldLineUp.slice(0, colShown).map((field) => {
					return (
						<Col>
							<div style={{ fontWeight: '700'}}>
								{field.title}
							</div>
							<div style={{ marginTop: '5px'}}>
								{member[field.def]}
							</div>
						</Col>
					)
				})}
			</Grid>
			<Expand>
				<div>
					<div style={{
						display: 'flex'
					}}>
						<Buttons
							style={{background: '#179942', color: 'white'}}
							onClick={() => updateData('approved')}
							disabled={loadingState}
						>
							Approve
						</Buttons>
						<Buttons
							style={{background: '#FA1103', color: 'white'}}
							onClick={() => updateData('rejected')}
							disabled={loadingState}
						>
							Reject
						</Buttons>
					</div>
					<div style={{
						display: 'flex'
					}}>
						<Buttons
							onClick={() => updateData('pending')}
							disabled={loadingState}
							style={{background: '#19858F', color: 'white'}}
						>
							Decide Later
						</Buttons>
						<Buttons disabled={loadingState}>
							<Link to={`/loans/${index}`}>All Details</Link>
						</Buttons>
					</div>
				</div>
			</Expand>
		</>
	);
}

export default MappedCards;