import React, { useState } from 'react';
import RiskProfileAssetAllocation from './RiskProfileAssetAllocation';

const translations = {
  en: {
    title: "Data Entry",
    subtitle: "Enter Your Retirement Planning Information",
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
    retirementAge: "Retirement Age",
    age: "Age",
    currentCash: "Current Cash",
    currentInvestments: "Current Investments/Investable Assets",
    currentInvestmentsMedium: "Current Investments (Medium Term)",
    currentInvestmentsLongTerm: "Current Investments (Very Long Term)",
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
    accountTaxStatus: "Account Tax Status",
    taxable: "Taxable Account",
    taxAdvantaged: "Tax-Advantaged Account",
    investmentObjective: "Investment Objective",
    growth: "Growth / Capital Appreciation",
    income: "Income / Cash Flow",
    geographicFocus: "Geographic Focus",
    global: "Global (MSCI World)",
    regional: "Regional / Local Bias",
    assetClasses: "Asset Classes",
    traditional: "Traditional Only",
    withNTAC: "Including NTAC (Non-Traditional)",
    oneOffIncomeExpenses: "One-Off Income/Expenses",
    year: "Year",
    type: "Type",
    income: "Income",
    expense: "Expense",
    amount: "Amount",
    currency: "Currency",
    description: "Description",
    addItem: "Add Item"
  },
  de: {
    title: "Dateneingabe",
    subtitle: "Geben Sie Ihre Rentenplanungsinformationen ein",
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
    retirementAge: "Rentenalter",
    age: "Alter",
    currentCash: "Aktuelles Bargeld",
    currentInvestments: "Aktuelle Investitionen/Anlagevermögen",
    currentInvestmentsMedium: "Aktuelle Investitionen (Mittelfristig)",
    currentInvestmentsLongTerm: "Aktuelle Investitionen (Sehr Langfristig)",
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
    accountTaxStatus: "Konto-Steuerstatus",
    taxable: "Steuerpflichtiges Konto",
    taxAdvantaged: "Steuerbegünstigtes Konto",
    investmentObjective: "Anlageziel",
    growth: "Wachstum / Kapitalzuwachs",
    income: "Erträge / Cash Flow",
    geographicFocus: "Geografischer Fokus",
    global: "Global (MSCI World)",
    regional: "Regional / Lokaler Fokus",
    assetClasses: "Anlageklassen",
    traditional: "Nur Traditionell",
    withNTAC: "Mit NTAC (Nicht-traditionell)",
    oneOffIncomeExpenses: "Einmalige Einnahmen/Ausgaben",
    year: "Jahr",
    type: "Typ",
    income: "Einnahmen",
    expense: "Ausgaben",
    amount: "Betrag",
    currency: "Währung",
    description: "Beschreibung",
    addItem: "Hinzufügen"
  },
  fr: {
    title: "Saisie de Données",
    subtitle: "Entrez vos informations de planification de retraite",
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
    retirementAge: "Âge de retraite",
    age: "Âge",
    currentCash: "Liquidités actuelles",
    currentInvestments: "Investissements actuels",
    currentInvestmentsMedium: "Investissements actuels (Moyen Terme)",
    currentInvestmentsLongTerm: "Investissements actuels (Très Long Terme)",
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
    accountTaxStatus: "Statut Fiscal du Compte",
    taxable: "Compte Imposable",
    taxAdvantaged: "Compte Fiscalement Avantageux",
    investmentObjective: "Objectif d'Investissement",
    growth: "Croissance / Plus-value",
    income: "Revenu / Cash Flow",
    geographicFocus: "Focus Géographique",
    global: "Global (MSCI World)",
    regional: "Régional / Focus Local",
    assetClasses: "Classes d'Actifs",
    traditional: "Traditionnel Uniquement",
    withNTAC: "Avec NTAC (Non-traditionnel)",
    oneOffIncomeExpenses: "Revenus/Dépenses ponctuels",
    year: "Année",
    type: "Type",
    income: "Revenu",
    expense: "Dépense",
    amount: "Montant",
    currency: "Devise",
    description: "Description",
    addItem: "Ajouter"
  }
};

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CHF: 'CHF',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr'
};

