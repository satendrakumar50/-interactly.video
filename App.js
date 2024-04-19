
// import './App.css';

// function App() {
//   return (
//     <div >
//      Hello
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import './App.css';

function App() {
  const [nodes, setNodes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeName, setNodeName] = useState('');

  const handleCreateNode = () => {
    const newNode = {
      id: Math.random().toString(36).substring(7),
      x: Math.random() * 500,
      y: Math.random() * 500,
      title: '',
    };
    setNodes([...nodes, newNode]);
  };

  const handleDeleteNode = (id) => {
    setNodes(nodes.filter((node) => node.id !== id));
  };

  const handleNodeClick = (id) => {
    setSelectedNodeId(id);
    setShowPopup(true);
  };

  const handleCreateBranch = () => {
    if (nodes.length < 2) return;
    const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
    let targetNode = nodes[Math.floor(Math.random() * nodes.length)];
    while (targetNode === sourceNode) {
      targetNode = nodes[Math.floor(Math.random() * nodes.length)];
    }
    const newBranch = {
      id: Math.random().toString(36).substring(7),
      source: sourceNode.id,
      target: targetNode.id,
    };
    setBranches([...branches, newBranch]);
  };

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter((branch) => branch.id !== id));
  };

  const handleNodeNameChange = (e) => {
    setNodeName(e.target.value);
  };

  const handleSaveNodeName = () => {
    const updatedNodes = nodes.map((node) =>
      node.id === selectedNodeId ? { ...node, title: nodeName } : node
    );
    setNodes(updatedNodes);
    setShowPopup(false);
    setSelectedNodeId(null);
    setNodeName('');
  };

  return (
    <div className="App">
      <div className="graph-panel">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="node"
            style={{ top: node.y, left: node.x }}
            onClick={() => handleNodeClick(node.id)}
          >
            {node.title && <div className="node-title">{node.title}</div>}
            <div
              className="delete-node"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNode(node.id);
              }}
            >
              X
            </div>
          </div>
        ))}
        {branches.map((branch) => (
          <svg key={branch.id} className="branch">
            <line
              x1={nodes.find((node) => node.id === branch.source).x}
              y1={nodes.find((node) => node.id === branch.source).y}
              x2={nodes.find((node) => node.id === branch.target).x}
              y2={nodes.find((node) => node.id === branch.target).y}
            />
            <text
              x={(nodes.find((node) => node.id === branch.source).x + nodes.find((node) => node.id === branch.target).x) / 2}
              y={(nodes.find((node) => node.id === branch.source).y + nodes.find((node) => node.id === branch.target).y) / 2}
            >
              X
            </text>
            <circle
              cx={(nodes.find((node) => node.id === branch.source).x + nodes.find((node) => node.id === branch.target).x) / 2}
              cy={(nodes.find((node) => node.id === branch.source).y + nodes.find((node) => node.id === branch.target).y) / 2}
              r="10"
              fill="red"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBranch(branch.id);
              }}
            />
          </svg>
        ))}
      </div>
      <button className="create-node-btn" onClick={handleCreateNode}>
        Create Node
      </button>
      <button className="create-branch-btn" onClick={handleCreateBranch}>
        Create Branch
      </button>
      {showPopup && (
        <div className="popup">
          <input
            type="text"
            value={nodeName}
            onChange={handleNodeNameChange}
            placeholder="Enter Node Name"
          />
          <button onClick={handleSaveNodeName}>Save</button>
        </div>
      )}
    </div>
  );
}

export default App;
