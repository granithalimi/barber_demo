"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Services = {
  name: string;
  price: number;
  time: number;
};
export default function Services() {
  const [services, setServices] = useState<Services[] | null>();

  useEffect(() => {
    async function fetchServices() {
      const supabase = createClient();
      const { data } = await supabase
        .from("services")
        .select("name, price, time")
        .order("id", { ascending: true })
        .limit(6);

      setServices(data as Services[]);
    }

    fetchServices();
  }, []);
  const [refServicesText, inViewServices] = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  const [refServicesContent, inViewServicesContent] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={refServicesText}>
          <h2
            className={`${inViewServices ? "show-text" : ""} hide-text3 text-white text-4xl md:text-5xl font-bold mb-4 duration-500`}
          >
            Our Services
          </h2>
          <p
            className={`${inViewServices ? "show-text" : ""} hide-text3 text-gray-400 text-lg max-w-2xl mx-auto duration-500`}
          >
            Professional grooming services tailored to your style and
            preferences
          </p>
        </div>
        {services && services.length > 0 && (
          <div
            ref={refServicesContent}
            className={`${inViewServicesContent ? "show-text" : ""} hide-content text-white grid md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-default duration-500`}
          >
            {services.map((s, ind) => (
              <div
                key={ind}
                className="bg-barber-gray p-8 rounded-lg hover:transform hover:scale-105 transition-transform"
              >
                <div className="text-barber-gold text-4xl mb-4">
                  <i className="fas fa-cut"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">{s.name}</h3>
                <p className="text-gray-400 mb-4">Time: {s.time * 30}min</p>
                <p className="text-barber-gold font-semibold">{s.price} Den</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
