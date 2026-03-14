import { useState, useEffect } from 'react';
import api from '../api';
import './Connect.css';
import { useReveal } from '../hooks/useReveal';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { FaEnvelope, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';

const getIcon = (iconName) => {
  const allIcons = { ...FaIcons, ...SiIcons };
  const Icon = allIcons[iconName];
  return Icon ? <Icon /> : <FaIcons.FaLink />;
};

function Connect({ general }) {
  return (
    <section className="connect" id="connect">
      <div className="connect__bg-structural">
        <div className="connect__grid" />
      </div>

      <div className="connect__inner">
        <div className="connect__layout">
          <div className="connect__col-left">
            <h2 className="connect__title">
              LET'S BUILD <br />
              <span className="accent-txt">FUTURE_READY</span> SOLUTIONS
            </h2>

            <div className="connect__links-grid">
              <div className="connect__links-stack">
                <a href={`mailto:${general?.email || 'shashankkmofficial@gmail.com'}`} className="connect__link-item">
                  <FaEnvelope /> EMAIL
                </a>
                <a href={general?.linkedin || 'https://linkedin.com/in/shashank20003'} target="_blank" rel="noopener noreferrer" className="connect__link-item">
                  <FaLinkedin /> LINKEDIN
                </a>
                <a href={general?.github || 'https://github.com/Shashanklko'} target="_blank" rel="noopener noreferrer" className="connect__link-item">
                  <FaGithub /> GITHUB
                </a>
                {general?.customLinkName && general?.customLinkUrl && (
                  <a href={general.customLinkUrl} target="_blank" rel="noopener noreferrer" className="connect__link-item">
                    {getIcon(general.customLinkIcon)} {general.customLinkName.toUpperCase()}
                  </a>
                )}
              </div>

              <div className="connect__resume-side">
                <a href={general?.resumeUrl || "#"} target="_blank" rel="noopener noreferrer" className="connect__link-item resume-link-reversed">
                  RESUME <FaFileDownload />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Connect;
