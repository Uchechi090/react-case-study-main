type PageType = 'products' | 'about';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

interface NavItem {
  id: PageType;
  label: string;
  icon: string;
}

const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
  const navItems: NavItem[] = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'about', label: 'About Case Study', icon: 'ℹ️' },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl">
            🏪
          </div>
          <span className="text-xl font-bold">Dashboard</span>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
