import React, { useState } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { Plus, Search, Filter, FileText, Edit, Trash2, Eye, CheckCircle } from 'lucide-react';

// Components
import RulesList from '../components/rules/RulesList';
import RuleEditor from '../components/rules/RuleEditor';
import RuleDetails from '../components/rules/RuleDetails';

const RuleCustomizationPage = () => {
  const { securityRules, addRule, updateRule, deleteRule } = useSecurity();
  
  const [selectedRule, setSelectedRule] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list, edit, create, view
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Filter rules based on search term and filter type
  const filteredRules = securityRules.filter(rule => {
    // Search term filtering
    if (searchTerm && !rule.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !rule.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Type filtering
    if (filterType !== 'all' && rule.type !== filterType) {
      return false;
    }
    
    return true;
  });
  
  // Handle rule selection
  const handleSelectRule = (rule) => {
    setSelectedRule(rule);
    setViewMode('view');
  };
  
  // Handle creating a new rule
  const handleCreateRule = () => {
    setSelectedRule(null);
    setViewMode('create');
  };
  
  // Handle editing a rule
  const handleEditRule = (rule) => {
    setSelectedRule(rule);
    setViewMode('edit');
  };
  
  // Handle deleting a rule
  const handleDeleteRule = (ruleId) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      deleteRule(ruleId);
      if (selectedRule && selectedRule.id === ruleId) {
        setSelectedRule(null);
        setViewMode('list');
      }
    }
  };
  
  // Handle saving a rule (create or update)
  const handleSaveRule = (rule) => {
    if (viewMode === 'create') {
      const newRule = addRule(rule);
      setSelectedRule(newRule);
      setViewMode('view');
    } else if (viewMode === 'edit') {
      updateRule(rule.id, rule);
      setSelectedRule(rule);
      setViewMode('view');
    }
  };
  
  // Handle cancelling edit/create
  const handleCancel = () => {
    if (selectedRule) {
      setViewMode('view');
    } else {
      setViewMode('list');
    }
  };
  
  // Get unique rule types for filtering
  const ruleTypes = ['all', ...new Set(securityRules.map(rule => rule.type))];
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Rule Customization</h2>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleCreateRule}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </button>
      </div>
      
      {viewMode === 'list' && (
        <>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search rules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {ruleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Rules List */}
          <RulesList
            rules={filteredRules}
            onSelectRule={handleSelectRule}
            onEditRule={handleEditRule}
            onDeleteRule={handleDeleteRule}
          />
        </>
      )}
      
      {(viewMode === 'edit' || viewMode === 'create') && (
        <RuleEditor
          rule={selectedRule}
          mode={viewMode}
          onSave={handleSaveRule}
          onCancel={handleCancel}
        />
      )}
      
      {viewMode === 'view' && selectedRule && (
        <RuleDetails
          rule={selectedRule}
          onEdit={() => handleEditRule(selectedRule)}
          onBack={() => setViewMode('list')}
          onDelete={() => handleDeleteRule(selectedRule.id)}
        />
      )}
    </div>
  );
};

export default RuleCustomizationPage;
