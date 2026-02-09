// Longevity Bucket Refinement - Life Expectancy & Health Factors
// Based on WHO data, national statistics, and actuarial tables
// Last Updated: February 2026

// Country-specific life expectancy data (2024-2025 data)
export const lifeExpectancyData = {
  LU: {
    country: 'Luxembourg',
    male: { base: 80.3, healthy: 82.1, excellent: 84.5 },
    female: { base: 84.5, healthy: 86.2, excellent: 88.7 },
    source: 'Statec Luxembourg 2024',
    healthcareQuality: 9.2,
    notes: 'Excellent healthcare system, high life expectancy'
  },
  
  CH: {
    country: 'Switzerland',
    male: { base: 81.9, healthy: 83.8, excellent: 86.2 },
    female: { base: 85.7, healthy: 87.4, excellent: 89.9 },
    source: 'Swiss Federal Statistical Office 2024',
    healthcareQuality: 9.5,
    notes: 'Highest life expectancy in Europe'
  },
  
  FR: {
    country: 'France',
    male: { base: 79.8, healthy: 81.6, excellent: 84.1 },
    female: { base: 85.7, healthy: 87.3, excellent: 89.8 },
    source: 'INSEE 2024',
    healthcareQuality: 9.0,
    notes: 'Excellent healthcare, high life expectancy'
  },
  
  UK: {
    country: 'United Kingdom',
    male: { base: 79.3, healthy: 81.1, excellent: 83.5 },
    female: { base: 83.1, healthy: 84.8, excellent: 87.2 },
    source: 'ONS UK 2024',
    healthcareQuality: 8.5,
    notes: 'NHS provides universal coverage'
  },
  
  PT: {
    country: 'Portugal',
    male: { base: 78.9, healthy: 80.7, excellent: 83.1 },
    female: { base: 84.4, healthy: 86.1, excellent: 88.5 },
    source: 'INE Portugal 2024',
    healthcareQuality: 8.3,
    notes: 'Improving healthcare system'
  },
  
  DE: {
    country: 'Germany',
    male: { base: 78.9, healthy: 80.7, excellent: 83.2 },
    female: { base: 83.6, healthy: 85.3, excellent: 87.7 },
    source: 'Destatis 2024',
    healthcareQuality: 8.8,
    notes: 'Strong healthcare infrastructure'
  },
  
  US: {
    country: 'United States',
    male: { base: 76.3, healthy: 78.5, excellent: 81.2 },
    female: { base: 81.4, healthy: 83.2, excellent: 85.8 },
    source: 'CDC 2024',
    healthcareQuality: 7.8,
    notes: 'Healthcare quality varies by access'
  }
};

// Health status adjustments
export const healthFactors = {
  excellent: {
    adjustment: 3.5,
    description: 'No chronic conditions, regular exercise, healthy diet',
    descriptionDE: 'Keine chronischen Erkrankungen, regelmäßige Bewegung, gesunde Ernährung',
    descriptionFR: 'Aucune maladie chronique, exercice régulier, alimentation saine',
    criteria: [
      'BMI 18.5-25',
      'No chronic diseases',
      'Regular exercise (3+ times/week)',
      'Non-smoker for 10+ years',
      'Healthy diet',
      'No family history of early death'
    ]
  },
  
  good: {
    adjustment: 1.5,
    description: 'Generally healthy, some lifestyle improvements possible',
    descriptionDE: 'Allgemein gesund, einige Lifestyle-Verbesserungen möglich',
    descriptionFR: 'Généralement en bonne santé, améliorations possibles',
    criteria: [
      'BMI 25-30 or controlled conditions',
      'Mild chronic conditions (well managed)',
      'Moderate exercise (1-2 times/week)',
      'Former smoker or occasional drinker',
      'Average diet'
    ]
  },
  
  average: {
    adjustment: 0,
    description: 'Average health for age group',
    descriptionDE: 'Durchschnittliche Gesundheit für Altersgruppe',
    descriptionFR: 'Santé moyenne pour le groupe d\'âge',
    criteria: [
      'BMI 30-35 or multiple conditions',
      'Several chronic conditions',
      'Sedentary lifestyle',
      'Current smoker or heavy drinker',
      'Poor diet'
    ]
  },
  
  poor: {
    adjustment: -3.0,
    description: 'Multiple health issues, lifestyle interventions needed',
    descriptionDE: 'Mehrere Gesundheitsprobleme, Lifestyle-Interventionen erforderlich',
    descriptionFR: 'Problèmes de santé multiples, interventions nécessaires',
    criteria: [
      'BMI >35 or severe conditions',
      'Multiple serious chronic conditions',
      'Immobile or severely limited',
      'Heavy smoker and drinker',
      'Very poor diet',
      'Family history of early death'
    ]
  }
};

