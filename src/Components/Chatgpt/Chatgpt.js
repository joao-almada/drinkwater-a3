import React, { useState } from 'react';
import axios from 'axios';
import Bottleneck from 'bottleneck';
import styles from './Chatgpt.module.css';


const limiter = new Bottleneck({
  minTime: 10000,
  maxConcurrent: 1
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    if (isSending) return;

    setIsSending(true);
    const newMessages = [...messages, { text: inputText, user: true }];
    setMessages(newMessages);

    const cachedResponse = localStorage.getItem(inputText);
    if (cachedResponse) {
      setMessages([...newMessages, { text: cachedResponse, user: false }]);
      setInputText('');
      setIsSending(false);
      return;
    }

    const sendRequest = async (retryCount = 0) => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'Você é um assistente útil.' },
              ...newMessages.map(msg => ({
                role: msg.user ? 'user' : 'assistant',
                content: msg.text
              }))
            ],
            max_tokens: 300,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            },
          }
        );

        const chatResponse = response.data.choices[0].message.content.trim();
        localStorage.setItem(inputText, chatResponse);
        setMessages([...newMessages, { text: chatResponse, user: false }]);
        setInputText('');
        setIsSending(false);
      } catch (error) {
        console.error('Erro ao chamar a API do ChatGPT:', error.response ? error.response.data : error.message);
        
        if (error.response && error.response.status === 429) {
          console.warn('Received 429 Too Many Requests response.');
          
          if (retryCount < 3) {
            const delay = Math.pow(2, retryCount) * 1000;
            console.warn(`Retrying request in ${delay}ms...`);
            setTimeout(() => sendRequest(retryCount + 1), delay);
          } else {
            console.error('Reached maximum retry limit. Error:', error.response ? error.response.data : error.message);
            setIsSending(false);
          }
        } else if (error.response && error.response.data.code === 'insufficient_quota') {
          console.error('Insufficient quota:', error.response.data.message);
          setIsSending(false);
        } else {
          console.error('Unknown error:', error);
          setIsSending(false);
        }
      }
    };

    // Enfileirar a requisição no limitador
    limiter.schedule(() => sendRequest());
  };

  return (
    <div className={styles.main}>
      <div id={styles.chatWindow}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${message.user ? styles.userMessage : ''}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className={styles.form}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite sua mensagem..."
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={isSending}>Enviar</button>
      </form>
    </div>
  );
}

export default Chat;
