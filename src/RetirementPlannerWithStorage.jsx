import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import LegalTaxFramework from './LegalTaxFramework';
import EnhancedLiquidityStrategy from './EnhancedLiquidityStrategy';
import LongevityBucketRefinement from './LongevityBucketRefinement';
import LegacyBucketStrategy from './LegacyBucketStrategy';
import RetirementPlannerComplete from './RetirementPlannerComplete';
import DataEntry from './DataEntry';

const RetirementPlannerWithStorage = () => {
  const [activeTab, setActiveTab] = useState('data-entry');
  const [savedPlans, setSavedPlans] = useState([]);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [planName, setPlanName] = useState('My Plan');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Shared state between tabs
  const [sharedState, setSharedState] = useState({
    country: 'LU',
    language: 'en',
    currency: 'EUR',
    riskProfile: 'D',
    calculatorData: {}
  });

  // Centralized inputs state shared between DataEntry and Calculator
  const [centralizedInputs, setCentralizedInputs] = useState({
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
    currency: 'EUR',
    liquidityYears: 5
  });

  const [oneOffItems, setOneOffItems] = useState([]);

  // Load saved plans on mount
  useEffect(() => {
    loadSavedPlans();
  }, []);

  const loadSavedPlans = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('retirement_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSavedPlans(data || []);
    } catch (error) {
      console.error('Fehler beim Laden der Pläne:', error);
      alert(t(translations.errorLoading) + ': ' + error.message);
    }
  };

  const savePlan = async () => {
    if (!planName.trim()) {
      alert(t(translations.enterPlanName));
      return;
    }

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error(t(translations.notLoggedIn));

      const planData = {
        user_id: user.id,
        plan_name: planName,
        plan_data: {
          ...sharedState,
          centralizedInputs,
          oneOffItems
        },
        updated_at: new Date().toISOString()
      };

      if (currentPlanId) {
        // Update existing plan
        const { error } = await supabase
          .from('retirement_plans')
          .update(planData)
          .eq('id', currentPlanId);

        if (error) throw error;
        alert(t(translations.updateSuccess));
      } else {
        // Create new plan
        const { data, error } = await supabase
          .from('retirement_plans')
          .insert([planData])
          .select();

        if (error) throw error;
        setCurrentPlanId(data[0].id);
        alert(t(translations.saveSuccess));
      }

      await loadSavedPlans();
      setShowSaveDialog(false);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      alert(t(translations.errorSaving) + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPlan = async (planId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('retirement_plans')
        .select('*')
        .eq('id', planId)
        .single();

      if (error) throw error;

      setSharedState(data.plan_data);
      if (data.plan_data.centralizedInputs) {
        setCentralizedInputs(data.plan_data.centralizedInputs);
      }
      if (data.plan_data.oneOffItems) {
        setOneOffItems(data.plan_data.oneOffItems);
      }
      setCurrentPlanId(data.id);
      setPlanName(data.plan_name);
      setShowLoadDialog(false);
      alert(t(translations.loadSuccess));
    } catch (error) {
      console.error('Fehler beim Laden:', error);
      alert(t(translations.errorLoading) + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (planId) => {
    if (!confirm(t(translations.confirmDelete))) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('retirement_plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;

      if (currentPlanId === planId) {
        setCurrentPlanId(null);
        setPlanName(t(translations.myPlan));
      }

      await loadSavedPlans();
      alert(t(translations.deleteSuccess));
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      alert(t(translations.errorDeleting) + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewPlan = () => {
    if (currentPlanId && !confirm(t(translations.confirmNew))) {
      return;
    }
    setCurrentPlanId(null);
    setPlanName(t(translations.newPlan));
    setSharedState({
      country: 'LU',
      language: 'en',
      currency: 'EUR',
      riskProfile: 'D',
      calculatorData: {}
    });
    setCentralizedInputs({
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
      currency: 'EUR',
      liquidityYears: 5
    });
    setOneOffItems([]);
  };

  const tabs = [
    { 
      id: 'data-entry', 
      label: { 
        en: 'Data Entry', 
        de: 'Dateneingabe', 
        fr: 'Saisie de Données' 
      }, 
      icon: '📝' 
    },
    { 
      id: 'calculator', 
      label: { 
        en: 'Summary', 
        de: 'Übersicht', 
        fr: 'Résumé' 
      }, 
      icon: '📊' 
    },
    { 
      id: 'liquidity',
      label: { 
        en: 'Liquidity Strategy', 
        de: 'Liquiditätsstrategie', 
        fr: 'Stratégie de Liquidité' 
      }, 
      icon: '💰' 
    },
    { 
      id: 'longevity',
      label: { 
        en: 'Longevity Planning', 
        de: 'Langlebigkeitsplanung', 
        fr: 'Planification de Longévité' 
      }, 
      icon: '⏳' 
    },
    { 
      id: 'legacy',
      label: { 
        en: 'Legacy Strategy', 
        de: 'Vermächtnis-Strategie', 
        fr: 'Stratégie de Legs' 
      }, 
      icon: '🎁' 
    },
    { 
      id: 'legal-tax', 
      label: { 
        en: 'Legal & Tax Framework', 
        de: 'Rechts- & Steuerrahmen', 
        fr: 'Cadre Juridique & Fiscal' 
      }, 
      icon: '⚖️' 
    }
  ];

  const t = (obj) => obj[sharedState.language] || obj.en;

  // Translations for UI elements
  const translations = {
    new: { en: 'New', de: 'Neu', fr: 'Nouveau' },
    load: { en: 'Load', de: 'Laden', fr: 'Charger' },
    save: { en: 'Save', de: 'Speichern', fr: 'Enregistrer' },
    update: { en: 'Update', de: 'Aktualisieren', fr: 'Mettre à jour' },
    saved: { en: 'Saved', de: 'Gespeichert', fr: 'Enregistré' },
    planName: { en: 'Plan Name', de: 'Plan Name', fr: 'Nom du Plan' },
    newPlan: { en: 'New Plan', de: 'Neuer Plan', fr: 'Nouveau Plan' },
    myPlan: { en: 'My Plan', de: 'Mein Plan', fr: 'Mon Plan' },
    savePlan: { en: 'Save Plan', de: 'Plan speichern', fr: 'Enregistrer le plan' },
    updatePlan: { en: 'Update Plan', de: 'Plan aktualisieren', fr: 'Mettre à jour le plan' },
    cancel: { en: 'Cancel', de: 'Abbrechen', fr: 'Annuler' },
    close: { en: 'Close', de: 'Schließen', fr: 'Fermer' },
    delete: { en: 'Delete', de: 'Löschen', fr: 'Supprimer' },
    savedPlans: { en: 'Saved Plans', de: 'Gespeicherte Pläne', fr: 'Plans Enregistrés' },
    noPlans: { en: 'No saved plans available.', de: 'Keine gespeicherten Pläne vorhanden.', fr: 'Aucun plan enregistré disponible.' },
    lastUpdated: { en: 'Last updated', de: 'Zuletzt aktualisiert', fr: 'Dernière mise à jour' },
    saving: { en: 'Saving...', de: 'Speichert...', fr: 'Enregistrement...' },
    confirmNew: { 
      en: 'Do you want to create a new plan? Unsaved changes will be lost.', 
      de: 'Möchtest du einen neuen Plan erstellen? Nicht gespeicherte Änderungen gehen verloren.',
      fr: 'Voulez-vous créer un nouveau plan? Les modifications non enregistrées seront perdues.'
    },
    confirmDelete: {
      en: 'Do you really want to delete this plan?',
      de: 'Möchtest du diesen Plan wirklich löschen?',
      fr: 'Voulez-vous vraiment supprimer ce plan?'
    },
    enterPlanName: {
      en: 'Please enter a name for the plan.',
      de: 'Bitte gib einen Namen für den Plan ein.',
      fr: 'Veuillez entrer un nom pour le plan.'
    },
    saveSuccess: {
      en: 'Plan saved successfully!',
      de: 'Plan erfolgreich gespeichert!',
      fr: 'Plan enregistré avec succès!'
    },
    updateSuccess: {
      en: 'Plan updated successfully!',
      de: 'Plan erfolgreich aktualisiert!',
      fr: 'Plan mis à jour avec succès!'
    },
    loadSuccess: {
      en: 'Plan loaded successfully!',
      de: 'Plan erfolgreich geladen!',
      fr: 'Plan chargé avec succès!'
    },
    deleteSuccess: {
      en: 'Plan deleted successfully!',
      de: 'Plan erfolgreich gelöscht!',
      fr: 'Plan supprimé avec succès!'
    },
    errorLoading: {
      en: 'Error loading plans',
      de: 'Fehler beim Laden der Pläne',
      fr: 'Erreur lors du chargement des plans'
    },
    errorSaving: {
      en: 'Error saving',
      de: 'Fehler beim Speichern',
      fr: 'Erreur lors de l\'enregistrement'
    },
    errorDeleting: {
      en: 'Error deleting',
      de: 'Fehler beim Löschen',
      fr: 'Erreur lors de la suppression'
    },
    notLoggedIn: {
      en: 'Not logged in',
      de: 'Nicht angemeldet',
      fr: 'Non connecté'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Action Bar with Save/Load buttons */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg font-medium text-lg"
              placeholder={t(translations.planName)}
            />
            {currentPlanId && (
              <span className="text-sm text-green-600">✓ {t(translations.saved)}</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={createNewPlan}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              ➕ {t(translations.new)}
            </button>
            <button
              onClick={() => setShowLoadDialog(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              📂 {t(translations.load)}
            </button>
            <button
              onClick={() => setShowSaveDialog(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              disabled={loading}
            >
              💾 {currentPlanId ? t(translations.update) : t(translations.save)}
            </button>
          </div>
        </div>
      </div>

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
      <div className="max-w-7xl mx-auto">
        
        {/* DATA ENTRY TAB - Eingabefelder + Asset Allocation */}
        {activeTab === 'data-entry' && (
          <div className="animate-fadeIn">
            <DataEntry 
              language={sharedState.language}
              onLanguageChange={(lang) => {
                setSharedState(prev => ({ ...prev, language: lang }));
                setCentralizedInputs(prev => ({ ...prev, language: lang }));
              }}
              inputs={centralizedInputs}
              onInputsChange={setCentralizedInputs}
              oneOffItems={oneOffItems}
              onOneOffItemsChange={setOneOffItems}
            />
          </div>
        )}
        
        {/* CALCULATOR/SUMMARY TAB - Visualisierungen & Results */}
        {activeTab === 'calculator' && (
          <div className="animate-fadeIn calculator-summary-mode">
            <RetirementPlannerComplete 
              language={sharedState.language}
              onLanguageChange={(lang) => setSharedState(prev => ({ ...prev, language: lang }))}
              initialInputs={centralizedInputs}
              initialOneOffItems={oneOffItems}
            />
          </div>
        )}
        
        {/* LIQUIDITY STRATEGY TAB */}
        {activeTab === 'liquidity' && (
          <div className="animate-fadeIn p-4 md:p-8">
            <EnhancedLiquidityStrategy 
              annualExpenses={60000}
              currentLiquidity={{
                tierI: 15000,
                tierII: 50000,
                tierIII: 80000
              }}
              longevityBucketValue={500000}
              currency={sharedState.currency}
              language={sharedState.language}
            />
          </div>
        )}

        {/* LONGEVITY PLANNING TAB */}
        {activeTab === 'longevity' && (
          <div className="animate-fadeIn p-4 md:p-8">
            <LongevityBucketRefinement 
              country={sharedState.country}
              gender="male"
              currentAge={65}
              portfolioValue={1000000}
              annualExpenses={60000}
              guaranteedIncome={20000}
              currency={sharedState.currency}
              language={sharedState.language}
            />
          </div>
        )}

        {/* LEGACY STRATEGY TAB - NEU! */}
        {activeTab === 'legacy' && (
          <div className="animate-fadeIn p-4 md:p-8">
            <LegacyBucketStrategy 
              portfolioValue={1000000}
              timeHorizon={20}
              riskProfile={sharedState.riskProfile}
              currency={sharedState.currency}
              language={sharedState.language}
            />
          </div>
        )}

        {/* LEGAL & TAX TAB */}
        {activeTab === 'legal-tax' && (
          <div className="animate-fadeIn p-4 md:p-8">
            <LegalTaxFramework 
              selectedCountry={sharedState.country}
              language={sharedState.language}
            />
          </div>
        )}
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">
              {currentPlanId ? t(translations.updatePlan) : t(translations.savePlan)}
            </h2>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-4"
              placeholder={t(translations.planName)}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {t(translations.cancel)}
              </button>
              <button
                onClick={savePlan}
                disabled={loading}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
              >
                {loading ? t(translations.saving) : (currentPlanId ? t(translations.update) : t(translations.save))}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Dialog */}
      {showLoadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{t(translations.savedPlans)}</h2>
            {savedPlans.length === 0 ? (
              <p className="text-slate-600 text-center py-8">
                {t(translations.noPlans)}
              </p>
            ) : (
              <div className="space-y-2">
                {savedPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <div>
                      <h3 className="font-medium">{plan.plan_name}</h3>
                      <p className="text-sm text-slate-600">
                        {t(translations.lastUpdated)}: {new Date(plan.updated_at).toLocaleString(sharedState.language === 'de' ? 'de-DE' : sharedState.language === 'fr' ? 'fr-FR' : 'en-US')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadPlan(plan.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={loading}
                      >
                        {t(translations.load)}
                      </button>
                      <button
                        onClick={() => deletePlan(plan.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        disabled={loading}
                      >
                        {t(translations.delete)}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowLoadDialog(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {t(translations.close)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Hide input panel in calculator summary mode */
        .calculator-summary-mode .lg\\:col-span-1 {
          display: none !important;
        }
        .calculator-summary-mode .lg\\:col-span-2 {
          grid-column: span 3 / span 3 !important;
        }
      `}</style>
    </div>
  );
};

export default RetirementPlannerWithStorage;
