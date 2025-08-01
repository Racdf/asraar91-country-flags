import React, { useEffect, useState } from 'react';
import './flags.css'

function FlagCard({ name, flag, abbr }) {
  return (
    <div className='flag-card'>
      <img
        src={flag}
        alt={`Flag of ${abbr}`}
      />
      <p>{name}</p>
    </div>
  );
}

export default function Flags() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://xcountries-backend.azurewebsites.net/all');
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError('Failed to load country data.');
      }
    };

    fetchCountries();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className='flags-container'>
      {countries.map((country, index) => (
        <FlagCard key={index} name={country.name} flag={country.flag} abbr={country.abbr} />
      ))}
    </div>
  );
}

