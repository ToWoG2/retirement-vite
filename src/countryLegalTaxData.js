// Country Legal, Tax, and Wealth Planning Data
// Last Updated: February 2026
// Countries: Luxembourg, Switzerland, France, United Kingdom, Portugal

export const countryLegalTaxData = {
  LU: {
    countryName: 'Luxembourg',
    countryCode: 'LU',
    currency: 'EUR',
    lastUpdated: '2026-02-01',
    
    estatePlanning: {
      matrimonialRegime: {
        default: 'Communauté des acquêts',
        defaultEn: 'Community of Acquests',
        description: 'Assets acquired during marriage are jointly owned. Pre-marriage assets and inheritances remain separate.',
        options: [
          'Séparation de biens (Separation of property)',
          'Communauté universelle (Universal community)',
          'Communauté réduite aux acquêts (Limited community - default)'
        ],
        changeRequires: 'Notarial marriage contract required before or during marriage',
        impact: 'Affects inheritance rights and estate planning flexibility',
        moreInfo: 'https://justice.public.lu/fr/famille/mariage-cohabitation-partenariat/mariage.html'
      },
      
      forcedHeirship: {
        applicable: true,
        protectedHeirs: ['Spouse', 'Descendants (children, grandchildren)', 'Ascendants (parents) if no descendants'],
        description: 'Luxembourg law protects certain heirs with reserved portions',
        reservedPortion: {
          oneChild: 0.5,
          twoChildren: 0.667,
          threeOrMore: 0.75,
          noChildrenButParents: 0.5,
          spouse: 'Usufruct rights if community of property'
        },
        disposablePortion: {
          oneChild: 0.5,
          twoChildren: 0.333,
          threeOrMore: 0.25,
          noChildrenButParents: 0.5
        },
        clawbackRules: 'Gifts made in last 10 years can be clawed back to calculate reserved portions',
        avoidance: 'EU Succession Regulation allows choice of national law for EU/EEA citizens',
        moreInfo: 'https://guichet.public.lu/fr/citoyens/famille/deces/succession-droits/reserve-hereditaire.html'
      },
      
      will: {
        types: ['Holographic (handwritten)', 'Notarial (public)', 'International'],
        holographic: {
          requirements: 'Must be entirely handwritten, dated, and signed by testator',
          advantages: 'No cost, completely private, easy to make',
          disadvantages: 'Can be contested, may be invalid abroad, can be lost or destroyed',
          cost: '€0'
        },
        notarial: {
          requirements: 'Drafted by notary in presence of witnesses',
          advantages: 'Legally robust, registered centrally, valid abroad',
          disadvantages: 'Costs apply, not private',
          cost: '€500-€1,500 typical'
        },
        international: {
          requirements: 'Follows 1961 Washington Convention format',
          advantages: 'Valid in multiple countries',
          cost: '€800-€2,000 typical'
        },
        euRegulation: {
          applicable: true,
          regulation: 'EU Succession Regulation 650/2012',
          choiceOfLaw: 'Can choose law of nationality instead of residence',
          benefit: 'Avoid forced heirship by choosing UK/Irish law (if eligible)'
        },
        moreInfo: 'https://justice.public.lu/fr/famille/deces/testament.html'
      },
      
      probate: {
        certificate: 'Certificat d\'hérédité / Certificate of Inheritance',
        process: 'Notary drafts certificate identifying heirs and their shares',
        typicalDuration: '3-6 months for simple estates, 12+ months for complex',
        notaryRequired: true,
        requirements: [
          'Death certificate',
          'Will (if exists)',
          'List of assets and liabilities',
          'Proof of heir relationship',
          'Tax clearance'
        ],
        estimatedCosts: '2-5% of estate value (notary fees, registration)',
        crossBorder: 'European Certificate of Succession simplifies cross-border estates',
        moreInfo: 'https://guichet.public.lu/fr/citoyens/famille/deces.html'
      }
    },
    
    taxation: {
      income: {
        interest: {
          type: 'Progressive taxation',
          rates: '0-45.78% (including solidarity surcharge)',
          withholdingTax: '20% on Luxembourg-source interest (can be reclaimed)',
          exemptions: 'First €250 per person exempt',
          reportingThreshold: '€250'
        },
        
        dividends: {
          domesticRate: '15% withholding tax + progressive income tax (with 50% exemption)',
          actualTaxation: 'Only 50% of dividend included in taxable income',
          foreignRate: 'Depends on tax treaty - credit method or exemption'
        },
        
        rentalIncome: {
          taxable: true,
          rate: 'Progressive income tax rates',
          deductions: [
            'Mortgage interest (full)',
            'Maintenance and repairs',
            'Property tax',
            'Insurance',
            'Management fees'
          ]
        },
        
        pensionIncome: {
          socialSecurityPension: 'Taxable at progressive rates',
          foreignPension: 'Usually taxable in Luxembourg (unless treaty states otherwise)'
        }
      },
      
      capitalGains: {
        securities: {
          shortTerm: 'Taxable at progressive rates if sold within 6 months',
          longTerm: 'Tax-free if held over 6 months'
        },
        
        realEstate: {
          primaryResidence: 'Tax-free if owned for 2+ years and main residence',
          investmentProperty: 'Taxable at progressive rates if sold within 2 years'
        }
      },
      
      wealthTax: {
        applicable: true,
        type: 'Net Wealth Tax',
        threshold: '€500,000 per person (€1,000,000 for couples)',
        rate: '0.5% on net assets above threshold',
        assessmentDate: 'January 1 of each year',
        exemptions: [
          'Life insurance policies',
          'Operating business assets'
        ]
      },
      
      inheritanceGiftTax: {
        linealDescendants: {
          exempt: '€250,000 per child from each parent',
          rates: [
            { description: 'First €10,000 (after exemption)', rate: 0 },
            { description: '€10,001 - €20,000', rate: 0.06 },
            { description: '€20,001 - €50,000', rate: 0.12 },
            { description: 'Over €50,000', rate: 0.15 }
          ]
        },
        
        spouse: {
          exempt: 'Fully exempt (€0 tax)',
          rate: 0
        },
        
        siblings: {
          exempt: '€10,000',
          maxRate: '15%'
        }
      }
    },
    
    planningTools: {
      lifeInsurance: {
        available: true,
        type: 'Luxembourg Life Insurance Wrapper',
        taxAdvantages: [
          'No wealth tax on policy value',
          'Tax-free growth during accumulation',
          'Inheritance tax exemption up to €152,500 per beneficiary'
        ],
        providers: [
          'Lombard International',
          'Cardif Lux Vie',
          'Foyer Vie'
        ]
      },
      
      corporateStructures: {
        soparfi: {
          name: 'SOPARFI',
          fullName: 'Société de Participations Financières',
          advantages: [
            'Participation exemption: 0% tax on qualifying dividends',
            'No withholding tax on dividends paid',
            'Access to Luxembourg tax treaty network'
          ],
          costs: {
            setup: '€5,000-€15,000',
            annual: '€8,000-€20,000'
          }
        }
      },
      
      specialRegimes: {
        impatriateRegime: {
          available: true,
          name: 'Impatriate Tax Regime',
          benefits: [
            '50% exemption on remuneration exceeding €75,000',
            'Up to 8 years duration'
          ],
          eligibility: [
            'Not resident in Luxembourg in previous 5 years',
            'Annual remuneration exceeds €75,000'
          ]
        }
      }
    }
  },
  
  CH: {
    countryName: 'Switzerland',
    countryCode: 'CH',
    currency: 'CHF',
    lastUpdated: '2026-02-01',
    note: 'Swiss law varies by canton',
    
    estatePlanning: {
      matrimonialRegime: {
        default: 'Participation in Acquired Property',
        description: 'Assets acquired during marriage are shared equally upon dissolution',
        options: [
          'Gütertrennung (Separation of property)',
          'Gütergemeinschaft (Community of property)'
        ]
      },
      
      forcedHeirship: {
        applicable: true,
        note: 'MAJOR REFORM January 1, 2023',
        protectedHeirs: ['Descendants', 'Spouse/registered partner'],
        reservedPortion: {
          spouse: 0.25,
          descendantsTotal: 0.50
        },
        reform2023: {
          changes: [
            'Parents no longer have reserved portion',
            'Descendants reserved reduced from 75% to 50%',
            'Spouse reserved reduced from 50% to 25%'
          ]
        }
      },
      
      will: {
        types: ['Handwritten', 'Notarial', 'Oral (emergency)'],
        holographic: {
          requirements: 'Entirely handwritten, dated, signed',
          cost: 'CHF 0'
        },
        public: {
          cost: 'CHF 500-2,000'
        }
      },
      
      probate: {
        certificate: 'Erbschein',
        typicalDuration: '2-4 months',
        costs: {
          certificate: 'CHF 200-1,000'
        }
      }
    },
    
    taxation: {
      income: {
        structure: 'Three levels: Federal + Cantonal + Communal',
        federal: {
          maxRate: '11.5% federal'
        },
        cantonal: {
          variation: 'Significant',
          examples: {
            Zug: '~22% total',
            Geneva: '~42% total'
          }
        },
        
        capitalGains: {
          privateMobilier: 'Private capital gains on securities TAX-FREE',
          realEstate: 'Always taxable'
        }
      },
      
      wealthTax: {
        applicable: true,
        type: 'CANTONAL (no federal)',
        examples: {
          Zug: '0.03-0.25% (low)',
          Geneva: '0.05-1.0% (high)',
          Schwyz: '0.01-0.30% (lowest)'
        }
      },
      
      inheritanceGiftTax: {
        federal: 'NO federal tax',
        directDescendants: {
          mostCantons: 'EXEMPT',
          exceptions: ['Appenzell Innerrhoden', 'Neuchâtel', 'Vaud']
        },
        spouse: 'Fully exempt in all cantons',
        cantonalExamples: {
          Schwyz: 'NO inheritance tax for any heirs',
          Obwalden: 'NO inheritance tax'
        }
      }
    },
    
    planningTools: {
      lifeInsurance: {
        available: true,
        pillar3a: {
          name: 'Pillar 3a',
          limits: {
            employed: 'CHF 7,258 (2026)',
            selfEmployed: '20% of income up to CHF 36,288'
          },
          taxAdvantages: [
            'Fully tax-deductible',
            'Tax-free growth',
            'No wealth tax'
          ]
        },
        pillar3b: {
          name: 'Pillar 3b',
          taxAdvantages: [
            'Death benefit tax-free',
            'Creditor protection'
          ]
        }
      },
      
      specialRegimes: {
        lumpSumTaxation: {
          name: 'Lump Sum Taxation',
          status: 'RESTRICTED - Available in some cantons',
          available: ['Bern', 'Valais', 'Ticino', 'Graubünden'],
          abolished: ['Zurich', 'Basel-Stadt', 'Lucerne'],
          eligibility: {
            nationality: 'Must be foreign national',
            activity: 'Cannot work in Switzerland'
          },
          costs: {
            typical: 'CHF 200,000 - CHF 2,000,000 annual'
          }
        }
      }
    }
  },
  
  FR: {
    countryName: 'France',
    countryCode: 'FR',
    currency: 'EUR',
    lastUpdated: '2026-02-01',
    
    estatePlanning: {
      matrimonialRegime: {
        default: 'Communauté réduite aux acquêts',
        defaultEn: 'Limited community of acquired property',
        options: [
          'Séparation de biens',
          'Communauté universelle',
          'Participation aux acquêts'
        ]
      },
      
      forcedHeirship: {
        applicable: true,
        protectedHeirs: ['Descendants', 'Spouse (usufruct rights)'],
        reservedPortion: {
          oneChild: 0.50,
          twoChildren: 0.667,
          threeOrMore: 0.75
        }
      },
      
      will: {
        types: ['Holographic', 'Notarial', 'Mystic'],
        notarial: {
          cost: '€150-€500 typical'
        }
      },
      
      probate: {
        certificate: 'Attestation de propriété',
        typicalDuration: '3-12 months',
        notaryRequired: true
      }
    },
    
    taxation: {
      income: {
        interest: {
          flatTax: '30% Flat Tax (PFU - Prélèvement Forfaitaire Unique)',
          alternative: 'Progressive taxation (can opt out of flat tax)',
          rates: '30% (12.8% income tax + 17.2% social charges)'
        },
        
        dividends: {
          flatTax: '30% Flat Tax',
          alternative: 'Progressive with 40% allowance'
        },
        
        rentalIncome: {
          micro: 'Micro-regime if <€15,000 (30% allowance)',
          real: 'Real regime (actual expenses deductible)'
        }
      },
      
      capitalGains: {
        securities: {
          rate: '30% Flat Tax',
          allowance: 'No allowance for holding period'
        },
        
        realEstate: {
          rate: '19% + 17.2% social charges = 36.2%',
          allowance: 'Taper relief: 6% per year 6-21, 4% year 22',
          exemption: 'Full exemption after 22 years (30 years for social charges)'
        }
      },
      
      wealthTax: {
        applicable: true,
        type: 'IFI - Impôt sur la Fortune Immobilière (Real Estate Wealth Tax)',
        threshold: '€1,300,000',
        rates: [
          { upTo: 800000, rate: 0 },
          { upTo: 1300000, rate: 0.005 },
          { upTo: 2570000, rate: 0.007 },
          { upTo: 5000000, rate: 0.01 },
          { upTo: 10000000, rate: 0.0125 },
          { above: 10000000, rate: 0.015 }
        ],
        scope: 'Only real estate assets (securities exempt)',
        primaryResidence: '30% discount on primary residence value'
      },
      
      inheritanceGiftTax: {
        linealDescendants: {
          exempt: '€100,000 per parent per child',
          rates: [
            { upTo: 8072, rate: 0.05 },
            { upTo: 12109, rate: 0.10 },
            { upTo: 15932, rate: 0.15 },
            { upTo: 552324, rate: 0.20 },
            { upTo: 902838, rate: 0.30 },
            { upTo: 1805677, rate: 0.40 },
            { above: 1805677, rate: 0.45 }
          ],
          maxRate: '45%'
        },
        
        spouse: {
          exempt: 'Fully exempt'
        },
        
        siblings: {
          exempt: '€15,932',
          rates: '35% up to €24,430, then 45%'
        },
        
        unrelated: {
          rate: '60%',
          exempt: '€1,594'
        },
        
        gifts: {
          renewal: '€100,000 exemption renewable every 15 years',
          strategy: 'Strategic gifting every 15 years reduces estate tax'
        }
      }
    },
    
    planningTools: {
      lifeInsurance: {
        available: true,
        type: 'Assurance-vie',
        taxAdvantages: [
          'Inheritance tax: €152,500 per beneficiary exempt (contracts before age 70)',
          'After 8 years: withdrawals subject to favorable tax (7.5% on gains after €4,600/€9,200 allowance)',
          'Not subject to IFI wealth tax',
          'Not subject to forced heirship rules'
        ],
        
        inheritanceTaxTreatment: {
          contractsBeforeAge70: {
            exempt: '€152,500 per beneficiary',
            aboveExemption: '20% up to €700,000, then 31.25%'
          },
          contractsAfterAge70: {
            exempt: '€30,500 total (all beneficiaries)',
            aboveExemption: 'Standard inheritance tax rates apply'
          }
        },
        
        strategy: 'Open before age 70 to maximize tax benefits',
        
        providers: [
          'AXA France',
          'CNP Assurances',
          'Generali France'
        ]
      },
      
      corporateStructures: {
        holdingSCIConvention: {
          name: 'Holding Company with IS Convention',
          description: 'Corporate tax regime for investment holding',
          advantages: [
            'Dividends received: 95% exempt (parent-subsidiary regime)',
            'Capital gains: Long-term regime (reduced rate)',
            'Group taxation possible'
          ],
          taxation: {
            corporateTax: '25% standard rate',
            reducedRate: '15% on first €42,500 (SME)',
            longTermGains: '15% + 12% on capital gains on participations'
          }
        },
        
        sci: {
          name: 'SCI - Société Civile Immobilière',
          description: 'Real estate holding company',
          advantages: [
            'Facilitate ownership transfer (gift/sell shares vs property)',
            'Estate planning flexibility',
            'Potential IFI reduction through debt'
          ],
          taxation: 'Transparent - income taxed at shareholder level'
        }
      },
      
      specialRegimes: {
        none: {
          note: 'France has no special tax regimes like NHR or lump sum taxation',
          historical: 'Wealth tax shield (bouclier fiscal) abolished 2013',
          current: 'Standard progressive taxation applies to all residents'
        }
      }
    }
  },
  
  UK: {
    countryName: 'United Kingdom',
    countryCode: 'UK',
    currency: 'GBP',
    lastUpdated: '2026-02-01',
    note: 'Non-dom regime abolished April 2025 - replaced with new residency-based system',
    
    estatePlanning: {
      matrimonialRegime: {
        applicable: false,
        note: 'England & Wales have no community property regime',
        system: 'Separate property system',
        divorce: 'Fair division determined by courts on divorce (not automatic 50/50)'
      },
      
      forcedHeirship: {
        applicable: false,
        freedom: 'Complete testamentary freedom',
        exception: 'Family can claim under Inheritance Act 1975 if inadequate provision',
        note: 'One of few jurisdictions with no forced heirship - very attractive for estate planning'
      },
      
      will: {
        types: ['Will (witnessed)', 'Mutual will', 'Codicil (amendment)'],
        
        standard: {
          requirements: 'In writing, signed by testator, witnessed by 2 independent witnesses',
          witnesses: 'Cannot be beneficiaries or their spouses',
          cost: '£150-£500 for standard will',
          complex: '£1,000-£5,000 for complex estates'
        },
        
        executors: {
          appointment: 'Named in will',
          powers: 'Broad powers to administer estate',
          professional: 'Solicitors typically charge 2-5% of estate value'
        },
        
        storage: 'Should be stored safely (solicitor, bank, probate registry)'
      },
      
      probate: {
        certificate: 'Grant of Probate (or Grant of Letters of Administration if no will)',
        process: 'Apply to Probate Registry',
        typicalDuration: '3-9 months for simple estates, 12-24 months for complex',
        
        requirements: [
          'Death certificate',
          'Original will',
          'IHT forms (even if no tax due)',
          'Asset and liability valuations'
        ],
        
        threshold: '£5,000 - probate not needed if estate value below',
        
        costs: {
          application: '£273 (single application) or £155 (via solicitor)',
          copies: '£1.50 per copy of grant',
          solicitor: '2-5% of estate value if using solicitor'
        }
      }
    },
    
    taxation: {
      income: {
        personalAllowance: '£12,570 (2025/26)',
        
        interest: {
          allowance: '£1,000 (basic rate), £500 (higher rate), £0 (additional rate)',
          rates: '20%/40%/45% (marginal rate)',
          startingRate: '0% on first £5,000 if income <£17,570'
        },
        
        dividends: {
          allowance: '£500 (2025/26)',
          rates: [
            { band: 'Basic rate', rate: 0.0875 },
            { band: 'Higher rate', rate: 0.3375 },
            { band: 'Additional rate', rate: 0.3935 }
          ]
        },
        
        rentalIncome: {
          allowance: '£1,000 property allowance',
          deductions: [
            'Mortgage interest relief (restricted to 20% tax credit)',
            'Repairs and maintenance',
            'Insurance',
            'Management fees'
          ]
        },
        
        pension: {
          statePension: 'Taxable',
          privatePension: 'Taxable',
          pensionCredit: 'Tax-free'
        }
      },
      
      capitalGains: {
        annualExemption: '£3,000 (2025/26) - reduced from £12,300',
        
        rates: {
          general: [
            { band: 'Basic rate', rate: 0.10 },
            { band: 'Higher/Additional rate', rate: 0.20 }
          ],
          residential: [
            { band: 'Basic rate', rate: 0.18 },
            { band: 'Higher/Additional rate', rate: 0.24 }
          ]
        },
        
        reliefs: {
          primaryResidence: 'Private Residence Relief - full exemption',
          entrepreneurs: 'Business Asset Disposal Relief - 10% on first £1M lifetime',
          investors: 'Investors\' Relief - 10% on first £10M lifetime'
        }
      },
      
      wealthTax: {
        applicable: false,
        note: 'UK has no wealth tax or net worth tax'
      },
      
      inheritanceGiftTax: {
        type: 'Inheritance Tax (IHT)',
        
        nilRateBand: {
          individual: '£325,000',
          spouse: 'Unlimited spouse exemption + transferable nil rate band',
          combined: '£650,000 for married couples'
        },
        
        residenceNilRateBand: {
          amount: '£175,000 (2025/26)',
          conditions: 'Primary residence left to direct descendants',
          tapered: 'Reduced by £1 for every £2 over £2M estate',
          combined: 'Up to £500,000 per person (£1M couple) if all conditions met'
        },
        
        rates: {
          aboveThreshold: '40%',
          charitableReduction: '36% if 10%+ left to charity'
        },
        
        gifts: {
          sevenYearRule: 'Gifts tax-free if survive 7 years',
          taperRelief: [
            { years: '0-3', rate: 0.40 },
            { years: '3-4', rate: 0.32 },
            { years: '4-5', rate: 0.24 },
            { years: '5-6', rate: 0.16 },
            { years: '6-7', rate: 0.08 },
            { years: '7+', rate: 0 }
          ],
          
          exemptions: {
            annual: '£3,000 per year',
            smallGifts: '£250 per person (unlimited recipients)',
            wedding: '£5,000 (child), £2,500 (grandchild), £1,000 (other)',
            normalExpenditure: 'Regular gifts from income (must not reduce standard of living)'
          }
        },
        
        businessRelief: {
          business: '100% relief on trading business',
          agricultural: '100% on agricultural property (with conditions)',
          aim: '100% relief on AIM shares after 2 years'
        }
      }
    },
    
    planningTools: {
      trusts: {
        available: true,
        types: [
          'Bare Trust',
          'Interest in Possession Trust',
          'Discretionary Trust',
          'Accumulation & Maintenance Trust'
        ],
        
        taxation: {
          entry: 'Potentially IHT at 20% if exceeds nil rate band',
          periodic: '6% charge every 10 years on value above nil rate band',
          exit: 'Up to 6% on assets leaving trust',
          income: 'Trust taxed at 45% (dividends 39.35%)',
          gains: '20% CGT (24% for residential property)'
        },
        
        advantages: [
          'Asset protection',
          'Succession planning',
          'Control from grave',
          'Creditor protection',
          'Vulnerable beneficiary protection'
        ],
        
        useCase: 'Very common for estate planning, property protection, special needs'
      },
      
      lifeInsurance: {
        available: true,
        
        lifeInsuranceTrust: {
          description: 'Life insurance policy held in trust',
          advantages: [
            'Proceeds outside estate for IHT',
            'Immediate payout (no probate delay)',
            'Creditor protection',
            'Control over beneficiaries'
          ],
          cost: 'Minimal - often free from insurers',
          strategy: 'Write whole of life policy in trust to cover IHT liability'
        },
        
        taxation: {
          proceeds: 'Tax-free if held in trust',
          premiums: 'Not tax-deductible (except for business policies)',
          gains: 'May be taxable if investment element and not qualifying policy'
        }
      },
      
      pensions: {
        sipp: {
          name: 'SIPP - Self-Invested Personal Pension',
          taxAdvantages: [
            'Contributions: tax relief at marginal rate (20/40/45%)',
            'Growth: tax-free within pension',
            'Withdrawals: 25% tax-free lump sum, rest taxed as income',
            'IHT: outside estate if die before age 75'
          ],
          limits: {
            annualAllowance: '£60,000 (2025/26)',
            lifetimeAllowance: 'Abolished April 2024',
            carryForward: '3 years of unused allowance'
          }
        },
        
        inheritance: {
          deathBelow75: 'Pension passes tax-free to beneficiaries',
          deathAbove75: 'Beneficiaries pay income tax on withdrawals',
          noIHT: 'Pension outside estate for IHT purposes'
        },
        
        strategy: 'Max pension contributions for income tax relief and IHT planning'
      },
      
      specialRegimes: {
        fourYearRegime: {
          name: '4-Year Regime (Formerly Non-Dom, now "Arrivers")',
          status: 'NEW regime from April 2025',
          
          description: 'Individuals arriving in UK get 4 years of favorable treatment',
          
          eligibility: [
            'Not UK tax resident in any of previous 10 years',
            'Become UK tax resident',
            'Claim the regime'
          ],
          
          benefits: {
            years1to4: [
              'Foreign income and gains: tax-free if kept offshore',
              'Remittance basis available',
              'No tax on foreign income/gains not brought to UK'
            ],
            rebasing: 'Can rebase foreign assets to market value on arrival for CGT'
          },
          
          after4Years: 'Normal UK worldwide taxation applies',
          
          transitional: {
            existingNonDoms: 'Special transitional rules for those non-dom before April 2025',
            temporaryRepatriation: '12% tax on foreign income remitted in 2025/26-2026/27 (vs 45%)'
          },
          
          inheritance: {
            domicile: 'Long-term UK residents become deemed domiciled after 10 years',
            iht: 'IHT applies to worldwide assets after 10 years UK residence'
          },
          
          note: 'Major change from previous non-dom regime - less generous, time-limited'
        },
        
        remittanceBasis: {
          description: 'Pay tax only on UK income + foreign income brought to UK',
          availability: 'Available during 4-year regime only',
          charge: 'No charge during 4-year regime (£30k-£60k before reform)',
          loseAllowances: 'Lose personal allowance and CGT exemption if claim'
        }
      }
    }
  },
  
  PT: {
    countryName: 'Portugal',
    countryCode: 'PT',
    currency: 'EUR',
    lastUpdated: '2026-02-01',
    note: 'NHR regime closed to new applicants; new incentive regime from 2024',
    
    estatePlanning: {
      matrimonialRegime: {
        default: 'Comunhão de adquiridos',
        defaultEn: 'Community of acquired property',
        description: 'Assets acquired during marriage are shared',
        options: [
          'Separação de bens (Separation of property)',
          'Comunhão geral (General community)'
        ],
        changeRequires: 'Prenuptial agreement'
      },
      
      forcedHeirship: {
        applicable: true,
        protectedHeirs: ['Spouse', 'Descendants', 'Ascendants (if no descendants)'],
        
        reservedPortion: {
          spouseAndDescendants: {
            spouse: '25% usufruct if descendants exist',
            descendants: '50% (2/3 if no spouse)'
          },
          noDescendants: {
            spouse: '50%',
            ascendants: '33.33% if spouse, 50% if no spouse'
          }
        },
        
        disposablePortion: {
          withSpouseAndChildren: 0.50,
          note: 'Relatively flexible compared to France'
        }
      },
      
      will: {
        types: ['Public (notarial)', 'Closed', 'Holographic'],
        public: {
          cost: '€100-€300',
          advantages: 'Legally certain, registered'
        },
        holographic: {
          requirements: 'Handwritten, dated, signed',
          cost: '€0'
        }
      },
      
      probate: {
        certificate: 'Habilitação de Herdeiros',
        typicalDuration: '2-6 months',
        notaryRequired: true,
        costs: '€150-€500 for simple estates'
      }
    },
    
    taxation: {
      income: {
        rates: 'Progressive 14.5% to 48%',
        brackets: [
          { upTo: 7703, rate: 0.145 },
          { upTo: 11623, rate: 0.21 },
          { upTo: 16472, rate: 0.265 },
          { upTo: 21321, rate: 0.285 },
          { upTo: 27146, rate: 0.35 },
          { upTo: 39791, rate: 0.37 },
          { upTo: 51997, rate: 0.435 },
          { upTo: 81199, rate: 0.45 },
          { above: 81199, rate: 0.48 }
        ],
        
        surcharge: {
          above80000: '2.5% on income €80,000-€250,000',
          above250000: '5% on income above €250,000'
        },
        
        interest: {
          rate: '28% flat rate withholding (final)',
          alternative: 'Can opt for progressive taxation'
        },
        
        dividends: {
          rate: '28% flat rate withholding (final)',
          alternative: '50% exempt if opt for progressive taxation'
        },
        
        rentalIncome: {
          rates: '28% flat rate or progressive',
          allowance: '50% or actual expenses if progressive'
        }
      },
      
      capitalGains: {
        securities: {
          rate: '28% flat rate',
          exemption: 'No CGT if total gains <€500 per year',
          participation: 'Exemption for qualifying shareholdings (>10%, >1 year)'
        },
        
        realEstate: {
          rate: '28% (or 50% of gain at progressive rates)',
          holdingPeriod: 'No taper relief',
          primaryResidence: 'Exempt if proceeds reinvested in primary residence within 3 years',
          age65: 'Exempt if seller >65 and owned >2 years'
        }
      },
      
      wealthTax: {
        applicable: false,
        additionalTax: 'AIMI - Additional tax on real estate (IRS surcharge)',
        threshold: '€600,000 (individuals), €1,200,000 (couples)',
        rates: [
          { upTo: 1000000, rate: 0.007 },
          { upTo: 2000000, rate: 0.010 },
          { above: 2000000, rate: 0.015 }
        ],
        scope: 'Only real estate in Portugal'
      },
      
      inheritanceGiftTax: {
        directLine: {
          exempt: 'Fully exempt (spouse, descendants, ascendants)',
          stampDuty: '€0.8% stamp duty applies'
        },
        
        other: {
          rate: '10% stamp duty',
          relationships: 'Siblings, other relatives, non-relatives'
        },
        
        gifts: {
          treatment: 'Same as inheritance',
          strategy: 'Very favorable - no tax between family members'
        }
      }
    },
    
    planningTools: {
      lifeInsurance: {
        available: true,
        taxAdvantages: [
          'Proceeds generally tax-free',
          'Not subject to AIMI',
          'Estate planning flexibility'
        ]
      },
      
      specialRegimes: {
        nhrRegime: {
          name: 'NHR - Non-Habitual Resident (CLOSED)',
          status: 'CLOSED to new applicants since January 1, 2024',
          
          historical: {
            duration: '10 years',
            benefits: [
              'Foreign pension income: 10% flat rate (vs 48% progressive)',
              'Foreign employment income: 10% or exempt',
              'Foreign investment income: exempt if taxed abroad',
              'Passive income: exempt if could be taxed in source country'
            ]
          },
          
          existing: 'Those registered before 2024 can continue full 10 years',
          
          replacement: 'See new incentive regime below'
        },
        
        newIncentiveRegime: {
          name: 'New Incentive Regime (from 2024)',
          status: 'AVAILABLE',
          
          eligibility: [
            'Become Portuguese tax resident',
            'Not resident in Portugal in previous 5 years',
            'Have scientific, artistic or professional qualifications'
          ],
          
          benefits: {
            duration: '10 years',
            
            employmentIncome: {
              qualifying: 'Employment income from Portugal: 20% flat rate',
              nonQualifying: 'Other income: standard progressive rates',
              highValue: 'Activities with high added value',
              scientific: 'Scientific, artistic, technical jobs'
            },
            
            foreignIncome: {
              employment: 'Foreign employment: exempt if taxed abroad',
              pension: 'Foreign pension: exempt if taxed abroad (no 10% option)',
              investment: 'Foreign investment income: taxed at standard rates'
            },
            
            comparison: 'LESS generous than NHR but still attractive'
          },
          
          conditions: {
            qualifications: 'Must demonstrate high-value skills',
            portugalWork: 'Focused on working in Portugal, not pure retirees',
            note: 'Aimed at attracting skilled workers, not passive income recipients'
          }
        },
        
        goldenVisa: {
          name: 'Golden Visa (Residency by Investment)',
          status: 'MODIFIED - Real estate routes closed',
          
          availableRoutes: [
            'Capital transfer: €500,000 investment fund',
            'Capital transfer: €500,000 research activities',
            'Capital transfer: €250,000 arts/culture',
            'Business: 10 jobs creation',
            'Business: €500,000 in Portuguese company'
          ],
          
          closed: [
            'Real estate acquisition (closed 2023)',
            'Former property routes no longer available'
          ],
          
          benefits: [
            'Residence permit',
            'Schengen area travel',
            'Path to citizenship after 5 years',
            'Minimal stay: 7 days per year'
          ],
          
          taxation: 'Can combine with new incentive regime if qualify'
        },
        
        madeira: {
          name: 'Madeira Free Trade Zone',
          description: 'Special corporate tax regime in Madeira',
          
          benefits: {
            corporateTax: '5% corporate tax rate (vs 21% mainland)',
            duration: 'Available until 2027 (may be extended)',
            requirements: 'Must create jobs, have substance in Madeira'
          },
          
          idealFor: 'International companies, service companies, IP holding'
        },
        
        crypto: {
          treatment: 'Very favorable for individuals',
          capitalGains: 'Individual crypto gains: generally tax-free if not professional',
          business: 'Professional trading: taxed as business income',
          note: 'One of most crypto-friendly EU countries'
        }
      }
    }
  }
};

// Helper function to get country data
export const getCountryData = (countryCode) => {
  return countryLegalTaxData[countryCode] || null;
};

// Helper function to get all available countries
export const getAvailableCountries = () => {
  return Object.keys(countryLegalTaxData).map(code => ({
    code,
    name: countryLegalTaxData[code].countryName,
    currency: countryLegalTaxData[code].currency
  }));
};

export default countryLegalTaxData;
