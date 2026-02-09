// Enhanced Liquidity Strategy - Three-Tier Framework
// Based on UBS Wealth Way Liquidity Management
// Last Updated: February 2026

export const liquidityTiers = {
  tierI: {
    name: 'Tier I - Immediate Access',
    nameDE: 'Stufe I - Sofortiger Zugriff',
    nameFR: 'Niveau I - Accès immédiat',
    description: 'Ultra-liquid assets for emergency needs and daily expenses',
    descriptionDE: 'Hochliquide Vermögenswerte für Notfälle und tägliche Ausgaben',
    descriptionFR: 'Actifs ultra-liquides pour urgences et dépenses quotidiennes',
    targetMonths: 3,
    instruments: [
      'Checking accounts',
      'Savings accounts',
      'Money market funds',
      'Cash management accounts'
    ],
    expectedReturn: 2.0,
    volatility: 0.5,
    accessTime: 'Same day',
    color: '#10b981'
  },
  
  tierII: {
    name: 'Tier II - Near-Term Reserve',
    nameDE: 'Stufe II - Kurzfristige Reserve',
    nameFR: 'Niveau II - Réserve à court terme',
    description: 'Low-volatility investments for planned expenses (6-24 months)',
    descriptionDE: 'Risikoarme Anlagen für geplante Ausgaben (6-24 Monate)',
    descriptionFR: 'Investissements à faible volatilité pour dépenses planifiées (6-24 mois)',
    targetMonths: 15,
    instruments: [
      'Short-term bond funds',
      'Treasury bills',
      'High-grade corporate bonds (1-3 year)',
      'Certificate of deposits (CDs)',
      'Stable value funds'
    ],
    expectedReturn: 3.5,
    volatility: 2.5,
    accessTime: '1-5 business days',
    color: '#3b82f6'
  },
  
  tierIII: {
    name: 'Tier III - Strategic Reserve',
    nameDE: 'Stufe III - Strategische Reserve',
    nameFR: 'Niveau III - Réserve stratégique',
    description: 'Moderate-risk investments for 2-5 year needs',
    descriptionDE: 'Mittleres Risiko für 2-5 Jahresbedarf',
    descriptionFR: 'Investissements à risque modéré pour besoins 2-5 ans',
    targetMonths: 24,
    instruments: [
      'Intermediate-term bond funds',
      'Balanced funds (30/70 or 40/60)',
      'Dividend-paying stocks',
      'Short-duration credit',
      'Conservative allocation funds'
    ],
    expectedReturn: 5.0,
    volatility: 6.0,
    accessTime: '3-10 business days',
    color: '#8b5cf6'
  }
};

// Dynamic refilling rules based on market conditions
export const refillingRules = {
  bullMarket: {
    condition: 'S&P 500 within 5% of all-time high',
    strategy: 'Aggressive refilling from longevity bucket',
    refillingRate: 1.0, // 100% of target
    tierIPriority: true,
    tierIIPriority: true,
    tierIIIPriority: false,
    rationale: 'Strong market - lock in gains by refilling liquidity'
  },
  
  normalMarket: {
    condition: 'Market stable, no extreme movements',
    strategy: 'Systematic refilling as tiers deplete',
    refillingRate: 0.8, // 80% of target
    tierIPriority: true,
    tierIIPriority: true,
    tierIIIPriority: true,
    rationale: 'Balanced approach - maintain all tiers'
  },
  
  bearMarket: {
    condition: 'Market down 20%+ from peak',
    strategy: 'Minimal refilling - preserve longevity investments',
    refillingRate: 0.5, // 50% of target (keep Tier I only)
    tierIPriority: true,
    tierIIPriority: false,
    tierIIIPriority: false,
    rationale: 'Bear market - avoid selling at losses, live off existing liquidity longer'
  },
  
  volatileMarket: {
    condition: 'VIX > 30 or market swings >2% daily',
    strategy: 'Selective refilling with caution',
    refillingRate: 0.6, // 60% of target
    tierIPriority: true,
    tierIIPriority: true,
    tierIIIPriority: false,
    rationale: 'High volatility - maintain core liquidity, pause Tier III'
  }
};

// Calculate liquidity needs based on expenses
export const calculateLiquidityNeeds = (annualExpenses, multipliers = null) => {
  const defaults = {
    tierI: 0.25,   // 3 months = 0.25 years
    tierII: 1.25,  // 15 months = 1.25 years
    tierIII: 2.0   // 24 months = 2.0 years
  };
  
  const m = multipliers || defaults;
  
  return {
    tierI: annualExpenses * m.tierI,
    tierII: annualExpenses * m.tierII,
    tierIII: annualExpenses * m.tierIII,
    total: annualExpenses * (m.tierI + m.tierII + m.tierIII),
    totalMonths: (m.tierI + m.tierII + m.tierIII) * 12
  };
};

// Determine market condition based on metrics
export const determineMarketCondition = (metrics) => {
  const {
    currentPrice,
    allTimeHigh,
    yearAgoPrice,
    vix = 20,
    dailyVolatility = 1.0
  } = metrics;
  
  const percentFromHigh = ((currentPrice - allTimeHigh) / allTimeHigh) * 100;
  const yearReturn = ((currentPrice - yearAgoPrice) / yearAgoPrice) * 100;
  
  // Bear market: down 20%+ from peak
  if (percentFromHigh < -20) {
    return 'bearMarket';
  }
  
  // Volatile market: VIX high or large daily swings
  if (vix > 30 || dailyVolatility > 2.0) {
    return 'volatileMarket';
  }
  
  // Bull market: within 5% of all-time high
  if (percentFromHigh > -5) {
    return 'bullMarket';
  }
  
  // Normal market
  return 'normalMarket';
};

