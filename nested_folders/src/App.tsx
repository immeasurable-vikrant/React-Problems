import { useState } from 'react'
import './App.css'
import NestedFolders from './components/NestedFolders'
import { folders } from './folders.ts'
import useNode from './useNode/useNode.ts'

function App() {
  const { addNewFolders } = useNode()

  const [foldersData, setFoldersData] = useState(folders)
  const handleAddFolders = (folderId: number, value: string, isFolder: Boolean) => {
    let latestFolder = addNewFolders(foldersData, folderId, value, isFolder)
    setFoldersData(latestFolder)
  }

  return (
    <div className='App'>
        <NestedFolders folders={foldersData} handleAddFolders={handleAddFolders}/>
    </div>
  )
}

export default App
