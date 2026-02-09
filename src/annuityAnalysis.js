// Annuity Analysis & Optimization
// Types, calculations, and comparison tools
// Last Updated: February 2026

export const annuityTypes = {
  spia: {
    name: 'Single Premium Immediate Annuity (SPIA)',
    nameDE: 'Sofortrente mit Einmalzahlung',
    nameFR: 'Rente immédiate à prime unique',
    description: 'Convert lump sum to guaranteed lifetime income starting immediately',
    descriptionDE: 'Einmalbetrag in garantiertes lebenslanges Einkommen umwandeln',
    descriptionFR: 'Convertir somme forfaitaire en revenu viager garanti',
    
    features: {
      paymentStart: 'Immediate (within 1 year)',
      guaranteedIncome: true,
      marketRisk: false,
      liquidityAfterPurchase: false,
      inflationProtection: 'Optional (COLA rider)',
      deathBenefit: 'Optional (period certain or refund)'
    },
    
    pros: [
      'Guaranteed income for life',
      'Simple and predictable',
      'Eliminates longevity risk',
      'No market risk',
      'Higher payout than bonds'
    ],
    
    cons: [
      'No liquidity once purchased',
      'No inflation protection (unless COLA)',
      'Limited death benefit',
      'Lose purchasing power over time',
      'Insurer credit risk'
    ],
    
    bestFor: [
      'Covering essential expenses',
      'Age 70+',
      'Want certainty over growth',
      'Concerned about longevity risk',
      'Limited other guaranteed income'
    ],
    
    typicalPayoutRate: {
      age65_male: 0.058,    // 5.8% annually
      age65_female: 0.053,  // 5.3% annually
      age70_male: 0.069,    // 6.9% annually
      age70_female: 0.063,  // 6.3% annually
      age75_male: 0.082,    // 8.2% annually
      age75_female: 0.075   // 7.5% annually
    }
  },
  
  dia: {
    name: 'Deferred Income Annuity (DIA) / Longevity Annuity',
    nameDE: 'Aufgeschobene Einkommensrente',
    nameFR: 'Rente différée',
    description: 'Purchase now, income starts at future age (typically 80-85)',
    descriptionDE: 'Jetzt kaufen, Einkommen beginnt im zukünftigen Alter',
    descriptionFR: 'Achat maintenant, revenu commence à un âge futur',
    
    features: {
      paymentStart: 'Deferred (10-20 years)',
      guaranteedIncome: true,
      marketRisk: false,
      liquidityAfterPurchase: false,
      inflationProtection: 'Rare',
      deathBenefit: 'Return of premium if die before start'
    },
    
    pros: [
      'Protects against living "too long"',
      'Low cost for high future income',
      'Frees up assets for other uses',
      'Qualifies for QLAC (tax-deferred)',
      'High payout rates at age 80+'
    ],
    
    cons: [
      'No benefit if die before start',
      'No liquidity',
      'Inflation erodes value',
      'Long wait for benefits',
      'Insurer must remain solvent'
    ],
    
    bestFor: [
      'Age 60-70 planning for 80+',
      'Have other income for near-term',
      'Concerned about outliving savings',
      'Want to maximize RMD efficiency',
      'Family history of longevity'
    ],
    
    typicalPayoutRate: {
      buy65_start80_male: 0.18,    // Buy at 65, start at 80: 18% annually
      buy65_start80_female: 0.15,  // 15% annually
      buy70_start85_male: 0.25,    // Buy at 70, start at 85: 25% annually
      buy70_start85_female: 0.21   // 21% annually
    }
  },
  
  fia: {
    name: 'Fixed Index Annuity (FIA)',
    nameDE: 'Feste Index-Rente',
    nameFR: 'Rente indexée fixe',
    description: 'Principal guaranteed, returns linked to market index with cap',
    descriptionDE: 'Kapital garantiert, Renditen an Marktindex gekoppelt mit Obergrenze',
    descriptionFR: 'Capital garanti, rendements liés à indice avec plafond',
    
    features: {
      paymentStart: 'Flexible (immediate or deferred)',
      guaranteedIncome: 'Via optional income rider',
      marketRisk: 'Downside protected, upside capped',
      liquidityAfterPurchase: 'Limited (surrender charges)',
      inflationProtection: 'Via market participation',
      deathBenefit: 'Yes (typically account value)'
    },
    
    pros: [
      'Principal protection',
      'Market upside participation',
      'No downside risk',
      'Death benefit',
      'Tax-deferred growth'
    ],
    
    cons: [
      'Complex product',
      'Returns capped (typically 4-8%)',
      'High fees',
      'Surrender charges (5-10 years)',
      'Difficult to understand'
    ],
    
    bestFor: [
      'Want market exposure with protection',
      'Age 50-65',
      'Risk-averse but want growth',
      'Long time horizon (10+ years)',
      'Comfortable with complexity'
    ],
    
    typicalCaps: {
      participation: 0.50,  // 50% participation in index gains
      cap: 0.06,           // 6% annual cap
      floor: 0.00          // 0% floor (no losses)
    }
  },
  
  qlac: {
    name: 'Qualified Longevity Annuity Contract (QLAC)',
    nameDE: 'Qualifizierter Langlebigkeitsrentenvertrag',
    nameFR: 'Contrat de rente de longévité qualifié',
    description: 'Special DIA for retirement accounts, defers RMDs',
    descriptionDE: 'Spezielle DIA für Alterskonten, schiebt RMDs auf',
    descriptionFR: 'DIA spécial pour comptes retraite, diffère RMDs',
    
    features: {
      paymentStart: 'Deferred until 85 max',
      guaranteedIncome: true,
      marketRisk: false,
      liquidityAfterPurchase: false,
      inflationProtection: 'Rare',
      deathBenefit: 'Return of premium'
    },
    
    limits: {
      maxPremium: 200000,  // $200k max (2024 limit)
      maxAge: 85,          // Must start by 85
      accountTypes: ['IRA', '401k', '403b', 'Other qualified']
    },
    
    pros: [
      'Reduces RMDs',
      'Tax-deferred until payout',
      'High payout rates',
      'Protects against longevity',
      'IRS-sanctioned strategy'
    ],
    
    cons: [
      'All QLAC cons plus:',
      'Lower limits ($200k max)',
      'Must start by 85',
      'Only for qualified accounts',
      'Complex RMD calculations'
    ],
    
    bestFor: [
      'Have large IRA/401k',
      'Want to reduce RMDs',
      'Expect to live past 85',
      'Have other income sources',
      'Tax planning focus'
    ]
  }
};

