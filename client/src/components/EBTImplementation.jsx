import React from 'react';

const EBTImplementation = () => {
    return (
        <div className="w-full px-4 md:px-8 lg:px-16 py-12 bg-white">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Penerapan EBT</h2>
                <p className="mt-4 text-center lg:text-justify text-gray-500 text-sm md:text-base sm:w-3/4 mx-auto sm:px-10">
                    Energi Baru Terbarukan (EBT) adalah sumber energi yang berkelanjutan dan ramah lingkungan, seperti energi matahari, angin, air, biomassa, dan panas bumi. EBT hadir sebagai solusi untuk mengurangi ketergantungan pada energi fosil dan emisi gas rumah kaca, mendukung masa depan yang lebih hijau dan berkelanjutan. Berikut beberapa jenis penerapannya:
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Pembangkit Listrik Tenaga Bayu (PLTB)</h3>
                    <p className="mt-2 text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <button className="mt-4 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200">
                        Baca Selengkapnya
                    </button>
                    <div className="h-56 sm:h-72 md:h-96 overflow-hidden">
                        <img src="/img/pltb.jpg" className="rounded-lg mt-6 w-full h-full object-cover" />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Pembangkit Listrik Tenaga Surya (PLTS)</h3>
                    <p className="mt-2 text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <button className="mt-4 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200">
                        Baca Selengkapnya
                    </button>
                    <div className="h-56 sm:h-72 md:h-96 overflow-hidden">
                        <img src="/img/plts.jpg" className="rounded-lg mt-6 w-full h-full object-cover" />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Pembangkit Listrik Tenaga Air (PLTA)</h3>
                    <p className="mt-2 text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <button className="mt-4 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200">
                        Baca Selengkapnya
                    </button>
                    <div className="h-56 sm:h-72 md:h-96 overflow-hidden">
                        <img src="/img/plta.jpg" className="rounded-lg mt-6 h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EBTImplementation;
