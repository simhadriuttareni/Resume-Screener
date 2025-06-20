import { ResumeAnalysis, JobRole } from '../types';

export const jobRoles: JobRole[] = [
  {
    id: 'frontend_dev',
    name: 'Frontend Developer',
    color: 'bg-blue-500',
    description: 'UI/UX focused development with modern frameworks'
  },
  {
    id: 'backend_dev',
    name: 'Backend Developer',
    color: 'bg-green-500',
    description: 'Server-side development and API design'
  },
  {
    id: 'data_scientist',
    name: 'Data Scientist',
    color: 'bg-purple-500',
    description: 'Machine learning and data analysis expertise'
  },
  {
    id: 'fullstack_dev',
    name: 'Full Stack Developer',
    color: 'bg-indigo-500',
    description: 'End-to-end application development'
  },
  {
    id: 'devops_engineer',
    name: 'DevOps Engineer',
    color: 'bg-orange-500',
    description: 'Infrastructure and deployment automation'
  },
  {
    id: 'mobile_dev',
    name: 'Mobile Developer',
    color: 'bg-pink-500',
    description: 'iOS and Android application development'
  },
  {
    id: 'ml_engineer',
    name: 'ML Engineer',
    color: 'bg-red-500',
    description: 'Machine learning model deployment and optimization'
  },
  {
    id: 'security_engineer',
    name: 'Security Engineer',
    color: 'bg-gray-700',
    description: 'Cybersecurity and system protection'
  }
];

const skillKeywords = {
  frontend_dev: [
    'react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 
    'tailwind', 'bootstrap', 'sass', 'webpack', 'vite', 'next.js', 'nuxt',
    'redux', 'mobx', 'styled-components', 'material-ui', 'chakra-ui'
  ],
  backend_dev: [
    'node.js', 'express', 'python', 'django', 'flask', 'java', 'spring', 
    'php', 'laravel', 'ruby', 'rails', 'api', 'rest', 'graphql', 'mongodb',
    'postgresql', 'mysql', 'redis', 'elasticsearch', 'microservices'
  ],
  data_scientist: [
    'python', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 
    'jupyter', 'sql', 'statistics', 'machine learning', 'deep learning',
    'matplotlib', 'seaborn', 'plotly', 'r', 'tableau', 'power bi', 'spark'
  ],
  fullstack_dev: [
    'mern', 'mean', 'lamp', 'django', 'rails', 'full stack', 'end-to-end',
    'front-end', 'back-end', 'javascript', 'typescript', 'python', 'java',
    'react', 'node.js', 'express', 'mongodb', 'postgresql'
  ],
  devops_engineer: [
    'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'ci/cd', 
    'terraform', 'ansible', 'linux', 'bash', 'git', 'gitlab', 'github actions',
    'prometheus', 'grafana', 'elk stack', 'nginx', 'apache'
  ],
  mobile_dev: [
    'swift', 'kotlin', 'react native', 'flutter', 'ios', 'android', 
    'xcode', 'android studio', 'mobile', 'objective-c', 'dart',
    'xamarin', 'ionic', 'cordova', 'firebase'
  ],
  ml_engineer: [
    'tensorflow', 'pytorch', 'scikit-learn', 'keras', 'mlflow', 'kubeflow',
    'docker', 'kubernetes', 'python', 'spark', 'airflow', 'mlops',
    'model deployment', 'feature engineering', 'model monitoring'
  ],
  security_engineer: [
    'cybersecurity', 'penetration testing', 'vulnerability assessment',
    'security audit', 'firewall', 'encryption', 'ssl', 'oauth', 'jwt',
    'owasp', 'nmap', 'wireshark', 'metasploit', 'burp suite'
  ]
};

// Enhanced skill extraction with comprehensive keyword matching
export const extractSkills = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const allSkills = Object.values(skillKeywords).flat();
  
  const foundSkills = allSkills.filter(skill => {
    // Check for exact matches and variations
    const skillLower = skill.toLowerCase();
    return lowerText.includes(skillLower) || 
           lowerText.includes(skillLower.replace(/[.\-]/g, '')) ||
           lowerText.includes(skillLower.replace(/\s+/g, ''));
  });
  
  // Remove duplicates and return unique skills
  return [...new Set(foundSkills)].slice(0, 12);
};

// Get top N role predictions with confidence scores
export const getTopPredictions = (text: string, topN: number = 3) => {
  const lowerText = text.toLowerCase();
  
  // Calculate role scores based on keyword matching with weighted scoring
  const roleScores = Object.entries(skillKeywords).map(([role, keywords]) => {
    let score = 0;
    let matchedKeywords = 0;
    
    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      const matches = (lowerText.match(new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g')) || []).length;
      if (matches > 0) {
        score += matches * (keyword.length > 5 ? 2 : 1); // Weight longer, more specific keywords higher
        matchedKeywords++;
      }
    });
    
    // Bonus for keyword diversity
    const diversityBonus = matchedKeywords > 3 ? matchedKeywords * 0.5 : 0;
    score += diversityBonus;
    
    return { role, score, matchedKeywords };
  });
  
  // Sort by score and get top N
  roleScores.sort((a, b) => b.score - a.score);
  
  // Calculate confidence scores
  const totalScore = roleScores.reduce((sum, item) => sum + item.score, 0);
  
  return roleScores.slice(0, topN).map(({ role, score, matchedKeywords }) => {
    const roleData = jobRoles.find(r => r.id === role) || jobRoles[0];
    let confidence = totalScore > 0 ? (score / totalScore) * 100 : 0;
    
    // Ensure minimum confidence and add some randomness for realism
    if (confidence < 15) confidence = 15 + Math.random() * 10;
    if (confidence > 95) confidence = 90 + Math.random() * 5;
    
    return {
      role: roleData.name,
      roleId: role,
      confidence: Math.round(confidence),
      matchedKeywords,
      color: roleData.color,
      description: roleData.description
    };
  });
};

export const analyzeResume = async (text: string): Promise<ResumeAnalysis> => {
  // Simulate API delay with realistic processing time
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Get top predictions
  const topPredictions = getTopPredictions(text, 3);
  const bestMatch = topPredictions[0];
  
  // Extract skills
  const skills = extractSkills(text);
  
  // Enhanced experience extraction
  const experiencePatterns = [
    /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp)/i,
    /(?:experience|exp).*?(\d+)\+?\s*(?:years?|yrs?)/i,
    /(\d+)\+?\s*(?:years?|yrs?)\s*(?:in|with|as)/i
  ];
  
  let experience = 'Experience level not clearly specified';
  for (const pattern of experiencePatterns) {
    const match = text.match(pattern);
    if (match) {
      const years = parseInt(match[1]);
      if (years > 0) {
        experience = `${years}+ years of professional experience`;
        break;
      }
    }
  }
  
  // Enhanced education extraction
  const educationKeywords = [
    'bachelor', 'master', 'phd', 'doctorate', 'degree', 'university', 
    'college', 'institute', 'certification', 'diploma', 'mba', 'ms', 'bs'
  ];
  
  const educationMatches = educationKeywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
  
  let education = 'Education details not found';
  if (educationMatches.length > 0) {
    if (educationMatches.some(match => ['phd', 'doctorate'].includes(match.toLowerCase()))) {
      education = 'Doctoral degree (PhD) background';
    } else if (educationMatches.some(match => ['master', 'mba', 'ms'].includes(match.toLowerCase()))) {
      education = 'Master\'s degree background';
    } else if (educationMatches.some(match => ['bachelor', 'bs'].includes(match.toLowerCase()))) {
      education = 'Bachelor\'s degree background';
    } else {
      education = 'Higher education/certification background detected';
    }
  }
  
  return {
    role: bestMatch.role,
    confidence: bestMatch.confidence,
    skills,
    experience,
    education,
    topPredictions,
    matchedKeywords: bestMatch.matchedKeywords
  };
};