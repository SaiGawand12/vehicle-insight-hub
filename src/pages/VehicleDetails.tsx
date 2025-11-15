import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Activity, Battery, Thermometer, MapPin, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Progress } from '@/components/ui/progress';

// Mock telemetry data
const speedData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  speed: Math.floor(Math.random() * 40) + 40,
}));

const temperatureData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  temp: Math.floor(Math.random() * 10) + 20,
}));

const batteryData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  battery: Math.max(30, 100 - i * 3 - Math.random() * 10),
}));

const mockVehicle = {
  id: '1',
  name: 'Tesla Model 3',
  number: 'MH-12-AB-1234',
  status: 'active',
  assignedTo: 'John Doe',
  lastUpdate: new Date().toLocaleString(),
  currentMetrics: {
    speed: 65,
    battery: 87,
    temperature: 24,
    gps: { lat: 19.076, lng: 72.8777 },
    location: 'Mumbai, Maharashtra',
  },
};

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Vehicle Details">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{mockVehicle.name}</h1>
            <p className="text-muted-foreground font-mono">{mockVehicle.number}</p>
          </div>
          <span className={`ml-auto inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            mockVehicle.status === 'active' 
              ? 'bg-success/10 text-success' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {mockVehicle.status}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Speed</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockVehicle.currentMetrics.speed}</div>
              <p className="text-xs text-muted-foreground">km/h</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Battery Level</CardTitle>
              <Battery className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockVehicle.currentMetrics.battery}%</div>
              <Progress value={mockVehicle.currentMetrics.battery} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockVehicle.currentMetrics.temperature}°C</div>
              <p className="text-xs text-muted-foreground">Engine temp</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{mockVehicle.lastUpdate}</div>
              <p className="text-xs text-muted-foreground">Real-time sync</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Speed History (24h)</CardTitle>
              <CardDescription>Vehicle speed over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={speedData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="speed" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Battery Level (24h)</CardTitle>
              <CardDescription>Battery discharge pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={batteryData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="battery" 
                    stroke="hsl(var(--chart-2))" 
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Temperature Monitoring (24h)</CardTitle>
              <CardDescription>Engine temperature trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GPS Location</CardTitle>
              <CardDescription>Current vehicle position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-3">
                  <MapPin className="w-12 h-12 text-destructive mx-auto" />
                  <div>
                    <p className="font-semibold text-lg">{mockVehicle.currentMetrics.location}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {mockVehicle.currentMetrics.gps.lat.toFixed(4)}, {mockVehicle.currentMetrics.gps.lng.toFixed(4)}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Interactive map integration available with Mapbox or Google Maps
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>Additional details and metadata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Vehicle Name</p>
                <p className="text-lg font-semibold">{mockVehicle.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registration Number</p>
                <p className="text-lg font-semibold font-mono">{mockVehicle.number}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="text-lg font-semibold">{mockVehicle.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold capitalize">{mockVehicle.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Sync</p>
                <p className="text-lg font-semibold">{mockVehicle.lastUpdate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vehicle ID</p>
                <p className="text-lg font-semibold font-mono">{mockVehicle.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VehicleDetails;
