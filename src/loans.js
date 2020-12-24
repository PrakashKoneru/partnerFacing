import React from 'react';
import { useParams } from 'react-router-dom';
import acceptedData from './acceptedData';

export default function Loans() {
	const { index } = useParams();
	const selectedLoan = acceptedData[index];

	return (
		Object.entries(selectedLoan).map(([key,value]) => {
			return (<div>{key} --- {value.toString()}</div>)
		})
	)
}