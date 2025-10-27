export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-xs md:text-sm">© 2025 ProductHub. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a href="#" className="hover:text-white transition-colors text-center">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors text-center">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors text-center">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
