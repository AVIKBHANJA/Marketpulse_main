import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  Shield, 
  Globe, 
  Clock, 
  TrendingUp,
  Database,
  UserCheck,
  Target,
  LineChart,
  MessageSquare,
  Gamepad2,
  Headphones
} from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <LineChart size={32} />, value: '50+', label: 'Technical Indicators & Patterns' },
    { icon: <MessageSquare size={32} />, value: '24/7', label: 'Real-time News Sentiment Analysis' },
    { icon: <Gamepad2 size={32} />, value: '100+', label: 'Interactive Trading Scenarios' },
    { icon: <Headphones size={32} />, value: '1-on-1', label: 'Expert Financial Advisory' },
  ];

  const team = [
    {
      name: 'Arijit Chatterjee',
      role: 'Team Lead',
      img: 'Marketpulse/client/public/stock_pic.jpg'
    },
    {
      name: 'Ayan Das Gupta',
      role: 'AI Research Lead',
      img: 'Marketpulse/client/public/stock_pic.jpg'
    },
    {
      name: 'Avik Bhanja',
      role: 'Full Stack Developer',
      img: 'Marketpulse/client/public/stock_pic.jpg'
    },
    {
      name: 'Swapnil Chaki',
      role: 'AI Engineer',
      img: 'Marketpulse/client/public/stock_pic.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-slate-900 dark:text-white mb-8 transition-colors duration-200"
          >
            Your Smart Trading Companion
          </motion.h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
            MarketPulse brings together advanced stock analysis, sentiment tracking, gamified learning, 
            and expert financial guidance to help you make informed investment decisions.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl 
                          hover:bg-slate-50 dark:hover:bg-slate-700
                          transition-all duration-200 group"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-6 transform group-hover:scale-110 transition-transform duration-200">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white transition-colors duration-200">
                  {stat.value}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 transition-colors duration-200">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      {/* Mission Section */}
      <section className="py-24 bg-white dark:bg-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-200">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
              We're on a mission to democratize institutional-grade financial analytics. 
              By combining cutting-edge technology with deep market expertise, we provide 
              powerful tools that were once exclusive to Wall Street firms.
            </p>
            <div className="space-y-6">
              {[
                { icon: <Clock size={24} />, text: 'Real-time market analysis across 50+ global exchanges' },
                { icon: <BarChart2 size={24} />, text: 'AI-powered predictive analytics with 94% accuracy' },
                { icon: <Shield size={24} />, text: 'Enterprise-grade security and risk management' },
                { icon: <Globe size={24} />, text: '24/7 global market coverage and insights' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg transition-colors duration-200">
                    <div className="text-blue-600 dark:text-blue-400 transition-colors duration-200">
                      {item.icon}
                    </div>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 transition-colors duration-200">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/api/placeholder/800/600" 
              alt="Real-time market analysis dashboard showing multiple charts, stock tickers, and AI predictions" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white transition-colors duration-200">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden 
                          transition-colors duration-200"
              >
                <div className="aspect-square relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 
                                to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                                duration-200" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium transition-colors duration-200">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Target className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-6 transition-colors duration-200" />
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-200">
              Global Impact, Local Excellence
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-200">
              Serving clients in 30+ countries with personalized solutions and round-the-clock market intelligence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Trust & Precision', desc: 'Industry-leading accuracy in market predictions and analysis' },
              { title: 'Innovation DNA', desc: 'Continuous advancement in AI and machine learning capabilities' },
              { title: 'Client Success', desc: 'Dedicated support and customized solutions for every trading strategy' }
            ].map((value, index) => (
              <div 
                key={index} 
                className="p-8 bg-slate-50 dark:bg-slate-800 rounded-xl 
                          hover:bg-slate-100 dark:hover:bg-slate-700 
                          transition-colors duration-200 
                          border border-slate-200 dark:border-slate-700"
              >
                <div className="text-blue-600 dark:text-blue-400 text-2xl mb-4 transition-colors duration-200">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white transition-colors duration-200">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 transition-colors duration-200">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;