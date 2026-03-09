import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from './apps/auth/AuthContext';
import AuthView from './apps/auth/AuthView';
import ToastProvider from './apps/kanban-board/contexts/ToastContext';

const KanbanApp = lazy(() => import('./apps/kanban-board/App'));

const LoadingScreen = () => (
  <div className="h-screen flex items-center justify-center bg-[#0f1015] text-white">
    <div className="animate-spin text-4xl mr-4">⚙️</div>
    <div className="flex flex-col">
      <p className="text-xl font-semibold">Đang tải hệ thống...</p>
      <p className="text-gray-500 text-sm mt-1">Vui lòng chờ trong giây lát</p>
    </div>
  </div>
);

function App() {
  const { user } = useAuth();

  return (
    <div className="font-sans antialiased text-gray-900 bg-[#0f1015]">
      <ToastProvider>
        <Routes>
          <Route path="/auth" element={!user ? <AuthView /> : <Navigate to="/" replace />} />

          <Route
            path="/*"
            element={
              user ? (
                <Suspense fallback={<LoadingScreen />}>
                  <KanbanApp />
                </Suspense>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
        </Routes>
      </ToastProvider>
    </div>
  );
}

export default App;