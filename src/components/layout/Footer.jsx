import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

const FOOTER_COLS = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Case studies', 'Reviews', 'Updates'],
  },
  {
    title: 'Support',
    links: ['Getting started', 'Help center', 'Server status', 'Report a bug', 'Chat support'],
  },
  {
    title: 'For Provider',
    links: ['About', 'Contact us', 'Careers', "FAQ's", 'Blog'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm text-zinc-900 dark:text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-pink-700 dark:hover:text-pink-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-white mb-4">Sign Up For Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="input-field flex-1 py-2.5"
              />
              <button className="btn-primary px-5 py-2.5 shrink-0">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-pink-700 flex items-center justify-center">
              <Scissors className="w-3 h-3 text-white" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              © 2025 All Rights Reserved <span className="font-medium text-zinc-700 dark:text-zinc-400">SalonWala</span>
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <a href="#" className="hover:text-pink-700 transition-colors">Terms and Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-pink-700 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
