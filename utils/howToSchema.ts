/**
 * HowTo Schema Generator
 * Generates Schema.org HowTo structured data from blog post content
 */

export interface HowToStep {
  position: number;
  name: string;
  text: string;
  url?: string;
}

/**
 * Generate HowTo schema from blog post content
 */
export function generateHowToSchema(
  title: string,
  content: string,
  slug: string,
  baseUrl: string = 'https://metalview.in'
): object | null {
  // Check if this is a "how-to" guide
  const isHowTo = 
    title.toLowerCase().includes('how to') ||
    title.toLowerCase().includes('guide') ||
    title.toLowerCase().includes('step') ||
    slug.includes('how-to');

  if (!isHowTo) {
    return null;
  }

  // Extract steps from content
  const steps = extractStepsFromContent(content, baseUrl, slug);

  if (steps.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: `Step-by-step guide: ${title}`,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.position,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
    })),
  };
}

/**
 * Extract steps from markdown content
 */
function extractStepsFromContent(
  content: string,
  baseUrl: string,
  slug: string
): HowToStep[] {
  const steps: HowToStep[] = [];
  const lines = content.split('\n');
  let currentStep: Partial<HowToStep> | null = null;
  let stepNumber = 0;
  let stepText: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;

    // Detect numbered steps (1., 2., 3., etc.)
    const numberedStepMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numberedStepMatch && numberedStepMatch[1] && numberedStepMatch[2]) {
      // Save previous step if exists
      if (currentStep && stepText.length > 0) {
        steps.push({
          position: currentStep.position || stepNumber,
          name: currentStep.name || '',
          text: stepText.join(' ').trim(),
          url: currentStep.url,
        });
      }

      // Start new step
      stepNumber = parseInt(numberedStepMatch[1], 10);
      currentStep = {
        position: stepNumber,
        name: numberedStepMatch[2].replace(/\*\*/g, '').trim(),
      };
      stepText = [];
      continue;
    }

    // Detect "Step X:" patterns
    const stepPatternMatch = line.match(/^(?:Step|STEP)\s+(\d+)[:\.]\s*(.+)$/i);
    if (stepPatternMatch && stepPatternMatch[1] && stepPatternMatch[2]) {
      if (currentStep && stepText.length > 0) {
        steps.push({
          position: currentStep.position || stepNumber,
          name: currentStep.name || '',
          text: stepText.join(' ').trim(),
          url: currentStep.url,
        });
      }

      stepNumber = parseInt(stepPatternMatch[1], 10);
      currentStep = {
        position: stepNumber,
        name: stepPatternMatch[2].replace(/\*\*/g, '').trim(),
      };
      stepText = [];
      continue;
    }

    // Detect headings that might be steps (### Step X: Name or ### X. Step Name)
    const headingStepMatch = line.match(/^###\s+(?:Step\s+)?(\d+)[:\.]\s*(.+)$/i);
    if (headingStepMatch && headingStepMatch[1] && headingStepMatch[2]) {
      if (currentStep && stepText.length > 0) {
        steps.push({
          position: currentStep.position || stepNumber,
          name: currentStep.name || '',
          text: stepText.join(' ').trim(),
          url: currentStep.url,
        });
      }

      stepNumber = parseInt(headingStepMatch[1], 10);
      currentStep = {
        position: stepNumber,
        name: headingStepMatch[2].replace(/\*\*/g, '').trim(),
      };
      stepText = [];
      continue;
    }

    // Collect text for current step
    if (currentStep && line && !line.startsWith('#') && !line.startsWith('##')) {
      // Clean markdown formatting
      const cleanLine = line
        .replace(/\*\*/g, '')
        .replace(/^- /, '')
        .trim();
      
      if (cleanLine) {
        stepText.push(cleanLine);
      }
    }

    // Check for links to price pages
    if (line.includes('gold/price-in') || line.includes('silver/price-in')) {
      const urlMatch = line.match(/(gold|silver|copper|platinum|palladium)\/price-in\/(\w+)/);
      if (urlMatch && currentStep) {
        currentStep.url = `${baseUrl}/${urlMatch[1]}/price-in/${urlMatch[2]}`;
      }
    }
  }

  // Add last step
  if (currentStep && stepText.length > 0) {
    steps.push({
      position: currentStep.position || stepNumber,
      name: currentStep.name || '',
      text: stepText.join(' ').trim(),
      url: currentStep.url,
    });
  }

  // If no numbered steps found, try to extract from list items
  if (steps.length === 0) {
    return extractStepsFromListItems(content, baseUrl, slug);
  }

  return steps;
}

/**
 * Extract steps from list items (fallback method)
 */
function extractStepsFromListItems(
  content: string,
  _baseUrl: string,
  _slug: string
): HowToStep[] {
  const steps: HowToStep[] = [];
  const lines = content.split('\n');
  let stepNumber = 0;

  // Look for sections that might contain steps
  const stepKeywords = [
    'step',
    'process',
    'method',
    'procedure',
    'guide',
    'way to',
    'how to',
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;
    
    // Check if line contains step keywords
    const hasStepKeyword = stepKeywords.some((keyword) =>
      line.toLowerCase().includes(keyword)
    );

    // Look for list items that might be steps
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const itemText = line.substring(2).trim();
      
      // Check if it's a step-like item
      if (hasStepKeyword || itemText.length > 20) {
        stepNumber++;
        const splitItem = itemText.split(':');
        steps.push({
          position: stepNumber,
          name: (splitItem[0] || itemText).replace(/\*\*/g, '').trim(),
          text: itemText.replace(/\*\*/g, '').trim(),
        });
      }
    }
  }

  return steps;
}
