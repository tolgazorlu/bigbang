import React from "react";
import Lottie from 'lottie-react';
import animationData from '../../../assets/lotties/infinity.json'

const Footer = () => {
  return (
    <footer className="footer p-10 text-base-content">
      <div>
        <Lottie className='w-24' animationData={animationData}/>
        <p>
          BIGBANG TEAM
          <br />
          Providing reliable tech since 1992
        </p>
      </div>
      <div>
        <span className="footer-title">Links</span>
        <a className="link link-hover">Home</a>
        <a className="link link-hover">Shop</a>
        <a className="link link-hover">About</a>
        <a className="link link-hover">Contact</a>
      </div>
      <div>
        <span className="footer-title">FAQ</span>
        <a className="link link-hover">Who are we?</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Help</a>
        <a className="link link-hover">Project</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
