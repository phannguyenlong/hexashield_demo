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
  Plus,
  Search,
  FileText,
  LockShield,
  Cpu,
  HardDrive
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
      // SME Infrastructure
      case 'fileserver':
        return <FileText className="h-8 w-8 text-orange-400" />;
      case 'erp_system':
        return <Cpu className="h-8 w-8 text-pink-400" />;
      case 'crm_system':
        return <Users className="h-8 w-8 text-cyan-400" />;
      case 'storage':
        return <HardDrive className="h-8 w-8 text-gray-400" />;
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
      // HexaShield Specific Tools
      case 'modsecurity':
        return <Shield className="h-8 w-8 text-purple-500" />;
      case 'greensql':
        return <Database className="h-8 w-8 text-green-600" />;
      case 'suricata':
        return <Search className="h-8 w-8 text-blue-600" />;
      case 'wazuh':
        return <Shield className="h-8 w-8 text-orange-600" />;
      case 'graylog':
        return <FileText className="h-8 w-8 text-gray-600" />;
      case 'owasp_zap':
        return <Code className="h-8 w-8 text-red-600" />;
      case 'packetfence':
        return <Wifi className="h-8 w-8 text-indigo-600" />;
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
      fileserver: 'File Server',
      erp_system: 'ERP System',
      crm_system: 'CRM System',
      storage: 'Storage System',
      central_management: 'HexaShield Core',
      monitoring: 'HexaShield Monitoring',
      protection: 'HexaShield Protection',
      authentication: 'HexaShield Auth',
      internet: 'Internet',
      modsecurity: 'ModSecurity WAF',
      greensql: 'GreenSQL DB Firewall',
      suricata: 'Suricata IDS/IPS',
      wazuh: 'Wazuh Security',
      graylog: 'Graylog Log Mgmt',
      owasp_zap: 'OWASP ZAP',
      packetfence: 'PacketFence NAC'
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
      // SME Infrastructure
      case 'fileserver':
        return 'bg-orange-900 border-orange-600';
      case 'erp_system':
        return 'bg-pink-900 border-pink-600';
      case 'crm_system':
        return 'bg-cyan-900 border-cyan-600';
      case 'storage':
        return 'bg-gray-900 border-gray-600';
      // HexaShield Components - make them stand out
      case 'central_management':
      case 'monitoring':
      case 'protection':
      case 'authentication':
        return 'bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500';
      // Specific tools
      case 'modsecurity':
      case 'greensql':
      case 'suricata':
      case 'wazuh':
      case 'graylog':
      case 'owasp_zap':
      case 'packetfence':
        return 'bg-gradient-to-br from-gray-800 to-gray-900 border-green-500';
      case 'internet':
        return 'bg-gray-800 border-gray-600';
      default:
        return 'bg-gray-700 border-gray-500';
    }
  };
  
  // Get node stroke style based on if it's a HexaShield component
  const getNodeStrokeStyle = (type) => {
    const hexaShieldComponents = [
      'monitoring', 'protection', 'central_management', 'authentication',
      'modsecurity', 'greensql', 'suricata', 'wazuh', 'graylog', 'owasp_zap', 'packetfence'
    ];
    return hexaShieldComponents.some(c => type.includes(c)) ? "stroke-dasharray: 4,2" : "";
  };
  
  // ==================== Node and Edge Management ====================
  
  // Generate default nodes for first-time setup
  function getDefaultNodes() {
    return [
      // Internet
      { id: 'internet-1', type: 'internet', name: 'Internet', x: 300, y: 40, isHexaShield: false },

      // Edge Layer
      { id: 'border-router', type: 'router', name: 'Border Router', x: 200, y: 160, isHexaShield: false },
      { id: 'core-switch', type: 'server', name: 'Core Switch', x: 400, y: 160, isHexaShield: false },

      // DMZ Layer (spread horizontally)
      { id: 'web-server', type: 'webapp', name: 'Web Server (WAF)', x: 100, y: 320, isHexaShield: false },
      { id: 'mail-server', type: 'server', name: 'Mail Server (SEC)', x: 300, y: 320, isHexaShield: false },
      { id: 'vpn-server', type: 'server', name: 'VPN Server (SEC)', x: 500, y: 320, isHexaShield: false },
      { id: 'internal-firewall', type: 'firewall', name: 'Internal Firewall', x: 300, y: 440, isHexaShield: false },

      // Internal Network (spread horizontally)
      { id: 'database-1', type: 'database', name: 'Database', x: 80, y: 600, isHexaShield: false },
      { id: 'file-server', type: 'fileserver', name: 'File Server', x: 220, y: 600, isHexaShield: false },
      { id: 'dev-servers', type: 'server', name: 'Dev Servers', x: 380, y: 600, isHexaShield: false },
      { id: 'workstations', type: 'server', name: 'Workstations', x: 520, y: 600, isHexaShield: false },

      // HexaShield Central Management
      { id: 'hexashield-core', type: 'central_management', name: 'HexaShield Central Management', x: 900, y: 80, isHexaShield: true },

      // Security Protection (single vertical column, spaced)
      { id: 'modsecurity', type: 'modsecurity', name: 'Web App Firewall (ModSecurity)', x: 900, y: 200, isHexaShield: true },
      { id: 'greensql', type: 'greensql', name: 'Database Security (GreenSQL)', x: 900, y: 300, isHexaShield: true },
      { id: 'packetfence', type: 'packetfence', name: 'Network Access (PacketFence)', x: 900, y: 400, isHexaShield: true },
      { id: 'wazuh', type: 'wazuh', name: 'Endpoint Protection (Wazuh Agents)', x: 900, y: 500, isHexaShield: true },

      // Security Monitoring (vertical column, far right, spaced)
      { id: 'suricata', type: 'suricata', name: 'Network IDS/IPS (Suricata)', x: 1200, y: 220, isHexaShield: true },
      { id: 'ossec', type: 'wazuh', name: 'Host-based Agents (OSSEC/Wazuh)', x: 1200, y: 320, isHexaShield: true },
      { id: 'graylog', type: 'graylog', name: 'Log Aggregator (Graylog)', x: 1200, y: 420, isHexaShield: true },
      { id: 'owasp_zap', type: 'owasp_zap', name: 'App Scanners (OWASP ZAP)', x: 1200, y: 520, isHexaShield: true },
    ];
  }
  
  // Generate default edges for first-time setup
  function getDefaultEdges() {
    return [
      // Network flow
      { id: 'e1', from: 'internet-1', to: 'border-router', status: 'active' },
      { id: 'e2', from: 'border-router', to: 'core-switch', status: 'active' },
      { id: 'e3', from: 'core-switch', to: 'web-server', status: 'active' },
      { id: 'e4', from: 'core-switch', to: 'mail-server', status: 'active' },
      { id: 'e5', from: 'core-switch', to: 'vpn-server', status: 'active' },
      { id: 'e6', from: 'web-server', to: 'internal-firewall', status: 'active' },
      { id: 'e7', from: 'mail-server', to: 'internal-firewall', status: 'active' },
      { id: 'e8', from: 'vpn-server', to: 'internal-firewall', status: 'active' },
      { id: 'e9', from: 'internal-firewall', to: 'database-1', status: 'active' },
      { id: 'e10', from: 'internal-firewall', to: 'file-server', status: 'active' },
      { id: 'e11', from: 'internal-firewall', to: 'dev-servers', status: 'active' },
      { id: 'e12', from: 'internal-firewall', to: 'workstations', status: 'active' },

      // Central Management to all security components
      { id: 'e13', from: 'hexashield-core', to: 'modsecurity', status: 'secure' },
      { id: 'e14', from: 'hexashield-core', to: 'greensql', status: 'secure' },
      { id: 'e15', from: 'hexashield-core', to: 'packetfence', status: 'secure' },
      { id: 'e16', from: 'hexashield-core', to: 'wazuh', status: 'secure' },
      { id: 'e17', from: 'hexashield-core', to: 'suricata', status: 'secure' },
      { id: 'e18', from: 'hexashield-core', to: 'ossec', status: 'secure' },
      { id: 'e19', from: 'hexashield-core', to: 'graylog', status: 'secure' },
      { id: 'e20', from: 'hexashield-core', to: 'owasp_zap', status: 'secure' },

      // Security Protection components to relevant nodes
      { id: 'e21', from: 'modsecurity', to: 'web-server', status: 'integration' },
      { id: 'e22', from: 'greensql', to: 'database-1', status: 'integration' },
      { id: 'e23', from: 'packetfence', to: 'vpn-server', status: 'integration' },
      { id: 'e24', from: 'packetfence', to: 'workstations', status: 'integration' },
      { id: 'e25', from: 'wazuh', to: 'dev-servers', status: 'integration' },
      { id: 'e26', from: 'wazuh', to: 'workstations', status: 'integration' },

      // Security Monitoring components to relevant nodes
      { id: 'e27', from: 'suricata', to: 'border-router', status: 'integration' },
      { id: 'e28', from: 'ossec', to: 'mail-server', status: 'integration' },
      { id: 'e29', from: 'ossec', to: 'dev-servers', status: 'integration' },
      { id: 'e30', from: 'graylog', to: 'internal-firewall', status: 'integration' },
      { id: 'e31', from: 'owasp_zap', to: 'web-server', status: 'integration' },
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
  
  // Helper to get bounding box for a group of nodes
  const getGroupBoundingBox = (nodeIds, padding = 70) => {
    const groupNodes = network.nodes.filter(n => nodeIds.includes(n.id));
    if (groupNodes.length === 0) return null;
    const xs = groupNodes.map(n => n.x);
    const ys = groupNodes.map(n => n.y);
    const minX = Math.min(...xs) - padding;
    const maxX = Math.max(...xs) + padding;
    const minY = Math.min(...ys) - padding;
    const maxY = Math.max(...ys) + padding;
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  };

  // Define node groups
  const dmzIds = ['web-server', 'mail-server', 'vpn-server', 'border-router', 'core-switch'];
  const internalIds = ['database-1', 'file-server', 'dev-servers', 'workstations', 'internal-firewall'];
  const protectionIds = ['modsecurity', 'greensql', 'packetfence', 'wazuh'];
  const monitoringIds = ['suricata', 'ossec', 'graylog', 'owasp_zap'];
  const centralMgmtIds = ['hexashield-core'];

  // Render group backgrounds with label above
  const renderGroupBackground = (bbox, label, color, fill) => {
    if (!bbox) return null;
    return (
      <g>
        <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx="36" fill={fill} stroke={color} strokeWidth="4" />
        <text x={bbox.x + bbox.width / 2} y={bbox.y - 16} fill={color} fontWeight="bold" fontSize="28" textAnchor="middle" style={{ pointerEvents: 'none', textShadow: '0 2px 8px #000' }}>{label}</text>
      </g>
    );
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
              <div className="space-y-1 max-h-96 overflow-y-auto">
                <h4 className="text-white text-sm font-medium mb-1 px-2">SME Infrastructure</h4>
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
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('fileserver')}
                >
                  <FileText className="h-4 w-4 mr-2 text-orange-400" />
                  File Server
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('erp_system')}
                >
                  <Cpu className="h-4 w-4 mr-2 text-pink-400" />
                  ERP System
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('crm_system')}
                >
                  <Users className="h-4 w-4 mr-2 text-cyan-400" />
                  CRM System
                </button>

                <div className="border-t border-gray-700 my-1"></div>
                <h4 className="text-white text-sm font-medium mb-1 px-2">HexaShield Components</h4>
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

                <div className="border-t border-gray-700 my-1"></div>
                <h4 className="text-white text-sm font-medium mb-1 px-2">HexaShield Tools</h4>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('modsecurity')}
                >
                  <Shield className="h-4 w-4 mr-2 text-purple-500" />
                  ModSecurity WAF
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('greensql')}
                >
                  <Database className="h-4 w-4 mr-2 text-green-600" />
                  GreenSQL
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('suricata')}
                >
                  <Search className="h-4 w-4 mr-2 text-blue-600" />
                  Suricata IDS/IPS
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('wazuh')}
                >
                  <Shield className="h-4 w-4 mr-2 text-orange-600" />
                  Wazuh Agents
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('graylog')}
                >
                  <FileText className="h-4 w-4 mr-2 text-gray-600" />
                  Graylog
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('owasp_zap')}
                >
                  <Code className="h-4 w-4 mr-2 text-red-600" />
                  OWASP ZAP
                </button>
                <button 
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-sm flex items-center text-white"
                  onClick={() => handleAddNode('packetfence')}
                >
                  <Wifi className="h-4 w-4 mr-2 text-indigo-600" />
                  PacketFence NAC
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
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-gray-400 mr-1"></div>
            <span>SME Infrastructure</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-blue-500 stroke-dasharray-2 mr-1"></div>
            <span>Integration Connection</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-green-500 mr-1"></div>
            <span>Secure HexaShield Connection</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full border border-blue-500 mr-1"></div>
            <span>HexaShield Component</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full border border-green-500 mr-1"></div>
            <span>HexaShield Tool</span>
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
          {/* Render group backgrounds first */}
          {renderGroupBackground(getGroupBoundingBox(dmzIds), 'DMZ', '#22d3ee', 'rgba(34,211,238,0.08)')}
          {renderGroupBackground(getGroupBoundingBox(internalIds), 'Internal Network', '#fbbf24', 'rgba(251,191,36,0.08)')}
          {renderGroupBackground(getGroupBoundingBox(protectionIds), 'Security Protection & Response', '#4ade80', 'rgba(74,222,128,0.08)')}
          {renderGroupBackground(getGroupBoundingBox(monitoringIds), 'Security Monitoring', '#818cf8', 'rgba(129,140,248,0.08)')}
          {renderGroupBackground(getGroupBoundingBox(centralMgmtIds), 'Central Management', '#f472b6', 'rgba(244,114,182,0.10)')}

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