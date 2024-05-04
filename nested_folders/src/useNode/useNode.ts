const useNode = () => {
	const addNewFolders = (tree: any, folderId: number, value: string, isFolder: Boolean) => {
		if (tree.id === folderId) {
			tree.items.push({
				id: Date.now(),
				isFolder,
				name: value,
				items: [],
			});
			return tree;
		}

		let latestNode = tree.items.map((folder: any) => {
			return addNewFolders(folder, folderId, value, isFolder);
		});

		return { ...tree, items: latestNode };
	};

	return { addNewFolders };
};

export default useNode;
