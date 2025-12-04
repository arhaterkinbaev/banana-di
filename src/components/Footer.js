import React from 'react';

const Footer = () => {
  const companyLinks = [
    { label: "Франшиза" },
    { label: "Вакансии" },
    { label: "Оферета" },
    { label: "Политика конфиденциальности" },
    { label: "Карта сайта" },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-logo">БАНАНДИ</h2>
          <p className="footer-copyright">
            © 2024 ТОО Баханди. Все права защищены
          </p>
        </div>

        <nav className="footer-nav">
          <h3 className="footer-title">Компания</h3>
          <div className="footer-links">
            {companyLinks.map((link, index) => (
              <button 
                key={index} 
                className="footer-link"
                onClick={() => console.log(`Clicked: ${link.label}`)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;