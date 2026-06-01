import React from 'react';

export default function Services() {
  const servicesList = [
    {
      id: 1,
      icon: '🧼',
      title: 'Stylized Grooming',
      desc: 'Treat your pets to premium refreshing baths, nail treatments, and personalized custom haircuts.'
    },
    {
      id: 2,
      icon: '🩺',
      title: 'Veterinary Checkups',
      desc: 'Comprehensive diagnostics, vaccine updates, and preventative care treatments from certified vets.'
    },
    {
      id: 3,
      icon: '🏡',
      title: 'Luxury Boarding',
      desc: 'Safe, interactive spaces equipped with professional oversight for overnight stays or daycare play.'
    }
  ];

  return (
    <section id="services" className="services">
      <h2>Services Crafted For Comfort</h2>
      <p className="subtitle">Explore tailored options designed around your pet's happiness.</p>
      
      <div className="services-grid">
        {servicesList.map((item) => (
          <div key={item.id} className="service-card">
            <div className="icon-wrapper">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}