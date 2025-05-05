function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-800 py-6 px-4 sm:py-10">
      <div className="w-full max-w-3xl flex flex-col sm:flex-row border border-gray-300 shadow-md p-4 sm:p-10">
        <img
          src="/brgy-174-cap.png"
          alt="captain's photo"
          className="w-32 h-32 sm:w-48 sm:h-48 object-fit  mx-auto sm:mx-0"
        />
        <div className="sm:ml-6 mt-4 sm:mt-0 flex flex-col justify-center">
          <p className="text-sm text-gray-600">Barangay captain</p>
          <h1 className="text-xl sm:text-2xl font-bold text-black mb-2">
            Engr. Gilbert Rivera
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
            dui et ipsum condimentum porta ac sed ligula. Nunc eleifend nulla ac
            molestie gravida. Fusce lectus massa, tincidunt id diam luctus,
            consectetur consequat risus. Donec libero sem, dictum vitae
            fermentum sit amet, volutpat vitae lectus.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center sm:justify-evenly items-center gap-4 sm:gap-8">
        <img
          src="/barangay-174-icon.png"
          alt="Barangay logo"
          className="w-16 h-16 sm:w-24 sm:h-24"
        />
        <div className="flex items-center space-x-4 text-base sm:text-xl">
          <span className="hidden sm:inline">Social Links:</span>
          <a href="#" className="hover:text-blue-600 text-lg sm:text-xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-blue-600 text-lg sm:text-xl">
            <i className="fab fa-messenger"></i>
          </a>
          <a href="#" className="hover:text-blue-600 text-lg sm:text-xl">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-6 sm:mt-8 flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="flex-1 bg-white shadow p-4 sm:p-6">
          <h2 className="text-blue-600 font-bold text-lg sm:text-xl mb-3 sm:mb-4">
            BRGY 174 OVERVIEW
          </h2>
          <div className="border-l-4 border-orange-500 pl-3 sm:pl-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            Barangay 174 is one among 188 Barangays in Caloocan city founded on
            the year 1968. It has a total land area of 152.64 hectares and
            bounded by Barangay 176 in the North, Barangay 178 in the East,
            Barangay 175 in the West, and Barangay 177 in the South. It has an
            estimated population of 28,334 as of the 2024 Registry of Barangay
            Inhabitants.
          </div>
        </div>

        <div className="flex-1 shadow">
          <div className="bg-orange-500 text-white font-bold flex justify-between p-2 px-3 sm:px-4 text-sm sm:text-base">
            <span>BRGY 174</span>
            <span>SUMMARY DATA</span>
          </div>
          <table className="w-full text-xs sm:text-sm border border-gray-300">
            <tbody>
              <tr className="border-t">
                <td className="p-2 font-semibold bg-gray-100">Type</td>
                <td className="p-2">Barangay</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold bg-gray-100">City</td>
                <td className="p-2">Caloocan city</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold bg-gray-100">Region</td>
                <td className="p-2">NCR</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold bg-gray-100">Island Group</td>
                <td className="p-2">Luzon</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold bg-gray-100">Postal code</td>
                <td className="p-2">1400</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold bg-gray-100">Population</td>
                <td className="p-2">28,344 as of 2024</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold bg-gray-100">Coordinates</td>
                <td className="p-2">14.7611, 121.0495</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold bg-gray-100">
                  Estimated elevation above sea level
                </td>
                <td className="p-2">80.7 m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
