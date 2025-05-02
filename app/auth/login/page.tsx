'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { setNonce } from 'react-resizable-panels';
import { cp } from 'fs';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('type') === 'doctor' ? 'doctor' : 'patient';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail]     = useState('');
  const [name, setName]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]  = useState(false);

  async function handlePatientLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Erreur patient');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      toast.error('Erreur réseau');
    } finally {
      setLoading(false);
    }
  }

  async function handleDoctorLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    console.log('Doctor login', { name, password });
    try {
      const res = await fetch('/api/doctors/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log(data);
        toast.error(data.message || 'Erreur médecin');
      } else {
        router.push('/doctors/appointments');
      }
    } catch (err: any) {
      toast.error('Erreur réseau');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Log in</CardTitle>
          <CardDescription>
            Choose your role and sign in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>

            {/* Patient Login */}
            <TabsContent value="patient" className="pt-4">
              <form onSubmit={handlePatientLogin} className="space-y-4">
                <div>
                  <Label htmlFor="patient-email">Email</Label>
                  <Input
                    id="patient-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="patient-password">Password</Label>
                  <Input
                    id="patient-password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in as Patient'}
                </Button>
              </form>
            </TabsContent>

            {/* Doctor Login */}
            <TabsContent value="doctor" className="pt-4">
              <form onSubmit={handleDoctorLogin} className="space-y-4">
                <div>
                  <Label htmlFor="doctor-name">Name</Label>
                  <Input
                    id="doctor-name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="doctor-password">Password</Label>
                  <Input
                    id="doctor-password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in as Doctor'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="text-center text-sm">
          Don’t have an account?{' '}
          <Link
            href={`/auth/signup?type=${activeTab}`}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
