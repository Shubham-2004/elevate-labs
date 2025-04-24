const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const groqClient = new Groq({
  apiKey: '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',
});

// Function to format responses
function formatResponse(result) {
  return result
    .split('\n')
    .map(line => {
      line = line.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');
      line = line.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
      return `<li>${line}</li>`;
    })
    .join('');
}

// Endpoint for validating startup ideas
app.post('/api/validate-idea', async (req, res) => {
  const { idea, step } = req.body;
  if (!idea || !step) {
    return res.status(400).json({ error: 'Both "idea" and "step" are required' });
  }
  try {
    let prompt;
    switch (step) {
      case 1:
        prompt = `Describe the problem that your startup idea "${idea}" solves.`;
        break;
      case 2:
        prompt = `Who is the target audience for your startup idea "${idea}"? Be specific about demographics, behaviors, and needs.`;
        break;
      case 3:
        prompt = `Estimate the market size for your startup idea "${idea}". How many potential customers exist?`;
        break;
      case 4:
        prompt = `What are the main competitors for your startup idea "${idea}"? How does your solution differ from them?`;
        break;
      case 5:
        prompt = `How do you plan to monetize your startup idea "${idea}"? What is your pricing model?`;
        break;
      default:
        return res.status(400).json({ error: 'Invalid step number. Please provide a step between 1 and 5.' });
    }

    const chatCompletion = await groqClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    const result = chatCompletion.choices[0]?.message?.content || 'No response';
    const formattedResult = formatResponse(result);
    res.json({
      step: step,
      question: prompt,
      response: `<ul>${formattedResult}</ul>`
    });
  } catch (error) {
    console.error('Error generating validation feedback:', error);
    res.status(500).json({ error: 'Failed to validate idea' });
  }
});
// Endpoint for generating financial projections
app.post('/api/financial-projections', async (req, res) => {
  const { idea } = req.body;
  if (!idea) {
    return res.status(400).json({ error: 'Startup idea is required' });
  }

  try {
    // Generate prompt for financial projections
    const prompt = `Provide detailed financial projections for "${idea}" including:
      - Revenue projections for Year 1, Year 2, and Year 3.
      - Initial investment required.
      - Monthly operational costs.
      - Profit/Loss for each year.
      Format the response as plain text with clear headings and bullet points.`;

    const chatCompletion = await groqClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    let responseText = chatCompletion.choices[0]?.message?.content || 'No response';

    // Enhance the response with bold and italic formatting markers
    responseText = responseText
      .replace(/Revenue Projections:/g, '**Revenue Projections:**\n')
      .replace(/Expenses:/g, '**Expenses:**\n')
      .replace(/Profit\/Loss:/g, '**Profit/Loss:**\n')
      .replace(/Year \d:/g, '*Year $&*\n'); // Italicize "Year X:"

    res.send(responseText);
  } catch (error) {
    console.error('Error generating financial projections:', error);
    res.status(500).json({ error: 'Failed to generate financial projections' });
  }
});

// Endpoint for generating market insights
app.post('/api/market-insights', async (req, res) => {
  const { idea } = req.body;
  if (!idea) {
    return res.status(400).json({ error: 'Startup idea is required' });
  }
  try {
    // Generate prompts for market insights
    const prompts = [
      `What are the main competitors for your startup idea "${idea}"?`,
      `How can "${idea}" scale effectively? Suggest strategies for growth and assign a priority score (out of 100) to each strategy in the format "Strategy Name: Priority Score". Ensure each strategy name is no more than 3 words.`,
      `What external features or integrations could enhance "${idea}"? Assign an importance score (out of 100) to each feature in the format "Feature Name: Importance Score". Ensure each feature name is no more than 3 words.`
    ];

    // Fetch responses from the AI model
    const insights = await Promise.all(
      prompts.map(async (prompt) => {
        const chatCompletion = await groqClient.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'llama3-70b-8192',
          temperature: 1,
          max_completion_tokens: 1024,
          top_p: 1,
          stream: false,
          stop: null
        });
        return chatCompletion.choices[0]?.message?.content || 'No response';
      })
    );

    // Parse and structure the insights
    const formattedInsights = {
      competitors: parseCompetitors(insights[0]),
      scalingStrategies: parseScalingStrategies(insights[1]),
      externalFeatures: parseExternalFeatures(insights[2])
    };

    // Return the insights as JSON
    res.json(formattedInsights);
  } catch (error) {
    console.error('Error generating market insights:', error);
    res.status(500).json({ error: 'Failed to generate market insights' });
  }
});

