import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart, ComposedChart, ReferenceLine } from 'recharts';

// Translations embedded
const translations = {
  en: {
    title: "Wealth Evolution simulations",
    subtitle: "Three strategies: Liquidity strategy • Longevity strategy • Legacy strategy",
    yourInformation: "Your Information",
    countryOfResidence: "Country of Residence",
    countryOfBirth: "Country of Birth",
    displayCurrency: "Display Currency",
    displayLanguage: "Display Language",
    birthYear: "Birth Year",
    gender: "Gender",
    male: "Male",
    female: "Female",
    retirementYear: "Retirement Year",
    currentCash: "Current Cash",
    currentInvestments: "Current Investments/Investable Assets",
    annualIncomeCurrent: "Annual Income (Current)",
    annualExpensesCurrent: "Annual Expenses (Current)",
    retirementIncomeAnnual: "Retirement Income (Annual)",
    retirementExpensesAnnual: "Retirement Expenses (Annual)",
    inflationRate: "Inflation Rate (%)",
    liquidityReturn: "Liquidity Return (%)",
    longevityReturn: "Longevity Return (%)",
    legacyReturn: "Legacy Return (%)",
    riskProfile: "Risk Profile",
    liquidityPeriod: "Liquidity Period (Years)",
    oneOffIncomeExpenses: "One-Off Income/Expenses",
    year: "Year",
    type: "Type",
    income: "Income",
    expense: "Expense",
    amount: "Amount",
    currency: "Currency",
    description: "Description",
    addItem: "Add Item",
    liquidityBucket: "Liquidity Strategy",
    longevityBucket: "Longevity Strategy",
    legacyBucket: "Legacy Strategy",
    throughoutRetirement: "Throughout retirement",
    return: "return",
    maintainsExpenses: "Maintains {years} years × annual expenses",
    fundsRetirement: "Funds all retirement expenses",
    depletesToZero: "Depletes to zero by age {age}",
    wealthTransfer: "Wealth transfer & estate",
    eurConversion: "EUR Conversion Summary",
    currentAge: "Current Age",
    yearsToRetirement: "Years to Retirement",
    expectedLifespan: "Expected Lifespan",
    planningOverview: "Planning Overview",
    portfolioProjection: "Portfolio Projection Through Retirement",
    liquidity: "Liquidity",
    longevity: "Longevity",
    legacy: "Legacy",
    keyInsights: "Key Insights",
    yearByYear: "Year-by-Year Projection",
    fourPercentRule: "4% Rule Scenario",
    fourPercentRuleDesc: "Optimal withdrawal rate with uniform 3.5% return (50/50 stocks/bonds)",
    optimalWithdrawal: "Optimal Withdrawal to Deplete at End of Life",
    optimalRate: "Optimal Rate",
    optimalAmount: "Optimal Amount (Year 1)",
    fourPercentAmount: "Traditional 4% Rule (Year 1)",
    currentSpending: "Your current spending (Year 1)",
    noInvestmentScenario: "No Investment Scenario",
    noInvestmentDesc: "Pure drawdown with 0% return (expenses - income)",
    continuePreRetirement: "Continue Pre-Retirement Strategy",
    continuePreRetirementDesc: "No 3L reallocation - buckets continue with original returns (2%/5%/7.5%)",
    scenario3L: "3L Strategy",
    scenario3LTitle: "Potential wealth evolution based on the 3L strategies",
    scenario3LDesc: "• Optimal allocation across three strategies (Liquidity, Longevity, Legacy) with tailored returns for each time horizon.\n• {fundingStatus}\n• Inflation assumption for the whole period is {inflation}%.",
    threeLSufficientFunds: "Ensures Longevity depletes to zero at end of life.",
    threeLInsufficientFunds: "Your wealth will be depleted at age {age}, {years} years before end of analysis.",
    scenarioContinue: "Continue Current Allocation",
    scenarioContinueTitle: "Potential wealth evolution with current allocation",
    scenarioContinueDesc: "• No strategic reallocation at retirement - investments continue with pre-retirement returns.\n• {fundingStatus}\n• Final Total Wealth is about {difference}% {direction} than in the comparable 3L scenario.\n• Inflation assumption for the whole period is {inflation}%.",
    continueHasFunds: "You have sufficient funds to continue your envisioned lifestyle until the end of the analysis.",
    continueNoFunds: "You do not have sufficient funds to continue your envisioned lifestyle. You will be running out of funds in {years} years.",
    scenario4Percent: "4% Rule",
    scenario4PercentTitle: "Potential wealth evolution according to the 4% rule in case you would like to spend it all",
    scenario4PercentDesc: "• Traditional approach with uniform 3.5% return (50/50 US stocks/US bonds, in USD).\n• The optimal withdrawal rate that depletes your wealth to zero at the end of life in your case is {optimalRate}%, deviating from the 4% rule due to {duration} timeframe.\n{spendingComparison}\n• It should also be noted that the 4% rule is based on US inflation numbers and returns in USD in the US markets, hence there may be differences in other jurisdictions.\n• Inflation assumption for the whole period is {inflation}%.",
    scenarioNoInvest: "No Investment",
    scenarioNoInvestTitle: "Potential wealth evolution through retirement with no investments",
    scenarioNoInvestDesc: "• Pure drawdown with {liquidityReturn}% return.\n• Shows how quickly capital depletes without any investment growth.\n• {fundingStatus}\n• Inflation assumption for the whole period is {inflation}%.",
    sufficientFunds: "You have sufficient funds for your lifetime.",
    insufficientFunds: "Your wealth would be depleted with an unfunded gap of {years} years.",
    lower: "lower",
    higher: "higher",
    shorter: "shorter",
    longer: "longer",
    wealth: "Wealth",
    withdrawal: "Withdrawal",
    investmentReturn: "Investment Return (3.5%)",
    netExpenses: "Net Expenses",
    expenses: "Expenses",
    oneOffs: "One-Offs",
    totalWealth: "Total Wealth",
    currentSavings: "Current Savings",
    annualIncome: "Annual Income",
    annualExpenses: "Annual Expenses",
    retirementIncome: "Retirement Income",
    retirementExpenses: "Retirement Expenses",
    savingsAtRetirement: "Savings at Retirement",
    totalAllocated: "Total Allocated"
  },
  de: {
    title: "Vermögensentwicklung Simulationen",
    subtitle: "Drei Strategien: Liquiditätsstrategie • Langlebigkeitsstrategie • Vermächtnisstrategie",
    yourInformation: "Ihre Informationen",
    countryOfResidence: "Wohnsitzland",
    countryOfBirth: "Geburtsland",
    displayCurrency: "Anzeigewährung",
    displayLanguage: "Anzeigesprache",
    birthYear: "Geburtsjahr",
    gender: "Geschlecht",
    male: "Männlich",
    female: "Weiblich",
    retirementYear: "Rentenjahr",
    currentCash: "Aktuelles Bargeld",
    currentInvestments: "Aktuelle Investitionen/Anlagevermögen",
    annualIncomeCurrent: "Jahreseinkommen (Aktuell)",
    annualExpensesCurrent: "Jährliche Ausgaben (Aktuell)",
    retirementIncomeAnnual: "Renteneinkommen (Jährlich)",
    retirementExpensesAnnual: "Rentenausgaben (Jährlich)",
    inflationRate: "Inflationsrate (%)",
    liquidityReturn: "Liquiditätsrendite (%)",
    longevityReturn: "Langlebigkeitsrendite (%)",
    legacyReturn: "Vermächtnisrendite (%)",
    riskProfile: "Risikoprofil",
    liquidityPeriod: "Liquiditätszeitraum (Jahre)",
    oneOffIncomeExpenses: "Einmalige Einnahmen/Ausgaben",
    year: "Jahr",
    type: "Typ",
    income: "Einnahmen",
    expense: "Ausgaben",
    amount: "Betrag",
    currency: "Währung",
    description: "Beschreibung",
    addItem: "Hinzufügen",
    liquidityBucket: "Liquiditätsstrategie",
    longevityBucket: "Langlebigkeitsstrategie",
    legacyBucket: "Vermächtnisstrategie",
    throughoutRetirement: "Während der Rente",
    return: "Rendite",
    maintainsExpenses: "Hält {years} Jahre × jährliche Ausgaben",
    fundsRetirement: "Finanziert alle Rentenausgaben",
    depletesToZero: "Erschöpft sich bis Alter {age}",
    wealthTransfer: "Vermögensübertragung",
    eurConversion: "EUR-Umrechnungsübersicht",
    currentAge: "Aktuelles Alter",
    yearsToRetirement: "Jahre bis zur Rente",
    expectedLifespan: "Erwartete Lebensdauer",
    planningOverview: "Planungsübersicht",
    portfolioProjection: "Portfolio-Projektion",
    liquidity: "Liquidität",
    longevity: "Langlebigkeit",
    legacy: "Vermächtnis",
    keyInsights: "Wichtige Erkenntnisse",
    yearByYear: "Jahr-für-Jahr-Projektion",
    fourPercentRule: "4%-Regel Szenario",
    fourPercentRuleDesc: "Optimale Entnahmerate mit einheitlicher 3,5% Rendite (50/50 Aktien/Anleihen)",
    optimalWithdrawal: "Optimale Entnahme bis Vermögensverzehr",
    optimalRate: "Optimale Rate",
    optimalAmount: "Optimaler Betrag (Jahr 1)",
    fourPercentAmount: "Traditionelle 4%-Regel (Jahr 1)",
    currentSpending: "Ihre aktuellen Ausgaben (Jahr 1)",
    noInvestmentScenario: "Kein Investment Szenario",
    noInvestmentDesc: "Reiner Kapitalverzehr mit 0% Rendite (Ausgaben - Einkommen)",
    continuePreRetirement: "Pre-Retirement Strategie fortsetzen",
    continuePreRetirementDesc: "Keine 3L Umallokation - Buckets mit ursprünglichen Renditen (2%/5%/7,5%)",
    scenario3L: "3L Strategie",
    scenario3LTitle: "Potenzielle Vermögensentwicklung mit 3L Strategie",
    scenario3LDesc: "• Optimale Allokation auf drei Strategien (Liquidität, Langlebigkeit, Vermächtnis) mit maßgeschneiderten Renditen für jeden Zeithorizont.\n• {fundingStatus}\n• Inflationsannahme für gesamte Periode ist {inflation}%.",
    threeLSufficientFunds: "Stellt sicher, dass Langlebigkeit bei Lebensende auf Null fällt.",
    threeLInsufficientFunds: "Ihr Vermögen wird im Alter {age} aufgebraucht sein, {years} Jahre vor Ende der Analyse.",
    scenarioContinue: "Aktuelle Allokation fortsetzen",
    scenarioContinueTitle: "Potenzielle Vermögensentwicklung mit aktueller Allokation",
    scenarioContinueDesc: "• Keine strategische Umallokation bei Renteneintritt - Investitionen wachsen mit Pre-Retirement Renditen weiter.\n• {fundingStatus}\n• Finales Gesamtvermögen ist etwa {difference}% {direction} als im vergleichbaren 3L Szenario.\n• Inflationsannahme für gesamte Periode ist {inflation}%.",
    continueHasFunds: "Sie haben ausreichende Mittel um Ihren geplanten Lebensstil bis zum Ende der Analyse fortzusetzen.",
    continueNoFunds: "Sie haben nicht ausreichende Mittel um Ihren geplanten Lebensstil fortzusetzen. Ihre Mittel werden in {years} Jahren aufgebraucht sein.",
    scenario4Percent: "4%-Regel",
    scenario4PercentTitle: "Potenzielle Vermögensentwicklung nach 4%-Regel falls Sie alles ausgeben möchten",
    scenario4PercentDesc: "• Traditioneller Ansatz mit einheitlicher 3,5% Rendite (50/50 US-Aktien/US-Anleihen, in USD).\n• Die optimale Entnahmerate die Ihr Vermögen bei Lebensende auf Null bringt ist in Ihrem Fall {optimalRate}%, abweichend von der 4%-Regel aufgrund {duration} Zeitraums.\n{spendingComparison}\n• Es ist zu beachten, dass die 4%-Regel auf US-Inflationszahlen und USD-Renditen in US-Märkten basiert, daher können in anderen Rechtsräumen Unterschiede bestehen.\n• Inflationsannahme für gesamte Periode ist {inflation}%.",
    scenarioNoInvest: "Kein Investment",
    scenarioNoInvestTitle: "Potenzielle Vermögensentwicklung ohne Investitionen",
    scenarioNoInvestDesc: "• Reiner Kapitalverzehr mit {liquidityReturn}% Rendite.\n• Zeigt wie schnell Kapital ohne Investmentwachstum aufgebraucht wird.\n• {fundingStatus}\n• Inflationsannahme für gesamte Periode ist {inflation}%.",
    sufficientFunds: "Sie haben ausreichende Mittel für Ihre Lebenszeit.",
    insufficientFunds: "Ihr Vermögen würde aufgebraucht mit einer ungedeckten Lücke von {years} Jahren.",
    lower: "niedriger",
    higher: "höher",
    shorter: "kürzerem",
    longer: "längerem",
    wealth: "Vermögen",
    withdrawal: "Entnahme",
    investmentReturn: "Kapitalertrag (3,5%)",
    netExpenses: "Nettoausgaben",
    expenses: "Ausgaben",
    oneOffs: "Einmalig",
    totalWealth: "Gesamtvermögen",
    currentSavings: "Aktuelles Vermögen",
    annualIncome: "Jahreseinkommen",
    annualExpenses: "Jährliche Ausgaben",
    retirementIncome: "Renteneinkommen",
    retirementExpenses: "Rentenausgaben",
    savingsAtRetirement: "Ersparnisse bei Renteneintritt",
    totalAllocated: "Gesamt zugewiesen"
  },
  fr: {
    title: "Simulations d'évolution du patrimoine",
    subtitle: "Trois stratégies : Stratégie de liquidité • Stratégie de longévité • Stratégie d'héritage",
    yourInformation: "Vos informations",
    countryOfResidence: "Pays de résidence",
    countryOfBirth: "Pays de naissance",
    displayCurrency: "Devise d'affichage",
    displayLanguage: "Langue d'affichage",
    birthYear: "Année de naissance",
    gender: "Sexe",
    male: "Homme",
    female: "Femme",
    retirementYear: "Année de retraite",
    currentCash: "Liquidités actuelles",
    currentInvestments: "Investissements actuels",
    annualIncomeCurrent: "Revenu annuel (actuel)",
    annualExpensesCurrent: "Dépenses annuelles (actuelles)",
    retirementIncomeAnnual: "Revenu de retraite (annuel)",
    retirementExpensesAnnual: "Dépenses de retraite (annuelles)",
    inflationRate: "Taux d'inflation (%)",
    liquidityReturn: "Rendement de liquidité (%)",
    longevityReturn: "Rendement de longévité (%)",
    legacyReturn: "Rendement d'héritage (%)",
    riskProfile: "Profil de risque",
    liquidityPeriod: "Période de liquidité (années)",
    oneOffIncomeExpenses: "Revenus/Dépenses ponctuels",
    year: "Année",
    type: "Type",
    income: "Revenu",
    expense: "Dépense",
    amount: "Montant",
    currency: "Devise",
    description: "Description",
    addItem: "Ajouter",
    liquidityBucket: "Stratégie de liquidité",
    longevityBucket: "Stratégie de longévité",
    legacyBucket: "Stratégie d'héritage",
    throughoutRetirement: "Pendant la retraite",
    return: "rendement",
    maintainsExpenses: "Maintient {years} années × dépenses annuelles",
    fundsRetirement: "Finance toutes les dépenses de retraite",
    depletesToZero: "S'épuise à zéro à l'âge de {age}",
    wealthTransfer: "Transfert de patrimoine",
    eurConversion: "Résumé de conversion EUR",
    currentAge: "Âge actuel",
    yearsToRetirement: "Années jusqu'à la retraite",
    expectedLifespan: "Espérance de vie",
    planningOverview: "Aperçu de la planification",
    portfolioProjection: "Projection du portefeuille",
    liquidity: "Liquidité",
    longevity: "Longévité",
    legacy: "Héritage",
    keyInsights: "Informations clés",
    yearByYear: "Projection année par année",
    fourPercentRule: "Scénario Règle des 4%",
    fourPercentRuleDesc: "Taux de retrait optimal avec rendement uniforme de 3,5% (50/50 actions/obligations)",
    optimalWithdrawal: "Retrait optimal jusqu'à épuisement",
    optimalRate: "Taux optimal",
    optimalAmount: "Montant optimal (Année 1)",
    fourPercentAmount: "Règle traditionnelle 4% (Année 1)",
    currentSpending: "Vos dépenses actuelles (Année 1)",
    noInvestmentScenario: "Scénario sans investissement",
    noInvestmentDesc: "Épuisement pur avec 0% de rendement (dépenses - revenu)",
    continuePreRetirement: "Continuer la stratégie pré-retraite",
    continuePreRetirementDesc: "Pas de réallocation 3L - buckets continuent avec rendements d'origine (2%/5%/7,5%)",
    scenario3L: "Stratégie 3L",
    scenario3LTitle: "Évolution potentielle du patrimoine avec stratégie 3L",
    scenario3LDesc: "• Allocation optimale sur trois stratégies (Liquidité, Longévité, Héritage) avec rendements adaptés à chaque horizon temporel.\n• {fundingStatus}\n• Hypothèse d'inflation pour toute la période est {inflation}%.",
    threeLSufficientFunds: "Assure que Longévité s'épuise à zéro en fin de vie.",
    threeLInsufficientFunds: "Votre patrimoine sera épuisé à l'âge {age}, {years} ans avant la fin de l'analyse.",
    scenarioContinue: "Continuer allocation actuelle",
    scenarioContinueTitle: "Évolution potentielle du patrimoine avec allocation actuelle",
    scenarioContinueDesc: "• Pas de réallocation stratégique à la retraite - investissements continuent avec rendements pré-retraite.\n• {fundingStatus}\n• Patrimoine total final est environ {difference}% {direction} que dans le scénario 3L comparable.\n• Hypothèse d'inflation pour toute la période est {inflation}%.",
    continueHasFunds: "Vous avez des fonds suffisants pour continuer votre style de vie envisagé jusqu'à la fin de l'analyse.",
    continueNoFunds: "Vous n'avez pas de fonds suffisants pour continuer votre style de vie envisagé. Vos fonds seront épuisés dans {years} ans.",
    scenario4Percent: "Règle des 4%",
    scenario4PercentTitle: "Évolution potentielle du patrimoine selon règle des 4% si vous voulez tout dépenser",
    scenario4PercentDesc: "• Approche traditionnelle avec rendement uniforme de 3,5% (50/50 actions US/obligations US, en USD).\n• Le taux de retrait optimal qui épuise votre patrimoine à zéro en fin de vie est dans votre cas {optimalRate}%, différent de la règle des 4% en raison d'une période {duration}.\n{spendingComparison}\n• Il faut noter que la règle des 4% est basée sur l'inflation US et rendements en USD sur marchés US, donc il peut y avoir des différences dans d'autres juridictions.\n• Hypothèse d'inflation pour toute la période est {inflation}%.",
    scenarioNoInvest: "Sans investissement",
    scenarioNoInvestTitle: "Évolution potentielle du patrimoine sans investissements",
    scenarioNoInvestDesc: "• Épuisement pur avec {liquidityReturn}% de rendement.\n• Montre à quelle vitesse le capital s'épuise sans croissance d'investissement.\n• {fundingStatus}\n• Hypothèse d'inflation pour toute la période est {inflation}%.",
    sufficientFunds: "Vous avez des fonds suffisants pour votre vie.",
    insufficientFunds: "Votre patrimoine serait épuisé avec un déficit non financé de {years} ans.",
    lower: "inférieur",
    higher: "supérieur",
    shorter: "plus courte",
    longer: "plus longue",
    wealth: "Patrimoine",
    withdrawal: "Retrait",
    investmentReturn: "Rendement (3,5%)",
    netExpenses: "Dépenses nettes",
    expenses: "Dépenses",
    oneOffs: "Ponctuels",
    totalWealth: "Patrimoine total",
    currentSavings: "Épargne actuelle",
    annualIncome: "Revenu annuel",
    annualExpenses: "Dépenses annuelles",
    retirementIncome: "Revenu de retraite",
    retirementExpenses: "Dépenses de retraite",
    savingsAtRetirement: "Épargne à la retraite",
    totalAllocated: "Total alloué"
  }
};

