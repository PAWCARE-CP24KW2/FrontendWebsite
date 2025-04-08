import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PetInformation = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  
  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years} years ${months} months`;
  };

  useEffect(() => {
    let isMounted = true;
    console.log('Fetching pet data for petId:', petId);
  
    // fetch(`http://localhost:8080/api/pet/qrcode/getpet/${petId}`)
    fetch(`https://capstone24.sit.kmutt.ac.th/kw2/api/pet/qrcode/getpet/${petId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch pet data');
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          console.log('API Response:', data);
          setPet(data.pet);
        }
      })
      .catch((err) => setError(err.message));
  
    return () => {
      isMounted = false;
    };
  }, [petId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 font-comfortaa'>

        <div className='m-2'>
            <img src={pet.profile_path} alt="profile" className='w-42 h-42 rounded-full border-3 border-[#71543F]' />
        </div>

        <h1 className='text-3xl mt-2'> {pet.pet_name}</h1>

        <div className='flex flex-col items-center justify-center mb-2'>
          <p className='text-[#616161]'>Contact my owner pls!</p>
          <p className='text-[#616161] text-xl'> {pet.owner_phone}</p>
        </div>
      
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-[#616161]'>Spacies</p>
              <p className=''>{pet.pet_type}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-[#616161]'>Breed</p>
              <p className=''>{pet.pet_breed}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-[#616161]'>Gender</p>
              <p className=''>{pet.pet_gender}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-[#616161]'>Age</p>
              <p className=''>{calculateAge(pet.date_of_birth)}</p>
            </div>
          </div>
        </div>
        

    </div>
  );
};

export default PetInformation;