// Calculate annuity payout
export const calculateAnnuityPayout = (
  premium,
  age,
  gender,
  annuityType = 'spia',
  options = {}
) => {
  let payoutRate = 0;
  
  // Get base payout rate
  if (annuityType === 'spia') {
    const key = `age${age}_${gender}`;
    payoutRate = annuityTypes.spia.typicalPayoutRate[key] || 0.06;
  } else if (annuityType === 'dia') {
    const deferYears = options.startAge - age;
    if (deferYears === 15) {
      payoutRate = annuityTypes.dia.typicalPayoutRate[`buy${age}_start${options.startAge}_${gender}`] || 0.15;
    }
  }
  
  // Adjustments for options
  if (options.cola) {
    payoutRate *= 0.85; // COLA reduces initial payout by ~15%
  }
  
  if (options.periodCertain) {
    payoutRate *= 0.95; // Period certain reduces payout by ~5%
  }
  
  if (options.jointLife) {
    payoutRate *= 0.90; // Joint life reduces payout by ~10%
  }
  
  const annualPayout = premium * payoutRate;
  const monthlyPayout = annualPayout / 12;
  
  return {
    premium,
    annualPayout,
    monthlyPayout,
    payoutRate: payoutRate * 100,
    breakEven: premium / annualPayout, // Years to recover premium
    options
  };
};

