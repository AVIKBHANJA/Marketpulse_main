import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, TrendingUp, Users, AlertCircle, Calendar, Info } from 'lucide-react';

const StockAnalysisDisplay = ({ analysisText }) => {
  // Parse the markdown-like text into structured data
  const parseAnalysis = (text) => {
    if (!text) return {};
    
    const sections = {};
    let currentSection = '';
    
    text.split('\n').forEach(line => {
      if (line.startsWith('###')) {
        currentSection = 'title';
        sections[currentSection] = line.replace('###', '').trim();
      } else if (line.startsWith('**') && line.endsWith(':**')) {
        currentSection = line.replace(/\*\*/g, '').replace(':', '');
        sections[currentSection] = [];
      } else if (line.trim().startsWith('-')) {
        if (Array.isArray(sections[currentSection])) {
          const content = line.replace('-', '').trim();
          if (content) {
            sections[currentSection].push(content);
          }
        }
      } else if (line.trim() && currentSection && !Array.isArray(sections[currentSection])) {
        const content = line.trim();
        if (content && !content.startsWith('---')) {
          sections[currentSection] = content;
        }
      }
    });
    
    return sections;
  };

  const [expandedSections, setExpandedSections] = useState({});
  const analysis = parseAnalysis(analysisText);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const AnalysisCard = ({ title, content, icon: Icon }) => {
    const isExpanded = expandedSections[title];
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 overflow-hidden">
        <button
          onClick={() => toggleSection(title)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-gray-900 dark:text-white">{title}</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {isExpanded && Array.isArray(content) && content.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-2">
              {content.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {isExpanded && !Array.isArray(content) && content && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">{content}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          Note: This investment recommendation is based on the analysis of financial health, 
          market sentiment, qualitative data, insider trading activity, and upcoming events. 
          It is essential to conduct further research and seek professional advice before 
          making investment decisions.
        </p>
      </div>

      <AnalysisCard 
        title="Company Overview" 
        content={analysis['Company Overview']} 
        icon={FileText} 
      />
      
      <AnalysisCard 
        title="Financial Health" 
        content={analysis['Financial Health']} 
        icon={TrendingUp} 
      />
      
      <AnalysisCard 
        title="Market Sentiment" 
        content={analysis['Market Sentiment']} 
        icon={Users} 
      />
      
      <AnalysisCard 
        title="Insider Trading Activity" 
        content={analysis['Insider Trading Activity']} 
        icon={AlertCircle} 
      />
      
      <AnalysisCard 
        title="Upcoming Events" 
        content={analysis['Upcoming Events']} 
        icon={Calendar} 
      />

      <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 mt-6">
        <div className="flex items-center mb-2">
          <Info className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="font-medium text-gray-900 dark:text-white">Investment Opinion</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {analysis['Investment Opinion']}
        </p>
      </div>
    </div>
  );
};

export default StockAnalysisDisplay;