import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const LegacyBucketStrategy = ({ 
  portfolioValue = 1000000, 
  timeHorizon = 20,
  riskProfile = 'D',
  currency = 'EUR',
  language = 'en'
}) => {

  const translations = {
    title: {
      en: 'Legacy Bucket Strategy',
      de: 'Vermächtnis-Strategie',
      fr: 'Stratégie de Legs'
    },
    subtitle: {
      en: 'Long-term Growth & Endowment Model',
      de: 'Langfristiges Wachstum & Endowment-Modell',
      fr: 'Croissance à Long Terme & Modèle de Dotation'
    },
    overview: {
      en: 'Strategy Overview',
      de: 'Strategie-Übersicht',
      fr: 'Vue d\'ensemble de la Stratégie'
    },
    endowmentModel: {
      en: 'University Endowment Model',
      de: 'Universitäts-Endowment-Modell',
      fr: 'Modèle de Dotation Universitaire'
    },
    endowmentStrategyModel: {
      en: 'Endowment Strategy Model',
      de: 'Endowment-Strategie-Modell',
      fr: 'Modèle de Stratégie de Dotation'
    },
    fortyPercentAlternatives: {
      en: '40% Alternatives Model',
      de: '40% Alternatives Modell',
      fr: 'Modèle 40% Alternatifs'
    },
    alternativesBreakdown: {
      en: 'Alternatives Breakdown (40%)',
      de: 'Alternatives Aufschlüsselung (40%)',
      fr: 'Répartition des Alternatifs (40%)'
    },
    frameworkTitle: {
      en: 'Liquidity • Longevity • Legacy Framework',
      de: 'Liquidität • Langlebigkeit • Vermächtnis Framework',
      fr: 'Cadre Liquidité • Longévité • Legs'
    },
    frameworkDescription: {
      en: 'The Legacy bucket integrates seamlessly with our three-bucket strategy, focusing on long-term, higher-risk, less liquid assets designed to provide stable growth and generational wealth transfer.',
      de: 'Der Vermächtnis-Bucket integriert sich nahtlos in unsere Drei-Eimer-Strategie und konzentriert sich auf langfristige, risikoreichere, weniger liquide Vermögenswerte für stabiles Wachstum und generationsübergreifenden Vermögenstransfer.',
      fr: 'Le compartiment Legs s\'intègre parfaitement dans notre stratégie à trois compartiments, en se concentrant sur des actifs à long terme, à risque plus élevé et moins liquides, conçus pour fournir une croissance stable et un transfert de patrimoine générationnel.'
    },
    tacticalImplementation: {
      en: 'Tactical Implementation',
      de: 'Taktische Umsetzung',
      fr: 'Mise en Œuvre Tactique'
    },
    tacticalDesc: {
      en: 'Dynamic approach using structured products with downside protection or selling puts secured by Treasury bills',
      de: 'Dynamischer Ansatz mit strukturierten Produkten mit Downside-Schutz oder verkauften Puts gesichert durch Staatsanleihen',
      fr: 'Approche dynamique utilisant des produits structurés avec protection à la baisse ou vente de puts garantis par des bons du Trésor'
    },
    allWeatherPortfolio: {
      en: 'All-Weather Portfolio',
      de: 'Allwetter-Portfolio',
      fr: 'Portefeuille Tous Temps'
    },
    allWeatherDesc: {
      en: 'Customized, bespoke portfolio designed to perform across different market conditions and economic cycles',
      de: 'Maßgeschneidertes Portfolio für verschiedene Marktbedingungen und Wirtschaftszyklen',
      fr: 'Portefeuille personnalisé conçu pour performer dans différentes conditions de marché et cycles économiques'
    },
    yaleModel: {
      en: 'Yale Model (David Swensen)',
      de: 'Yale-Modell (David Swensen)',
      fr: 'Modèle de Yale (David Swensen)'
    },
    harvardModel: {
      en: 'Harvard Model',
      de: 'Harvard-Modell',
      fr: 'Modèle de Harvard'
    },
    assetAllocation: {
      en: 'Recommended Asset Allocation',
      de: 'Empfohlene Vermögensaufteilung',
      fr: 'Allocation d\'Actifs Recommandée'
    },
    alternativeInvestments: {
      en: 'Alternative Investments',
      de: 'Alternative Investments',
      fr: 'Investissements Alternatifs'
    },
    privateEquity: {
      en: 'Private Equity',
      de: 'Private Equity',
      fr: 'Capital-Investissement'
    },
    privateDebt: {
      en: 'Private Debt',
      de: 'Private Debt',
      fr: 'Dette Privée'
    },
    infrastructure: {
      en: 'Infrastructure',
      de: 'Infrastruktur',
      fr: 'Infrastructure'
    },
    realEstate: {
      en: 'Real Estate',
      de: 'Immobilien',
      fr: 'Immobilier'
    },
    liquidity: {
      en: 'Liquidity',
      de: 'Liquidität',
      fr: 'Liquidité'
    },
    realAssets: {
      en: 'Real Assets',
      de: 'Sachwerte',
      fr: 'Actifs Réels'
    },
    hedgeFunds: {
      en: 'Hedge Funds',
      de: 'Hedge Fonds',
      fr: 'Fonds Spéculatifs'
    },
    publicEquity: {
      en: 'Public Equity',
      de: 'Börsennotierte Aktien',
      fr: 'Actions Cotées'
    },
    fixedIncome: {
      en: 'Fixed Income',
      de: 'Anleihen',
      fr: 'Revenu Fixe'
    },
    expectedReturns: {
      en: 'Expected Returns',
      de: 'Erwartete Renditen',
      fr: 'Rendements Attendus'
    },
    characteristics: {
      en: 'Key Characteristics',
      de: 'Hauptmerkmale',
      fr: 'Caractéristiques Principales'
    },
    illiquidity: {
      en: 'Illiquidity Premium',
      de: 'Illiquiditätsprämie',
      fr: 'Prime d\'Illiquidité'
    },
    longTerm: {
      en: 'Long-term Focus',
      de: 'Langfristfokus',
      fr: 'Orientation Long Terme'
    },
    diversification: {
      en: 'High Diversification',
      de: 'Hohe Diversifikation',
      fr: 'Haute Diversification'
    },
    activeManagement: {
      en: 'Active Management',
      de: 'Aktives Management',
      fr: 'Gestion Active'
    },
    minimumInvestment: {
      en: 'Minimum Investment',
      de: 'Mindestinvestition',
      fr: 'Investissement Minimum'
    },
    minimumHorizon: {
      en: 'Minimum Time Horizon',
      de: 'Mindest-Zeithorizont',
      fr: 'Horizon Temporel Minimum'
    },
    riskLevel: {
      en: 'Risk Level',
      de: 'Risikoniveau',
      fr: 'Niveau de Risque'
    },
    high: {
      en: 'High',
      de: 'Hoch',
      fr: 'Élevé'
    },
    years: {
      en: 'years',
      de: 'Jahre',
      fr: 'ans'
    },
    description: {
      en: 'The Legacy Bucket is designed for long-term wealth growth with a time horizon of 10+ years. Based on the successful endowment models of leading universities like Yale and Harvard, this strategy focuses on alternative investments and illiquid assets to capture premium returns.',
      de: 'Der Vermächtnis-Bucket ist für langfristiges Vermögenswachstum mit einem Zeithorizont von 10+ Jahren konzipiert. Basierend auf den erfolgreichen Endowment-Modellen führender Universitäten wie Yale und Harvard fokussiert diese Strategie auf alternative Investments und illiquide Assets, um Zusatzrenditen zu erzielen.',
      fr: 'Le compartiment Legs est conçu pour la croissance du patrimoine à long terme avec un horizon de 10+ ans. Basée sur les modèles de dotation réussis d\'universités de premier plan comme Yale et Harvard, cette stratégie se concentre sur les investissements alternatifs et les actifs illiquides pour capturer des rendements premium.'
    },
    implementationSteps: {
      en: 'Implementation Steps',
      de: 'Umsetzungsschritte',
      fr: 'Étapes de Mise en Œuvre'
    },
    step1: {
      en: '1. Assess your liquidity needs for the next 10 years',
      de: '1. Bewerten Sie Ihren Liquiditätsbedarf für die nächsten 10 Jahre',
      fr: '1. Évaluez vos besoins de liquidité pour les 10 prochaines années'
    },
    step2: {
      en: '2. Allocate surplus capital to Legacy Bucket',
      de: '2. Allokieren Sie überschüssiges Kapital zum Vermächtnis-Bucket',
      fr: '2. Allouez le capital excédentaire au compartiment Legs'
    },
    step3: {
      en: '3. Build positions in alternative investments gradually',
      de: '3. Bauen Sie Positionen in alternativen Investments schrittweise auf',
      fr: '3. Construisez progressivement des positions dans les investissements alternatifs'
    },
    step4: {
      en: '4. Rebalance annually to maintain target allocation',
      de: '4. Rebalancieren Sie jährlich, um Zielallokation beizubehalten',
      fr: '4. Rééquilibrez annuellement pour maintenir l\'allocation cible'
    },
    performanceMetrics: {
      en: 'Historical Performance Metrics',
      de: 'Historische Performance-Kennzahlen',
      fr: 'Indicateurs de Performance Historiques'
    },
    yale20Year: {
      en: 'Yale 20-Year Average',
      de: 'Yale 20-Jahres-Durchschnitt',
      fr: 'Moyenne de Yale sur 20 ans'
    },
    harvard20Year: {
      en: 'Harvard 20-Year Average',
      de: 'Harvard 20-Jahres-Durchschnitt',
      fr: 'Moyenne de Harvard sur 20 ans'
    },
    sp500: {
      en: 'S&P 500 20-Year Average',
      de: 'S&P 500 20-Jahres-Durchschnitt',
      fr: 'Moyenne du S&P 500 sur 20 ans'
    }
  };

  const t = (key) => translations[key][language] || translations[key].en;

  // Endowment Style allocation (40% Alternatives model)
  const endowmentAllocation = [
    { name: t('publicEquity'), value: 35.0, color: '#3b82f6' },
    { name: t('fixedIncome'), value: 20.0, color: '#10b981' },
    { name: t('privateEquity'), value: 15.0, color: '#8b5cf6' },
    { name: t('hedgeFunds'), value: 10.0, color: '#ec4899' },
    { name: t('privateDebt'), value: 8.0, color: '#06b6d4' },
    { name: t('liquidity'), value: 5.0, color: '#fbbf24' },
    { name: t('infrastructure'), value: 4.0, color: '#14b8a6' },
    { name: t('realEstate'), value: 3.0, color: '#f97316' }
  ];

  // Expected returns by asset class
  const expectedReturns = [
    { name: t('privateEquity'), return: 12, risk: 'High' },
    { name: t('privateDebt'), return: 9, risk: 'Medium-High' },
    { name: t('hedgeFunds'), return: 8, risk: 'Medium-High' },
    { name: t('realAssets'), return: 7, risk: 'Medium' },
    { name: t('publicEquity'), return: 8, risk: 'High' },
    { name: t('fixedIncome'), return: 4, risk: 'Low' }
  ];

  // Performance comparison data
  const performanceData = [
    { name: t('yale20Year'), value: 10.9 },
    { name: t('harvard20Year'), value: 10.1 },
    { name: t('sp500'), value: 9.8 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-lg opacity-90">{t('subtitle')}</p>
        <div className="mt-4 inline-block bg-white bg-opacity-20 px-4 py-2 rounded-lg">
          <p className="text-sm font-semibold">💎 {t('fortyPercentAlternatives')}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{t('overview')}</h2>
        <p className="text-gray-700 leading-relaxed">{t('description')}</p>
      </div>

      {/* Framework Connection */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
        <h2 className="text-xl font-bold mb-3 text-gray-800">{t('frameworkTitle')}</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('frameworkDescription')}</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">💰</div>
            <p className="font-semibold text-blue-600">Liquidity</p>
            <p className="text-sm text-gray-600">2–5 years</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">⏳</div>
            <p className="font-semibold text-green-600">Longevity</p>
            <p className="text-sm text-gray-600">Lifetime goals</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center border-2 border-purple-400">
            <div className="text-3xl mb-2">🎁</div>
            <p className="font-semibold text-purple-600">Legacy</p>
            <p className="text-sm text-gray-600">10+ years</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Endowment Model Allocation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">{t('endowmentModel')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={endowmentAllocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {endowmentAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {endowmentAllocation.map((asset, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: asset.color }}></div>
                  <span>{asset.name}</span>
                </div>
                <span className="font-semibold">{asset.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm font-semibold text-purple-800">💎 40% in Alternatives</p>
            <p className="text-xs text-purple-600 mt-1">15% PE + 8% Private Credit + 4% Infrastructure + 4% Real Estate + 10% Hedge Funds</p>
          </div>
        </div>

        {/* Expected Returns */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">{t('expectedReturns')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expectedReturns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="return" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600">
            <p className="italic">* {language === 'de' ? 'Historische Durchschnittswerte, keine Garantie für zukünftige Ergebnisse' : language === 'fr' ? 'Moyennes historiques, aucune garantie de résultats futurs' : 'Historical averages, no guarantee of future results'}</p>
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{t('performanceMetrics')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {performanceData.map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">{item.name}</p>
              <p className="text-3xl font-bold text-blue-600">{item.value}%</p>
              <p className="text-xs text-gray-500 mt-1">{language === 'de' ? 'p.a. (2003-2023)' : language === 'fr' ? 'par an (2003-2023)' : 'p.a. (2003-2023)'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Characteristics */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{t('characteristics')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold mb-1">{t('illiquidity')}</h3>
            <p className="text-sm text-gray-600">{language === 'de' ? 'Höhere Renditen durch Illiquiditätsprämie' : language === 'fr' ? 'Rendements plus élevés grâce à la prime d\'illiquidité' : 'Higher returns through illiquidity premium'}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">⏰</div>
            <h3 className="font-semibold mb-1">{t('longTerm')}</h3>
            <p className="text-sm text-gray-600">{language === 'de' ? 'Zeithorizont 10+ Jahre' : language === 'fr' ? 'Horizon 10+ ans' : 'Time horizon 10+ years'}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">{t('diversification')}</h3>
            <p className="text-sm text-gray-600">{language === 'de' ? 'Geringe Korrelation zu öffentlichen Märkten' : language === 'fr' ? 'Faible corrélation avec les marchés publics' : 'Low correlation to public markets'}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold mb-1">{t('activeManagement')}</h3>
            <p className="text-sm text-gray-600">{language === 'de' ? 'Professionelles Management erforderlich' : language === 'fr' ? 'Gestion professionnelle requise' : 'Professional management required'}</p>
          </div>
        </div>
      </div>

      {/* Tactical Implementation & All-Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-lg font-bold mb-3 text-gray-800">⚡ {t('tacticalImplementation')}</h2>
          <p className="text-sm text-gray-700">{t('tacticalDesc')}</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">▸</span>
              <span>{language === 'de' ? 'Strukturierte Produkte mit Kapitalschutz' : language === 'fr' ? 'Produits structurés avec protection du capital' : 'Structured products with capital protection'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">▸</span>
              <span>{language === 'de' ? 'Put-Optionen gesichert durch T-Bills' : language === 'fr' ? 'Options de vente garanties par des bons du Trésor' : 'Put options secured by Treasury bills'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">▸</span>
              <span>{language === 'de' ? 'Dynamisches Rebalancing' : language === 'fr' ? 'Rééquilibrage dynamique' : 'Dynamic rebalancing'}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h2 className="text-lg font-bold mb-3 text-gray-800">🌤️ {t('allWeatherPortfolio')}</h2>
          <p className="text-sm text-gray-700">{t('allWeatherDesc')}</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">▸</span>
              <span>{language === 'de' ? 'Maßgeschneidert für individuelle Bedürfnisse' : language === 'fr' ? 'Personnalisé selon les besoins individuels' : 'Customized to individual needs'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">▸</span>
              <span>{language === 'de' ? 'Performt in allen Marktzyklen' : language === 'fr' ? 'Performance dans tous les cycles de marché' : 'Performs across all market cycles'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">▸</span>
              <span>{language === 'de' ? 'Institutionelle Qualität' : language === 'fr' ? 'Qualité institutionnelle' : 'Institutional-grade quality'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          ⚠️ {language === 'de' ? 'Voraussetzungen' : language === 'fr' ? 'Prérequis' : 'Requirements'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold text-gray-700">{t('minimumInvestment')}</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(500000)}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">{t('minimumHorizon')}</p>
            <p className="text-2xl font-bold text-gray-900">10+ {t('years')}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">{t('riskLevel')}</p>
            <p className="text-2xl font-bold text-red-600">{t('high')}</p>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{t('implementationSteps')}</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
            <div className="text-blue-600 font-bold text-xl">1</div>
            <p className="text-gray-700">{t('step1')}</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
            <div className="text-blue-600 font-bold text-xl">2</div>
            <p className="text-gray-700">{t('step2')}</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
            <div className="text-blue-600 font-bold text-xl">3</div>
            <p className="text-gray-700">{t('step3')}</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
            <div className="text-blue-600 font-bold text-xl">4</div>
            <p className="text-gray-700">{t('step4')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacyBucketStrategy;
