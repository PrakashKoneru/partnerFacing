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

const MappedCards = ({ member, index, fieldLineUp }) => {
	const [colShown, setColShown] = useState(5);
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
						<Buttons style={{background: '#76d600', color: 'white'}}>
							Approve
						</Buttons>
						<Buttons style={{background: '#E12a5a', color: 'white'}}>
							Reject
						</Buttons>
						<Buttons>
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