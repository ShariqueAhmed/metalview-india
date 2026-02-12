/**
 * People Also Ask Questions Generator
 * Based on common search queries for gold and metals
 */

export interface PeopleAlsoAskItem {
  question: string;
  answer: string;
}

/**
 * Generate "People Also Ask" questions for gold
 */
export function generateGoldPeopleAlsoAsk(): PeopleAlsoAskItem[] {
  return [
    {
      question: 'Why is gold price increasing?',
      answer: `Gold prices increase due to several factors: (1) **Inflation concerns** - When inflation rises, gold becomes more attractive as a store of value. (2) **Geopolitical tensions** - Political instability and conflicts drive safe-haven demand. (3) **Currency weakness** - When the US dollar weakens, gold prices typically rise. (4) **Central bank buying** - Increased purchases by central banks boost demand. (5) **Economic uncertainty** - During economic downturns, investors flock to gold. (6) **Low interest rates** - When interest rates are low, gold becomes more attractive compared to bonds. (7) **Strong demand** - High demand from India, China, and other countries during festivals and wedding seasons.`,
    },
    {
      question: 'What affects gold prices?',
      answer: `Gold prices are influenced by multiple factors: **International factors** include global gold prices (London Bullion Market, COMEX), US dollar strength, interest rates, inflation rates, and geopolitical events. **Economic indicators** like GDP growth, unemployment rates, and economic policies affect investor sentiment. **Supply and demand** dynamics include mining production, central bank sales/purchases, jewelry demand, and investment demand. **Market sentiment** is driven by investor confidence, ETF flows, and speculative trading. **Local factors in India** include import duties, currency exchange rates (USD to INR), local demand during festivals, making charges, and dealer margins. **Seasonal factors** like Diwali, Akshaya Tritiya, and wedding seasons create demand spikes.`,
    },
    {
      question: 'Is gold a good investment?',
      answer: `Gold can be a good investment, but it depends on your goals: **Advantages**: (1) **Wealth preservation** - Gold maintains value over long periods and acts as a hedge against inflation. (2) **Portfolio diversification** - Reduces overall portfolio risk. (3) **Safe haven** - Performs well during economic crises and market volatility. (4) **Liquidity** - Easy to buy and sell. (5) **No counterparty risk** - Physical gold doesn't depend on any institution. **Considerations**: (1) **No regular income** - Unlike stocks or bonds, gold doesn't pay dividends or interest. (2) **Storage costs** - Physical gold requires secure storage and insurance. (3) **Price volatility** - Short-term price fluctuations can be significant. (4) **Opportunity cost** - Money in gold could potentially earn more in other investments. **Recommendation**: Gold is best as a long-term wealth preservation tool (10-15% of portfolio) rather than a primary investment for growth.`,
    },
    {
      question: 'How to calculate gold price?',
      answer: `Gold price calculation involves several components: **Basic Formula**: Gold Price = (International Gold Rate × Currency Exchange Rate) + Import Duty + Making Charges + Dealer Margin + GST. **Step-by-step**: (1) **International rate** - Check current London Bullion Market or MCX rates (per troy ounce or per 10 grams). (2) **Currency conversion** - Convert to INR using USD/INR exchange rate. (3) **Add import duty** - Typically 10-12.5% on gold imports in India. (4) **Add making charges** - For jewelry, usually 8-15% of gold value. (5) **Add dealer margin** - Typically 2-5% for dealers. (6) **Add GST** - 3% GST on gold in India. **Example**: If international gold is ₹60,000/10g, with 10% import duty, 10% making charges, 3% dealer margin, and 3% GST: Final Price = ₹60,000 + ₹6,000 + ₹6,000 + ₹1,800 + ₹2,214 = ₹76,014/10g. **For investment gold (24K)**: Usually lower as it excludes making charges.`,
    },
    {
      question: 'When is the best time to buy gold?',
      answer: `The best time to buy gold depends on your goals: **For investment**: (1) **During price dips** - Buy when prices are lower than recent highs. (2) **Dollar-cost averaging** - Buy small amounts regularly rather than timing the market. (3) **Long-term perspective** - Focus on long-term trends rather than short-term fluctuations. **For jewelry**: (1) **Off-season periods** - Prices may be slightly lower outside major festivals. (2) **Avoid peak seasons** - Diwali, Akshaya Tritiya, and wedding seasons see higher demand and prices. **Market timing**: (1) **Monitor trends** - Watch for consistent upward or downward trends. (2) **Economic indicators** - Consider buying during economic uncertainty. (3) **Currency movements** - Strong INR can mean lower gold prices. **Important**: Timing the market is difficult. For most investors, regular purchases (SIP approach) work better than trying to time the market perfectly.`,
    },
    {
      question: 'What is the difference between 24K, 22K, and 18K gold?',
      answer: `The main difference is **purity** (gold content): **24K Gold** contains 99.9% pure gold - highest purity, best for investment, but too soft for jewelry. **22K Gold** contains 91.6% pure gold mixed with 8.4% other metals - ideal for jewelry, traditional choice in India, balances purity and durability. **18K Gold** contains 75% pure gold mixed with 25% other metals - very durable, popular for modern jewelry, but lower gold content. **Price difference**: 24K is most expensive, 22K is about 8-10% cheaper, and 18K is about 25% cheaper. **Best use**: 24K for investment, 22K for traditional jewelry, 18K for modern designs. **Resale value**: 24K has highest resale value, followed by 22K, then 18K.`,
    },
  ];
}