// Lifestyle multipliers (cumulative)
export const lifestyleFactors = {
  smoking: {
    current: -5.0,
    former_10plus: 0,
    former_5to10: -1.0,
    former_under5: -2.0,
    never: 0.5
  },
  
  exercise: {
    sedentary: -2.0,
    light_1to2: 0,
    moderate_3to4: 1.5,
    vigorous_5plus: 2.5
  },
  
  bmi: {
    underweight: -1.5,  // <18.5
    normal: 1.0,        // 18.5-25
    overweight: -0.5,   // 25-30
    obese: -2.5,        // 30-35
    severelyObese: -5.0 // >35
  },
  
  alcohol: {
    none: 0.5,
    light: 0,        // 1-7 drinks/week
    moderate: -0.5,  // 8-14 drinks/week
    heavy: -3.0      // 15+ drinks/week
  },
  
  stress: {
    low: 1.0,
    moderate: 0,
    high: -1.5,
    chronic: -3.0
  },
  
  sleep: {
    poor: -1.5,      // <5 or >10 hours
    suboptimal: -0.5, // 5-6 or 9-10 hours
    good: 0.5,       // 7-8 hours
    excellent: 1.0   // Consistent 7-8 hours
  },
  
  socialConnections: {
    isolated: -2.0,
    limited: -0.5,
    moderate: 0.5,
    strong: 1.5
  }
};

// Calculate personalized life expectancy
export const calculateLifeExpectancy = (
  country,
  gender,
  currentAge,
  healthStatus = 'average',
  lifestyleData = {}
) => {
  const countryData = lifeExpectancyData[country];
  if (!countryData) return null;
  
  // Base life expectancy
  const baseLE = countryData[gender].base;
  
  // Health status adjustment
  const healthAdj = healthFactors[healthStatus]?.adjustment || 0;
  
  // Lifestyle adjustments
  let lifestyleAdj = 0;
  
  if (lifestyleData.smoking) {
    lifestyleAdj += lifestyleFactors.smoking[lifestyleData.smoking] || 0;
  }
  
  if (lifestyleData.exercise) {
    lifestyleAdj += lifestyleFactors.exercise[lifestyleData.exercise] || 0;
  }
  
  if (lifestyleData.bmi) {
    lifestyleAdj += lifestyleFactors.bmi[lifestyleData.bmi] || 0;
  }
  
  if (lifestyleData.alcohol) {
    lifestyleAdj += lifestyleFactors.alcohol[lifestyleData.alcohol] || 0;
  }
  
  if (lifestyleData.stress) {
    lifestyleAdj += lifestyleFactors.stress[lifestyleData.stress] || 0;
  }
  
  if (lifestyleData.sleep) {
    lifestyleAdj += lifestyleFactors.sleep[lifestyleData.sleep] || 0;
  }
  
  if (lifestyleData.socialConnections) {
    lifestyleAdj += lifestyleFactors.socialConnections[lifestyleData.socialConnections] || 0;
  }
  
  // Calculate adjusted life expectancy
  const adjustedLE = baseLE + healthAdj + lifestyleAdj;
  
  // Remaining years
  const remainingYears = Math.max(0, adjustedLE - currentAge);
  
  // Planning horizons
  const conservative = adjustedLE + 5;  // Plan for +5 years
  const moderate = adjustedLE;
  const aggressive = adjustedLE - 3;    // More risk, shorter horizon
  
  return {
    country: countryData.country,
    gender,
    currentAge,
    baseLifeExpectancy: baseLE,
    healthAdjustment: healthAdj,
    lifestyleAdjustment: lifestyleAdj,
    adjustedLifeExpectancy: adjustedLE,
    remainingYears,
    planningHorizons: {
      conservative: { age: conservative, years: conservative - currentAge },
      moderate: { age: moderate, years: moderate - currentAge },
      aggressive: { age: aggressive, years: aggressive - currentAge }
    },
    healthcareQuality: countryData.healthcareQuality,
    source: countryData.source
  };
};

