import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";

import {FiHeart} from 'react-icons/fi'
import ClipLoader from "react-spinners/ClipLoader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { api } from "./services/api"

interface DataProps {
  id_projeto: number;
  nome: string;
  municipio: string;
  uf: string;
  objetivo: string;
  valor_aprovado: string;
  valor_captado: string;
}

function App() {
  const [datas, setDatas] = useState([])

  useEffect(() => {
    api.get("/projects").then((res) => setDatas(res.data))
  }, [])
  console.log(datas.length)

  return (
    <div className=" flex flex-col justify-center items-center bg-slate-300 h-screen w-screen">
      {datas.length > 0 
      ? <main>
            <h1 className="text-cyan-700 text-[2rem] font-semibold">Ver outros Projetos do Proponente</h1>
            <Swiper
              className="mySwiper w-[122rem] h-[52rem] p-20"
              spaceBetween={50}
              slidesPerView={1}
              centeredSlides={false}
              slidesPerGroupSkip={1}
              grabCursor={true}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                769: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              }}
              scrollbar={false}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            >
              {datas.slice(0, 100).map((res: DataProps) => {
                return (
                  <SwiperSlide key={res.id_projeto}>
                    <div className="flex flex-col justify-between bg-white shadow-md rounded-md h-full p-8">

                      <div>
                        <h4 className="bg-yellow-500 text-yellow-700 rounded inline-block px-2">Rouanet</h4>
                        <h3 className="font-bold mt-6">{(res.nome).substr(0, 28)}</h3>
                        <p className="text-[1.4rem] mt-1">{res.municipio} • {res.uf}</p>
                      </div>
                      <p className="mt-6">{(res.objetivo).substr(0, 150)}</p>

                      <div className="mt-6 flex flex-col gap-6">
                        <p>Aprovado
                          <span className="font-bold mr-auto  float-right">
                            {
                              new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(res.valor_aprovado))
                            }
                          </span>
                        </p>
                        <p className="">
                          Captado
                          <span className="font-bold mr-auto  float-right">
                            {
                              new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(res.valor_captado))
                            }
                          </span>
                        </p>
                      </div>

                      <div className="flex mt-10">
                        <button className="w-full ease-out duration-300 hover:text-yellow-700">ADICIONAR</button>
                        <FiHeart className="heart text-black opacity-40 w-12 h-12 float-right" />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}

            </Swiper>
      
        </main>
      : <ClipLoader />
      }
      <div className="font-bold text-black text-[2rem] mt-40">Challenge Simbiótico | Done by Felipe Santana</div>
    </div>
  )

}

export default App
