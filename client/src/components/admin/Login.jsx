import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import './Login.css';

function Login() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'SYSTEM BOOT: v4.2.0-CRAZY-EDITION' },
    { type: 'system', content: 'Authorizing connection to the void...' },
    { type: 'system', content: 'Hello identity. May I know your name?', question: true }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const addLine = (content, type = 'system', delay = 500) => {
    return new Promise(resolve => {
      setIsTyping(true);
      setTimeout(() => {
        setHistory(prev => [...prev, { type, content }]);
        setIsTyping(false);
        resolve();
      }, delay);
    });
  };

  const handleCommand = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userInp = input;
    setInput('');
    setHistory(prev => [...prev, { type: 'user', content: userInp }]);

    if (step === 0) {
      setName(userInp);
      setStep(1);
      await addLine(`Ah, ${userInp}. I've seen your name in the ancient prophecy. Or was it a spam folder? Anyway...`);
      await addLine("Question 2: If a pizza has 8 slices and you eat the box, are you still a valid user?", "system", 800);
    } 
    else if (step === 1) {
      setStep(2);
      await addLine("Fascinating. Your digestive logic exceeds my silicon expectations.");
      await addLine("Question 3: Quick! The reactor is melting. Do you fix it with code or by turning it off and on again?", "system", 800);
    }
    else if (step === 2) {
      setStep(3);
      await addLine("Classic move. The universe is now rebooting in safe mode...");
      await addLine("FINAL GATE: The void requires proof of divinity. Enter the secret key or be formatted:", "system", 1000);
    }
    else if (step === 3) {
      try {
        const res = await api.post('/auth/login', { username: 'admin', password: userInp });
        localStorage.setItem('token', res.data.token);
        await addLine("ACCESS GRANTED. Redirecting to your digital throne...", "success");
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } catch (err) {
        await addLine("INVALID DIVINITY. Try again or face eternal 404s:", "error");
      }
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">admin@void:~</div>
      </div>
      <div className="terminal-body" onClick={() => document.getElementById('term-input').focus()}>
        {history.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.type === 'user' ? <span className="prompt">$ </span> : <span className="prompt">{'>>'} </span>}
            <span className="content">{line.content}</span>
          </div>
        ))}
        {isTyping && <div className="terminal-line system"><span className="prompt">{'>>'} </span><span className="typing-dots">...</span></div>}
        <form onSubmit={handleCommand} className="terminal-input-line">
          <span className="prompt">$ </span>
          <input
            id="term-input"
            autoFocus
            type={step === 3 ? "password" : "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            disabled={isTyping}
          />
          <span className="cursor">_</span>
        </form>
        <div ref={terminalEndRef} />
      </div>
      <div className="terminal-footer">
        <Link to="/" className="terminal-back">← ESCAPE_TO_REALITY</Link>
      </div>
    </div>
  );
}

export default Login;
