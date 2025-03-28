'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import stompItLogo from '../images/channels4_profile.jpg';

const tips = [
  {
    title: "Beginner Fundamentals",
    description: "Master these essential techniques to build a strong foundation:",
    bullets: [
      "Perfect the 'pizza' stance for speed control and stopping",
      "Practice weight shifting from ski to ski on gentle slopes",
      "Keep your upper body facing downhill while turning",
      "Maintain a shoulder-width stance for better balance",
      "Look ahead, not down at your skis, to anticipate terrain"
    ],
    videoId: "_yfFGDuJ2g0" // Stomp It Tutorials - How to Ski | 10 Beginner Skills
  },
  {
    title: "Intermediate Techniques",
    description: "Progress your skills with these key techniques:",
    bullets: [
      "Transition from wedge turns to parallel skiing",
      "Practice pole planting to time and initiate turns",
      "Keep your hands forward and in view while skiing",
      "Learn to control speed with turn shape instead of sliding",
      "Begin carving by engaging your ski edges more aggressively"
    ],
    videoId: "8j-aD8F_T3s" // Intermediate skiing tutorial
  },
  {
    title: "Advanced Skills",
    description: "Refine your technique and tackle challenging terrain:",
    bullets: [
      "Master short-radius turns for steep terrain control",
      "Practice skiing switch (backwards) on gentle slopes",
      "Learn to absorb moguls by flexing and extending legs",
      "Develop edge control for variable snow conditions",
      "Work on dynamic parallel turns at higher speeds"
    ],
    videoId: "LsdRTUdx2U0" // Advanced skiing tutorial
  },
  {
    title: "Expert Progression",
    description: "Push your limits and perfect advanced techniques:",
    bullets: [
      "Master powder skiing techniques with wider skis",
      "Perfect jump turns for very steep terrain",
      "Learn to ski fall-line in moguls",
      "Practice carved turns at high speeds",
      "Develop quick-transition edge changes for ice and hardpack"
    ],
    videoId: "j34EleIivsY" // Stomp It Tutorials - How to Carve on Skis | 3 Expert Skills
  },
  {
    title: "Training Tips",
    description: "Improve your skiing through targeted practice:",
    bullets: [
      "Start each day with easy runs to warm up",
      "Practice one specific skill at a time",
      "Film yourself skiing to analyze technique",
      "Take lessons to break through skill plateaus",
      "Cross-train with balance and leg strength exercises"
    ],
    videoId: "E00SbnOTPEU" // Training tips tutorial
  },
  {
    title: "Safety & Form",
    description: "Maintain proper form and stay safe while improving:",
    bullets: [
      "Keep your weight centered over your skis",
      "Bend knees and ankles to stay flexible",
      "Maintain athletic stance with hands forward",
      "Look ahead to anticipate terrain changes",
      "Always control speed relative to ability and conditions"
    ],
    videoId: "z-E522xhc4M" // Safety and form tutorial
  }
];

const VideoEmbed = ({ videoId, title }: { videoId: string; title: string }) => {
  return (
    <div className="mb-6 relative pb-[56.25%] h-0 bg-gray-100 rounded-lg overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&showinfo=0&rel=0`}
        title={`${title} Tutorial`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default function SkiingTips() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {tips.map((tip) => (
          <div key={tip.title} className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 ring-2 ring-blue-500">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">{tip.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{tip.description}</p>
            <VideoEmbed videoId={tip.videoId} title={tip.title} />
            <ul className="space-y-3">
              {tip.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3 flex-shrink-0">•</span>
                  <span className="text-gray-700 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-8 mb-12 ring-2 ring-blue-500">
        <div className="flex items-center space-x-6">
          <a 
            href="https://www.youtube.com/@StompItTutorials"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 hover:opacity-90 transition-opacity"
          >
            <Image 
              src={stompItLogo}
              alt="Stomp It Tutorials Logo"
              width={96}
              height={96}
              className="rounded-full shadow-md"
            />
          </a>
          <div className="flex-grow">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">Video Credits</h4>
            <p className="text-gray-700">
              All skiing tutorial videos are provided by Stomp It Tutorials, an excellent resource for skiers of all levels. 
              Their educational content and informative approach have helped countless people improve their skiing skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 