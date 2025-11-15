import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Car, Activity, Battery, Thermometer, MapPin, ArrowRight } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  number: string;
  status: 'active' | 'inactive';
  lastUpdate: string;
  metrics: {
    speed: number;
    battery: number;
    temperature: number;
    location: string;
  };
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Tesla Model 3',
    number: 'MH-12-AB-1234',
    status: 'active',
    lastUpdate: '2 mins ago',
    metrics: {
      speed: 65,
      battery: 87,
      temperature: 24,
      location: 'Mumbai, MH',
    },
  },
  {
    id: '2',
    name: 'Ford F-150',
    number: 'DL-08-CD-5678',
    status: 'active',
    lastUpdate: '5 mins ago',
    metrics: {
      speed: 42,
      battery: 65,
      temperature: 28,
      location: 'Delhi, DL',
    },
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();

  const getBatteryColor = (battery: number) => {
    if (battery > 70) return 'text-success';
    if (battery > 30) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <DashboardLayout title="Vehicle Monitoring">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockVehicles.length}</div>
              <p className="text-xs text-muted-foreground">Assigned to you</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockVehicles.filter(v => v.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Currently operational</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Speed</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockVehicles.reduce((acc, v) => acc + v.metrics.speed, 0) / mockVehicles.length)} km/h
              </div>
              <p className="text-xs text-muted-foreground">Across fleet</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Battery</CardTitle>
              <Battery className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockVehicles.reduce((acc, v) => acc + v.metrics.battery, 0) / mockVehicles.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Fleet average</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Your Vehicles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                      <CardDescription className="font-mono mt-1">
                        {vehicle.number}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        vehicle.status === 'active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {vehicle.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{vehicle.lastUpdate}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Speed</p>
                        <p className="text-lg font-semibold">{vehicle.metrics.speed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className={`w-4 h-4 ${getBatteryColor(vehicle.metrics.battery)}`} />
                      <div>
                        <p className="text-xs text-muted-foreground">Battery</p>
                        <p className="text-lg font-semibold">{vehicle.metrics.battery}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                        <p className="text-lg font-semibold">{vehicle.metrics.temperature}°C</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-destructive" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-semibold">{vehicle.metrics.location}</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
