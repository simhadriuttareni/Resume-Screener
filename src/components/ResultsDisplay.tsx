import React from 'react';
import { ResumeAnalysis } from '../types';
import { Brain, Award, BookOpen, Briefcase, TrendingUp, Star, Target, Zap, Users } from 'lucide-react';

interface ResultsDisplayProps {
  analysis: ResumeAnalysis;
  extractedText: string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ analysis, extractedText }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-gradient-to-r from-green-400 to-green-600';
    if (confidence >= 60) return 'bg-gradient-to-r from-orange-400 to-orange-600';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return 'Excellent Match';
    if (confidence >= 60) return 'Good Match';
    if (confidence >= 40) return 'Moderate Match';
    return 'Potential Match';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Main Result Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
              <p className="text-gray-600">Advanced AI-powered resume screening results</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getConfidenceColor(analysis.confidence)}`}>
              <Star className="w-4 h-4 mr-1" />
              {analysis.confidence}% - {getConfidenceLabel(analysis.confidence)}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Best Matching Role
            </h3>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <h4 className="text-2xl font-bold text-purple-900 mb-3">{analysis.role}</h4>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Confidence Score</span>
                  <span className="font-medium">{analysis.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${getConfidenceBarColor(analysis.confidence)}`}
                    style={{ width: `${analysis.confidence}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {analysis.matchedKeywords || 0} keywords matched
                </div>
                <div className="flex items-center text-blue-600">
                  <Target className="w-4 h-4 mr-1" />
                  Primary match
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                Experience Level
              </h4>
              <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{analysis.experience}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                Education Background
              </h4>
              <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{analysis.education}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Predictions */}
      {analysis.topPredictions && analysis.topPredictions.length > 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-600" />
            Top Role Matches
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {analysis.topPredictions.map((prediction, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 border-2 transition-all duration-200 hover:shadow-md ${
                  index === 0 
                    ? 'border-purple-200 bg-purple-50' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{prediction.role}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    index === 0 ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    #{index + 1}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Match</span>
                    <span className="font-medium">{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-purple-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600">{prediction.description}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {prediction.matchedKeywords} keywords matched
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Skills Section */}
      {analysis.skills.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-600" />
            Detected Skills & Technologies
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({analysis.skills.length} found)
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium hover:from-blue-200 hover:to-indigo-200 transition-all duration-200 cursor-default border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
          {analysis.skills.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Zap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No technical skills detected. Consider adding more specific keywords to your resume.</p>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Text Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resume Content Preview
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
            {extractedText.slice(0, 2000)}
            {extractedText.length > 2000 && (
              <span className="text-gray-500">
                ... ({extractedText.length - 2000} more characters)
              </span>
            )}
          </pre>
        </div>
        <div className="mt-3 text-xs text-gray-500 flex justify-between">
          <span>Total characters: {extractedText.length.toLocaleString()}</span>
          <span>Words: {extractedText.split(/\s+/).length.toLocaleString()}</span>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Improvement Suggestions
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          {analysis.confidence < 70 && (
            <p>• Consider adding more specific technical keywords related to your target role</p>
          )}
          {analysis.skills.length < 5 && (
            <p>• Include more technical skills and tools you've worked with</p>
          )}
          {!analysis.experience.includes('years') && (
            <p>• Clearly mention your years of experience in your field</p>
          )}
          {analysis.education === 'Education details not found' && (
            <p>• Add your educational background and relevant certifications</p>
          )}
          <p>• Use action verbs and quantify your achievements where possible</p>
        </div>
      </div>
    </div>
  );
};