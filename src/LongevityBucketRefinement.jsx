import React, { useState, useMemo } from 'react';
import {
  calculateLifeExpectancy,
  healthFactors,
  lifestyleFactors,
  sequenceOfReturnsRisk,
  spendingFlexibility
} from './longevityData';
import {
  annuityTypes,
  calculateAnnuityPayout,
  annuityVsPortfolio,
  annuitizationStrategy
} from './annuityAnalysis';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LongevityBucketRefinement = ({
  country = 'LU',
  gender = 'male',
  currentAge = 65,
  portfolioValue = 1000000,
  annualExpenses = 60000,
  guaranteedIncome = 20000,
  currency = 'USD',
  language = 'en'
}) => {
  const [healthStatus, setHealthStatus] = useState('good');
  const [lifestyleData, setLifestyleData] = useState({
    smoking: 'never',
    exercise: 'moderate_3to4',
    bmi: 'normal',
    alcohol: 'light',
    stress: 'moderate',
    sleep: 'good',
    socialConnections: 'moderate'
  });

  const [annuityPremium, setAnnuityPremium] = useState(200000);
  const [showAnnuityDetail, setShowAnnuityDetail] = useState(false);
  const [showSequenceRisk, setShowSequenceRisk] = useState(false);
  const [showSpendingRules, setShowSpendingRules] = useState(false);

  const translations = {
    en: {
      title: 'Longevity Bucket Refinement',
      subtitle: 'Advanced Life Expectancy, Annuities & Risk Management',
      lifeExpectancy: 'Life Expectancy Calculator',
      healthStatus: 'Health Status',
      lifestyle: 'Lifestyle Factors',
      results: 'Results',
      baseLE: 'Base Life Expectancy',
      adjustedLE: 'Adjusted Life Expectancy',
      remainingYears: 'Remaining Years',
      planningHorizon: 'Planning Horizon',
      conservative: 'Conservative',
      moderate: 'Moderate',
      aggressive: 'Aggressive',
      annuityAnalysis: 'Annuity Analysis',
      sequenceRisk: 'Sequence of Returns Risk',
      spendingFlexibility: 'Dynamic Spending Rules',
      premium: 'Premium',
      annualIncome: 'Annual Income',
      monthlyIncome: 'Monthly Income',
      breakEven: 'Break-even',
      years: 'years',
      compare: 'Compare',
      viewDetails: 'View Details',
      hideDetails: 'Hide Details',
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average',
      poor: 'Poor'
    },
    de: {
      title: 'Langlebigkeits-Eimer-Verfeinerung',
      subtitle: 'Erweiterte Lebenserwartung, Renten & Risikomanagement',
      lifeExpectancy: 'Lebenserwartungsrechner',
      healthStatus: 'Gesundheitszustand',
      lifestyle: 'Lebensstilfaktoren',
      results: 'Ergebnisse',
      baseLE: 'Basis-Lebenserwartung',
      adjustedLE: 'Angepasste Lebenserwartung',
      remainingYears: 'Verbleibende Jahre',
      planningHorizon: 'Planungshorizont',
      conservative: 'Konservativ',
      moderate: 'Moderat',
      aggressive: 'Aggressiv',
      annuityAnalysis: 'Rentenanalyse',
      sequenceRisk: 'Renditefolgenrisiko',
      spendingFlexibility: 'Dynamische Ausgabenregeln',
      premium: 'Prämie',
      annualIncome: 'Jährliches Einkommen',
      monthlyIncome: 'Monatliches Einkommen',
      breakEven: 'Break-even',
      years: 'Jahre',
      compare: 'Vergleichen',
      viewDetails: 'Details anzeigen',
      hideDetails: 'Details verbergen',
      excellent: 'Ausgezeichnet',
      good: 'Gut',
      average: 'Durchschnittlich',
      poor: 'Schlecht'
    },
    fr: {
      title: 'Raffinement du compartiment de longévité',
      subtitle: 'Espérance de vie avancée, rentes et gestion des risques',
      lifeExpectancy: 'Calculateur d\'espérance de vie',
      healthStatus: 'État de santé',
      lifestyle: 'Facteurs de style de vie',
      results: 'Résultats',
      baseLE: 'Espérance de vie de base',
      adjustedLE: 'Espérance de vie ajustée',
      remainingYears: 'Années restantes',
      planningHorizon: 'Horizon de planification',
      conservative: 'Conservateur',
      moderate: 'Modéré',
      aggressive: 'Agressif',
      annuityAnalysis: 'Analyse de rente',
      sequenceRisk: 'Risque de séquence de rendements',
      spendingFlexibility: 'Règles de dépenses dynamiques',
      premium: 'Prime',
      annualIncome: 'Revenu annuel',
      monthlyIncome: 'Revenu mensuel',
      breakEven: 'Seuil de rentabilité',
      years: 'années',
      compare: 'Comparer',
      viewDetails: 'Voir les détails',
      hideDetails: 'Masquer les détails',
      excellent: 'Excellent',
      good: 'Bon',
      average: 'Moyen',
      poor: 'Mauvais'
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

  // Calculate life expectancy
  const leCalc = useMemo(() => 
    calculateLifeExpectancy(country, gender, currentAge, healthStatus, lifestyleData),
    [country, gender, currentAge, healthStatus, lifestyleData]
  );

  // Calculate annuity payout
  const annuityCalc = useMemo(() => 
    calculateAnnuityPayout(annuityPremium, currentAge, gender, 'spia'),
    [annuityPremium, currentAge, gender]
  );

  // Annuity vs Portfolio comparison
  const comparison = useMemo(() => 
    annuityVsPortfolio.calculate(annuityPremium, currentAge, gender),
    [annuityPremium, currentAge, gender]
  );

  // Optimal annuitization
  const optimal = useMemo(() => 
    annuitizationStrategy.calculateOptimal(
      portfolioValue,
      annualExpenses,
      guaranteedIncome,
      currentAge,
      'moderate'
    ),
    [portfolioValue, annualExpenses, guaranteedIncome, currentAge]
  );

  // Sequence risk impact
  const sequenceImpact = useMemo(() => 
    sequenceOfReturnsRisk.calculateImpact(
      portfolioValue,
      annualExpenses / portfolioValue,
      currentAge - 65
    ),
    [portfolioValue, annualExpenses, currentAge]
  );

  const formatCurrency = (value) => {
    return `${symbol}${Math.round(value).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
        <p className="text-purple-100 text-sm">{t('subtitle')}</p>
      </div>

      {/* Life Expectancy Calculator */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('lifeExpectancy')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Status Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('healthStatus')}
            </label>
            <select
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="excellent">{t('excellent')}</option>
              <option value="good">{t('good')}</option>
              <option value="average">{t('average')}</option>
              <option value="poor">{t('poor')}</option>
            </select>
            <p className="text-xs text-slate-600 mt-1">
              {healthFactors[healthStatus]?.description}
            </p>
          </div>

          {/* Lifestyle Factors */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('lifestyle')} (Simplified)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-600">Smoking:</label>
                <select
                  value={lifestyleData.smoking}
                  onChange={(e) => setLifestyleData({...lifestyleData, smoking: e.target.value})}
                  className="w-full px-2 py-1 border rounded text-xs"
                >
                  <option value="never">Never</option>
                  <option value="former_10plus">Former (10+ yrs)</option>
                  <option value="current">Current</option>
                </select>
              </div>
              
              <div>
                <label className="text-slate-600">Exercise:</label>
                <select
                  value={lifestyleData.exercise}
                  onChange={(e) => setLifestyleData({...lifestyleData, exercise: e.target.value})}
                  className="w-full px-2 py-1 border rounded text-xs"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light_1to2">Light (1-2x/wk)</option>
                  <option value="moderate_3to4">Moderate (3-4x/wk)</option>
                  <option value="vigorous_5plus">Vigorous (5+x/wk)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {leCalc && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">{t('results')}</h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-purple-700">{t('baseLE')}</div>
                <div className="text-2xl font-bold text-purple-900">{leCalc.baseLifeExpectancy}</div>
                <div className="text-xs text-purple-600">{t('years')}</div>
              </div>

              <div>
                <div className="text-sm text-purple-700">{t('adjustedLE')}</div>
                <div className="text-2xl font-bold text-purple-900">{leCalc.adjustedLifeExpectancy.toFixed(1)}</div>
                <div className="text-xs text-purple-600">
                  {leCalc.healthAdjustment > 0 ? '+' : ''}{leCalc.healthAdjustment.toFixed(1)} health, 
                  {leCalc.lifestyleAdjustment > 0 ? '+' : ''}{leCalc.lifestyleAdjustment.toFixed(1)} lifestyle
                </div>
              </div>

              <div>
                <div className="text-sm text-purple-700">{t('remainingYears')}</div>
                <div className="text-2xl font-bold text-purple-900">{leCalc.remainingYears.toFixed(0)}</div>
                <div className="text-xs text-purple-600">from age {currentAge}</div>
              </div>

              <div>
                <div className="text-sm text-purple-700">{t('planningHorizon')}</div>
                <div className="text-sm font-semibold text-purple-900">
                  {t('conservative')}: {leCalc.planningHorizons.conservative.age}<br/>
                  {t('moderate')}: {leCalc.planningHorizons.moderate.age}<br/>
                  {t('aggressive')}: {leCalc.planningHorizons.aggressive.age}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Annuity Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">{t('annuityAnalysis')}</h3>
          <button
            onClick={() => setShowAnnuityDetail(!showAnnuityDetail)}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            {showAnnuityDetail ? t('hideDetails') : t('viewDetails')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('premium')}
            </label>
            <input
              type="range"
              min="50000"
              max="500000"
              step="10000"
              value={annuityPremium}
              onChange={(e) => setAnnuityPremium(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-lg font-bold text-slate-800">
              {formatCurrency(annuityPremium)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-green-700">{t('annualIncome')}</div>
              <div className="text-xl font-bold text-green-900">{formatCurrency(annuityCalc.annualPayout)}</div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700">{t('monthlyIncome')}</div>
              <div className="text-xl font-bold text-blue-900">{formatCurrency(annuityCalc.monthlyPayout)}</div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Annuity Option</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700">Annual Income:</span>
                <span className="font-bold">{formatCurrency(comparison.annuity.annualIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Guaranteed:</span>
                <span className="font-bold text-green-600">✓ Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Market Risk:</span>
                <span className="font-bold text-green-600">None</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Assets Remaining:</span>
                <span className="font-bold text-red-600">{formatCurrency(0)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Portfolio Option (4% Rule)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Annual Income:</span>
                <span className="font-bold">{formatCurrency(comparison.portfolio.annualIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Guaranteed:</span>
                <span className="font-bold text-red-600">✗ No</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Market Risk:</span>
                <span className="font-bold text-yellow-600">Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Assets Remaining:</span>
                <span className="font-bold text-green-600">{formatCurrency(comparison.portfolio.remainingAssets)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-semibold text-slate-800 mb-2">Optimal Strategy</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Suggested Annuity:</span>
              <div className="font-bold text-lg">{formatCurrency(optimal.recommendation.annuityPremium)}</div>
              <div className="text-xs text-slate-500">
                {optimal.recommendation.percentOfPortfolio.toFixed(1)}% of portfolio
              </div>
            </div>
            
            <div>
              <span className="text-slate-600">Projected Income:</span>
              <div className="font-bold text-lg">{formatCurrency(optimal.recommendation.projectedAnnualIncome)}</div>
              <div className="text-xs text-slate-500">per year</div>
            </div>

            <div>
              <span className="text-slate-600">Essentials Coverage:</span>
              <div className="font-bold text-lg">{optimal.recommendation.essentialsCoverage.toFixed(0)}%</div>
              <div className="text-xs text-slate-500">of essential expenses</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-3 italic">{optimal.rationale}</p>
        </div>

        {/* Detailed Annuity Types */}
        {showAnnuityDetail && (
          <div className="mt-6 space-y-4">
            {Object.entries(annuityTypes).map(([key, type]) => (
              <div key={key} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h5 className="font-semibold text-slate-800 mb-2">{type.name}</h5>
                <p className="text-sm text-slate-600 mb-3">{type.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <strong className="text-green-700">Pros:</strong>
                    <ul className="list-disc list-inside text-slate-700 mt-1">
                      {type.pros.slice(0, 3).map((pro, idx) => (
                        <li key={idx}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <strong className="text-red-700">Cons:</strong>
                    <ul className="list-disc list-inside text-slate-700 mt-1">
                      {type.cons.slice(0, 3).map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sequence of Returns Risk */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => setShowSequenceRisk(!showSequenceRisk)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="text-lg font-semibold text-slate-800">{t('sequenceRisk')}</h3>
          <span className="text-slate-400">{showSequenceRisk ? '−' : '+'}</span>
        </button>

        {showSequenceRisk && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-600">{sequenceOfReturnsRisk.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(sequenceOfReturnsRisk.scenarios).map(([key, scenario]) => {
                const riskColors = {
                  High: 'border-red-300 bg-red-50',
                  Medium: 'border-yellow-300 bg-yellow-50',
                  Low: 'border-green-300 bg-green-50'
                };
                
                return (
                  <div key={key} className={`p-4 border-2 rounded-lg ${riskColors[scenario.riskLevel]}`}>
                    <h4 className="font-semibold text-slate-800 mb-2">{scenario.name}</h4>
                    <p className="text-xs text-slate-600 mb-2">{scenario.description}</p>
                    <div className="text-xs">
                      <div><strong>Impact:</strong> {scenario.impact}</div>
                      <div className="mt-2"><strong>Mitigations:</strong></div>
                      <ul className="list-disc list-inside mt-1">
                        {scenario.mitigations.slice(0, 2).map((mit, idx) => (
                          <li key={idx}>{mit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Your Sequence Risk</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Potential Loss:</span>
                  <div className="font-bold text-lg">{formatCurrency(sequenceImpact.potentialLoss)}</div>
                </div>
                <div>
                  <span className="text-blue-700">Recovery Time:</span>
                  <div className="font-bold text-lg">{sequenceImpact.recoveryYears} years</div>
                </div>
                <div>
                  <span className="text-blue-700">Priority:</span>
                  <div className="font-bold text-lg">{sequenceImpact.suggestion.split(':')[0]}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spending Flexibility Rules */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => setShowSpendingRules(!showSpendingRules)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="text-lg font-semibold text-slate-800">{t('spendingFlexibility')}</h3>
          <span className="text-slate-400">{showSpendingRules ? '−' : '+'}</span>
        </button>

        {showSpendingRules && (
          <div className="mt-4 space-y-4">
            {Object.entries(spendingFlexibility.rules).map(([key, rule]) => (
              <div key={key} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">{rule.name}</h4>
                <p className="text-sm text-slate-600 mb-3">{rule.description}</p>
                
                {key === 'guardrails' && (
                  <div className="text-sm">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-green-100 rounded">
                        <strong>Above +20%:</strong> {rule.thresholds.action.above}
                      </div>
                      <div className="p-2 bg-blue-100 rounded">
                        <strong>Within range:</strong> {rule.thresholds.action.within}
                      </div>
                      <div className="p-2 bg-red-100 rounded">
                        <strong>Below -15%:</strong> {rule.thresholds.action.below}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Educational Note */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎯</span>
          <div className="text-sm text-purple-800">
            <p className="font-semibold mb-1">Longevity Planning Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Plan for living longer than your life expectancy - it's an average, not a limit</li>
              <li>Consider annuitizing 20-30% of portfolio to cover essential expenses</li>
              <li>First 5 years of retirement are critical - build larger liquidity buffer</li>
              <li>Use dynamic spending rules to adapt to market conditions</li>
              <li>Review and adjust annually based on health and portfolio performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongevityBucketRefinement;
