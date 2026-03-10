import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-bg-2 border border-border text-ink text-sm px-4 py-3.5 font-sans placeholder:text-ink-3 focus:outline-none focus:border-border-2 transition-colors duration-200';

const labelClass =
  'block font-mono text-2xs uppercase tracking-widest text-ink-3 mb-2';

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    need: '',
    budget: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate a form submission — replace with your actual endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="border border-border p-10 text-center">
        <div className="w-10 h-10 rounded-full border border-emerald-400/40 flex items-center justify-center mx-auto mb-6">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1 6l5 5L15 1" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-display font-normal text-2xl text-ink mb-3">Message envoyé</h3>
        <p className="text-sm text-ink-2">Je vous répondrai sous 48h. À très vite.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>Nom *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>Société / Activité</label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nom de votre structure (optionnel)"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="need" className={labelClass}>Besoin *</label>
        <select
          id="need"
          name="need"
          required
          value={formData.need}
          onChange={handleChange}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="" disabled>Quel type de projet ?</option>
          <option value="frontend">Développement front-end React / TS</option>
          <option value="site">Site vitrine / Landing page</option>
          <option value="interactive">Expérience interactive / Animation</option>
          <option value="fullstack">Développement full-stack</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>Budget indicatif</label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="">Optionnel — aide à mieux cerner le périmètre</option>
          <option value="lt3k">Moins de 3 000 €</option>
          <option value="3-8k">3 000 – 8 000 €</option>
          <option value="8-15k">8 000 – 15 000 €</option>
          <option value="gt15k">Plus de 15 000 €</option>
          <option value="tbd">À définir</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Votre projet *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre projet, vos objectifs, vos contraintes…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-2xs text-ink-3">
          Réponse sous 48h.
        </p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-3 font-mono text-2xs uppercase tracking-widest bg-accent text-bg px-8 py-4 hover:bg-accent-light transition-all duration-300 disabled:opacity-60 disabled:cursor-wait"
        >
          {status === 'loading' ? (
            <>
              <span className="w-3 h-3 border border-bg/40 border-t-bg rounded-full animate-spin"></span>
              Envoi en cours
            </>
          ) : (
            <>
              Envoyer
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
