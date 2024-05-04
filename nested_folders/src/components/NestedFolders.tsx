import { useState } from 'react';
import './styles.css';
const NestedFolders = ({ folders, handleAddFolders }: any) => {
	const [value, setValue] = useState('');
	const [expand, setExpand] = useState(false);
	const [showInput, setShowInput] = useState({
		visible: false,
		isFolder: null,
	});

	const handleExpand = () => {
		setExpand(!expand);
		// setShowInput({visible: false, isFolder: null})
	};

	const handleFolders = (isFolder: Boolean) => {
		setShowInput((prev: any) => {
			return { ...prev, visible: true, isFolder };
		});
	};

	const addFolders = () => {
		if (value) {
			setExpand(true);
			setShowInput({ visible: false, isFolder: null });
			handleAddFolders(folders.id, value, showInput.isFolder);
			setValue('');
		}
	};

	return folders.isFolder ? (
		<div>
			<div className="folders__container">
				<span onClick={handleExpand} style={{ cursor: 'pointer' }}>
					{folders.name}
				</span>
				<div>
					<button className="btn-item" onClick={() => handleFolders(true)}>
						📁
					</button>
					<button className="btn-item" onClick={() => handleFolders(false)}>
						📄
					</button>
				</div>
			</div>
			<div>
				{showInput.visible && (
					<div>
						<span style={{ padding: '0 4px' }}>
							{showInput.isFolder ? '📁' : '📄'}
						</span>
						<input
							autoFocus
							type="text"
							onChange={(e) => setValue(e.target.value)}
							value={value}
						/>
						<div>
							<button className="btn-item" onClick={addFolders}>
								Save
							</button>
							<button
								className="btn-item"
								onClick={() => setShowInput({ visible: false, isFolder: null })}
							>
								Cancel
							</button>
						</div>
					</div>
				)}
				<div className={expand ? 'folders__show' : 'folders__none'}>
					{folders.items.map((folder: any) => {
						return (
							<NestedFolders
								folders={folder}
								handleAddFolders={handleAddFolders}
							/>
						);
					})}
				</div>
			</div>
		</div>
	) : (
		<div>{folders.name}</div>
	);
};
export default NestedFolders;
