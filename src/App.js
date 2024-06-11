import React, { useState } from 'react';
import AppRoutes from './routes';
import { AuthProvider } from "./contexts/auth";


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

