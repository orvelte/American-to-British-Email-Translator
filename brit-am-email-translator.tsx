import React, { useState } from 'react';
import { Flag, Mail, Zap, Crown, Coffee } from 'lucide-react';

const BritAmEmailBridge = () => {
  const [britishEmail, setBritishEmail] = useState('');
  const [americanResponse, setAmericanResponse] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [britishLevel, setBritishLevel] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);

  const britishLevelLabels = [
    "Straight-Talk American",
    "Politely American", 
    "Diplomatically Neutral",
    "Charmingly British",
    "Queen's English"
  ];

  const generateEmail = async () => {
    if (!americanResponse.trim()) {
      alert('Please fill in your American response!');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Create a detailed prompt for Claude
      let prompt = `You are helping an American communicate more effectively with British colleagues via email. `;
      
      if (britishEmail.trim()) {
        prompt += `BRITISH EMAIL RECEIVED:
"${britishEmail}"

`;
      }
      
      prompt += `AMERICAN'S DRAFT RESPONSE:
"${americanResponse}"

BRITISH LEVEL SETTING: ${britishLevel}/4 (${britishLevelLabels[britishLevel]})

Please rewrite the American's response to be more culturally appropriate for British communication, considering:

Level 0-1: Minimal changes, just basic politeness
Level 2: More "please/thank you", gentle language  
Level 3: British understatement, self-deprecation, weather references
Level 4: Full British stereotype mode - MUST include a pub reference, mention of Guinness, and "God save the King" naturally worked into the email

Keep the core message intact but adjust the tone, add appropriate British communication patterns like:
- Understated language ("quite good" instead of "excellent")
- Self-deprecating humor where appropriate
- Polite hedging ("I wonder if we might...")
- Weather small talk if it fits
- For level 4: Creative but natural inclusion of pub/Guinness/monarchy references

Respond with ONLY the rewritten email, no explanations or formatting.`;

      const response = await window.claude.complete(prompt);
      setGeneratedEmail(response);
    } catch (error) {
      console.error('Error generating email:', error);
      setGeneratedEmail('Sorry, there was an error generating your email. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    alert('Email copied to clipboard!');
  };

  const clearAll = () => {
    setBritishEmail('');
    setAmericanResponse('');
    setGeneratedEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <Flag className="w-8 h-8 text-blue-200" />
            <Crown className="w-8 h-8 text-yellow-300" />
          </div>
          <p className="text-center text-2xl text-white font-semibold">
            Translate your American directness into British charm
          </p>
          <p className="text-center text-sm text-blue-100 mt-2 max-w-3xl mx-auto">
            Are you an American expat whose straightforward emails make your British coworkers visibly uncomfortable? This tool will help you master the art of saying absolutely nothing while sounding delightfully polite.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Email Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* British Email Input */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-600" />
              Original British Email <span className="text-sm font-normal text-gray-500">(Optional)</span>
            </h3>
            <textarea
              value={britishEmail}
              onChange={(e) => setBritishEmail(e.target.value)}
              placeholder="Paste the British email you received here (optional - helps provide context)..."
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* American Response Input */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-red-600" />
              Your American Response
            </h3>
            <textarea
              value={americanResponse}
              onChange={(e) => setAmericanResponse(e.target.value)}
              placeholder="Write your direct American response here..."
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* British-Meter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-blue-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <Coffee className="w-6 h-6 mr-2 text-amber-600" />
              British-Meter™
            </h2>
            <p className="text-gray-600">Adjust how British you want to sound</p>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="0"
              max="4"
              value={britishLevel}
              onChange={(e) => setBritishLevel(parseInt(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  #3b82f6 0%, 
                  #8b5cf6 25%, 
                  #ef4444 50%, 
                  #dc2626 75%, 
                  #991b1b 100%)`
              }}
            />
            {/* Tick marks */}
            <div className="absolute top-0 left-0 w-full h-3 pointer-events-none">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="absolute w-0.5 h-full bg-white opacity-70"
                  style={{ left: `${level * 25}%`, transform: 'translateX(-50%)' }}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              {[0, 1, 2, 3, 4].map((num) => (
                <span key={num} className="text-center">{num}</span>
              ))}
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-lg">🇺🇸</span>
              <span className="text-lg">🇬🇧</span>
            </div>
          </div>
          
          {/* British Level Descriptions */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Britishness Levels:</h4>
            <div className="space-y-2 text-sm">
              <div 
                className={`p-2 rounded cursor-pointer transition-colors ${britishLevel === 0 ? 'bg-blue-100 border-2 border-blue-400' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setBritishLevel(0)}
              >
                <span className="font-medium">Level 0 - Straight-Talk American:</span> Minimal changes, just basic politeness
              </div>
              <div 
                className={`p-2 rounded cursor-pointer transition-colors ${britishLevel === 1 ? 'bg-blue-100 border-2 border-blue-400' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setBritishLevel(1)}
              >
                <span className="font-medium">Level 1 - Politely American:</span> More "please" and "thank you"
              </div>
              <div 
                className={`p-2 rounded cursor-pointer transition-colors ${britishLevel === 2 ? 'bg-purple-100 border-2 border-purple-400' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setBritishLevel(2)}
              >
                <span className="font-medium">Level 2 - Diplomatically Neutral:</span> Gentle language and hedging
              </div>
              <div 
                className={`p-2 rounded cursor-pointer transition-colors ${britishLevel === 3 ? 'bg-red-100 border-2 border-red-400' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setBritishLevel(3)}
              >
                <span className="font-medium">Level 3 - Charmingly British:</span> Understatement, self-deprecation, weather mentions
              </div>
              <div 
                className={`p-2 rounded cursor-pointer transition-colors ${britishLevel === 4 ? 'bg-red-200 border-2 border-red-500' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setBritishLevel(4)}
              >
                <span className="font-medium">Level 4 - Queen's English:</span> Mandatory mentioning of pub, Guinness, and "God save the King!"
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <div className="text-xl font-semibold text-gray-800">
              Currently Selected: Level {britishLevel}
            </div>
            {britishLevel === 4 && (
              <div className="text-sm text-red-600 mt-1 font-medium">
                ⚠️ Maximum British mode activated!
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <button
            onClick={generateEmail}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center mx-auto"
          >
            <Zap className="w-5 h-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Diplomatic Email'}
          </button>
        </div>

        {/* Generated Email Output */}
        {generatedEmail && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Crown className="w-5 h-5 mr-2 text-green-600" />
                Your Diplomatic Email
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Copy
                </button>
                <button
                  onClick={clearAll}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">
                {generatedEmail}
              </pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-xs">
            A LivVelte 🐱 Artifact
          </p>
        </div>
      </div>
    </div>
  );
};

export default BritAmEmailBridge;