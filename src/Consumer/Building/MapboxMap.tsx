import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZGFsbGFzIiwiYSI6ImNsMnVkMzIzdTAwdmYza21wdHd2YzR0c2kifQ.DT00_FPsSokLQ8r4FELa2A';

interface MapboxMap {
  lat: number,
  lng: number,
}

const MapboxMap = ({ lat, lng }: MapboxMap) => {
  const mapContainer = useRef<any>(null);
  const map: any = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 13,
      interactive: false
    })
    map.current.addControl(new mapboxgl.NavigationControl({
      visualizePitch: true
    }), 'top-left');
    map.current.addControl(new mapboxgl.FullscreenControl());
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);
  }, [lat, lng]);

  return <div ref={mapContainer} style={{ height: "400px" }} className="map-container" />
}

export default MapboxMap

