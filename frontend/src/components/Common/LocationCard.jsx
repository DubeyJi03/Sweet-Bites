import React from 'react';
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiExternalLink } from 'react-icons/hi';

const LocationCard = ({ location, showMap = true }) => {
  // Create Google Maps URL for directions
  const getDirectionsUrl = () => {
    const address = encodeURIComponent(location.address);
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  // Create coordinates for a simple map visualization
  const getMapCoordinates = (locationName) => {
    const coordinates = {
      'Virar West': { lat: 19.4563, lng: 72.7917 },
      'Borivali': { lat: 19.2300, lng: 72.8566 },
      'Andheri': { lat: 19.1346, lng: 72.8341 },
      'Pune': { lat: 18.5234, lng: 73.8456 }
    };
    
    const key = Object.keys(coordinates).find(key => 
      locationName.toLowerCase().includes(key.toLowerCase())
    );
    
    return coordinates[key] || { lat: 19.0760, lng: 72.8777 }; // Default to Mumbai
  };

  const coords = getMapCoordinates(location.name);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Map Section */}
      {showMap && (
        <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
          {/* Simple map visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Map background pattern */}
              <div className="w-80 h-48 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg opacity-60">
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              </div>
              
              {/* Location marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <HiLocationMarker className="h-8 w-8 text-red-500 drop-shadow-lg" />
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
                    {location.name.split(' ')[0]} {location.name.split(' ')[1]}
                  </div>
                </div>
              </div>
              
              {/* Coordinates display */}
              <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-600">
                {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
              </div>
            </div>
          </div>
          
          {/* Open in Google Maps button */}
          <div className="absolute top-4 right-4">
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 hover:bg-white text-gray-700 px-3 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <HiExternalLink className="h-4 w-4" />
              Open in Maps
            </a>
          </div>
        </div>
      )}
      
      {/* Location Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{location.name}</h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <HiLocationMarker className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600">{location.address}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <HiPhone className="h-5 w-5 text-amber-600" />
            <a 
              href={`tel:${location.phone}`}
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              {location.phone}
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <HiMail className="h-5 w-5 text-amber-600" />
            <a 
              href={`mailto:${location.email}`}
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              {location.email}
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <HiClock className="h-5 w-5 text-amber-600" />
            <p className="text-gray-600">{location.hours}</p>
          </div>
        </div>

        {location.manager && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Store Manager:</span> {location.manager}
            </p>
          </div>
        )}

        {location.specialties && location.specialties.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
            <div className="flex flex-wrap gap-2">
              {location.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-6">
          <a
            href={`tel:${location.phone}`}
            className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors text-center text-sm font-medium"
          >
            Call Store
          </a>
          <a
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-amber-600 text-amber-600 py-2 px-4 rounded-lg hover:bg-amber-50 transition-colors text-center text-sm font-medium"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
