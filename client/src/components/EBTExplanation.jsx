import React from 'react';

const EBTExplanation = () => {
    return (
        <div className="w-full px-6 py-12">
            <div className="mx-auto flex flex-col lg:flex-row-reverse items-center justify-center max-w-screen-xl">
                {/* Text Section */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-hijau text-center lg:text-left">
                        Apa itu <br /> Energi Baru Terbarukan?
                    </h1>
                    <p className="text-center lg:text-left text-gray-500 text-sm md:text-base mt-3 lg:w-3/4 sm:w-3/4">
                        Energi baru dan terbarukan merupakan pengelolaan energi dan proses alam yang berkelanjutan dan dijadikan sebagai energi alternatif serta bersifat ramah lingkungan sehingga berkontribusi dalam mengatasi pemanasan global dan mengurangi emisi karbon dioksida.
                    </p>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <img
                        src="/img/renewable-energy.png"
                        className="w-full h-auto rounded-md object-contain"
                        alt="Renewable Energy"
                    />
                </div>
            </div>
        </div>
    );
};

export default EBTExplanation;