// Sequence of returns risk analysis
export const sequenceOfReturnsRisk = {
  description: 'Early market downturns can devastate retirement portfolios',
  
  scenarios: {
    earlyBear: {
      name: 'Early Bear Market',
      nameDE: 'Früher Bärenmarkt',
      nameFR: 'Marché baissier précoce',
      description: 'Market drops 30% in first 3 years of retirement',
      impact: 'Severe - Portfolio may not recover',
      riskLevel: 'High',
      mitigations: [
        'Larger liquidity bucket (5+ years)',
        'Reduce withdrawals by 10-20%',
        'Part-time work or delay retirement',
        'Increase bond allocation temporarily'
      ]
    },
    
    midBear: {
      name: 'Mid-Retirement Bear',
      nameDE: 'Bärenmarkt in der Mitte',
      nameFR: 'Marché baissier à mi-parcours',
      description: 'Market drops 25% 10-15 years into retirement',
      impact: 'Moderate - Portfolio stressed but recoverable',
      riskLevel: 'Medium',
      mitigations: [
        'Maintain 3-tier liquidity',
        'Reduce discretionary spending',
        'Delay major expenses',
        'Consider SBLOC vs selling'
      ]
    },
    
    lateBear: {
      name: 'Late Bear Market',
      nameDE: 'Später Bärenmarkt',
      nameFR: 'Marché baissier tardif',
      description: 'Market drops 20% 20+ years into retirement',
      impact: 'Low - Less time for compounding losses',
      riskLevel: 'Low',
      mitigations: [
        'Maintain current strategy',
        'Focus on legacy planning',
        'Consider reducing equity exposure'
      ]
    }
  },
  
  // Monte Carlo style probability ranges
  probabilities: {
    earlyBear_5yr: 0.15,  // 15% chance of bear in first 5 years
    anyBear_30yr: 0.95,   // 95% chance of at least one bear in 30 years
    multipleBears: 0.70   // 70% chance of 2+ bears in 30 years
  },
  
  // Calculate impact of sequence risk
  calculateImpact: (portfolioValue, withdrawalRate, yearsInRetirement) => {
    // Simplified model: early bear has 3x impact vs late bear
    const earlyMultiplier = Math.max(1, 4 - (yearsInRetirement / 10));
    const baseImpact = portfolioValue * withdrawalRate * 0.1; // 10% base impact
    
    return {
      potentialLoss: baseImpact * earlyMultiplier,
      recoveryYears: Math.ceil(earlyMultiplier * 3),
      suggestion: yearsInRetirement < 5 
        ? 'Critical: Build larger liquidity buffer'
        : yearsInRetirement < 15
        ? 'Important: Maintain flexibility'
        : 'Moderate: Standard mitigation'
    };
  }
};