/**
 * Generate "People Also Ask" questions for silver
 */
export function generateSilverPeopleAlsoAsk(): PeopleAlsoAskItem[] {
  return [
    {
      question: 'Why is silver price increasing?',
      answer: `Silver prices increase due to: (1) **Industrial demand** - Growing use in electronics, solar panels, and medical equipment. (2) **Investment demand** - Safe-haven asset during economic uncertainty. (3) **Green energy transition** - Solar panel production requires significant silver. (4) **Supply constraints** - Limited mining production. (5) **Currency factors** - Weak dollar makes silver cheaper for foreign buyers. (6) **Gold-silver ratio** - When gold rises, silver often follows. (7) **Inflation hedge** - Like gold, silver protects against inflation.`,
    },
    {
      question: 'What affects silver prices?',
      answer: `Silver prices are influenced by: **Industrial demand** (50% of usage) - Electronics, solar panels, medical equipment, automotive. **Investment demand** - ETFs, coins, bars. **Supply factors** - Mining production, recycling, government sales. **Economic factors** - GDP growth, manufacturing activity, interest rates. **Currency movements** - USD strength/weakness. **Gold prices** - Silver often follows gold trends. **Market speculation** - Trading activity and sentiment. **Geopolitical events** - Political tensions affect safe-haven demand.`,
    },
    {
      question: 'Is silver a good investment?',
      answer: `Silver can be a good investment with considerations: **Advantages**: Lower entry cost than gold, higher volatility (potential for bigger gains), strong industrial demand, portfolio diversification, inflation hedge. **Disadvantages**: Higher volatility (more risk), bulkier storage, lower liquidity than gold, more susceptible to market manipulation. **Best for**: Investors comfortable with higher risk, those with limited capital, portfolio diversification, belief in industrial growth. **Recommendation**: Silver can complement gold in a portfolio (10-20% of precious metals allocation) but requires higher risk tolerance.`,
    },
    {
      question: 'How to calculate silver price?',
      answer: `Silver price calculation: **Basic Formula**: Silver Price = (International Silver Rate × Currency Exchange Rate) + Import Duty + Making Charges (for jewelry) + Dealer Margin + GST. **Components**: (1) International rate from London Metal Exchange or MCX. (2) Currency conversion (USD to INR). (3) Import duty (typically 10-12.5% in India). (4) Making charges for jewelry (8-15%). (5) Dealer margin (2-5%). (6) GST (3% in India). **For investment silver**: Lower price as it excludes making charges. **Example**: If international silver is ₹75,000/kg, with 10% import duty, 3% dealer margin, and 3% GST: Final Price = ₹75,000 + ₹7,500 + ₹2,250 + ₹2,543 = ₹86,293/kg.`,
    },
  ];
}

/**
 * Generate "People Also Ask" questions for general metals
 */
export function generateGeneralPeopleAlsoAsk(): PeopleAlsoAskItem[] {
  return [
    {
      question: 'What affects metal prices?',
      answer: `Metal prices are affected by: **Global factors** - International commodity prices, currency exchange rates, economic growth, inflation, interest rates. **Supply and demand** - Mining production, industrial consumption, investment demand, recycling rates. **Geopolitical events** - Political tensions, trade wars, sanctions. **Market sentiment** - Investor confidence, speculative trading, ETF flows. **Local factors** - Import duties, local demand, transportation costs, dealer margins, taxes. **Seasonal factors** - Festival demand, wedding seasons, agricultural cycles. **Technology trends** - New uses in technology (e.g., silver in solar panels) affect demand.`,
    },
    {
      question: 'How often do metal prices change?',
      answer: `Metal prices change continuously: **Real-time updates** - International prices update every second during trading hours. **Daily changes** - Prices typically change multiple times per day based on market activity. **Factors affecting frequency** - Trading volume, market volatility, news events, economic data releases. **Local prices** - In India, prices usually update hourly or multiple times per day to reflect international rates and currency movements. **Best practice** - Check prices multiple times if making a large purchase, as prices can fluctuate significantly within a day.`,
    },
    {
      question: 'Which metal is best for investment?',
      answer: `The best metal for investment depends on goals: **Gold** - Best for stability, wealth preservation, low risk, high liquidity. Ideal for conservative investors. **Silver** - Best for growth potential, lower entry cost, higher volatility. Suitable for risk-tolerant investors. **Platinum** - Industrial applications, rarer than gold, but more volatile. **Palladium** - Strong industrial demand, but very volatile. **Recommendation**: Most experts suggest a **balanced approach**: 70-80% gold for stability, 20-30% silver for growth. Consider your risk tolerance, investment horizon, and financial goals when choosing.`,
    },
  ];
}

/**
 * Get People Also Ask questions based on metal type
 */
export function getPeopleAlsoAskQuestions(metal: 'gold' | 'silver' | 'copper' | 'platinum' | 'palladium' | 'general' = 'general'): PeopleAlsoAskItem[] {
  switch (metal) {
    case 'gold':
      return generateGoldPeopleAlsoAsk();
    case 'silver':
      return generateSilverPeopleAlsoAsk();
    case 'copper':
    case 'platinum':
    case 'palladium':
    case 'general':
    default:
      return generateGeneralPeopleAlsoAsk();
  }
}
