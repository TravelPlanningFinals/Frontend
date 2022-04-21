import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getTripsById } from '../../../services/trips';
import { getYelp } from '../../../utils/yelp';
import './entertainment.css';

export default function EntertainmentDetails() {
  const [city, setCity] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTripsById(id);
      const yelp = await getYelp(data.location);
      console.log('yelp', yelp.body.businesses);
      setCity(yelp.body.businesses);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        {city.map((item) => {
          return (
            <div className="yelpdiv">
              <div key={item.name}>
                <a className="yelplink" href={item.url} target="_blank">
                  <h2 key="item">{item.name}</h2>

                  <img src={item.image_url} />
                  <div className="yelpinfo">
                    <h2>{item.display_phone}</h2>
                    <h2>
                      {item.location.address1} {item.location.city}{' '}
                      {item.location.zip_code}
                    </h2>
                    <h2>Price:{item.price}</h2>
                    <h2>Rating:{item.rating}</h2>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