// Dynamic spending flexibility rules
export const spendingFlexibility = {
  description: 'Adjust spending based on portfolio performance and market conditions',
  
  rules: {
    guardrails: {
      name: 'Guardrails Strategy',
      nameDE: 'Leitplanken-Strategie',
      nameFR: 'Stratégie de garde-fous',
      description: 'Increase/decrease spending based on portfolio value thresholds',
      
      thresholds: {
        upperGuardrail: 1.20,  // +20% above initial value
        lowerGuardrail: 0.85,  // -15% below initial value
        action: {
          above: 'Increase spending by 10%',
          below: 'Decrease spending by 10%',
          within: 'Maintain current spending'
        }
      },
      
      calculate: (currentValue, initialValue, currentSpending) => {
        const ratio = currentValue / initialValue;
        
        if (ratio > 1.20) {
          return {
            action: 'increase',
            newSpending: currentSpending * 1.10,
            reason: 'Portfolio performing well (+20%)'
          };
        } else if (ratio < 0.85) {
          return {
            action: 'decrease',
            newSpending: currentSpending * 0.90,
            reason: 'Portfolio underperforming (-15%)'
          };
        } else {
          return {
            action: 'maintain',
            newSpending: currentSpending,
            reason: 'Portfolio within guardrails'
          };
        }
      }
    },
    
    constantPercentage: {
      name: 'Constant Percentage',
      nameDE: 'Konstanter Prozentsatz',
      nameFR: 'Pourcentage constant',
      description: 'Withdraw fixed percentage of portfolio each year',
      
      percentage: 0.04, // 4% rule
      
      calculate: (currentValue) => {
        return {
          withdrawal: currentValue * 0.04,
          volatility: 'High - varies with market',
          prosCons: {
            pros: ['Never run out of money', 'Adjusts automatically'],
            cons: ['Variable income', 'Can be too low in bear markets']
          }
        };
      }
    },
    
    floorCeiling: {
      name: 'Floor & Ceiling',
      nameDE: 'Boden & Decke',
      nameFR: 'Plancher & Plafond',
      description: 'Set minimum and maximum annual spending limits',
      
      calculate: (desiredSpending, portfolioValue) => {
        const floor = desiredSpending * 0.80;  // Never below 80%
        const ceiling = desiredSpending * 1.20; // Never above 120%
        const calculated = portfolioValue * 0.04;
        
        const actual = Math.max(floor, Math.min(ceiling, calculated));
        
        return {
          floor,
          ceiling,
          calculated,
          actual,
          atFloor: actual === floor,
          atCeiling: actual === ceiling
        };
      }
    },
    
    dynamicWithdrawal: {
      name: 'Dynamic Withdrawal',
      nameDE: 'Dynamische Entnahme',
      nameFR: 'Retrait dynamique',
      description: 'Adjust based on age, market performance, and remaining assets',
      
      calculate: (age, portfolioValue, lifeExpectancy, marketCondition) => {
        // Base rate
        let rate = 0.04;
        
        // Age adjustment (increase as you age)
        if (age > 75) rate += 0.005;
        if (age > 80) rate += 0.005;
        if (age > 85) rate += 0.01;
        
        // Market adjustment
        if (marketCondition === 'bearMarket') rate -= 0.01;
        if (marketCondition === 'bullMarket') rate += 0.005;
        
        // Remaining years adjustment
        const remainingYears = lifeExpectancy - age;
        if (remainingYears < 10) rate += 0.01;
        if (remainingYears < 5) rate += 0.02;
        
        // Calculate withdrawal
        const withdrawal = portfolioValue * rate;
        
        return {
          rate: rate * 100,
          withdrawal,
          factors: {
            age,
            marketCondition,
            remainingYears
          }
        };
      }
    }
  }
};

// Helper functions
export const getLifeExpectancy = (country, gender) => {
  return lifeExpectancyData[country]?.[gender] || null;
};

export const getHealthFactor = (status) => {
  return healthFactors[status] || healthFactors.average;
};

export const getAllCountries = () => {
  return Object.keys(lifeExpectancyData).map(code => ({
    code,
    ...lifeExpectancyData[code]
  }));
};

export default {
  lifeExpectancyData,
  healthFactors,
  lifestyleFactors,
  calculateLifeExpectancy,
  sequenceOfReturnsRisk,
  spendingFlexibility,
  getLifeExpectancy,
  getHealthFactor,
  getAllCountries
};
