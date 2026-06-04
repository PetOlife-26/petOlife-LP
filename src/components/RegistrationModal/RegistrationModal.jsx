import React, { useEffect, useState } from 'react';
import { submitContactForm } from '../../api/endpoints';
import './RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose, type }) => {
  const isVet = type === 'vet';

  // ── Vet form state ──────────────────────────────────────
  const [vetData, setVetData] = useState({
    doctorName: '',
    clinicName: '',
    mobile: '',
    email: '',
    city: '',
    earlyAccess: true,
  });

  // ── Pet parent form state ───────────────────────────────
  const [parentData, setParentData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    petType: '',
    hasPet: true,
    earlyAccess: true,
  });

  // ── Submission state ────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ msg: '', ok: null });

  // ── Lock body scroll ────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset status when modal opens
  useEffect(() => {
    if (isOpen) setStatus({ msg: '', ok: null });
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Submit handler ──────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ msg: '', ok: null });

    let payload;

    if (isVet) {
      payload = {
        name: vetData.doctorName,
        email: vetData.email,
        subject: 'Veterinarian Interest Form',
        message:
          `Type: Veterinarian\n` +
          `Doctor Name: ${vetData.doctorName}\n` +
          `Clinic: ${vetData.clinicName}\n` +
          `Mobile: ${vetData.mobile}\n` +
          `City: ${vetData.city}\n` +
          `Early Access Interest: ${vetData.earlyAccess ? 'Yes' : 'No'}`,
      };
    } else {
      payload = {
        name: parentData.name,
        email: parentData.email,
        subject: 'Pet Parent Interest Form',
        message:
          `Type: Pet Parent\n` +
          `Name: ${parentData.name}\n` +
          `Mobile: ${parentData.mobile}\n` +
          `City: ${parentData.city}\n` +
          `Pet Type: ${parentData.petType}\n` +
          `Already Has Pet: ${parentData.hasPet ? 'Yes' : 'No'}\n` +
          `Early Access Interest: ${parentData.earlyAccess ? 'Yes' : 'No'}`,
      };
    }

    const res = await submitContactForm(payload);
    setLoading(false);
    setStatus({ msg: res.message, ok: res.success });

    // Auto close on success after 2 seconds
    if (res.success) {
      setTimeout(() => onClose(), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>

        <div className="modal-header">
          <h3 className="modal-title">
            {isVet ? 'Veterinarian Interest Form' : 'Pet Parent Interest Form'}
          </h3>
          <p className="modal-subtitle">
            {isVet
              ? 'Join us to shape the future of pet healthcare.'
              : "Join early to organize your pet's health identity."}
          </p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>

          {isVet ? (
            <>
              <div className="form-group">
                <label>Doctor Name</label>
                <input
                  type="text"
                  placeholder="Dr. Akash Jha"
                  required
                  value={vetData.doctorName}
                  onChange={(e) => setVetData({ ...vetData, doctorName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Clinic Name</label>
                <input
                  type="text"
                  placeholder="Happy Pets Clinic"
                  required
                  value={vetData.clinicName}
                  onChange={(e) => setVetData({ ...vetData, clinicName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  value={vetData.mobile}
                  onChange={(e) => setVetData({ ...vetData, mobile: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="akash@happypets.com"
                  required
                  value={vetData.email}
                  onChange={(e) => setVetData({ ...vetData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="e.g., Chennai"
                  required
                  value={vetData.city}
                  onChange={(e) => setVetData({ ...vetData, city: e.target.value })}
                />
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="vet-early"
                  checked={vetData.earlyAccess}
                  onChange={(e) => setVetData({ ...vetData, earlyAccess: e.target.checked })}
                />
                <label htmlFor="vet-early">Interested in Early Access?</label>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Ram Charan"
                  required
                  value={parentData.name}
                  onChange={(e) => setParentData({ ...parentData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  value={parentData.mobile}
                  onChange={(e) => setParentData({ ...parentData, mobile: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="ram@example.com"
                  required
                  value={parentData.email}
                  onChange={(e) => setParentData({ ...parentData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="e.g., Chennai"
                  required
                  value={parentData.city}
                  onChange={(e) => setParentData({ ...parentData, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Pet Type</label>
                <div className="pet-type-pills">
                  {['dog', 'cat', 'other'].map((pet) => (
                    <label className="pet-pill" key={pet}>
                      <input
                        type="radio"
                        name="petType"
                        value={pet}
                        required
                        checked={parentData.petType === pet}
                        onChange={(e) => setParentData({ ...parentData, petType: e.target.value })}
                      />
                      <span>{pet.charAt(0).toUpperCase() + pet.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="parent-have-pet"
                  checked={parentData.hasPet}
                  onChange={(e) => setParentData({ ...parentData, hasPet: e.target.checked })}
                />
                <label htmlFor="parent-have-pet">Already Have a Pet?</label>
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="parent-early"
                  checked={parentData.earlyAccess}
                  onChange={(e) => setParentData({ ...parentData, earlyAccess: e.target.checked })}
                />
                <label htmlFor="parent-early">Interested in Early Access?</label>
              </div>
            </>
          )}

          {/* Status message */}
          {status.msg && (
            <p style={{
              textAlign: 'center',
              fontSize: '0.875rem',
              color: status.ok ? 'var(--color-teal)' : '#e53e3e',
              margin: '0',
            }}>
              {status.msg}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary modal-submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
