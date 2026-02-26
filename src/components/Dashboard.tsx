import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, Settings, LogOut, Bell, Search } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg"></div>
          <span className="font-bold text-xl tracking-tight">Vortexia</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<Users size={20} />} label="Usuários" />
          <NavItem icon={<Settings size={20} />} label="Configurações" />
        </nav>

        <button 
          onClick={onLogout}
          className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors p-2 mt-auto"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold">Olá, {user.name}</h2>
            <p className="text-zinc-400">Bem-vindo ao painel de controle.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64"
              />
            </div>
            <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950"></span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total de Vendas" value="R$ 12.450,00" change="+12.5%" />
          <StatCard title="Novos Clientes" value="48" change="+5.2%" />
          <StatCard title="Projetos Ativos" value="12" change="0%" />
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">Atividade Recente</h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-bottom border-zinc-800 bg-zinc-800/50">
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Usuário</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ação</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Data</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <TableRow user="João Silva" action="Login efetuado" date="Há 5 min" status="Sucesso" />
                <TableRow user="Maria Santos" action="Atualizou perfil" date="Há 2 horas" status="Sucesso" />
                <TableRow user="Admin" action="Backup do sistema" date="Há 4 horas" status="Sucesso" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-emerald-500/10 text-emerald-500' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}

function StatCard({ title, value, change }: { title: string, value: string, change: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
    >
      <p className="text-zinc-400 text-sm mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-bold">{value}</h4>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-500/10 text-zinc-400'}`}>
          {change}
        </span>
      </div>
    </motion.div>
  );
}

function TableRow({ user, action, date, status }: { user: string, action: string, date: string, status: string }) {
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold">
          {user.charAt(0)}
        </div>
        <span className="font-medium">{user}</span>
      </td>
      <td className="p-4 text-zinc-300">{action}</td>
      <td className="p-4 text-zinc-500 text-sm">{date}</td>
      <td className="p-4">
        <span className="text-xs font-medium px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full">
          {status}
        </span>
      </td>
    </tr>
  );
}
