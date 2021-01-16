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
	margin-bottom: 10px;
	width: 125px;
	border-radius: 5px;
	text-align: center;
	padding: 5px 15px;
	cursor: pointer;
	border: 1px solid rgba(224,210,210, 0.6);
`;

const MappedCards = ({ member, index, fieldLineUp, ...rest }) => {
	const [colShown, setColShown] = useState(5);
	const updateData = (approval_status) => {
		const acceptedData = JSON.parse(localStorage.getItem('acceptedData'));
		const updatedApplication = { ...member, approval_status }
		const newApplicationData = acceptedData.map((each) => {
			console.log(each.id, member);
			if(each.id === member.id) {
				console.log('right block if called')
				each = updatedApplication;
			}
			return each;
		});
		localStorage.setItem('acceptedData', JSON.stringify(newApplicationData));
	};
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
				{colShown >= 15 ? (
					<div>
						<Buttons
							style={{background: '#76d600', color: 'white'}}
							onClick={() => updateData('approved')}
						>
							Approve
						</Buttons>
						<Buttons
							style={{background: '#E12a5a', color: 'white'}}
							onClick={() => updateData('rejected')}
						>
							Reject
						</Buttons>
						<Buttons
							onClick={() => updateData('pending')}
						>
							Decide Later
						</Buttons>
						<Buttons
						>
							<Link to={`/loans/${index}`}>All Details</Link>
						</Buttons>
					</div>
				) : (
					<div onClick={() => setColShown(colShown + 10)}>...</div>
				)}
			</Expand>
		</>
	);
}

export default MappedCards;