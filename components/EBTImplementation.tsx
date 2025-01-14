"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function EBTImplementation() {
  const energySources = [
    {
      title: "Pembangkit Listrik Tenaga Air (PLTA)",
      description:
        "PLTA adalah pembangkit listrik yang memanfaatkan energi kinetik dan potensial dari aliran air untuk menghasilkan listrik. PLTA umumnya menggunakan bendungan atau sistem aliran sungai untuk menggerakkan turbin yang terhubung dengan generator. Keunggulan utama PLTA adalah kemampuannya untuk menghasilkan energi dalam jumlah besar secara terus-menerus, dengan biaya operasional yang relatif rendah setelah konstruksi. PLTA juga merupakan sumber energi terbarukan yang ramah lingkungan, karena tidak menghasilkan emisi gas rumah kaca selama operasinya. Selain itu, PLTA dapat berperan dalam pengelolaan sumber daya air dan mendukung irigasi atau pengendalian banjir.",
      image: "/img/plta.jpg",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200",
    },
    {
      title: "Pembangkit Teknologi Tenaga Panas Bumi (PLTP)",
      description:
        "PLTG adalah pembangkit listrik yang menggunakan bahan bakar gas alam, seperti gas bumi yang ada pada sumur gas untuk menghasilkan listrik. Pada pembangkit ini, gas alam dibakar untuk menghasilkan panas, yang kemudian digunakan untuk menggerakkan turbin dan menghasilkan energi mekanik yang diubah menjadi energi listrik oleh generator. PLTG memiliki beberapa keunggulan, seperti efisiensi yang tinggi, waktu operasional yang cepat, dan emisi yang lebih rendah dibandingkan dengan pembangkit berbahan bakar fosil lainnya.",
      image: "/img/pltp.webp",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
      borderColor: "border-orange-200",
    },
    {
      title: "Penghasil Listrik Tenaga Bayu (PLTB)",
      description:
        "PLTB (Pembangkit Listrik Tenaga Bayu) adalah jenis pembangkit listrik yang menggunakan energi angin untuk menghasilkan listrik. PLTB memanfaatkan turbin angin untuk mengubah energi kinetik dari angin menjadi energi mekanik, yang kemudian dikonversi menjadi energi listrik. Ini merupakan salah satu sumber energi terbarukan yang ramah lingkungan, karena tidak menghasilkan emisi gas rumah kaca dan dapat mengurangi ketergantungan pada sumber energi fosil. PLTB di Indonesia dapat memberikan kontribusi signifikan terhadap keberlanjutan energi, meskipun tantangan geografis dan teknis tetap menjadi perhatian penting dalam pengembangannya.",
      image: "/img/pltb.webp",
      bgColor: "bg-sky-50",
      iconColor: "text-sky-500",
      borderColor: "border-sky-200",
    },
    {
      title: "Penghasil Listrik Tenaga Surya (PLTS)",
      description:
        "PLTS (Pembangkit Listrik Tenaga Surya) adalah sistem yang menghasilkan listrik menggunakan energi dari sinar matahari. Sinar matahari yang jatuh pada panel surya (solar panel) akan diubah menjadi listrik melalui proses yang disebut efek fotovoltaik.PLTS memiliki beberapa kelebihan, seperti ramah lingkungan (karena tidak menghasilkan polusi), dapat mengurangi tagihan listrik, dan energi matahari yang digunakan adalah sumber daya yang terbarukan, artinya tidak akan habis. Dengan adanya PLTS, kita dapat memanfaatkan sumber energi yang melimpah dan gratis, yaitu matahari, untuk memenuhi kebutuhan listrik sehari-hari.",
      image: "/img/plts.webp",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      borderColor: "border-yellow-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white mb-10">
      <div className="lg:container mx-auto px-4 py">
        <div className="text-center mb-10">
          <motion.h1
            className="mb-2 lg:mb-6 text-3xl tracking-tight font-bold sm:text-5xl lg:text-5xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span
              className="block text-green-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Penerapan
            </motion.span>
            <motion.span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Energi Baru Terbarukan
            </motion.span>
          </motion.h1>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            Penerapan EBT melibatkan proses mengubah sumber energi alami yang
            berkelanjutan menjadi energi yang dapat kita manfaatkan dalam
            kehidupan sehari-hari, terutama dalam bentuk listrik. Penerapan ini
            bisa dilakukan dalam skala besar maupun kecil, baik oleh pemerintah,
            perusahaan, maupun individu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:mx-20">
          {energySources.map((source, index) => (
            <Card
              key={index}
              className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-xl py-4 ${source.borderColor} ${source.bgColor}`}
            >
              <CardContent>
                <div className="aspect-video mb-4 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src={source.image}
                    alt={`${source.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className={`text-2xl font-bold ${source.iconColor}`}>
                  {source.title}
                </CardTitle>
                <p className="text-gray-600 text-base leading-relaxed">
                  {source.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
