// Strategic Asset Allocation (SAA) Data
// Based on UBS Wealth Way Portfolio-Based Approach
// Last Updated: February 2026

export const riskProfiles = {
  A: {
    name: 'Very Conservative',
    nameDE: 'Sehr konservativ',
    nameFR: 'Très conservateur',
    description: 'Prioritizes capital preservation with minimal volatility. Suitable for near-term liquidity needs.',
    descriptionDE: 'Priorisiert Kapitalerhalt mit minimaler Volatilität. Geeignet für kurzfristige Liquiditätsbedürfnisse.',
    descriptionFR: 'Privilégie la préservation du capital avec une volatilité minimale. Adapté aux besoins de liquidité à court terme.',
    color: '#10b981',
    expectedReturn: 2.5,
    expectedVolatility: 3.0,
    timehorizon: '0-2 years',
    suitableFor: [
      'Liquidity bucket management',
      'Emergency funds',
      'Near-term expenses (within 2 years)',
      'Retirees needing stable income'
    ]
  },
  
  B: {
    name: 'Conservative',
    nameDE: 'Konservativ',
    nameFR: 'Conservateur',
    description: 'Seeks steady income with limited growth. Low volatility with emphasis on bonds and stable assets.',
    descriptionDE: 'Strebt nach stetigem Einkommen mit begrenztem Wachstum. Geringe Volatilität mit Schwerpunkt auf Anleihen.',
    descriptionFR: 'Recherche un revenu stable avec une croissance limitée. Faible volatilité avec accent sur les obligations.',
    color: '#3b82f6',
    expectedReturn: 3.5,
    expectedVolatility: 5.0,
    timehorizon: '2-5 years',
    suitableFor: [
      'Later years of liquidity bucket',
      'Conservative retirees',
      'Preservation with modest growth',
      'Risk-averse investors'
    ]
  },
  
  C: {
    name: 'Moderate Conservative',
    nameDE: 'Moderat konservativ',
    nameFR: 'Modérément conservateur',
    description: 'Balanced approach favoring stability over growth. Suitable for medium-term goals with measured risk.',
    descriptionDE: 'Ausgewogener Ansatz mit Fokus auf Stabilität statt Wachstum. Geeignet für mittelfristige Ziele.',
    descriptionFR: 'Approche équilibrée favorisant la stabilité à la croissance. Adapté aux objectifs à moyen terme.',
    color: '#6366f1',
    expectedReturn: 4.5,
    expectedVolatility: 7.5,
    timehorizon: '5-10 years',
    suitableFor: [
      'Early longevity bucket years',
      'Moderate risk tolerance',
      'Approaching retirement (5-10 years)',
      'Balanced income and growth needs'
    ]
  },
  
  D: {
    name: 'Moderate',
    nameDE: 'Moderat',
    nameFR: 'Modéré',
    description: 'Equal balance between growth and stability. Diversified across asset classes for long-term wealth building.',
    descriptionDE: 'Gleichgewicht zwischen Wachstum und Stabilität. Diversifiziert über Anlageklassen für langfristigen Vermögensaufbau.',
    descriptionFR: 'Équilibre entre croissance et stabilité. Diversifié entre classes d\'actifs pour la construction de patrimoine.',
    color: '#8b5cf6',
    expectedReturn: 5.5,
    expectedVolatility: 10.0,
    timehorizon: '10-15 years',
    suitableFor: [
      'Mid-career wealth accumulation',
      'Longevity bucket core holdings',
      'Balanced retirement portfolio',
      'Long-term investors (10+ years)'
    ]
  },
  
  E: {
    name: 'Moderate Aggressive',
    nameDE: 'Moderat aggressiv',
    nameFR: 'Modérément agressif',
    description: 'Growth-oriented with tolerance for volatility. Higher equity allocation for wealth appreciation.',
    descriptionDE: 'Wachstumsorientiert mit Toleranz für Volatilität. Höhere Aktienallokation für Vermögenszuwachs.',
    descriptionFR: 'Orienté croissance avec tolérance à la volatilité. Allocation actions élevée pour appréciation du capital.',
    color: '#ec4899',
    expectedReturn: 6.5,
    expectedVolatility: 13.0,
    timehorizon: '15-20 years',
    suitableFor: [
      'Early to mid-career accumulators',
      'Legacy bucket foundation',
      'Long time horizon (15+ years)',
      'Comfortable with market volatility'
    ]
  },
  
  F: {
    name: 'Aggressive',
    nameDE: 'Aggressiv',
    nameFR: 'Agressif',
    description: 'Maximum growth potential with highest volatility. Equity-focused for long-term wealth maximization.',
    descriptionDE: 'Maximales Wachstumspotenzial mit höchster Volatilität. Aktienfokussiert für langfristige Vermögensmaximierung.',
    descriptionFR: 'Potentiel de croissance maximal avec volatilité élevée. Focus actions pour maximisation du patrimoine.',
    color: '#ef4444',
    expectedReturn: 7.5,
    expectedVolatility: 16.0,
    timehorizon: '20+ years',
    suitableFor: [
      'Young professionals (20+ years to retirement)',
      'Legacy bucket growth',
      'Multi-generational wealth building',
      'High risk tolerance with long horizon'
    ]
  }
};

