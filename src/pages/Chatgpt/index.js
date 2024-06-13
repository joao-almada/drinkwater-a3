import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import styles from './Chatgpt.module.css';
import Chatgpt from '../../Components/Chatgpt/Chatgpt';



const Chatbot = () => {
  return (
    <>
      <Header />
      <Chatgpt />
    </>
  );
};

export default Chatbot;