// Calculate refilling schedule
export const calculateRefillingSchedule = (
  currentLiquidity,
  targetLiquidity,
  marketCondition,
  longevityBucketValue
) => {
  const rules = refillingRules[marketCondition];
  const deficit = {
    tierI: Math.max(0, targetLiquidity.tierI - currentLiquidity.tierI),
    tierII: Math.max(0, targetLiquidity.tierII - currentLiquidity.tierII),
    tierIII: Math.max(0, targetLiquidity.tierIII - currentLiquidity.tierIII)
  };
  
  const schedule = [];
  
  // Tier I - Always prioritized
  if (deficit.tierI > 0 && rules.tierIPriority) {
    schedule.push({
      tier: 'I',
      amount: deficit.tierI * rules.refillingRate,
      priority: 1,
      rationale: 'Emergency liquidity must be maintained'
    });
  }
  
  // Tier II - Refill if conditions allow
  if (deficit.tierII > 0 && rules.tierIIPriority) {
    schedule.push({
      tier: 'II',
      amount: deficit.tierII * rules.refillingRate,
      priority: 2,
      rationale: 'Near-term expenses covered'
    });
  }
  
  // Tier III - Only in favorable conditions
  if (deficit.tierIII > 0 && rules.tierIIIPriority) {
    schedule.push({
      tier: 'III',
      amount: deficit.tierIII * rules.refillingRate,
      priority: 3,
      rationale: 'Strategic reserve for medium-term'
    });
  }
  
  const totalRefilling = schedule.reduce((sum, item) => sum + item.amount, 0);
  
  return {
    schedule,
    totalAmount: totalRefilling,
    fundingSource: 'Longevity Bucket',
    availableFunding: longevityBucketValue,
    feasible: totalRefilling <= longevityBucketValue * 0.1, // Max 10% of longevity
    marketCondition,
    strategy: rules.strategy,
    rationale: rules.rationale
  };
};

// Securities-backed line of credit (SBLOC) calculations
export const securitiesBackedLoan = {
  typical: {
    loanToValue: 0.70, // 70% LTV typical
    interestRate: 5.5, // Current rates ~5-6%
    minPortfolio: 100000, // $100k minimum usually
    advantages: [
      'No need to sell investments (avoid taxes)',
      'Keep investment growth potential',
      'Lower rates than credit cards/personal loans',
      'Flexible repayment',
      'No credit check if sufficient collateral'
    ],
    risks: [
      'Margin call if portfolio drops',
      'Variable interest rates',
      'Can lose collateral if unable to repay',
      'Temptation to over-borrow'
    ],
    useCases: [
      'Bridge emergency gaps without selling',
      'Bear market liquidity without realizing losses',
      'Tax-loss harvesting opportunities',
      'Major one-time expense (home repair, etc.)'
    ]
  },
  
  calculateCapacity: (portfolioValue, loanToValue = 0.70) => {
    return {
      maxLoan: portfolioValue * loanToValue,
      safeUtilization: portfolioValue * loanToValue * 0.5, // Use only 50% of max
      marginCallLevel: portfolioValue * 0.7, // Called if portfolio drops 30%
      monthlyInterest: (portfolioValue * loanToValue * 0.055) / 12
    };
  }
};

// Emergency scenarios and guidelines
export const emergencyGuidelines = {
  suddenExpense: {
    under10k: 'Use Tier I immediately',
    under50k: 'Tier I + Tier II, avoid Tier III if possible',
    under100k: 'Tier I + II + III, or consider SBLOC',
    over100k: 'Evaluate: SBLOC vs. selling investments (tax implications)'
  },
  
  jobLoss: {
    action: 'Immediately reduce expenses, maximize Tier I',
    spending: 'Cut to 70% of normal if possible',
    avoidSelling: 'Do not liquidate longevity/legacy during first 6 months',
    insurance: 'Review all insurance for potential claims',
    timeline: 'Tier I (3mo) + Tier II (15mo) = 18 months runway'
  },
  
  healthCrisis: {
    action: 'Review insurance coverage first',
    sbloc: 'Consider SBLOC for major expenses while insurance processes',
    roth: 'Roth contributions can be withdrawn tax/penalty free',
    priority: 'Preserve retirement accounts if possible'
  },
  
  marketCrash: {
    do: [
      'Live off existing liquidity buckets',
      'Use SBLOC if needed rather than selling at loss',
      'Rebalance only if severely out of target allocation',
      'Continue required minimum distributions only'
    ],
    doNot: [
      'Panic sell longevity bucket',
      'Stop all retirement contributions',
      'Make major financial decisions quickly',
      'Refill liquidity too aggressively'
    ]
  }
};

// Helper function to get tier info by tier
export const getTierInfo = (tier) => {
  return liquidityTiers[tier];
};

// Helper function to get all tiers as array
export const getAllTiers = () => {
  return [
    { id: 'tierI', ...liquidityTiers.tierI },
    { id: 'tierII', ...liquidityTiers.tierII },
    { id: 'tierIII', ...liquidityTiers.tierIII }
  ];
};

export default {
  liquidityTiers,
  refillingRules,
  calculateLiquidityNeeds,
  determineMarketCondition,
  calculateRefillingSchedule,
  securitiesBackedLoan,
  emergencyGuidelines,
  getTierInfo,
  getAllTiers
};
