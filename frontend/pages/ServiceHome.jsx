import { Link } from 'react-router-dom';
import { User, ShieldCheck, GraduationCap } from 'lucide-react';

const ServiceHome = () => {
  const cards = [
    { title: "Student View", path: "/student", icon: <GraduationCap />, color: "bg-blue-500" },
    { title: "Counselor View", path: "/counselor", icon: <User />, color: "bg-green-500" },
    { title: "Admin View", path: "/admin", icon: <ShieldCheck />, color: "bg-purple-500" },
  ];

return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Service Control Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card) => (
          <Link key={card.path} to={card.path} className="transform hover:scale-105 transition">
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-4 border-t-8 border-t-gray-800">
              <div className={`${card.color} text-white p-4 rounded-full`}>{card.icon}</div>
              <h2 className="text-xl font-semibold">{card.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceHome;