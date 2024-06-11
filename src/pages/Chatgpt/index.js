import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header'
import styles from './Chatgpt.module.css'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: inputText,
        max_tokens: 50,
        n: 1,
        stop: '\n',
      }, {
        headers: {
          Authorization: 'Bearer SUA_CHAVE_DE_API_DO_OPENAI',
        },
      });

      const chatGptResponse = response.data.choices[0].text;
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setMessages([...messages, { text: chatGptResponse, sender: 'chatgpt' }]);
      setInputText('');
    } catch (error) {
      console.error('Erro ao enviar mensagem para o ChatGPT:', error);
    }
  };

  return (
    <>
    <Header />
    <div className={styles.container}>
      <div className={styles.chat_container}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.input_container}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button className={styles.buttonz} onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
    </>
  );
};

export default Chat;