// Helper function to parse competitors
function parseCompetitors(response) {
  const regex = /(\w.+?)\s*:\s*(\d+)%/g; // Extract company names and market shares
  const matches = [...response.matchAll(regex)];
  return matches.map(match => ({
    name: match[1].trim(),
    marketShare: parseInt(match[2])
  }));
}

// Helper function to parse scaling strategies
function parseScalingStrategies(response) {
  const regex = /(\w.+?)\s*:\s*(\d+)/g; // Extract strategy names and priority scores
  const matches = [...response.matchAll(regex)];
  return matches.map(match => {
    const strategyName = match[1].trim();
    const truncatedStrategyName = strategyName.split(' ').slice(0, 3).join(' '); // Limit to 3 words
    return {
      strategy: truncatedStrategyName,
      priority: parseInt(match[2])
    };
  });
}

// Helper function to parse external features
function parseExternalFeatures(response) {
  const regex = /(\w.+?)\s*:\s*(\d+)/g; // Extract feature names and importance scores
  const matches = [...response.matchAll(regex)];
  return matches.map(match => {
    const featureName = match[1].trim();
    const truncatedFeatureName = featureName.split(' ').slice(0, 3).join(' '); // Limit to 3 words
    return {
      feature: truncatedFeatureName,
      importance: parseInt(match[2])
    };
  });
}

// Endpoint for generating a basic landing page
app.post('/api/generate-landing-page', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  try {
    const chatCompletion = await groqClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Generate a fully responsive, modern landing page as a single HTML file with embedded CSS and JavaScript based on the following description: "${prompt}".
Requirements:
Header: A navigation bar with a flexbox layout containing multiple links.
Main Content:
A hero section with a compelling headline and a call-to-action button.
A features grid showcasing key aspects related to "${prompt}".
Use relevant images sourced from the internet.
Footer: Includes social media links and copyright information.
Design Principles:
Dark mode theme with a black or deep gray background.
White and colorful foreground elements for high visibility and contrast.
Clean typography and a modern, professional color scheme with vibrant gradients.
Avoid white text on light backgrounds and ensure good readability.
Responsiveness: Ensure proper layout adjustments for mobile, tablet, and desktop using CSS Flexbox/Grid and media queries.
Provide the entire output as a single HTML file with all CSS and JavaScript embedded inline. No external stylesheets or scripts. Do not include any additional notes or explanations—only the complete code.`
        }
      ],
      model: 'llama3-70b-8192',
      temperature: 1,
      max_completion_tokens: 2096,
      top_p: 1,
      stream: false,
      stop: null
    });

    const result = chatCompletion.choices[0]?.message?.content || 'No response';
    res.json({ landingPageCode: result });
  } catch (error) {
    console.error('Error generating landing page:', error);
    res.status(500).json({ error: 'Failed to generate landing page' });
  }
});

// Risk Analysis API Endpoint
app.post('/api/risk-analysis', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const chatCompletion = await groqClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Generate a Risk Analysis of the following description: "${prompt}". Provide a detailed breakdown of potential risks, their likelihood, and mitigation strategies. Format the output with bold headers, italicized descriptions, and proper spacing.`,
        },
      ],
      model: 'llama3-70b-8192', // Replace with your desired model
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    let result = chatCompletion.choices[0]?.message?.content || 'No response';

    // Add formatting enhancements (if not already done by the model)
    result = result
      .replace(/Potential Risks:/gi, '**Potential Risks:**')
      .replace(/Likelihood:/gi, '**Likelihood:**')
      .replace(/Mitigation Strategies:/gi, '**Mitigation Strategies:**')
      .replace(/Description:/gi, '*Description:*');

    res.status(200).json({ riskAnalysis: result });
  } catch (error) {
    console.error('Error generating risk analysis:', error);
    res.status(500).json({ error: 'Failed to generate risk analysis' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
