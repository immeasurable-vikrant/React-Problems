import { useState } from 'react';
import './styles.css';

const NestedComments = ({
	comments,
	handleAddNewComment,
	handleDeleteComment,
}: any) => {
	const [value, setValue] = useState('');
	const [showInput, setShowInput] = useState(false);

	const handleReply = () => {
		setShowInput(true);
	};

	const handleSave = () => {
		if(value)
			handleAddNewComment(comments.id, value);
			setShowInput(false);
			setValue('');
	};

	const handleDelete = () => {
		handleDeleteComment(comments.id);
	};

	return (
		<div>
			<div>
				{comments.id === 1 ? (
					<div>
						<input
							type="text"
							autoFocus
							onChange={(e) => setValue(e.target.value)}
							value={value}
						/>
						<button onClick={handleSave}>Add Comments</button>
					</div>
				) : (
					<div className="comments__container">
						<div>
							<span className="comment__text">{comments.name}</span>
						</div>
						<div>
							<button className="btn-item" onClick={handleReply}>
								Reply
							</button>
							<button
								className="btn-item"
								onClick={() => alert('To be implemented soon!')}
							>
								Edit
							</button>
							<button className="btn-item" onClick={handleDelete}>
								Delete
							</button>
						</div>
					</div>
				)}
			</div>
			<div style={{ paddingLeft: '24px' }}>
				<div>
					{showInput && (
						<div className="input__container">
							<div>
								<input
									autoFocus
									type="text"
									value={value}
									onChange={(e) => setValue(e.target.value)}
								/>
							</div>
							<div>
								<button className="btn-item" onClick={handleSave}>
									Save
								</button>
								<button
									className="btn-item"
									onClick={() => setShowInput(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>

				{comments.items.map((comment: any) => {
					return (
						<NestedComments
							key={comment.id}
							comments={comment}
							handleDeleteComment={handleDeleteComment}
							handleAddNewComment={handleAddNewComment}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default NestedComments;
