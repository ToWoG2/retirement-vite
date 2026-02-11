import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from 'recharts';

// Translations embedded
const translations = {
  en: {
    title: "Retirement Planning Calculator",
    subtitle: "Three-Bucket Strategy: Liquidity • Longevity • Legacy",
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
    liquidityBucket: "Liquidity Bucket",
    longevityBucket: "Longevity Bucket",
    legacyBucket: "Legacy Bucket",
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
    title: "Rentenplanungsrechner",
    subtitle: "Drei-Eimer-Strategie: Liquidität • Langlebigkeit • Vermächtnis",
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
    liquidityBucket: "Liquiditätseimer",
    longevityBucket: "Langlebigkeitseimer",
    legacyBucket: "Vermächtniseimer",
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
    title: "Calculateur de planification de retraite",
    subtitle: "Stratégie à trois seaux : Liquidité • Longévité • Héritage",
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
    liquidityBucket: "Seau de liquidité",
    longevityBucket: "Seau de longévité",
    legacyBucket: "Seau d'héritage",
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

      // Grow Medium Term investments (Longevity)
      longevityInvestments += annualSavings + yearAdjustment;
      longevityInvestments *= (1 + inputs.longevityReturn / 100);
      
      // Grow Long Term investments (Legacy)
      legacyInvestments *= (1 + inputs.legacyReturn / 100);

      preRetirementData.push({
        age,
        year,
        income: inflatedIncome,
        expenses: inflatedExpenses,
        oneOffs: oneOffTotal,
        liquidityStrategy: 0,
        longevityStrategy: longevityInvestments,
        legacyStrategy: legacyInvestments,
        totalWealth: longevityInvestments + legacyInvestments
      });
    }

    // Total wealth at retirement = cash + longevity investments + legacy investments
    const totalWealthAtRetirement = currentCashBase + longevityInvestments + legacyInvestments;
    
    // NEW ALLOCATION LOGIC AT RETIREMENT:
    // 1. Liquidity = liquidityYears × first year's annual expenses
    const firstYearRetirementExpenses = retirementExpensesBase;
    const liquidityNeeded = firstYearRetirementExpenses * inputs.liquidityYears;
    
    // 2. Calculate longevity needed using goal seek approach
    //    We need longevity to deplete to zero at end of life
    //    Longevity grows at longevityReturn and provides annual funding
    const annualExpenseGap = retirementExpensesBase - retirementIncomeBase;
    
    // Iteratively find the longevity amount that depletes to zero
    let longevityNeeded = 0;
    let testAmount = totalWealthAtRetirement - liquidityNeeded;
    let iterations = 0;
    const maxIterations = 100;
    
    while (iterations < maxIterations) {
      let testBalance = testAmount;
      let liquidityTest = liquidityNeeded;
      
      for (let i = 0; i < yearsInRetirement; i++) {
        const year = inputs.retirementYear + i;
        let yearExpenseGap = annualExpenseGap * Math.pow(1 + inflationRate, i);
        
        oneOffItems.forEach(item => {
          if (item.year === year) {
            const amountBase = convertToBaseCurrency(item.amount, item.currency);
            yearExpenseGap += item.type === 'income' ? -amountBase : amountBase;
          }
        });
        
        const targetLiquidity = retirementExpensesBase * Math.pow(1 + inflationRate, i) * inputs.liquidityYears;
        
        if (liquidityTest < targetLiquidity && testBalance > 0) {
          const transfer = Math.min(targetLiquidity - liquidityTest, testBalance);
          liquidityTest += transfer;
          testBalance -= transfer;
        }
        
        liquidityTest -= yearExpenseGap;
        liquidityTest *= (1 + inputs.liquidityReturn / 100);
        testBalance *= (1 + inputs.longevityReturn / 100);
      }
      
      if (Math.abs(testBalance) < 100) {
        longevityNeeded = testAmount;
        break;
      }
      
      testAmount = testAmount * 0.98;
      iterations++;
    }
    
    if (iterations >= maxIterations) {
      longevityNeeded = totalWealthAtRetirement - liquidityNeeded - legacyInvestments;
    }
    
    // 3. Legacy = Long Term investments that have been growing + any remainder
    const legacyAmount = Math.max(legacyInvestments, totalWealthAtRetirement - liquidityNeeded - longevityNeeded);

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

      const targetLiquidity = retirementExpensesBase * Math.pow(1 + inflationRate, i) * inputs.liquidityYears;
      
      if (liquidityBalance < targetLiquidity && longevityBalance > 0) {
        const needed = targetLiquidity - liquidityBalance;
        const transferAmount = Math.min(needed, longevityBalance);
        liquidityBalance += transferAmount;
        longevityBalance -= transferAmount;
      }
      
      liquidityBalance -= yearExpenseGap;
      
      liquidityBalance = liquidityBalance * (1 + inputs.liquidityReturn / 100);
      longevityBalance = longevityBalance * (1 + inputs.longevityReturn / 100);
      legacyBalance = legacyBalance * (1 + inputs.legacyReturn / 100);

      const currentLiquidity = Math.max(0, liquidityBalance);
      const currentLongevity = Math.max(0, longevityBalance);
      const totalWealth = currentLiquidity + currentLongevity + legacyBalance;

      projectionData.push({
        age,
        year,
        liquidity: currentLiquidity,
        longevity: currentLongevity,
        legacy: legacyBalance,
        total: totalWealth
      });

      detailedAgeTable.push({
        age,
        year,
        income: inflatedIncome,
        expenses: inflatedExpenses,
        oneOffs: oneOffTotal,
        liquidityStrategy: currentLiquidity,
        longevityStrategy: currentLongevity,
        legacyStrategy: legacyBalance,
        totalWealth
      });
    }

    const fullAgeTable = [...preRetirementData, ...detailedAgeTable];

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
      yearsToRetirement
    };
  }, [inputs, oneOffItems, convertToBaseCurrency, expectedLifespan, currentYear]);

  const convertToEUR = useCallback((value) => {
    return value * exchangeRates[inputs.currency];
  }, [inputs.currency, exchangeRates]);

  const keyMetricsInEUR = useMemo(() => {
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

            {/* EUR Conversion Table */}
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

            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('portfolioProjection')}</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={calculations.projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="age" 
                    label={{ value: t('age'), position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${currencySymbols[inputs.currency]}${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(age) => `${t('age')} ${age}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="liquidity" 
                    stackId="a"
                    fill="#3b82f6" 
                    name={t('liquidity')}
                  />
                  <Bar 
                    dataKey="longevity" 
                    stackId="a"
                    fill="#8b5cf6" 
                    name={t('longevity')}
                  />
                  <Bar 
                    dataKey="legacy" 
                    stackId="a"
                    fill="#10b981" 
                    name={t('legacy')}
                  />
                </BarChart>
              </ResponsiveContainer>
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
