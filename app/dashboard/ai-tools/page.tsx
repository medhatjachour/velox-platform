/**
 * AI Tools Page
 * 
 * AI-powered content generation tools
 */

'use client';

import { useState } from 'react';
import { Sparkles, FileText, User, Wand2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState<'bio' | 'headline' | 'resume'>('bio');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [bioTone, setBioTone] = useState<'professional' | 'casual' | 'creative'>('professional');
  const [bioResult, setBioResult] = useState('');
  
  const [headlineInput, setHeadlineInput] = useState('');
  const [headlineSkills, setHeadlineSkills] = useState('');
  const [headlineResult, setHeadlineResult] = useState('');
  
  const [resumeText, setResumeText] = useState('');
  const [resumeResult, setResumeResult] = useState<any>(null);

  const handleGenerateBio = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/portfolios/temp/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bio',
          input: { text: bioInput, tone: bioTone }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBioResult(data.result);
      } else {
        alert('Failed to generate bio');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate bio');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateHeadline = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/portfolios/temp/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'headline',
          input: { 
            bio: headlineInput, 
            skills: headlineSkills.split(',').map(s => s.trim()).filter(Boolean)
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHeadlineResult(data.result);
      } else {
        alert('Failed to generate headline');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate headline');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleParseResume = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/portfolios/temp/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'resume-parse',
          input: { resumeText }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResumeResult(data.result);
      } else {
        alert('Failed to parse resume');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to parse resume');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Content Tools
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Generate professional content powered by AI
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('bio')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'bio'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <User className="w-4 h-4 inline mr-2" />
          Bio Generator
        </button>
        <button
          onClick={() => setActiveTab('headline')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'headline'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Wand2 className="w-4 h-4 inline mr-2" />
          Headline Generator
        </button>
        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'resume'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Resume Parser
        </button>
      </div>

      {/* Bio Generator */}
      {activeTab === 'bio' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Professional Bio</CardTitle>
              <CardDescription>
                Create a compelling bio from your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Experience
                </label>
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  placeholder="Describe your experience, skills, and what makes you unique..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tone
                </label>
                <select
                  value={bioTone}
                  onChange={(e) => setBioTone(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="creative">Creative</option>
                </select>
              </div>

              <Button 
                onClick={handleGenerateBio} 
                disabled={!bioInput.trim() || isGenerating}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Bio'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Bio</CardTitle>
              <CardDescription>
                Your AI-generated professional bio
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bioResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                      {bioResult}
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigator.clipboard.writeText(bioResult)}
                    variant="outline"
                    className="w-full"
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your generated bio will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Headline Generator */}
      {activeTab === 'headline' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Headline</CardTitle>
              <CardDescription>
                Create a catchy 60-character headline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Bio
                </label>
                <textarea
                  value={headlineInput}
                  onChange={(e) => setHeadlineInput(e.target.value)}
                  placeholder="Brief description of who you are..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={headlineSkills}
                  onChange={(e) => setHeadlineSkills(e.target.value)}
                  placeholder="React, Node.js, TypeScript, AWS"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <Button 
                onClick={handleGenerateHeadline} 
                disabled={!headlineInput.trim() || isGenerating}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Headline'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Headline</CardTitle>
              <CardDescription>
                Your AI-generated headline
              </CardDescription>
            </CardHeader>
            <CardContent>
              {headlineResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {headlineResult}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {headlineResult.length} characters
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigator.clipboard.writeText(headlineResult)}
                    variant="outline"
                    className="w-full"
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your generated headline will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resume Parser */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Parse Resume</CardTitle>
              <CardDescription>
                Extract structured data from your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resume Text
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white font-mono text-sm"
                />
              </div>

              <Button 
                onClick={handleParseResume} 
                disabled={!resumeText.trim() || isGenerating}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isGenerating ? 'Parsing...' : 'Parse Resume'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Extracted Data</CardTitle>
              <CardDescription>
                Structured information from your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resumeResult ? (
                <div className="space-y-4">
                  <div className="space-y-3 text-sm">
                    {resumeResult.name && (
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Name</p>
                        <p className="text-gray-900 dark:text-white">{resumeResult.name}</p>
                      </div>
                    )}
                    {resumeResult.email && (
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Email</p>
                        <p className="text-gray-900 dark:text-white">{resumeResult.email}</p>
                      </div>
                    )}
                    {resumeResult.skills && resumeResult.skills.length > 0 && (
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Skills</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {resumeResult.skills.map((skill: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Extracted data will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Usage Info */}
      <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="text-yellow-900 dark:text-yellow-100">
            AI Generation Quota
          </CardTitle>
          <CardDescription className="text-yellow-700 dark:text-yellow-300">
            Free Plan: 5 generations • Pro: 50 • Premium: Unlimited
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-900 dark:text-yellow-100">
            You have used 0 of 5 AI generations this month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
