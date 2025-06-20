import React from 'react';
import { Brain, Zap, Search, CheckCircle, Target } from 'lucide-react';

interface LoadingSpinnerProps {
  stage: number;
}

const stages = [
  { icon: Search, text: 'Extracting and cleaning text from PDF...', color: 'text-blue-500' },
  { icon: Brain, text: 'Analyzing resume content with AI...', color: 'text-purple-500' },
  { icon: Target, text: 'Matching skills and calculating role fit...', color: 'text-orange-500' },
  { icon: Zap, text: 'Generating insights and recommendations...', color: 'text-green-500' }
];

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ stage }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Advanced AI Analysis in Progress
          </h3>
          <p className="text-gray-600">
            Our enhanced AI is performing deep analysis of your resume
          </p>
        </div>

        <div className="space-y-6">
          {stages.map((stageItem, index) => {
            const Icon = stageItem.icon;
            const isActive = index <= stage;
            const isCompleted = index < stage;
            
            return (
              <div
                key={index}
                className={`flex items-center space-x-4 transition-all duration-500 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                }`}
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative
                  ${isCompleted 
                    ? 'bg-green-100 text-green-600' 
                    : isActive 
                      ? `bg-opacity-20 ${stageItem.color.replace('text-', 'bg-').replace('-500', '-100')} ${stageItem.color}`
                      : 'bg-gray-100 text-gray-400'
                  }
                `}>
                  <Icon 
                    size={24} 
                    className={isActive && !isCompleted ? 'animate-pulse' : ''} 
                  />
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`font-medium transition-colors duration-300 ${
                    isActive ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {stageItem.text}
                  </p>
                  {isActive && !isCompleted && (
                    <div className="mt-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {isCompleted && (
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Complete
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-full rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-600">
              {Math.round(((stage + 1) / stages.length) * 100)}% Complete
            </p>
            <p className="text-xs text-gray-500">
              Stage {stage + 1} of {stages.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};