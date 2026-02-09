import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { riskProfiles, getAllocation, getRiskProfile } from './strategicAssetAllocation';

const RiskProfileAssetAllocation = ({ 
  selectedProfile = 'D', 
  onProfileChange, 
  language = 'en',
  currency = 'USD' 
}) => {
  const [investorType, setInvestorType] = useState('taxable');
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);

  const translations = {
    en: {
      title: 'Risk Profile & Strategic Asset Allocation',
      yourRiskProfile: 'Your Risk Profile',
      investorType: 'Investor Type',
      taxable: 'Taxable Account',
      taxDeferred: 'Tax-Deferred (IRA/401k)',
      yieldFocused: 'Yield-Focused',
      sustainable: 'Sustainable/ESG',
      expectedReturn: 'Expected Return',
      expectedVolatility: 'Expected Volatility',
      timeHorizon: 'Time Horizon',
      suitableFor: 'Suitable For',
      assetAllocation: 'Strategic Asset Allocation',
      detailedBreakdown: 'Detailed Breakdown',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details',
      cash: 'Cash',
      bonds: 'Bonds',
      stocks: 'Stocks',
      alternatives: 'Alternatives',
      allocation: 'Allocation',
      keyCharacteristics: 'Key Characteristics',
      recommendedFor: 'Recommended For'
    },
    de: {
      title: 'Risikoprofil & Strategische Vermögensallokation',
      yourRiskProfile: 'Ihr Risikoprofil',
      investorType: 'Anlegertyp',
      taxable: 'Steuerpflichtiges Konto',
      taxDeferred: 'Steueraufgeschoben (Pension)',
      yieldFocused: 'Ertragsorientiert',
      sustainable: 'Nachhaltig/ESG',
      expectedReturn: 'Erwartete Rendite',
      expectedVolatility: 'Erwartete Volatilität',
      timeHorizon: 'Zeithorizont',
      suitableFor: 'Geeignet für',
      assetAllocation: 'Strategische Vermögensallokation',
      detailedBreakdown: 'Detaillierte Aufschlüsselung',
      showDetails: 'Details anzeigen',
      hideDetails: 'Details ausblenden',
      cash: 'Bargeld',
      bonds: 'Anleihen',
      stocks: 'Aktien',
      alternatives: 'Alternativen',
      allocation: 'Allokation',
      keyCharacteristics: 'Hauptmerkmale',
      recommendedFor: 'Empfohlen für'
    },
    fr: {
      title: 'Profil de risque & Allocation stratégique d\'actifs',
      yourRiskProfile: 'Votre profil de risque',
      investorType: 'Type d\'investisseur',
      taxable: 'Compte imposable',
      taxDeferred: 'Impôt différé (Retraite)',
      yieldFocused: 'Axé sur le rendement',
      sustainable: 'Durable/ESG',
      expectedReturn: 'Rendement attendu',
      expectedVolatility: 'Volatilité attendue',
      timeHorizon: 'Horizon temporel',
      suitableFor: 'Approprié pour',
      assetAllocation: 'Allocation stratégique d\'actifs',
      detailedBreakdown: 'Répartition détaillée',
      showDetails: 'Afficher les détails',
      hideDetails: 'Masquer les détails',
      cash: 'Liquidités',
      bonds: 'Obligations',
      stocks: 'Actions',
      alternatives: 'Alternatifs',
      allocation: 'Allocation',
      keyCharacteristics: 'Caractéristiques clés',
      recommendedFor: 'Recommandé pour'
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const profile = getRiskProfile(selectedProfile);
  const allocation = getAllocation(selectedProfile, investorType);

  const profileName = language === 'de' ? profile.nameDE : 
                      language === 'fr' ? profile.nameFR : 
                      profile.name;

  const profileDescription = language === 'de' ? profile.descriptionDE :
                             language === 'fr' ? profile.descriptionFR :
                             profile.description;

  // Prepare data for pie chart
  const pieChartData = useMemo(() => [
    { name: t('cash'), value: allocation.cash, color: '#10b981' },
    { name: t('bonds'), value: allocation.bonds, color: '#3b82f6' },
    { name: t('stocks'), value: allocation.stocks, color: '#8b5cf6' },
    { name: t('alternatives'), value: allocation.alternatives, color: '#f59e0b' }
  ].filter(item => item.value > 0), [allocation, language]);

  // Prepare data for bar chart
  const barChartData = useMemo(() => [
    { 
      name: selectedProfile,
      cash: allocation.cash,
      bonds: allocation.bonds,
      stocks: allocation.stocks,
      alternatives: allocation.alternatives
    }
  ], [allocation, selectedProfile]);

  // Format detailed breakdown
  const detailedBreakdownData = useMemo(() => {
    const breakdown = [];
    
    Object.entries(allocation.breakdown).forEach(([category, items]) => {
      Object.entries(items).forEach(([asset, percentage]) => {
        breakdown.push({
          category,
          asset: asset.replace(/([A-Z])/g, ' $1').trim(),
          percentage
        });
      });
    });
    
    return breakdown.sort((a, b) => b.percentage - a.percentage);
  }, [allocation]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-800">{payload[0].name}</p>
          <p className="text-slate-600">{payload[0].value.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
        <p className="text-purple-100 text-sm">
          Based on UBS Wealth Way Portfolio-Based Approach
        </p>
      </div>

      {/* Risk Profile Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('yourRiskProfile')}</h3>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          {Object.entries(riskProfiles).map(([key, prof]) => (
            <button
              key={key}
              onClick={() => onProfileChange && onProfileChange(key)}
              className={`
                p-3 rounded-lg border-2 transition-all font-semibold
                ${selectedProfile === key 
                  ? 'border-current shadow-lg transform scale-105' 
                  : 'border-slate-200 hover:border-slate-300'
                }
              `}
              style={{ 
                color: selectedProfile === key ? prof.color : '#64748b',
                backgroundColor: selectedProfile === key ? `${prof.color}15` : 'white'
              }}
            >
              <div className="text-2xl mb-1">{key}</div>
              <div className="text-xs">{language === 'de' ? prof.nameDE : language === 'fr' ? prof.nameFR : prof.name}</div>
            </button>
          ))}
        </div>

        {/* Profile Details */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: profile.color }}
            >
              {selectedProfile}
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800">{profileName}</h4>
              <p className="text-sm text-slate-600">{profileDescription}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">{t('expectedReturn')}</div>
              <div className="text-2xl font-bold" style={{ color: profile.color }}>
                {profile.expectedReturn.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">{t('expectedVolatility')}</div>
              <div className="text-2xl font-bold text-slate-700">
                {profile.expectedVolatility.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">{t('timeHorizon')}</div>
              <div className="text-xl font-bold text-slate-700">
                {profile.timehorizon}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-sm font-semibold text-slate-700 mb-2">{t('suitableFor')}:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
              {profile.suitableFor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Investor Type Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('investorType')}</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: 'taxable', label: t('taxable'), icon: '💰' },
            { key: 'taxDeferred', label: t('taxDeferred'), icon: '🏦' },
            { key: 'yieldFocused', label: t('yieldFocused'), icon: '📈' },
            { key: 'sustainable', label: t('sustainable'), icon: '🌱' }
          ].map(type => (
            <button
              key={type.key}
              onClick={() => setInvestorType(type.key)}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${investorType === type.key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
                }
              `}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className={`text-sm font-medium ${investorType === type.key ? 'text-blue-700' : 'text-slate-600'}`}>
                {type.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Asset Allocation Visualization */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('assetAllocation')}</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-3 text-center">Asset Class Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-3 text-center">Allocation Breakdown</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: '%', position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="cash" stackId="a" fill="#10b981" name={t('cash')} />
                <Bar dataKey="bonds" stackId="a" fill="#3b82f6" name={t('bonds')} />
                <Bar dataKey="stocks" stackId="a" fill="#8b5cf6" name={t('stocks')} />
                <Bar dataKey="alternatives" stackId="a" fill="#f59e0b" name={t('alternatives')} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <div className="text-sm text-green-700 font-medium mb-1">{t('cash')}</div>
            <div className="text-2xl font-bold text-green-800">{allocation.cash}%</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="text-sm text-blue-700 font-medium mb-1">{t('bonds')}</div>
            <div className="text-2xl font-bold text-blue-800">{allocation.bonds}%</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="text-sm text-purple-700 font-medium mb-1">{t('stocks')}</div>
            <div className="text-2xl font-bold text-purple-800">{allocation.stocks}%</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
            <div className="text-sm text-orange-700 font-medium mb-1">{t('alternatives')}</div>
            <div className="text-2xl font-bold text-orange-800">{allocation.alternatives}%</div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">{t('detailedBreakdown')}</h3>
          <button
            onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {showDetailedBreakdown ? t('hideDetails') : t('showDetails')}
          </button>
        </div>

        {showDetailedBreakdown && (
          <div className="space-y-2">
            {detailedBreakdownData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: 
                        item.category === 'cash' ? '#10b981' :
                        item.category === 'bonds' ? '#3b82f6' :
                        item.category === 'stocks' ? '#8b5cf6' :
                        '#f59e0b'
                    }}
                  />
                  <div>
                    <div className="text-sm font-medium text-slate-800 capitalize">
                      {item.asset}
                    </div>
                    <div className="text-xs text-slate-500 capitalize">
                      {item.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800">{item.percentage}%</div>
                  <div className="w-24 bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: 
                          item.category === 'cash' ? '#10b981' :
                          item.category === 'bonds' ? '#3b82f6' :
                          item.category === 'stocks' ? '#8b5cf6' :
                          '#f59e0b'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guidance Note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Portfolio Guidance:</p>
            <p>
              This allocation is designed for the <strong>{profileName}</strong> risk profile.
              Adjust based on your specific needs, time horizon, and liquidity requirements.
              Consider using lower-risk allocations for your Liquidity Bucket and higher-risk 
              allocations for your Legacy Bucket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskProfileAssetAllocation;
