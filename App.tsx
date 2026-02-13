
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QuantumProvider } from './context/QuantumContext';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import BatchesPage from './pages/BatchesPage';
import BatchDetailsPage from './pages/BatchDetailsPage';
import SubjectTopicsPage from './pages/SubjectTopicsPage';
import TopicContentPage from './pages/TopicContentPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <QuantumProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/batches" replace />} />
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/batch/:batchId" element={<BatchDetailsPage />} />
            <Route path="/batch/:batchId/subject/:subjectId" element={<SubjectTopicsPage />} />
            <Route path="/batch/:batchId/subject/:subjectId/topic/:topicId" element={<TopicContentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </QuantumProvider>
  );
};

export default App;
