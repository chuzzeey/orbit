import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  Eye,
  EyeOff,
  Plus,
  Signal,
  Sparkles,
  X,
  Wifi,
} from 'lucide-react';
import './Dashboard.css';

type DemoAction = 'send' | 'receive' | 'add' | 'profile';

const transactions = [
  { name: 'Alvaro Carreras', detail: 'Incoming · 5:36 pm', amount: 1437.5, direction: 'incoming', initials: 'AC' },
  { name: 'Samual Umititi', detail: 'Outgoing · 5:36 pm', amount: 1637.5, direction: 'outgoing', initials: 'SU' },
  { name: 'Theo Martin', detail: 'Incoming · Yesterday', amount: 245, direction: 'incoming', initials: 'TM' },
  { name: 'Atelier 42', detail: 'Dining · Yesterday', amount: 64.8, direction: 'outgoing', initials: 'A4' },
  { name: 'Monthly savings', detail: 'Transfer · Nov 18', amount: 320, direction: 'outgoing', initials: 'MS' },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function Dashboard() {
  const [profileName, setProfileName] = useState('Jonathon');
  const [profileEmail, setProfileEmail] = useState('jonathon@example.test');
  const [profileDraft, setProfileDraft] = useState({ name: 'Jonathon', email: 'jonathon@example.test' });
  const [modalAction, setModalAction] = useState<DemoAction | null>(null);
  const [counterparty, setCounterparty] = useState('');
  const [amount, setAmount] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showBalance, setShowBalance] = useState(true);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  useEffect(() => {
    if (!modalAction) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setModalAction(null);
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [modalAction]);

  const openAction = (action: DemoAction) => {
    setModalAction(action);
    setCounterparty('');
    setAmount('');
    setStatusMessage('');
    if (action === 'profile') {
      setProfileDraft({ name: profileName, email: profileEmail });
    }
  };

  const closeAction = () => {
    setModalAction(null);
    setStatusMessage('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (modalAction === 'profile') {
      setProfileName(profileDraft.name.trim());
      setProfileEmail(profileDraft.email.trim());
      setStatusMessage('Demo profile updated for this visit only. Nothing was sent or saved.');
      return;
    }
    if (!modalAction) return;

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setStatusMessage('Enter a demo amount greater than zero.');
      return;
    }

    const formattedAmount = formatCurrency(numericAmount);
    const destination = counterparty.trim() ? ` for ${counterparty.trim()}` : '';
    const messages = {
      send: `Demo transfer of ${formattedAmount}${destination} is ready. No money was sent.`,
      receive: `Demo request of ${formattedAmount}${destination} is ready. No request was sent.`,
      add: `Demo addition of ${formattedAmount} from ${counterparty.trim()} is ready. No funds were added.`,
    };
    if (modalAction) setStatusMessage(messages[modalAction]);
  };

  const visibleTransactions = showAllTransactions ? transactions : transactions.slice(0, 4);
  const actionTitle = modalAction === 'send'
    ? 'Send money'
    : modalAction === 'receive'
      ? 'Receive money'
      : modalAction === 'add'
        ? 'Add money'
        : 'Demo profile';

  return (
    <div className="wallet-device-frame">
      <div className="wallet-dashboard">
        <div className="wallet-status-bar" aria-label="Phone status bar">
          <span>9:41</span>
          <span className="wallet-dynamic-island" aria-hidden="true"><i /></span>
          <span className="wallet-status-icons" aria-hidden="true"><Signal size={17} /><Wifi size={18} /><span className="wallet-battery-icon" /></span>
        </div>
        <header className="wallet-header">
          <div className="wallet-greeting-row">
            <button className="wallet-greeting-avatar" type="button" onClick={() => openAction('profile')} aria-label="Edit demo profile">
              {profileName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
            </button>
            <div className="wallet-greeting-copy">
              <span>Good morning, Fahim</span>
              <b>{profileName.trim().split(/\s+/)[0] || 'Jonathon'} !</b>
            </div>
            <button className="wallet-notification-button" type="button" aria-label="Notifications are demo only" title="Notifications are demo only">
              <Bell size={19} strokeWidth={1.6} />
              <span />
            </button>
          </div>
        </header>

      <main className="wallet-main">
        <section className="wallet-balance-card" aria-labelledby="balance-title">
          <p id="balance-title" className="wallet-balance-label">Your Balance</p>
          <div className="wallet-balance-value">
            <span>{showBalance ? '$35,674' : '••••••'}</span>
            {showBalance && <small>.00</small>}
            <button
              type="button"
              className="wallet-visibility-button"
              onClick={() => setShowBalance((visible) => !visible)}
              aria-label={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          <p className="wallet-balance-change"><ArrowUpRight size={17} /> $15,376.50 <span>(1.6%)</span></p>
        </section>

        <section className="wallet-actions-card" aria-label="Money actions">
          <div className="wallet-actions">
            <button type="button" className="wallet-action-button" onClick={() => openAction('send')}>
              <ArrowUpRight size={20} /><span>Send</span>
            </button>
            <button type="button" className="wallet-add-button" onClick={() => openAction('add')} aria-label="Add money demo">
              <Plus size={23} />
            </button>
            <button type="button" className="wallet-action-button" onClick={() => openAction('receive')}>
              <ArrowDownLeft size={20} /><span>Request</span>
            </button>
          </div>
          <p className="wallet-action-disclaimer">Actions open a preview only. No money moves in this demo.</p>
        </section>

        <section className="wallet-stats-grid" aria-label="Monthly income and expenses">
          <article className="wallet-stat-card">
            <div className="wallet-stat-top"><span>Income</span><span className="wallet-stat-arrow"><ArrowRight size={16} /></span></div>
            <p className="wallet-stat-amount">$2353<small>.50</small></p>
            <p className="wallet-stat-change positive-change"><ArrowUpRight size={15} /> (+0.74%)</p>
          </article>
          <article className="wallet-stat-card">
            <div className="wallet-stat-top"><span>Expense</span><span className="wallet-stat-arrow"><ArrowRight size={16} /></span></div>
            <p className="wallet-stat-amount">$1294<small>.00</small></p>
            <p className="wallet-stat-change expense-change"><ArrowDownLeft size={15} /> (+0.82%)</p>
          </article>
          <article className="wallet-insight-card">
            <div className="wallet-insight-heading"><span><Sparkles size={17} /></span><b>All Insights</b></div>
            <p>This expense may impact your monthly savings goal. Compromise cost to save money.</p>
          </article>
        </section>

        <section className="wallet-transactions-card" id="recent-activity" aria-labelledby="transactions-title">
          <div className="wallet-transactions-heading">
            <h2 id="transactions-title">Recent Transactions</h2>
            <button type="button" className="wallet-see-all" onClick={() => setShowAllTransactions((show) => !show)}>
              {showAllTransactions ? 'Show less' : 'See all'} <ArrowRight size={14} />
            </button>
          </div>
          <div className="wallet-transaction-list">
            {visibleTransactions.map((transaction) => (
              <article className="wallet-transaction-row" key={transaction.name}>
                <span className={`wallet-transaction-avatar ${transaction.direction}`}>{transaction.initials}</span>
                <div className="wallet-transaction-detail"><b>{transaction.name}</b><span>{transaction.detail}</span></div>
                <div className="wallet-transaction-amount">
                  <b className={transaction.direction}>{transaction.direction === 'incoming' ? '+' : '−'}{formatCurrency(transaction.amount)}</b>
                  <span>DEMO</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="wallet-demo-notice">Visual demo only · No bank or payment service is connected.</p>
      </main>

      {modalAction && (
        <div className="wallet-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeAction();
        }}>
          <section className="wallet-action-modal" role="dialog" aria-modal="true" aria-labelledby="wallet-modal-title">
            <div className="wallet-modal-header">
              <div>
                <p className="wallet-kicker">{modalAction === 'profile' ? 'DEMO ACCOUNT' : 'PREVIEW ONLY'}</p>
                <h2 id="wallet-modal-title">{actionTitle}</h2>
              </div>
              <button type="button" className="wallet-modal-close" onClick={closeAction} aria-label="Close dialog"><X size={19} /></button>
            </div>

            {modalAction === 'profile' ? (
              <form className="wallet-demo-form" onSubmit={handleSubmit}>
                <p className="wallet-modal-copy">Update the sample profile for this visit. No login is needed.</p>
                <label>
                  <span>Display name</span>
                  <input
                    autoComplete="name"
                    maxLength={70}
                    required
                    value={profileDraft.name}
                    onChange={(event) => {
                      setProfileDraft((current) => ({ ...current, name: event.target.value }));
                      setStatusMessage('');
                    }}
                  />
                </label>
                <label>
                  <span>Email address</span>
                  <input
                    type="email"
                    autoComplete="email"
                    maxLength={100}
                    required
                    value={profileDraft.email}
                    onChange={(event) => {
                      setProfileDraft((current) => ({ ...current, email: event.target.value }));
                      setStatusMessage('');
                    }}
                  />
                </label>
                <button className="wallet-submit-button" type="submit">Save demo profile <ArrowRight size={15} /></button>
              </form>
            ) : (
              <form className="wallet-demo-form" onSubmit={handleSubmit}>
                <p className="wallet-modal-copy">
                  {modalAction === 'send'
                    ? 'Create a sample transfer preview. Nothing will be sent.'
                    : modalAction === 'receive'
                      ? 'Prepare a sample request preview. No request will be sent.'
                      : 'Preview adding money to this sample balance. No funds will be added.'}
                </p>
                <label>
                  <span>{modalAction === 'send' ? 'Send to' : modalAction === 'receive' ? 'Request from' : 'Source label'}</span>
                  <input
                    autoComplete="off"
                    maxLength={80}
                    placeholder={modalAction === 'add' ? 'e.g. Demo savings' : 'Name or email'}
                    required
                    value={counterparty}
                    onChange={(event) => {
                      setCounterparty(event.target.value);
                      setStatusMessage('');
                    }}
                  />
                </label>
                <label>
                  <span>Amount</span>
                  <div className="wallet-amount-input"><span>$</span><input type="number" min="0.01" max="1000000" step="0.01" placeholder="0.00" required value={amount} onChange={(event) => {
                    setAmount(event.target.value);
                    setStatusMessage('');
                  }} /></div>
                </label>
                <button className="wallet-submit-button" type="submit">
                  {modalAction === 'send' ? 'Preview send' : modalAction === 'receive' ? 'Preview request' : 'Preview add money'}
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
            {statusMessage && (
              <p className="wallet-modal-status" role="status"><Check size={16} />{statusMessage}</p>
            )}
            <p className="wallet-modal-footnote">Demo mode · No money moves and no information is transmitted.</p>
          </section>
        </div>
      )}
      </div>
    </div>
  );
}
