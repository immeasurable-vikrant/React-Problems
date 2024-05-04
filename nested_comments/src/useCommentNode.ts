const useCommentNode = () => {
    const addNewComments = (tree: any, commentId: number, value: string) => {
        if(tree.id === commentId) {
            console.log("inside", tree.id, commentId)
            tree.items.push({
                id: Date.now(),
                name: value,
                items: []
            })
            return tree
        }

        let latestNode = tree.items.map((comment: any) => {
            return addNewComments(comment, commentId, value)
        })

        return {...tree, items: latestNode}
    }

    const deleteComments = (tree: any, id:number) => {
        console.log("tree", tree)
        for (let i = 0; i < tree.items.length; i++) {
          const currentItem = tree.items[i];
          if (currentItem.id === id) {
            tree.items.splice(i, 1);
            return tree;
          } else {
            deleteComments(currentItem, id);
          }
        }
        return tree;
      };

    return { addNewComments, deleteComments }
}
export default useCommentNode