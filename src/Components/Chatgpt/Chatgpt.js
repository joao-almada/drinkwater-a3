import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { throttle } from 'lodash';
import styles from './Chatgpt.module.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

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
            max_tokens: 50,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            },
          }
        );

        const chatResponse = response.data.choices[0].message.content.trim();
        localStorage.setItem(inputText, chatResponse);  // Cache the response
        setMessages([...newMessages, { text: chatResponse, user: false }]);
        setInputText('');
        setIsSending(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          if (retryCount < 3) {
            const delay = Math.pow(2, retryCount) * 10000;
            console.warn(`Retrying request in ${delay}ms...`);
            setTimeout(() => sendRequest(retryCount + 1), delay);
          } else {
            console.error('Reached maximum retry limit. Error:', error.response ? error.response.data : error.message);
            setIsSending(false);
          }
        } else {
          console.error('Erro ao chamar a API do ChatGPT:', error.response ? error.response.data : error.message);
          setIsSending(false);
        }
      }
    };

    sendRequest();
  };

  const throttledHandleSendMessage = useCallback(throttle(handleSendMessage, 10000), [inputText, messages]);

  return (
    <div className={styles.main}>
      <div id={styles.chatWindow}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${message.user ? styles.userMessage : ''}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={throttledHandleSendMessage} className={styles.form}>
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
