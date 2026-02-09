import React, { useState } from 'react';
import LegalTaxFramework from './LegalTaxFramework';
import RiskProfileAssetAllocation from './RiskProfileAssetAllocation';
import EnhancedLiquidityStrategy from './EnhancedLiquidityStrategy';
import LongevityBucketRefinement from './LongevityBucketRefinement';

// Import the main calculator component (it exports as default at the end)
import RetirementPlannerComplete from './RetirementPlannerComplete';

const RetirementPlannerWithTabs = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  
  // Shared state between tabs
  const [sharedState, setSharedState] = useState({
    country: 'LU',
    language: 'en',
    currency: 'EUR',
    riskProfile: 'D'
  });

  const tabs = [
  { 
    id: 'calculator', 
    label: { 
      en: 'Retirement Calculator', 
      de: 'Rentenrechner', 
      fr: 'Calculateur de Retraite' 
    }, 
    icon: '📊' 
  },
  { 
    id: 'asset-allocation', 
    label: { 
      en: 'Asset Allocation', 
      de: 'Vermögensallokation', 
      fr: 'Allocation d\'Actifs' 
    }, 
    icon: '📈' 
  },
  { 
    id: 'liquidity',           // NEW TAB
    label: { 
      en: 'Liquidity Strategy', 
      de: 'Liquiditätsstrategie', 
      fr: 'Stratégie de Liquidité' 
    }, 
    icon: '💰' 
  },
  { 
    id: 'legal-tax', 
    label: { 
      en: 'Legal & Tax Framework', 
      de: 'Rechts- & Steuerrahmen', 
      fr: 'Cadre Juridique & Fiscal' 
    }, 
    icon: '⚖️' 
  },
  { 
  id: 'longevity',
  label: { 
    en: 'Longevity Planning', 
    de: 'Langlebigkeitsplanung', 
    fr: 'Planification de Longévité' 
  }, 
  icon: '⏳' 
} 
];

  const t = (obj) => obj[sharedState.language] || obj.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-4 font-medium text-sm transition-all relative whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {t(tab.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className={activeTab === 'calculator' ? '' : 'max-w-7xl mx-auto p-4 md:p-8'}>
        
        {/* CALCULATOR TAB - Your existing calculator runs here */}
        {activeTab === 'calculator' && (
          <div className="animate-fadeIn">
            <RetirementPlannerComplete />
          </div>
        )}
        
        {/* ASSET ALLOCATION TAB */}
        {activeTab === 'asset-allocation' && (
          <div className="animate-fadeIn">
            <RiskProfileAssetAllocation 
              selectedProfile={sharedState.riskProfile}
              onProfileChange={(profile) => setSharedState(prev => ({ ...prev, riskProfile: profile }))}
              language={sharedState.language}
              currency={sharedState.currency}
            />
          </div>
        )}
        
        {/* LIQUIDITY STRATEGY TAB */}
        {activeTab === 'liquidity' && (
          <div className="animate-fadeIn">
            <EnhancedLiquidityStrategy 
              annualExpenses={60000}  // Replace with actual value from calculator
              currentLiquidity={{
                tierI: 15000,
                tierII: 50000,
                tierIII: 80000
              }}
              longevityBucketValue={500000}  // Replace with actual value
              currency={sharedState.currency}
              language={sharedState.language}
            />
          </div>
        )}

        {/* LONGEVITY PLANNING TAB */}
        {activeTab === 'longevity' && (
          <div className="animate-fadeIn">
            <LongevityBucketRefinement 
              country={sharedState.country}
              gender="male"  // Get from calculator if available
              currentAge={65}  // Get from calculator if available
              portfolioValue={1000000}  // Get from calculator
              annualExpenses={60000}  // Get from calculator
              guaranteedIncome={20000}  // Social Security + pension
              currency={sharedState.currency}
              language={sharedState.language}
            />
          </div>
        )}

        {/* LEGAL & TAX TAB */}
        {activeTab === 'legal-tax' && (
          <div className="animate-fadeIn">
            <LegalTaxFramework 
              selectedCountry={sharedState.country}
              language={sharedState.language}
            />
          </div>
        )}
      </div>

      {/* Add fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RetirementPlannerWithTabs;
