import React, { useState } from 'react';
import { countryLegalTaxData } from './countryLegalTaxData';

const LegalTaxFramework = ({ selectedCountry = 'LU', language = 'en' }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  const countryData = countryLegalTaxData[selectedCountry];
  
  if (!countryData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-800">Country data not yet available for this jurisdiction. Currently available: Luxembourg (LU), Switzerland (CH), France (FR), United Kingdom (UK), Portugal (PT)</p>
      </div>
    );
  }

  const translations = {
    en: {
      title: 'Legal & Tax Framework',
      disclaimer: 'Important Disclaimer',
      disclaimerTitle: '⚠️ Important Notice',
      disclaimerText: [
        'This section provides general educational information about legal and tax considerations in your selected country.',
        'This information is NOT:',
        '❌ Legal advice',
        '❌ Tax advice',  
        '❌ Financial advice',
        'You MUST consult:',
        '✅ Licensed attorney in your jurisdiction',
        '✅ Certified tax advisor',
        '✅ Registered financial planner',
        'Information may be outdated or incomplete. Laws change frequently. Last updated: ' + countryData.lastUpdated
      ],
      understand: 'I understand and accept these limitations',
      continue: 'Continue',
      estatePlanning: 'Estate Planning',
      taxation: 'Investment Taxation',
      planningTools: 'Wealth Planning Tools',
      matrimonialRegime: 'Matrimonial Regime',
      forcedHeirship: 'Forced Heirship',
      will: 'Will & Testament',
      probate: 'Probate Process',
      incomeTax: 'Income Taxation',
      capitalGainsTax: 'Capital Gains Tax',
      wealthTax: 'Wealth Tax',
      inheritanceTax: 'Inheritance & Gift Tax',
      lifeInsurance: 'Life Insurance',
      corporateStructures: 'Corporate Structures',
      specialRegimes: 'Special Tax Regimes',
      lastUpdated: 'Last Updated',
      learnMore: 'Learn More',
      default: 'Default',
      options: 'Options',
      requirements: 'Requirements',
      advantages: 'Advantages',
      disadvantages: 'Disadvantages',
      cost: 'Cost',
      protectedHeirs: 'Protected Heirs',
      reservedPortion: 'Reserved Portion',
      disposablePortion: 'Freely Disposable',
      types: 'Types',
      typicalDuration: 'Typical Duration',
      estimatedCosts: 'Estimated Costs',
      rates: 'Rates',
      exemptions: 'Exemptions',
      threshold: 'Threshold',
      taxAdvantages: 'Tax Advantages',
      eligibility: 'Eligibility',
      benefits: 'Benefits',
      status: 'Status',
      available: 'Available',
      closed: 'Closed',
      providers: 'Key Providers',
      moreInfo: 'More Information'
    },
    de: {
      title: 'Rechts- und Steuerrahmen',
      disclaimer: 'Wichtiger Haftungsausschluss',
      disclaimerTitle: '⚠️ Wichtiger Hinweis',
      disclaimerText: [
        'Dieser Abschnitt bietet allgemeine Bildungsinformationen über rechtliche und steuerliche Überlegungen in Ihrem ausgewählten Land.',
        'Diese Informationen sind NICHT:',
        '❌ Rechtsberatung',
        '❌ Steuerberatung',
        '❌ Finanzberatung',
        'Sie MÜSSEN konsultieren:',
        '✅ Zugelassener Anwalt in Ihrer Rechtsordnung',
        '✅ Zertifizierter Steuerberater',
        '✅ Registrierter Finanzplaner',
        'Informationen können veraltet oder unvollständig sein. Gesetze ändern sich häufig. Zuletzt aktualisiert: ' + countryData.lastUpdated
      ],
      understand: 'Ich verstehe und akzeptiere diese Einschränkungen',
      continue: 'Fortfahren',
      estatePlanning: 'Nachlassplanung',
      taxation: 'Anlagebesteuerung',
      planningTools: 'Vermögensplanungsinstrumente',
      matrimonialRegime: 'Güterstand',
      forcedHeirship: 'Pflichtteil',
      will: 'Testament',
      probate: 'Nachlassverfahren',
      incomeTax: 'Einkommensteuer',
      capitalGainsTax: 'Kapitalertragsteuer',
      wealthTax: 'Vermögensteuer',
      inheritanceTax: 'Erbschaft- und Schenkungsteuer',
      lifeInsurance: 'Lebensversicherung',
      corporateStructures: 'Unternehmensstrukturen',
      specialRegimes: 'Besondere Steuerregelungen',
      lastUpdated: 'Zuletzt aktualisiert',
      learnMore: 'Mehr erfahren',
      default: 'Standard',
      options: 'Optionen',
      requirements: 'Anforderungen',
      advantages: 'Vorteile',
      disadvantages: 'Nachteile',
      cost: 'Kosten',
      protectedHeirs: 'Geschützte Erben',
      reservedPortion: 'Pflichtteil',
      disposablePortion: 'Frei verfügbar',
      types: 'Arten',
      typicalDuration: 'Typische Dauer',
      estimatedCosts: 'Geschätzte Kosten',
      rates: 'Sätze',
      exemptions: 'Befreiungen',
      threshold: 'Schwellenwert',
      taxAdvantages: 'Steuervorteile',
      eligibility: 'Berechtigung',
      benefits: 'Vorteile',
      status: 'Status',
      available: 'Verfügbar',
      closed: 'Geschlossen',
      providers: 'Hauptanbieter',
      moreInfo: 'Weitere Informationen'
    },
    fr: {
      title: 'Cadre juridique et fiscal',
      disclaimer: 'Avis de non-responsabilité important',
      disclaimerTitle: '⚠️ Avis important',
      disclaimerText: [
        'Cette section fournit des informations éducatives générales sur les considérations juridiques et fiscales dans votre pays sélectionné.',
        'Ces informations ne sont PAS:',
        '❌ Conseil juridique',
        '❌ Conseil fiscal',
        '❌ Conseil financier',
        'Vous DEVEZ consulter:',
        '✅ Avocat agréé dans votre juridiction',
        '✅ Conseiller fiscal certifié',
        '✅ Planificateur financier agréé',
        'Les informations peuvent être obsolètes ou incomplètes. Les lois changent fréquemment. Dernière mise à jour: ' + countryData.lastUpdated
      ],
      understand: 'Je comprends et accepte ces limitations',
      continue: 'Continuer',
      estatePlanning: 'Planification successorale',
      taxation: 'Fiscalité des investissements',
      planningTools: 'Outils de planification patrimoniale',
      matrimonialRegime: 'Régime matrimonial',
      forcedHeirship: 'Réserve héréditaire',
      will: 'Testament',
      probate: 'Procédure successorale',
      incomeTax: 'Impôt sur le revenu',
      capitalGainsTax: 'Impôt sur les plus-values',
      wealthTax: 'Impôt sur la fortune',
      inheritanceTax: 'Droits de succession et donation',
      lifeInsurance: 'Assurance-vie',
      corporateStructures: 'Structures corporatives',
      specialRegimes: 'Régimes fiscaux spéciaux',
      lastUpdated: 'Dernière mise à jour',
      learnMore: 'En savoir plus',
      default: 'Par défaut',
      options: 'Options',
      requirements: 'Exigences',
      advantages: 'Avantages',
      disadvantages: 'Inconvénients',
      cost: 'Coût',
      protectedHeirs: 'Héritiers protégés',
      reservedPortion: 'Réserve héréditaire',
      disposablePortion: 'Quotité disponible',
      types: 'Types',
      typicalDuration: 'Durée typique',
      estimatedCosts: 'Coûts estimés',
      rates: 'Taux',
      exemptions: 'Exonérations',
      threshold: 'Seuil',
      taxAdvantages: 'Avantages fiscaux',
      eligibility: 'Éligibilité',
      benefits: 'Avantages',
      status: 'Statut',
      available: 'Disponible',
      closed: 'Fermé',
      providers: 'Principaux prestataires',
      moreInfo: 'Plus d\'informations'
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  if (showDisclaimer) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="max-w-2xl bg-white rounded-xl shadow-2xl p-8 border-2 border-yellow-400">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('disclaimerTitle')}</h2>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="space-y-2 text-sm text-slate-700">
              {t('disclaimerText').map((line, idx) => (
                <p key={idx} className={line.includes('❌') || line.includes('✅') ? 'font-semibold' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowDisclaimer(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {t('continue')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const InfoSection = ({ title, children, icon }) => (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <button
        onClick={() => setActiveSection(activeSection === title ? null : title)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        <span className="text-slate-400">
          {activeSection === title ? '−' : '+'}
        </span>
      </button>
      
      {activeSection === title && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          {children}
        </div>
      )}
    </div>
  );

  const KeyValueItem = ({ label, value }) => (
    <div className="py-2 border-b border-slate-100 last:border-0">
      <div className="text-sm font-medium text-slate-600 mb-1">{label}</div>
      <div className="text-slate-800">{value}</div>
    </div>
  );

  const ListItem = ({ items, title }) => {
    if (!items || (Array.isArray(items) && items.length === 0)) return null;
    
    return (
      <div className="mb-4">
        {title && <div className="text-sm font-semibold text-slate-700 mb-2">{title}:</div>}
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
          {Array.isArray(items) ? items.map((item, idx) => (
            <li key={idx}>{item}</li>
          )) : <li>{items}</li>}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          {t('title')} - {countryData.countryName}
        </h2>
        <p className="text-blue-100 text-sm">
          {t('lastUpdated')}: {countryData.lastUpdated}
        </p>
        {countryData.note && (
          <p className="mt-2 text-sm bg-white/20 rounded px-3 py-2">
            ℹ️ {countryData.note}
          </p>
        )}
      </div>

      {/* Estate Planning Section */}
      <InfoSection title={t('estatePlanning')} icon="⚖️">
        <div className="space-y-6">
          {/* Matrimonial Regime */}
          {countryData.estatePlanning.matrimonialRegime && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('matrimonialRegime')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-3">
                <KeyValueItem 
                  label={t('default')}
                  value={countryData.estatePlanning.matrimonialRegime.defaultEn || countryData.estatePlanning.matrimonialRegime.default}
                />
                {countryData.estatePlanning.matrimonialRegime.description && (
                  <KeyValueItem 
                    label="Description"
                    value={countryData.estatePlanning.matrimonialRegime.description}
                  />
                )}
                {countryData.estatePlanning.matrimonialRegime.options && (
                  <ListItem items={countryData.estatePlanning.matrimonialRegime.options} title={t('options')} />
                )}
                {countryData.estatePlanning.matrimonialRegime.moreInfo && (
                  <a 
                    href={countryData.estatePlanning.matrimonialRegime.moreInfo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1"
                  >
                    {t('learnMore')} →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Forced Heirship */}
          {countryData.estatePlanning.forcedHeirship && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('forcedHeirship')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-3">
                {countryData.estatePlanning.forcedHeirship.applicable === false ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 font-medium">✓ No forced heirship - Complete testamentary freedom</p>
                    {countryData.estatePlanning.forcedHeirship.freedom && (
                      <p className="text-sm text-green-700 mt-1">{countryData.estatePlanning.forcedHeirship.freedom}</p>
                    )}
                  </div>
                ) : (
                  <>
                    {countryData.estatePlanning.forcedHeirship.protectedHeirs && (
                      <ListItem items={countryData.estatePlanning.forcedHeirship.protectedHeirs} title={t('protectedHeirs')} />
                    )}
                    
                    {countryData.estatePlanning.forcedHeirship.reservedPortion && (
                      <div>
                        <div className="text-sm font-semibold text-slate-700 mb-2">{t('reservedPortion')}:</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(countryData.estatePlanning.forcedHeirship.reservedPortion).map(([key, value]) => (
                            <div key={key} className="bg-slate-50 rounded p-2">
                              <span className="text-slate-600">{key}: </span>
                              <span className="font-medium text-slate-800">
                                {typeof value === 'number' ? `${(value * 100).toFixed(0)}%` : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {countryData.estatePlanning.forcedHeirship.note && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">{countryData.estatePlanning.forcedHeirship.note}</p>
                      </div>
                    )}
                  </>
                )}
                
                {countryData.estatePlanning.forcedHeirship.moreInfo && (
                  <a 
                    href={countryData.estatePlanning.forcedHeirship.moreInfo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1"
                  >
                    {t('learnMore')} →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Will */}
          {countryData.estatePlanning.will && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('will')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-3">
                {countryData.estatePlanning.will.types && (
                  <ListItem items={countryData.estatePlanning.will.types} title={t('types')} />
                )}
                
                {countryData.estatePlanning.will.holographic && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="font-medium text-slate-700 mb-2">Holographic Will:</div>
                    <div className="text-sm space-y-1">
                      {countryData.estatePlanning.will.holographic.requirements && (
                        <p><strong>Requirements:</strong> {countryData.estatePlanning.will.holographic.requirements}</p>
                      )}
                      {countryData.estatePlanning.will.holographic.cost && (
                        <p><strong>{t('cost')}:</strong> {countryData.estatePlanning.will.holographic.cost}</p>
                      )}
                    </div>
                  </div>
                )}

                {countryData.estatePlanning.will.notarial && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="font-medium text-slate-700 mb-2">Notarial/Public Will:</div>
                    <div className="text-sm space-y-1">
                      {countryData.estatePlanning.will.notarial.advantages && (
                        <p><strong>{t('advantages')}:</strong> {countryData.estatePlanning.will.notarial.advantages}</p>
                      )}
                      {countryData.estatePlanning.will.notarial.cost && (
                        <p><strong>{t('cost')}:</strong> {countryData.estatePlanning.will.notarial.cost}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Probate */}
          {countryData.estatePlanning.probate && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('probate')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-3">
                {countryData.estatePlanning.probate.certificate && (
                  <KeyValueItem label="Certificate" value={countryData.estatePlanning.probate.certificate} />
                )}
                {countryData.estatePlanning.probate.typicalDuration && (
                  <KeyValueItem label={t('typicalDuration')} value={countryData.estatePlanning.probate.typicalDuration} />
                )}
                {countryData.estatePlanning.probate.estimatedCosts && (
                  <KeyValueItem label={t('estimatedCosts')} value={countryData.estatePlanning.probate.estimatedCosts} />
                )}
              </div>
            </div>
          )}
        </div>
      </InfoSection>

      {/* Taxation Section */}
      <InfoSection title={t('taxation')} icon="💰">
        <div className="space-y-6">
          {/* Income Tax */}
          {countryData.taxation.income && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('incomeTax')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-4">
                {/* Interest */}
                {countryData.taxation.income.interest && (
                  <div className="border-b border-slate-200 pb-3">
                    <div className="font-medium text-slate-700 mb-2">Interest Income:</div>
                    <div className="text-sm space-y-1 text-slate-600">
                      {countryData.taxation.income.interest.rates && (
                        <p><strong>Rates:</strong> {countryData.taxation.income.interest.rates}</p>
                      )}
                      {countryData.taxation.income.interest.exemptions && (
                        <p><strong>{t('exemptions')}:</strong> {countryData.taxation.income.interest.exemptions}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Dividends */}
                {countryData.taxation.income.dividends && (
                  <div className="border-b border-slate-200 pb-3">
                    <div className="font-medium text-slate-700 mb-2">Dividend Income:</div>
                    <div className="text-sm space-y-1 text-slate-600">
                      {countryData.taxation.income.dividends.domesticRate && (
                        <p><strong>Domestic Rate:</strong> {countryData.taxation.income.dividends.domesticRate}</p>
                      )}
                      {countryData.taxation.income.dividends.foreignRate && (
                        <p><strong>Foreign Rate:</strong> {countryData.taxation.income.dividends.foreignRate}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Rental Income */}
                {countryData.taxation.income.rentalIncome && (
                  <div>
                    <div className="font-medium text-slate-700 mb-2">Rental Income:</div>
                    <div className="text-sm space-y-1 text-slate-600">
                      {countryData.taxation.income.rentalIncome.rate && (
                        <p><strong>Rate:</strong> {countryData.taxation.income.rentalIncome.rate}</p>
                      )}
                      {countryData.taxation.income.rentalIncome.deductions && (
                        <ListItem items={countryData.taxation.income.rentalIncome.deductions} title="Deductions" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Capital Gains */}
          {countryData.taxation.capitalGains && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('capitalGainsTax')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-4">
                {countryData.taxation.capitalGains.securities && (
                  <div className="border-b border-slate-200 pb-3">
                    <div className="font-medium text-slate-700 mb-2">Securities:</div>
                    <div className="text-sm space-y-1 text-slate-600">
                      {countryData.taxation.capitalGains.securities.shortTerm && (
                        <p><strong>Short Term:</strong> {countryData.taxation.capitalGains.securities.shortTerm}</p>
                      )}
                      {countryData.taxation.capitalGains.securities.longTerm && (
                        <p><strong>Long Term:</strong> {countryData.taxation.capitalGains.securities.longTerm}</p>
                      )}
                    </div>
                  </div>
                )}

                {countryData.taxation.capitalGains.realEstate && (
                  <div>
                    <div className="font-medium text-slate-700 mb-2">Real Estate:</div>
                    <div className="text-sm space-y-1 text-slate-600">
                      {countryData.taxation.capitalGains.realEstate.primaryResidence && (
                        <p><strong>Primary Residence:</strong> {countryData.taxation.capitalGains.realEstate.primaryResidence}</p>
                      )}
                      {countryData.taxation.capitalGains.realEstate.investmentProperty && (
                        <p><strong>Investment Property:</strong> {countryData.taxation.capitalGains.realEstate.investmentProperty}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Wealth Tax */}
          {countryData.taxation.wealthTax && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('wealthTax')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-3">
                {countryData.taxation.wealthTax.applicable === false ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 font-medium">✓ No wealth tax</p>
                  </div>
                ) : (
                  <>
                    {countryData.taxation.wealthTax.type && (
                      <KeyValueItem label="Type" value={countryData.taxation.wealthTax.type} />
                    )}
                    {countryData.taxation.wealthTax.threshold && (
                      <KeyValueItem label={t('threshold')} value={countryData.taxation.wealthTax.threshold} />
                    )}
                    {countryData.taxation.wealthTax.rate && (
                      <KeyValueItem label="Rate" value={countryData.taxation.wealthTax.rate} />
                    )}
                    {countryData.taxation.wealthTax.exemptions && (
                      <ListItem items={countryData.taxation.wealthTax.exemptions} title={t('exemptions')} />
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Inheritance Tax */}
          {countryData.taxation.inheritanceGiftTax && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('inheritanceTax')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-4">
                {/* Spouse */}
                {countryData.taxation.inheritanceGiftTax.spouse && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="font-medium text-green-800 mb-1">Spouse/Partner:</div>
                    <p className="text-sm text-green-700">
                      Exempt: {countryData.taxation.inheritanceGiftTax.spouse.exempt}
                      {countryData.taxation.inheritanceGiftTax.spouse.rate === 0 && ' (No tax)'}
                    </p>
                  </div>
                )}

                {/* Descendants */}
                {countryData.taxation.inheritanceGiftTax.linealDescendants && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="font-medium text-blue-800 mb-2">Children & Descendants:</div>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>Exemption:</strong> {countryData.taxation.inheritanceGiftTax.linealDescendants.exempt}</p>
                      {countryData.taxation.inheritanceGiftTax.linealDescendants.maxRate && (
                        <p><strong>Max Rate:</strong> {countryData.taxation.inheritanceGiftTax.linealDescendants.maxRate}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Other relationships */}
                {countryData.taxation.inheritanceGiftTax.siblings && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="font-medium text-slate-700 mb-1">Siblings:</div>
                    <p className="text-sm text-slate-600">
                      Exemption: {countryData.taxation.inheritanceGiftTax.siblings.exempt}
                      {countryData.taxation.inheritanceGiftTax.siblings.maxRate && 
                        `, Max Rate: ${countryData.taxation.inheritanceGiftTax.siblings.maxRate}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </InfoSection>

      {/* Planning Tools Section */}
      <InfoSection title={t('planningTools')} icon="🛡️">
        <div className="space-y-6">
          {/* Life Insurance */}
          {countryData.planningTools.lifeInsurance && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('lifeInsurance')}</h4>
              <div className="bg-white rounded-lg p-4 space-y-3">
                {countryData.planningTools.lifeInsurance.type && (
                  <KeyValueItem label="Type" value={countryData.planningTools.lifeInsurance.type} />
                )}
                
                {countryData.planningTools.lifeInsurance.taxAdvantages && (
                  <div>
                    <div className="text-sm font-semibold text-slate-700 mb-2">{t('taxAdvantages')}:</div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-green-700 bg-green-50 rounded p-3">
                      {countryData.planningTools.lifeInsurance.taxAdvantages.map((advantage, idx) => (
                        <li key={idx}>{advantage}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {countryData.planningTools.lifeInsurance.providers && (
                  <ListItem items={countryData.planningTools.lifeInsurance.providers} title={t('providers')} />
                )}
              </div>
            </div>
          )}

          {/* Corporate Structures */}
          {countryData.planningTools.corporateStructures && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('corporateStructures')}</h4>
              <div className="space-y-3">
                {Object.entries(countryData.planningTools.corporateStructures).map(([key, structure]) => (
                  <div key={key} className="bg-white rounded-lg p-4">
                    <div className="font-medium text-slate-800 mb-2">
                      {structure.name} {structure.fullName && `(${structure.fullName})`}
                    </div>
                    {structure.description && (
                      <p className="text-sm text-slate-600 mb-2">{structure.description}</p>
                    )}
                    {structure.advantages && (
                      <div className="mt-2">
                        <div className="text-xs font-semibold text-slate-700 mb-1">{t('advantages')}:</div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                          {structure.advantages.map((advantage, idx) => (
                            <li key={idx}>{advantage}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {structure.costs && (
                      <div className="mt-2 bg-slate-50 rounded p-2 text-sm">
                        <strong>Costs:</strong>
                        {typeof structure.costs === 'object' ? (
                          <div className="ml-4 space-y-1">
                            {Object.entries(structure.costs).map(([costKey, costValue]) => (
                              <div key={costKey}>{costKey}: {costValue}</div>
                            ))}
                          </div>
                        ) : structure.costs}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Regimes */}
          {countryData.planningTools.specialRegimes && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('specialRegimes')}</h4>
              <div className="space-y-3">
                {Object.entries(countryData.planningTools.specialRegimes).map(([key, regime]) => (
                  <div key={key} className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-slate-800">{regime.name}</div>
                      {regime.status && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          regime.status.includes('CLOSED') ? 'bg-red-100 text-red-700' :
                          regime.status.includes('AVAILABLE') ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {regime.status}
                        </span>
                      )}
                    </div>
                    
                    {regime.description && (
                      <p className="text-sm text-slate-600 mb-2">{regime.description}</p>
                    )}
                    
                    {regime.benefits && (
                      <div className="mt-2">
                        <div className="text-xs font-semibold text-slate-700 mb-1">{t('benefits')}:</div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                          {Array.isArray(regime.benefits) ? regime.benefits.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          )) : (
                            Object.entries(regime.benefits).map(([benefitKey, benefitValue]) => (
                              <li key={benefitKey}>
                                <strong>{benefitKey}:</strong> {
                                  Array.isArray(benefitValue) ? benefitValue.join(', ') : benefitValue
                                }
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {regime.eligibility && (
                      <div className="mt-2">
                        <div className="text-xs font-semibold text-slate-700 mb-1">{t('eligibility')}:</div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                          {regime.eligibility.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </InfoSection>
    </div>
  );
};

export default LegalTaxFramework;
