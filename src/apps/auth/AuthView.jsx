import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('demo@more-app.com');
    const [password, setPassword] = useState('password123');
    const [name, setName] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login({ email, name: "Demo User", role: "Admin" });
            navigate('/');
        } else {
            login({ email, name: name || "New User", role: "User" });
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#0f1015] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-gray-900">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px]" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <h2 className="mt-2 flex items-center justify-center text-center text-3xl font-extrabold text-white tracking-tight">
                    {isLogin ? 'Đăng nhập vào ' : 'Tạo tài khoản '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 ml-2">More App</span>
                </h2>
                <p className="mt-2 flex items-center justify-center text-center text-sm text-gray-400">
                    {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
                    <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-indigo-400 hover:text-indigo-300 ml-1 transition-colors underline underline-offset-2">
                        {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                    </button>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    <form className="space-y-6 relative" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Họ và Tên</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required={!isLogin}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-black/20 text-white transition-all backdrop-blur-sm"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Địa chỉ Email</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-black/20 text-white transition-all backdrop-blur-sm"
                                    placeholder="demo@more-app.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Mật khẩu</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-black/20 text-white transition-all backdrop-blur-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer bg-white/20 border-white/20"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 cursor-pointer select-none">
                                        Ghi nhớ đăng nhập
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xl shadow-indigo-500/20 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#0f1015] transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                {isLogin ? 'Đăng nhập vào hệ thống' : 'Tạo tài khoản mới'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 relative hidden hidden">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-transparent backdrop-blur-sm text-gray-400">Hoặc tiếp tục với</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthView;
