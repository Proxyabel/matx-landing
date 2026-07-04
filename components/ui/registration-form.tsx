'use client';

import { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';

const roles = [
  'Koolijuht / Direktor',
  'Õppejuht / Õppealajuhataja',
  'Matemaatikaõpetaja',
  'Muu haridustöötaja',
];

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    role: '',
    email: '',
    phone: '',
    classGroups: '',
    otherRole: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      schoolName: '',
      contactName: '',
      role: '',
      email: '',
      phone: '',
      classGroups: '',
      otherRole: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-elevated rounded-2xl border border-border shadow-elevated overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative px-8 pt-8 pb-4">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-11 h-11 rounded-lg bg-surface flex items-center justify-center hover:bg-surface/80 transition-colors focus-ring-target"
            aria-label="Sulge"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>

          {!isSuccess ? (
            <>
              <h1 className="text-2xl font-display font-bold text-text-primary mb-2">
                Registreeri oma kool pilootkatsetusele
              </h1>
              <p className="text-text-secondary text-sm">
                Targa Tuleviku Fondi toetusel. Tasuta. Kohustusteta.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-secondary" />
              </div>
              <h1 className="text-2xl font-display font-bold text-text-primary mb-2">
                Registreering kinnitatud!
              </h1>
              <p className="text-text-secondary">
                Täname, {formData.schoolName}!
              </p>
            </div>
          )}
        </div>

        {/* Form or Success */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            {/* School Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Kooli nimi <span className="text-alert">*</span>
              </label>
              <input
                type="text"
                required
                minLength={5}
                placeholder="Kooli ametlik nimi"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-secondary/50 focus-ring-target transition-colors"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              />
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Kontaktisiku nimi <span className="text-alert">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ees- ja perekonnanimi"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-secondary/50 focus-ring-target transition-colors"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Roll <span className="text-alert">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary focus-ring-target transition-colors appearance-none"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="" disabled className="text-text-secondary">
                  Valige oma roll
                </option>
                {roles.map((role) => (
                  <option key={role} value={role} className="text-text-primary">
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Other Role (conditional) */}
            {formData.role === 'Muu haridustöötaja' && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Täpsustage roll <span className="text-alert">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Teie roll koolis"
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-secondary/50 focus-ring-target transition-colors"
                  value={formData.otherRole}
                  onChange={(e) => setFormData({ ...formData, otherRole: e.target.value })}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Asutuse e-post <span className="text-alert">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="nimi@kool.ee"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-secondary/50 focus-ring-target transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Telefoninumber <span className="text-alert">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+372 5XXX XXXX"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-secondary/50 focus-ring-target transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Class Groups */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                7.-9. klassi klassirühmade arv <span className="text-alert">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Näiteks: 4 paralleelklassi 8. klassis"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-secondary/50 focus-ring-target transition-colors"
                value={formData.classGroups}
                onChange={(e) => setFormData({ ...formData, classGroups: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg bg-primary text-text-inverse font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-ring-target min-h-[44px] mt-6"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saatmine...
                </span>
              ) : (
                'Esita registreering'
              )}
            </button>

            <p className="text-center text-xs text-text-secondary">
              Võtame ühendust 48 tunni jooksul
            </p>
          </form>
        ) : (
          <div className="px-8 pb-8 text-center">
            <div className="bg-secondary/10 rounded-xl p-6 mb-6 text-left">
              <h2 className="font-semibold text-text-primary mb-3">Järgmised sammud:</h2>
              <ol className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary text-sm flex items-center justify-center shrink-0">1</span>
                  <span>Broneeri 15-minutiline vestlus (link tuleb meilil)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary text-sm flex items-center justify-center shrink-0">2</span>
                  <span>Allkirjasta digitaalne toetuskiri</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary text-sm flex items-center justify-center shrink-0">3</span>
                  <span>Sügisene pilootkatsetus algus: August 2026</span>
                </li>
              </ol>
            </div>

            <p className="text-text-secondary text-sm mb-4">
              Küsimused?
            </p>
            <a
              href="mailto:andri@matx.ee"
              className="text-primary hover:text-secondary transition-colors text-sm focus-ring-target rounded-md"
              style={{ textDecoration: 'underline' }}
            >
              andri@matx.ee
            </a>

            <button
              onClick={handleClose}
              className="block w-full mt-6 py-3 rounded-lg border border-border text-text-primary hover:bg-surface transition-colors focus-ring-target min-h-[44px]"
            >
              Sulge
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
