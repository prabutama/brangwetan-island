import React from 'react';
import { useParams } from 'react-router-dom';

const dataMakanan = [
    {
        id: 1,
        nama: 'Nasi Goreng',
        harga: 15000,
        deskripsi: 'Nasi goreng yang terkenal di seluruh Indonesia ini diolah dengan bumbu-bumbu khas seperti kecap manis, bawang merah, bawang putih, dan cabai. Ditambah dengan potongan ayam suwir dan telur, nasi goreng ini memiliki cita rasa yang gurih dan manis. Biasanya disajikan dengan acar, kerupuk, dan potongan mentimun untuk melengkapi kelezatannya.',
        asal: 'Jakarta',
        gambar: 'https://lh3.googleusercontent.com/proxy/BDBetQ_IdO0Bwii0mZPrK2CN07vyUuROIF7UOR12vspuhdC8HEpCEcMcl-Jxp4k52x54iMOS3-ojlpbucZJYSouhXJMhbKb9aq1pHRlmSJHZTX4a4Lo7cV3tNNYFcb1q2NthnpE67_XOlmDiMsYbuT1H7GW0YzEaEA6QRCYknUPa7MJCQhmmOIvQIj25',
    },
    {
        id: 2,
        nama: 'Sate Ayam',
        harga: 20000,
        deskripsi: 'Sate ayam Madura merupakan salah satu kuliner yang paling populer di Indonesia. Terbuat dari potongan daging ayam yang ditusuk menggunakan tusukan bambu, lalu dipanggang di atas bara arang. Disajikan dengan bumbu kacang yang kental, manis, dan sedikit pedas, serta kecap manis dan bawang merah, sate ini memberikan perpaduan rasa yang lezat. Biasanya disajikan dengan lontong atau nasi.',
        asal: 'Madura',
        gambar: 'https://www.sasa.co.id/medias/page_medias/cara_bikin_sate_ayam_empuk.jpg',
    },
    {
        id: 3,
        nama: 'Rendang',
        harga: 35000,
        deskripsi: 'Rendang adalah hidangan daging sapi yang dimasak dengan santan kelapa dan campuran rempah-rempah seperti cabai, jahe, lengkuas, kunyit, dan daun jeruk. Proses memasaknya yang lama membuat rendang memiliki tekstur yang empuk dengan bumbu yang meresap hingga ke dalam daging. Hidangan ini terkenal dengan cita rasanya yang pedas, gurih, dan kaya akan rempah-rempah.',
        asal: 'Padang',
        gambar: 'https://images.tokopedia.net/img/JFrBQq/2022/8/9/bbeeca0f-bdd3-4b05-af82-8011730c932b.jpg',
    },
    {
        id: 4,
        nama: 'Pempek',
        harga: 10000,
        deskripsi: 'Pempek adalah makanan khas Palembang yang terbuat dari ikan dan sagu. Hidangan ini memiliki berbagai bentuk seperti kapal selam (dengan telur di dalamnya), lenjer, dan adaan. Pempek disajikan dengan kuah cuka yang asam dan manis, yang dibuat dari campuran gula merah, bawang putih, dan cabai. Tekstur pempek yang kenyal dan rasa kuah cuka yang khas membuatnya sangat digemari.',
        asal: 'Palembang',
        gambar: 'https://asset.kompas.com/crops/4m3N8wTsLN8nOK1oQRBpMUAcF5g=/0x0:968x645/750x500/data/photo/2023/03/07/640691448f9d2.jpg',
    },
    {
        id: 5,
        nama: 'Gudeg',
        harga: 25000,
        deskripsi: 'Gudeg merupakan makanan tradisional khas Yogyakarta yang terbuat dari nangka muda yang dimasak dalam santan selama berjam-jam hingga empuk dan meresap. Gudeg memiliki rasa yang manis dan disajikan dengan krecek (kulit sapi yang dimasak pedas), opor ayam, telur pindang, serta nasi hangat. Cita rasa manis yang khas dari gudeg berasal dari gula merah yang digunakan dalam proses memasaknya.',
        asal: 'Yogyakarta',
        gambar: 'https://www.sasa.co.id/medias/page_medias/gudeg.jpg',
    },
];

const MakananDetail = () => {
    const { id } = useParams();
    const makanan = dataMakanan.find((item) => item.id === parseInt(id));

    if (!makanan) {
        return <p>Makanan tidak ditemukan</p>;
    }

    return (
        <div>
            <div className='text-3xl bg-teal-500 h-100 w-full px-4 py-4 text-center font-bold text-white'>Detail Makanan</div>
            <div className="flex justify-center gap-5 px-20 py-20 bg-teal-50 mx-10 mt-10 rounded-lg">
                <div>
                    <img
                        src={makanan.gambar}
                        alt="Makanan"
                        className="rounded-3xl w-[700px]"
                    />
                </div>
                <div className="w-2/3">
                    <h2 className="text-2xl mt-4 text-teal-600 font-bold">{makanan.nama}</h2>
                    <p className="w-3/4 text-justify">{makanan.deskripsi}</p>
                    <p className='mt-4 text-lg font-normal'>Asal daerah: {makanan.asal}</p>
                    <p className='text-lg font-normal'>Harga: {makanan.harga}</p>
                </div>
            </div>

        </div>
    );
};

export default MakananDetail;
