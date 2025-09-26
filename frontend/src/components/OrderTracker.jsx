import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const courierIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const OrderTracker = ({ order }) => {
  const stages = ['Confirmado', 'Preparando', 'En camino', 'Entregado'];
  const currentIndex = stages.indexOf(order.status);

  const mapCenter = order.courierLocation || order.restaurant?.location || {
    lat: -34.6037,
    lng: -58.3816
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Estado del pedido</h3>
        <p className="text-sm text-slate-400">Tiempo estimado: {order.estimatedDeliveryMinutes} min</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage, index) => (
          <div key={stage} className="flex flex-col items-center text-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                index <= currentIndex ? 'bg-primary text-white border-primary' : 'border-slate-200 text-slate-400'
              }`}
            >
              {index + 1}
            </div>
            <p className={`mt-2 text-xs font-medium ${index <= currentIndex ? 'text-primary' : 'text-slate-400'}`}>
              {stage}
            </p>
          </div>
        ))}
      </div>
      <div className="h-72 rounded-3xl overflow-hidden">
        <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[mapCenter.lat, mapCenter.lng]} icon={courierIcon}></Marker>
        </MapContainer>
      </div>
      {order.courier && (
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Repartidor asignado: {order.courier.name}</span>
          <span>Teléfono: {order.courier.phone || '—'}</span>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