// Annuity vs Portfolio comparison
export const annuityVsPortfolio = {
  description: 'Compare annuity to managing portfolio yourself',
  
  calculate: (premium, age, gender, portfolioReturn = 0.05, withdrawalRate = 0.04) => {
    // Annuity option
    const annuity = calculateAnnuityPayout(premium, age, gender, 'spia');
    
    // Portfolio option
    const portfolioAnnualWithdrawal = premium * withdrawalRate;
    const portfolioMonthlyWithdrawal = portfolioAnnualWithdrawal / 12;
    const portfolioGrowth = premium * portfolioReturn;
    
    // Comparison
    const incomeDifference = annuity.annualPayout - portfolioAnnualWithdrawal;
    const annuityAdvantage = incomeDifference > 0;
    
    return {
      annuity: {
        annualIncome: annuity.annualPayout,
        monthlyIncome: annuity.monthlyPayout,
        guaranteed: true,
        remainingAssets: 0,  // No assets left
        marketRisk: false
      },
      
      portfolio: {
        annualIncome: portfolioAnnualWithdrawal,
        monthlyIncome: portfolioMonthlyWithdrawal,
        guaranteed: false,
        remainingAssets: premium, // Still own the assets
        marketRisk: true,
        potentialGrowth: portfolioGrowth
      },
      
      comparison: {
        incomeDifference,
        percentageDifference: (incomeDifference / portfolioAnnualWithdrawal) * 100,
        annuityAdvantage,
        recommendation: annuityAdvantage 
          ? 'Annuity provides higher guaranteed income'
          : 'Portfolio provides flexibility and potential growth',
        
        considerations: [
          `Annuity income is ${incomeDifference > 0 ? 'higher' : 'lower'} by ${Math.abs(incomeDifference).toFixed(0)}/year`,
          `Portfolio maintains $${premium.toLocaleString()} for emergencies/legacy`,
          'Annuity eliminates market risk and longevity risk',
          'Portfolio allows flexibility and potential growth',
          'Consider hybrid: annuity for essentials, portfolio for discretionary'
        ]
      }
    };
  }
};

// Optimal annuitization strategy
export const annuitizationStrategy = {
  description: 'When and how much to annuitize',
  
  recommendations: {
    conservative: {
      percent: 0.35,  // 35% of portfolio
      timing: 'Age 65-70',
      reasoning: 'Cover 50-75% of essential expenses with guaranteed income'
    },
    
    moderate: {
      percent: 0.20,  // 20% of portfolio
      timing: 'Age 70-75',
      reasoning: 'Cover 30-50% of essential expenses, maintain flexibility'
    },
    
    aggressive: {
      percent: 0.10,  // 10% of portfolio (or DIA only)
      timing: 'Age 70+ (DIA for 80+)',
      reasoning: 'Minimal annuity, maintain growth potential'
    }
  },
  
  calculateOptimal: (
    portfolioValue,
    essentialExpenses,
    guaranteedIncome,  // Social Security, pension
    age,
    riskTolerance = 'moderate'
  ) => {
    const incomeGap = Math.max(0, essentialExpenses - guaranteedIncome);
    
    const strategy = annuitizationStrategy.recommendations[riskTolerance];
    
    // Calculate suggested annuity purchase
    const suggestedPremium = Math.min(
      portfolioValue * strategy.percent,
      incomeGap / 0.06  // Assume 6% payout rate
    );
    
    const projectedIncome = suggestedPremium * 0.06;  // Simplified
    
    return {
      currentSituation: {
        portfolioValue,
        essentialExpenses,
        guaranteedIncome,
        incomeGap
      },
      
      recommendation: {
        strategy: riskTolerance,
        annuityPremium: suggestedPremium,
        projectedAnnualIncome: projectedIncome,
        percentOfPortfolio: (suggestedPremium / portfolioValue) * 100,
        essentialsCoverage: ((guaranteedIncome + projectedIncome) / essentialExpenses) * 100,
        remainingPortfolio: portfolioValue - suggestedPremium
      },
      
      rationale: strategy.reasoning,
      timing: strategy.timing
    };
  }
};

// Helper functions
export const getAnnuityType = (type) => {
  return annuityTypes[type] || null;
};

export const getAllAnnuityTypes = () => {
  return Object.keys(annuityTypes).map(key => ({
    key,
    ...annuityTypes[key]
  }));
};

export default {
  annuityTypes,
  calculateAnnuityPayout,
  annuityVsPortfolio,
  annuitizationStrategy,
  getAnnuityType,
  getAllAnnuityTypes
};
