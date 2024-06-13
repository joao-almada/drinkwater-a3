import React, { useState } from 'react';
import axios from 'axios';
import styles from './Chatgpt.module.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    if (inputText.trim() === '') return;

    // Adiciona a mensagem do usuário
    const newMessages = [...messages, { text: inputText, user: true }];
    setMessages(newMessages);

    // Chame a API do ChatGPT com a mensagem do usuário
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // ou 'gpt-4' dependendo do modelo que você tem acesso
          messages: [
            { role: 'system', content: 'Você é um assistente útil.' },
            ...newMessages.map(msg => ({
              role: msg.user ? 'user' : 'assistant',
              content: msg.text
            }))
          ],
          max_tokens: 50, // Limite o tamanho da resposta
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-BeLCcsciWSQQMREh7FPyT3BlbkFJ2v3SwXYoxJvJiLd0OcWU`,
          },
        }
      );

      const chatResponse = response.data.choices[0].message.content.trim();
      setMessages([...newMessages, { text: chatResponse, user: false }]);
      setInputText('');
    } catch (error) {
      console.error('Erro ao chamar a API do ChatGPT:', error);
    }
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
        <button type="submit" className={styles.button}>Enviar</button>
      </form>
    </div>
  );
}

export default Chat;
