'use client'
import React, { useEffect } from 'react';

const page = () => {



  useEffect(() => {
    // Define the URLs for the APIs
    const url1 = 'https://newindiansarkari-production.up.railway.app/jobupdate/get/admit-cards';
    const url2 = 'https://newindiansarkari-production.up.railway.app/job';

    // Use Promise.all to fetch both APIs concurrently
    Promise.all([fetch(url1), fetch(url2)])
      .then(([response1, response2]) => {
        // Check if both responses are successful (status 200)
        if (response1.ok && response2.ok) {
          return Promise.all([response1.json(), response2.json()]);
        } else {
          throw new Error('One or both API calls failed');
        }
      })
      .then(([data1, data2]) => {
        // Log the data from both APIs
        console.log('API 1 Result:', data1);
        console.log('API 2 Result:', data2);
      })
      .catch((error) => {
        // Log any error that occurs
        console.error('Error fetching APIs:', error);
      });
  }, []);

  return (
    <div>
      page
    </div>
  );
};

export default page;