// Strategic Asset Allocations by Risk Profile and Investor Type
export const strategicAssetAllocations = {
  // TAXABLE INVESTOR ALLOCATIONS
  taxable: {
    A: {
      cash: 60,
      bonds: 35,
      stocks: 5,
      alternatives: 0,
      breakdown: {
        cash: {
          moneyMarket: 40,
          shortTermBonds: 20
        },
        bonds: {
          investmentGrade: 30,
          treasuries: 5
        },
        stocks: {
          largeCapEquity: 3,
          internationalEquity: 2
        },
        alternatives: {}
      }
    },
    
    B: {
      cash: 30,
      bonds: 55,
      stocks: 15,
      alternatives: 0,
      breakdown: {
        cash: {
          moneyMarket: 20,
          shortTermBonds: 10
        },
        bonds: {
          investmentGrade: 35,
          treasuries: 10,
          municipalBonds: 10
        },
        stocks: {
          largeCapEquity: 9,
          internationalEquity: 4,
          dividendStocks: 2
        },
        alternatives: {}
      }
    },
    
    C: {
      cash: 10,
      bonds: 50,
      stocks: 35,
      alternatives: 5,
      breakdown: {
        cash: {
          moneyMarket: 10
        },
        bonds: {
          investmentGrade: 25,
          treasuries: 10,
          municipalBonds: 10,
          corporateBonds: 5
        },
        stocks: {
          largeCapEquity: 18,
          midCapEquity: 5,
          internationalEquity: 8,
          dividendStocks: 4
        },
        alternatives: {
          realEstate: 3,
          commodities: 2
        }
      }
    },
    
    D: {
      cash: 5,
      bonds: 35,
      stocks: 50,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 5
        },
        bonds: {
          investmentGrade: 15,
          treasuries: 5,
          municipalBonds: 8,
          corporateBonds: 5,
          internationalBonds: 2
        },
        stocks: {
          largeCapEquity: 25,
          midCapEquity: 8,
          smallCapEquity: 3,
          internationalEquity: 10,
          emergingMarkets: 4
        },
        alternatives: {
          realEstate: 5,
          commodities: 3,
          privateEquity: 2
        }
      }
    },
    
    E: {
      cash: 3,
      bonds: 22,
      stocks: 65,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 3
        },
        bonds: {
          investmentGrade: 10,
          corporateBonds: 5,
          highYield: 3,
          internationalBonds: 4
        },
        stocks: {
          largeCapEquity: 30,
          midCapEquity: 12,
          smallCapEquity: 5,
          internationalEquity: 12,
          emergingMarkets: 6
        },
        alternatives: {
          realEstate: 4,
          commodities: 2,
          privateEquity: 3,
          hedgeFunds: 1
        }
      }
    },
    
    F: {
      cash: 2,
      bonds: 13,
      stocks: 75,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 2
        },
        bonds: {
          investmentGrade: 5,
          highYield: 4,
          internationalBonds: 4
        },
        stocks: {
          largeCapEquity: 35,
          midCapEquity: 15,
          smallCapEquity: 7,
          internationalEquity: 12,
          emergingMarkets: 6
        },
        alternatives: {
          realEstate: 3,
          commodities: 2,
          privateEquity: 4,
          hedgeFunds: 1
        }
      }
    }
  },
  
  // TAX-DEFERRED INVESTOR ALLOCATIONS (IRA, 401k, etc.)
  taxDeferred: {
    A: {
      cash: 55,
      bonds: 40,
      stocks: 5,
      alternatives: 0,
      breakdown: {
        cash: {
          moneyMarket: 35,
          shortTermBonds: 20
        },
        bonds: {
          investmentGrade: 25,
          treasuries: 10,
          corporateBonds: 5
        },
        stocks: {
          largeCapEquity: 3,
          internationalEquity: 2
        },
        alternatives: {}
      }
    },
    
    B: {
      cash: 25,
      bonds: 60,
      stocks: 15,
      alternatives: 0,
      breakdown: {
        cash: {
          moneyMarket: 15,
          shortTermBonds: 10
        },
        bonds: {
          investmentGrade: 35,
          treasuries: 10,
          corporateBonds: 10,
          internationalBonds: 5
        },
        stocks: {
          largeCapEquity: 9,
          internationalEquity: 4,
          dividendStocks: 2
        },
        alternatives: {}
      }
    },
    
    C: {
      cash: 8,
      bonds: 52,
      stocks: 35,
      alternatives: 5,
      breakdown: {
        cash: {
          moneyMarket: 8
        },
        bonds: {
          investmentGrade: 30,
          treasuries: 8,
          corporateBonds: 8,
          highYield: 4,
          internationalBonds: 2
        },
        stocks: {
          largeCapEquity: 18,
          midCapEquity: 5,
          internationalEquity: 8,
          dividendStocks: 4
        },
        alternatives: {
          realEstate: 3,
          commodities: 2
        }
      }
    },
    
    D: {
      cash: 5,
      bonds: 35,
      stocks: 50,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 5
        },
        bonds: {
          investmentGrade: 15,
          treasuries: 5,
          corporateBonds: 7,
          highYield: 5,
          internationalBonds: 3
        },
        stocks: {
          largeCapEquity: 25,
          midCapEquity: 8,
          smallCapEquity: 3,
          internationalEquity: 10,
          emergingMarkets: 4
        },
        alternatives: {
          realEstate: 5,
          commodities: 3,
          privateEquity: 2
        }
      }
    },
    
    E: {
      cash: 3,
      bonds: 22,
      stocks: 65,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 3
        },
        bonds: {
          investmentGrade: 8,
          corporateBonds: 5,
          highYield: 6,
          internationalBonds: 3
        },
        stocks: {
          largeCapEquity: 30,
          midCapEquity: 12,
          smallCapEquity: 5,
          internationalEquity: 12,
          emergingMarkets: 6
        },
        alternatives: {
          realEstate: 4,
          commodities: 2,
          privateEquity: 3,
          hedgeFunds: 1
        }
      }
    },
    
    F: {
      cash: 2,
      bonds: 13,
      stocks: 75,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 2
        },
        bonds: {
          investmentGrade: 4,
          highYield: 6,
          internationalBonds: 3
        },
        stocks: {
          largeCapEquity: 35,
          midCapEquity: 15,
          smallCapEquity: 7,
          internationalEquity: 12,
          emergingMarkets: 6
        },
        alternatives: {
          realEstate: 3,
          commodities: 2,
          privateEquity: 4,
          hedgeFunds: 1
        }
      }
    }
  },
  
  // YIELD-FOCUSED ALLOCATIONS
  yieldFocused: {
    A: {
      cash: 50,
      bonds: 45,
      stocks: 5,
      alternatives: 0,
      breakdown: {
        cash: {
          moneyMarket: 30,
          highYieldSavings: 20
        },
        bonds: {
          investmentGrade: 20,
          treasuries: 10,
          corporateBonds: 10,
          municipalBonds: 5
        },
        stocks: {
          dividendStocks: 3,
          preferredStocks: 2
        },
        alternatives: {}
      }
    },
    
    B: {
      cash: 20,
      bonds: 60,
      stocks: 20,
      alternatives: 0,
      breakdown: {
        cash: {
          moneyMarket: 15,
          highYieldSavings: 5
        },
        bonds: {
          investmentGrade: 25,
          corporateBonds: 15,
          municipalBonds: 10,
          highYield: 5,
          internationalBonds: 5
        },
        stocks: {
          dividendStocks: 12,
          preferredStocks: 5,
          reits: 3
        },
        alternatives: {}
      }
    },
    
    C: {
      cash: 10,
      bonds: 50,
      stocks: 35,
      alternatives: 5,
      breakdown: {
        cash: {
          moneyMarket: 10
        },
        bonds: {
          investmentGrade: 20,
          corporateBonds: 15,
          municipalBonds: 8,
          highYield: 5,
          internationalBonds: 2
        },
        stocks: {
          dividendStocks: 20,
          preferredStocks: 8,
          reits: 5,
          utilities: 2
        },
        alternatives: {
          realEstate: 3,
          mlps: 2
        }
      }
    },
    
    D: {
      cash: 5,
      bonds: 40,
      stocks: 50,
      alternatives: 5,
      breakdown: {
        cash: {
          moneyMarket: 5
        },
        bonds: {
          investmentGrade: 15,
          corporateBonds: 12,
          municipalBonds: 5,
          highYield: 6,
          internationalBonds: 2
        },
        stocks: {
          dividendStocks: 28,
          preferredStocks: 10,
          reits: 8,
          utilities: 4
        },
        alternatives: {
          realEstate: 3,
          mlps: 2
        }
      }
    },
    
    E: {
      cash: 3,
      bonds: 27,
      stocks: 65,
      alternatives: 5,
      breakdown: {
        cash: {
          moneyMarket: 3
        },
        bonds: {
          investmentGrade: 10,
          corporateBonds: 8,
          highYield: 7,
          internationalBonds: 2
        },
        stocks: {
          dividendStocks: 35,
          preferredStocks: 12,
          reits: 12,
          utilities: 6
        },
        alternatives: {
          realEstate: 3,
          mlps: 2
        }
      }
    },
    
    F: {
      cash: 2,
      bonds: 18,
      stocks: 75,
      alternatives: 5,
      breakdown: {
        cash: {
          moneyMarket: 2
        },
        bonds: {
          corporateBonds: 8,
          highYield: 8,
          internationalBonds: 2
        },
        stocks: {
          dividendStocks: 40,
          preferredStocks: 15,
          reits: 15,
          utilities: 5
        },
        alternatives: {
          realEstate: 3,
          mlps: 2
        }
      }
    }
  },
  
  // SUSTAINABLE/ESG-FOCUSED ALLOCATIONS
  sustainable: {
    A: {
      cash: 60,
      bonds: 35,
      stocks: 5,
      alternatives: 0,
      breakdown: {
        cash: {
          moneyMarket: 40,
          greenBonds: 20
        },
        bonds: {
          esgBonds: 25,
          greenBonds: 10
        },
        stocks: {
          esgEquity: 5
        },
        alternatives: {}
      }
    },
    
    B: {
      cash: 30,
      bonds: 55,
      stocks: 15,
      alternatives: 0,
      breakdown: {
        cash: {
          moneyMarket: 20,
          greenBonds: 10
        },
        bonds: {
          esgBonds: 35,
          greenBonds: 15,
          socialBonds: 5
        },
        stocks: {
          esgEquity: 12,
          cleanEnergy: 3
        },
        alternatives: {}
      }
    },
    
    C: {
      cash: 10,
      bonds: 50,
      stocks: 35,
      alternatives: 5,
      breakdown: {
        cash: {
          moneyMarket: 10
        },
        bonds: {
          esgBonds: 30,
          greenBonds: 15,
          socialBonds: 5
        },
        stocks: {
          esgEquity: 22,
          cleanEnergy: 8,
          sustainableTech: 5
        },
        alternatives: {
          renewableEnergy: 3,
          sustainableRealEstate: 2
        }
      }
    },
    
    D: {
      cash: 5,
      bonds: 35,
      stocks: 50,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 5
        },
        bonds: {
          esgBonds: 20,
          greenBonds: 10,
          socialBonds: 5
        },
        stocks: {
          esgEquity: 30,
          cleanEnergy: 10,
          sustainableTech: 7,
          waterResources: 3
        },
        alternatives: {
          renewableEnergy: 5,
          sustainableRealEstate: 3,
          impactInvesting: 2
        }
      }
    },
    
    E: {
      cash: 3,
      bonds: 22,
      stocks: 65,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 3
        },
        bonds: {
          esgBonds: 12,
          greenBonds: 7,
          socialBonds: 3
        },
        stocks: {
          esgEquity: 35,
          cleanEnergy: 15,
          sustainableTech: 10,
          waterResources: 5
        },
        alternatives: {
          renewableEnergy: 5,
          sustainableRealEstate: 3,
          impactInvesting: 2
        }
      }
    },
    
    F: {
      cash: 2,
      bonds: 13,
      stocks: 75,
      alternatives: 10,
      breakdown: {
        cash: {
          moneyMarket: 2
        },
        bonds: {
          esgBonds: 8,
          greenBonds: 5
        },
        stocks: {
          esgEquity: 40,
          cleanEnergy: 18,
          sustainableTech: 12,
          waterResources: 5
        },
        alternatives: {
          renewableEnergy: 5,
          sustainableRealEstate: 3,
          impactInvesting: 2
        }
      }
    }
  }
};

