import React, { useState } from 'react';
import './styles.css';

const StateToCapital: React.FC = () => {
	const stateToCapital: { [key: string]: string } = {
		'J&K': 'Jammu',
		'Arunachal Pradesh': 'Itanagar',
		Karnataka: 'Bangalore',
	};

	const [itemSelected, setItemSelected] = useState<string[]>([]);
	const [isMatch, setIsMatch] = useState<boolean>(false);

	const handleStateToCapitalMapping = (value: string) => {
		if (itemSelected.length === 1) {
			const newData: string[] = [...itemSelected, value];
			console.log(newData);
			setItemSelected(newData);

			const isFirstMatch: boolean =
				value === stateToCapital[itemSelected[0]] ||
				itemSelected[0] === stateToCapital[value];
                
			setIsMatch(isFirstMatch);
		} else {
			if (isMatch) {
				setIsMatch(false);
			}
			setItemSelected([value]);
		}
	};

	console.log('itemseected', itemSelected, isMatch);

	return (
		<div>
			<h2>State To Capital Mapping</h2>
			<div className="container">
				{Object.keys(stateToCapital).map((state: string) => {
					return (
						<div
							key={state}
							className="border__box"
							style={{
								borderColor: itemSelected.includes(state)
									? itemSelected.length === 2
										? isMatch
											? 'green'
											: 'red'
										: 'blue'
									: 'black',
							}}
							onClick={() => handleStateToCapitalMapping(state)}
						>
							{state}
						</div>
					);
				})}
			</div>
			<div className="container">
				{Object.values(stateToCapital).map((capital: string) => {
					return (
						<div
							key={capital}
							className="border__box"
							style={{
								borderColor: itemSelected.includes(capital)
									? itemSelected.length === 2
										? isMatch
											? 'green'
											: 'red'
										: 'blue'
									: 'black',
							}}
							onClick={() => handleStateToCapitalMapping(capital)}
						>
							{capital}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default StateToCapital;
