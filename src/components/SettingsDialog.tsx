import React from 'react';
import { Settings, Moon, Sun, Bell, DollarSign, Palette, User, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const SettingsDialog = () => {
  const { user, signOut } = useAuth();
  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    notifications,
    setNotifications,
    budgetAlerts,
    setBudgetAlerts,
    weeklyReports,
    setWeeklyReports,
    largeTransactions,
    setLargeTransactions,
  } = useSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-muted/30 group">
          <Settings className="w-5 h-5 transition-all duration-300 group-hover:text-primary group-hover:rotate-90" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto z-[100]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs">Appearance</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
            <TabsTrigger value="account" className="text-xs">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <DollarSign className="w-4 h-4" />
                  <span>Currency & Language</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                     <SelectContent className="z-[200]">
                       <SelectItem value="INR">₹ Indian Rupee (INR)</SelectItem>
                       <SelectItem value="USD">$ US Dollar (USD)</SelectItem>
                       <SelectItem value="EUR">€ Euro (EUR)</SelectItem>
                       <SelectItem value="GBP">£ British Pound (GBP)</SelectItem>
                     </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                     <SelectContent className="z-[200]">
                       <SelectItem value="en">English</SelectItem>
                       <SelectItem value="hi">Hindi</SelectItem>
                       <SelectItem value="es">Spanish</SelectItem>
                       <SelectItem value="fr">French</SelectItem>
                     </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Palette className="w-4 h-4" />
                  <span>Display Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="dark-mode" className="flex items-center space-x-2">
                      {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      <span>Dark Mode</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Bell className="w-4 h-4" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for transactions and reports
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <Separator />
                
                 <div className="space-y-3">
                   <Label className="text-sm font-medium">Notification Types</Label>
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                       <span className="text-sm">Budget alerts</span>
                       <Switch 
                         checked={budgetAlerts}
                         onCheckedChange={setBudgetAlerts}
                       />
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-sm">Weekly reports</span>
                       <Switch 
                         checked={weeklyReports}
                         onCheckedChange={setWeeklyReports}
                       />
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-sm">Large transactions</span>
                       <Switch 
                         checked={largeTransactions}
                         onCheckedChange={setLargeTransactions}
                       />
                     </div>
                   </div>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <User className="w-4 h-4" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full mx-auto">
                  <User className="w-8 h-8 text-white" />
                </div>
                 <div className="text-center">
                   <h3 className="font-medium">
                     {user?.user_metadata?.first_name && user?.user_metadata?.last_name
                       ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                       : user?.email?.split('@')[0] || 'User'
                     }
                   </h3>
                   <p className="text-sm text-muted-foreground">{user?.email || 'No email'}</p>
                 </div>
                
                <Separator />
                
                 <div className="space-y-2">
                   <Button variant="outline" size="sm" className="w-full justify-start">
                     <Shield className="w-4 h-4 mr-2" />
                     Privacy & Security
                   </Button>
                   <Button variant="outline" size="sm" className="w-full justify-start">
                     <HelpCircle className="w-4 h-4 mr-2" />
                     Help & Support
                   </Button>
                   <Button 
                     variant="outline" 
                     size="sm" 
                     className="w-full justify-start text-destructive hover:text-destructive"
                     onClick={signOut}
                   >
                     <LogOut className="w-4 h-4 mr-2" />
                     Sign Out
                   </Button>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};