// Helper function to get allocation for specific profile and investor type
export const getAllocation = (riskProfile, investorType = 'taxable') => {
  return strategicAssetAllocations[investorType]?.[riskProfile] || strategicAssetAllocations.taxable[riskProfile];
};

// Helper function to get risk profile details
export const getRiskProfile = (profile) => {
  return riskProfiles[profile];
};

// Helper function to calculate expected portfolio return based on allocation
export const calculateExpectedReturn = (allocation, riskProfile) => {
  const profile = riskProfiles[riskProfile];
  return profile.expectedReturn;
};

// Asset class expected returns (historical averages, for reference)
export const assetClassReturns = {
  cash: 2.5,
  moneyMarket: 2.5,
  shortTermBonds: 2.8,
  investmentGrade: 3.5,
  treasuries: 3.0,
  corporateBonds: 4.0,
  municipalBonds: 3.2,
  highYield: 5.5,
  internationalBonds: 3.8,
  largeCapEquity: 8.0,
  midCapEquity: 9.0,
  smallCapEquity: 10.0,
  internationalEquity: 7.5,
  emergingMarkets: 9.5,
  dividendStocks: 7.0,
  preferredStocks: 5.5,
  reits: 8.5,
  realEstate: 7.0,
  commodities: 5.0,
  privateEquity: 12.0,
  hedgeFunds: 6.0,
  renewableEnergy: 8.0,
  cleanEnergy: 9.0,
  sustainableTech: 10.0
};

export default {
  riskProfiles,
  strategicAssetAllocations,
  getAllocation,
  getRiskProfile,
  calculateExpectedReturn,
  assetClassReturns
};