// Scenario Comparison Component with Thumbnails
const ScenarioComparison = ({ calculations, inputs, t, formatCurrency, currencySymbols }) => {
  const [selectedScenario, setSelectedScenario] = useState('3L');
  
  // Safety check
  if (!calculations || !calculations.projectionData || calculations.projectionData.length === 0) {
    return (
      <div className="text-center py-8 text-slate-600">
        <p>Loading calculations...</p>
      </div>
    );
  }
  
  // Y-Axis formatter for millions with nice round numbers
  const formatYAxis = (value) => {
    // Only show 0 or positive values
    if (value < 0 && value !== 0) return '';
    
    const absValue = Math.abs(value);
    if (absValue >= 1000000) {
      return `${(value / 1000000).toFixed(1)}m`;
    } else if (absValue >= 100000) {
      return `${(value / 1000000).toFixed(2)}m`;
    } else if (absValue >= 10000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value === 0 ? '' : value.toFixed(0); // Don't show 0 here, ReferenceLine handles it
  };
  
  // X-Axis - only show every 2nd year
  const renderCustomXAxisTick = ({ x, y, payload, index }) => {
    if (index % 2 === 0) {
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={11}>
            {payload.value}
          </text>
        </g>
      );
    }
    return null;
  };
  
  const scenarios = [
    {
      id: '3L',
      title: t('scenario3L'),
      fullTitle: t('scenario3LTitle'),
      description: (() => {
        const fundingStatus = calculations.sufficientFunds3L
          ? t('threeLSufficientFunds')
          : t('threeLInsufficientFunds')
              .replace('{age}', calculations.depletionAge3L || 'N/A')
              .replace('{years}', calculations.yearsShortfall3L || 0);
        
        return t('scenario3LDesc')
          .replace('{fundingStatus}', fundingStatus)
          .replace('{inflation}', inputs.inflation.toFixed(1));
      })(),
      data: calculations.projectionData,
      type: '3L'
    },
    {
      id: 'continue',
      title: t('scenarioContinue'),
      fullTitle: t('scenarioContinueTitle'),
      description: (() => {
        // Calculate funding status
        const fundingStatus = calculations.continuePreRetirementScenario.sufficientFunds
          ? t('continueHasFunds')
          : t('continueNoFunds').replace('{years}', calculations.continuePreRetirementScenario.yearsShortfall);
        
        // Build description parts
        let descParts = [
          "• No strategic reallocation at retirement - investments continue with pre-retirement returns.",
          `• ${fundingStatus}`
        ];
        
        // Only add comparison if both scenarios have positive end wealth
        const final3L = calculations.projectionData[calculations.projectionData.length - 1];
        const finalContinue = calculations.continuePreRetirementScenario.data[calculations.continuePreRetirementScenario.data.length - 1];
        const totalWealth3L = final3L.liquidity + final3L.longevity + final3L.legacy;
        const totalWealthContinue = finalContinue.liquidity + finalContinue.longevity + finalContinue.legacy;
        
        if (totalWealth3L > 0 && totalWealthContinue > 0) {
          const difference = Math.abs(((totalWealthContinue - totalWealth3L) / totalWealth3L) * 100).toFixed(1);
          const direction = totalWealthContinue > totalWealth3L ? t('higher') : t('lower');
          descParts.push(`• Final Total Wealth is about ${difference}% ${direction} than in the comparable 3L scenario.`);
        }
        
        descParts.push(`• Inflation assumption for the whole period is ${inputs.inflation.toFixed(1)}%.`);
        
        return descParts.join('\n');
      })(),
      data: calculations.continuePreRetirementScenario.data,
      type: '3L'
    },
    {
      id: '4percent',
      title: t('scenario4Percent'),
      fullTitle: t('scenario4PercentTitle'),
      description: (() => {
        const optimalRate = (calculations.fourPercentScenario.optimalRate * 100).toFixed(2);
        const yearsInRetirement = calculations.projectionData.length;
        const duration = yearsInRetirement < 30 ? t('shorter') : (yearsInRetirement > 30 ? t('longer') : '30-year');
        
        // Generate spending comparison text
        const currentSpending = calculations.fourPercentScenario.currentSpending;
        const optimalAmount = calculations.fourPercentScenario.optimalWithdrawal;
        let spendingComparison = '';
        
        if (currentSpending < optimalAmount) {
          spendingComparison = `• As you plan to spend ${formatCurrency(currentSpending)} which is less than ${formatCurrency(optimalAmount)} you do have a safety buffer.`;
        } else if (currentSpending > optimalAmount) {
          spendingComparison = `• As you plan to spend ${formatCurrency(currentSpending)} which is more than ${formatCurrency(optimalAmount)} you may run out of funds prematurely.`;
        }
        
        return t('scenario4PercentDesc')
          .replace('{optimalRate}', optimalRate)
          .replace('{duration}', duration)
          .replace('{spendingComparison}', spendingComparison)
          .replace('{inflation}', inputs.inflation.toFixed(1));
      })(),
      data: calculations.fourPercentScenario.data,
      type: '4percent',
      stats: {
        fourPercent: calculations.fourPercentScenario.fourPercentWithdrawal,
        optimal: calculations.fourPercentScenario.optimalWithdrawal,
        optimalRate: calculations.fourPercentScenario.optimalRate,
        currentSpending: calculations.fourPercentScenario.currentSpending,
        currentSpendingRate: calculations.fourPercentScenario.currentSpendingRate
      }
    },
    {
      id: 'noInvest',
      title: t('scenarioNoInvest'),
      fullTitle: t('scenarioNoInvestTitle'),
      description: (() => {
        const fundingStatus = calculations.noInvestmentScenario.sufficientFunds
          ? t('sufficientFunds')
          : t('insufficientFunds').replace('{years}', calculations.noInvestmentScenario.yearsShortfall);
        
        return t('scenarioNoInvestDesc')
          .replace('{liquidityReturn}', inputs.liquidityReturn.toFixed(1))
          .replace('{fundingStatus}', fundingStatus)
          .replace('{inflation}', inputs.inflation.toFixed(1));
      })(),
      data: calculations.noInvestmentScenario.data,
      type: '3L'
    }
  ];
  
  const selectedData = scenarios.find(s => s.id === selectedScenario);
  
  // Render thumbnail chart - TWO STACKED MINI CHARTS WITH PROPORTIONAL HEIGHTS!
  const renderThumbnail = (scenario) => {
    const isSelected = selectedScenario === scenario.id;
    
    // Calculate proportional heights for thumbnails (total 100px)
    const totalDataRange = calculations.yAxisMax + Math.abs(calculations.yAxisMinExpenses);
    const topMiniHeight = Math.round((calculations.yAxisMax / totalDataRange) * 100);
    const bottomMiniHeight = Math.round((Math.abs(calculations.yAxisMinExpenses) / totalDataRange) * 100);
    
    return (
      <div
        key={scenario.id}
        onClick={() => setSelectedScenario(scenario.id)}
        className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }`}
      >
        <div className="text-sm font-semibold text-slate-800 mb-2">{scenario.title}</div>
        <div className="relative">
          {/* TOP MINI - Wealth */}
          <ResponsiveContainer width="100%" height={topMiniHeight}>
            <ComposedChart data={scenario.data} barCategoryGap="10%" margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
              <YAxis hide={true} domain={[0, calculations.yAxisMax]} />
              <ReferenceLine y={0} stroke="#999" />
              {scenario.type === '3L' ? (
                <>
                  <Bar dataKey="liquidity" stackId="wealth" fill="#3b82f6" />
                  <Bar dataKey="longevity" stackId="wealth" fill="#8b5cf6" />
                  <Bar dataKey="legacy" stackId="wealth" fill="#10b981" />
                </>
              ) : (
                <>
                  <Bar dataKey="wealth" stackId="wealth" fill="#3b82f6" />
                  <Bar dataKey="investmentReturn" stackId="wealth" fill="#10b981" />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* BOTTOM MINI - Withdrawal */}
          <ResponsiveContainer width="100%" height={bottomMiniHeight}>
            <ComposedChart data={scenario.data} barCategoryGap="10%" margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
              <YAxis hide={true} domain={[calculations.yAxisMinExpenses, 0]} />
              <ReferenceLine y={0} stroke="#999" />
              <Bar dataKey="withdrawal" fill="#ef4444" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  // Render main chart - TWO CHARTS STACKED WITH PROPORTIONAL HEIGHTS!
  const renderMainChart = () => {
    return (
      <div className="relative">
        {/* TOP CHART - Wealth (proportional height based on data range) */}
        <ResponsiveContainer width="100%" height={calculations.topChartHeight}>
          <ComposedChart data={selectedData.data} barCategoryGap="10%" margin={{ top: 5, right: 30, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
            <XAxis dataKey="age" hide={true} />
            <YAxis 
              domain={[0, calculations.yAxisMax]}
              ticks={calculations.yAxisTicksWealth}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 11 }}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(Math.abs(value))}
              labelFormatter={(age) => `${t('age')} ${age}`}
            />
            <ReferenceLine y={0} stroke="#333" strokeWidth={2} label={{ value: '0', position: 'left', fill: '#333', fontSize: 11, fontWeight: 'bold' }} />
            
            {selectedData.type === '3L' ? (
              <>
                <Bar dataKey="liquidity" stackId="wealth" fill="#3b82f6" name={t('liquidity')} />
                <Bar dataKey="longevity" stackId="wealth" fill="#8b5cf6" name={t('longevity')} />
                <Bar dataKey="legacy" stackId="wealth" fill="#10b981" name={t('legacy')} />
              </>
            ) : (
              <>
                <Bar dataKey="wealth" stackId="wealth" fill="#3b82f6" name={t('wealth')} />
                <Bar dataKey="investmentReturn" stackId="wealth" fill="#10b981" name={t('investmentReturn')} />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* BOTTOM CHART - Withdrawal (proportional height based on data range) */}
        <ResponsiveContainer width="100%" height={calculations.bottomChartHeight}>
          <ComposedChart data={selectedData.data} barCategoryGap="10%" margin={{ top: 0, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
            <XAxis 
              dataKey="age"
              tick={renderCustomXAxisTick}
              label={{ value: t('age'), position: 'insideBottom', offset: -5, style: { fontSize: 12 } }}
            />
            <YAxis 
              domain={[calculations.yAxisMinExpenses, 0]}
              ticks={calculations.yAxisTicksExpenses.map(t => -t)}
              tickFormatter={(value) => value === 0 ? '' : formatYAxis(Math.abs(value))}
              tick={{ fontSize: 11 }}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(Math.abs(value))}
              labelFormatter={(age) => `${t('age')} ${age}`}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <ReferenceLine y={0} stroke="#333" strokeWidth={2} />
            
            <Bar dataKey="withdrawal" fill="#ef4444" name={t('withdrawal')} legendType="none" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Left: Thumbnails */}
      <div className="col-span-1 space-y-3">
        {scenarios.map(renderThumbnail)}
      </div>
      
      {/* Right: Detail View */}
      <div className="col-span-3 space-y-4">
        <div>
          <h4 className="text-base font-semibold text-slate-800 mb-2">{selectedData.fullTitle}</h4>
          <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {selectedData.description}
          </div>
          
          {/* 4% Rule Stats */}
          {selectedData.id === '4percent' && selectedData.stats && (
            <div className="grid grid-cols-3 gap-4 mt-4 p-3 bg-slate-50 rounded-lg">
              <div>
                <div className="text-xs text-slate-600">{t('fourPercentAmount')}</div>
                <div className="text-base font-bold text-blue-600">{formatCurrency(selectedData.stats.fourPercent)}</div>
                <div className="text-xs text-slate-500">(4.00%)</div>
              </div>
              <div>
                <div className="text-xs text-slate-600">{t('optimalAmount')}</div>
                <div className="text-base font-bold text-green-600">{formatCurrency(selectedData.stats.optimal)}</div>
                <div className="text-xs text-slate-500">({(selectedData.stats.optimalRate * 100).toFixed(2)}%)</div>
              </div>
              <div>
                <div className="text-xs text-slate-600">{t('currentSpending')}</div>
                <div className="text-base font-bold text-orange-600">{formatCurrency(selectedData.stats.currentSpending)}</div>
                <div className="text-xs text-slate-500">({selectedData.stats.currentSpendingRate.toFixed(2)}%)</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Chart */}
        {renderMainChart()}
      </div>
    </div>
  );
};

const RetirementPlanner = ({ language: propLanguage, onLanguageChange, initialInputs, initialOneOffItems }) => {
  const currentYear = 2026;
  
  const [inputs, setInputs] = useState(initialInputs || {
    retirementYear: 2046,
    retirementAge: 65,
    birthYear: 1981,
    gender: 'male',
    countryOfResidence: 'LU',
    countryOfBirth: 'LU',
    language: 'en',
    currentCash: 100000,
    currentCashCurrency: 'EUR',
    currentInvestmentsMedium: 300000,
    currentInvestmentsMediumCurrency: 'EUR',
    currentInvestmentsLongTerm: 100000,
    currentInvestmentsLongTermCurrency: 'EUR',
    annualIncome: 120000,
    annualIncomeCurrency: 'EUR',
    annualExpenses: 80000,
    annualExpensesCurrency: 'EUR',
    retirementIncome: 40000,
    retirementIncomeCurrency: 'EUR',
    retirementExpenses: 60000,
    retirementExpensesCurrency: 'EUR',
    inflation: 2.5,
    liquidityReturn: 2.0,
    longevityReturn: 5.0,
    legacyReturn: 7.5,
    riskProfile: 'C',
    accountTaxStatus: 'taxable',
    investmentObjective: 'growth',
    geographicFocus: 'global',
    assetClasses: 'traditional',
    currency: 'EUR',
    liquidityYears: 5
  });

  const [oneOffItems, setOneOffItems] = useState(initialOneOffItems || []);

  // Update inputs when initialInputs prop changes (when switching from Data Entry tab)
  useEffect(() => {
    if (initialInputs) {
      setInputs(initialInputs);
    }
  }, [initialInputs]);

  // Update oneOffItems when initialOneOffItems prop changes
  useEffect(() => {
    if (initialOneOffItems) {
      setOneOffItems(initialOneOffItems);
    }
  }, [initialOneOffItems]);

  const [newOneOff, setNewOneOff] = useState({
    year: 2026,
    amount: 0,
    currency: 'EUR',
    type: 'income',
    description: ''
  });

  const countries = [
    { code: 'US', name: 'United States', defaultCurrency: 'USD' },
    { code: 'GB', name: 'United Kingdom', defaultCurrency: 'GBP' },
    { code: 'CH', name: 'Switzerland', defaultCurrency: 'CHF' },
    { code: 'DE', name: 'Germany', defaultCurrency: 'EUR' },
    { code: 'FR', name: 'France', defaultCurrency: 'EUR' },
    { code: 'IT', name: 'Italy', defaultCurrency: 'EUR' },
    { code: 'ES', name: 'Spain', defaultCurrency: 'EUR' },
    { code: 'NL', name: 'Netherlands', defaultCurrency: 'EUR' },
    { code: 'BE', name: 'Belgium', defaultCurrency: 'EUR' },
    { code: 'AT', name: 'Austria', defaultCurrency: 'EUR' },
    { code: 'LU', name: 'Luxembourg', defaultCurrency: 'EUR' },
    { code: 'SE', name: 'Sweden', defaultCurrency: 'SEK' },
    { code: 'NO', name: 'Norway', defaultCurrency: 'NOK' },
    { code: 'DK', name: 'Denmark', defaultCurrency: 'DKK' },
    { code: 'FI', name: 'Finland', defaultCurrency: 'EUR' },
    { code: 'IE', name: 'Ireland', defaultCurrency: 'EUR' },
    { code: 'PT', name: 'Portugal', defaultCurrency: 'EUR' },
    { code: 'GR', name: 'Greece', defaultCurrency: 'EUR' },
    { code: 'PL', name: 'Poland', defaultCurrency: 'EUR' },
    { code: 'CZ', name: 'Czech Republic', defaultCurrency: 'EUR' },
    { code: 'HU', name: 'Hungary', defaultCurrency: 'EUR' },
    { code: 'RO', name: 'Romania', defaultCurrency: 'EUR' },
    { code: 'BG', name: 'Bulgaria', defaultCurrency: 'EUR' },
    { code: 'HR', name: 'Croatia', defaultCurrency: 'EUR' },
    { code: 'SI', name: 'Slovenia', defaultCurrency: 'EUR' },
    { code: 'SK', name: 'Slovakia', defaultCurrency: 'EUR' },
    { code: 'EE', name: 'Estonia', defaultCurrency: 'EUR' },
    { code: 'LV', name: 'Latvia', defaultCurrency: 'EUR' },
    { code: 'LT', name: 'Lithuania', defaultCurrency: 'EUR' },
    { code: 'MT', name: 'Malta', defaultCurrency: 'EUR' },
    { code: 'CY', name: 'Cyprus', defaultCurrency: 'EUR' },
    { code: 'CA', name: 'Canada', defaultCurrency: 'USD' },
    { code: 'AU', name: 'Australia', defaultCurrency: 'USD' },
    { code: 'NZ', name: 'New Zealand', defaultCurrency: 'USD' },
    { code: 'JP', name: 'Japan', defaultCurrency: 'USD' },
    { code: 'SG', name: 'Singapore', defaultCurrency: 'USD' },
    { code: 'HK', name: 'Hong Kong', defaultCurrency: 'USD' },
    { code: 'AE', name: 'United Arab Emirates', defaultCurrency: 'USD' },
    { code: 'SA', name: 'Saudi Arabia', defaultCurrency: 'USD' },
    { code: 'IL', name: 'Israel', defaultCurrency: 'USD' },
    { code: 'TR', name: 'Turkey', defaultCurrency: 'EUR' },
    { code: 'ZA', name: 'South Africa', defaultCurrency: 'USD' },
    { code: 'BR', name: 'Brazil', defaultCurrency: 'USD' },
    { code: 'MX', name: 'Mexico', defaultCurrency: 'USD' },
    { code: 'AR', name: 'Argentina', defaultCurrency: 'USD' },
    { code: 'CL', name: 'Chile', defaultCurrency: 'USD' },
    { code: 'CO', name: 'Colombia', defaultCurrency: 'USD' },
    { code: 'IN', name: 'India', defaultCurrency: 'USD' },
    { code: 'CN', name: 'China', defaultCurrency: 'USD' },
    { code: 'KR', name: 'South Korea', defaultCurrency: 'USD' },
    { code: 'TH', name: 'Thailand', defaultCurrency: 'USD' },
    { code: 'MY', name: 'Malaysia', defaultCurrency: 'USD' },
    { code: 'ID', name: 'Indonesia', defaultCurrency: 'USD' },
    { code: 'PH', name: 'Philippines', defaultCurrency: 'USD' },
    { code: 'VN', name: 'Vietnam', defaultCurrency: 'USD' }
  ];

  const t = (key, replacements = {}) => {
    let text = translations[inputs.language]?.[key] || translations.en[key] || key;
    Object.keys(replacements).forEach(k => {
      text = text.replace(`{${k}}`, replacements[k]);
    });
    return text;
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => {
      const newInputs = { ...prev, [field]: value };
      
      // Update display currency when country of residence changes
      if (field === 'countryOfResidence') {
        const country = countries.find(c => c.code === value);
        if (country) {
          const newCurrency = country.defaultCurrency;
          newInputs.currency = newCurrency;
          
          // Convert all currency fields to new currency
          const oldCurrency = prev.currency;
          if (oldCurrency !== newCurrency) {
            newInputs.currentCashCurrency = newCurrency;
            newInputs.currentInvestmentsCurrency = newCurrency;
            newInputs.annualIncomeCurrency = newCurrency;
            newInputs.annualExpensesCurrency = newCurrency;
            newInputs.retirementIncomeCurrency = newCurrency;
            newInputs.retirementExpensesCurrency = newCurrency;
          }
        }
      }
      
      // Convert all currency fields when display currency manually changed
      if (field === 'currency') {
        const newCurrency = value;
        const oldCurrency = prev.currency;
        if (oldCurrency !== newCurrency) {
          newInputs.currentCashCurrency = newCurrency;
          newInputs.currentInvestmentsCurrency = newCurrency;
          newInputs.annualIncomeCurrency = newCurrency;
          newInputs.annualExpensesCurrency = newCurrency;
          newInputs.retirementIncomeCurrency = newCurrency;
          newInputs.retirementExpensesCurrency = newCurrency;
        }
      }
      
      return newInputs;
    });
    
    // Notify parent component about language change
    if (field === 'language' && onLanguageChange) {
      onLanguageChange(value);
    }
  };

  const handleCurrencyInputChange = (field, valueString) => {
    const numericValue = parseFloat(valueString.replace(/[^0-9.-]/g, '')) || 0;
    setInputs(prev => ({ ...prev, [field]: numericValue }));
  };

  const formatInputCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const addOneOffItem = () => {
    if (newOneOff.amount === 0 || !newOneOff.description) return;

    const item = {
      year: Number(newOneOff.year),
      amount: Number(newOneOff.amount),
      currency: newOneOff.currency,
      type: newOneOff.type,
      description: newOneOff.description,
      id: Date.now()
    };

    setOneOffItems(prev => [...prev, item].sort((a, b) => a.year - b.year));

    setNewOneOff({
      year: currentYear,
      amount: 0,
      currency: inputs.currency,
      type: 'income',
      description: ''
    });
  };

  const removeOneOffItem = (id) => {
    setOneOffItems(prev => prev.filter(item => item.id !== id));
  };

  const riskProfiles = {
    'A': { name: 'Very Conservative', color: '#10b981' },
    'B': { name: 'Conservative', color: '#3b82f6' },
    'C': { name: 'Moderate Conservative', color: '#6366f1' },
    'D': { name: 'Moderate', color: '#8b5cf6' },
    'E': { name: 'Moderate Aggressive', color: '#ec4899' },
    'F': { name: 'Aggressive', color: '#ef4444' }
  };

  const exchangeRates = useMemo(() => ({
    USD: 0.92,
    EUR: 1.00,
    GBP: 1.17,
    CHF: 1.05,
    SEK: 0.088,
    NOK: 0.086,
    DKK: 0.134
  }), []);

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CHF: 'CHF ',
    SEK: 'kr ',
    NOK: 'kr ',
    DKK: 'kr '
  };

  const calculateLifeExpectancy = useCallback((birthYear, countryOfBirth, gender) => {
    const lifeExpectancyByCountry = {
      'US': { male: 76, female: 81 },
      'GB': { male: 79, female: 83 },
      'CH': { male: 82, female: 86 },
      'DE': { male: 79, female: 84 },
      'FR': { male: 80, female: 86 },
      'IT': { male: 81, female: 85 },
      'ES': { male: 81, female: 86 },
      'NL': { male: 80, female: 84 },
      'BE': { male: 79, female: 84 },
      'AT': { male: 79, female: 84 },
      'LU': { male: 80, female: 85 },
      'SE': { male: 81, female: 85 },
      'NO': { male: 81, female: 85 },
      'DK': { male: 79, female: 83 },
      'FI': { male: 79, female: 85 },
      'IE': { male: 80, female: 84 },
      'PT': { male: 79, female: 85 },
      'GR': { male: 79, female: 84 },
      'PL': { male: 74, female: 82 },
      'CZ': { male: 76, female: 82 },
      'HU': { male: 73, female: 80 },
      'RO': { male: 72, female: 79 },
      'BG': { male: 72, female: 79 },
      'HR': { male: 75, female: 81 },
      'SI': { male: 78, female: 84 },
      'SK': { male: 74, female: 81 },
      'EE': { male: 76, female: 83 },
      'LV': { male: 70, female: 80 },
      'LT': { male: 71, female: 81 },
      'MT': { male: 80, female: 85 },
      'CY': { male: 79, female: 83 },
      'CA': { male: 80, female: 84 },
      'AU': { male: 81, female: 85 },
      'NZ': { male: 80, female: 84 },
      'JP': { male: 82, female: 88 },
      'SG': { male: 82, female: 87 },
      'HK': { male: 83, female: 88 },
      'AE': { male: 78, female: 80 },
      'SA': { male: 75, female: 78 },
      'IL': { male: 81, female: 85 },
      'TR': { male: 76, female: 82 },
      'ZA': { male: 64, female: 71 },
      'BR': { male: 73, female: 80 },
      'MX': { male: 75, female: 80 },
      'AR': { male: 74, female: 80 },
      'CL': { male: 78, female: 84 },
      'CO': { male: 74, female: 80 },
      'IN': { male: 70, female: 72 },
      'CN': { male: 75, female: 79 },
      'KR': { male: 80, female: 86 },
      'TH': { male: 74, female: 81 },
      'MY': { male: 74, female: 78 },
      'ID': { male: 70, female: 74 },
      'PH': { male: 68, female: 75 },
      'VN': { male: 71, female: 81 }
    };

    const baseExpectancy = lifeExpectancyByCountry[countryOfBirth]?.[gender] || (gender === 'male' ? 76 : 81);
    const currentAge = currentYear - birthYear;
    
    if (currentAge > baseExpectancy) {
      return currentAge + 10;
    }
    
    const yearsUntilBaseAge = baseExpectancy - currentAge;
    const expectancyImprovement = Math.floor(yearsUntilBaseAge / 10) * 2;
    
    return baseExpectancy + expectancyImprovement + 15;
  }, [currentYear]);

  const expectedLifespan = useMemo(() => {
    return calculateLifeExpectancy(inputs.birthYear, inputs.countryOfBirth, inputs.gender);
  }, [inputs.birthYear, inputs.countryOfBirth, inputs.gender, calculateLifeExpectancy]);

  const convertToBaseCurrency = useCallback((amount, fromCurrency) => {
    if (fromCurrency === inputs.currency) return amount;
    const inEUR = amount * exchangeRates[fromCurrency];
    return inEUR / exchangeRates[inputs.currency];
  }, [inputs.currency, exchangeRates]);

  const calculations = useMemo(() => {
    const currentAge = currentYear - inputs.birthYear;
    const retirementAge = inputs.retirementYear - inputs.birthYear;
    const yearsToRetirement = inputs.retirementYear - currentYear;
    const yearsInRetirement = expectedLifespan - retirementAge;
    const inflationRate = inputs.inflation / 100;
    
    // Convert all to base currency
    const currentCashBase = convertToBaseCurrency(inputs.currentCash, inputs.currentCashCurrency);
    const currentInvestmentsMediumBase = convertToBaseCurrency(inputs.currentInvestmentsMedium || 0, inputs.currentInvestmentsMediumCurrency);
    const currentInvestmentsLongTermBase = convertToBaseCurrency(inputs.currentInvestmentsLongTerm || 0, inputs.currentInvestmentsLongTermCurrency);
    const annualIncomeBase = convertToBaseCurrency(inputs.annualIncome, inputs.annualIncomeCurrency);
    const annualExpensesBase = convertToBaseCurrency(inputs.annualExpenses, inputs.annualExpensesCurrency);
    
    // Inflate retirement income and expenses from the start
    const retirementIncomeBase = convertToBaseCurrency(inputs.retirementIncome, inputs.retirementIncomeCurrency) * Math.pow(1 + inflationRate, yearsToRetirement);
    const retirementExpensesBase = convertToBaseCurrency(inputs.retirementExpenses, inputs.retirementExpensesCurrency) * Math.pow(1 + inflationRate, yearsToRetirement);
    
    // Grow Medium Term investments until retirement (goes to Longevity)
    let longevityInvestments = currentInvestmentsMediumBase;
    
    // Long Term investments go directly to Legacy (grow separately)
    let legacyInvestments = currentInvestmentsLongTermBase;
    
    // Current Cash stays in Liquidity and grows with liquidityReturn
    let liquidityCash = currentCashBase;
    
    const annualSavings = annualIncomeBase - annualExpensesBase;
    
    const preRetirementData = [];
    
    for (let i = 0; i < yearsToRetirement; i++) {
      const year = currentYear + i;
      const age = year - inputs.birthYear;
      let yearAdjustment = 0;
      let oneOffTotal = 0;

      oneOffItems.forEach(item => {
        if (item.year === year) {
          const amountBase = convertToBaseCurrency(item.amount, item.currency);
          const amount = item.type === 'income' ? amountBase : -amountBase;
          yearAdjustment += amount;
          oneOffTotal += amount;
        }
      });

      const inflatedIncome = annualIncomeBase * Math.pow(1 + inflationRate, i);
      const inflatedExpenses = annualExpensesBase * Math.pow(1 + inflationRate, i);

      // FIRST: Push current year's values BEFORE growth
      preRetirementData.push({
        age,
        year,
        income: inflatedIncome,
        expenses: inflatedExpenses,
        oneOffs: oneOffTotal,
        liquidityStrategy: liquidityCash,
        longevityStrategy: longevityInvestments,
        legacyStrategy: legacyInvestments,
        totalWealth: liquidityCash + longevityInvestments + legacyInvestments
      });

      // THEN: Grow investments for next year
      // Grow Medium Term investments (Longevity)
      longevityInvestments += annualSavings + yearAdjustment;
      longevityInvestments *= (1 + inputs.longevityReturn / 100);
      
      // Grow Long Term investments (Legacy)
      legacyInvestments *= (1 + inputs.legacyReturn / 100);
      
      // Grow Liquidity (Current Cash)
      liquidityCash *= (1 + inputs.liquidityReturn / 100);
    }

    // Total wealth at retirement = cash + longevity investments + legacy investments
    const totalWealthAtRetirement = liquidityCash + longevityInvestments + legacyInvestments;
    
    // NEW ALLOCATION LOGIC AT RETIREMENT:
    // 1. Liquidity = expenses × liquidityYears (fixed buffer)
    const firstYearRetirementExpenses = retirementExpensesBase;
    const targetLiquidity = firstYearRetirementExpenses * inputs.liquidityYears;
    let liquidityNeeded = Math.max(liquidityCash, targetLiquidity);
    
    // 2. Longevity = Goal-Seek (exactly what's needed to deplete to 0 at end of life)
    const annualExpenseGap = retirementExpensesBase - retirementIncomeBase;
    
    // Goal seek: Find longevity amount that depletes to exactly 0 at end of life
    let longevityNeeded = 0;
    const availableForLongevityAndLegacy = totalWealthAtRetirement - liquidityNeeded;
    
    let lowerBound = 0;
    let upperBound = availableForLongevityAndLegacy;
    let iterations = 0;
    const maxIterations = 100;
    const relativeTolerance = 0.001;
    
    while (iterations < maxIterations) {
      const testAmount = (lowerBound + upperBound) / 2;
      let testLongevity = testAmount;
      let testLiquidity = liquidityNeeded;
      // Legacy = REST of available wealth
      let testLegacy = availableForLongevityAndLegacy - testAmount;
      
      // Simulate through all retirement years with CORRECT 3L logic
      for (let i = 0; i < yearsInRetirement; i++) {
        const year = inputs.retirementYear + i;
        let yearExpenseGap = annualExpenseGap * Math.pow(1 + inflationRate, i);
        
        // Add one-off items to the gap
        oneOffItems.forEach(item => {
          if (item.year === year) {
            const amountBase = convertToBaseCurrency(item.amount, item.currency);
            yearExpenseGap += item.type === 'income' ? -amountBase : amountBase;
          }
        });
        
        // 1. Liquidity pays expenses
        testLiquidity -= yearExpenseGap;
        
        // 2. Top-up liquidity from longevity to target
        const currentYearExpenses = retirementExpensesBase * Math.pow(1 + inflationRate, i);
        const targetLiquidity = currentYearExpenses * inputs.liquidityYears;
        const liquidityShortfall = targetLiquidity - testLiquidity;
        
        if (liquidityShortfall > 0) {
          if (testLongevity >= liquidityShortfall) {
            testLongevity -= liquidityShortfall;
            testLiquidity += liquidityShortfall;
          } else {
            // Longevity insufficient - fallback to legacy
            testLiquidity += testLongevity;
            testLongevity = 0;
            
            const remainingShortfall = targetLiquidity - testLiquidity;
            if (remainingShortfall > 0 && testLegacy > 0) {
              const legacyTransfer = Math.min(remainingShortfall, testLegacy);
              testLegacy -= legacyTransfer;
              testLiquidity += legacyTransfer;
            }
          }
        }
        
        // 3. All buckets grow
        testLiquidity *= (1 + inputs.liquidityReturn / 100);
        testLongevity *= (1 + inputs.longevityReturn / 100);
        testLegacy *= (1 + inputs.legacyReturn / 100);
      }
      
      // Check convergence - longevity should end at ~0
      const relativeError = Math.abs(testLongevity / testAmount);
      if (relativeError < relativeTolerance || Math.abs(testLongevity) < 1000) {
        longevityNeeded = testAmount;
        break;
      }
      
      // Binary search
      if (testLongevity > 0) {
        upperBound = testAmount; // Ended with surplus, need less
      } else {
        lowerBound = testAmount; // Ended negative, need more
      }
      
      if ((upperBound - lowerBound) / upperBound < relativeTolerance) {
        longevityNeeded = (lowerBound + upperBound) / 2;
        break;
      }
      
      iterations++;
    }
    
    if (longevityNeeded === 0) {
      longevityNeeded = (lowerBound + upperBound) / 2;
    }
    
    // 3. Legacy = REST (everything left over after Liquidity and Longevity)
    let legacyAmount = totalWealthAtRetirement - liquidityNeeded - longevityNeeded;
    
    // Check if we have sufficient funds - will be tracked during simulation
    let sufficientFunds3L = true;
    let depletionAge3L = null;
    let yearsShortfall3L = 0;
    
    // If legacy is negative or zero, we have insufficient funds initially
    if (legacyAmount <= 0) {
      legacyAmount = 0; // Set to 0, not negative!
      // Recalculate: Give everything available to Longevity (no Legacy)
      longevityNeeded = totalWealthAtRetirement - liquidityNeeded;
      if (longevityNeeded < 0) {
        // Not even enough for Liquidity!
        longevityNeeded = 0;
        liquidityNeeded = totalWealthAtRetirement; // Take what we can get
      }
    }

    // Simulation through retirement
    const projectionData = [];
    const detailedAgeTable = [];
    let liquidityBalance = liquidityNeeded;
    let longevityBalance = longevityNeeded;
    let legacyBalance = legacyAmount;

    for (let i = 0; i < yearsInRetirement; i++) {
      const year = inputs.retirementYear + i;
      const age = year - inputs.birthYear;
      const inflatedIncome = retirementIncomeBase * Math.pow(1 + inflationRate, i);
      const inflatedExpenses = retirementExpensesBase * Math.pow(1 + inflationRate, i);
      
      let yearExpenseGap = (retirementExpensesBase - retirementIncomeBase) * Math.pow(1 + inflationRate, i);
      let oneOffTotal = 0;

      oneOffItems.forEach(item => {
        if (item.year === year) {
          const amountBase = convertToBaseCurrency(item.amount, item.currency);
          const amount = item.type === 'income' ? -amountBase : amountBase;
          yearExpenseGap += amount;
          oneOffTotal += (item.type === 'income' ? amountBase : -amountBase);
        }
      });

      // ===== 3L STRATEGY PAYMENT LOGIC =====
      // 1. Liquidity pays net expenses
      liquidityBalance -= yearExpenseGap;
      
      // 2. Top-up liquidity from longevity to maintain target (liquidityPeriod × expenses)
      const currentYearExpenses = retirementExpensesBase * Math.pow(1 + inflationRate, i);
      const targetLiquidity = currentYearExpenses * inputs.liquidityYears;
      const liquidityShortfall = targetLiquidity - liquidityBalance;
      
      if (liquidityShortfall > 0) {
        if (longevityBalance >= liquidityShortfall) {
          // Transfer from longevity to liquidity
          longevityBalance -= liquidityShortfall;
          liquidityBalance += liquidityShortfall;
        } else {
          // Longevity insufficient - take what's left and use legacy as fallback
          liquidityBalance += longevityBalance;
          longevityBalance = 0;
          
          const remainingShortfall = targetLiquidity - liquidityBalance;
          if (remainingShortfall > 0 && legacyBalance > 0) {
            const legacyTransfer = Math.min(remainingShortfall, legacyBalance);
            legacyBalance -= legacyTransfer;
            liquidityBalance += legacyTransfer;
          }
        }
      }
      
      // 3. All buckets grow with their respective returns
      liquidityBalance = liquidityBalance * (1 + inputs.liquidityReturn / 100);
      longevityBalance = longevityBalance * (1 + inputs.longevityReturn / 100);
      legacyBalance = legacyBalance * (1 + inputs.legacyReturn / 100);

      const currentLiquidity = Math.max(0, liquidityBalance);
      const currentLongevity = Math.max(0, longevityBalance);
      const currentLegacy = Math.max(0, legacyBalance);
      const totalWealth = currentLiquidity + currentLongevity + currentLegacy;
      
      // Track when wealth is depleted (use threshold of 100 to catch near-zero)
      if ((totalWealth <= 100 || liquidityBalance < 0) && sufficientFunds3L) {
        sufficientFunds3L = false;
        depletionAge3L = age;
        yearsShortfall3L = yearsInRetirement - i;
      }

      projectionData.push({
        age,
        year,
        liquidity: currentLiquidity,
        longevity: currentLongevity,
        legacy: currentLegacy,
        total: totalWealth,
        withdrawal: -yearExpenseGap  // Negative for display below zero line
      });

      detailedAgeTable.push({
        age,
        year,
        income: inflatedIncome,
        expenses: inflatedExpenses,
        oneOffs: oneOffTotal,
        liquidityStrategy: currentLiquidity,
        longevityStrategy: currentLongevity,
        legacyStrategy: currentLegacy,
        totalWealth
      });
    }

    const fullAgeTable = [...preRetirementData, ...detailedAgeTable];

    // Get starting values from FIRST retirement year (Age 65) in the detailed table
    const firstRetirementYear = detailedAgeTable[0];
    const scenarioStartWealth = firstRetirementYear.liquidityStrategy + firstRetirementYear.longevityStrategy + firstRetirementYear.legacyStrategy;
    const firstYearExpenseGap = firstRetirementYear.expenses - firstRetirementYear.income + (firstRetirementYear.oneOffs || 0);

    // SCENARIO 1: Uniform Return (3.5%) with optimal withdrawal rate
    // Note: No separate liquidity bucket - all wealth is unified "wealth"
    const fourPercentScenario = {
      returnRate: 3.5,
      data: []
    };
    
    // Goal-Seek: Find optimal withdrawal rate that depletes wealth to 0 at end of life
    let optimalRate = 0.04;
    let rateLowerBound = 0.01;
    let rateUpperBound = 0.15;
    const rateIterations = 50;
    
    for (let iter = 0; iter < rateIterations; iter++) {
      const testRate = (rateLowerBound + rateUpperBound) / 2;
      let testWealth = scenarioStartWealth;
      const initialWithdrawal = testWealth * testRate;
      
      // Simulate through all years with this rate
      for (let i = 0; i < yearsInRetirement; i++) {
        const withdrawal = initialWithdrawal * Math.pow(1 + inflationRate, i);
        testWealth -= withdrawal;
        testWealth *= (1 + 3.5 / 100);
      }
      
      // Check convergence
      if (Math.abs(testWealth) < 1000 || Math.abs(testWealth / scenarioStartWealth) < 0.001) {
        optimalRate = testRate;
        break;
      }
      
      // Binary search
      if (testWealth > 0) {
        rateLowerBound = testRate; // Can withdraw more
      } else {
        rateUpperBound = testRate; // Must withdraw less
      }
    }
    
    // Generate projection with optimal rate
    let fourPercentWealth = scenarioStartWealth;
    const optimalWithdrawal = scenarioStartWealth * optimalRate;
    
    for (let i = 0; i < yearsInRetirement; i++) {
      const detailEntry = detailedAgeTable[i];
      const yearWithdrawal = optimalWithdrawal * Math.pow(1 + inflationRate, i);
      const investmentReturn = fourPercentWealth * 0.035; // 3.5% return on current wealth
      
      // FIRST: Push current year's values
      fourPercentScenario.data.push({
        age: detailEntry.age,
        year: detailEntry.year,
        wealth: Math.max(0, fourPercentWealth),
        withdrawal: -yearWithdrawal, // Negative for display
        investmentReturn: investmentReturn
      });
      
      // THEN: Apply changes for next year
      fourPercentWealth -= yearWithdrawal;
      fourPercentWealth *= (1 + 3.5 / 100);
    }
    
    // Store optimal rate info
    fourPercentScenario.optimalRate = optimalRate;
    fourPercentScenario.optimalWithdrawal = optimalWithdrawal;
    fourPercentScenario.fourPercentWithdrawal = scenarioStartWealth * 0.04;
    fourPercentScenario.currentSpending = firstYearExpenseGap;
    fourPercentScenario.currentSpendingRate = (firstYearExpenseGap / scenarioStartWealth) * 100;

    // SCENARIO 2: No Investment (pure drawdown)
    // Note: ALL wealth is in liquidity - uses liquidity return rate
    const noInvestmentScenario = {
      returnRate: inputs.liquidityReturn,
      data: [],
      sufficientFunds: true,
      yearsShortfall: 0
    };
    
    // ALL wealth goes to liquidity (no longevity/legacy buckets without investment!)
    let noInvestWealth = scenarioStartWealth;
    
    for (let i = 0; i < yearsInRetirement; i++) {
      const detailEntry = detailedAgeTable[i];
      const yearWithdrawal = detailEntry.expenses - detailEntry.income + (detailEntry.oneOffs || 0);
      
      // FIRST: Push current year's values - ALL in liquidity
      noInvestmentScenario.data.push({
        age: detailEntry.age,
        year: detailEntry.year,
        liquidity: Math.max(0, noInvestWealth),
        longevity: 0,
        legacy: 0,
        withdrawal: -yearWithdrawal  // Negative for display
      });
      
      // THEN: Apply changes for next year (liquidity return, not 0%)
      noInvestWealth -= yearWithdrawal;
      noInvestWealth *= (1 + inputs.liquidityReturn / 100);
      
      // Track if funds run out
      if (noInvestWealth < 0 && noInvestmentScenario.sufficientFunds) {
        noInvestmentScenario.sufficientFunds = false;
        noInvestmentScenario.depletionAge = detailEntry.age;
        noInvestmentScenario.yearsShortfall = yearsInRetirement - i - 1;
      }
    }

    // SCENARIO 3: Continue Pre-Retirement Strategy (no 3L reallocation)
    const continuePreRetirementScenario = {
      data: [],
      sufficientFunds: true,
      yearsShortfall: 0
    };
    
    // Start with pre-retirement values (no reallocation!)
    let contLiquidity = liquidityCash;
    let contLongevity = longevityInvestments;
    let contLegacy = legacyInvestments;
    
    for (let i = 0; i < yearsInRetirement; i++) {
      const detailEntry = detailedAgeTable[i];
      const yearWithdrawal = detailEntry.expenses - detailEntry.income + (detailEntry.oneOffs || 0);
      
      // FIRST: Push current year's values
      continuePreRetirementScenario.data.push({
        age: detailEntry.age,
        year: detailEntry.year,
        liquidity: Math.max(0, contLiquidity),
        longevity: Math.max(0, contLongevity),
        legacy: Math.max(0, contLegacy),
        withdrawal: -yearWithdrawal
      });
      
      // ===== CONTINUE PRE-RETIREMENT PAYMENT LOGIC =====
      // Pay from liquidity first, then longevity, then legacy (cascade)
      // NO top-up, NO transfers between buckets!
      
      let remainingExpenses = yearWithdrawal;
      
      // Try to pay from liquidity first
      if (contLiquidity > 0) {
        const liquidityPayment = Math.min(remainingExpenses, contLiquidity);
        contLiquidity -= liquidityPayment;
        remainingExpenses -= liquidityPayment;
      }
      
      // If liquidity exhausted, pay from longevity
      if (remainingExpenses > 0 && contLongevity > 0) {
        const longevityPayment = Math.min(remainingExpenses, contLongevity);
        contLongevity -= longevityPayment;
        remainingExpenses -= longevityPayment;
      }
      
      // If longevity exhausted, pay from legacy
      if (remainingExpenses > 0 && contLegacy > 0) {
        const legacyPayment = Math.min(remainingExpenses, contLegacy);
        contLegacy -= legacyPayment;
        remainingExpenses -= legacyPayment;
      }
      
      // Grow each bucket with its own return (no reallocation!)
      contLiquidity *= (1 + inputs.liquidityReturn / 100);
      contLongevity *= (1 + inputs.longevityReturn / 100);
      contLegacy *= (1 + inputs.legacyReturn / 100);
      
      // Track if funds run out (check after growth, use threshold)
      const totalWealthCont = Math.max(0, contLiquidity) + Math.max(0, contLongevity) + Math.max(0, contLegacy);
      if ((remainingExpenses > 0 || totalWealthCont <= 100) && continuePreRetirementScenario.sufficientFunds) {
        continuePreRetirementScenario.sufficientFunds = false;
        continuePreRetirementScenario.depletionAge = detailEntry.age;
        continuePreRetirementScenario.yearsShortfall = i + 1; // Year number when it runs out (1-indexed)
      }
    }

    // Calculate max withdrawal across all scenarios for consistent Y-axis scaling
    const maxWithdrawalPortfolio = Math.max(...projectionData.map(d => Math.abs(d.withdrawal || 0)));
    const maxWithdrawalFourPercent = Math.max(...fourPercentScenario.data.map(d => Math.abs(d.withdrawal || 0)));
    const maxWithdrawalNoInvest = Math.max(...noInvestmentScenario.data.map(d => Math.abs(d.expenses || 0)));
    const maxWithdrawalContinue = Math.max(...continuePreRetirementScenario.data.map(d => Math.abs(d.withdrawal || 0)));
    const maxWithdrawal = Math.max(maxWithdrawalPortfolio, maxWithdrawalFourPercent, maxWithdrawalNoInvest, maxWithdrawalContinue);
    
    // Calculate max wealth for upper bound
    const maxWealthPortfolio = Math.max(...projectionData.map(d => d.liquidity + d.longevity + d.legacy));
    const maxWealthFourPercent = Math.max(...fourPercentScenario.data.map(d => d.wealth));
    const maxWealthNoInvest = Math.max(...noInvestmentScenario.data.map(d => d.liquidity + d.longevity + d.legacy));
    const maxWealthContinue = Math.max(...continuePreRetirementScenario.data.map(d => d.liquidity + d.longevity + d.legacy));
    const maxWealth = Math.max(maxWealthPortfolio, maxWealthFourPercent, maxWealthNoInvest, maxWealthContinue);
    
    // Y-Axis scaling: 1.1x for both
    const yAxisMax = maxWealth * 1.1;  // TOP chart: 110% of max wealth
    const yAxisMinExpenses = -maxWithdrawal * 1.1;  // BOTTOM chart: -110% of max expenses
    
    // CRITICAL: Calculate proportional heights so both charts have same scale!
    // Total data range = yAxisMax + abs(yAxisMinExpenses)
    const totalDataRange = yAxisMax + Math.abs(yAxisMinExpenses);
    const totalPixelHeight = 500; // Total height for both charts
    
    // Proportional heights based on data ranges
    const topChartHeight = Math.round((yAxisMax / totalDataRange) * totalPixelHeight);
    const bottomChartHeight = Math.round((Math.abs(yAxisMinExpenses) / totalDataRange) * totalPixelHeight);
    
    // Generate 4 evenly spaced ticks for TOP chart (wealth)
    const tickStepWealth = yAxisMax / 4;
    const yAxisTicksWealth = [tickStepWealth, tickStepWealth * 2, tickStepWealth * 3, tickStepWealth * 4];
    
    // Generate 4 evenly spaced ticks for BOTTOM chart (expenses)
    const tickStepExpenses = Math.abs(yAxisMinExpenses) / 4;
    const yAxisTicksExpenses = [tickStepExpenses, tickStepExpenses * 2, tickStepExpenses * 3, tickStepExpenses * 4];

    return {
      savingsAtRetirement: totalWealthAtRetirement,
      liquidityNeeded,
      longevityNeeded,
      legacyAmount,
      projectionData,
      totalAllocated: liquidityNeeded + longevityNeeded + legacyAmount,
      detailedAgeTable: fullAgeTable,
      expectedLifespan,
      currentAge,
      retirementAge,
      yearsToRetirement,
      fourPercentScenario,
      noInvestmentScenario,
      continuePreRetirementScenario,
      yAxisMinExpenses,
      yAxisMax,
      yAxisTicksWealth,
      yAxisTicksExpenses,
      topChartHeight,
      bottomChartHeight,
      sufficientFunds3L,
      depletionAge3L,
      yearsShortfall3L
    };
  }, [inputs, oneOffItems, convertToBaseCurrency, expectedLifespan, currentYear]);

  const convertToEUR = useCallback((value) => {
    return value * exchangeRates[inputs.currency];
  }, [inputs.currency, exchangeRates]);

  const keyMetricsInEUR = useMemo(() => {
    if (!calculations || !calculations.savingsAtRetirement) {
      return {
        savingsAtRetirement: 0,
        liquidityNeeded: 0,
        longevityNeeded: 0,
        legacyAmount: 0,
        totalAllocated: 0,
        currentCash: 0,
        currentInvestments: 0,
        annualIncome: 0,
        annualExpenses: 0,
        retirementIncome: 0,
        retirementExpenses: 0
      };
    }
    
    return {
      savingsAtRetirement: convertToEUR(calculations.savingsAtRetirement),
      liquidityNeeded: convertToEUR(calculations.liquidityNeeded),
      longevityNeeded: convertToEUR(calculations.longevityNeeded),
      legacyAmount: convertToEUR(calculations.legacyAmount),
      totalAllocated: convertToEUR(calculations.totalAllocated),
      currentCash: convertToEUR(convertToBaseCurrency(inputs.currentCash, inputs.currentCashCurrency)),
      currentInvestments: convertToEUR(
        convertToBaseCurrency(inputs.currentInvestmentsMedium || 0, inputs.currentInvestmentsMediumCurrency) +
        convertToBaseCurrency(inputs.currentInvestmentsLongTerm || 0, inputs.currentInvestmentsLongTermCurrency)
      ),
      annualIncome: convertToEUR(convertToBaseCurrency(inputs.annualIncome, inputs.annualIncomeCurrency)),
      annualExpenses: convertToEUR(convertToBaseCurrency(inputs.annualExpenses, inputs.annualExpensesCurrency)),
      retirementIncome: convertToEUR(convertToBaseCurrency(inputs.retirementIncome, inputs.retirementIncomeCurrency)),
      retirementExpenses: convertToEUR(convertToBaseCurrency(inputs.retirementExpenses, inputs.retirementExpensesCurrency))
    };
  }, [calculations, inputs, convertToEUR, convertToBaseCurrency]);

  const formatCurrency = (value, currency = inputs.currency) => {
    const symbol = currencySymbols[currency];
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
    return `${symbol}${formatted}`;
  };

  const CurrencyInput = ({ label, field, currencyField }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-2 text-slate-500">{currencySymbols[inputs[currencyField]]}</span>
          <input
            type="text"
            value={formatInputCurrency(inputs[field])}
            onChange={(e) => handleCurrencyInputChange(field, e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-right border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={inputs[currencyField]}
          onChange={(e) => handleInputChange(currencyField, e.target.value)}
          className="w-24 px-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CHF">CHF</option>
          <option value="SEK">SEK</option>
          <option value="NOK">NOK</option>
          <option value="DKK">DKK</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">{t('title')}</h1>
          <p className="text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">{t('yourInformation')}</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('countryOfResidence')}</label>
                  <select
                    value={inputs.countryOfResidence}
                    onChange={(e) => handleInputChange('countryOfResidence', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('countryOfBirth')}</label>
                  <select
                    value={inputs.countryOfBirth}
                    onChange={(e) => handleInputChange('countryOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('displayLanguage')}</label>
                  <select
                    value={inputs.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('displayCurrency')}</label>
                  <select
                    value={inputs.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CHF">CHF</option>
                    <option value="SEK">SEK</option>
                    <option value="NOK">NOK</option>
                    <option value="DKK">DKK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('birthYear')}</label>
                <input
                  type="number"
                  value={inputs.birthYear}
                  onChange={(e) => handleInputChange('birthYear', Number(e.target.value))}
                  min={1920}
                  max={2020}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('gender')}</label>
                <select
                  value={inputs.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t('retirementYear')}
                  {inputs.retirementYear && inputs.birthYear && (
                    <span className="text-slate-500 font-normal ml-2">({t('age')} {inputs.retirementYear - inputs.birthYear})</span>
                  )}
                </label>
                <input
                  type="number"
                  value={inputs.retirementYear}
                  onChange={(e) => handleInputChange('retirementYear', Number(e.target.value))}
                  min={currentYear}
                  max={2100}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('liquidityPeriod')}</label>
                <select
                  value={inputs.liquidityYears}
                  onChange={(e) => handleInputChange('liquidityYears', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <CurrencyInput 
                label={t('currentCash')} 
                field="currentCash" 
                currencyField="currentCashCurrency"
              />

              <CurrencyInput 
                label={t('currentInvestments')} 
                field="currentInvestments" 
                currencyField="currentInvestmentsCurrency"
              />

              <CurrencyInput 
                label={t('annualIncomeCurrent')} 
                field="annualIncome" 
                currencyField="annualIncomeCurrency"
              />

              <CurrencyInput 
                label={t('annualExpensesCurrent')} 
                field="annualExpenses" 
                currencyField="annualExpensesCurrency"
              />

              <CurrencyInput 
                label={t('retirementIncomeAnnual')} 
                field="retirementIncome" 
                currencyField="retirementIncomeCurrency"
              />

              <CurrencyInput 
                label={t('retirementExpensesAnnual')} 
                field="retirementExpenses" 
                currencyField="retirementExpensesCurrency"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('inflationRate')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.inflation}
                  onChange={(e) => handleInputChange('inflation', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('liquidityReturn')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.liquidityReturn}
                  onChange={(e) => handleInputChange('liquidityReturn', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('longevityReturn')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.longevityReturn}
                  onChange={(e) => handleInputChange('longevityReturn', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('legacyReturn')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.legacyReturn}
                  onChange={(e) => handleInputChange('legacyReturn', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('riskProfile')}</label>
                <select
                  value={inputs.riskProfile}
                  onChange={(e) => handleInputChange('riskProfile', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.entries(riskProfiles).map(([key, { name }]) => (
                    <option key={key} value={key}>{key} - {name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* One-off Items Section */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('oneOffIncomeExpenses')}</h3>
              
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">{t('year')}</label>
                    <input
                      type="number"
                      value={newOneOff.year}
                      onChange={(e) => setNewOneOff(prev => ({ ...prev, year: Number(e.target.value) }))}
                      min={currentYear}
                      max={inputs.birthYear + expectedLifespan}
                      className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">{t('type')}</label>
                    <select
                      value={newOneOff.type}
                      onChange={(e) => setNewOneOff(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="income">{t('income')}</option>
                      <option value="expense">{t('expense')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">{t('amount')}</label>
                    <div className="relative">
                      <span className="absolute left-2 top-1 text-xs text-slate-500">{currencySymbols[newOneOff.currency]}</span>
                      <input
                        type="text"
                        value={formatInputCurrency(newOneOff.amount)}
                        onChange={(e) => {
                          const numericValue = parseFloat(e.target.value.replace(/[^0-9.-]/g, '')) || 0;
                          setNewOneOff(prev => ({ ...prev, amount: numericValue }));
                        }}
                        className="w-full pl-8 pr-2 py-1 text-sm text-right border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">{t('currency')}</label>
                    <select
                      value={newOneOff.currency}
                      onChange={(e) => setNewOneOff(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="CHF">CHF</option>
                      <option value="SEK">SEK</option>
                      <option value="NOK">NOK</option>
                      <option value="DKK">DKK</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">{t('description')}</label>
                  <input
                    type="text"
                    value={newOneOff.description}
                    onChange={(e) => setNewOneOff(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={addOneOffItem}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                >
                  {t('addItem')}
                </button>
              </div>

              {oneOffItems.length > 0 && (
                <div className="space-y-2">
                  {oneOffItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-slate-50 p-2 rounded text-xs">
                      <div className="flex-1">
                        <div className="font-medium">{item.description}</div>
                        <div className="text-slate-600">
                          {item.year} • {formatCurrency(item.amount, item.currency)} • {t(item.type)}
                        </div>
                      </div>
                      <button
                        onClick={() => removeOneOffItem(item.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results Panel - will continue in next part */}
          <div className="lg:col-span-2 space-y-6">
            {/* Three Bucket Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="text-sm font-medium opacity-90 mb-1">{t('liquidityBucket')}</div>
                <div className="text-3xl font-bold mb-2">{formatCurrency(calculations.liquidityNeeded)}</div>
                <div className="text-sm opacity-75">{t('throughoutRetirement')} • {inputs.liquidityReturn}% {t('return')}</div>
                <div className="text-xs opacity-75 mt-2">{t('maintainsExpenses', {years: inputs.liquidityYears})}</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="text-sm font-medium opacity-90 mb-1">{t('longevityBucket')}</div>
                <div className="text-3xl font-bold mb-2">{formatCurrency(calculations.longevityNeeded)}</div>
                <div className="text-sm opacity-75">{t('fundsRetirement')} • {inputs.longevityReturn}% {t('return')}</div>
                <div className="text-xs opacity-75 mt-2">{t('depletesToZero', {age: expectedLifespan})}</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                <div className="text-sm font-medium opacity-90 mb-1">{t('legacyBucket')}</div>
                <div className="text-3xl font-bold mb-2">{formatCurrency(calculations.legacyAmount)}</div>
                <div className="text-sm opacity-75">• {inputs.legacyReturn}% {t('return')}</div>
                <div className="text-xs opacity-75 mt-2">{t('wealthTransfer')}</div>
              </div>
            </div>


            {/* EUR Conversion Table - Only show if needed */}
            {(inputs.currency !== 'EUR' || 
              inputs.currentCashCurrency !== 'EUR' ||
              inputs.currentInvestmentsMediumCurrency !== 'EUR' ||
              inputs.currentInvestmentsLongTermCurrency !== 'EUR' ||
              inputs.annualIncomeCurrency !== 'EUR' ||
              inputs.annualExpensesCurrency !== 'EUR' ||
              inputs.retirementIncomeCurrency !== 'EUR' ||
              inputs.retirementExpensesCurrency !== 'EUR') && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {t('eurConversion')}
                <span className="text-sm font-normal text-slate-600 ml-2">
                  (1 {inputs.currency} = {exchangeRates[inputs.currency].toFixed(4)} EUR)
                </span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 font-semibold text-slate-700">Item</th>
                      <th className="text-right py-2 font-semibold text-slate-700">{inputs.currency}</th>
                      <th className="text-right py-2 font-semibold text-slate-700">EUR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 text-slate-600">{t('currentCash')}</td>
                      <td className="py-2 text-right">{formatCurrency(convertToBaseCurrency(inputs.currentCash, inputs.currentCashCurrency))}</td>
                      <td className="py-2 text-right">{formatCurrency(keyMetricsInEUR.currentCash, 'EUR')}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">{t('currentInvestments')}</td>
                      <td className="py-2 text-right">{formatCurrency(
                        convertToBaseCurrency(inputs.currentInvestmentsMedium || 0, inputs.currentInvestmentsMediumCurrency) +
                        convertToBaseCurrency(inputs.currentInvestmentsLongTerm || 0, inputs.currentInvestmentsLongTermCurrency)
                      )}</td>
                      <td className="py-2 text-right">{formatCurrency(keyMetricsInEUR.currentInvestments, 'EUR')}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">{t('annualIncome')}</td>
                      <td className="py-2 text-right">{formatCurrency(convertToBaseCurrency(inputs.annualIncome, inputs.annualIncomeCurrency))}</td>
                      <td className="py-2 text-right">{formatCurrency(keyMetricsInEUR.annualIncome, 'EUR')}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">{t('annualExpenses')}</td>
                      <td className="py-2 text-right">{formatCurrency(convertToBaseCurrency(inputs.annualExpenses, inputs.annualExpensesCurrency))}</td>
                      <td className="py-2 text-right">{formatCurrency(keyMetricsInEUR.annualExpenses, 'EUR')}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">{t('retirementIncome')}</td>
                      <td className="py-2 text-right">{formatCurrency(convertToBaseCurrency(inputs.retirementIncome, inputs.retirementIncomeCurrency))}</td>
                      <td className="py-2 text-right">{formatCurrency(keyMetricsInEUR.retirementIncome, 'EUR')}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">{t('retirementExpenses')}</td>
                      <td className="py-2 text-right">{formatCurrency(convertToBaseCurrency(inputs.retirementExpenses, inputs.retirementExpensesCurrency))}</td>
                      <td className="py-2 text-right">{formatCurrency(keyMetricsInEUR.retirementExpenses, 'EUR')}</td>
                    </tr>
                    <tr className="font-semibold bg-slate-50">
                      <td className="py-2 text-slate-800">{t('savingsAtRetirement')}</td>
                      <td className="py-2 text-right">{formatCurrency(calculations.savingsAtRetirement)}</td>
                      <td className="py-2 text-right">{formatCurrency(keyMetricsInEUR.savingsAtRetirement, 'EUR')}</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="py-2 text-blue-800">{t('liquidityBucket')}</td>
                      <td className="py-2 text-right text-blue-800">{formatCurrency(calculations.liquidityNeeded)}</td>
                      <td className="py-2 text-right text-blue-800">{formatCurrency(keyMetricsInEUR.liquidityNeeded, 'EUR')}</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="py-2 text-purple-800">{t('longevityBucket')}</td>
                      <td className="py-2 text-right text-purple-800">{formatCurrency(calculations.longevityNeeded)}</td>
                      <td className="py-2 text-right text-purple-800">{formatCurrency(keyMetricsInEUR.longevityNeeded, 'EUR')}</td>
                    </tr>
                    <tr className="bg-emerald-50">
                      <td className="py-2 text-emerald-800">{t('legacyBucket')}</td>
                      <td className="py-2 text-right text-emerald-800">{formatCurrency(calculations.legacyAmount)}</td>
                      <td className="py-2 text-right text-emerald-800">{formatCurrency(keyMetricsInEUR.legacyAmount, 'EUR')}</td>
                    </tr>
                    <tr className="font-bold border-t-2 border-slate-300">
                      <td className="py-2 text-slate-800">{t('totalAllocated')}</td>
                      <td className="py-2 text-right">{formatCurrency(calculations.totalAllocated)}</td>
                      <td className="py-2 text-right">{formatCurrency(keyMetricsInEUR.totalAllocated, 'EUR')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* Planning Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('planningOverview')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-slate-600">{t('currentAge')}</div>
                  <div className="text-2xl font-bold text-slate-800">{calculations.currentAge}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">{t('yearsToRetirement')}</div>
                  <div className="text-2xl font-bold text-slate-800">{calculations.yearsToRetirement}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">{t('expectedLifespan')}*</div>
                  <div className="text-2xl font-bold text-slate-800">{expectedLifespan}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">{t('riskProfile')}</div>
                  <div className="text-2xl font-bold" style={{ color: riskProfiles[inputs.riskProfile].color }}>
                    {inputs.riskProfile}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                * {t('gender')} {inputs.gender === 'male' ? t('male').toLowerCase() : t('female').toLowerCase()}, {countries.find(c => c.code === inputs.countryOfBirth)?.name}, {inputs.birthYear} + 15 years
              </div>
            </div>

            {/* Scenario Comparison Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('portfolioProjection')}</h3>
              
              <ScenarioComparison 
                calculations={calculations}
                inputs={inputs}
                t={t}
                formatCurrency={formatCurrency}
                currencySymbols={currencySymbols}
              />
            </div>

            {/* Year-by-Year Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('yearByYear')}</h3>
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-slate-100 border-b-2 border-slate-300">
                    <tr>
                      <th className="text-left py-2 px-2 font-semibold text-slate-700">{t('year')}</th>
                      <th className="text-left py-2 px-2 font-semibold text-slate-700">{t('age')}</th>
                      <th className="text-right py-2 px-2 font-semibold text-slate-700">{t('income')}</th>
                      <th className="text-right py-2 px-2 font-semibold text-slate-700">{t('expenses')}</th>
                      <th className="text-right py-2 px-2 font-semibold text-slate-700">{t('oneOffs')}</th>
                      <th className="text-right py-2 px-2 font-semibold text-blue-700">{t('liquidity')}</th>
                      <th className="text-right py-2 px-2 font-semibold text-purple-700">{t('longevity')}</th>
                      <th className="text-right py-2 px-2 font-semibold text-emerald-700">{t('legacy')}</th>
                      <th className="text-right py-2 px-2 font-semibold text-slate-800">{t('totalWealth')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {calculations.detailedAgeTable.map((row, index) => {
                      const isRetirementYear = row.year === inputs.retirementYear;
                      return (
                        <tr 
                          key={index} 
                          className={`hover:bg-slate-50 ${isRetirementYear ? 'bg-yellow-50 border-y-2 border-yellow-300' : ''}`}
                        >
                          <td className={`py-2 px-2 ${isRetirementYear ? 'font-bold' : ''}`}>
                            {row.year}
                            {isRetirementYear && <span className="ml-1 text-yellow-600">🎉</span>}
                          </td>
                          <td className="py-2 px-2">{row.age}</td>
                          <td className="py-2 px-2 text-right text-slate-600">{formatCurrency(row.income)}</td>
                          <td className="py-2 px-2 text-right text-slate-600">{formatCurrency(row.expenses)}</td>
                          <td className={`py-2 px-2 text-right ${row.oneOffs > 0 ? 'text-green-600 font-medium' : row.oneOffs < 0 ? 'text-red-600 font-medium' : 'text-slate-400'}`}>
                            {row.oneOffs !== 0 ? formatCurrency(Math.abs(row.oneOffs)) : '-'}
                          </td>
                          <td className="py-2 px-2 text-right text-blue-700">
                            {row.liquidityStrategy > 0 ? formatCurrency(row.liquidityStrategy) : '-'}
                          </td>
                          <td className="py-2 px-2 text-right text-purple-700">
                            {row.longevityStrategy > 0 
                              ? formatCurrency(row.longevityStrategy) 
                              : (index === calculations.detailedAgeTable.length - 1 ? '1' : '-')
                            }
                          </td>
                          <td className="py-2 px-2 text-right text-emerald-700">
                            {formatCurrency(row.legacyStrategy)}
                          </td>
                          <td className="py-2 px-2 text-right font-semibold text-slate-800">
                            {formatCurrency(row.totalWealth)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanner;
