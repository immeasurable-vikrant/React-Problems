import { useState } from 'react';
import './App.css';
import { comments } from './comments';
import NestedComments from './components/NestedComments';
import useCommentNode from './useCommentNode';

function App() {
	const [commentsData, setCommentsData] = useState(comments);
	const { addNewComments, deleteComments } = useCommentNode();

	const handleAddNewComment = (commentId: number, value: string) => {
		let latestComment = addNewComments(commentsData, commentId, value);
		setCommentsData(latestComment);
	};

	const handleDeleteComment = (commentId: number) => {
		const finalStructure = deleteComments(commentsData, commentId);
		const temp = { ...finalStructure };
		setCommentsData(temp);
	  };

	console.log('commentsdata', commentsData);
	return (
		<>
			<NestedComments
				comments={commentsData}
				handleAddNewComment={handleAddNewComment}
				handleDeleteComment={handleDeleteComment}
			/>
		</>
	);
}

export default App;
