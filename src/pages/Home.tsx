import { useEffect } from 'react';
import { ArrowDownLeft, ArrowRight, ArrowUpRight, BatteryFull, Check, Eye, Plus, ShieldCheck, Signal, Sparkles, Wallet, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const transactions = [
  { name: 'Alvaro Carreras', detail: 'Incoming · 5:36 pm', amount: '+$1,437.50', initials: 'AC', incoming: true },
  { name: 'Samual Umititi', detail: 'Outgoing · 5:36 pm', amount: '−$1,637.50', initials: 'SU', incoming: false },
];

const faqs = [
  {
    question: 'Is this connected to a bank?',
    answer: 'No. This is a visual demo. No account is connected.',
  },
  {
    question: 'Can I move real money?',
    answer: 'No. Money actions are previews only.',
  },
  {
    question: 'Is the activity real?',
    answer: 'No. Balances and transactions are fictional sample data.',
  },
];

export default function Home() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'ORBIT | Money moves with you.';
    document.documentElement.classList.add('fintech-home-page');
    document.body.classList.add('fintech-home-page');
    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove('fintech-home-page');
      document.body.classList.remove('fintech-home-page');
    };
  }, []);

  return (
    <div className="fintech-home">
      <section className="fintech-hero">
        <div className="fintech-hero-orbit fintech-hero-orbit-one" aria-hidden="true" />
        <div className="fintech-hero-orbit fintech-hero-orbit-two" aria-hidden="true" />
        <div className="fintech-hero-inner">
          <div className="fintech-hero-copy">
            <span className="fintech-eyebrow"><i /> Money, in good order</span>
            <h1>Money,<br /><em>understood.</em></h1>
            <p>
              Everything you need to see. Nothing you don’t.
            </p>
            <div className="fintech-hero-actions">
              <Link to="/dashboard" className="fintech-primary-button">View the experience <ArrowRight size={16} /></Link>
            </div>
            <div className="fintech-demo-note"><ShieldCheck size={15} /> Sample data · No bank connected</div>
          </div>

          <div className="fintech-phone-wrap">
            <div className="fintech-phone">
              <div className="fintech-phone-status">
                <span>9:41</span><i aria-hidden="true" /><span className="fintech-phone-signal" role="img" aria-label="Cellular, Wi-Fi, and battery status"><Signal size={13} /><Wifi size={13} /><BatteryFull size={15} /></span>
              </div>
              <div className="fintech-app-screen">
                <div className="fintech-app-greeting">
                  <span className="fintech-app-avatar">J</span>
                  <div><small>Good morning, Enoch</small><b>Chukwudi!</b></div>
                </div>
                <div className="fintech-app-balance">
                  <span>Your balance</span>
                  <div>$35,674<small>.00</small><Eye size={14} /></div>
                  <p><ArrowUpRight size={14} /> $15,376.50 <span>(1.6%)</span></p>
                </div>
                <div className="fintech-app-actions">
                  <span><ArrowUpRight size={14} /> Send</span>
                  <i><Plus size={19} /></i>
                  <span><ArrowDownLeft size={14} /> Request</span>
                </div>
                <div className="fintech-app-stats">
                  <div><span>Income</span><b>$2,353<small>.50</small></b><small className="fintech-app-positive">↗ (+0.74%)</small></div>
                  <div><span>Expense</span><b>$1,294<small>.00</small></b><small className="fintech-app-negative">↙ (+0.82%)</small></div>
                </div>
                <div className="fintech-app-insight"><Sparkles size={14} /><b>All insights</b><span>A little more clarity, every day.</span></div>
                <div className="fintech-app-activity">
                  <div className="fintech-app-activity-title">Recent transactions <span>See all</span></div>
                  {transactions.map((transaction) => (
                    <div className="fintech-app-transaction" key={transaction.name}>
                      <i>{transaction.initials}</i>
                      <span><b>{transaction.name}</b><small>{transaction.detail}</small></span>
                      <strong className={transaction.incoming ? 'incoming' : ''}>{transaction.amount}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fintech-phone-home-indicator" />
            </div>
            <div className="fintech-phone-caption"><span><i /> SAMPLE ACCOUNT</span></div>
          </div>
        </div>
        <div className="fintech-hero-foot"><span>01 — PRIVATE BY DESIGN</span><span>DEMO EXPERIENCE</span></div>
      </section>

      <section className="fintech-intro" id="how-it-works">
        <span className="fintech-eyebrow"><i /> One clear picture</span>
        <h2>See clearly.<br /><em>Move thoughtfully.</em></h2>
      </section>

      <section className="fintech-features" id="features" aria-label="Account features">
        <article className="fintech-feature-card">
          <span className="fintech-feature-icon"><Wallet size={19} /></span>
          <span className="fintech-feature-number">01 / OVERVIEW</span>
          <h3>Know your<br /><em>balance.</em></h3>
          <p>One view. No guesswork.</p>
          <div className="fintech-mini-balance"><span>Available balance</span><b>$35,674<small>.00</small></b><i><ArrowUpRight size={13} /> Up this month</i></div>
        </article>
        <article className="fintech-feature-card">
          <span className="fintech-feature-icon"><ArrowUpRight size={19} /></span>
          <span className="fintech-feature-number">02 / ACTIONS</span>
          <h3>Move with<br /><em>confidence.</em></h3>
          <p>Send. Request. Done.</p>
          <div className="fintech-mini-actions"><span><ArrowUpRight size={14} /> Send</span><span><Plus size={16} /></span><span><ArrowDownLeft size={14} /> Request</span></div>
        </article>
        <article className="fintech-feature-card">
          <span className="fintech-feature-icon"><Sparkles size={19} /></span>
          <span className="fintech-feature-number">03 / INSIGHTS</span>
          <h3>Notice what<br /><em>matters.</em></h3>
          <p>Useful insight. Less noise.</p>
          <div className="fintech-mini-insight"><Sparkles size={15} /><span><b>A little perspective</b><small>Your spending summary is ready to explore.</small></span><Check size={15} /></div>
        </article>
      </section>

      <section className="fintech-faq" id="faq" aria-labelledby="fintech-faq-title">
        <div className="fintech-faq-intro">
          <span className="fintech-eyebrow"><i /> The essentials</span>
          <h2 id="fintech-faq-title">Good to<br /><em>know.</em></h2>
        </div>
        <div className="fintech-faq-list">
          {faqs.map(({ question, answer }, index) => (
            <details key={question} className="fintech-faq-item">
              <summary><span>0{index + 1}</span>{question}<i /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
