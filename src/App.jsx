import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { appsConfig } from './config/apps.config';
import { useAuth } from './apps/auth/AuthContext';
import AuthView from './apps/auth/AuthView';

const LoadingScreen = () => (
  <div className="h-screen flex items-center justify-center bg-[#0f1015] text-white">
    <div className="animate-spin text-4xl mr-4">⚙️</div>
    <div className="flex flex-col">
      <p className="text-xl font-semibold">Đang tải ứng dụng...</p>
      <p className="text-gray-500 text-sm mt-1">Vui lòng chờ trong giây lát</p>
    </div>
  </div>
);

const Launcher = () => {
  const { user, logout } = useAuth();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

  return (
    <div className="min-h-screen bg-[#06060a] p-6 md:p-12 text-white relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 mt-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">CRM</span> Workspace
            </h1>
            <p className="text-gray-400 text-lg font-medium">{greeting}, <span className="text-white font-bold">{user?.name || 'Khách'}</span>. Bạn muốn làm gì hôm nay?</p>
          </div>

          {user && (
            <div className="flex items-center gap-4 bg-white/[0.03] px-3 py-2.5 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl">
              <div className="flex flex-col items-end pl-2">
                <span className="text-sm font-bold text-white">{user.name}</span>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{user.role}</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-base shadow-inner shadow-white/20 ring-2 ring-white/10">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="w-px h-8 bg-white/10 mx-1" />
              <button onClick={logout} className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white cursor-pointer transition-all group" title="Đăng xuất">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4 shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </button>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {appsConfig.map((app) => (
            <Link key={app.id} to={app.path} className="group relative block outline-none">
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${app.color} rounded-[24px] blur-lg opacity-0 group-hover:opacity-40 transition duration-500 pointer-events-none`} />

              <div className="relative h-64 bg-[#0d0e15] rounded-[22px] border border-white/5 p-8 flex flex-col justify-between overflow-hidden shadow-2xl group-hover:-translate-y-1 transition-all duration-300">

                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${app.color} opacity-10 rounded-full blur-[50px] group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`} />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                <div className="flex justify-between items-start z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-4xl shadow-inner shadow-white/20 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500 ease-out`}>
                    {app.icon}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4 text-white/40 group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>

                <div className="z-10 mt-auto pt-6">
                  <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-colors">
                    {app.name}
                  </h2>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-2">
                    {app.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          <button className="group relative block outline-none text-left h-64 cursor-pointer">
            <div className="relative h-full bg-white/[0.02] rounded-[22px] border border-dashed border-white/10 p-8 flex flex-col items-center justify-center hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-gray-400 group-hover:text-white transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-400 group-hover:text-white mb-1 transition-colors">Cửa hàng Ứng dụng</h3>
              <p className="text-gray-500 text-xs text-center font-medium mt-1">Cài đặt thêm các ứng dụng<br />khác cho hệ thống sinh thái.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { user } = useAuth();

  return (
    <div className="font-sans antialiased text-gray-900 bg-[#0f1015]">
      <Routes>
        <Route path="/auth" element={!user ? <AuthView /> : <Navigate to="/" replace />} />

        <Route path="/" element={user ? <Launcher /> : <Navigate to="/auth" replace />} />

        {appsConfig.map((app) => {
          const AppComponent = app.component;
          return (
            <Route
              key={app.id}
              path={`${app.path}/*`}
              element={
                user ? (
                  <Suspense fallback={<LoadingScreen />}>
                    <AppComponent />
                  </Suspense>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;