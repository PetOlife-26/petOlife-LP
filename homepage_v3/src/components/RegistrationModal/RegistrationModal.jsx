import React, { useEffect } from 'react';
import './RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose, type }) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isVet = type === 'vet';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <div className="modal-header">
          <h3 className="modal-title">
            {isVet ? 'Veterinarian Interest Form' : 'Pet Parent Interest Form'}
          </h3>
          <p className="modal-subtitle">
            {isVet ? 'Join us to shape the future of pet healthcare.' : 'Join early to organize your pet\'s health identity.'}
          </p>
        </div>

        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          {isVet ? (
            <>
              <div className="form-group">
                <label>Doctor Name</label>
                <input type="text" placeholder="Dr. Akash Jha" required />
              </div>
              <div className="form-group">
                <label>Clinic Name</label>
                <input type="text" placeholder="Happy Pets Clinic" required />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="akash@happypets.com" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="e.g., Chennai" required />
              </div>
              <div className="form-checkbox">
                <input type="checkbox" id="vet-early" required defaultChecked />
                <label htmlFor="vet-early">Interested in Early Access?</label>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Ram Charan" required />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="ram@example.com" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="e.g., Chennai" required />
              </div>
              <div className="form-group">
                <label>Pet Type</label>
                <div className="pet-type-pills">
                  <label className="pet-pill">
                    <input type="radio" name="petType" value="dog" required />
                    <span>Dog</span>
                  </label>
                  <label className="pet-pill">
                    <input type="radio" name="petType" value="cat" />
                    <span>Cat</span>
                  </label>
                  <label className="pet-pill">
                    <input type="radio" name="petType" value="other" />
                    <span>Other</span>
                  </label>
                </div>
              </div>
              <div className="form-checkbox">
                <input type="checkbox" id="parent-have-pet" required defaultChecked />
                <label htmlFor="parent-have-pet">Already Have a Pet?</label>
              </div>
              <div className="form-checkbox">
                <input type="checkbox" id="parent-early" required defaultChecked />
                <label htmlFor="parent-early">Interested in Early Access?</label>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary modal-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
