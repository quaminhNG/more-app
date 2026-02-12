import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const KanbanApp = lazy(() => import('./apps/kanban-board/App'));
const LoadingScreen = () => (
  <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="animate-spin text-4xl">⚙️</div>
    <p className="ml-4">Đang tải ứng dụng...</p>
  </div>
);

const Launcher = () => {
  const apps = [
    { id: 'kanban', name: 'Kanban Master', color: 'bg-blue-500', path: '/kanban' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {apps.map((app) => (
          <Link key={app.id} to={app.path}>
            <div className={`${app.color} h-40 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center cursor-pointer`}>
              <h2 className="text-2xl font-bold">{app.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
      <Routes>
        <Route path="/" element={<Launcher />} />

        <Route
          path="/kanban/*"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <KanbanApp />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;