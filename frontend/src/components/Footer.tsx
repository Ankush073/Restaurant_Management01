// import * as React from "react"

const Footer = () => {
  return (
    <div className="bg-green-900 py-8 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-gold-500 font-bold tracking-tight">
          Sizzler.com
        </span>
        <span className="text-gray-400 font-bold tracking-tight flex gap-8 mt-4 md:mt-0">
          <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-white">Terms of Service</a>
        </span>
      </div>
    </div>
  )
}

export default Footer