const DataEntry = ({ language = 'en', onLanguageChange, inputs: propInputs, onInputsChange, oneOffItems: propOneOffItems, onOneOffItemsChange }) => {
  const currentYear = 2026;
  
  // Use props or defaults
  const inputs = propInputs || {
    retirementYear: 2046,
    retirementAge: 65,
    birthYear: 1981,
    gender: 'male',
    countryOfResidence: 'LU',
    countryOfBirth: 'LU',
    language: language,
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
  };

  const oneOffItems = propOneOffItems || [];

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
    { code: 'FI', name: 'Finland', defaultCurrency: 'EUR' }
  ];

  const t = (key) => translations[inputs.language]?.[key] || translations.en[key] || key;

  const handleInputChange = (field, value) => {
    const newInputs = { ...inputs, [field]: value };
    
    // Calculate retirementYear from retirementAge and birthYear
    if (field === 'retirementAge' || field === 'birthYear') {
      const birthYear = field === 'birthYear' ? value : inputs.birthYear;
      const retirementAge = field === 'retirementAge' ? value : inputs.retirementAge;
      newInputs.retirementYear = birthYear + retirementAge;
    }
    
    if (field === 'countryOfResidence') {
      const country = countries.find(c => c.code === value);
      if (country) {
        const newCurrency = country.defaultCurrency;
        newInputs.currency = newCurrency;
        
        const oldCurrency = inputs.currency;
        if (oldCurrency !== newCurrency) {
          newInputs.currentCashCurrency = newCurrency;
          newInputs.currentInvestmentsMediumCurrency = newCurrency;
          newInputs.currentInvestmentsLongTermCurrency = newCurrency;
          newInputs.annualIncomeCurrency = newCurrency;
          newInputs.annualExpensesCurrency = newCurrency;
          newInputs.retirementIncomeCurrency = newCurrency;
          newInputs.retirementExpensesCurrency = newCurrency;
        }
      }
    }
    
    if (field === 'currency') {
      const newCurrency = value;
      const oldCurrency = inputs.currency;
      if (oldCurrency !== newCurrency) {
        newInputs.currentCashCurrency = newCurrency;
        newInputs.currentInvestmentsMediumCurrency = newCurrency;
        newInputs.currentInvestmentsLongTermCurrency = newCurrency;
        newInputs.annualIncomeCurrency = newCurrency;
        newInputs.annualExpensesCurrency = newCurrency;
        newInputs.retirementIncomeCurrency = newCurrency;
        newInputs.retirementExpensesCurrency = newCurrency;
      }
    }
    
    // Update parent state
    if (onInputsChange) {
      onInputsChange(newInputs);
    }
    
    if (field === 'language' && onLanguageChange) {
      onLanguageChange(value);
    }
  };

  const formatInputCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCurrencyInputChange = (field, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    handleInputChange(field, numericValue === '' ? 0 : Number(numericValue));
  };

  const addOneOffItem = () => {
    if (newOneOff.amount !== 0) {
      const updatedItems = [...oneOffItems, { ...newOneOff, id: Date.now() }];
      if (onOneOffItemsChange) {
        onOneOffItemsChange(updatedItems);
      }
      setNewOneOff({
        year: 2026,
        amount: 0,
        currency: 'EUR',
        type: 'income',
        description: ''
      });
    }
  };

  const removeOneOffItem = (id) => {
    const updatedItems = oneOffItems.filter(item => item.id !== id);
    if (onOneOffItemsChange) {
      onOneOffItemsChange(updatedItems);
    }
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">{t('title')}</h1>
          <p className="text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 overflow-y-auto" style={{ maxHeight: '1200px' }}>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">{t('yourInformation')}</h2>
            
            <div className="space-y-4">
              {/* Display Language and Display Currency */}
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

              {/* Country of Residence and Country of Birth */}
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

              {/* Birth Year and Retirement Age */}
              <div className="grid grid-cols-2 gap-2">
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t('retirementAge')}
                    {inputs.birthYear && (
                      <span className="text-slate-500 font-normal ml-2">({inputs.birthYear + inputs.retirementAge})</span>
                    )}
                  </label>
                  <input
                    type="number"
                    value={inputs.retirementAge}
                    onChange={(e) => handleInputChange('retirementAge', Number(e.target.value))}
                    min={50}
                    max={99}
                    className="w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
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
                label={t('currentInvestmentsMedium')} 
                field="currentInvestmentsMedium" 
                currencyField="currentInvestmentsMediumCurrency"
              />

              <CurrencyInput 
                label={t('currentInvestmentsLongTerm')} 
                field="currentInvestmentsLongTerm" 
                currencyField="currentInvestmentsLongTermCurrency"
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
                  value={inputs.inflation}
                  onChange={(e) => handleInputChange('inflation', Number(e.target.value))}
                  step="0.1"
                  min="0"
                  max="20"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('liquidityReturn')}</label>
                <input
                  type="number"
                  value={inputs.liquidityReturn}
                  onChange={(e) => handleInputChange('liquidityReturn', Number(e.target.value))}
                  step="0.1"
                  min="0"
                  max="20"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('longevityReturn')}</label>
                <input
                  type="number"
                  value={inputs.longevityReturn}
                  onChange={(e) => handleInputChange('longevityReturn', Number(e.target.value))}
                  step="0.1"
                  min="0"
                  max="20"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('legacyReturn')}</label>
                <input
                  type="number"
                  value={inputs.legacyReturn}
                  onChange={(e) => handleInputChange('legacyReturn', Number(e.target.value))}
                  step="0.1"
                  min="0"
                  max="20"
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
                  <option value="A">A - Very Conservative</option>
                  <option value="B">B - Conservative</option>
                  <option value="C">C - Moderate</option>
                  <option value="D">D - Growth</option>
                  <option value="E">E - Aggressive Growth</option>
                </select>
              </div>

              {/* Portfolio Dimensions */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Portfolio Structure</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('accountTaxStatus')}</label>
                    <select
                      value={inputs.accountTaxStatus}
                      onChange={(e) => handleInputChange('accountTaxStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="taxable">{t('taxable')}</option>
                      <option value="taxAdvantaged">{t('taxAdvantaged')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('investmentObjective')}</label>
                    <select
                      value={inputs.investmentObjective}
                      onChange={(e) => handleInputChange('investmentObjective', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="growth">{t('growth')}</option>
                      <option value="income">{t('income')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('geographicFocus')}</label>
                    <select
                      value={inputs.geographicFocus}
                      onChange={(e) => handleInputChange('geographicFocus', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="global">{t('global')}</option>
                      <option value="regional">{t('regional')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('assetClasses')}</label>
                    <select
                      value={inputs.assetClasses}
                      onChange={(e) => handleInputChange('assetClasses', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="traditional">{t('traditional')}</option>
                      <option value="withNTAC">{t('withNTAC')}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* One-Off Income/Expenses */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">{t('oneOffIncomeExpenses')}</h3>
              
              <div className="space-y-2 mb-3">
                {oneOffItems.map(item => (
                  <div key={item.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                    <span className="text-sm flex-1">{item.year}: {currencySymbols[item.currency]}{item.amount} ({t(item.type)})</span>
                    <button onClick={() => removeOneOffItem(item.id)} className="text-red-500 hover:text-red-700">×</button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="number"
                  placeholder={t('year')}
                  value={newOneOff.year}
                  onChange={(e) => setNewOneOff({...newOneOff, year: Number(e.target.value)})}
                  className="px-2 py-1 border border-slate-300 rounded text-sm"
                />
                <select
                  value={newOneOff.type}
                  onChange={(e) => setNewOneOff({...newOneOff, type: e.target.value})}
                  className="px-2 py-1 border border-slate-300 rounded text-sm"
                >
                  <option value="income">{t('income')}</option>
                  <option value="expense">{t('expense')}</option>
                </select>
              </div>
              
              <input
                type="number"
                placeholder={t('amount')}
                value={newOneOff.amount || ''}
                onChange={(e) => setNewOneOff({...newOneOff, amount: Number(e.target.value)})}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm mb-2"
              />
              
              <button
                onClick={addOneOffItem}
                className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                {t('addItem')}
              </button>
            </div>
          </div>

          {/* Asset Allocation Panel */}
          <div className="lg:col-span-2">
            <RiskProfileAssetAllocation 
              selectedProfile={inputs.riskProfile}
              onProfileChange={(profile) => handleInputChange('riskProfile', profile)}
              language={inputs.language}
              currency={inputs.currency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
