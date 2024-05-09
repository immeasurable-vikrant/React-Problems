import React, { useEffect, useState } from 'react';
import './styles.css';
import { items } from '../brandItems';

interface BrandItem {
	name: string;
	category: string;
  }

const MultiFilters: React.FC = () => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [filteredItems, setFilteredItems] = useState<BrandItem[]>(items);

	const brandCategories: string[] = ['Bags', 'Watches', 'Sports', 'Sunglasses'];

	useEffect(() => {
		if (selectedCategories.length > 0) {
			const filteredItems = selectedCategories.flatMap((category) =>
				items.filter((item) => item.category === category)
			);
			setFilteredItems(filteredItems);
		} else {
			setFilteredItems(items);
		}
	}, [selectedCategories]);

	const handleCategorySelection = (category: string) => {
		if (selectedCategories.includes(category)) {
			const updatedCategories = selectedCategories.filter((c) => c !== category);
			setSelectedCategories(updatedCategories);
		} else {
			setSelectedCategories((prevCategories) => [...prevCategories, category]);
		}
	};

	return (
		<div className="container">
			<div className="brands_container">
				{brandCategories.map((category: string, idx: number) => (
					<div
						key={idx}
						className={`brands ${selectedCategories.includes(category) ? 'active' : ''}`}
						onClick={() => handleCategorySelection(category)}
					>
						{category}
					</div>
				))}
			</div>
			<div className="brand_item_container">
				{filteredItems.map((item: BrandItem, idx: number) => (
					<div className="brand_items" key={idx}>
						<span style={{ padding: '16px' }}>{item.name}</span>
						<span style={{ padding: '16px' }}>{item.category}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MultiFilters;
