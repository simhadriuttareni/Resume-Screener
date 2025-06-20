import React, { useState } from 'react';
import { Brain, Sparkles, BarChart3, Users } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ResultsDisplay } from './components/ResultsDisplay';
import { extractTextFromPDF } from './utils/pdfExtractor';
import { analyzeResume } from './utils/mlSimulator';
import { ResumeAnalysis } from './types';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [analysisStage, setAnalysisStage] = useState(0);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    setAnalysisStage(0);

    try {
      // Stage 1: Extract text
      setAnalysisStage(0);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const text = await extractTextFromPDF(file);
      setExtractedText(text);

      // Stage 2: Analyze content
      setAnalysisStage(1);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Stage 3: Match skills
      setAnalysisStage(2);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Stage 4: Generate insights
      setAnalysisStage(3);
      const result = await analyzeResume(text);
      
      setAnalysis(result);
    } catch (error) {
      console.error('Error processing resume:', error);
      // Handle error state here
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setExtractedText('');
    setIsAnalyzing(false);
    setAnalysisStage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Resume Screener
                </h1>
                <p className="text-sm text-gray-600">Intelligent resume analysis powered by AI</p>
              </div>
            </div>
            
            {analysis && (
              <button
                onClick={resetAnalysis}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
              >
                Analyze New Resume
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAnalyzing && !analysis && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center animate-pulse" style={{animationDelay: '0.2s'}}>
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center animate-pulse" style={{animationDelay: '0.4s'}}>
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Discover Your Perfect
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Career Match
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Upload your resume and let our advanced AI analyze your skills, experience, and qualifications 
                to find the perfect job role match with detailed insights and confidence scoring.
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
                  <p className="text-gray-600 text-sm">Advanced machine learning algorithms analyze your resume content</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Detailed Insights</h3>
                  <p className="text-gray-600 text-sm">Get comprehensive analysis with confidence scores and skill matching</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Role Matching</h3>
                  <p className="text-gray-600 text-sm">Find the best-fitting job roles based on your unique profile</p>
                </div>
              </div>
            </div>

            <FileUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
          </>
        )}

        {isAnalyzing && (
          <LoadingSpinner stage={analysisStage} />
        )}

        {analysis && !isAnalyzing && (
          <ResultsDisplay analysis={analysis} extractedText={extractedText} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 AI Resume Screener. Built with React, TypeScript, and Tailwind CSS.</p>
            <p className="text-sm mt-2">Secure, fast, and intelligent resume analysis.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;