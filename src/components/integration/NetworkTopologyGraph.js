import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Layers, 
  Wifi, 
  Activity, 
  Lock, 
  Users, 
  Code, 
  BarChart, 
  Save,
  Trash2,
  Plus
} from 'lucide-react';

// Main Network Topology Graph Component
const NetworkTopologyGraph = ({ initialNetwork, onSave }) => {
  // Network state includes nodes (components) and edges (connections)
  const [network, setNetwork] = useState({
    nodes: initialNetwork?.nodes || getDefaultNodes(),
    edges: initialNetwork?.edges || getDefaultEdges()
  });
  
  // UI state
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showNodeMenu, setShowNodeMenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newConnectionSource, setNewConnectionSource] = useState(null);
  const [isCreatingEdge, setIsCreatingEdge] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const svgRef = useRef(null);
  
  // Handle saving the network topology
  const handleSaveTopology = () => {
    if (onSave) {
      onSave(network);
    }
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  // ==================== Node Types and Icons ====================
  
  // Get icon component based on node type
  const getNodeIcon = (type) => {
    switch (type) {
      case 'server':
        return <Server className="h-8 w-8 text-gray-300" />;
      case 'database':
        return <Database className="h-8 w-8 text-blue-400" />;
      case 'router':
        return <Wifi className="h-8 w-8 text-green-400" />;
      case 'firewall':
        return <Shield className="h-8 w-8 text-red-400" />;
      case 'webapp':
        return <Code className="h-8 w-8 text-purple-400" />;
      case 'user':
        return <Users className="h-8 w-8 text-yellow-400" />;
      case 'loadBalancer':
        return <Activity className="h-8 w-8 text-indigo-400" />;
      // HexaShield Components
      case 'central_management':
        return <Layers className="h-8 w-8 text-blue-500" />;
      case 'monitoring':
        return <BarChart className="h-8 w-8 text-green-500" />;
      case 'protection':
        return <Shield className="h-8 w-8 text-red-500" />;
      case 'authentication':
        return <Lock className="h-8 w-8 text-amber-500" />;
      case 'internet':
        return <Globe className="h-8 w-8 text-gray-500" />;
      default:
        return <Server className="h-8 w-8 text-gray-300" />;
    }
  };
  
  // Get descriptive name for node type (for display)
  const getNodeTypeName = (type) => {
    const typeMap = {
      server: 'Server',
      database: 'Database',
      router: 'Router',
      firewall: 'Firewall',
      webapp: 'Web Application',
      user: 'User Group',
      loadBalancer: 'Load Balancer',
      central_management: 'HexaShield Core',
      monitoring: 'HexaShield Monitoring',
      protection: 'HexaShield Protection',
      authentication: 'HexaShield Auth',
      internet: 'Internet'
    };
    return typeMap[type] || type;
  };
  
  // Get color for different node types
  const getNodeColor = (type) => {
    switch (type) {
      case 'server':
        return 'bg-gray-700 border-gray-500';
      case 'database':
        return 'bg-blue-900 border-blue-600';
      case 'router':
        return 'bg-green-900 border-green-600';
      case 'firewall':
        return 'bg-red-900 border-red-600';
      case 'webapp':
        return 'bg-purple-900 border-purple-600';
      case 'user':
        return 'bg-yellow-900 border-yellow-600';
      case 'loadBalancer':
        return 'bg-indigo-900 border-indigo-600';
      // HexaShield Components - make them stand out
      case 'central_management':
      case 'monitoring':
      case 'protection':
      case 'authentication':
        return 'bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500';
      case 'internet':
        return 'bg-gray-800 border-gray-600';
      default:
        return 'bg-gray-700 border-gray-500';
    }
  };
  
  // Get node stroke style based on if it's a HexaShield component
  const getNodeStrokeStyle = (type) => {
    return type.includes('monitoring') || 
           type.includes('protection') || 
           type.includes('central') || 
           type.includes('authentication') 
      ? "stroke-dasharray: 4,2"
      : "";
  };
  
  // ==================== Node and Edge Management ====================
  
  // Generate default nodes for first-time setup
  function getDefaultNodes() {
    return [
      { id: 'internet-1', type: 'internet', name: 'Internet', x: 400, y: 50, isHexaShield: false },
      { id: 'router-1', type: 'router', name: 'Edge Router', x: 400, y: 140, isHexaShield: false },
      { id: 'firewall-1', type: 'firewall', name: 'Perimeter Firewall', x: 400, y: 230, isHexaShield: false },
      { id: 'load-balancer', type: 'loadBalancer', name: 'Load Balancer', x: 400, y: 320, isHexaShield: false },
      { id: 'webapp-1', type: 'webapp', name: 'Web Application', x: 250, y: 400, isHexaShield: false },
      { id: 'webapp-2', type: 'webapp', name: 'API Service', x: 400, y: 400, isHexaShield: false },
      { id: 'database-1', type: 'database', name: 'Database', x: 550, y: 400, isHexaShield: false },
      
      // HexaShield Components
      { id: 'hexashield-core', type: 'central_management', name: 'HexaShield Core', x: 700, y: 230, isHexaShield: true },
      { id: 'hexashield-monitor', type: 'monitoring', name: 'HexaShield Monitoring', x: 700, y: 140, isHexaShield: true },
      { id: 'hexashield-protection', type: 'protection', name: 'HexaShield Protection', x: 700, y: 320, isHexaShield: true },
      { id: 'hexashield-auth', type: 'authentication', name: 'HexaShield Auth', x: 700, y: 400, isHexaShield: true },
    ];
  }
  
  // Generate default edges for first-time setup
  function getDefaultEdges() {
    return [
      { id: 'e1', from: 'internet-1', to: 'router-1', status: 'active' },
      { id: 'e2', from: 'router-1', to: 'firewall-1', status: 'active' },
      { id: 'e3', from: 'firewall-1', to: 'load-balancer', status: 'active' },
      { id: 'e4', from: 'load-balancer', to: 'webapp-1', status: 'active' },
      { id: 'e5', from: 'load-balancer', to: 'webapp-2', status: 'active' },
      { id: 'e6', from: 'webapp-1', to: 'database-1', status: 'active' },
      { id: 'e7', from: 'webapp-2', to: 'database-1', status: 'active' },
      
      // HexaShield connection to existing components
      { id: 'e8', from: 'hexashield-core', to: 'hexashield-monitor', status: 'secure' },
      { id: 'e9', from: 'hexashield-core', to: 'hexashield-protection', status: 'secure' },
      { id: 'e10', from: 'hexashield-core', to: 'hexashield-auth', status: 'secure' },
      { id: 'e11', from: 'hexashield-protection', to: 'firewall-1', status: 'integration' },
      { id: 'e12', from: 'hexashield-monitor', to: 'router-1', status: 'integration' },
      { id: 'e13', from: 'hexashield-auth', to: 'database-1', status: 'integration' },
    ];
  }
  
  // Create a new node
  const addNewNode = (type, name, x, y) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      name: name || getNodeTypeName(type),
      x,
      y,
      isHexaShield: type.includes('central_management') || 
                   type.includes('monitoring') || 
                   type.includes('protection') || 
                   type.includes('authentication')
    };
    
    setNetwork(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
    
    return newNode;
  };
  
  // Create a new edge
  const addNewEdge = (fromId, toId) => {
    // Check if edge already exists in either direction
    const edgeExists = network.edges.some(
      e => (e.from === fromId && e.to === toId) || (e.from === toId && e.to === fromId)
    );
    
    if (edgeExists) return;
    
    const newEdge = {
      id: `edge-${Date.now()}`,
      from: fromId,
      to: toId,
      status: 'active'
    };
    
    // Check if this is a connection to a HexaShield component
    const fromNode = network.nodes.find(n => n.id === fromId);
    const toNode = network.nodes.find(n => n.id === toId);
    
    if ((fromNode?.isHexaShield && !toNode?.isHexaShield) || 
        (!fromNode?.isHexaShield && toNode?.isHexaShield)) {
      newEdge.status = 'integration';
    }
    
    if (fromNode?.isHexaShield && toNode?.isHexaShield) {
      newEdge.status = 'secure';
    }
    
    setNetwork(prev => ({
      ...prev,
      edges: [...prev.edges, newEdge]
    }));
  };
  
  // Delete a node and all its connected edges
  const deleteNode = (nodeId) => {
    // Remove the node
    const updatedNodes = network.nodes.filter(n => n.id !== nodeId);
    
    // Remove all edges connected to this node
    const updatedEdges = network.edges.filter(
      e => e.from !== nodeId && e.to !== nodeId
    );
    
    setNetwork({
      nodes: updatedNodes,
      edges: updatedEdges
    });
    
    // Clear selection
    setSelectedNode(null);
    setShowNodeMenu(false);
  };
  
  // Delete an edge
  const deleteEdge = (edgeId) => {
    setNetwork(prev => ({
      ...prev,
      edges: prev.edges.filter(e => e.id !== edgeId)
    }));
    setSelectedEdge(null);
  };
  
  // Update a node's properties
  const updateNode = (nodeId, updates) => {
    setNetwork(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === nodeId ? { ...node, ...updates } : node
      )
    }));
  };
  
  // ==================== Drag & Drop Handlers ====================
  
  // Start dragging a node
  const startDrag = (e, node) => {
    // Get SVG coordinates
    if (!svgRef.current) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    const offsetX = e.clientX - svgRect.left - node.x;
    const offsetY = e.clientY - svgRect.top - node.y;
    
    setDraggedNode(node);
    setDragOffset({ x: offsetX, y: offsetY });
    setSelectedNode(node.id);
    e.stopPropagation();
  };
  
  // Handle dragging - updating node position
  const handleDrag = useCallback((e) => {
    if (!draggedNode || !svgRef.current) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left - dragOffset.x;
    const y = e.clientY - svgRect.top - dragOffset.y;
    
    // Update the node position
    setNetwork(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === draggedNode.id ? { ...node, x, y } : node
      )
    }));
  }, [draggedNode, dragOffset]);
  
  // End dragging
  const endDrag = () => {
    setDraggedNode(null);
  };
  
  // Mouse movement tracking for edge creation
  const handleMouseMove = useCallback((e) => {
    if (isCreatingEdge && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - svgRect.left,
        y: e.clientY - svgRect.top
      });
    }
    
    if (draggedNode) {
      handleDrag(e);
    }
  }, [isCreatingEdge, draggedNode, handleDrag]);
  
  // Set up event listeners for drag and mouse movement
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', endDrag);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', endDrag);
    };
  }, [handleMouseMove]);
  
  // ==================== Node Operations ====================
  
  // Start creating a new edge from a node
  const startEdgeCreation = (nodeId) => {
    setNewConnectionSource(nodeId);
    setIsCreatingEdge(true);
    setShowNodeMenu(false);
  };
  
  // Handle completing edge creation when clicking on a target node
  const handleNodeClick = (e, node) => {
    if (isCreatingEdge && newConnectionSource && newConnectionSource !== node.id) {
      // Create the edge from source to this node
      addNewEdge(newConnectionSource, node.id);
      
      // Reset edge creation state
      setIsCreatingEdge(false);
      setNewConnectionSource(null);
      e.stopPropagation();
      return;
    }
    
    // Otherwise, select the node
    setSelectedNode(node.id);
    setShowNodeMenu(true);
    e.stopPropagation();
  };
  
  // Handle clicking on an edge
  const handleEdgeClick = (e, edge) => {
    setSelectedEdge(edge.id);
    e.stopPropagation();
  };
  
  // Handle background click
  const handleBackgroundClick = () => {
    setSelectedNode(null);
    setShowNodeMenu(false);
    setSelectedEdge(null);
    
    if (isCreatingEdge) {
      setIsCreatingEdge(false);
      setNewConnectionSource(null);
    }
  };
  
  // Handle creating a new node
  const handleAddNode = (type) => {
    // Default to center of visible area if no specific position
    const centerX = 400;
    const centerY = 300;
    
    addNewNode(type, getNodeTypeName(type), centerX, centerY);
    setShowAddMenu(false);
  };
  
  // ==================== Render Helpers ====================
  
  // Get edge path between two nodes
  const getEdgePath = (from, to) => {
    // Find the node objects
    const fromNode = network.nodes.find(n => n.id === from);
    const toNode = network.nodes.find(n => n.id === to);
    
    if (!fromNode || !toNode) return '';
    
    // Simple straight line for now
    return `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`;
  };
  
  // Get style for edge based on status
  const getEdgeStyle = (status) => {
    switch (status) {
      case 'active':
        return 'stroke-gray-400';
      case 'secure':
        return 'stroke-green-500';
      case 'integration':
        return 'stroke-blue-500 stroke-dasharray-2';
      case 'warning':
        return 'stroke-yellow-500';
      case 'error':
        return 'stroke-red-500';
      default:
        return 'stroke-gray-400';
    }
  };
  
  // Get in-progress edge path (from source to mouse position)
  const getTempEdgePath = () => {
    if (!isCreatingEdge || !newConnectionSource) return '';
    
    const sourceNode = network.nodes.find(n => n.id === newConnectionSource);
    if (!sourceNode) return '';
    
    return `M ${sourceNode.x} ${sourceNode.y} L ${mousePosition.x} ${mousePosition.y}`;
  };
  
  // ==================== Render Functions ====================
  
  // Render a node
  const renderNode = (node) => {
    const isSelected = selectedNode === node.id;
    
    return (
      <g 
        key={node.id} 
        transform={`translate(${node.x}, ${node.y})`}
        onMouseDown={(e) => startDrag(e, node)}
        onClick={(e) => handleNodeClick(e, node)}
        className="cursor-pointer"
      >
        {/* Node Shape */}
        <circle 
          r={isSelected ? 30 : 25} 
          className={`${getNodeColor(node.type)} ${isSelected ? 'ring-2 ring-white' : ''} transition-all duration-200`}
          style={{ strokeWidth: 2, style: getNodeStrokeStyle(node.type) }}
        />
        
        {/* Node Icon */}
        <g transform="translate(-12, -12)">
          {getNodeIcon(node.type)}
        </g>
        
        {/* Node Name */}
        <text 
          y="45" 
          textAnchor="middle" 
          className="fill-white text-xs pointer-events-none font-medium"
        >
          {node.name}
        </text>
      </g>
    );
  };
  
  // Render an edge
  const renderEdge = (edge) => {
    const isSelected = selectedEdge === edge.id;
    
    return (
      <g key={edge.id} onClick={(e) => handleEdgeClick(e, edge)}>
        <path 
          d={getEdgePath(edge.from, edge.to)} 
          className={`${getEdgeStyle(edge.status)} ${isSelected ? 'stroke-2' : 'stroke-1'} transition-colors`}
          fill="none"
        />
        
        {/* Delete button for selected edge */}
        {isSelected && (
          <g 
            transform={`translate(${getMidpoint(edge.from, edge.to)})`}
            onClick={() => deleteEdge(edge.id)}
            className="cursor-pointer"
          >
            <circle r="10" className="fill-red-600" />
            <text y="4" textAnchor="middle" className="fill-white text-xs font-bold">✕</text>
          </g>
        )}
      </g>
    );
  };
  
  // Get midpoint of an edge for placing controls
  const getMidpoint = (fromId, toId) => {
    const fromNode = network.nodes.find(n => n.id === fromId);
    const toNode = network.nodes.find(n => n.id === toId);
    
    if (!fromNode || !toNode) return { x: 0, y: 0 };
    
    return {
      x: (fromNode.x + toNode.x) / 2,
      y: (fromNode.y + toNode.y) / 2
    };
  };
  
  // Render the node context menu
  const renderNodeMenu = () => {
    if (!selectedNode || !showNodeMenu) return null;
    
    const node = network.nodes.find(n => n.id === selectedNode);
    if (!node) return null;
    
    // Position the menu near the node
    const menuX = node.x + 40;
    const menuY = node.y - 20;
    
    return (
      <foreignObject x={menuX} y={menuY} width="180" height="160">
        <div className="bg-gray-800 border border-gray-600 rounded-md shadow-lg p-2 text-white">
          <h3 className="font-medium mb-2">{node.name}</h3>
          <div className="space-y-1">
            <button 
              className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center"
              onClick={() => startEdgeCreation(node.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Connection
            </button>
            <button 
              className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center"
              onClick={() => {
                const newName = prompt("Enter new name:", node.name);
                if (newName) {
                  updateNode(node.id, { name: newName });
                }
              }}
            >
              <span className="h-4 w-4 mr-2">✏️</span>
              Rename
            </button>
            <button 
              className="w-full text-left px-2 py-1 rounded hover:bg-red-700 text-sm flex items-center text-red-400 hover:text-white"
              onClick={() => deleteNode(node.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </foreignObject>
    );
  };
  
  return (
    <div className="flex flex-col space-y-4">
      {showSuccessMessage && (
        <div className="bg-green-900 text-green-100 p-3 rounded-md flex items-center">
          <Save className="h-5 w-5 mr-2" />
          Network topology saved successfully.
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium text-white">Network Topology</h3>
          <button 
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
            onClick={() => setShowAddMenu(prev => !prev)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Node
          </button>
          {showAddMenu && (
            <div className="absolute mt-32 bg-gray-800 border border-gray-600 rounded-md shadow-lg p-2 z-10">
              <div className="space-y-1">
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('server')}
                >
                  <Server className="h-4 w-4 mr-2 text-gray-300" />
                  Server
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('database')}
                >
                  <Database className="h-4 w-4 mr-2 text-blue-400" />
                  Database
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('router')}
                >
                  <Wifi className="h-4 w-4 mr-2 text-green-400" />
                  Router
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('firewall')}
                >
                  <Shield className="h-4 w-4 mr-2 text-red-400" />
                  Firewall
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('webapp')}
                >
                  <Code className="h-4 w-4 mr-2 text-purple-400" />
                  Web Application
                </button>
                <div className="border-t border-gray-700 my-1"></div>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('central_management')}
                >
                  <Layers className="h-4 w-4 mr-2 text-blue-500" />
                  HexaShield Core
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('monitoring')}
                >
                  <BarChart className="h-4 w-4 mr-2 text-green-500" />
                  HexaShield Monitoring
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('protection')}
                >
                  <Shield className="h-4 w-4 mr-2 text-red-500" />
                  HexaShield Protection
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('authentication')}
                >
                  <Lock className="h-4 w-4 mr-2 text-amber-500" />
                  HexaShield Auth
                </button>
              </div>
            </div>
          )}
        </div>
        <button 
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center"
          onClick={handleSaveTopology}
        >
          <Save className="h-4 w-4 mr-1" />
          Save Topology
        </button>
      </div>
      
      <div className="text-xs text-gray-400 mb-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-gray-400 mr-1"></div>
            <span>Regular Connection</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-blue-500 stroke-dasharray-2 mr-1"></div>
            <span>Integration Connection</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-green-500 mr-1"></div>
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
      
      <div className="h-[600px] border border-gray-700 rounded-lg bg-gray-900 overflow-hidden relative">
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          onClick={handleBackgroundClick}
          className="cursor-default"
        >
          {/* Render edges first (below nodes) */}
          <g className="edges">
            {network.edges.map(edge => renderEdge(edge))}
            {/* Render temporary edge during creation */}
            {isCreatingEdge && (
              <path 
                d={getTempEdgePath()} 
                stroke="#3b82f6" 
                strokeWidth="2" 
                strokeDasharray="4,4"
                fill="none"
              />
            )}
          </g>
          
          {/* Render all nodes */}
          <g className="nodes">
            {network.nodes.map(node => renderNode(node))}
          </g>
          
          {/* Render node context menu */}
          {renderNodeMenu()}
        </svg>
      </div>
      
      {/* Instructions */}
      <div className="text-sm text-gray-400 bg-gray-800 p-3 rounded">
        <p className="font-medium text-gray-300 mb-1">Topology Editor Instructions:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Drag nodes to position them in your network</li>
          <li>Click a node to select it and see options</li>
          <li>Use "New Connection" to create links between components</li>
          <li>Click a connection line to select and delete it</li>
          <li>Add new nodes using the "Add Node" button</li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkTopologyGraph;