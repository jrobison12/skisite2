import React from 'react';

type DifficultyLevel = 'green' | 'blue' | 'black' | 'double-black' | 'various';

interface DifficultyIconProps {
  difficulty: DifficultyLevel;
  className?: string;
}

const DifficultyIcon: React.FC<DifficultyIconProps> = ({ difficulty, className = '' }) => {
  const baseClass = 'inline-block mr-2';
  const combinedClass = `${baseClass} ${className}`;

  switch (difficulty) {
    case 'green':
      return (
        <svg className={combinedClass} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#008000" />
        </svg>
      );
    case 'blue':
      return (
        <svg className={combinedClass} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" fill="#0000FF" />
        </svg>
      );
    case 'black':
      return (
        <svg className={combinedClass} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L22 20H2L12 2Z" fill="#000000" />
        </svg>
      );
    case 'double-black':
      return (
        <div className={`${combinedClass} flex gap-0.5`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L22 20H2L12 2Z" fill="#000000" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L22 20H2L12 2Z" fill="#000000" />
          </svg>
        </div>
      );
    case 'various':
      return (
        <div className={`${combinedClass} flex gap-0.5`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" fill="#0000FF" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L22 20H2L12 2Z" fill="#000000" />
          </svg>
        </div>
      );
  }
};

export default DifficultyIcon; 