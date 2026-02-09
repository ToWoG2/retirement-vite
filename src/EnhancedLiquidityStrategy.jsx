import React, { useState, useMemo } from 'react';
import {
  liquidityTiers,
  calculateLiquidityNeeds,
  determineMarketCondition,
  calculateRefillingSchedule,
  securitiesBackedLoan,
  emergencyGuidelines,
  getAllTiers
} from './liquidityStrategy';

const EnhancedLiquidityStrategy = ({
  annualExpenses = 60000,
  currentLiquidity = { tierI: 15000, tierII: 50000, tierIII: 80000 },
  longevityBucketValue = 500000,
  currency = 'USD',
  language = 'en'
}) => {
  const [marketMetrics, setMarketMetrics] = useState({
    currentPrice: 4800,
    allTimeHigh: 5000,
    yearAgoPrice: 4200,
    vix: 18,
    dailyVolatility: 1.2
  });

  const [showSBLOC, setShowSBLOC] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const translations = {
    en: {
      title: 'Enhanced Liquidity Strategy',
      subtitle: 'Three-Tier Framework for Optimal Cash Management',
      tierStructure: 'Tier Structure',
      currentAllocation: 'Current Allocation',
      targetAllocation: 'Target Allocation',
      deficit: 'Deficit',
      surplus: 'Surplus',
      marketCondition: 'Market Condition',
      refillingStrategy: 'Refilling Strategy',
      sbloc: 'Securities-Backed Line of Credit',
      emergencyGuide: 'Emergency Guidelines',
      totalLiquidity: 'Total Liquidity',
      months: 'months',
      instruments: 'Typical Instruments',
      expectedReturn: 'Expected Return',
      accessTime: 'Access Time',
      updateMarket: 'Update Market Metrics',
      calculate: 'Calculate',
      advantages: 'Advantages',
      risks: 'Risks',
      useCases: 'Use Cases',
      capacity: 'Loan Capacity',
      maxLoan: 'Maximum Loan',
      safeUse: 'Safe Utilization',
      monthlyInterest: 'Monthly Interest',
      scenario: 'Scenario'
    },
    de: {
      title: 'Erweiterte Liquiditätsstrategie',
      subtitle: 'Drei-Stufen-Framework für optimales Cash-Management',
      tierStructure: 'Stufenstruktur',
      currentAllocation: 'Aktuelle Allokation',
      targetAllocation: 'Ziel-Allokation',
      deficit: 'Defizit',
      surplus: 'Überschuss',
      marketCondition: 'Marktbedingung',
      refillingStrategy: 'Nachfüllstrategie',
      sbloc: 'Wertpapierbesicherte Kreditlinie',
      emergencyGuide: 'Notfall-Leitfaden',
      totalLiquidity: 'Gesamtliquidität',
      months: 'Monate',
      instruments: 'Typische Instrumente',
      expectedReturn: 'Erwartete Rendite',
      accessTime: 'Zugriffszeit',
      updateMarket: 'Marktmetriken aktualisieren',
      calculate: 'Berechnen',
      advantages: 'Vorteile',
      risks: 'Risiken',
      useCases: 'Anwendungsfälle',
      capacity: 'Kreditkapazität',
      maxLoan: 'Maximales Darlehen',
      safeUse: 'Sichere Nutzung',
      monthlyInterest: 'Monatliche Zinsen',
      scenario: 'Szenario'
    },
    fr: {
      title: 'Stratégie de liquidité améliorée',
      subtitle: 'Cadre à trois niveaux pour gestion optimale de trésorerie',
      tierStructure: 'Structure des niveaux',
      currentAllocation: 'Allocation actuelle',
      targetAllocation: 'Allocation cible',
      deficit: 'Déficit',
      surplus: 'Excédent',
      marketCondition: 'Condition du marché',
      refillingStrategy: 'Stratégie de remplissage',
      sbloc: 'Ligne de crédit adossée aux titres',
      emergencyGuide: 'Guide d\'urgence',
      totalLiquidity: 'Liquidité totale',
      months: 'mois',
      instruments: 'Instruments typiques',
      expectedReturn: 'Rendement attendu',
      accessTime: 'Temps d\'accès',
      updateMarket: 'Mettre à jour métriques marché',
      calculate: 'Calculer',
      advantages: 'Avantages',
      risks: 'Risques',
      useCases: 'Cas d\'usage',
      capacity: 'Capacité de prêt',
      maxLoan: 'Prêt maximum',
      safeUse: 'Utilisation sûre',
      monthlyInterest: 'Intérêts mensuels',
      scenario: 'Scénario'
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CHF: 'CHF '
  };

  const symbol = currencySymbols[currency] || '$';

  // Calculate target liquidity
  const targetLiquidity = useMemo(() => 
    calculateLiquidityNeeds(annualExpenses),
    [annualExpenses]
  );

  // Determine market condition
  const marketCondition = useMemo(() => 
    determineMarketCondition(marketMetrics),
    [marketMetrics]
  );

  // Calculate refilling schedule
  const refillingSchedule = useMemo(() => 
    calculateRefillingSchedule(
      currentLiquidity,
      targetLiquidity,
      marketCondition,
      longevityBucketValue
    ),
    [currentLiquidity, targetLiquidity, marketCondition, longevityBucketValue]
  );

  // SBLOC capacity
  const sblocCapacity = useMemo(() => 
    securitiesBackedLoan.calculateCapacity(longevityBucketValue),
    [longevityBucketValue]
  );

  const formatCurrency = (value) => {
    return `${symbol}${Math.round(value).toLocaleString()}`;
  };

  const getMarketConditionColor = (condition) => {
    const colors = {
      bullMarket: 'bg-green-100 text-green-800 border-green-300',
      normalMarket: 'bg-blue-100 text-blue-800 border-blue-300',
      volatileMarket: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      bearMarket: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[condition] || colors.normalMarket;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
        <p className="text-green-100 text-sm">{t('subtitle')}</p>
      </div>

      {/* Three-Tier Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('tierStructure')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getAllTiers().map((tier, idx) => {
            const tierKey = tier.id;
            const current = currentLiquidity[tierKey] || 0;
            const target = targetLiquidity[tierKey] || 0;
            const difference = current - target;
            const percentage = target > 0 ? (current / target) * 100 : 0;

            return (
              <div 
                key={tier.id}
                className="border-2 rounded-lg p-4"
                style={{ borderColor: tier.color }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                  <h4 className="font-semibold text-slate-800">
                    {language === 'de' ? tier.nameDE : language === 'fr' ? tier.nameFR : tier.name}
                  </h4>
                </div>

                <p className="text-sm text-slate-600 mb-3">
                  {language === 'de' ? tier.descriptionDE : language === 'fr' ? tier.descriptionFR : tier.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t('currentAllocation')}:</span>
                    <span className="font-semibold">{formatCurrency(current)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t('targetAllocation')}:</span>
                    <span className="font-semibold">{formatCurrency(target)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className={difference < 0 ? 'text-red-600' : 'text-green-600'}>
                      {difference < 0 ? t('deficit') : t('surplus')}:
                    </span>
                    <span className={`font-semibold ${difference < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(Math.abs(difference))}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all"
                        style={{ 
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: tier.color
                        }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {percentage.toFixed(0)}% of target
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="text-xs text-slate-600 space-y-1">
                      <div><strong>{t('expectedReturn')}:</strong> {tier.expectedReturn}%</div>
                      <div><strong>{t('accessTime')}:</strong> {tier.accessTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-slate-800">{t('totalLiquidity')}:</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-800">
                {formatCurrency(currentLiquidity.tierI + currentLiquidity.tierII + currentLiquidity.tierIII)}
              </div>
              <div className="text-sm text-slate-600">
                Target: {formatCurrency(targetLiquidity.total)} 
                ({targetLiquidity.totalMonths.toFixed(1)} {t('months')})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Condition & Refilling Strategy */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('refillingStrategy')}</h3>

        <div className={`mb-4 p-4 rounded-lg border-2 ${getMarketConditionColor(marketCondition)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{t('marketCondition')}:</span>
            <span className="text-lg font-bold">
              {marketCondition.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </div>
          <p className="text-sm">{refillingSchedule.strategy}</p>
          <p className="text-sm mt-1 italic">{refillingSchedule.rationale}</p>
        </div>

        {refillingSchedule.schedule.length > 0 ? (
          <div className="space-y-3">
            {refillingSchedule.schedule.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">Tier {item.tier}</span>
                    <span className="text-sm text-slate-600 ml-2">Priority: {item.priority}</span>
                  </div>
                  <span className="text-lg font-bold">{formatCurrency(item.amount)}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{item.rationale}</p>
              </div>
            ))}

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900">Total Refilling Needed:</span>
                <span className="text-xl font-bold text-blue-900">{formatCurrency(refillingSchedule.totalAmount)}</span>
              </div>
              <div className="text-sm text-blue-700 mt-2">
                {refillingSchedule.feasible ? (
                  <span className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Feasible: {((refillingSchedule.totalAmount / longevityBucketValue) * 100).toFixed(1)}% of longevity bucket
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="text-red-600">⚠</span>
                    May require SBLOC or expense reduction
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold">✓ All tiers adequately funded</p>
            <p className="text-sm text-green-700 mt-1">No immediate refilling required</p>
          </div>
        )}
      </div>

      {/* SBLOC Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => setShowSBLOC(!showSBLOC)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="text-lg font-semibold text-slate-800">{t('sbloc')}</h3>
          <span className="text-slate-400">{showSBLOC ? '−' : '+'}</span>
        </button>

        {showSBLOC && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">{t('maxLoan')}</div>
                <div className="text-lg font-bold text-slate-800">{formatCurrency(sblocCapacity.maxLoan)}</div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-700">{t('safeUse')} (50%)</div>
                <div className="text-lg font-bold text-green-800">{formatCurrency(sblocCapacity.safeUtilization)}</div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-700">{t('monthlyInterest')}</div>
                <div className="text-lg font-bold text-blue-800">{formatCurrency(sblocCapacity.monthlyInterest)}</div>
              </div>

              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-sm text-red-700">Margin Call Level</div>
                <div className="text-lg font-bold text-red-800">{formatCurrency(sblocCapacity.marginCallLevel)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">{t('advantages')}</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                  {securitiesBackedLoan.typical.advantages.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">{t('risks')}</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                  {securitiesBackedLoan.typical.risks.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Emergency Guidelines */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => setShowEmergency(!showEmergency)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="text-lg font-semibold text-slate-800">{t('emergencyGuide')}</h3>
          <span className="text-slate-400">{showEmergency ? '−' : '+'}</span>
        </button>

        {showEmergency && (
          <div className="mt-4 space-y-4">
            {Object.entries(emergencyGuidelines).map(([scenario, guide]) => (
              <div key={scenario} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-2 capitalize">
                  {scenario.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                
                {typeof guide === 'object' && !Array.isArray(guide) && (
                  <div className="space-y-2 text-sm text-slate-700">
                    {Object.entries(guide).map(([key, value]) => (
                      <div key={key}>
                        <strong className="text-slate-800">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>{' '}
                        {Array.isArray(value) ? (
                          <ul className="list-disc list-inside ml-4 mt-1">
                            {value.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Educational Note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Liquidity Strategy Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Maintain Tier I at all times - never let it fall below 50% of target</li>
              <li>In bear markets, live off existing liquidity longer rather than selling at losses</li>
              <li>Consider SBLOC for emergencies during market downturns</li>
              <li>Refill aggressively in bull markets to lock in gains</li>
              <li>Review and rebalance quarterly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLiquidityStrategy;
