
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">TariffTrack</h3>
            <p className="text-sm text-muted-foreground">
              Real-time tariff data and economic impact metrics for global trade professionals.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:underline transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/countries" className="text-sm hover:underline transition-colors">
                  Countries
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:underline transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm hover:underline transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Subscribe for Updates</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Get notifications on tariff changes and economic impacts.
            </p>
            <Link 
              to="/pricing" 
              className="text-sm hover:underline"
            >
              See pricing plans →
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} TariffTrack. All rights reserved.</p>
            <p className="mt-1">Project by <a href="https://alfonso.work/" target="_blank" rel="noopener noreferrer" className="hover:underline">Alfonso Barrionuevo</a></p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
              Terms
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
              Privacy
            </Link>
            <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
